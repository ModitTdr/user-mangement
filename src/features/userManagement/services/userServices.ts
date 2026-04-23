import type { UserListType } from "../data/users";

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const addUser = async (user: Omit<UserListType, 'id'>) => {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json; charset=UTF-8"
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error("Failed to create user");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateUser = async (user: UserListType) => {
  try {
    const res = await fetch(`${API_URL}/users/${user.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error("Failed to update user");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteUser = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) {
      throw new Error("Failed to delete user");
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}