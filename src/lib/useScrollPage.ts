import { useEffect, useState } from "react";

function useScrollPage() {
  const [page, setPage] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrolledToBottom =
        window.scrollY + window.innerHeight === document.body.scrollHeight;

      if (scrolledToBottom) {
        setPage((prev) => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return page;
}

export { useScrollPage };
