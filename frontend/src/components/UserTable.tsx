import { TableColumn } from "../types/componentsTypes/tableTypes";
import { User } from "../types/userTypes/usersSliceTypes";
import { formatDate } from "../utils/formatters";

import Table from "./Table";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import RemoveUser from "./user/RemoveUser";
import EditUser from "./user/EditUser";

const UserTable: React.FC<{ data: User[] }> = ({ data }) => {
  console.log("usertabledata", data);
  const columns: TableColumn<User>[] = [
    {
      label: "User ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Email",
      id: "email",
    },
    {
      label: "Admin",
      id: "isAdmin",
      accessor: (value: string | boolean) =>
        value ? <FaCheck color="green" /> : <IoMdClose color="red" />,
    },
    {
      label: "Join date",
      id: "createdAt",
      accessor: (value: string | boolean) => formatDate(value as string),
    },
    {
      label: "",
      id: "_id",
      width: "sm",
      accessor: (value) => {
        return (
          <div className="flex items-center gap-2">
            <EditUser user={data.find((user) => user._id === value)} />
            <RemoveUser userId={value as string} />
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} data={data || []} />;
};

export default UserTable;
