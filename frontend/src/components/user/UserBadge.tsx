const UserBadge: React.FC<{
  isUserLoggedIn: boolean;
  userInitial: string | null;
}> = ({ isUserLoggedIn, userInitial }) => {
  return (
    <div className="w-10 rounded-full bg-primary">
      {isUserLoggedIn ? (
        <p className="text-xl text-white flex items-center justify-center h-full w-full">
          {userInitial}
        </p>
      ) : (
        <img
          className=""
          alt="Tailwind CSS Navbar component"
          src="images\placeholder-300x248.jpg"
        />
      )}
    </div>
  );
};

export default UserBadge;
