export interface IUserService {
  getUser(): string,
  setUser(name: string): string
  setOwnerName? (name: string): string
}
