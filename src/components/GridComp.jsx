import  { useState, useMemo, useEffect } from "react";

function Grid({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const  [displayableData, setDisplayableData] = useState(data);

  const columns = useMemo(() => {
    if (data.length === 0) return [];

    const columnNames = Object.keys(data[0]);

    const newColumns = columnNames.map((columnName) => {
      const filter = filters[columnName] ? filters[columnName] : "";
      return { columnName, filter };
    });

    return newColumns;
  }, [data, filters]);

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  function handleFilterChange(event, columnName) {
    const newFilters = { ...filters, [columnName]: event.target.value };
    console.log(newFilters)
    setFilters(newFilters);
  }

  useEffect(()=>{
//     const filter = {};
//     Object.keys(filters).forEach(key => {
//         if (filters[key] !== "") {
//           filter[key] = filters[key];
//         }
//       });
   
//   const filteredArray = displayableData.filter((item) =>
//     Object.entries(filter).every(([key, value]) => item[key] === value)
//     );

//     if(Object.keys(filter).length === 0){
//         return  setDisplayableData(data)
       
//     }
//     setDisplayableData(filteredArray);

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
   
},[filters])

  function filteredData() {
    if (!searchTerm && Object.values(filters).every((filter) => filter === "")) {
      return data;
    }

    const searchTermLowerCase = searchTerm.toLowerCase();

    const filteredData = data.filter((row) => {
      const rowValues = Object.values(row).map(value => value.toString().toLowerCase());
      if (rowValues.some(value => value.includes(searchTermLowerCase))) {
        return true;
      }

      let matchesFilters = true;

      Object.entries(filters).forEach(([column, filterValue]) => {
        if (filterValue === "") {
          return;
        }
        if (!row[column].toString().toLowerCase().includes(filterValue.toLowerCase())) {
          matchesFilters = false;
        }
      });

      return matchesFilters;
    });
console.log(filteredData)
    return filteredData;
  }

  function renderHeader() {
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.columnName}>
              <div>{column.columnName}</div>
              <input
                type="text"
                value={column.filter}
                onChange={(event) => handleFilterChange(event, column.columnName)}
              />
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

  return (
    <>
      <table>
        {renderHeader()}
        {renderBody()}
      </table>
    </>
  );
}

export default Grid;
