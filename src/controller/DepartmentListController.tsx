import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DepartmentModel } from '../model/DepartmentModel';

export interface DepartmentItem {
  id: number;
  departmentName: string;
  departmentProcess: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface DepartmentListControllerProps {
  searchTerm: string;
  entriesPerPage: number;
  currentPage: number;
  sortConfig: SortConfig;
  viewModalData: DepartmentItem | null;
  deleteModalData: DepartmentItem | null;
  currentData: DepartmentItem[];
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
  handleView: (item: DepartmentItem) => void;
  handleEdit: (id: number) => void;
  handleDelete: (item: DepartmentItem) => void;
  confirmDelete: () => void;
  closeViewModal: () => void;
  closeDeleteModal: () => void;
}

export const useDepartmentListController = (): DepartmentListControllerProps => {
  const navigate = useNavigate();
  
  const model = useMemo(() => new DepartmentModel(), []);

  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: 'asc' });
  const [viewModalData, setViewModalData] = useState<DepartmentItem | null>(null);
  const [deleteModalData, setDeleteModalData] = useState<DepartmentItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await model.getAllDepartments(currentPage, entriesPerPage, searchTerm);
      
      setDepartments(response.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch departments. Please try again.';
      setError(errorMessage);
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  }, [model, currentPage, entriesPerPage, searchTerm]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const filteredAndSortedData = useMemo(() => {
    let filtered = departments.filter(item =>
      item.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.departmentProcess.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof DepartmentItem];
        const bValue = b[sortConfig.key as keyof DepartmentItem];
        
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
  }, [departments, searchTerm, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, startIndex + entriesPerPage);

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

  const handleView = useCallback(async (item: DepartmentItem) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await model.getDepartmentById(item.id);
      
      const detailedItem: DepartmentItem = {
        id: response.department.id,
        departmentName: response.department.department_name,
        departmentProcess: Array.isArray(response.department.department_process) 
          ? response.department.department_process.join(', ') 
          : response.department.department_process,
        status: response.department.department_status === 1 ? 'Active' : 'Inactive',
        createdAt: response.department.created_at 
          ? new Date(response.department.created_at).toLocaleDateString() 
          : item.createdAt,
        updatedAt: response.department.updated_at 
          ? new Date(response.department.updated_at).toLocaleDateString() 
          : item.updatedAt,
      };
      
      setViewModalData(detailedItem);
    } catch (error: any) {
      console.warn('Failed to fetch detailed department data, showing cached data:', error);
      setViewModalData(item);
    } finally {
      setLoading(false);
    }
  }, [model]);

  const handleEdit = useCallback((id: number) => {
    if (id === 0) {
      navigate('/departments/add');
    } else {
      navigate(`/departments/edit/${id}`);
    }
  }, [navigate]);

  const handleDelete = useCallback((item: DepartmentItem) => {
    setDeleteModalData(item);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteModalData) return;

    try {
      await model.deleteDepartment(deleteModalData.id);
      
      setDepartments(prev => prev.filter(item => item.id !== deleteModalData.id));
      
      setDeleteModalData(null);
      
      const newTotalPages = Math.ceil((filteredAndSortedData.length - 1) / entriesPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
      setError(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete department. Please try again.';
      setError(errorMessage);
      console.error('Error deleting department:', error);
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