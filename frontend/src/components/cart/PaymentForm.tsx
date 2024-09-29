import useModal from "../../hooks/useModal";
import usePayment from "../../hooks/usePayment";
import Form from "../Form";
import FormRow from "../FormRow";

const PaymentForm: React.FC<{ isEdit?: boolean }> = ({ isEdit = false }) => {
  const { paymentMethod, setPaymentMethod, handlePaymentSubmit } = usePayment();
  const { close: closeModal } = useModal();
  return (
    <Form onSubmit={(e) => handlePaymentSubmit(e, isEdit, closeModal)}>
      <FormRow direction="vertical" labelWithIcon="PayPal" error="">
        <input
          className=""
          type="radio"
          name="paymentMethod"
          value="paypal"
          id="paypal"
          onChange={(e) => setPaymentMethod(e.target.value)}
          checked={paymentMethod === "paypal"}
        />
      </FormRow>
      <FormRow direction="vertical" labelWithIcon="CreditCard" error="">
        {/* for the moment we have only the paypal option */}
        <input
          className=""
          type="radio"
          name="paymentMethod"
          value="creditCard"
          id="creditCard"
          onChange={(e) => setPaymentMethod(e.target.value)}
          disabled
        />
      </FormRow>

      <button type="submit" className="btn btn-primary">
        {isEdit ? "Edit" : "Continue"}
      </button>
    </Form>
  );
};

export default PaymentForm;
