import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import UserAdd from "./UserAdd";
import { getUsers as getUsersService, deleteUser as deleteUserService } from "../services/userServices";
import toast from "react-hot-toast";
import type { UserFormValues } from "../schema/formValidation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

const UserList = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserFormValues[]>([]);
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserFormValues | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const func = async () => {
      try {
        setIsLoading(true);
        const test = await getUsersService();
        setUsers(test)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    func()
  }, []);


  const handleDelete = async (id: number) => {
    const prevData = users;
    setUsers((users) => users.filter(u => u.id !== id))
    try {
      await deleteUserService(id);
      toast.success('Deleted Success');
    } catch {
      toast.error('Failed to delete user')
      setUsers(prevData);
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
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...newUser } : u));
    } else {
      setUsers(prev => [...prev, newUser!]);
    }
    toast.success(editingUser ? "User updated successfully" : "User added successfully");
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase())
      || user.email.toLowerCase().includes(search.toLowerCase())
      || user.username.toLowerCase().includes(search.toLowerCase())
      || user.address.city.toLowerCase().includes(search.toLowerCase())
      || user.phone.toLowerCase().includes(search.toLowerCase())
      || user.company.name.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <section className="list-container">
      <div className="top">
        <div className="title-area">
          <h3>User List ({users.length})</h3>
          <p>Manage and monitor system users</p>
        </div>
        <div className="controls">
          <div className="search-box">
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-box">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "all", label: "All" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
            <div className="add-user">
              <Button onClick={() => setModal(true)} size="sm">
                <Plus size={18} /> <span>Add User</span>
              </Button>
            </div>
          </div>
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
                      <Button onClick={() => handleEdit(user)} size="icon">
                        <Pencil size={14} />
                      </Button>
                      <Button onClick={() => handleDelete(user.id)} size="icon">
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
