import { publicApi } from "@/axios/axios";
import type { LoginValues } from "../schema/LoginSchema";
import type { RegisterValues } from "../schema/RegisterSchema";

export const registerUser = async (data: RegisterValues) => {
  const res = await publicApi.post(`auth/register`, data, {
    headers: {
      'Content-Type': "application/json"
    },
  });
  return res;
};

export const LoginUser = async (data: LoginValues) => {
  const res = await publicApi.post('auth/login', data, {
    withCredentials: true
  });
  return res;
};

export const LogoutUser = async () => {
  const res = await publicApi.post(`auth/logout`, {}, {
    withCredentials: true
  });
  return res;
};

export const getCurrentUser = async (token: string) => {
  const res = await publicApi.get('auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res;
};

export const refreshToken = async () => {
  const res = await publicApi.post('auth/refresh-token', {}, {
    withCredentials: true
  });
  return res;
};