export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  message: string;
  statusCode: number;
  success: boolean;
}

export interface User {
  __v: number;
  _id: string;
  avatar: Avatar;
  createdAt: string;
  email: string;
  isEmailVerified: boolean;
  loginType: string;
  role: string;
  updatedAt: string;
  username: string;
}

export interface Avatar {
  _id: string;
  localPath: string;
  url: string;
}