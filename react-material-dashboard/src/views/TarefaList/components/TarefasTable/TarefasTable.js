import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent
  // Table,
  // TableBody,
  // TableCell,
  // TableHead,
  // TableRow,
  // IconButton
} from '@material-ui/core';

// import TimerIcon from '@material-ui/icons/Timer';
// import DoneAllIcon from '@material-ui/icons/DoneAll';
// import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TarefasTable = ({
  className,
  tarefas,
  navigateToEdit,
  deleteAction,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MaterialTable
              title="Lista de Tarefas"
              columns={[
                { title: 'Descrição', field: 'descricao' },
                { title: 'Andamento', field: 'done' },
                { title: 'Categoria', field: 'categoria' }
              ]}
              data={tarefas}
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Editar',
                  onClick: (event, rowData) => navigateToEdit(rowData.id)
                },
                (rowData) => ({
                  icon: 'delete',
                  tooltip: 'Remover',
                  onClick: (event, rowData) => deleteAction(rowData.id)
                })
              ]}
              options={{
                filtering: true,
                actionsColumnIndex: -1
              }}
              localization={{
                header: {
                  actions: ''
                }
              }}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

TarefasTable.propTypes = {
  className: PropTypes.string,
  tarefas: PropTypes.array.isRequired,
  navigateToEdit: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired
};

export default TarefasTable;
