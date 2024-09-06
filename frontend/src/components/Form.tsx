import { ReactNode } from "react";

const Form: React.FC<{
  children: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}> = ({ children, onSubmit }) => {
  return (
    <form
      className="flex flex-col gap-4 border-2 p-11 rounded-md"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
