import { dbClient } from "../../config/db";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { User } from "../../models/user.model";
import { CreateUserDTO, UpdateUserDTO } from "../../dtos/user.dtos";
import { UserMapper } from "../../mappers/user.mapper";

export class UserPrismaRepository implements IUserRepository {
  async createUser(data: CreateUserDTO): Promise<User> {
    const user = await dbClient.user.create({
      data,
      include: { watchlists: true },
    });
    return UserMapper.toDomain(user);
  }
  async getUserById(id: string): Promise<User | null> {
    const user = await dbClient.user.findUnique({
      where: { id },
      include: { watchlists: true },
    });
    return user ? UserMapper.toDomain(user) : null;
  }
  async getAllUsers(): Promise<User[]> {
    const users = await dbClient.user.findMany({
      include: { watchlists: true },
    });
    return users.map(UserMapper.toDomain);
  }
  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await dbClient.user.update({
      where: { id },
      data,
      include: { watchlists: true },
    });
    return UserMapper.toDomain(user);
  }
  async deleteUser(id: string): Promise<void> {
    await dbClient.user.delete({ where: { id } });
  }
}
