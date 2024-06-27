import React from "react";

export default function useHeadTitle(initialTitle?: string) {
  const [title, setTitle] = React.useState(document.title);

  const handleTitleUpdate = (title: string) => {
    setTitle(title);
  };

  React.useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
    }
  }, [initialTitle]);

  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return [title, handleTitleUpdate];
}
