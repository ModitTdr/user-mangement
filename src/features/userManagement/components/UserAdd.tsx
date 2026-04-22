import { useForm } from 'react-hook-form'
import type { UserListType } from "@/data/users"
import { addUser, updateUser } from '@/services/userService';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';

type UserFormData = Omit<UserListType, "id">;

interface UserAddProps {
  setModal: (value: boolean) => void;
  onSuccess: () => void;
  user?: UserListType;
}

const UserAdd = ({ setModal, onSuccess, user }: UserAddProps) => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: user ? {
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender,
      status: user.status
    } : {
      status: true
    }
  });

  const status = watch("status");

  const onSubmit = (data: UserFormData) => {
    if (user) {
      updateUser({ ...data, id: user.id });
    } else {
      addUser(data);
    }
    onSuccess();
    setModal(false);
  };

  return (
    <div className="table">
      <div className="top">
        <div className="title-area">
          <h3>{user ? "Edit Member" : "Add New Member"}</h3>
          <p>{user ? "Update the member's information" : "Create a new account for the system"}</p>
        </div>
      </div>

      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <Input
            label='Full Name'
            name='name'
            placeholder='e.g. John Doe'
            register={
              register("name", {
                required: "Full name is required",
              })
            }
            error={errors.name}
          />
          {
            !user &&
            <Input
              label='Email Address'
              name='email'
              placeholder='john@example.com'
              register={
                register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })
              }
              error={errors.email}
            />
          }

          <Select
            label="Role"
            options={[
              { value: "student", label: "Student" },
              { value: "teacher", label: "Teacher" },
            ]}
            register={register("role", { required: true })}
          />

          <Checkbox
            label="Account Status"
            register={register("status")}
            value={status}
          />

          <div className="inputs">
            <label>Gender Selection</label>
            <div className="gender-checkbox-group">
              <label className="gender-option">
                <input type="radio" value="male" {...register("gender", { required: true })} />
                <span className="gender-checkmark">Male</span>
              </label>
              <label className="gender-option">
                <input type="radio" value="female" {...register("gender", { required: true })} />
                <span className="gender-checkmark">Female</span>
              </label>
              <label className="gender-option">
                <input type="radio" value="other" {...register("gender", { required: true })} />
                <span className="gender-checkmark">Other</span>
              </label>
            </div>
            {errors.gender && <span className="error">Please select a gender</span>}
          </div>
        </div>

        <div className="form-actions">
          <Button type="submit" size='md'>
            {user ? "Update User" : "Create User"}
          </Button>
          <Button type="reset" size='md' variant='ghost' onClick={() => setModal(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>

  );
};

export default UserAdd
