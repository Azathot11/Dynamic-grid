const TableColumn = ({ title, value }) => {
  return (
    <>
      <th>{title}</th>
      <td>{value}</td>
    </>
  );
};
export default TableColumn;