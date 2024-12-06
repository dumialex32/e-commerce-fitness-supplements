import { Link } from "react-router-dom";
import Table from "../Table";
import { formatPriceCurrency } from "../../utils/formatters";
import EditProduct from "./EditProduct";
import RemoveProduct from "./RemoveProduct";

import { ITableColumn } from "../../types/componentsTypes/tableTypes";
import {
  IProductsTableProps,
  IProductTableData,
} from "../../types/productsTypes/productsTableTypes";
import Modal from "../Modal";

const ProductsTable: React.FC<IProductsTableProps> = ({ data }) => {
  const columns: ITableColumn<IProductTableData>[] = [
    {
      id: "productId",
      label: "ID",
      accessor: (value: string | number) => (
        <Link className="text-primary" to={`/product/${value}`}>
          {value}
        </Link>
      ),
    },
    {
      id: "name",
      label: "NAME",
    },
    {
      id: "price",
      label: "PRICE",
      accessor: (value: string | number) =>
        formatPriceCurrency(value as number),
    },
    {
      id: "category",
      label: "CATEGORY",
    },
    {
      id: "brand",
      label: "BRAND",
    },
    {
      id: "productId",
      label: "",
      width: "24",
      accessor: (value: string | number) => {
        if (typeof value === "string")
          return (
            <div className="flex items-center justify-center gap-2">
              <Modal>
                <EditProduct />

                <RemoveProduct productId={value as string} />
              </Modal>
            </div>
          );

        return null;
      },
    },
  ];

  const productTableData: IProductTableData[] = data.map((product) => ({
    productId: product._id,
    name: product?.name,
    price: product?.price,
    category: product?.category,
    brand: product?.brand,
  }));

  return (
    <>
      <Table columns={columns} data={productTableData} />
    </>
  );
};

export default ProductsTable;
