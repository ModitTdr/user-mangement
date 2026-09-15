import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { addUser as addUserService, updateUser as updateUserService } from '@/features/userManagement/services/userServices';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema, type UserFormValues } from '../schema/formValidation';
import LoaderText from '@/components/ui/LoaderText';
import { useMutation } from '@/hook/useMutation';
import Select from '@/components/ui/Select';

interface UserAddProps {
  closeModal: (value: boolean) => void;
  onSuccess: () => void;
  user?: UserFormValues;
}

type FieldConfig =
  | { type: 'input'; name: keyof UserFormValues; label: string; placeholder?: string; inputType?: string }
  | { type: 'select'; name: keyof UserFormValues; label: string; options: { value: string; label: string }[] };

const fields: FieldConfig[] = [
  { type: 'input', name: 'firstName', label: 'First Name', placeholder: 'e.g. John' },
  { type: 'input', name: 'lastName', label: 'Last Name', placeholder: 'e.g. Doe' },
  { type: 'input', name: 'username', label: 'Username', placeholder: 'e.g. johndoe123' },
  { type: 'input', name: 'email', label: 'Email Address', placeholder: 'john@example.com' },
  { type: 'input', name: 'address', label: 'Address', placeholder: 'Kathmandu, Nepal' },
  { type: 'input', name: 'phone', label: 'Phone', placeholder: 'e.g. 9758487610' },
  { type: 'input', name: 'occupation', label: 'Occupation', placeholder: 'e.g. Engineer' },
  { type: 'input', name: 'dateOfBirth', label: 'Date of Birth', inputType: 'date' },
  {
    type: 'select', name: 'maritalStatus', label: 'Marital Status', options: [
      { value: 'single', label: 'Single' },
      { value: 'married', label: 'Married' },
      { value: 'divorced', label: 'Divorced' },
      { value: 'widowed', label: 'Widowed' },
    ],
  },
  {
    type: 'select', name: 'status', label: 'Status', options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
      { value: 'banned', label: 'Banned' },
    ],
  },
  { type: 'select', name: 'role', label: 'Role', options: [{ value: 'ADMIN', label: 'Admin' }, { value: 'USER', label: 'User' }] },
  { type: 'select', name: 'gender', label: 'Gender', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }] },
];

const UserAdd = ({ closeModal, onSuccess, user }: UserAddProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      id: user?.id,
      username: user?.username || '',
      email: user?.email || '',
      role: user?.role || 'USER',
      phone: user?.phone || '',
      status: user?.status || 'pending',
      createdAt: user?.createdAt,
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      gender: user?.gender || 'other',
      dateOfBirth: user?.dateOfBirth || '',
      address: user?.address || '',
      occupation: user?.occupation || '',
      maritalStatus: user?.maritalStatus || 'single',
    },
  });

  const { mutate } = useMutation<UserFormValues, UserFormValues>({
    mutateFn: user ? updateUserService : addUserService,
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      const result = await mutate(data);
      if (result) onSuccess();
    } catch (error) {
      console.log(error);
    } finally {
      closeModal(false);
    }
  };

  return (
    <div className="list-container">
      <div className="top">
        <div className="title-area">
          <h3>{user ? 'Edit Member' : 'Add New Member'}</h3>
          <p>{user ? "Update the member's information" : 'Create a new account for the system'}</p>
        </div>
      </div>

      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          {fields.map((field) =>
            field.type === 'select' ? (
              <Select
                key={field.name}
                label={field.label}
                options={field.options}
                error={errors[field.name]}
                disabled={isSubmitting}
                {...register(field.name)}
              />
            ) : (
              <Input
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.inputType}
                error={errors[field.name]}
                disabled={isSubmitting}
                {...register(field.name)}
              />
            )
          )}
        </div>

        <div className="form-actions">
          <Button type="submit" size="md" disabled={isSubmitting}>
            {isSubmitting ? <LoaderText>Submitting</LoaderText> : user ? 'Update' : 'Create'}
          </Button>
          <Button type="reset" size="md" variant="ghost" onClick={() => closeModal(false)} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserAdd;