import { ITableColumn } from "../types/componentsTypes/tableTypes";
import { IUser } from "../types/userTypes/usersSliceTypes";
import { formatDate } from "../utils/formatters";

import Table from "./Table";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import RemoveUser from "./user/RemoveUser";

const UserTable: React.FC<{ data: IUser[] }> = ({ data }) => {
  console.log(data);
  const columns: ITableColumn<IUser>[] = [
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
      accessor: (value) => {
        return <RemoveUser userId={value as string} />;
      },
    },
  ];

  return <Table columns={columns} data={data || []} />;
};

export default UserTable;
