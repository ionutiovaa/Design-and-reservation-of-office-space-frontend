import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Container, View, Text} from 'native-base';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import styles from '../navigation-menu/styles/NavMenuStyle';

export default class MainView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Container>
        <CustomHeader navigation={this.props.navigation} titleText="home">
          <View style={{marginTop:80}}>
            <Text>MAIN</Text>
          </View>
        </CustomHeader>
      </Container>
    );
  }
}

AppRegistry.registerComponent('MainView', () => MainView);