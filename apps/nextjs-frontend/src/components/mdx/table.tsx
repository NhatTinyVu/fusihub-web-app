import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@fusihub/ui";

type TableProps = {
  headers: string[];
  rows: string[][];
};

const Table = (props: TableProps) => {
  const { headers, rows } = props;

  return (
    <UITable className="not-prose">
      <TableHeader>
        <TableRow>
          {headers.map((header, i) => (
            <TableHead
              key={`${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                i
              }`}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <TableRow key={i}>
            {row.map((cell, j) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <TableCell key={j}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </UITable>
  );
};

export default Table;
