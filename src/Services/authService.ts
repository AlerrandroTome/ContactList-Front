interface IUser {
  name: string;
  id: string;
  token: string;
}
export class AuthService {
  isUserLogged() {
    const user = JSON.parse(localStorage.getItem("user") as string);
    return user ? true : false;
  }
  saveUserIntoLocalStorage(user: IUser) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  logout() {
    localStorage.removeItem("user");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") as string);
  }
}
