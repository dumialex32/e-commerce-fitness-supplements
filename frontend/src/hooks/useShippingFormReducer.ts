import { useEffect, useMemo, useReducer } from "react";
import {
  IinitialState,
  ActionType,
} from "../types/cartTypes/shippingFormReducerTypes";
import { storeShippingAddress } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import useAppNavigate from "./useAppNavigate";
import { getCitties } from "../api/cittiesApi";
import { checkFormInputs } from "../utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const initialState: IinitialState = {
  country: "",
  city: "",
  address: "",
  postalCode: "",
  errors: {
    country: "",
    city: "",
    address: "",
    postalCode: "",
  },
  cities: [],
};

const reducer = (state: IinitialState, action: ActionType) => {
  switch (action.type) {
    case "SET_COUNTRY":
      return { ...state, country: action.payload };

    case "SET_CITY":
      return { ...state, city: action.payload };

    case "SET_ADDRESS":
      return { ...state, address: action.payload };

    case "SET_POSTAL_CODE":
      return { ...state, postalCode: action.payload };

    case "SET_ERRORS":
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };

    case "SET_CITIES":
      return { ...state, cities: action.payload };

    default:
      return state;
  }
};

const useShippingFormReducer = () => {
  const [{ country, city, address, postalCode, errors, cities }, dispatch] =
    useReducer(reducer, initialState);

  const { shippingAddress } = useSelector((state: RootState) => state.cart);
  console.log(shippingAddress);

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
          console.log(citties);
          setCitties(citties);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCitties();
  }, [country]);

  const handleShippingFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const shippingAddress = { country, city, address, postalCode };
    reduxDispatch(storeShippingAddress(shippingAddress));
    moveTo("/checkout");
  };

  const setCountry = (countryInput: string) => {
    dispatch({ type: "SET_COUNTRY", payload: countryInput });
  };

  const setCity = (cityInput: string) => {
    dispatch({ type: "SET_CITY", payload: cityInput });
  };

  const setAddress = (addressInput: string) => {
    dispatch({ type: "SET_ADDRESS", payload: addressInput });
  };

  const setPostalCode = (postalCodeInput: string) => {
    dispatch({ type: "SET_POSTAL_CODE", payload: postalCodeInput });
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
    setCountry,
    setCity,
    setAddress,
    setPostalCode,
    handleShippingFormSubmit,
  };
};

export default useShippingFormReducer;
