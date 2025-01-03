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

export type ShippingFormField = "country" | "city" | "address" | "postalCode";

type SetShippingFieldAction = {
  type: "SET_FIELD";
  payload: { field: ShippingFormField; value: string };
};
type SetInputErrorsAction = { type: "SET_ERRORS"; payload: IErrors };
type SetCittiesAction = { type: "SET_CITIES"; payload: string[] };

export type ActionType =
  | SetShippingFieldAction
  | SetInputErrorsAction
  | SetCittiesAction;
