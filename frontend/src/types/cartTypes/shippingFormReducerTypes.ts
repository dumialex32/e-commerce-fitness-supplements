export interface ShippingFormErrors {
  country: string;
  city: string;
  address: string;
  postalCode: string;
}

export interface ShippingFormInitialState {
  country: string;
  city: string;
  address: string;
  postalCode: string;
  errors: ShippingFormErrors;
  cities: string[];
}

export type ShippingFormField = "country" | "city" | "address" | "postalCode";

type SetShippingFieldAction = {
  type: "SET_FIELD";
  payload: { field: ShippingFormField; value: string };
};
type SetInputErrorsAction = { type: "SET_ERRORS"; payload: ShippingFormErrors };
type SetCittiesAction = { type: "SET_CITIES"; payload: string[] };

export type ActionType =
  | SetShippingFieldAction
  | SetInputErrorsAction
  | SetCittiesAction;
