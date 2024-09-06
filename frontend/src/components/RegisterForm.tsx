import FormRow from "./FormRow";
import useRegisterForm from "../hooks/reducerHooks/useRegisterFormReducer";
import { Link } from "react-router-dom";
import ButtonLoader from "./ButtonLoader";
import { ToastContainer } from "react-toastify";
import LoginForm from "./auth/LoginForm";
import Form from "./Form";

const RegisterForm: React.FC = () => {
  const {
    name,
    email,
    password,
    errors,
    isFormInvalid,
    isLoading,
    handleRegisterSubmit,
    setName,
    setEmail,
    setPassword,
    isRegistrationSuccess,
  } = useRegisterForm();

  console.log(isRegistrationSuccess);
  console.log(errors);

  return (
    <>
      <ToastContainer />
      {isRegistrationSuccess ? (
        <LoginForm />
      ) : (
        <Form onSubmit={(e) => handleRegisterSubmit(e)}>
          <FormRow direction="horizontal" label="Name" error={errors.name}>
            <input
              type="text"
              value={name}
              id="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormRow>
          <FormRow direction="horizontal" label="Email" error={errors.email}>
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
            error={errors.password}
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

          <div className="flex items-center gap-6 justify-center pt-4">
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
        </Form>
      )}
    </>
  );
};

export default RegisterForm;