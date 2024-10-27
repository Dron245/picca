import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.scss";

type PaginationProps = {
	onChangePage: any
}
const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
	return (
		<>
			<ReactPaginate
				className="pagination"
				breakLabel="..."
				nextLabel=">"
				previousLabel="<"
				onPageChange={(event) => onChangePage(event.selected + 1)}
				pageRangeDisplayed={4}
				pageCount={3}
				//  forcePage={currentPage - 1}
			/>
		</>
	);
};

export default Pagination;
