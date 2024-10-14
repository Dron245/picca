import React from 'react'
import ReactPaginate from 'react-paginate';
import './Pagination.scss'
const Pagination = ({onChangePage, currentPage}) => {
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
  )
}

export default Pagination
