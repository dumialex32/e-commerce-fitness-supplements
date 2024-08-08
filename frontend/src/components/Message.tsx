import { ReactNode } from "react";

type AlertType = "success" | "error" | "info" | "default";

const alertType: Record<AlertType, string> = {
  success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  error: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  default: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

interface IMessage {
  children: ReactNode;
  type?: AlertType;
}

const Message: React.FC<IMessage> = ({ children, type }) => {
  return (
    <div role="alert" className={`alert alert-${type}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={type ? alertType[type] : alertType["default"]}
        ></path>
      </svg>
      <span>{children}</span>
    </div>
  );
};
export default Message;
