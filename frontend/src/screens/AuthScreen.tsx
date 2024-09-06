import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const AuthScreen: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <LoginForm />

      <div className="bg-gray-100 rounded p-11 flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-center">
          You don't have already an account ?
        </h3>

        <Link
          to={"/register"}
          className="btn btn-primary text-xl text-white font-semibold uppercase"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default AuthScreen;
