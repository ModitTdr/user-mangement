import type { UserListType } from "../../data/users";
import { usersList } from "../../data/users";


const LOCALSTORAGE_KEY = "users_data";


export const getUsers = (): UserListType[] => {
  const users = localStorage.getItem(LOCALSTORAGE_KEY);
  if (!users) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(usersList));
    return usersList;
  }
  return JSON.parse(users);
};

export const addUser = (user: Omit<UserListType, "id">): void => {
  const users = getUsers();
  const id = Date.now().toString();
  const updatedUsers = [...users, { ...user, id }];
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updatedUsers));
  window.location.reload();
};

export const deleteUser = (id: string): void => {
  const users = getUsers();
  const filteredUsers = users.filter((user) => user.id !== id);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(filteredUsers));
};

export const updateUser = (updatedUser: UserListType): void => {
  const users = getUsers();
  const updatedUsers = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updatedUsers));
};
