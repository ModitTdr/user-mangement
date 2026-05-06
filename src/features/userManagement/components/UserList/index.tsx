import { useCallback, useState } from "react";
import { Eye, MoveRight, Pencil, Trash2, X } from "lucide-react";
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
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/components/ui/Modal";
import LoaderText from "@/components/ui/LoaderText";
import PaginationButton from "../PaginationButton";
import { useNavigate } from "react-router";
import { useDebounce } from "@/hook/useDebounce";
import Badge from "@/components/ui/Badge";

export type PaginatedUsersResponse = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: UserFormValues[];
};

const UserList = () => {
  const [formModal, setFormModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [user, setUser] = useState<UserFormValues | null>(null);
  const [filter, setFilter] = useState({
    sort: "default",
    status: "all",
    search: ""
  })
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const navigate = useNavigate();

  const debounceSearch = useDebounce(filter.search, 500);

  const queryFn = useCallback(() => {
    return getUsers(page, limit, filter.status, filter.sort, debounceSearch);
  }, [page, limit, filter.status, filter.sort, debounceSearch]);

  const { data, isLoading: isDataLoading, setData } = useFetch<PaginatedUsersResponse>({
    queryFn
  });
  const { mutate, isLoading: isDeleting } = useMutation<string, boolean>({
    mutateFn: deleteUserService
  });


  const users = data?.data ?? [];
  const totalPages = data?.pages ?? 0;

  const handleDelete = async (user: UserFormValues) => {
    const prevData = data;
    try {
      await mutate(user.id);
      toast.success('Deleted Success');
      setData((prev) => ({
        ...prev,
        items: prev.items - 1,
        data: prev.data.filter(u => u.id !== user.id)
      }))
      setDeleteModal(false);
    } catch {
      toast.error('Failed to delete user');
      setData(prevData);
    }
  };

  const handleEdit = (user: UserFormValues) => {
    setUser(user);
    setFormModal(true);
  };

  const handleSucess = async (newUser: UserFormValues) => {
    if (user) {
      setData(prev => ({
        ...prev,
        data: prev.data.map(u => u.id === user.id ? { ...u, ...newUser } : u)
      }));
    } else {
      setData(prev => ({
        ...prev,
        items: prev.items + 1,
        data: [...prev.data, newUser]
      }));
    }
    toast.success(user ? "User updated successfully" : "User added successfully");
  }

  const handleUsers = (id: string) => {
    navigate(`/users/${id}`)
  }

  return (
    <section className={styles.userlist}>
      <div className={styles.userlist__header}>
        <div className={styles.userlist__title}>
          <h3>User List ({data?.items ?? 0})</h3>
          <p>Manage and monitor system users</p>
        </div>
        <div className={styles.userlist__actions}>
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={filter.search}
            onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
            inputSize="md"
          />
          <Select
            value={filter.status}
            onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
            options={[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "pending", label: "Pending" },
              { value: "banned", label: "Banned" },
            ]}
            selectSize="sm"
          />
          <Select
            value={filter.sort}
            onChange={(e) => setFilter(prev => ({ ...prev, sort: e.target.value }))}
            options={[
              { value: "default", label: "Default" },
              { value: "firstName", label: "Ascending - Name (A-Z)" },
              { value: "-firstName", label: "Descending - Name (Z-A)" },
            ]}
            selectSize="sm"
          />
          {
            (filter.status !== "all" || filter.sort !== "default") && (
              <Button onClick={() => setFilter(prev => ({ ...prev, status: "all", sort: "default" }))} variant="outline">
                <X size={15} /> <span>Reset</span>
              </Button>
            )
          }
          <Button onClick={() => setFormModal(true)} size="sm">
            <span>Add User</span> <MoveRight size={15} />
          </Button>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow gridTemplateColumns="180px 140px 180px 200px 200px 100px 1fr">
            <TableHeader>Full Name</TableHeader>
            <TableHeader>Gender</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Address</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            isDataLoading
              ? <LoaderText>Loading</LoaderText>
              : users.length !== 0
                ? users.map((user) => {
                  return (
                    <TableRow key={user.id} gridTemplateColumns="180px 140px 180px 200px 200px 100px 1fr">
                      <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Badge status={user.status}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => {
                          if (user.id) {
                            handleUsers(user.id)
                          }
                        }} size="icon" variant="ghost">
                          <Eye size={15} />
                        </Button>
                        <Button onClick={() => handleEdit(user)} size="icon" variant="ghost">
                          <Pencil size={14} />
                        </Button>
                        <Button onClick={() => {
                          setDeleteModal(true);
                          setUser(user);
                        }}
                          size="icon"
                          variant="ghost"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
                :
                <TableRow gridTemplateColumns="1fr">
                  <TableCell>No users found matching your criteria.</TableCell>
                </TableRow>
          }
        </TableBody>
      </Table>

      <PaginationButton page={page} totalPages={totalPages} setPage={setPage} />

      {
        formModal && createPortal(
          <section className="user-add-section">
            <UserAdd
              closeModal={setFormModal}
              onSuccess={handleSucess}
              user={user || undefined}
            />
          </section>,
          document.body
        )
      }
      {
        deleteModal &&
        <Modal onClose={() => setDeleteModal(false)}>
          <ModalHeader>
            <ModalTitle>Delete User</ModalTitle>
          </ModalHeader>
          <ModalBody style={{ maxWidth: "400px" }}>
            Are you sure you want to delete the user <strong> {user ? `${user.firstName} ${user.lastName}` : ""}?</strong>
            <br />
            <div className={styles.modal__alert}>
              ⚠︎ This action is irreversible and the user will be permanently removed from the system.
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setDeleteModal(false)} disabled={isDeleting} variant="ghost">Close</Button>
            <Button
              onClick={() => {
                if (!user?.id) return;
                handleDelete(user);
              }}
              variant="danger"
              disabled={isDeleting}
            >
              {isDeleting ? <LoaderText> Deleting </LoaderText> : "Delete"}
            </Button>
          </ModalFooter>
        </Modal>
      }
    </section >
  )
}

export default UserList;