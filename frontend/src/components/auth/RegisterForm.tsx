import FormRow from "../FormRow";
import useRegisterForm from "../../hooks/useRegisterForm";
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
import { RegisterFormField } from "../../types/authTypes/registerFormReducerTypes";

const RegisterForm: React.FC<{ isUpdating?: boolean }> = ({
  isUpdating = false,
}) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    errors,
    isFormInvalid,
    isLoading,
    isLoadingProfileUpdate,
    isRegistrationSuccess,
    handleRegisterFormSubmit,
    setRegisterFormField,
  } = useRegisterForm();

  const { isUserLoggedIn } = useAuth();
  const { moveTo } = useAppNavigate();
  const { redirect } = useRedirectParam();

  useEffect(() => {
    if (isUserLoggedIn && !isUpdating) redirect("/");
  }, [isUserLoggedIn, redirect, moveTo]);

  return (
    <div>
      <ToastContainer />
      {isRegistrationSuccess && !isUpdating ? (
        <Modal name="registrationSuccess">
          <Modal.Window name="registrationSuccess" positionY="center">
            <RegistrationSuccess name={name} />
          </Modal.Window>
        </Modal>
      ) : (
        <Form onSubmit={(e) => handleRegisterFormSubmit(e, isUpdating)}>
          <div className="text-center text-primary font-semibold text-2xl">
            {isUpdating ? "" : "Register your account"}
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
              onChange={(e) =>
                setRegisterFormField(
                  e.target.id as RegisterFormField,
                  e.target.value
                )
              }
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
              onChange={(e) =>
                setRegisterFormField(
                  e.target.id as RegisterFormField,
                  e.target.value
                )
              }
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
              onChange={(e) =>
                setRegisterFormField(
                  e.target.id as RegisterFormField,
                  e.target.value
                )
              }
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
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setRegisterFormField(
                  e.target.id as RegisterFormField,
                  e.target.value
                )
              }
              required
            />
          </FormRow>

          <div className="flex items-center gap-6 pt-4 mb-4">
            <div className="flex items-center gap-5">
              {isUpdating ? (
                <button
                  className="btn btn-primary"
                  type="submit"
                  value="updateProfile"
                  disabled={
                    isFormInvalid || isLoading || isLoadingProfileUpdate
                  }
                >
                  Update profile
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                  disabled={
                    isFormInvalid || isLoading || isLoadingProfileUpdate
                  }
                >
                  {isLoading || isLoadingProfileUpdate ? (
                    <ButtonLoader text="Signing up..." />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              )}
            </div>

            {!isUpdating && (
              <p className="ml-auto">
                Already have an account ?{" "}
                <Link to={"/login"} className="text-primary font-semibold">
                  Sign In
                </Link>
              </p>
            )}
          </div>
          {errors.registrationError && (
            <Message type="error">{errors.registrationError}</Message>
          )}
        </Form>
      )}
    </div>
  );
};

export default RegisterForm;
