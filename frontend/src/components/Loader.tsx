const loadingSize = {
  lg: "w-10",
  xl: "w-24",
};

interface ILoaderSize {
  size?: "lg" | "xl";
}

const Loader: React.FC<ILoaderSize> = ({ size }) => {
  const sizeClass = size ? loadingSize[size] : "";

  return (
    <div className="flex justify-center items-center">
      <span className={`loading loading-spinner ${sizeClass}`}></span>
    </div>
  );
};

export default Loader;
