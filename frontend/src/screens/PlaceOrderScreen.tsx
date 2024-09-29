import PaymentForm from "../components/cart/PaymentForm";
import Modal from "../components/Modal";
import ShippingForm from "../components/ShippingForm";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

const PlaceOrderScreen: React.FC = () => {
  const { userInfo } = useAuth();

  const {
    cart: {
      shippingAddress: { country, city, address, postalCode },
      paymentMethod,
    },
  } = useCart();

  return (
    <Modal>
      <div className="grid grid-cols-[2.5fr_1.5fr] gap-8">
        <div className="flex flex-col gap-4">
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

        <div>
          <div>
            <button>Order now</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PlaceOrderScreen;
