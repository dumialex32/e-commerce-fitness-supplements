const SideBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mt-2 p-4 flex flex-col gap-2">{children}</div>;
};

export default SideBar;
