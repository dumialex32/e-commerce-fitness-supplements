import { Link } from "react-router-dom";
import PaymentForm from "../components/cart/PaymentForm";
import Modal from "../components/Modal";
import ShippingForm from "../components/ShippingForm";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import TotalCheckout from "../components/checkout/TotalCheckout";

const PlaceOrderScreen: React.FC = () => {
  const { userInfo } = useAuth();

  const {
    cart: {
      cartItems,
      shippingAddress: { country, city, address, postalCode },
      paymentMethod,
      totalPrice,
      itemsPrice,
      shippingPrice,
      taxPrice,
    },
  } = useCart();

  return (
    <Modal>
      <div className="max-w-cm-78 grid grid-cols-[2.5fr_1.5fr] gap-8">
        <div className="flex flex-col gap-5">
          <div className="p-4 bg-gray-50 rounded-md">
            <div className="flex justify-between items-center ">
              <div>
                <h2 className="text-xl font-semibold">
                  On delivery at {userInfo?.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {country}, {city}, {address}, {postalCode}
                </p>
              </div>

              <Modal.Open name="editShippingAddress">
                <button className="text-primary">Modify</button>
              </Modal.Open>
              <Modal.Window name="editShippingAddress">
                <ShippingForm isEdit={true} />
              </Modal.Window>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  Payment with {paymentMethod}
                </h2>
              </div>
              <Modal.Open name="editPaymentMethod">
                <button className="text-primary">Modify</button>
              </Modal.Open>
              <Modal.Window name="editPaymentMethod">
                <PaymentForm isEdit={true} />
              </Modal.Window>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-5 bg-gray-50 rounded-md">
          <div>
            <button className="btn btn-primary w-full">Order now</button>
          </div>
          <p className="text-sm text-gray-500">
            By confirming your order, you fully accept our Terms of Use and
            Sale. The purchase will only be completed upon shipment
            confirmation. Please review our{" "}
            <Link to="/placeholder" className="text-primary">
              Privacy Policy
            </Link>
            , our{" "}
            <Link to="/placeholder" className="text-primary">
              Cookie Policy
            </Link>{" "}
            , and our Interest-Based Advertising Policy.
          </p>
          <div className="divider"></div>

          <TotalCheckout
            totalPrice={totalPrice}
            itemsPrice={itemsPrice}
            taxPrice={taxPrice}
            shippingPrice={shippingPrice}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PlaceOrderScreen;
