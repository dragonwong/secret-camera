import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';

import Calculator from './Calculator';
import Setting from './Setting';
import Router from '../router';

const RootStackNavigator = StackNavigator(
  {
    Calculator: {
      screen: Calculator,
    },
    Setting: {
      screen: Setting,
    },
  },
  {
    initialRouteName: 'Setting',
    navigationOptions: {
      headerTitleStyle: {
        fontSize: 22,
      },
    },
    mode: 'modal',
  }
);

// console.log(RootStackNavigator.router);

export default class RootNavigator extends React.Component {
  getNavigation(navigation) {
    console.log(navigation);
    Router.navigation = navigation._navigation;
  }
  render() {
    return <RootStackNavigator ref={this.getNavigation} />;
  }
}
