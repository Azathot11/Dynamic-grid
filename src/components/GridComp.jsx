import { useState, useMemo, useEffect } from "react";
import Pagination from "./Pagination";
import {HiArrowsUpDown } from 'react-icons/hi2'

function Grid({
  data,
  perPage,
  filtrable,
  pagable,
  gridColumns,
  selectable,
  selectedHandler,
  sorting
}) {
  const [filters, setFilters] = useState({});
  const [displayableData, setDisplayableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem,setTotalItem] = useState(0)
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection,setSortDirection] = useState('asc')


  const columns = useMemo(() => {
    if (data.length === 0) return [];
    const newColumns = gridColumns.map((element) => {
      const filter = filters[element.columnName] ? filters[element.columnName] : "";
     
      return { columnName:element.columnName, filter, title:element.title };
    });
    
    return newColumns;
  }, [data, filters]);

  function handleFilterChange(event, columnName) {
    const newFilters = { ...filters, [columnName]: event.target.value };
    setFilters(newFilters);
  }

  useEffect(() => {
    const sortedColumn=(data)=>{
     
        return data.sort((a, b) => {
        if (sortDirection === "asc") {
          if (typeof a[sortColumn] === 'string') {
            return a[sortColumn].localeCompare(b[sortColumn]);
          } else {
            return a[sortColumn] - b[sortColumn];
          }
        } else {
          if (typeof b[sortColumn] === 'string') {
            return b[sortColumn].localeCompare(a[sortColumn]);
          } else {
            return b[sortColumn] - a[sortColumn];
          }
        }
         });  
       
    }
    if (!pagable) {
      const filter = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "") {
          filter[key] = value.toLowerCase();
        }
      });
      const filteredArray = data.filter((item) =>
        Object.entries(filter).every(([key, value]) => {
          return typeof item[key] === "string" ? item[key].toLowerCase().includes(value) : item[key] === +value;
        })
      );

      const reformData = (data) => {
        const sortedArray = sortedColumn(data)
        console.log(sortedArray)
        return sortedArray.map((element, i) => {
          return { selected: false, gridId: i + 1, ...element };
        });
      };

      if(Object.keys(filter).length === 0){
        setTotalItem(data.length)
      }else{
        setTotalItem(filteredArray.length)

      }

      setDisplayableData(
        Object.keys(filter).length === 0
          ? reformData(data)
          : reformData(filteredArray)
      );
    } else {
      const filter = {};
      const paginationFun = (array) => {
        const indexOfLastItem = currentPage * perPage;
        const indexOfFirstItem = indexOfLastItem - perPage;

        const sortedArray = sortedColumn(array)
        // console.log(sortedArray)
        const newArray = sortedArray.map((element, i) => {
          return { selected: false, gridId: i + 1, ...element };
        });
        setTotalItem(sortedArray.length)
        return newArray.slice(indexOfFirstItem, indexOfLastItem);
      };

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "") {
          filter[key] = value.toLowerCase();
        }
      });
      const filteredArray = data.filter((item) =>
        Object.entries(filter).every(([key, value]) => {
          return typeof item[key] === "string" ? item[key].toLowerCase().includes(value) : item[key] === +value;
        })
      );

      setDisplayableData(
        Object.keys(filter).length === 0
          ? paginationFun(data)
          : paginationFun(filteredArray)
      );
    }
  }, [filters, currentPage,sortColumn,sortDirection]);

 

  function renderHeader() {
    return (
      <thead className=" sticky top-0 bg-white border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
        <tr className="border">
          {selectable && (
            <th scope="col" className=" px-6 py-4">
              <input
                type="checkbox"
                onChange={(e) => {
                  setDisplayableData(() => {
                    return displayableData.map((disData) => {
                      disData.selected = !disData.selected;
                      return disData;
                    });
                  });
                }}
              />
            </th>
          )}
          {columns.map((column) => (
          <th scope="col" className=" px-6 py-4"
            key={column.columnName}
             >
              <div className="flex gap-2 items-center">
              <div>{column.title}</div>
             {sorting && <div className="" onClick={()=>{setSortColumn(column.columnName);setSortDirection((value)=>{
                if(value === 'asc'){
                  return 'desc'
                }else{
                  return 'asc'
                }
              })}}><HiArrowsUpDown/></div>}
              </div>
            </th>
          ))}
        </tr>
        <tr className="border">
        { selectable && <th></th>}
        {columns.map((column) => (
             <th scope="col" className=" px-6 py-4"
            
            key={column.columnName}
             >
              {filtrable && (
                <input
                className="border rounded outline-none p-2 text-black"
                  type={typeof column.value}
                  value={column.filter}
                  onChange={(event) =>
                    handleFilterChange(event, column.columnName)
                  }
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  if (typeof selectedHandler === "function") {
    selectedHandler(selectedValuesHandler());
  }
  function selectedValuesHandler() {
    const selectedValues = [];
    displayableData.forEach((element) => {
      if (element.selected === true) {
        selectedValues.push(element);
      }
    });
    console.log(selectedValues);
    return selectedValues;
  }

  function renderBody() {
    // const filteredDataArray = filteredData();

    return (
      <tbody>
        {displayableData.length === 0 && (
          <>
            <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
              <td className="whitespace-nowrap px-6 py-4 text-center" colSpan={pagable? columns?.length + 1:columns?.length} >No data found</td>
            </tr>
          </>
        )}
        {displayableData.length > 0 && (
           <>
           {displayableData.map((row, index) => {
             return (
               <tr
                 key={index}
                 className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
               >
                 {selectable && (
                   <td className="whitespace-nowrap px-6 py-4">
                     <input
                       type="checkbox"
                       onChange={(e) => {
                         setDisplayableData(() => {
                           return displayableData.map((disData) => {
                             if (row.gridId === disData.gridId) {
                               disData.selected = !disData.selected;
                             }
                             return disData;
                           });
                         });
                       }}
                       checked={row?.selected}
                     />
                   </td>
                 )}
                 {gridColumns.map((column) => (
                   <td
                     className="whitespace-nowrap px-6 py-4"
                     key={`${index}-${column.columnName}`}
                   >
                     {row[column.columnName]}
                   </td>
                 ))}
               </tr>
             );
           })}
         </>
        )}
       
      </tbody>
    );
  }

  function paginate(pageNumber) {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  }

  function renderFooter() {
    return (
      <tfoot >
        <tr className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
      <td colSpan={pagable || selectable ? columns?.length + 1 : displayableData?.length + 1} >
      <div className="w-full py-2 flex justify-center">
      {pagable && (
            <Pagination
              totalItems={totalItem}
              perPage={perPage}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
      </div>
      </td>
     
     
        </tr>
      </tfoot>
    );
  }

  return (
    <>
      <table className="min-w-full text-left text-sm font-light text-white">
        {renderHeader()}
        {renderBody()}
        {renderFooter()}
      </table>
    </>
  );
}

export default Grid;
