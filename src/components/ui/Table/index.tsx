import styles from "./style.module.scss";

interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <div
      {...props}
      className={`${styles.table} ${className || ""}`}
    >
      {children}
    </div>
  );
};

interface TableHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export const TableHead = ({ children, className, ...props }: TableHeadProps) => {
  return (
    <div {...props} className={`${styles.table__head} ${className || ""}`}>
      {children}
    </div>
  );
};

interface TableBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export const TableBody = ({ children, className, ...props }: TableBodyProps) => {
  return (
    <div {...props} className={`${styles.table__body} ${className || ""}`}>
      {children}
    </div>
  );
};

interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gridTemplateColumns?: string;
}
export const TableRow = ({ children, className, gridTemplateColumns = "repeat(7, 1fr)", ...props }: TableRowProps) => {
  return (
    <div
      className={`${styles.table__row} ${className || ""}`}
      style={{ gridTemplateColumns }}
      {...props}
    >
      {children}
    </div>
  );
};

interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export const TableHeader = ({ children, className, ...props }: TableHeaderProps) => {
  return (
    <div className={`${styles.table__cell} ${styles.header} ${className || ""}`} {...props}>
      {children}
    </div>
  );
};

interface TableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export const TableCell = ({ children, className, ...props }: TableCellProps) => {
  return (
    <div
      {...props}
      className={`${styles.table__cell} ${className || ""}`}
    >
      {children}
    </div>
  );
};