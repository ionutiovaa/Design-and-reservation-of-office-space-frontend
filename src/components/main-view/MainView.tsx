import * as React from 'react';
import {AppRegistry, View} from 'react-native';

export default class MainView extends React.Component {
  render() {
    return (
      <View
        accessible={true}
        style={{borderRadius: 30, width: 60, height: 60, margin: 10}}>
        <View style={{backgroundColor: 'magenta', width: 60, height: 60}} />
      </View>
    );
  }
}

AppRegistry.registerComponent('MainView', () => MainView);