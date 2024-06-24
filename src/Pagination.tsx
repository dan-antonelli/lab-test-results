import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
    <div className='pagination flex items-center justify-center space-x-4 mt-4'>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
        className='bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300'
      >
        Prev
      </button>
      <span className='text-gray-700'>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() =>
          setPage((old) => (!totalPages ? old : Math.min(old + 1, totalPages)))
        }
        disabled={page === totalPages}
        className='bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300'
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
