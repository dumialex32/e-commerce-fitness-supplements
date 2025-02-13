import { useState } from "react";
import FormRow from "../FormRow";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import {
  validateEmail,
  validateName,
} from "../../utils/formUtils/registerFormUtils";
import { checkFormInputs } from "../../utils/formUtils/formUtils";
import ButtonLoader from "../ButtonLoader";
import { createToast } from "../../utils/toastUtils";
import { renderFetchBaseQueryError } from "../../utils/errorHelpers";
import {
  EditUserFormErrors,
  EditUserFormInitialState,
  EditUserFormProps,
} from "../../types/userTypes/editUserFormTypes";

export const mapIsAdmin: Record<string, boolean> = {
  no: false,
  yes: true,
};

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onCloseModal }) => {
  const [formData, setFormData] = useState<EditUserFormInitialState>({
    name: user?.name || "",
    email: user?.email || "",
    isAdmin: user?.isAdmin || false,
  });
  const [editFormErrors, setEditFormErrors] = useState<EditUserFormErrors>({
    name: "",
    email: "",
  });

  const isFormInvalid = checkFormInputs(formData, editFormErrors);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, type, name } = e.target;
    if (id === "name") {
      const nameError = validateName(value);
      setEditFormErrors((prevState) => ({
        ...prevState,
        name: nameError,
      }));
    }

    if (id === "email") {
      const emailError = validateEmail(value);
      setEditFormErrors((prevState) => ({
        ...prevState,
        email: emailError,
      }));
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      // Handle radio buttons or checkboxes specifically
      [name]:
        type === "radio"
          ? mapIsAdmin[id]
          : type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    const patch = formData;
    const userId = user?._id;

    try {
      const res = await updateUser({ userId, patch });

      createToast("User update successfully made", { type: "success" });
      onCloseModal();
    } catch (err: any) {
      console.error(err);
      createToast(renderFetchBaseQueryError(err) || "User update failed", {
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleUpdateUserSubmit}>
      <FormRow direction="vertical" label="Name" error={editFormErrors.name}>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </FormRow>
      <FormRow direction="vertical" label="Email" error={editFormErrors.email}>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormRow>
      <FormRow direction="vertical" label="Admin">
        <fieldset className="flex items-center gap-6 border-0">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="no"
              name="isAdmin"
              checked={!formData.isAdmin}
              onChange={handleChange}
            />
            <label htmlFor="no">No</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="yes"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
            <label htmlFor="yes">Yes</label>
          </div>
        </fieldset>
      </FormRow>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isFormInvalid}
      >
        {isLoading ? <ButtonLoader text="Updating user..." /> : "Update"}
      </button>
    </form>
  );
};

export default EditUserForm;
