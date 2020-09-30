/* eslint-disable no-restricted-syntax */
import defaultActions from './defaultActions';

const userGroups = (domain) => {
  const result = [];
  for (const group of domain?.groups) {
    let value = {};
    for (const userGroup of domain.userGroups) {
      if (group.name === userGroup.group.name) {
        value = userGroup;
      }
    }
    if (Object.entries(value).length === 0) {
      value = { group };
    }
    result.push(value);
  }
  return result;
};

const usuarioActions = {
  save: (reducer, endPoint, domain) => async (dispatch) => {
    const userGroupList = userGroups(domain);
    const data = { ...domain, userGroups: userGroupList };
    await dispatch(defaultActions.save(reducer, endPoint, data));
  }
};

export default usuarioActions;
