import { forwardRef } from "react";
import { MdDelete } from "react-icons/md";

interface UploadFileProps {
  accept: string;
  id: string;
  file?: File;
  removeFile: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadFile = forwardRef<HTMLInputElement, UploadFileProps>(
  ({ accept, id, file, onChange, removeFile }, ref) => {
    const getRefCurrent = () =>
      typeof ref === "function" ? null : ref?.current;

    const handleUploadFileClick = (e: React.MouseEvent) => {
      e.preventDefault();
      getRefCurrent()?.click();
    };

    const handleRemoveFile = () => {
      removeFile();
      const inputEl = getRefCurrent();
      if (inputEl) {
        inputEl.value = "";
      }
    };
    return (
      <div>
        <input
          className=""
          type="file"
          id={id}
          accept={accept}
          onChange={onChange}
          hidden
          ref={ref}
        />
        <>
          {!file ? (
            <button className="btn" onClick={(e) => handleUploadFileClick(e)}>
              Add file
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-gray-500 text-sm">{file?.name}</div>
              <button className="" onClick={handleRemoveFile}>
                <div className="text-red-500">
                  <MdDelete />
                </div>
              </button>
            </div>
          )}
        </>
      </div>
    );
  }
);

export default UploadFile;
