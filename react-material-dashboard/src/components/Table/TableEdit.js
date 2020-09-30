import React, { useState } from 'react';
import MaterialTable from 'material-table';

const TableEdit = ({ columns, domains, onUpdate }) => {
  const [data, setData] = useState(domains);

  return (
    <MaterialTable
      title="E-mails"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              onUpdate([...dataUpdate]);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              onUpdate([...dataDelete]);
              resolve();
            }, 1000);
          })
      }}
    />
  );
};

export default TableEdit;
