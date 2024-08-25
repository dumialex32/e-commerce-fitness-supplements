import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <div className="flex-1">
      <Link to="/">
        <img src="images/logo.png" className="h-16" />
      </Link>
    </div>
  );
};

export default Logo;
