import { FormEvent, useState } from "react";
import FormRow from "../components/FormRow";
import { useLoginMutation } from "../slices/usersApiSlice";
import ButtonLoader from "../components/ButtonLoader";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { IUserInfo } from "../types/user/authSliceTypes";
import { setCredentials } from "../slices/authSlice";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setError(null);
      const userInfo: IUserInfo = await login({ email, password }).unwrap();
      console.log(userInfo);
      if (userInfo && !isEmpty(userInfo)) {
        dispatch(setCredentials(userInfo));
        navigate("/");
      }
    } catch (error: any) {
      if (error.status === 401) {
        console.error(error);
        setError(error?.data.message);
      } else {
        setError("An unknown error occured. Please try again");
      }
    }
  };

  return (
    <div className="border p-12 rounded-md">
      <div className="grid grid-cols-2 gap-4">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="mb-11 text-center">
            <h1 className="text-4xl mb-2">Login to your account</h1>
            <p className="text-gray-500">
              If you are already a user, please insert the email and your
              password
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
        </form>

        <div className="bg-gray-100 rounded py-3 px-6 flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-center">
            You don't have already an account ?
          </h3>
          <button className="btn btn-primary text-xl text-white font-semibold uppercase">
            Sign Up
          </button>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
