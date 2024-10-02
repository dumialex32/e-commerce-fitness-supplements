import { Link } from "react-router-dom";

const OrderHelpAndReturnInfo: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 text-xs text-gray-500">
      <p>
        If you need assistance, please{" "}
        <Link to="/placeholder" className="text-primary">
          contact us.
        </Link>
      </p>
      <p>
        When you place an order by clicking the "Buy Now" button, you will
        receive a confirmation message. The purchase contract is only finalized
        once you receive confirmation of shipment.
      </p>
      <p>
        According to DEVMUSCLE return policy, new and unopened items can be
        returned within 30 days of delivery, with certain exceptions and
        restrictions. For more details, please review the{" "}
        <Link to="/placeholder" className="text-primary">
          return policy.
        </Link>{" "}
      </p>
    </div>
  );
};

export default OrderHelpAndReturnInfo;
