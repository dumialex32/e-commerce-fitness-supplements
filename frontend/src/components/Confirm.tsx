import Loader from "./Loader";

interface IConfirmProps {
  onConfirm: (onCloseModal: () => void) => void;
  onCloseModal?: () => void;
  action: string;
  resourceName: string;
  resource: string;
  isLoading?: boolean;
}

const Confirm: React.FC<IConfirmProps> = ({
  action,
  resourceName,
  resource,
  isLoading = false,
  onConfirm,
  onCloseModal,
}) => {
  const capitalizedAction = action
    .toLowerCase()
    .charAt(0)
    .toUpperCase()
    .concat(action.slice(1));

  console.log(onCloseModal);
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold text-center">
        {capitalizedAction}{" "}
        <span className="text-primary">{resourceName}.</span>
      </h3>

      {isLoading ? (
        <Loader size="lg" />
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-stone-600">
            Are you sure you want to {action.toLowerCase()} {resource}{" "}
            <span className="text-primary">{resourceName}</span> ?
          </p>

          <div className="flex justify-between gap-2">
            <button
              className="btn"
              onClick={() => onConfirm(onCloseModal as () => void)} // onCloseModel was added through `closeElement` within Modal.Window
            >
              {capitalizedAction}
            </button>
            <button className="btn" onClick={onCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirm;
