import { Link } from "react-router-dom";
import { ProfileIcon, SearchIcon } from "@/assets/icons";
import { HeaderLogo } from "@/assets/images";
import { useAppDispatch } from "@/hooks";
import { toggleSearchBarVisibility } from "@/store/slices/visibilitySlice";
import { Container, Stack } from "react-bootstrap";
import styles from "@/sass/layouts/BasicLayout/components/Header.module.scss";

export type HeaderProps = {
  containSearchBar?: boolean;
};

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
            <button
              data-testid="search-top-btn"
              type="button"
              onClick={handleSearchBarVisibility}
              className={`${styles["header__search-button"]}`}
            >
              <SearchIcon role="img" aria-label="search magnifying glass" />
            </button>
          )}

          <Link to="/profile" data-testid="profile-top-btn">
            <ProfileIcon role="img" aria-label="circular profile user" />
          </Link>
        </Stack>
      </Container>
    </header>
  );
}
