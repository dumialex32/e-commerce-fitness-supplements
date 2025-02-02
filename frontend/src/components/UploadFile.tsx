import React, { forwardRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { ProductFormField } from "../types/productsTypes/ProductFormTypes";

interface UploadFileProps {
  accept: string;
  id: string;
  isEdit?: boolean;
  removeFile: () => void;
  onChange: (field: ProductFormField, value: File | null) => void;
}

const UploadFile = forwardRef<HTMLInputElement, UploadFileProps>(
  ({ accept, id, onChange, removeFile }, ref) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const getRefCurrent = () =>
      typeof ref === "function" ? null : ref?.current;

    const handleUploadFileClick = (e: React.MouseEvent) => {
      e.preventDefault();
      getRefCurrent()?.click();
    };

    const handleRemoveFile = () => {
      setUploadedFile(null);
      removeFile();
      const inputEl = getRefCurrent();
      if (inputEl) {
        inputEl.value = "";
      }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setUploadedFile(e.target.files?.[0] || null);
      onChange("image", e.target.files?.[0] || null);
    };

    return (
      <div>
        <input
          className=""
          type="file"
          id={id}
          accept={accept}
          onChange={handleOnChange}
          hidden
          ref={ref}
        />
        <>
          <>
            {!uploadedFile ? (
              <button className="btn" onClick={(e) => handleUploadFileClick(e)}>
                Add file
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="text-gray-500 text-sm">
                  {uploadedFile?.name}
                </div>
                <button className="" onClick={handleRemoveFile}>
                  <div className="text-red-500">
                    <MdDelete />
                  </div>
                </button>
              </div>
            )}
          </>
        </>
      </div>
    );
  }
);

export default UploadFile;
