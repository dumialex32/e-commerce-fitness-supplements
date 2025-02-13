import { FaTrash } from "react-icons/fa";
import Modal from "../Modal";
import Confirm from "../Confirm";
import { useDeleteUserMutation } from "../../slices/usersApiSlice";
import { createToast } from "../../utils/toastUtils";
import { renderFetchBaseQueryError } from "../../utils/errorHelpers";

const RemoveUser: React.FC<{ userId: string }> = ({ userId }) => {
  const [removeUser, { isLoading }] = useDeleteUserMutation();

  const handleRemoveUser = async (onCloseModal: () => void) => {
    try {
      const res = await removeUser(userId);

      createToast(res.message || "User successfully deleted", {
        type: "success",
      });

      onCloseModal();
    } catch (err: any) {
      console.error(err);
      createToast(
        renderFetchBaseQueryError(err) ||
          "There was a problem while deleting user. Please try again.",
        { type: "error" }
      );
    }
  };

  return (
    <Modal>
      <Modal.Open name={userId}>
        <button className="btn btn-secondary">
          <FaTrash color="red" />
        </button>
      </Modal.Open>

      <Modal.Window name={userId}>
        <Confirm
          action="delete"
          resourceName={userId}
          resource="user"
          onConfirm={handleRemoveUser}
          onCloseModal
          isLoading={isLoading}
        />
      </Modal.Window>
    </Modal>
  );
};

export default RemoveUser;
