import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardContent, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import useStyles from './styles';

const Table = ({
  className,
  domains,
  navigateToEdit,
  deleteAction,
  loading,
  title,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MaterialTable
              isLoading={loading}
              title={
                <Typography component="h1" variant="h4">
                  {title}
                </Typography>
              }
              columns={[
                { title: 'Código', field: 'codigo' },
                { title: 'Descrição', field: 'descricao' }
              ]}
              data={domains}
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Editar',
                  onClick: (event, rowData) => navigateToEdit(rowData.id)
                },
                () => ({
                  icon: 'delete',
                  tooltip: 'Remover',
                  onClick: (event, rowData) => deleteAction(rowData.id)
                })
              ]}
              options={{
                filtering: true,
                actionsColumnIndex: -1,
                paginationType: 'stepped'
              }}
              localization={{
                header: {
                  actions: ''
                },
                body: {
                  emptyDataSourceMessage: 'Não há registros a serem exibidos!'
                }
              }}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

Table.defaultProps = {
  className: '',
  loading: false
};

Table.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  domains: PropTypes.oneOfType([PropTypes.array]).isRequired,
  loading: PropTypes.bool,
  navigateToEdit: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired
};

export default Table;
