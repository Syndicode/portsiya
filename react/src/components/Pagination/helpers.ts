type SanitizeOptions = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (v: number) => void;
};

export const sanitizeCurrentPage = ({
  currentPage,
  totalPages,
  handlePageChange
}: SanitizeOptions): void => {
  const isCurrentPageValid = currentPage <= totalPages && currentPage >= 1;
  if (!isCurrentPageValid) {
    handlePageChange(1);
  }
};

type PageProps = {
  currentPage: number;
  totalPages: number;
  perPage: number;
};

interface Pager {
  pages: number[];
  startPage: number;
  endPage: number;
}

export const createPager = ({
  currentPage,
  totalPages,
  perPage
}: PageProps): Pager => {
  let startPage: number, endPage: number;

  currentPage = currentPage || 1;

  if (totalPages <= perPage) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const offsetFromCurrent = Math.floor((perPage - 1) / 2);
    const offsetLeft = currentPage - offsetFromCurrent;
    const offsetRight = currentPage + offsetFromCurrent;

    if (offsetLeft < 1) {
      startPage = 1;
      endPage = perPage;
    } else if (offsetRight >= totalPages) {
      endPage = totalPages;
      startPage = endPage - perPage + 1;
    } else {
      startPage = offsetLeft;
      endPage = offsetRight + ((perPage + 1) % 2);
    }
  }

  const pages = Array(endPage - startPage + 1)
    .fill(startPage)
    .map((x, y) => x + y);

  return {
    pages,
    startPage,
    endPage
  };
};
