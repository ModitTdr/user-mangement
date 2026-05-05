import Input from "@/components/ui/Input"
import { useForm } from "react-hook-form"
import { loginSchema, type LoginValues } from "../../schema/LoginSchema";
import styles from "./style.module.scss"
import Button from "@/components/ui/Button";
import { LoginUser } from "../../services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@/hook/useMutation";
import LoaderText from "@/components/ui/LoaderText";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../authSlice";
import type { LoginResponse } from "../../types/LoginReturn";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  const mutation = useMutation<LoginValues, LoginResponse>({
    mutateFn: LoginUser
  });
  const { isLoading: isSubmitting } = mutation;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginValues) => {
    const res = await mutation.mutate(data);
    if (!res) {
      toast.error("Something went wrong");
      return;
    }

    if (res.success) {
      dispatch(setCredentials(res.data))
      navigate('/');
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
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
        <p>Don't have an account?</p>
        <Link to="/register">Register</Link>
      </div>
    </form >
  )
}

export default Login