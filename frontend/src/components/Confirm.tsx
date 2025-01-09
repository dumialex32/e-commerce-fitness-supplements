interface IConfirmProps {
  onConfirm: () => void;
  onCloseModal: () => void;
  action: string;
  resourceName: string;
  resource: string;
}

const Confirm: React.FC<IConfirmProps> = ({
  action,
  resourceName,
  resource,
  onConfirm,
  onCloseModal,
}) => {
  const capitalizedAction = action
    .toLowerCase()
    .charAt(0)
    .toUpperCase()
    .concat(action.slice(1));

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-center">
        {capitalizedAction}{" "}
        <span className="text-primary">{resourceName}.</span>
      </h3>

      <p className="text-sm text-stone-600">
        Are you sure you want to {action.toLowerCase()} {resource}{" "}
        <span className="text-primary">{resourceName}</span> ?
      </p>

      <div className="flex justify-between gap-2">
        <button className="btn" onClick={onConfirm}>
          {capitalizedAction}
        </button>
        <button className="btn" onClick={onCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Confirm;
