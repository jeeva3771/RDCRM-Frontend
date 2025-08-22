import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProcessModel } from '../model/ProcessModel';
import { ProcessResponse } from '../api/process';

export interface ProcessFormData {
  processName: string;
  status: string;
  rawMaterial: string;
  processId?: string;
}

export interface ProcessControllerProps {
  formData: ProcessFormData;
  columnName: string;
  columns: string[];
  draggedIndex: number | null;
  error: string | null;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleColumnNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addColumn: () => void;
  removeColumn: (index: number) => void;
  handleReset: () => void;
  handleSubmit: () => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnd: () => void;
}

export const useProcessController = (): ProcessControllerProps => {
  const { processId } = useParams<{ processId?: string }>();
  const navigate = useNavigate();
  
  // Memoize the model instance to prevent recreation on every render
  const model = useMemo(() => new ProcessModel(), []);
  
  const [formData, setFormData] = useState<ProcessFormData>({
    processName: '',
    status: '',
    rawMaterial: '',
    processId,
  });
  const [columnName, setColumnName] = useState<string>('');
  const [columns, setColumns] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Load existing process data when editing - with stable dependencies
  useEffect(() => {
    const loadProcessData = async () => {
      if (processId && processId !== '0') {
        try {
          setLoading(true);
          setError(null);
          
          const response = await model.getProcessById(Number(processId));
          const process = response.process;
          
          // Populate form data
          setFormData({
            processName: process.process_name,
            status: process.process_status.toString(),
            rawMaterial: process.raw_material?.toString() || '',
            processId,
          });
          
          // Populate columns
          if (Array.isArray(process.process_fields)) {
            setColumns(process.process_fields);
          } else if (typeof process.process_fields === 'string') {
            try {
              // Try to parse if it's a JSON string
              const parsedFields = JSON.parse(process.process_fields);
              setColumns(Array.isArray(parsedFields) ? parsedFields : []);
            } catch {
              // If parsing fails, split by comma
              const fieldsString = process.process_fields as string;
              setColumns(fieldsString.split(',').map(field => field.trim()).filter(field => field));
            }
          } else {
            // Handle any other case by setting empty array
            setColumns([]);
          }
          
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Failed to load process data.';
          setError(errorMessage);
          console.error('Error loading process data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProcessData();
  }, [processId, model]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  }, []);

  const handleColumnNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(e.target.value);
    setError(null);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addColumn();
    }
  }, [columnName]);

  const addColumn = useCallback(() => {
    if (columnName.trim()) {
      setColumns((prev) => [...prev, columnName.trim()]);
      setColumnName('');
      setError(null);
    }
  }, [columnName]);

  const removeColumn = useCallback((index: number) => {
    setColumns((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  }, []);

  const handleReset = useCallback(() => {
    setFormData({
      processName: '',
      status: '',
      rawMaterial: '',
      processId,
    });
    setColumnName('');
    setColumns([]);
    setError(null);
  }, [processId]);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!formData.processName || !formData.status || !formData.rawMaterial) {
        setError('Process name, status, and raw material are required.');
        setLoading(false);
        return;
      }
      
      const processFields = JSON.stringify(columns);
      
      if (processId && processId !== '0') {
        // Update existing process
        const response = await model.updateProcess(
          Number(processId),
          formData.processName,
          formData.status,
          formData.rawMaterial,
          processFields
        );
        console.log('Process updated successfully:', response);
      } else {
        // Create new process
        const response: ProcessResponse = await model.process(
          formData.processName,
          formData.status,
          formData.rawMaterial,
          processFields
        );
        localStorage.setItem('processId', response.processId.toString());
      }
      
      navigate('/process');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Process submission failed. Please try again.';
      setError(errorMessage);
      console.error('Error submitting process:', error);
    } finally {
      setLoading(false);
    }
  }, [formData, columns, navigate, processId, model]);

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newColumns = [...columns];
    const draggedItem = newColumns[draggedIndex];
    newColumns.splice(draggedIndex, 1);
    newColumns.splice(dropIndex, 0, draggedItem);

    setColumns(newColumns);
    setDraggedIndex(null);
  }, [columns, draggedIndex]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  return {
    formData,
    columnName,
    columns,
    draggedIndex,
    error,
    loading,
    handleInputChange,
    handleColumnNameChange,
    handleKeyPress,
    addColumn,
    removeColumn,
    handleReset,
    handleSubmit,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDrop,
    handleDragEnd,
  };
};