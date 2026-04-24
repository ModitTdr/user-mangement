import { PencilIcon, Trash2 } from "lucide-react"
import Button from "@/components/ui/Button";
import type { UserFormValues } from "../schema/formValidation";

interface UserCardProps extends UserFormValues {
  onDelete?: (id: number) => void;
  onEdit?: (user: UserFormValues) => void;
}

const UserCards = (user: UserCardProps) => {
  const { id, name, email, address, onDelete, onEdit } = user;

  return (
    <div className="card" >
      <div className="card-actions">
        {
          onEdit &&
          <Button onClick={() => onEdit(user)} variant="outline" size="icon" hidden={true} className="card-btn">
            <PencilIcon size={16} />
          </Button>
        }
        {
          onDelete &&
          <Button onClick={() => onDelete(id)} variant="outline" size="icon" hidden={true} className="card-btn">
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
          {/* <span className={`status ${status ? "active" : "inactive"}`} /> */}
        </div>
        <p>{address.city}</p>
        <p>{email}</p>
      </div>
    </div>
  )
}


export default UserCards
