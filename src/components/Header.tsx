import { Link } from "react-router-dom";
import { profileIcon, searchIcon } from "@/assets/icons";
import { headerLogo } from "@/assets/images";
import { useAppDispatch } from "@/hooks";
import { toggleSearchBarVisibility } from "@/store/slices/visibilitySlice";
import { Container, Image, Stack } from "react-bootstrap";
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
    <Container
      as="header"
      fluid
      className="header d-flex align-items-center justify-content-center"
    >
      <Container
        fluid
        className="header-content d-flex align-items-center justify-content-between"
      >
        <Image src={headerLogo} alt="recipes app logo" />

        <Stack direction="horizontal" gap={4}>
          {containSearchBar && (
            <button
              data-testid="search-top-btn"
              type="button"
              onClick={handleSearchBarVisibility}
              className="header-search-button"
            >
              <Image src={searchIcon} alt="search magnifying glass" />
            </button>
          )}

          <Link to="/profile">
            <Image
              src={profileIcon}
              alt="user profile"
              data-testid="profile-top-btn"
            />
          </Link>
        </Stack>
      </Container>
    </Container>
  );
}
