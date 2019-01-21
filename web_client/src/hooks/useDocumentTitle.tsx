import { useEffect } from "react";


/**
 * Hook to set the document title.
 * @param title Document title.
 */
export default function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
