export interface UserListType {
  id: string,
  name: string,
  email: string,
  role: string,
  status: boolean,
  gender: string,
  password: string
}

export const usersList: UserListType[] = [
  {
    id: "testId1",
    name: "Amit",
    email: "amit@b.com",
    role: "teacher",
    status: true,
    gender: "male",
    password: "1234",
  },
  {
    id: "testId2",
    name: "Sara",
    email: "sara@b.com",
    role: "teacher",
    status: false,
    gender: "female",
    password: "abcd"
  },
  {
    id: "testId3",
    name: "John",
    email: "john@b.com",
    role: "student",
    status: true,
    gender: "male",
    password: "pass123"
  },
  {
    id: "testId4",
    name: "Priya",
    email: "priya@b.com",
    role: "student",
    status: true,
    gender: "female",
    password: "secure1"
  },
  {
    id: "testId5",
    name: "David",
    email: "david@b.com",
    role: "student",
    status: false,
    gender: "male",
    password: "xyz789"
  }
];
