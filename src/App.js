import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import PropTypes from 'prop-types';

import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";

import JobPage from './Components/JobPage/JobPage'
import ShiftPage from './Components/ShiftPage/ShiftPage'
import CompletionPage from './Components/CompletionPage/CompletionPage'
import ExchangeRates from './Components/ExchangeRates'

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});
class App extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    client
  }

  render() {

    const { client } = this.props;

    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider>
          <Router>
            <div>
              <Route exact={true} path="/" component={ExchangeRates}/>
              <Route exact={true} path="/Jobs" component={JobPage}/>
              <Route exact={true} path="/Shift" component={ShiftPage}/>
              <Route exact={true} path="/Complete" component={CompletionPage}/>
            </div>
          </Router>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}


App.propTypes = {
  client: PropTypes.object.isRequired,
};

export default App;
