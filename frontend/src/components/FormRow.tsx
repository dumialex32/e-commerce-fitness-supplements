import {
  faCircleExclamation,
  faEnvelope,
  faLock,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, ReactElement } from "react";

const getFormIcon: {
  Password: IconDefinition;
  Email: IconDefinition;
} = {
  Password: faLock,
  Email: faEnvelope,
};

const formRowDirection = {
  vertical: "grid grid-cols-[6rem,1fr] gap-5 items-center",
  horizontal: "grid grid-rows-2 gap-1 items-end",
};

const FormRow: React.FC<{
  children: ReactNode;
  labelWithIcon?: "Password" | "Email";
  label?: string | undefined;
  error: string;
  direction?: "vertical" | "horizontal";
}> = ({
  children,
  labelWithIcon,
  label,
  error = "",
  direction = "vertical",
}) => {
  console.log(error);
  return (
    <div className={`${formRowDirection[direction]}`}>
      <div>
        <label
          className="flex items-center gap-2 self-start"
          htmlFor={`${React.isValidElement(children) && children.props.id}`}
        >
          {" "}
          {labelWithIcon && (
            <FontAwesomeIcon
              icon={getFormIcon[labelWithIcon]}
              className="text-blue-700"
            />
          )}
          {label || labelWithIcon}
        </label>
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
              <p className="flex text-sm text-red-500">{error}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FormRow;
