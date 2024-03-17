import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user.service";
import { InputWithValidation } from "../../components/InputWithValidation/InputWithValidation";
import { AxiosError } from "axios";

export const Register = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const [validationErrors, setValidationErrors] = useState<
    Array<{ property: string; message: string }>
  >([]);

  const [genericError, setGenericError] = useState("");

  const handleRegister = async () => {
    try {
      await userService.createUser(registerForm);
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (Array.isArray(error.response?.data.message)) {
          setValidationErrors(error.response?.data.message);
        } else {
          setGenericError(error.response?.data.message);
        }
      }
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setValidationErrors((prevState) =>
      prevState.filter((err) => err.property !== e.target.name),
    );

    setGenericError("");
  };

  return (
    <>
      <div className="container h-100 center-h-and-v">
        <h3>Register</h3>
        <InputWithValidation
          type="email"
          name="email"
          errorMessage={
            validationErrors.find((err) => err.property === "email")?.message
          }
          isInvalid={!!validationErrors.find((err) => err.property === "email")}
          label="Email"
          onChange={handleChange}
        />
        <InputWithValidation
          type="password"
          name="password"
          errorMessage={
            validationErrors.find((err) => err.property === "password")?.message
          }
          isInvalid={
            !!validationErrors.find((err) => err.property === "password")
          }
          label="Password"
          onChange={handleChange}
        />
        <Button onClick={handleRegister}>Submit</Button>
        {genericError && <p className="text-danger">{genericError}</p>}
      </div>
    </>
  );
};
