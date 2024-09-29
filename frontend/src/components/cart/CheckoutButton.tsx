const CheckoutButton: React.FC<{ handleCheckout: () => void }> = ({
  handleCheckout,
}) => {
  return (
    <button className="btn btn-primary" onClick={handleCheckout}>
      Proceed to checkout
    </button>
  );
};

export default CheckoutButton;
