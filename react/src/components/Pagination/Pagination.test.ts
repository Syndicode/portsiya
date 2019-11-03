import { createPager } from "./helpers";

/*
pages example for { perPage: 10, totalPages: 15 } and variable currentPage

[1] 2  3  4  5   6   7   8   9   10
 1 [2] 3  4  5   6   7   8   9   10
 1  2 [3] 4  5   6   7   8   9   10
 1  2  3 [4] 5   6   7   8   9   10
 1  2  3  4 [5]  6   7   8   9   10
 1  2  3  4  5  [6]  7   8   9   10
 2  3  4  5  6  [7]  8   9   10  11
 3  4  5  6  7  [8]  9   10  11  12
 4  5  6  7  8  [9]  10  11  12  13
 5  6  7  8  9  [10] 11  12  13  14
 6  7  8  9  10 [11] 12  13  14  15
 6  7  8  9  10  11 [12] 13  14  15
 6  7  8  9  10  11  12 [13] 14  15
 6  7  8  9  10  11  12  13 [14] 15
 6  7  8  9  10  11  12  13  14 [15]

*/

describe("UI | Pagination", () => {
  it("set start and end pages properly", () => {
    const pager = createPager({ currentPage: 1, totalPages: 4, perPage: 5 });
    expect(pager.startPage).toBe(1);
    expect(pager.endPage).toBe(4);
  });

  it("creates pager with proper pages", () => {
    const pager1 = createPager({ currentPage: 1, totalPages: 4, perPage: 5 });
    expect(pager1.pages).toEqual([1, 2, 3, 4]);

    const pager2 = createPager({ perPage: 5, currentPage: 7, totalPages: 12 });
    expect(pager2.pages).toEqual([5, 6, 7, 8, 9]);

    const pager3 = createPager({ perPage: 4, currentPage: 9, totalPages: 12 });
    expect(pager3.pages).toEqual([8, 9, 10, 11]);

    const pager4 = createPager({ perPage: 1, currentPage: 9, totalPages: 1 });
    expect(pager4.pages).toEqual([1]);
  });
});
