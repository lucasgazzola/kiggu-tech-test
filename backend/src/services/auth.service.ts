import { RegisterDTO, LoginDTO } from "../dtos/auth.dtos";
import { IAuthService } from "./interfaces/auth.service.interface";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../repositories/interfaces/user.repository.interface";
import { NotFoundError } from "../exceptions/db/NotFoundError";
import { BadRequestException } from "../exceptions/http/BadRequestException";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}
  deleteUser(userId: string): Promise<void> {
    return this.userRepository.deleteUser(userId);
  }

  async login(dto: LoginDTO): Promise<{ token: string; user: User }> {
    const user = await this.userRepository
      .getAllUsers()
      .then((users) => users.find((u) => u.email === dto.email));
    if (!user) throw new BadRequestException("Invalid credentials");
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new BadRequestException("Invalid credentials");
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return { token, user };
  }

  async register(dto: RegisterDTO): Promise<{ token: string; user: User }> {
    const existing = await this.userRepository
      .getAllUsers()
      .then((users) => users.find((u) => u.email === dto.email));
    if (existing) throw new BadRequestException("Invalid credentials");
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.createUser({
      email: dto.email,
      name: dto.name,
      password: hashed,
    });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return { token, user };
  }

  async getMe(userId: string): Promise<User | null> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new NotFoundError(`User with id ${userId} not found.`);
    return user;
  }

  async logout(_userId: string): Promise<void> {
    // Si usas JWT, el logout es del lado del cliente. Si usas sesiones, aquí puedes invalidar.
    return;
  }
}
