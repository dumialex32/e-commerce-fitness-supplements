import {
  faCircleExclamation,
  faCreditCard,
  faEnvelope,
  faLock,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, ReactElement } from "react";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

type LabelWithIcon = "Password" | "Email" | "PayPal" | "CreditCard";

const getFormIcon: {
  Password: IconDefinition;
  Email: IconDefinition;
  PayPal: IconDefinition;
  CreditCard: IconDefinition;
} = {
  Password: faLock,
  Email: faEnvelope,
  PayPal: faPaypal,
  CreditCard: faCreditCard,
};

const formRowDirection = (label: string | LabelWithIcon | undefined) => ({
  vertical: `${
    label ? `grid grid-cols-[1fr_1.5fr] gap-12` : "flex"
  }items-center mb-10`,
  horizontal: "grid grid-rows-2 gap-1 items-end mb-3",
});

const FormRow: React.FC<{
  children: ReactNode;
  labelWithIcon?: LabelWithIcon;
  label?: string | undefined;
  error?: string;
  direction?: "vertical" | "horizontal";
}> = ({
  children,
  labelWithIcon,
  label,
  error = "",
  direction = "vertical",
}) => {
  return (
    <div className={`${formRowDirection(label || labelWithIcon)[direction]}`}>
      <div>
        {labelWithIcon ? (
          <label
            className="grid grid-cols-[1rem_1fr] gap-3 items-center"
            htmlFor={`${React.isValidElement(children) && children.props.id}`}
          >
            <FontAwesomeIcon
              icon={getFormIcon[labelWithIcon]}
              className="text-blue-700"
            />

            {labelWithIcon}
          </label>
        ) : (
          <label className="flex items-center gap-2">{label}</label>
        )}
      </div>

      <div className="relative">
        {React.isValidElement(children) &&
          React.cloneElement(children as ReactElement, {
            className: `${
              children.props.className || ""
            } py-2 px-3 border rounded-md w-full`,
          })}
        {error ? (
          <div className="absolute">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="text-red-700"
              />
              <p className="flex text-sm leading-3 text-red-500">{error}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FormRow;
