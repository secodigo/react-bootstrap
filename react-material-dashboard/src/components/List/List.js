import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Table, AsyncButton, Message } from 'components';
import defaultActions from 'store/actions/defaultActions';
import { ToolBar } from 'layouts';
import useStyles from './styles';

const List = ({ reducer, endPoint, title }) => {
  const classes = useStyles();
  const { domains, loading, message, filters } = useSelector(
    (state) => state[reducer]
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const history = useHistory();

  useEffect(() => {
    dispatch(defaultActions.filters(reducer, endPoint));
    return () => dispatch(defaultActions.clearMessage(reducer));
  }, []);

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

  const fetchRegisters = (value) => {
    const params = new URLSearchParams();
    params.append(endPoint.filterDefault, value);
    dispatch(defaultActions.list(reducer, endPoint, params));
  };

  return (
    <div className={classes.root}>
      {message && <Message message={message} />}
      <ToolBar>
        <AsyncButton type="submit" text={t('ADD')} onClick={navigateTo} />
      </ToolBar>
      <div>
        <Table
          navigateToEdit={navigateToEdit}
          deleteAction={removeAction}
          domains={domains}
          loading={loading}
          header={filters}
          title={title}
          onPressEnter={fetchRegisters}
        />
      </div>
    </div>
  );
};

List.propTypes = {
  endPoint: PropTypes.shape({
    search: PropTypes.string.isRequired,
    crud: PropTypes.string.isRequired,
    entity: PropTypes.string.isRequired,
    filterDefault: PropTypes.string.isRequired
  }).isRequired,
  reducer: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default List;
