import PaymentForm from "../components/cart/PaymentForm";
import Modal from "../components/Modal";
import ShippingForm from "../components/ShippingForm";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import TotalCheckout from "../components/checkout/TotalCheckout";
import OrderDisclaimer from "../components/checkout/OrderDisclaimer";
import TotalCheckoutPrice from "../components/checkout/TotalCheckoutPrice";
import CartItem from "../components/cart/CartItem";
import OrderHelpAndReturnInfo from "../components/checkout/OrderHelpAndReturnInfo";
import PlaceOrderButton from "../components/checkout/PlaceOrderButton";
import { IOrder } from "../types/Order/OrderTypes";

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

  const order: IOrder = {
    orderItems: cartItems,
    shippingAddress: { country, city, address, postalCode },
    paymentMethod,
    totalPrice,
    itemsPrice,
    shippingPrice,
    taxPrice,
  };
  return (
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
            <div className="p-4 bg-gray-50 rounded-md">
              {cartItems.map((i) => {
                return <CartItem key={i._id} item={i} />;
              })}
            </div>

            <div className="p-4 bg-gray-50 rounded-md">
              <div className="flex gap-4 items-center">
                <PlaceOrderButton order={order} />
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
            <div>
              <button className="btn btn-primary w-full">Order now</button>
            </div>
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
  );
};

export default PlaceOrderScreen;

{
  /* <div className="grid grid-cols-2">
  <div className="flex">
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
    <p>5</p>
  </div>
  <div className="flex">
    <p>1</p>
  </div>
</div>; */
}
