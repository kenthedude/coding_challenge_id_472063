import './table.css';

interface TableProps<T> {
  columns: string[];
  data: T[];
  page: number;
  size: number;
  total: number;
}

// eslint-disable-next-line
const Table = <T extends Record<string, any>>({ columns, data, page, size, total }: TableProps<T>) => {
  console.log(page)
  console.log(size)
  console.log(total)
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col}>{row[col]?.toString()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
