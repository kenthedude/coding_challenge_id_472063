import React from 'react';
import './dropdown.css';
import useDropdownHandler from '../../../hooks/useDropdownHandler';

interface DropdownProps {
  taskIndex: number;
  options: string[];
  onSelect: (option: string, taskIndex: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, taskIndex }) => {
  const { isOpen, handleOptionClick, toggleDropdown, dropdownRef } = useDropdownHandler(onSelect);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        Actions
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleOptionClick(option, taskIndex)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
