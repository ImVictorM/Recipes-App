import { Link } from "react-router-dom";
import { profileIcon, searchIcon } from "@/assets/icons";
import { headerLogo } from "@/assets/images";
import { useAppDispatch } from "@/hooks";
import { toggleSearchBarVisibility } from "@/store/slices/visibilitySlice";
import "@/sass/components/_header.scss";

export type HeaderProps = {
  containSearchBar?: boolean;
};

export default function Header({ containSearchBar }: HeaderProps) {
  const dispatch = useAppDispatch();

  const handleSearchBarVisibility = () => {
    dispatch(toggleSearchBarVisibility());
  };

  return (
    <>
      <header className="header d-flex align-items-center justify-content-center w-100">
        <div className="header-content d-flex align-items-center justify-content-between">
          <img src={headerLogo} alt="recipes app logo" />

          <div className="d-flex gap-4">
            {containSearchBar && (
              <button
                data-testid="search-top-btn"
                type="button"
                onClick={handleSearchBarVisibility}
                className="header-search-button"
              >
                <img src={searchIcon} alt="search magnifying glass" />
              </button>
            )}

            <Link to="/profile">
              <img
                src={profileIcon}
                alt="user profile"
                data-testid="profile-top-btn"
              />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
