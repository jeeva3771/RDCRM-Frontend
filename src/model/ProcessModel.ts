import { processRegister, ProcessResponse, SingleProcessResponse, getProcesses, getProcessById, deleteProcess, updateProcess } from '../api/process';

export class ProcessModel {
  async getAllProcesses() {
    try {
      const response = await getProcesses(1, 1000);
      
      return {
        data: response.process.map(item => ({
          id: item.id,
          processName: item.process_name,
          name: item.process_name,
          code: item.process_code,
          columns: item.process_fields,
          columnList: Array.isArray(item.process_fields) ? item.process_fields.join(', ') : '',
          status: item.process_status === 1 ? 'Active' : 'Inactive',
          rawMaterial: item.raw_material === 1 ? '1' : '0',
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }))
      };
    } catch (error) {
      console.error('Error fetching all processes:', error);
      throw error;
    }
  }

  async deleteProcess(id: number) {
    try {
      return await deleteProcess(id);
    } catch (error) {
      console.error('Error deleting process:', error);
      throw error;
    }
  }

  async getProcessById(id: number): Promise<SingleProcessResponse> {
    try {
      return await getProcessById(id);
    } catch (error) {
      console.error('Error fetching process by ID:', error);
      throw error;
    }
  }

  async process(process_name: string, process_status: string, raw_material: string, process_fields: string): Promise<ProcessResponse> {
    try {
      return await processRegister(process_name, process_status, raw_material, process_fields);
    } catch (error) {
      console.error('Error registering process:', error);
      throw error;
    }
  }

  async getProcess(id: number): Promise<SingleProcessResponse> {
    try {
      return await this.getProcessById(id);
    } catch (error) {
      console.error('Error fetching process:', error);
      throw error;
    }
  }

  async updateProcess(id: number, process_name: string, process_status: string, raw_material: string, process_fields: string): Promise<ProcessResponse> {
    try {
      return await updateProcess(id, process_name, process_status, raw_material, process_fields);
    } catch (error) {
      console.error('Error updating process:', error);
      throw error;
    }
  }
}