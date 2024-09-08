import FormRow from "../FormRow";
import Message from "../Message";
import ButtonLoader from "../ButtonLoader";
import useAuth from "../../hooks/useAuth";
import Form from "../Form";
import useRedirectParam from "../../hooks/useRedirectParam";
import { useEffect } from "react";
import useAppNavigate from "../../hooks/useAppNavigate";

const LoginForm: React.FC = () => {
  const {
    email,
    password,
    error,
    isLoading,
    isUserLoggedIn,
    handleAuthSubmit,
    setEmail,
    setPassword,
  } = useAuth();

  const { redirect } = useRedirectParam();
  const { moveTo } = useAppNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      moveTo(redirect);
    }
  }, [isUserLoggedIn, moveTo, redirect]);

  return (
    <Form onSubmit={handleAuthSubmit}>
      <div className="mb-11 text-center">
        <h1 className="text-4xl mb-2 text-primary font-semibold">
          Login to your account
        </h1>
        <p className="text-gray-500">
          If you are already a user, please enter your email and password.
        </p>
      </div>
      <FormRow labelWithIcon={"Email"} error={""}>
        <input
          type="email"
          value={email}
          name="email"
          id="email"
          autoComplete="email"
          required
          placeholder="Insert your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>

      <FormRow labelWithIcon="Password" error={""}>
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          autoComplete="password"
          required
          placeholder="Insert your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>

      {error ? <Message type="error">{error}</Message> : ""}

      <button
        type="submit"
        className="btn text-xl self-center uppercase"
        disabled={isLoading}
      >
        {isLoading ? <ButtonLoader text="Signing in..." /> : "Sign In"}
      </button>
    </Form>
  );
};

export default LoginForm;
