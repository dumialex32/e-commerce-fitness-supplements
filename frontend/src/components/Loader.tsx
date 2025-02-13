interface LoaderCustomStyles {
  customSize?: { lg: "w-10"; xl: "w-24" };
  customColor?: { white: "text-white"; primary: "text-primary" };
}

const customStyles: LoaderCustomStyles = {
  customSize: { lg: "w-10", xl: "w-24" },
  customColor: { white: "text-white", primary: "text-primary" },
};

const Loader: React.FC<{ size?: "lg" | "xl"; color?: "white" | "primary" }> = ({
  size = "lg",
  color = "primary",
}) => {
  const customSize = customStyles.customSize?.[size];
  const customColor = customStyles.customColor?.[color];
  return (
    <div className="flex justify-center items-center">
      <span
        className={`loading loading-spinner ${customSize} ${customColor} `}
      ></span>
    </div>
  );
};

export default Loader;
