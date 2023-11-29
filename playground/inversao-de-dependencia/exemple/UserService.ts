import { IUserService } from "./IUserService";

export class UserService implements IUserService {
  getUser(): string {
    return "Carlos";
  }
  setUser(name: string): string {
    return name;
  }
}
