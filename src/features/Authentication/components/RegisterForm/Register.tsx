import Input from "@/components/ui/Input"
import { useForm } from "react-hook-form"
import styles from "../LoginForm/style.module.scss"
import Button from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@/hook/useMutation";
import LoaderText from "@/components/ui/LoaderText";
import { Link, useNavigate } from "react-router";
import { RegisterSchema, type RegisterValues } from "../../schema/RegisterSchema";
import { registerUser } from "../../services/authService";
import toast from "react-hot-toast";
import type { RegisterResponse } from "../../types/RegisterReturn";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      role: "ADMIN",
    }
  });

  const mutation = useMutation<RegisterValues, RegisterResponse>({
    mutateFn: registerUser
  });
  const { isLoading: isSubmitting } = mutation;

  const navigate = useNavigate();
  const onSubmit = async (data: RegisterValues) => {
    const res = await mutation.mutate(data);
    if (!res) {
      toast.error("Something went wrong");
      return;
    }

    if (res.success) {
      navigate('/login');
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <Input
        label='Email'
        placeholder='e.g. John Doe'
        error={errors.email}
        disabled={isSubmitting}
        inputSize="full"
        {...register("email")}
      />
      <Input
        label='Username'
        placeholder='e.g. John Doe'
        error={errors.username}
        disabled={isSubmitting}
        inputSize="full"
        {...register("username")}
      />
      <Input
        label='Password'
        type="password"
        placeholder='e.g. John Doe'
        error={errors.password}
        disabled={isSubmitting}
        inputSize="full"
        {...register("password")}
      />
      <Button type="submit" size="md" disabled={isSubmitting}>
        {isSubmitting ? <LoaderText>Logging In</LoaderText> : "Login"}
      </Button>

      <div className={styles.loginForm__links}>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </form >
  )
}

export default Register