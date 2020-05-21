import * as React from 'react';
import {AppRegistry, Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, Linking} from 'react-native';
import {Container, View, Text} from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import MapView, {Marker} from 'react-native-maps';
import styles from '../main-view/MainViewStyle';
import LanguageService from '../../services/LanguageService';
import {Language} from '../../data-models/Language';

interface IStateMain{
  languageService: LanguageService;
  currentLanguage: Language;
}

export default class MainView extends React.Component<any, IStateMain> {
  constructor(props: any) {
    super(props);
  }

  onSuccess = e => {
    console.log(e.data);
  };

render(){
  return(
    <Container>
            <CustomHeader navigation={this.props.navigation} titleText="home">
              <View style={styles.customHeader}></View>
            </CustomHeader>
            
              <KeyboardAvoidingView>
                <React.Fragment>
                  <View style={{marginTop: 55}}>
                <QRCodeScanner
        onRead={this.onSuccess}
        //flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>Scan desk QRCode!</Text>
          </TouchableOpacity>
        }
      />
      </View>
                  
                </React.Fragment>
              </KeyboardAvoidingView>
            
          </Container>
  );
}
}

AppRegistry.registerComponent('MainView', () => MainView);