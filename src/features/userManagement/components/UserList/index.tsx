import { useMemo, useState } from "react";
import { MoveRight, Pencil, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import UserAdd from "../UserAdd";
import { deleteUser as deleteUserService, getUsers } from "@/features/userManagement/services/userServices";
import toast from "react-hot-toast";
import type { UserFormValues } from "@/features/userManagement/schema/formValidation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import styles from './style.module.scss';
import { useFetch } from "@/hook/useFetch";
import { useMutation } from "@/hook/useMutation";
import LoadingPage from "@/pages/LoadingPage";

const UserList = () => {
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserFormValues | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data, isLoading: isDataLoading, setData } = useFetch<UserFormValues[]>({
    queryFn: getUsers
  });
  const { mutate, isLoading: isDeleting } = useMutation<number, boolean>({
    mutateFn: deleteUserService
  });

  const filteredUsers = useMemo(() => {
    return data.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase())
        || user.email.toLowerCase().includes(search.toLowerCase())
        || user.username.toLowerCase().includes(search.toLowerCase())
        || user.address.city.toLowerCase().includes(search.toLowerCase())
        || user.phone.toLowerCase().includes(search.toLowerCase())
        || user.company.name.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [data, search]);

  if (isDataLoading) return <LoadingPage />;
  if (isDeleting) return <LoadingPage text="Deleting" />

  const handleDelete = async (id: number) => {
    const prevData = data;
    setData((users) => users.filter(u => u.id !== id))
    try {
      await mutate(id);
      toast.success('Deleted Success');
    } catch {
      toast.error('Failed to delete user');
      setData(prevData);
    }
  };

  const closeModal = (value: boolean) => {
    setModal(value);
    if (!value) setEditingUser(null);
  };

  const handleEdit = (user: UserFormValues) => {
    setEditingUser(user);
    closeModal(true);
  };

  const handleSucess = async (newUser: UserFormValues) => {
    if (editingUser) {
      setData(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...newUser } : u));
    } else {
      setData(prev => [...prev, newUser!]);
    }
    toast.success(editingUser ? "User updated successfully" : "User added successfully");
  }

  return (
    <section className={styles.userlist}>
      <div className={styles.userlist__header}>
        <div className={styles.userlist__title}>
          <h3>User List ({data.length})</h3>
          <p>Manage and monitor system users</p>
        </div>
        <div className={styles.userlist__actions}>
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            inputSize="lg"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            selectSize="sm"
          />
          <Button onClick={() => setModal(true)} size="sm">
            <span>Add User</span> <MoveRight size={15} />
          </Button>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow gridTemplateColumns="50px 180px 220px 180px 200px 200px 1fr">
            <TableHeader>Id</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Address</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Company</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            filteredUsers.length !== 0
              ? filteredUsers.map((user) => {
                return (
                  <TableRow key={user.id} gridTemplateColumns="50px 180px 220px 180px 200px 200px 1fr">
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address.city}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.company.name}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(user)} size="icon" variant="ghost">
                        <Pencil size={14} />
                      </Button>
                      <Button onClick={() => handleDelete(user.id)} size="icon" variant="ghost">
                        <Trash2 size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
              :
              <TableRow>
                <TableCell>No users found matching your criteria.</TableCell>
              </TableRow>
          }
        </TableBody>
      </Table>

      {
        modal && createPortal(
          <section className="user-add-section">
            <UserAdd
              closeModal={closeModal}
              onSuccess={handleSucess}
              user={editingUser || undefined}
            />
          </section>,
          document.body
        )
      }
    </section >
  )
}

export default UserList;
