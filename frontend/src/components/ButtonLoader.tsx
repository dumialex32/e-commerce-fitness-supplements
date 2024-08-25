import Loader from "./Loader";

const ButtonLoader: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="flex gap-3 items-center transition-all delay-150">
      <p className="text-sm">{text}</p>
      <Loader />
    </div>
  );
};

export default ButtonLoader;
