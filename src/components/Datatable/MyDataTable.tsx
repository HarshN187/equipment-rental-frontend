import React, { type JSX, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { type ColumnProps } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

interface MyColumn extends ColumnProps {
  field?: string;
  header: string;
  body?: (rowData: any, options: any) => React.ReactNode;
  sortable?: boolean;
  exportable?: boolean;
  style?: React.CSSProperties;
  filter?: boolean;
  filterElement?: React.ReactNode;
}

interface MyDataTableProps {
  data: any[];
  scrollable?: boolean;
  columns: MyColumn[];
  rowClass?: () => string;
}

import { Dropdown } from "primereact/dropdown";

function MyDataTable(props: MyDataTableProps): JSX.Element {
  const [globalFilter, setGlobalFilter] = useState<string>(""); // State for global filter

  const [filters, setFilters] = useState<any>({
    global: { value: "", matchMode: "contains" },
    category: { value: null, matchMode: "equals" },
  });

  const header = (
    <div className="flex justify-end p-2">
      <InputText
        type="search"
        className="border-1 border-gray-300 rounded-md p-1"
        value={globalFilter}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setGlobalFilter(e.currentTarget.value)
        }
        placeholder="Keyword Search"
      />
    </div>
  );

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <DataTable
        value={props.data}
        paginator
        rows={5}
        removableSort
        scrollable={props.scrollable}
        scrollHeight="420px"
        showGridlines
        stripedRows
        rowClassName={props.rowClass ? props.rowClass : () => ""}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        className="border-separate border-spacing-0"
        globalFilter={globalFilter}
        header={header}
      >
        {props.columns.map((col: MyColumn) => (
          <Column
            key={col.field || col.header}
            sortable={col.sortable !== false}
            field={col.field}
            header={col.header}
            body={col.body}
            headerClassName="bg-gray-200 text-gray-700 p-3 text-left text-sm font-semibold"
            bodyClassName="p-3 text-sm text-gray-600"
            style={col.style}
          />
        ))}
      </DataTable>
    </div>
  );
}

export default MyDataTable;
