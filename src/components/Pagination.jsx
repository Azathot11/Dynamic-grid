

function Pagination({ perPage, totalItems, paginate,currentPage }) {
    

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
  
      <ul className="flex gap-2 ">
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => paginate(number)} className={`cursor-pointer border flex justify-center items-center h-10 w-10 rounded ${currentPage === number && 'border-green-500 text-green-500'}`}>
              {number}
          </li>
        ))}
      </ul>
   
  );
}

export default Pagination;