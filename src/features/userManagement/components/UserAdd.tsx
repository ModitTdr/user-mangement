import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import type { UserListType } from '@/features/userManagement/data/users';
import { addUser as addUserService, updateUser as updateUserService } from '@/features/userManagement/services/userServices';

type UserFormData = Omit<UserListType, "id">;

interface UserAddProps {
  closeModal: (value: boolean) => void;
  onSuccess: (user: UserListType) => void;
  user?: UserListType;
}

const UserAdd = ({ closeModal, onSuccess, user }: UserAddProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      address: user?.address || {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        }
      },
      phone: user?.phone || "",
      company: user?.company || {},
    }
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      const result = user
        ? await updateUserService({ ...data, id: user.id })
        : await addUserService(data);
      onSuccess(result);
    } catch (error) {
      console.log(error)
    } finally {
      closeModal(false);
    }


  };

  return (
    <div className="list-container">
      <div className="top">
        <div className="title-area">
          <h3>{user ? "Edit Member" : "Add New Member"}</h3>
          <p>{user ? "Update the member's information" : "Create a new account for the system"}</p>
        </div>
      </div>

      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <Input
            label='Name'
            name='name'
            placeholder='e.g. John Doe'
            register={
              register("name", {
                required: "Name is required",
              })
            }
            error={errors.name}
          />
          <Input
            label='Username'
            name='username'
            placeholder='e.g. johndoe'
            register={
              register("username", {
                required: "Username is required",
              })
            }
            error={errors.username}
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

          <Input
            label='Street'
            name='address.street'
            placeholder='e.g. 123 Main St'
            register={
              register("address.street", {
                required: "Street is required",
              })
            }
            error={errors.username}
          />
          <Input
            label='Suite'
            name='address.suite'
            placeholder='e.g. 123'
            register={
              register("address.suite", {
                required: "Suite is required",
              })
            }
            error={errors.address?.suite}
          />
          <Input
            label='City'
            name='address.city'
            placeholder='e.g. New York'
            register={
              register("address.city", {
                required: "City is required",
              })
            }
            error={errors.address?.city}
          />
          <Input
            label='Zipcode'
            name='address.zipcode'
            placeholder='e.g. 12345'
            register={
              register("address.zipcode", {
                required: "Zipcode is required",
              })
            }
            error={errors.address?.zipcode}
          />
          <Input
            label='Phone'
            name='phone'
            placeholder='e.g. 12345'
            register={
              register("phone", {
                required: "Phone is required",
              })
            }
            error={errors.phone}
          />
          <Input
            label='Company Name'
            name='company.name'
            placeholder='e.g. Google'
            register={
              register("company.name", {
                required: "Company name is required",
              })
            }
            error={errors.company?.name}
          />
          <Input
            label='Company Catchphrase'
            name='company.catchPhrase'
            placeholder='e.g. Google'
            register={
              register("company.catchPhrase", {
                required: "Company name is required",
              })
            }
            error={errors.address?.zipcode}
          />
          <Input
            label='Company BS'
            name='company.bs'
            placeholder='e.g. Google'
            register={
              register("company.bs", {
                required: "Company name is required",
              })
            }
            error={errors.address?.zipcode}
          />
        </div>

        <div className="form-actions">
          <Button type="submit" size='md' disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : user ? "Update" : "Create"}
          </Button>
          <Button type="reset" size='md' variant='ghost' onClick={() => closeModal(false)} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </form>
    </div>

  );
};

export default UserAdd