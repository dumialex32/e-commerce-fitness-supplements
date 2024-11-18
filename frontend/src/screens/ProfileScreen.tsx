import RegisterForm from "../components/auth/RegisterForm";
import OrderTable from "../components/OrderTable";
import ScreenTitle from "../components/ScreenTitle";

const ProfileScreen: React.FC = () => {
  return (
    <div>
      <ScreenTitle>User Profile</ScreenTitle>

      <div className="grid grid-cols-2 gap-6">
        <RegisterForm isUpdating={true} />

        <OrderTable />
      </div>
    </div>
  );
};

export default ProfileScreen;
