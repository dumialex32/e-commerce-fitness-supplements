const RegistrationSuccess: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl pb-4">
        Welcome to DevMuscle{" "}
        <p className="text-primary font-semibold">{name || ""}</p>
      </h1>

      <p className="text-lg text-gray-800">
        You’re all set! Redirecting you to the main page...
      </p>
    </div>
  );
};

export default RegistrationSuccess;
