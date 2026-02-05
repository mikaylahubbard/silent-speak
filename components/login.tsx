import * as yup from "yup";
import { useAuth } from "../auth/authContext";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`),
});

export default function Login() {
  const { token, user, saveToken, saveUser } = useAuth();
}
