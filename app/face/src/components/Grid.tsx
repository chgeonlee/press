import { ReactNode } from "react";

export interface IGridProps {
  columns: number;
  children: ReactNode | ReactNode[];
  rowGap: number;
  columnGap: number;
}

const Grid = ({ columns, children, rowGap, columnGap }: IGridProps) => {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        rowGap: rowGap,
        columnGap: columnGap,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;

Grid.defaultProps = {
  rowGap: 24,
  columnGap: 12,
};
