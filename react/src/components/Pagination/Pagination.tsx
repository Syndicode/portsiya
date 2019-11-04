import React from "react";
import { classNames } from "utils/style";
import { createPager, sanitizeCurrentPage } from "./Pagination.helpers";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  onChange?: (page: number) => void;
  currentPage: number;
  itemsCount: number;
  itemsPerPage: number;
};

const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = React.useState(props.currentPage);
  const totalPages = Math.ceil(props.itemsCount / props.itemsPerPage);
  const perPage = props.itemsPerPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    props.onChange && props.onChange(page);
  };

  React.useEffect(() => {
    sanitizeCurrentPage({ currentPage, totalPages, handlePageChange });
  }, [currentPage, totalPages]);

  const is = (page: number) => currentPage === page;
  const prevClassName = classNames(is(1) && styles.disabled);
  const nextClassName = classNames(is(totalPages) && styles.disabled);
  const getPageClassName = (page: number) =>
    classNames(is(page) && styles.active);

  const pager = createPager({ currentPage, totalPages, perPage });

  if (pager.pages.length < 2) {
    return null;
  }

  return (
    <ul className={styles.pagination}>
      <li
        title={"First page"}
        className={prevClassName}
        onClick={() => handlePageChange(1)}
      >
        {"<<"}
      </li>

      <li
        title={"Prev page"}
        className={prevClassName}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {"<"}
      </li>

      <li className={styles.padder} />

      {pager.pages.map((page, index) => (
        <li
          key={index}
          onClick={() => handlePageChange(page)}
          className={getPageClassName(page)}
        >
          {page}
        </li>
      ))}

      <li className={styles.padder} />

      <li
        title={"Next page"}
        className={nextClassName}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {">"}
      </li>

      <li
        title={"Last page"}
        className={nextClassName}
        onClick={() => handlePageChange(totalPages)}
      >
        {">>"}
      </li>
    </ul>
  );
};

Pagination.defaultProps = {
  currentPage: 1,
  itemsPerPage: 10
};

export default Pagination;
