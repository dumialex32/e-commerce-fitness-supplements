import FormRow from "../FormRow";
import useModal from "../../hooks/useModal";
import useShippingForm from "../../hooks/useShippingForm";
import { countries } from "../../utils/formUtils/shippingFormUtils";
import Form from "../Form";

const ShippingForm: React.FC<{ isEdit?: boolean }> = ({ isEdit = false }) => {
  const {
    country,
    city,
    address,
    postalCode,
    errors,
    isFormInvalid,
    cities,
    renderCityOptions,
    shippingAddress,
    setCountry,
    setCity,
    setAddress,
    setPostalCode,
    handleShippingFormSubmit,
  } = useShippingForm();

  const { close: closeModal } = useModal();

  return (
    <Form onSubmit={(e) => handleShippingFormSubmit(e, isEdit, closeModal)}>
      <FormRow label="Country" error={errors.country}>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          <option hidden>Select your country</option>
          {countries.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="City" error={errors.city}>
        {cities.length > 0 ? (
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {renderCityOptions}
          </select>
        ) : (
          <input
            type="text"
            value={city}
            placeholder="Please insert your city"
            id="city"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        )}
      </FormRow>
      <FormRow label="Address" error={errors.address}>
        <input
          type="text"
          value={address}
          placeholder="Please insert your address"
          id="address"
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="Postal Code" error={errors.postalCode}>
        <input
          type="text"
          value={postalCode}
          placeholder="Please insert your postal code"
          id="postalCode"
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </FormRow>

      <button
        type="submit"
        className="btn btn-primary self-start"
        disabled={isFormInvalid}
      >
        {!isEdit ? "Continue" : "Edit"}
      </button>
    </Form>
  );
};

export default ShippingForm;
