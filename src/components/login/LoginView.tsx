import React, { Fragment } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import styles from '../login/LoginViewStyle';


import ScTextInput from '../sc-text-input/ScTextInput';
import ScButton from '../sc-button/ScButton';
import ScPicker from '../sc-picker/ScPicker';
import LanguageService from '../../services/LanguageService';
import { Language } from '../../data-models/Language';
import { IUser } from '../../data-models/User';
import AuthenticateService from '../../services/AuthenticateService';

interface IStateLogin {
  username: string;
  password: string;
  isLoading: boolean;
  languageService: LanguageService;
  currentLanguage: Language;
}

export default class LoginView extends React.Component<any, IStateLogin> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      languageService: new LanguageService(),
      currentLanguage: Object(null),
    };
    this.state.languageService.getLanguage().then((lang: Language) => {
      this.setState({
        currentLanguage: lang,
      });
    });
    this.checkLogin();
  }

  private async checkLogin() {
    try {
      const token = (await AsyncStorage.getItem('token')) || null;
      if (!token) return;
      var jwtDecode = require('jwt-decode');
      var decodedToken = jwtDecode(token);
      const dateNow = new Date();
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodedToken.exp);
      tokenDate.getTime() < dateNow.getTime()
        ? this.clearStoredData()
        : this.props.navigation.navigate('MapView');
    }
    catch (err) { console.log("err:" + err) }
  }

  private onPressLoginButton() {
    this.handleLogin(this.state.username, this.state.password);
  }

  private handleLogin(username: string, password: string) {
    this.setState({
      isLoading: true,
    });


    AuthenticateService.login({
      username,
      password,
    })
      .then(async (user: IUser) => {
        await AsyncStorage.setItem('logged_user', JSON.stringify(user));
        await AsyncStorage.setItem('token', user.token);
        AuthenticateService.getUserType();
        this.setState({
          isLoading: false,
          password: '',
          username: '',
        });
        this.props.navigation.navigate('MapView');
      })
      .catch(async () => {
        this.showSnackBarMessage(this.state.languageService.get('wrong_login'));
        this.clearStoredData();

        this.setState({
          isLoading: false,
        });
      });
  }

  private showSnackBarMessage(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  private async clearStoredData() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('logged_user');
  }

  private onChangeUserName = (changedText: string) => {
    this.setState({
      username: changedText,
    });
  };

  private onChangePassword = (changedText: string) => {
    this.setState({
      password: changedText,
    });
  };

  private onChangeLanguage = (changedLanguage: Language) => {
    this.state.languageService.setLanguage(changedLanguage);
    this.setState({
      currentLanguage: changedLanguage,
    });
  };

  private switchToRegister() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <Fragment>
        <View style={styles.formView}>
          <Image style={{ marginTop: -20, resizeMode: 'cover', width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }} source={require('../../assets/background.jpeg')}></Image>
          <View style={{ marginTop: 20, marginLeft: 40, alignContent: 'center', position: 'absolute', width: Dimensions.get('screen').width - 80 }}>
            <ScPicker
              selectedValue={this.state.currentLanguage}
              onChangeValue={(itemValue: Language) =>
                this.onChangeLanguage(itemValue)
              }
              pickerItems={Object.keys(Language)}
            />
            <ScTextInput
              value={this.state.username}
              placeHolder={this.state.languageService.get('usrname_email')}
              icon={'person'}
              onChangeText={this.onChangeUserName.bind(this)}
            />
            <ScTextInput
              value={this.state.password}
              placeHolder={this.state.languageService.get('password')}
              icon={'lock'}
              secureTextEntry={true}
              onChangeText={this.onChangePassword.bind(this)}
            />
            <View style={styles.textInput}>
              <ScButton
                text={this.state.languageService.get('login')}
                onClick={this.onPressLoginButton.bind(this)}
              />
            </View>
          </View>
          <View style={styles.bottom}>
            <Text
              style={styles.textStyle}
              onPress={this.switchToRegister.bind(this)}>
              {this.state.languageService.get('create_accont')}
            </Text>
          </View>
        </View>
      </Fragment>
    )
  }
}
