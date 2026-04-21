import type { UserListType } from "@//data/users"
import { Trash2 } from "lucide-react"
import Button from "@/components/ui/Button/Button";

interface UserCardProps extends UserListType {
  onDelete?: (id: string) => void;
}

const UserCards = ({ id, name, email, role, status, onDelete }: UserCardProps) => {
  return (
    <div className="card" >
      {
        onDelete &&
        <div className="card-actions">
          <Button onClick={() => onDelete(id)} variant="danger" size="icon">
            <Trash2 size={16} />
          </Button>
        </div>
      }
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
