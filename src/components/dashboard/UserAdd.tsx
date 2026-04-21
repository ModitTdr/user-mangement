import { useForm } from 'react-hook-form'
import type { UserListType } from "@/data/users"
import { addUser } from '@/services/userService';
import InputReactHook from '@/components/ui/InputReactHook';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

type UserFormData = Omit<UserListType, "id">;

const UserAdd = ({ setModal, onSuccess }: { setModal: (value: boolean) => void, onSuccess: () => void }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      status: true
    }
  });
  const onSubmit = (data: UserFormData) => {
    addUser(data);
    onSuccess();
    setModal(false);
  };

  return (
    <div className="table">
      <div className="top">
        <div className="title-area">
          <h3>Add New Member</h3>
          <p>Create a new account for the system</p>
        </div>
      </div>

      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <InputReactHook
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
          <InputReactHook
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

          <div className="inputs">
            <Select
              label="Role"
              options={[
                { value: "student", label: "Student" },
                { value: "teacher", label: "Teacher" },
              ]}
              register={register("role", { required: true })}
            />
          </div>

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

          <InputReactHook
            label='Password'
            type='password'
            name='password'
            placeholder='Minimum 8 characters'
            register={
              register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })
            }
            error={errors.password}
          />
        </div>

        <div className="form-actions">
          <Button type="submit" size='lg'>
            Create User
          </Button>
          <Button type="reset" size='lg' variant='ghost' onClick={() => setModal(false)}>
            Cancle
          </Button>
        </div>
      </form>
    </div>

  );
};

export default UserAdd
