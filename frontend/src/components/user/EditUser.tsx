import { FaEdit } from "react-icons/fa";
import Modal from "../Modal";
import { User } from "../../types/userTypes/usersSliceTypes";
import EditUserForm from "./EditUserForm";

const EditUser: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <Modal>
        <Modal.Open name={user._id}>
          <button className="btn btn-secondary">
            <FaEdit color="blue" />
          </button>
        </Modal.Open>

        <Modal.Window name={user._id}>
          <EditUserForm user={user} />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default EditUser;
