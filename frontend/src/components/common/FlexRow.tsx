import { ReactNode } from "react";

const FlexRow: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="flex gap-2 justify-between items-center">{children}</div>
    </>
  );
};

export default FlexRow;
