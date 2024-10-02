import { NavLink } from "react-router-dom";

const CheckoutSteps: React.FC<{
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}> = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center">
      <ul className="flex justify-center gap-4 font-semibold">
        <li>
          {step1 ? (
            <NavLink to={"/login"}>Login</NavLink>
          ) : (
            <button className="button" disabled>
              Login
            </button>
          )}
        </li>
        <li>
          {step2 ? (
            <NavLink to={"/shipping"}>Shipping</NavLink>
          ) : (
            <button disabled>Shipping</button>
          )}
        </li>
        <li>
          {step3 ? (
            <NavLink to={"/payment"}>Payment</NavLink>
          ) : (
            <button className="text-gray-400" disabled>
              Payment
            </button>
          )}
        </li>
        <li>
          {step4 ? (
            <NavLink to={"/checkout"}>Checkout</NavLink>
          ) : (
            <button className="text-gray-400" disabled>
              Checkout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default CheckoutSteps;
