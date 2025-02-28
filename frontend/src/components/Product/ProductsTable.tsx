import { Link } from "react-router-dom";
import Table from "../Table";
import { formatPriceCurrency } from "../../utils/formatters";
import EditProduct from "./EditProduct";
import RemoveProduct from "./RemoveProduct";

import { TableColumn } from "../../types/componentsTypes/tableTypes";
import {
  ProductsTableProps,
  ProductTableData,
} from "../../types/productsTypes/productsTableTypes";
import { Product } from "../../types/productsTypes/productTypes";

const ProductsTable: React.FC<ProductsTableProps> = ({
  data,
  paginationData,
}) => {
  const productTableData: ProductTableData[] = data.map((product) => ({
    productId: product._id,
    name: product?.name,
    price: product?.price,
    category: product?.category,
    brand: product?.brand,
  }));

  const columns: TableColumn<ProductTableData>[] = [
    {
      id: "productId",
      label: "ID",
      accessor: (value: string | number) => (
        <div className="flex items-center gap-3">
          <img
            className="w-8 h-8"
            src={data.find((product) => product._id === value)?.image}
          />
          <Link className="text-primary" to={`/product/${value}`}>
            {value}
          </Link>
        </div>
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
      width: "sm",
      accessor: (value: string | number) => {
        if (typeof value === "string")
          return (
            <div className="flex items-center justify-center gap-2">
              <EditProduct
                product={data.find((p) => p._id === value) as Product}
              />

              <RemoveProduct productId={value as string} />
            </div>
          );

        return null;
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={productTableData}
        paginationData={paginationData}
      />
    </>
  );
};

export default ProductsTable;
