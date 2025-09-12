import { RegisterDTO, LoginDTO } from "../../dtos/auth.dtos";
import { User } from "../../models/user.model";

export interface IAuthService {
  login(dto: LoginDTO): Promise<{ token: string; user: User }>;
  register(dto: RegisterDTO): Promise<{ token: string; user: User }>;
  getMe(userId: string): Promise<User | null>;
  logout(userId: string): Promise<void>;

  deleteUser(userId: string): Promise<void>;
}
