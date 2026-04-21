import type { UserListType } from "@//data/users"
import { PencilIcon, Trash2 } from "lucide-react"
import Button from "@/components/ui/Button";

interface UserCardProps extends UserListType {
  onDelete?: (id: string) => void;
  onEdit?: (user: UserListType) => void;
}

const UserCards = (user: UserCardProps) => {
  const { id, name, email, role, status, onDelete, onEdit } = user;

  return (
    <div className="card" >
      <div className="card-actions">
        {
          onEdit &&
          <Button onClick={() => onEdit(user)} variant="outline" size="icon" hidden={false}>
            <PencilIcon size={16} />
          </Button>
        }
        {
          onDelete &&
          <Button onClick={() => onDelete(id)} variant="outline" size="icon" hidden={false}>
            <Trash2 size={16} />
          </Button>
        }
      </div>
      <div className="card-header">
        <img src="https://img.freepik.com/premium-vector/avatar-profil-picture-icon-vector-design-template_393879-5783.jpg?semt=ais_hybrid&w=740&q=80" alt="gender" />
      </div>
      <div className="card-body">
        <div className="card-title">
          <h4>{name}</h4>
          <span className={`status ${status ? "active" : "inactive"}`} />
        </div>
        <p>{role}</p>
        <p>{email}</p>
      </div>
    </div>
  )
}


export default UserCards
