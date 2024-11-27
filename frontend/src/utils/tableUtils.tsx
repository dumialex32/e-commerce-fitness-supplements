import { FaCheck } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";

export const getStatusIcon = (status: boolean) => {
  return status ? (
    <FaCheck color="green" />
  ) : (
    <IoCloseCircleSharp color="red" />
  );
};
