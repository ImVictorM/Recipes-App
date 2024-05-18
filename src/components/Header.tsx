import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/components/Header.css";
import { profileIcon, searchIcon } from "@/assets/icons";

export type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const [toSearch, setToSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBarVisibility = () => {
    setShowSearchBar((prev) => !prev);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToSearch(e.target.value);
  };

  return (
    <header>
      <div className="header">
        <Link to="/profile">
          <img
            src={profileIcon}
            alt="user profile"
            data-testid="profile-top-btn"
          />
        </Link>

        <button
          className="icon-search"
          type="button"
          onClick={toggleSearchBarVisibility}
        >
          <img
            src={searchIcon}
            alt="search magnifying glass"
            data-testid="search-top-btn"
          />
        </button>
      </div>
      <h1 className="mt-4" data-testid="page-title">
        {title}
      </h1>

      {showSearchBar && (
        <div className="filters">
          <label htmlFor="search">
            <input
              className="input-search"
              data-testid="search-input"
              placeholder="Search"
              id="search"
              name="searchInput"
              value={toSearch}
              onChange={handleSearchInputChange}
            />
          </label>
          <SearchBar place={title} searchInput={searchInput} />
        </div>
      )}
    </header>
  );
}
