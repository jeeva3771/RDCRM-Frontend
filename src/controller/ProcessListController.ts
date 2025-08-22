import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProcessModel } from '../model/ProcessModel';

export interface ProcessItem {
  id: number;
  processName: string;
  code: string;
  columnList: string;
  rawMaterial: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface ProcessListControllerProps {
  searchTerm: string;
  entriesPerPage: number;
  currentPage: number;
  sortConfig: SortConfig;
  viewModalData: ProcessItem | null;
  deleteModalData: ProcessItem | null;
  currentData: ProcessItem[];
  totalPages: number;
  filteredDataLength: number;
  startIndex: number;
  error: string | null;
  loading: boolean;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEntriesChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSort: (key: string) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handlePageClick: (page: number) => void;
  handleView: (item: ProcessItem) => void;
  handleEdit: (id: number) => void;
  handleDelete: (item: ProcessItem) => void;
  confirmDelete: () => void;
  closeViewModal: () => void;
  closeDeleteModal: () => void;
}

export const useProcessListController = (): ProcessListControllerProps => {
  const navigate = useNavigate();
  
  // Create model instance once and memoize it
  const model = useMemo(() => new ProcessModel(), []);

  // State management
  const [processes, setProcesses] = useState<ProcessItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: 'asc' });
  const [viewModalData, setViewModalData] = useState<ProcessItem | null>(null);
  const [deleteModalData, setDeleteModalData] = useState<ProcessItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch processes data - memoized to prevent unnecessary re-creation
  const fetchProcesses = useCallback(async () => {
    try {
      setError(null);
      const response = await model.getAllProcesses();
      
      // Transform response data to match ProcessItem interface
      const transformedData: ProcessItem[] = response.data.map((item: any) => ({
        id: item.id,
        processName: item.processName || item.name || '',
        code: item.code || '',
        columnList: Array.isArray(item.columns) ? item.columns.join(', ') : item.columnList || '',
        rawMaterial: item.rawMaterial || '',
        status: item.status || 'Inactive',
        createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
        updatedAt: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : '',
      }));
      
      setProcesses(transformedData);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch processes. Please try again.';
      setError(errorMessage);
      console.error('Error fetching processes:', error);
    }
  }, [model]);

  // Initial data load - only runs once
  useEffect(() => {
    fetchProcesses();
  }, []);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = processes.filter(item =>
      item.processName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.columnList.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rawMaterial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof ProcessItem];
        const bValue = b[sortConfig.key as keyof ProcessItem];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [processes, searchTerm, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, startIndex + entriesPerPage);

  // Event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setError(null);
  }, []);

  const handleEntriesChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((key: string) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePageClick = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleView = useCallback(async (item: ProcessItem) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await model.getProcessById(item.id);
      
      const detailedItem: ProcessItem = {
        id: response.process.id,
        processName: response.process.process_name,
        code: response.process.process_code,
        columnList: Array.isArray(response.process.process_fields) 
          ? response.process.process_fields.join(', ') 
          : item.columnList,
        rawMaterial: response.process.raw_material === 1 ? '1' : '0',
        status: response.process.process_status === 1 ? 'Active' : 'Inactive',
        createdAt: response.process.created_at 
          ? new Date(response.process.created_at).toLocaleDateString() 
          : item.createdAt,
        updatedAt: response.process.updated_at 
          ? new Date(response.process.updated_at).toLocaleDateString() 
          : item.updatedAt,
      };
      
      setViewModalData(detailedItem);
    } catch (error: any) {
      console.warn('Failed to fetch detailed process data, showing cached data:', error);
      setViewModalData(item);
    } finally {
      setLoading(false);
    }
  }, [model]);

  const handleEdit = useCallback((id: number) => {
    if (id === 0) {
      navigate('/process/add');
    } else {
      navigate(`/process/edit/${id}`);
    }
  }, [navigate]);

  const handleDelete = useCallback((item: ProcessItem) => {
    setDeleteModalData(item);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteModalData) return;

    try {
      await model.deleteProcess(deleteModalData.id);
      
      setProcesses(prev => prev.filter(item => item.id !== deleteModalData.id));
      
      setDeleteModalData(null);
      
      const newTotalPages = Math.ceil((filteredAndSortedData.length - 1) / entriesPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
      setError(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete process. Please try again.';
      setError(errorMessage);
      console.error('Error deleting process:', error);
    }
  }, [deleteModalData, model, filteredAndSortedData.length, entriesPerPage, currentPage]);

  const closeViewModal = useCallback(() => {
    setViewModalData(null);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalData(null);
  }, []);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return {
    searchTerm,
    entriesPerPage,
    currentPage,
    sortConfig,
    viewModalData,
    deleteModalData,
    currentData,
    totalPages,
    filteredDataLength: filteredAndSortedData.length,
    startIndex,
    error,
    loading,
    handleSearchChange,
    handleEntriesChange,
    handleSort,
    handlePreviousPage,
    handleNextPage,
    handlePageClick,
    handleView,
    handleEdit,
    handleDelete,
    confirmDelete,
    closeViewModal,
    closeDeleteModal,
  };
};