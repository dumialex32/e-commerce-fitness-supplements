export interface IErrors {
  country: string;
  city: string;
  address: string;
  postalCode: string;
}

export interface IinitialState {
  country: string;
  city: string;
  address: string;
  postalCode: string;
  errors: IErrors;
  cities: string[];
}

type SetCountryAction = { type: "SET_COUNTRY"; payload: string };
type SetCityAction = { type: "SET_CITY"; payload: string };
type SetAddressAction = { type: "SET_ADDRESS"; payload: string };
type SetPostalCodeAction = { type: "SET_POSTAL_CODE"; payload: string };
type SetInputErrorsAction = { type: "SET_ERRORS"; payload: IErrors };
type SetCittiesAction = { type: "SET_CITIES"; payload: string[] };

export type ActionType =
  | SetCountryAction
  | SetCityAction
  | SetAddressAction
  | SetPostalCodeAction
  | SetInputErrorsAction
  | SetCittiesAction;
