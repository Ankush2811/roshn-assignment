import React from "react";
import "./Table.css";

interface TableProps<T> {
    data: T[];
    renderRow: (item: T) => React.ReactNode;
}

const Table = <T,>({ data, renderRow }: TableProps<T>) => (
    <div className="table-container">
        <table className="styled-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Company</th>
                </tr>
            </thead>
            <tbody>{data.map(renderRow)}</tbody>
        </table>
    </div>
);

export default Table;
