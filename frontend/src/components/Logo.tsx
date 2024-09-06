import { Link } from "react-router-dom";

type TLogoSize = "s" | "m" | "l" | "xl" | "xxl";

const logoSize: Record<TLogoSize, string> = {
  s: "h-12",
  m: "h-16",
  l: "h-24",
  xl: "h-32",
  xxl: "h-40",
};

const Logo: React.FC<{ size?: TLogoSize }> = ({ size = "m" }) => {
  return (
    <div className="flex">
      <Link to="/">
        <img src="images/logo.png" className={`${logoSize[size]}`} />
      </Link>
    </div>
  );
};

export default Logo;
