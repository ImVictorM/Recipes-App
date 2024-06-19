import { Link, useNavigate } from "react-router-dom";

import BasicLayout from "@/layouts/BasicLayout";

import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import useHeadTitle from "@/hooks/useHeadTitle";

import { removeUser, selectUser } from "@/store/slices/user";

import CheckCircularIcon from "@/assets/icons/checkCircularIcon.svg";
import HeartCircularIcon from "@/assets/icons/heartCircularIcon.svg";
import LeaveCircularIcon from "@/assets/icons/leaveCircularIcon.svg";
import ProfilePinIcon from "@/assets/icons/profilePinIcon.svg";

import CenteredTitleWithIcon from "@/components/ui/CenteredTitleWithIcon/CenteredTitleWithIcon";

import styles from "@/sass/pages/Profile/Profile.module.scss";

export default function Profile() {
  useHeadTitle("Profile");
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <BasicLayout>
      <div className={styles.profile} data-testid="Profile">
        <CenteredTitleWithIcon
          title="Profile"
          icon={{ element: ProfilePinIcon, alt: "pin user profile" }}
        />

        <p className="h4 text-center mt-5" data-testid="Profile.Email">
          {user.email}
        </p>

        <div className="d-flex justify-content-center flex-column mt-5">
          <Link
            to="/done-recipes"
            className={`${styles.profile__button}`}
            data-testid="Profile.LinkDone"
          >
            <CheckCircularIcon
              className={`${styles.profile__button__img}`}
              role="img"
              aria-label="circular check"
            />
            <span className={`${styles.profile__button__text}`}>
              Done recipes
            </span>
          </Link>

          <Link
            className={`${styles.profile__button}`}
            data-testid="Profile.LinkFavorite"
            to="/favorite-recipes"
          >
            <HeartCircularIcon
              className={`${styles.profile__button__img}`}
              role="img"
              aria-label="circular fill heart"
            />
            <span className={`${styles.profile__button__text}`}>
              Favorite recipes
            </span>
          </Link>

          <button
            className={`${styles.profile__button}`}
            type="button"
            data-testid="Profile.ButtonLogout"
            onClick={handleLogout}
          >
            <LeaveCircularIcon
              className={`${styles.profile__button__img}`}
              role="img"
              aria-label="circular leave"
            />
            <span className={`${styles.profile__button__text}`}>Logout</span>
          </button>
        </div>
      </div>
    </BasicLayout>
  );
}
