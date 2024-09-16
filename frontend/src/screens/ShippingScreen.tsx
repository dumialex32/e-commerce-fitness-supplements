import { useMemo } from "react";
import Form from "../components/Form";
import FormRow from "../components/FormRow";
import useShippingFormReducer from "../hooks/useShippingFormReducer";
import { countries } from "../utils/formUtils/shippingFormUtils";

const ShippingScreen: React.FC = () => {
  const {
    country,
    city,
    address,
    postalCode,
    errors,
    isFormInvalid,
    cities,
    setCountry,
    setCity,
    setAddress,
    setPostalCode,
    handleShippingFormSubmit,
  } = useShippingFormReducer();

  console.log(cities);

  const renderCities = useMemo(
    () =>
      cities.map((city, i) => (
        <option key={i} value={city}>
          {city}
        </option>
      )),
    [cities]
  );

  return (
    <div className="w-cm-64">
      <div>
        <h1 className="text-4xl mb-6">Shipping info</h1>
      </div>

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
              {renderCities}
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
        <FormRow label="Postal code" error={errors.postalCode}>
          <input
            type="text"
            value={postalCode}
            placeholder="Please insert your postal code"
            id="postalCode"
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </FormRow>

        <button className="btn btn-primary self-start" disabled={isFormInvalid}>
          Next
        </button>
      </Form>
    </div>
  );
};

export default ShippingScreen;
