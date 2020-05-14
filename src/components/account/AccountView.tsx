import * as React from 'react';
import {AppRegistry} from 'react-native';
import { Container, View, Text } from 'native-base';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';

export default class AccountView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
      }
    
      render() {
        return (
          <Container>
            <CustomHeader navigation={this.props.navigation} titleText="home">
              <View style={{marginTop: 80}}>
                <Text>ACCOUNT</Text>
              </View>
            </CustomHeader>
          </Container>
        );
    }
}

AppRegistry.registerComponent('AccountView', () => AccountView);