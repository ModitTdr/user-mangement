import { useState } from "react";
import UserCards from "./UserCards";
import { Plus } from "lucide-react";
import { getUsers, deleteUser } from "@/services/userService";
import { createPortal } from "react-dom";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import type { UserListType } from "../data/users";
import UserAdd from "./UserAdd";

const UserList = () => {
  const [users, setUsers] = useState<UserListType[]>(() => getUsers());
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserListType | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleDelete = (id: string) => {
    deleteUser(id);
    setUsers(getUsers());
  };

  const handleEdit = (user: UserListType) => {
    setEditingUser(user);
    setModal(true);
  };

  const closeModal = (value: boolean) => {
    setModal(value);
    if (!value) setEditingUser(null);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase())
      || user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all"
      || (statusFilter === "active" && user.status === true)
      || (statusFilter === "inactive" && user.status === false);
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="table">
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

      <div className="card-container">
        {
          filteredUsers.length !== 0
            ? filteredUsers.map((user) => {
              return (
                <UserCards {...user} key={user.name + user.id} onDelete={handleDelete} onEdit={handleEdit} />
              )
            })
            : <p id="no-users">No users found matching your criteria.</p>
        }
      </div>

      {
        modal && createPortal(
          <section className="user-add-section">
            <UserAdd
              setModal={closeModal}
              onSuccess={() => setUsers(getUsers())}
              user={editingUser || undefined}
            />
          </section>,
          document.body
        )
      }

    </section>
  )
}

export default UserList;
