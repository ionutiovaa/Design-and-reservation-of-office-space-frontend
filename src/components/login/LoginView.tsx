import React, { useState, useEffect, Fragment } from 'react';
import {View, Text, Dimensions, StyleSheet, Button} from 'react-native';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AsyncStorage from '@react-native-community/async-storage';
import CardHeader from '@material-ui/core/CardHeader';
import Snackbar from 'react-native-snackbar';
import * as jwt from 'jsontokens';

import ScTextInput from '../sc-text-input/ScTextInput';
import ScButton from '../sc-button/ScButton';
import ScPicker from '../sc-picker/ScPicker';
import LanguageService from '../../services/LanguageService';
import {Language} from '../../data-models/Language';
import {IUser} from '../../data-models/User';
import AuthenticateService from '../../services/AuthenticateService';
import { UserType } from '../../data-models/UserType';

interface IStateLogin {
  username: string;
  password: string;
  isLoading: boolean;
  languageService: LanguageService;
  currentLanguage: Language;
}

interface Payload {
  sub: string;
  exp: number;
  iat: number;
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
    const token = (await AsyncStorage.getItem('token')) || null;
    if (!token) return;

    const decodedToken: Payload = JSON.parse(
      JSON.stringify(jwt.decodeToken(token).payload),
    );
    const dateNow = new Date();
    const tokenDate = new Date(0);
    tokenDate.setUTCSeconds(decodedToken.exp);

    tokenDate.getTime() < dateNow.getTime()
      ? this.clearStoredData()
      : this.props.navigation.navigate('MainView');
  }

  private onPressLoginButton() {
    //  sha256(this.state.password).then((hash: string) => {
    // this.handleLogin(this.state.username, hash);
    this.handleLogin(this.state.username, this.state.password);
    // });
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
        this.props.navigation.navigate('MainView');
        //this.props.navigation.navigate('MapView');
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
        <View>
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
            </View>
        </View>
        <View style={styles.textInput}>
              <ScButton
                text={this.state.languageService.get('login')}
                onClick={this.onPressLoginButton.bind(this)}
              />
              <Text
                style={styles.textStyle}
                onPress={this.switchToRegister.bind(this)}>
                {this.state.languageService.get('create_accont')}
              </Text>
            </View>
            </Fragment>
    )
  }
}

const styles = StyleSheet.create({

  formView: {
    paddingTop: 20,
    width: Dimensions.get('screen').width - 60,
  },
  textInput: {
    padding: 10,
    alignItems: 'center',
  },
  textStyle: {
    paddingTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#719192',
    textDecorationLine: 'underline',
  },

});








// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       width: 400,
//       margin: `${theme.spacing(0)} auto`
//     },
//     loginBtn: {
//       marginTop: theme.spacing(2),
//       flexGrow: 1
//     },
//     header: {
//       textAlign: 'center',
//       background: '#212121',
//       color: '#fff'
//     },
//     card: {
//       marginTop: theme.spacing(10)
//     }

//   }),
// );

// const Login = () => {
//   const classes = useStyles();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//   const [helperText, setHelperText] = useState('');
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     if (username.trim() && password.trim()) {
//       setIsButtonDisabled(false);
//     } else {
//       setIsButtonDisabled(true);
//     }
//   }, [username, password]);

//   const handleLogin = () => {
//     if (username === 'abc@email.com' && password === 'password') {
//       setError(false);
//       setHelperText('Login Successfully');
//     } else {
//       setError(true);
//       setHelperText('Incorrect username or password')
//     }
//   };

//   const handleKeyPress = (e:any) => {
//     if (e.keyCode === 13 || e.which === 13) {
//       isButtonDisabled || handleLogin();
//     }
//   };
/*
  return (
    <Fragment>
        <View style={styles.formView}>
              <ScTextInput
                value={this.state.username}
                placeHolder={this.state.languageService.get('usrname_email')}
                icon={'mail'}
                onChangeText={(e)=>setUsername(e.target.value)}
              />
              <ScTextInput
                value={this.state.password}
                placeHolder={this.state.languageService.get('password')}
                icon={'lock'}
                secureTextEntry={true}
                onChangeText={(e)=>setPassword(e.target.value)}
              />
            </View>
    </Fragment>
  );
}

*/
// const styles = StyleSheet.create({
//     formView: {
//         paddingTop: 20,
//         width: Dimensions.get('screen').width - 60,
//     },
// });

// export default Login;