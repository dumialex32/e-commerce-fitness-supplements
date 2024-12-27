import { ReactNode } from "react";

const ScreenTitle: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <h1 className="text-4xl font-semibold text-primary mb-8">{children}</h1>
  );
};

export default ScreenTitle;
