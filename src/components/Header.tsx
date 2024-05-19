import { Link } from "react-router-dom";
import { profileIcon, searchIcon } from "@/assets/icons";
import { headerLogo } from "@/assets/images";
import "../styles/components/Header.css";
import { useAppDispatch } from "@/hooks";
import { toggleSearchBarVisibility } from "@/store/slices/visibilitySlice";

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
      <header className="header">
        <img src={headerLogo} alt="recipes app logo" />

        {containSearchBar && (
          <button
            data-testid="search-top-btn"
            className="icon-search"
            type="button"
            onClick={handleSearchBarVisibility}
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
      </header>
    </>
  );
}
