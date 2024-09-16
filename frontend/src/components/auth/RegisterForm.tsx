import FormRow from "../FormRow";
import useRegisterForm from "../../hooks/useRegisterFormReducer";
import { Link } from "react-router-dom";
import ButtonLoader from "../ButtonLoader";
import { ToastContainer } from "react-toastify";
import Form from "../Form";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAppNavigate from "../../hooks/useAppNavigate";
import useRedirectParam from "../../hooks/useRedirectParam";
import Modal from "../Modal";
import RegistrationSuccess from "./RegistrationSuccess";
import Message from "../Message";

const RegisterForm: React.FC = () => {
  const {
    name,
    email,
    password,
    confirmPassword,
    errors,
    isFormInvalid,
    isLoading,
    isRegistrationSuccess,
    handleRegisterFormSubmit,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
  } = useRegisterForm();

  const { isUserLoggedIn } = useAuth();
  const { moveTo } = useAppNavigate();
  const { redirect } = useRedirectParam();

  useEffect(() => {
    if (isUserLoggedIn) moveTo(redirect);
  }, [isUserLoggedIn, redirect, moveTo]);

  return (
    <>
      <ToastContainer />
      {isRegistrationSuccess ? (
        <Modal name="registrationSuccess">
          <Modal.Window name="registrationSuccess" positionY="center">
            <RegistrationSuccess name={name} />
          </Modal.Window>
        </Modal>
      ) : (
        <Form onSubmit={(e) => handleRegisterFormSubmit(e)}>
          <div className="text-center text-primary font-semibold text-2xl">
            Register your account
          </div>

          <FormRow
            direction="horizontal"
            label="Name"
            error={errors.name || ""}
          >
            <input
              type="text"
              value={name}
              id="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormRow>
          <FormRow
            direction="horizontal"
            label="Email"
            error={errors.email || ""}
          >
            <input
              type="text"
              value={email}
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormRow>
          <FormRow
            direction="horizontal"
            label="Password"
            error={errors.password || ""}
          >
            <input
              type="text"
              value={password}
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormRow>

          <FormRow
            direction="horizontal"
            label="Confirm Password"
            error={errors.confirmPassword || ""}
          >
            <input
              type="password"
              id="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormRow>

          <div className="flex items-center gap-6 justify-center pt-4 mb-4">
            <div className="flex items-center gap-5">
              <button
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
                disabled={isFormInvalid || isLoading}
              >
                {isLoading ? <ButtonLoader text="Signing up..." /> : "Sign Up"}
              </button>
            </div>

            <p className="ml-auto">
              Already have an account ?{" "}
              <Link to={"/login"} className="text-primary font-semibold">
                Sign In
              </Link>
            </p>
          </div>
          {errors.registrationError && (
            <Message type="error">{errors.registrationError}</Message>
          )}
        </Form>
      )}
    </>
  );
};

export default RegisterForm;
