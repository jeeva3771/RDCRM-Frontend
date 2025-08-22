import { loginUser,LoginResponse} from '../api/user' ;

export class UserModel {
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      return await loginUser(username, password);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }
}