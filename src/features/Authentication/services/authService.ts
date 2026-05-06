import type { LoginValues } from "../schema/LoginSchema";
import type { RegisterValues } from "../schema/RegisterSchema";

const API_URL = import.meta.env.VITE_API_URL + "/users"

export const getCurrentUser = async () => {
  const res = await fetch(`${API_URL}/current-user`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Not authenticated");
  return await res.json();
};

export const registerUser = async (data: RegisterValues) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    console.log(error)
  }

};

export const LoginUser = async (data: LoginValues) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    console.log(error)
  }
};

export const LogoutUser = async () => {
  try {
    const res = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include"
    });
    return await res.json();
  } catch (error) {
    console.log(error)
  }
};