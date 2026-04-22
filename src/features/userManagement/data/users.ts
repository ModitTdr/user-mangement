export interface UserListType {
  id: string,
  name: string,
  email: string,
  role: string,
  status: boolean,
  gender: string,
}

export const usersList: UserListType[] = [
  {
    id: "testId1",
    name: "Amit",
    email: "amit@b.com",
    role: "teacher",
    status: true,
    gender: "male",
  },
  {
    id: "testId2",
    name: "Sara",
    email: "sara@b.com",
    role: "teacher",
    status: false,
    gender: "female",
  },
  {
    id: "testId3",
    name: "John",
    email: "john@b.com",
    role: "student",
    status: true,
    gender: "male",
  },
  {
    id: "testId4",
    name: "Priya",
    email: "priya@b.com",
    role: "student",
    status: true,
    gender: "female",
  },
  {
    id: "testId5",
    name: "David",
    email: "david@b.com",
    role: "student",
    status: false,
    gender: "male",
  }
];
