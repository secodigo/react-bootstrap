import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import Search from 'components/Input/InputSearch/Search';
import useStyles from './styles';

const Table = ({
  className,
  domains,
  navigateToEdit,
  deleteAction,
  loading,
  title,
  onPressEnter,
  header,
  onChecked,
  ...rest
}) => {
  const classes = useStyles();

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      onPressEnter(event.target.value);
    }
  };

  const filters = () => {
    const array = [];
    if (header) {
      Object.entries(header).map((item) => {
        return array.push({
          title: item[1],
          field: item[0]
        });
      });
    }
    return array;
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Grid className={classes.toolbar} container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Typography component="h1" variant="h4">
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Search onKeyPress={onKeyPress} onClick={onPressEnter} />
              </Grid>
            </Grid>
            <MaterialTable
              isLoading={loading}
              columns={filters()}
              data={domains}
              actions={[
                navigateToEdit && {
                  icon: 'edit',
                  tooltip: 'Editar',
                  onClick: (event, rowData) => navigateToEdit(rowData.id)
                },
                () =>
                  deleteAction && {
                    icon: 'delete',
                    tooltip: 'Remover',
                    onClick: (event, rowData) => deleteAction(rowData.id)
                  }
              ]}
              options={{
                selection: true,
                toolbar: false,
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
              onSelectionChange={(rows, row) => onChecked(rows, row)}
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
  header: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  navigateToEdit: PropTypes.func,
  deleteAction: PropTypes.func,
  onPressEnter: PropTypes.func
};

export default Table;
