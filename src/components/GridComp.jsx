import  { useState, useMemo,useEffect} from "react";
import Pagination from "./Pagination";
function Grid({data,perPage, filtrable,pagable,gridColumns,selectable,selectedHandler}) {
   

  const [filters, setFilters] = useState({});
  const  [displayableData, setDisplayableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = useMemo(() => {
    // console.log(gridColumns)
    if (data.length === 0) return [];
  const columnNames = []
  gridColumns.forEach((item)=>{
    columnNames.push(item.columnName)
  })
    // const columnNames = Object.keys(data[0]);
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
    console.log('executed')
if (!pagable) {
  const filter = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "") {
      filter[key] = value.toLowerCase();
    }
  });
  const filteredArray = data.filter((item) =>
    Object.entries(filter).every(([key, value]) =>{      
            return  item[key].toLowerCase().includes(value)
    })
  );

  const reformData =(data)=>{
  return   data.map((element,i)=>{
     return {selected:false, gridId:i+1,...element}
    })
  }

  setDisplayableData(Object.keys(filter).length === 0 ? reformData(data) : reformData(filteredArray));
} else {
  const filter = {};
  const paginationFun = (array) => {
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const newArray = array.map((element,i)=>{ 
      return { selected:false,gridId:i+1, ...element} 
    })
   
    return newArray.slice(indexOfFirstItem, indexOfLastItem);
  };
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "") {
      filter[key] = value.toLowerCase();
    }
  });
  const filteredArray = data.filter((item) =>
    Object.entries(filter).every(([key, value]) => {
        console.log(typeof  value)
        if(typeof value === 'string'){
            return  item[key].toLowerCase().includes(value)
        }else{
            return  item[key].includes(value)
        }
      
    })
  );
  setDisplayableData(Object.keys(filter).length === 0 ? paginationFun(data) : paginationFun(filteredArray));
}

},[filters,currentPage])


 

  function renderHeader() {
    return (
      <thead>
        <tr>
            {selectable && <th>
                <input type="checkbox" 
               onChange={(e) => {
                setDisplayableData(() => {
                  return displayableData.map((disData) => {
                    disData.selected = !disData.selected;
                    return disData;
                  });
                });
              }}

                />
            </th>}
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
  
  if (typeof selectedHandler === 'function') {
    selectedHandler(selectedValuesHandler())
  }
  function selectedValuesHandler(){
    const selectedValues = []
    displayableData.forEach(element => {
       if(element.selected === true){
        selectedValues.push(element)
       }
    })
console.log(selectedValues)
    return selectedValues
  }
  

  function renderBody() {
    // const filteredDataArray = filteredData();

    return (
      <tbody>
        {displayableData.map((row, index) => {
          return (
            <tr key={index}>
               {selectable && <td>
                    <input type="checkbox"
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
                    </td>}
              {gridColumns.map((column) => (
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
