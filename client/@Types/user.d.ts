export interface IUser {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
