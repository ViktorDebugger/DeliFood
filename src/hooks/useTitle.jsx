import { useEffect } from "react";

export const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `DeliFood | ${title}`;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};
