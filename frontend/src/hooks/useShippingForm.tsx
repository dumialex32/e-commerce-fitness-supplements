import { useEffect, useMemo, useReducer } from "react";
import {
  IinitialState,
  ActionType,
  ShippingFormField,
} from "../types/cartTypes/shippingFormReducerTypes";
import { storeShippingAddress } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import useAppNavigate from "./useAppNavigate";
import { getCitties } from "../api/cittiesApi";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IShippingAddress } from "../types/cartTypes/cartItemTypes";
import { checkFormInputs } from "../utils/formUtils/formUtils";

const init = (shippingAddress: IShippingAddress): IinitialState => ({
  country: shippingAddress.country || "",
  city: shippingAddress.city || "",
  address: shippingAddress.address || "",
  postalCode: shippingAddress.postalCode || "",
  errors: {
    country: "",
    city: "",
    address: "",
    postalCode: "",
  },
  cities: [],
});

const reducer = (state: IinitialState, action: ActionType) => {
  switch (action.type) {
    case "SET_FIELD": {
      const { field, value } = action.payload;
      return { ...state, [field]: value };
    }

    case "SET_CITIES":
      return { ...state, cities: action.payload };

    case "SET_ERRORS":
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };

    default:
      return state;
  }
};

const useShippingForm = () => {
  const { shippingAddress } = useSelector((state: RootState) => state.cart);

  const [{ country, city, address, postalCode, errors, cities }, dispatch] =
    useReducer(reducer, shippingAddress, init);

  const renderCityOptions = useMemo(() => {
    return [
      <option key="default" value="" disabled>
        Choose your city
      </option>,
      ...cities.map((c, i) => (
        <option key={i} value={c}>
          {c}
        </option>
      )),
    ];
  }, [cities]);

  const { moveTo } = useAppNavigate();

  const reduxDispatch = useDispatch();

  const isFormInvalid = checkFormInputs(
    { country, city, address, postalCode },
    errors
  );

  useEffect(() => {
    const fetchCitties = async () => {
      try {
        if (country) {
          const citties = await getCitties(country);

          setCitties(citties);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCitties();
  }, [country]);

  const handleShippingFormSubmit = (
    e: React.FormEvent,
    isEdit: boolean,
    closeModal: () => void
  ) => {
    e.preventDefault();
    const shippingAddress = { country, city, address, postalCode };
    reduxDispatch(storeShippingAddress(shippingAddress));
    if (!isEdit) {
      moveTo("/payment");
    } else {
      closeModal();
    }
  };

  const setShippingFormField = (field: ShippingFormField, value: string) => {
    dispatch({ type: "SET_FIELD", payload: { field, value } });
  };

  const setCitties = (citties: string[]) => {
    if (citties.length > 0) dispatch({ type: "SET_CITIES", payload: citties });
  };

  return {
    country,
    city,
    address,
    postalCode,
    errors,
    cities,
    isFormInvalid,
    renderCityOptions,
    shippingAddress,
    setShippingFormField,
    handleShippingFormSubmit,
  };
};

export default useShippingForm;
