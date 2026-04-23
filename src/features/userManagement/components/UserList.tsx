import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import type { UserListType } from "../data/users";
import UserAdd from "./UserAdd";
import { getUsers as getUsersService, deleteUser as deleteUserService } from "../services/userServices";
import toast from "react-hot-toast";

const UserList = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserListType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserListType | null>(null);
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
  const handleEdit = (user: UserListType) => {
    setEditingUser(user);
    closeModal(true);
  };
  const handleSucess = async (newUser: UserListType) => {
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

      <div className="table">
        <div className="table-header">
          <h4>Id</h4>
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Address</h4>
          <h4>Phone</h4>
          <h4>Company</h4>
          <h4>Actions</h4>
        </div>
        {
          filteredUsers.length !== 0
            ? filteredUsers.map((user) => {
              return (
                <div className="table-body" key={user.id}>
                  <p>{user.id}</p>
                  <div>
                    <span>{user.name}</span>
                    <small>@{user.username}</small>
                  </div>
                  <p>{user.email}</p>
                  <p>{user.address.city}</p>
                  <p>{user.phone}</p>
                  <p>{user.company.name}</p>
                  <div className="table-actions">
                    <Button onClick={() => handleEdit(user)} size="icon">
                      <Pencil size={14} />
                    </Button>
                    <Button onClick={() => handleDelete(user.id)} size="icon">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              )
            })
            : <p id="no-users">No users found matching your criteria.</p>
        }
      </div>

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
