import { ReactNode } from "react";

const HeaderControls: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex-none gap-6 ">{children}</div>;
};

export default HeaderControls;
