import Form from "../components/Form";
import FormRow from "../components/FormRow";
import useShippingFormReducer from "../hooks/useShippingFormReducer";
import { countries } from "../utils/formUtils/shippingFormUtils";
import CheckoutScreen from "./CheckoutScreen";

const ShippingScreen: React.FC = () => {
  const {
    country,
    city,
    address,
    postalCode,
    errors,
    isFormInvalid,
    cities,
    renderCityOptions,
    setCountry,
    setCity,
    setAddress,
    setPostalCode,
    handleShippingFormSubmit,
  } = useShippingFormReducer();

  return (
    <CheckoutScreen step1 step2>
      <Form onSubmit={(e) => handleShippingFormSubmit(e)}>
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
          Continue
        </button>
      </Form>
    </CheckoutScreen>
  );
};

export default ShippingScreen;
