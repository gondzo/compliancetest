import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import HomePageContainer from '../containers/HomePageContainer';
import ReportsPageContainer from '../containers/ReportsPageContainer';
import LayoutsContainer from '../containers/LayoutsContainer';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/scss/App.scss';

export interface AppProps {
  store: Store<any>;
  history: any;
}

export default class App extends React.Component<AppProps, undefined> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={() => <HomePageContainer />} />
            <Route
              path="/reports"
              component={() => (
                <LayoutsContainer>
                  <ReportsPageContainer />
                </LayoutsContainer>
              )}
            />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
