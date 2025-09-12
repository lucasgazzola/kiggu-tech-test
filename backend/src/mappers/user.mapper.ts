import { User } from "../models/user.model";

export class UserMapper {
  static toDomain(prismaUser: any): User {
    return {
      id: prismaUser.id,
      email: prismaUser.email,
      name: prismaUser.name,
      password: prismaUser.password,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      watchlists: prismaUser.watchlists,
      events: prismaUser.events,
    };
  }
}
