import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DepartmentModel } from '../model/DepartmentModel';
import { getProcesses, ProcessListResponse } from '../api/process';

export interface DepartmentFormData {
  departmentName: string;
  status: string;
  departmentId?: string;
}

export interface Process {
  id: number;
  process_name: string;
}

export interface DepartmentControllerProps {
  formData: DepartmentFormData;
  processName: string;
  processes: Process[];
  availableProcesses: Process[];
  draggedIndex: number | null;
  error: string | null;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleProcessNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addProcess: () => void;
  addProcessDirectly: (process: Process) => void;
  removeProcess: (id: number) => void;
  handleReset: () => void;
  handleSubmit: () => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnd: () => void;
}

export const useDepartmentController = (): DepartmentControllerProps => {
  const { departmentId } = useParams<{ departmentId?: string }>();
  const navigate = useNavigate();
  
  const model = useMemo(() => new DepartmentModel(), []);
  
  const [formData, setFormData] = useState<DepartmentFormData>({
    departmentName: '',
    status: '',
    departmentId,
  });
  const [processName, setProcessName] = useState<string>('');
  const [processes, setProcesses] = useState<Process[]>([]);
  const [availableProcesses, setAvailableProcesses] = useState<Process[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch available processes from backend
  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const response: ProcessListResponse = await getProcesses(1, 1000);
        const processObjects = response.process.map(item => ({ id: item.id, process_name: item.process_name }));
        setAvailableProcesses(processObjects);
      } catch (error: any) {
        setError('Failed to fetch processes.');
        console.error('Error fetching processes:', error);
      }
    };
    fetchProcesses();
  }, []);

  // Load existing department data when editing
  useEffect(() => {
    const loadDepartmentData = async () => {
      if (departmentId && departmentId !== '0' && availableProcesses.length > 0) {
        try {
          setLoading(true);
          setError(null);
          
          const response = await model.getDepartmentById(Number(departmentId));
          const department = response.department;
          
          setFormData({
            departmentName: department.department_name,
            status: department.department_status.toString(),
            departmentId,
          });
          
          // Handle department_process as ID array
          let processObjects: Process[] = [];
          
          if (Array.isArray(department.department_process)) {
            // department_process is an array of ID strings like ['3', '4']
            processObjects = department.department_process
              .map((processId: string | number) => {
                const id = typeof processId === 'string' ? parseInt(processId) : processId;
                return availableProcesses.find(ap => ap.id === id);
              })
              .filter((process): process is Process => process !== undefined);
          } else if (typeof department.department_process === 'string') {
            try {
              // Try to parse as JSON first (for arrays stored as strings)
              const parsedProcesses = JSON.parse(department.department_process);
              if (Array.isArray(parsedProcesses)) {
                processObjects = parsedProcesses
                  .map((processId: string | number) => {
                    const id = typeof processId === 'string' ? parseInt(processId) : processId;
                    return availableProcesses.find(ap => ap.id === id);
                  })
                  .filter((process): process is Process => process !== undefined);
              }
            } catch {
              // If JSON parse fails, treat as comma-separated string
              const processString = department.department_process as string;
              const processIds = processString
                .split(',')
                .map(id => parseInt(id.trim()))
                .filter(id => !isNaN(id));
              
              processObjects = processIds
                .map(id => availableProcesses.find(ap => ap.id === id))
                .filter((process): process is Process => process !== undefined);
            }
          }
          
          setProcesses(processObjects);
          
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Failed to load department data.';
          setError(errorMessage);
          console.error('Error loading department data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadDepartmentData();
  }, [departmentId, model, availableProcesses]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  }, []);

  const handleProcessNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setProcessName(e.target.value);
    setError(null);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addProcess();
    }
  }, [processName, availableProcesses, processes]);

  const addProcess = useCallback(() => {
    const selectedProcess = availableProcesses.find(p => p.process_name === processName.trim());
    if (selectedProcess && !processes.some(p => p.id === selectedProcess.id)) {
      setProcesses((prev) => [...prev, selectedProcess]);
      setProcessName('');
      setError(null);
    }
  }, [processName, availableProcesses, processes]);

  // Add process directly without relying on processName state
  const addProcessDirectly = useCallback((process: Process) => {
    if (!processes.some(p => p.id === process.id)) {
      setProcesses((prev) => [...prev, process]);
      setError(null);
    }
  }, [processes]);

  const removeProcess = useCallback((id: number) => {
    setProcesses((prev) => prev.filter((p) => p.id !== id));
    setError(null);
  }, []);

  const handleReset = useCallback(() => {
    setFormData({
      departmentName: '',
      status: '',
      departmentId,
    });
    setProcessName('');
    setProcesses([]);
    setError(null);
  }, [departmentId]);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!formData.departmentName || !formData.status) {
        setError('Department name and status are required.');
        setLoading(false);
        return;
      }
      
      // Convert processes to ID array (as expected by backend)
      const departmentProcess = JSON.stringify(processes.map(p => p.id.toString()));
      
      if (departmentId && departmentId !== '0') {
        await model.updateDepartment(
          Number(departmentId),
          formData.departmentName,
          formData.status,
          departmentProcess
        );
      } else {
        const response = await model.department(
          formData.departmentName,
          formData.status,
          departmentProcess
        );
        localStorage.setItem('departmentId', response.departmentId.toString());
      }
      
      navigate('/departments');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Department submission failed. Please try again.';
      setError(errorMessage);
      console.error('Error submitting department:', error);
    } finally {
      setLoading(false);
    }
  }, [formData, processes, navigate, departmentId, model]);

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newProcesses = [...processes];
    const draggedItem = newProcesses[draggedIndex];
    newProcesses.splice(draggedIndex, 1);
    newProcesses.splice(dropIndex, 0, draggedItem);

    setProcesses(newProcesses);
    setDraggedIndex(null);
  }, [processes, draggedIndex]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  return {
    formData,
    processName,
    processes,
    availableProcesses,
    draggedIndex,
    error,
    loading,
    handleInputChange,
    handleProcessNameChange,
    handleKeyPress,
    addProcess,
    addProcessDirectly,
    removeProcess,
    handleReset,
    handleSubmit,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDrop,
    handleDragEnd,
  };
};