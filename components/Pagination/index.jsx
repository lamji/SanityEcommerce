import React from 'react';
import { Pagination as BsPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="d-flex justify-content-center">
      <BsPagination>
        <BsPagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        
        {totalPages > 10 ? (
          <>
            {/* First page */}
            {currentPage > 3 && (
              <>
                <BsPagination.Item onClick={() => onPageChange(1)}>1</BsPagination.Item>
                <BsPagination.Ellipsis />
              </>
            )}

            {/* Pages around current page */}
            {[...Array(Math.min(5, totalPages))].map((_, idx) => {
              let pageNum;
              if (currentPage <= 3) {
                pageNum = idx + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + idx;
              } else {
                pageNum = currentPage - 2 + idx;
              }
              
              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <BsPagination.Item
                    key={pageNum}
                    active={pageNum === currentPage}
                    onClick={() => onPageChange(pageNum)}
                  >
                    {pageNum}
                  </BsPagination.Item>
                );
              }
              return null;
            })}

            {/* Last page */}
            {currentPage < totalPages - 2 && (
              <>
                <BsPagination.Ellipsis />
                <BsPagination.Item onClick={() => onPageChange(totalPages)}>
                  {totalPages}
                </BsPagination.Item>
              </>
            )}
          </>
        ) : (
          [...Array(totalPages)].map((_, index) => (
            <BsPagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </BsPagination.Item>
          ))
        )}

        <BsPagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </BsPagination>
    </div>
  );
};

export default Pagination; 