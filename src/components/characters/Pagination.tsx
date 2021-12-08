import React from "react";

import { CharactersDTO } from "../../api/queries";
import { Link } from "../../shared/components/Link";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  className?: string;
  data: CharactersDTO;
  page: number;
}

export function Pagination(props: PaginationProps) {
  const { className, data, page } = props;
  return (
    <nav className={`${styles.pagination} ${className}`}>
      {
        <Link
          href={`/page/${data.characters.info.prev}`}
          disabled={!data.characters.info.prev}
        >
          prev
        </Link>
      }
      <p className={styles.pageInfo}>
        Page {page} of {data.characters.info.pages}
      </p>
      {
        <Link
          href={`/page/${data.characters.info.next}`}
          disabled={!data.characters.info.next}
        >
          next
        </Link>
      }
    </nav>
  );
}
