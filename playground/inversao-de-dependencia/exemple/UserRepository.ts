import { IUserService } from "./IUserService";

export class UserRepository implements IUserService {
  constructor() {}
  getUser(): string {
    return "Carlos";
  }
  setUser(): string {
    return "noovo nome";
  }
}
