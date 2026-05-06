import type { User } from "./LoginReturn";

export interface RegisterResponse {
  data: {
    user: User;
  };
  message: string;
  statusCode: number;
  success: boolean;
}