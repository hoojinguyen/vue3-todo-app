import { post, put } from "@/utils";

export interface LoginUser {
  username: string;
  password: string;
}

export interface RegisterUser extends LoginUser {
  email: string;
  phoneNumber: string;
}

export interface LoginResponse {
  accessToken: string;
  refrestToken?: string;
}
export interface UpdateUser extends RegisterUser {}

export default class User {
  static async login(info: LoginUser) {
    return await post("/login", { ...info });
  }

  static async register(info: RegisterUser) {
    return post("/register", { ...info });
  }

  static async logout() {
    return;
  }

  static async updateInfo(user: UpdateUser) {
    return put("/register", { ...user });
  }
}
