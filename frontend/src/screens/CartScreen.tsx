import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartItem from "../components/cart/CartItem";
import CartOverviewCard from "../components/cart/CartOverviewCard";
import CartList from "../components/cart/CartItemList";
import { ICartItem } from "../types/cart/cartItemTypes";
import Message from "../components/Message";
import NavigationButtons from "../components/NavigationButtons";

const CartScreen: React.FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);

  return (
    <>
      <div className="mb-6">
        <NavigationButtons>
          <NavigationButtons.NavigateBack />
          <NavigationButtons.NavigateTo to="/">
            Continue shopping
          </NavigationButtons.NavigateTo>
        </NavigationButtons>
      </div>
      <h1 className="text-3xl color mb-6 text-gray-600">Shopping cart</h1>
      {cartItems.length === 0 ? (
        <Message type="info">Your cart is empty</Message>
      ) : (
        <div>
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <CartList
              cartItems={cartItems}
              render={(cartItem: ICartItem) => {
                return <CartItem key={cartItem._id} item={cartItem} />;
              }}
            />

            <CartOverviewCard />
          </div>
        </div>
      )}
    </>
  );
};

export default CartScreen;
