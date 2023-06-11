
import './App.css'
import Grid from './components/GridComp'

function App() {
  const dummyData = [
    {name: 'John', age: 23, email: 'john@example.com',username:'Paulio'},
    {name: 'Jane', age: 28, email: 'jane@example.com',username:'jake'},
    {name: 'Bob', age: 32, email: 'bob@example.com',username:'steph'},
    {name: 'Alice', age: 26, email: 'alice@example.com',username:'lolt'},
    {name: 'John', age: 30, email: 'john@example.com', username: 'john1'}, 
  {name: 'Jane', age: 25, email: 'jane@example.com', username: 'jane1'},
  {name: 'Jack', age: 21, email: 'jack@example.com', username: 'jack1'},
  {name: 'Jill', age: 28, email: 'jill@example.com', username: 'jill1'},
  {name: 'Bob', age: 32, email: 'bob@example.com', username: 'bob1'},
  {name: 'Beth', age: 27, email: 'beth@example.com', username: 'beth1'},
  {name: 'Bill', age: 24, email: 'bill@example.com', username: 'bill1'},
  {name: 'Mary', age: 22, email: 'mary@example.com', username: 'mary1'},
  {name: 'Mike', age: 33, email: 'mike@example.com', username: 'mike1'},
  {name: 'Liz', age: 29, email: 'liz@example.com', username: 'liz1'},
  {name: 'Tom', age: 31, email: 'tom@example.com', username: 'tom1'},
  {name: 'Sue', age: 26, email: 'sue@example.com', username: 'sue1'},
  {name: 'Sam', age: 35, email: 'sam@example.com', username: 'sam1'},
  {name: 'Dave', age: 23, email: 'dave@example.com', username: 'dave1'},
  {name: 'Kim', age: 20, email: 'kim@example.com', username: 'kim1'}
  ];

  const columns = [
    {title: 'Name', columnName: 'name'},
    {title: 'Age', columnName: 'age'},
    {title: 'Email', columnName: 'email'},
    {title: 'User Name', columnName: 'username'},
  ]
  const selectedHandler =(values)=>{
    console.log(values)
  }
  return (
   //add pagable to add anable pagination
   //add filtrable  to add filters
   //selectable to activate the select boxes
   //selectedHandler a function that get the selected values

    <main className='p-5'>
      <h1 className='flex justify-center text-3xl font-bold my-5'> Operation 30k</h1>
      <Grid data ={dummyData} gridColumns={columns} perPage={5} filtrable={true} pagable  selectable sorting/>
     
    </main>
  )
}

export default App
