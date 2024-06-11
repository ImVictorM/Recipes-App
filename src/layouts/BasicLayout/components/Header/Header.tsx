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
    <header className={`${styles.header}`}>
      <Container fluid className={`${styles.header__inner}`}>
        <HeaderLogo aria-label="recipes app logo" />

        <Stack direction="horizontal" gap={3}>
          {containSearchBar && (
            <OverlayTrigger
              placement="bottom-end"
              overlay={(props) => (
                <Tooltip {...props} id="search-button">
                  Search for recipes
                </Tooltip>
              )}
            >
              <button
                data-testid="search-top-btn"
                type="button"
                onClick={handleSearchBarVisibility}
                className={`${styles["header__search-button"]}`}
              >
                <SearchIcon role="img" aria-label="search magnifying glass" />
              </button>
            </OverlayTrigger>
          )}
          <OverlayTrigger
            placement="bottom-end"
            overlay={(props) => (
              <Tooltip id="profile-link" {...props}>
                Profile
              </Tooltip>
            )}
          >
            <Link
              className={`${styles.header__profile}`}
              to="/profile"
              data-testid="profile-top-btn"
            >
              <ProfileIcon role="img" aria-label="circular profile user" />
            </Link>
          </OverlayTrigger>
        </Stack>
      </Container>
    </header>
  );
}
