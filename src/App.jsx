
import './App.css'
import Grid from './components/GridComp'

function App() {
  const dummyData = [
    {name: 'John', age: 23, email: 'john@example.com'},
    {name: 'Jane', age: 28, email: 'jane@example.com'},
    {name: 'Bob', age: 32, email: 'bob@example.com'},
    {name: 'Alice', age: 26, email: 'alice@example.com'},
  ];

  const columns = [
    {title: 'Name', columnName: 'name', filter: ''},
    {title: 'Age', columnName: 'age', filter: ''},
    {title: 'Email', columnName: 'email', filter: ''},
  ]
  const selectedHandler =(values)=>{
    console.log(values)
  }
  return (
   //add pagable to add anable pagination
   //add filtrable  to add filters
   //selectable to activate the select boxes
   //selectedHandler a function that get the selected values

    <>
      <Grid data ={dummyData} gridColumns={columns} perPage={3} filtrable={true} pagable  selectable/>
     
    </>
  )
}

export default App
