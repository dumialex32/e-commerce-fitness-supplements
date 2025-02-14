const PageResults: React.FC<{
  productsLength: number;
  count: number;
  category: string;
  currentPage: number;
  pageSize: number;
}> = ({ productsLength, count, category, currentPage, pageSize }) => {
  const displayedResults = Math.min(
    (currentPage - 1) * pageSize + productsLength,
    count
  );

  return (
    <div className="text-center">
      {displayedResults < count ? displayedResults : count} of{" "}
      {count < 1000 ? count : "of more than 1000"} results{" "}
      {category && <span>for</span>}{" "}
      <span className="font-semibold text-primary">{category}</span>
    </div>
  );
};

export default PageResults;
