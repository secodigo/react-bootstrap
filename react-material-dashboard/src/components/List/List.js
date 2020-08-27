import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Table } from 'components';
import defaultActions from 'store/actions/defaultActions';
import useStyles from './styles';

const List = ({ reducer, endPoint, title }) => {
  const classes = useStyles();
  const { domains, loading } = useSelector((state) => state[reducer]);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(defaultActions.list(reducer, endPoint));
  }, []);

  const history = useHistory();

  const navigateTo = () =>
    history.push({
      pathname: `${window.location.pathname}/create`
    });

  const navigateToEdit = (id) =>
    history.push({
      pathname: `${window.location.pathname}/create/${id}`
    });

  const removeAction = (id) =>
    dispatch(defaultActions.remove(reducer, endPoint, id));

  return (
    <div className={classes.root}>
      <div>
        <Button onClick={navigateTo} variant="contained" color="secondary">
          {t('ADD')}
        </Button>
      </div>
      <div className={classes.content}>
        <Table
          navigateToEdit={navigateToEdit}
          deleteAction={removeAction}
          domains={domains}
          loading={loading}
          title={title}
        />
      </div>
      {/* <Dialog open={props.openDialog} onClose={props.esconderMensagem}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>{props.mensagem}</DialogContent>
        <DialogActions>
          <Button onClick={props.esconderMensagem}>Fechar</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

List.propTypes = {
  endPoint: PropTypes.shape({
    search: PropTypes.string.isRequired,
    crud: PropTypes.string.isRequired,
    entity: PropTypes.string.isRequired
  }).isRequired,
  reducer: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default List;
