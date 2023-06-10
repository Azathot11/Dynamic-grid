
import './App.css'
import Grid from './components/GridComp'

function App() {
  const dummyData = [
    {name: 'John', age: 23, email: 'john@example.com'},
    {name: 'Jane', age: 28, email: 'jane@example.com'},
    {name: 'Bob', age: 32, email: 'bob@example.com'},
    {name: 'Alice', age: 26, email: 'alice@example.com'},
  ];

  return (
   //add pagable to add anable pagination
   //add filtrable  to add filters
    <>
      <Grid data ={dummyData} perPage={3}  pagable/>
    </>
  )
}

export default App
