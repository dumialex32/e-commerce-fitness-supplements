import { MdOutlineSearch } from "react-icons/md";
import { useLocation, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useGetProductCategoriesQuery } from "../slices/productsApiSlice";

const mapCategories = (categories: string[]) => {
  return ["All products", ...categories].map((category) => ({
    label: category[0].toUpperCase().concat(category.slice(1)),
    value: category,
  }));
};

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { pathname } = useLocation();

  const productCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("k") || "";

  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    // if pathname changes, reset the search input
    setQuery(searchQuery);
  }, [searchQuery, pathname]);

  const { data: productCategories = [] } = useGetProductCategoriesQuery();

  const mappedProductCategories = mapCategories(productCategories);

  const handleSubmitQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      searchParams.set("k", query);
    } else {
      searchParams.delete("k"); // Remove query param if input is empty
    }
    setSearchParams(searchParams);
  };

  const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSetCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory !== "All products") {
      searchParams.set("category", selectedCategory);
    } else {
      searchParams.delete("category");
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
        value={query}
        onChange={handleSetQuery}
      />
      <button className="border-l p-2" type="submit">
        <MdOutlineSearch size={20} />
      </button>
    </form>
  );
};

export default Search;
