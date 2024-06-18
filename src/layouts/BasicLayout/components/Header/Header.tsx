import { Link } from "react-router-dom";
import { Container, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";

import ProfileIcon from "@/assets/icons/profileIcon.svg";
import SearchIcon from "@/assets/icons/searchIcon.svg";
import HeaderLogo from "@/assets/images/headerLogo.svg";

import useAppDispatch from "@/hooks/useAppDispatch";

import { toggleSearchBarVisibility } from "@/store/slices/visibility";

import { HeaderProps } from "./Header.types";

import styles from "@/sass/layouts/BasicLayout/components/Header.module.scss";

export default function Header({ containSearchBar }: HeaderProps) {
  const dispatch = useAppDispatch();

  const handleSearchBarVisibility = () => {
    dispatch(toggleSearchBarVisibility());
  };

  return (
    <header className={`${styles.header}`} data-testid="BasicLayout.Header">
      <Container fluid className={`${styles.header__inner}`}>
        <HeaderLogo role="banner" aria-label="recipes app logo" />

        <Stack direction="horizontal" gap={3}>
          {containSearchBar && (
            <OverlayTrigger
              placement="bottom-end"
              overlay={(props) => (
                <Tooltip {...props} id="search-button">
                  <span data-testid="BasicLayout.Header.ButtonSearch.Tooltip">
                    Search for recipes
                  </span>
                </Tooltip>
              )}
            >
              <button
                data-testid="BasicLayout.Header.ButtonSearch"
                type="button"
                onClick={handleSearchBarVisibility}
                className={`${styles["header__search-button"]}`}
              >
                <SearchIcon
                  role="search"
                  aria-label="search magnifying glass"
                />
              </button>
            </OverlayTrigger>
          )}
          <OverlayTrigger
            placement="bottom-end"
            overlay={(props) => (
              <Tooltip {...props} id="profile-link">
                <span data-testid="BasicLayout.Header.LinkProfile.Tooltip">
                  Profile
                </span>
              </Tooltip>
            )}
          >
            <Link
              className={`${styles.header__profile}`}
              to="/profile"
              data-testid="BasicLayout.Header.LinkProfile"
            >
              <ProfileIcon role="img" aria-label="circular profile user" />
            </Link>
          </OverlayTrigger>
        </Stack>
      </Container>
    </header>
  );
}
