import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
//import Route from './app/routes';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainRoute from "./navigation/routes/MainRoute";

const RootStack = createStackNavigator ({
  Home: {
      screen: MainRoute, 
      navigationOptions: {
          header: null,
      },
  },
})
const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}


// Now AppContainer is the main component for React to render
//export default AppContainer;