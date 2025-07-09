import Dropdown from '../dropdown/dropdown';
import './table.css';

interface TableProps<T> {
  columns: string[];
  data: T[];
  page: number;
  size: number;
  total: number;
  handleSelect: (option: string, taskIndex: number) => void;
}

// eslint-disable-next-line
const Table = <T extends Record<string, any>>({ columns, data, page, size, total, handleSelect }: TableProps<T>) => {

  const renderStringOrButton = (row: T, col: string, index: number) => {
    if (col === 'actions') {
      const actions: string[] = ['Edit', 'Delete'];
      return (<Dropdown options={actions} onSelect={handleSelect} taskIndex={index} />)
    }
    return row[col]?.toString();
  }
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
              <td key={col}>
                {renderStringOrButton(row, col, index)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
