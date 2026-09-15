import Input from "@/components/ui/Input"
import { useForm } from "react-hook-form"
import { loginSchema, type LoginValues } from "../../schema/LoginSchema";
import styles from "./style.module.scss"
import Button from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import LoaderText from "@/components/ui/LoaderText";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../authSlice";
import type { AppDispatch } from "@/store/store";

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });


  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async (data: LoginValues) => {
    try {
      await dispatch(login(data)).unwrap();
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error || "Login failed");
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