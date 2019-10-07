import React from "react";
import classNames from "classnames";
import "./App.css";

export interface SudokuProps {
  selected?: { index: number; value: number }[];
  puzzleArray: number[];
  onChange: (index: number, value: number) => void;
}

const Sudoku: React.FunctionComponent<SudokuProps> = props => {
  const { selected, puzzleArray, onChange } = props;
  return (
    <div className="sudoku_board">
      {puzzleArray.map((one, index) => {
        const isSelected =
          selected && selected.find(e => e.index === index && e.value === one);
        return (
          <div
            className={classNames("cell", {
              fix: isSelected
            })}
            key={index}
            role="button"
            onClick={() => onChange(index, one)}
          >
            <span>{one !== 0 && one}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Sudoku;
