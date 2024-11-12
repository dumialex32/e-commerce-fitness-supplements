import PaymentForm from "../components/cart/PaymentForm";
import Modal from "../components/Modal";
import ShippingForm from "../components/checkout/ShippingForm";
import TotalCheckout from "../components/checkout/TotalCheckout";
import OrderDisclaimer from "../components/checkout/OrderDisclaimer";
import TotalCheckoutPrice from "../components/checkout/TotalCheckoutPrice";
import CartItem from "../components/cart/CartItem";
import OrderHelpAndReturnInfo from "../components/checkout/OrderHelpAndReturnInfo";
import PlaceOrderButton from "../components/checkout/PlaceOrderButton";
import CheckoutScreen from "./CheckoutScreen";
import usePlaceOrder from "../hooks/usePlaceOrder";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const PlaceOrderScreen: React.FC = () => {
  const {
    userInfo,
    shippingAddress,
    paymentMethod,
    cartItems,
    order,
    totalPrice,
    itemsPrice,
    taxPrice,
    shippingPrice,
  } = usePlaceOrder();

  return (
    <>
      {/* <ToastContainer /> */}
      <CheckoutScreen step1 step2 step3 step4>
        <Modal>
          <div className="flex justify-center">
            <div className="max-w-cm-78 grid grid-cols-[2.5fr_1fr] gap-8 items-start">
              <div className="flex flex-col gap-5">
                <div className="p-4 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-center ">
                    <div>
                      <h2 className="text-xl font-semibold">
                        On delivery at {userInfo?.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {shippingAddress.country}, {shippingAddress.city},{" "}
                        {shippingAddress.address}, {shippingAddress.postalCode}
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
                <div className="p-4 bg-gray-50 rounded-md">
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((i) => {
                      return <CartItem key={i._id} item={i} />;
                    })
                  ) : (
                    <Message type="info">
                      All items have been removed from your cart. Click{" "}
                      <Link to="/" className="font-bold uppercase">
                        here
                      </Link>{" "}
                      to browse new items!
                    </Message>
                  )}
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <div className="flex gap-4 items-center">
                    <PlaceOrderButton
                      order={order}
                      disabled={!cartItems || cartItems.length === 0}
                    />
                    <div className="flex flex-col">
                      <div className="flex gap-1">
                        <TotalCheckoutPrice totalPrice={totalPrice} />
                      </div>
                      <OrderDisclaimer />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <OrderHelpAndReturnInfo />
                </div>
              </div>

              <div className="flex flex-col gap-2 p-5 bg-gray-50 rounded-md">
                <PlaceOrderButton
                  order={order}
                  disabled={!cartItems || cartItems.length === 0}
                />
                <OrderDisclaimer />
                <div className="divider"></div>

                <TotalCheckout
                  totalPrice={totalPrice}
                  itemsPrice={itemsPrice}
                  taxPrice={taxPrice}
                  shippingPrice={shippingPrice}
                />
              </div>
            </div>
          </div>
        </Modal>
      </CheckoutScreen>
    </>
  );
};

export default PlaceOrderScreen;
