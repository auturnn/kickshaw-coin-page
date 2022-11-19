import "../css/pagination.css";
import Pagination from "react-js-pagination";

export type PaginationProps = {
  page: number;
  count: number;
  setPage: any;
};

//페이징구현 코드출처: https://cotak.tistory.com/112
const Paging = ({ page, count, setPage }: PaginationProps) => {
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  // activePage: 현재 페이지
  // itemsCountPerPage: 한 페이지당 보여줄 리스트 아이템의 개수
  // totalItemsCount: 총 아이템의 개수
  // pageRangeDisplayed: Paginator 내에서 보여줄 페이지의 범위
  // prevPageText: "이전"을 나타낼 텍스트 (prev, <, ...)
  // nextPageText: "다음"을 나타낼 텍스트 (next, >, ...)
  // onChange: 페이지가 바뀔 때 핸들링해줄 함수
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={count}
      pageRangeDisplayed={10}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};
export default Paging;
