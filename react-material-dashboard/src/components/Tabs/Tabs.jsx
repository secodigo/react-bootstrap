import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  Switch,
  Route,
  Link,
  BrowserRouter,
  useRouteMatch
} from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomTabs = ({ tabs = [] }) => {
  const { path, url } = useRouteMatch();

  return (
    <BrowserRouter>
      <Route
        path={path}
        render={({ location }) => {
          return (
            <>
              <Tabs value={location.pathname}>
                {tabs.map((tab) => (
                  <Tab
                    key={tab.nome}
                    label={tab.nome}
                    value={url + tab.url}
                    component={Link}
                    replace
                    to={url + tab.url}
                  />
                ))}
              </Tabs>
              <Switch>
                {tabs
                  .slice(0)
                  .reverse()
                  .map((tab) => (
                    <Route
                      key={tab.nome}
                      path={path + tab.url}
                      component={() => <div>{tab.componente}</div>}
                    />
                  ))}
              </Switch>
            </>
          );
        }}
      />
    </BrowserRouter>
  );
};

CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      componente: PropTypes.object.isRequired
    })
  ).isRequired
};

export default CustomTabs;
