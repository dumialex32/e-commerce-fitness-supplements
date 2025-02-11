import { MdOutlineSearch } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useGetProductCategoriesQuery } from "../slices/productsApiSlice";

const mapCategories = (categories: string[]) => {
  return ["All products", ...categories].map((category) => ({
    label: category,
    value: category,
  }));
};

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const productCategory = searchParams.get("category") || "all";

  const [query, setQuery] = useState("");

  const { data: productCategories = [] } = useGetProductCategoriesQuery();

  const mappedProductCategories = mapCategories(productCategories);

  const handleSubmitQuery = (e) => {
    e.preventDefault();
  };

  const handleSetQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSetCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    console.log(selectedCategory);
    console.log(selectedCategory === "All products");
    if (selectedCategory !== "All products") {
      searchParams.set("category", selectedCategory);
    } else {
      searchParams.delete("category"); // prevent sending 'All products` filter value
    }

    setSearchParams(searchParams);
  };

  return (
    <form
      className="flex items-center border-2 rounded-md"
      onSubmit={handleSubmitQuery}
    >
      <select
        className="border-r p-2 focus:outline-none bg-stone-50"
        onChange={handleSetCategory}
        value={productCategory}
      >
        {mappedProductCategories.map((category, i) => (
          <option key={`${category.label}-${i}`} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      <input
        className="focus:outline-none p-2"
        type="text"
        id="search"
        onChange={handleSetQuery}
      />
      <button className="border-l p-2" type="submit">
        <MdOutlineSearch size={20} />
      </button>
    </form>
  );
};

export default Search;
