import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { ThemeContext } from './ThemeWrapper';
import Footer from '../../components/Footer/Footer';

import {
  Parent,
  DashboardPage,
  BlankPage,
  AssignPage,
  AcceptPage,
  OperationList,
  Form,
  Table,
  Error,
  NotFound
} from '../pageListAsync';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        <Route exact path="/app" component={BlankPage} />
        <Route exact path="/app/pages/assign" component={AssignPage} />
        <Route exact path="/app/pages/accept" component={AcceptPage} />
        <Route exact path="/app/pages/operation-list" component={OperationList} />
        <Route path="/app/pages/form" component={Form} />
        <Route path="/app/pages/table" component={Table} />
        <Route path="/app/pages/not-found" component={NotFound} />
        <Route path="/app/pages/error" component={Error} />
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
