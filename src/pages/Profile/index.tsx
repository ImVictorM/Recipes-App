import { ProfileIcon } from "@/assets/icons";
import { CenteredTitleWithIcon } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { BasicLayout } from "@/layouts";
import { removeUser, selectUser } from "@/store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <BasicLayout>
      <div>
        <CenteredTitleWithIcon
          title="Profile"
          icon={{ element: ProfileIcon, alt: "circular user profile" }}
        />
        <h4 className="text-center mt-5 email" data-testid="profile-email">
          {user.email}
        </h4>
        <div className="container d-flex justify-content-center mt-5">
          <Link
            to="/done-recipes"
            className="btn"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </Link>
          <Link
            className="btn"
            data-testid="profile-favorite-btn"
            to="/favorite-recipes"
          >
            Favorite Recipes
          </Link>
          <button
            className="btn"
            type="button"
            data-testid="profile-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </BasicLayout>
  );
}
