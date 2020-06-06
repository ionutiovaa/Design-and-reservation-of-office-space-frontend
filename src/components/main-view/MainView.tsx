import * as React from 'react';
import { AppRegistry, Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Container, View, Text } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import styles from '../main-view/MainViewStyle';
import LanguageService from '../../services/LanguageService';

interface IStateMain {
  languageService: LanguageService;
}

export default class MainView extends React.Component<any, IStateMain> {
  constructor(props: any) {
    super(props);
    this.state = {
      languageService: new LanguageService(),
    }
  }

  private is_numeric(str) {
    return /^\d+$/.test(str);
  }

  onSuccess = e => {
    const first: string = e.data[0];
    const second: string = e.data[1];
    const third: string = e.data[2];
    const fourth: string = e.data[3];
    const fifth: string = e.data[4];

    if (e.data.length == 5 && this.is_numeric(first) && second == ":" && this.is_numeric(third) && fourth == ":" && this.is_numeric(fifth)) {
      this.props.navigation.navigate('BookView', { position: e.data });
    }
    else {
      Alert.alert(this.state.languageService.get('wrong_qr'))
    }
  };

  render() {
    return (
      <Container>
        <CustomHeader navigation={this.props.navigation} titleText="home">
          <View style={styles.customHeader}></View>
        </CustomHeader>
        <KeyboardAvoidingView>
          <React.Fragment>
            <View style={{ marginTop: 60, bottom: 0 }}>
              <QRCodeScanner
                reactivate={true}
                reactivateTimeout={3000}
                showMarker={true}
                onRead={this.onSuccess}
                bottomContent={
                  <TouchableOpacity style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>{this.state.languageService.get('qrcamera')}</Text>
                  </TouchableOpacity>
                }
              />
              <View style={{ marginTop: 500, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#3f4194' }}>
                  {this.state.languageService.get('scanqr')}
                </Text>
              </View>
            </View>
          </React.Fragment>
        </KeyboardAvoidingView>

      </Container>
    );
  }
}

AppRegistry.registerComponent('MainView', () => MainView);