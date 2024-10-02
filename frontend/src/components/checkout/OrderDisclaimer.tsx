import { Link } from "react-router-dom";

const OrderDisclaimer: React.FC = () => {
  return (
    <p className="text-sm text-gray-500">
      By confirming your order, you fully accept our Terms of Use and Sale. The
      purchase will only be completed upon shipment confirmation. Please review
      our{" "}
      <Link to="/placeholder" className="text-primary">
        Privacy Policy
      </Link>
      , our{" "}
      <Link to="/placeholder" className="text-primary">
        Cookie Policy
      </Link>{" "}
      , and our Interest-Based Advertising Policy.
    </p>
  );
};

export default OrderDisclaimer;
