import { departmentRegister, DepartmentResponse, SingleDepartmentResponse, getDepartments, getDepartmentById, deleteDepartment, updateDepartment } from '../api/department';

export class DepartmentModel {
  async getAllDepartments(page: number = 1, perPage: number = 10, searchTerm?: string) {
    try {
      const response = await getDepartments(page, perPage, searchTerm);
      
      return {
        data: response.departments.map((item: any) => ({
          id: item.id,
          departmentName: item.department_name,
          name: item.department_name, // For compatibility with sorting
          departmentProcess: Array.isArray(item.department_process_names) 
            ? item.department_process_names.join(', ') 
            : item.department_process_names || '',
          status: item.department_status === 1 ? 'Active' : 'Inactive',
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        })),
        currentPage: response.currentPage,
        perPage: response.perPage,
        totalDepartments: response.totalDepartments,
        totalPages: response.totalPages,
      };
    } catch (error) {
      console.error('Error fetching all departments:', error);
      throw error;
    }
  }

  async deleteDepartment(id: number) {
    try {
      return await deleteDepartment(id);
    } catch (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
  }

  async getDepartmentById(id: number): Promise<SingleDepartmentResponse> {
    try {
      return await getDepartmentById(id);
    } catch (error) {
      console.error('Error fetching department by ID:', error);
      throw error;
    }
  }

  async department(department_name: string, department_status: string, department_process: string): Promise<DepartmentResponse> {
    try {
      return await departmentRegister(department_name, department_status, department_process);
    } catch (error) {
      console.error('Error registering department:', error);
      throw error;
    }
  }

  async updateDepartment(id: number, department_name: string, department_status: string, department_process: string): Promise<DepartmentResponse> {
    try {
      return await updateDepartment(id, department_name, department_status, department_process);
    } catch (error) {
      console.error('Error updating department:', error);
      throw error;
    }
  }
}