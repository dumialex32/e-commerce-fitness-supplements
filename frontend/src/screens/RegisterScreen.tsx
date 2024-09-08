import Logo from "../components/Logo";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterScreen: React.FC = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="mb-20 flex items-center justify-center my-11">
          <Logo size="xxl" />
        </div>

        <div className="flex items-center justify-center">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
