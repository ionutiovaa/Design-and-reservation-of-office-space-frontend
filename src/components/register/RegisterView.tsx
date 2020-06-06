import React, { Fragment } from 'react';
import { Text, View, KeyboardAvoidingView, Image, Dimensions } from 'react-native';
import { AxiosError } from 'axios';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';

import ScButton from '../sc-button/ScButton';
import ScTextInput from '../sc-text-input/ScTextInput';
import ScPicker from '../sc-picker/ScPicker';
import { CheckBox } from 'react-native-elements';
import { IUser } from '../../data-models/User';
import UserService from '../../services/UserService';
import LanguageService from '../../services/LanguageService';
import { UserType } from '../../data-models/UserType';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './RegisterStyles';
import FloorService from '../../services/FloorService';

interface IScRegisterState {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  secondPassword: string;
  mobileNumber: string;
  isLoading: boolean;
  userType: UserType;
  checked: boolean;
  isValidLastName: boolean;
  isValidFirstName: boolean;
  isValidEmail: boolean;
  isValidPassword: boolean;
  isValidMobileNumber: boolean;
  isValidAgreeTerm: boolean;
  isValidRole: boolean;
  isValidUsername: boolean;
  languageService: LanguageService;
  roles: string[];
}

export default class RegisterView extends React.Component<any, IScRegisterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      username: '',
      secondPassword: '',
      mobileNumber: '',
      userType: UserType.ADMINISTRATOR,
      checked: false,
      isLoading: false,
      isValidLastName: true,
      isValidFirstName: true,
      isValidEmail: true,
      isValidPassword: true,
      isValidAgreeTerm: true,
      isValidMobileNumber: true,
      isValidRole: true,
      isValidUsername: true,
      roles: [],
      languageService: new LanguageService(),
    };
  }

  private showSnackBarMessage(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  private checkInputData(): boolean {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let isNotError = true;
    if (this.state.lastname.length == 0) {
      this.setState({
        isValidLastName: false,
      });
      isNotError = false;
    }

    if (this.state.firstname.length == 0) {
      this.setState({
        isValidFirstName: false,
      });
      isNotError = false;
    }

    if (this.state.username.length == 0) {
      this.setState({
        isValidUsername: false,
      });
      isNotError = false;
    }

    if (
      this.state.secondPassword.length == 0 ||
      this.state.password.length == 0
    ) {
      this.setState({
        isValidPassword: false,
      });
      isNotError = false;
    }
    if (!isNotError) {
      this.showSnackBarMessage(
        this.state.languageService.get('incomplete_data'),
      );
      return isNotError;
    }
    if (this.state.mobileNumber.length != 10) {
      this.showSnackBarMessage(this.state.languageService.get('invalid_phone'));
      this.setState({
        isValidMobileNumber: false,
      });
      return false;
    }

    if (reg.test(this.state.email) === false) {
      this.showSnackBarMessage(this.state.languageService.get('invalid_email'));
      this.setState({
        isValidEmail: false,
      });
      return false;
    }

    if (this.state.password !== this.state.secondPassword) {
      this.showSnackBarMessage(
        this.state.languageService.get('invalid_password'),
      );
      this.setState({
        isValidPassword: false,
      });
      return false;
    }

    if (!this.state.checked) {
      this.showSnackBarMessage(
        this.state.languageService.get('invalid_agree_terms'),
      );
      this.setState({
        isValidAgreeTerm: false,
      });
      return false;
    }

    return true;
  }

  componentDidMount() {
    let rolesItems = [];
    for (let type in UserType) {
      rolesItems.push(this.state.languageService.get(type));
    }
    this.setState({
      roles: rolesItems,
    })
  }

  private onRegister() {
    this.setState({
      isLoading: true,
    });

    let typeFinal: UserType = null;
    if (this.state.userType === null) {
      typeFinal = UserType.ANGAJAT;
    }
    else {
      for (let type in UserType) {
        if (this.state.userType == this.state.languageService.get(type)) {
          typeFinal = UserType[type];
        }
      }
    }
    var type: string = UserType[typeFinal];

    const user: IUser = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      email: this.state.email,
      username: this.state.username,
      password: '',
      mobileNumber: this.state.mobileNumber,
      userType: typeFinal,
      token: '',
    };
    user.password = this.state.password;
    UserService.insert(user)
      .then(async (newUser: IUser) => {
        await AsyncStorage.setItem('logged_user', JSON.stringify(user));
        await AsyncStorage.setItem('token', user.token);
        FloorService.addFloor();
        await AsyncStorage.setItem('logged_user', JSON.stringify(user));
        this.showSnackBarMessage(
          this.state.languageService.get('succes_create_account'),
        );
        this.setState({
          isLoading: false,
        });

        this.props.navigation.navigate('MapView', {
          goToLogin: true,
          userId: newUser.id,
        });
      })
      .catch((error: AxiosError) => {
        this.showSnackBarMessage(error.message);
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView>
          <Fragment>
            {this.state.isLoading === true}
            <Image style={{ marginTop: -80, resizeMode: 'cover', width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }} source={require('../../assets/background.jpeg')}></Image>
            <View style={styles.sgRegisterView}>
              <Text style={styles.sgTitleText}>
                {this.state.languageService.get('register_form')}
              </Text>
              <View style={styles.sgFormView}>
                <ScTextInput
                  value={this.state.lastname}
                  placeHolder={this.state.languageService.get('l_name')}
                  icon={'person'}
                  bgColor={!this.state.isValidLastName ? '#FAAABA' : ''}
                  onChangeText={newLastName =>
                    this.setState({
                      lastname: newLastName,
                      isValidLastName: true,
                    })
                  }
                />
                <ScTextInput
                  value={this.state.firstname}
                  placeHolder={this.state.languageService.get('f_name')}
                  icon={'person'}
                  bgColor={!this.state.isValidFirstName ? '#FAAABA' : ''}
                  onChangeText={newFirstName =>
                    this.setState({
                      firstname: newFirstName,
                      isValidFirstName: true,
                    })
                  }
                />
                <ScTextInput
                  value={this.state.mobileNumber}
                  placeHolder={this.state.languageService.get('phone')}
                  icon={'phone'}
                  keyboardType={'phone-pad'}
                  bgColor={!this.state.isValidMobileNumber ? '#FAAABA' : ''}
                  onChangeText={newMobileNumber =>
                    this.setState({
                      mobileNumber: newMobileNumber,
                      isValidMobileNumber: true,
                    })
                  }
                />
                <ScTextInput
                  value={this.state.email}
                  placeHolder={this.state.languageService.get('email')}
                  icon={'mail'}
                  keyboardType={'email-address'}
                  bgColor={!this.state.isValidEmail ? '#FAAABA' : ''}
                  onChangeText={newEmail =>
                    this.setState({ email: newEmail, isValidEmail: true })
                  }
                />
                <ScTextInput
                  value={this.state.username}
                  placeHolder={this.state.languageService.get('username')}
                  icon={'person'}
                  keyboardType={'email-address'}
                  bgColor={!this.state.isValidUsername ? '#FAAABA' : ''}
                  onChangeText={newUsername =>
                    this.setState({ username: newUsername, isValidUsername: true })
                  }
                />
                <ScTextInput
                  value={this.state.password}
                  placeHolder={this.state.languageService.get('password')}
                  icon={'lock'}
                  secureTextEntry={true}
                  bgColor={!this.state.isValidPassword ? '#FAAABA' : ''}
                  onChangeText={newPassword =>
                    this.setState({
                      password: newPassword,
                      isValidPassword: true,
                    })
                  }
                />
                <ScTextInput
                  value={this.state.secondPassword}
                  placeHolder={this.state.languageService.get('conf_pass')}
                  icon={'lock'}
                  secureTextEntry={true}
                  bgColor={!this.state.isValidPassword ? '#FAAABA' : ''}
                  onChangeText={newSecondPassowrd =>
                    this.setState({
                      secondPassword: newSecondPassowrd,
                      isValidPassword: true,
                    })
                  }
                />
                <View style={styles.sgPicker}>
                  <View style={{ width: 300, backgroundColor: '#bdbae3', marginTop: -15, borderRadius: 12 }}>
                    <View style={{ alignItems: 'center', marginLeft: -30 }}>
                      <Text style={styles.sgText}>
                        {this.state.languageService.get('role')}
                      </Text>
                    </View>
                    <ScPicker
                      selectedValue={this.state.userType.toString()}
                      pickerItems={this.state.roles}
                      onChangeValue={newRole =>
                        this.setState({ userType: newRole })
                      }
                    />
                  </View>
                </View>
                <View style={{ marginTop: -9 }}>
                  <CheckBox
                    containerStyle={{
                      backgroundColor: !this.state.isValidAgreeTerm
                        ? '#FAAABA'
                        : 'white',
                    }}
                    title={this.state.languageService.get('agree_terms')}
                    checked={this.state.checked}
                    onPress={() =>
                      this.setState({
                        checked: !this.state.checked,
                        isValidAgreeTerm: true,
                      })
                    }
                    checkedColor={'#3f4194'}
                  />
                </View>
              </View>
              <ScButton
                onClick={this.onRegister.bind(this)}
                text={this.state.languageService.get('register')}
              />
            </View>
          </Fragment>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

}