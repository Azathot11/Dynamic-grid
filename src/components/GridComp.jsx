import  { useState, useMemo, useEffect} from "react";
import Pagination from "./Pagination";
function Grid({data,perPage, filtrable,pagable}) {
   

  const [filters, setFilters] = useState({});
  const  [displayableData, setDisplayableData] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);

  const columns = useMemo(() => {
    if (data.length === 0) return [];

    const columnNames = Object.keys(data[0]);
    console.log(columnNames)
    const newColumns = columnNames.map((columnName) => {
      const filter = filters[columnName] ? filters[columnName] : "";
      return { columnName, filter };
    });

    return newColumns;
  }, [data, filters]);


  function handleFilterChange(event, columnName) {
    const newFilters = { ...filters, [columnName]: event.target.value };
    setFilters(newFilters);
  }

  useEffect(()=>{
if(!pagable){
    const filter = {};
Object.keys(filters).forEach(key => {
  if (filters[key] !== "") {
    filter[key] = filters[key].toLowerCase();
  }
});

const filteredArray = displayableData.filter((item) =>
  Object.entries(filter).every(([key, value]) => item[key].toLowerCase().includes(value))
);

if(Object.keys(filter).length === 0){
  return  setDisplayableData(data)
}
setDisplayableData(filteredArray);
return 
}

const filter = {};
const paginationFun=(array)=>{
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    return array.slice(indexOfFirstItem, indexOfLastItem);
}
Object.keys(filters).forEach(key => {
  if (filters[key] !== "") {
    filter[key] = filters[key].toLowerCase();
  }
});

const filteredArray = data.filter((item) =>
  Object.entries(filter).every(([key, value]) => item[key].toLowerCase().includes(value))
);

if(Object.keys(filter).length === 0){
  return  setDisplayableData(paginationFun(data))
}
setDisplayableData(paginationFun(filteredArray))


   
},[filters,currentPage])

 

  function renderHeader() {
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.columnName}>
              <div>{column.columnName}</div>
             {filtrable && <input
                type="text"
                value={column.filter}
                onChange={(event) => handleFilterChange(event, column.columnName)}
              />}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  

  function renderBody() {
    // const filteredDataArray = filteredData();

    return (
      <tbody>
        {displayableData.map((row, index) => {
          return (
            <tr key={index}>
              {columns.map((column) => (
                <td key={`${index}-${column.columnName}`}>{row[column.columnName]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }

  function paginate (pageNumber){
    console.log(pageNumber)
    setCurrentPage(pageNumber)
  }

  function renderFooter(){
    return(
        <tfoot>
        {pagable && <Pagination totalItems={data.length} perPage={perPage} paginate={paginate} currentPage={currentPage}/>}
    </tfoot>
    )
  }

  

  return (
    <>
      <table>
        {renderHeader()}
        {renderBody()}
        {renderFooter()}
      </table>
     
    </>
  );
}

export default Grid;
