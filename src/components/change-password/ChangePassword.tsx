import React, {Fragment} from 'react';
import {View, Container, Text} from 'native-base';
import {ScrollView, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {IUser} from '../../data-models/User';
import LanguageService from '../../services/LanguageService';
import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import styles from '../register/RegisterStyles';
import ScTextInput from '../sc-text-input/ScTextInput';
import ScButton from '../sc-button/ScButton';
import Snackbar from 'react-native-snackbar';
import UserService from '../../services/UserService';
import IChangePassword from '../../data-models/ChangePassword';
import {AxiosError} from 'axios';

interface IStateChangePassword {
    firstname: string;
    lastname: string;
    email: string;
    oldPassword: string;
    newPassword: string;
    newSecondPassword: string;
    isLoading: boolean;
    isValidOldPassword: boolean;
    isValidNewPassword: boolean;
    languageService: LanguageService;
    user: IUser;
  }

  export default class ChangePassword extends React.Component<any, IStateChangePassword> {
    constructor(props: any) {
        super(props);
        this.state = {
          isLoading: false,
          languageService: new LanguageService(),
          firstname: '',
          lastname: '',
          email: '',
          oldPassword: '',
          newPassword: '',
          newSecondPassword: '',
          isValidOldPassword: true,
          isValidNewPassword: true,
          user: Object(null),
        };
      }

      async componentDidMount() {
        this.setState({
          isLoading: true,
        });
        let user: IUser = Object(null);
        const jsonUser = await AsyncStorage.getItem('logged_user');
        if (jsonUser != null) {
          user = JSON.parse(jsonUser) as IUser;
        }
        this.setState({
          isLoading: false,
          user: user,
          lastname: user.lastName,
          firstname: user.firstName,
          email: user.email,
        });
      }

      private onChangePassowrd(): void {
        if (!this.checkInputData()) return;
        // sha256(this.state.newPassword).then((newHashPassword: string) => {
        //   sha256(this.state.oldPassword).then((oldHashPassword: string) => {
        if (this.state.user.id != null) {
          this.setState({
            isLoading: true,
          });
          const changePassowrd: IChangePassword = {
            userId: this.state.user.id,
            newPassword: this.state.newPassword,
            //newPassword: newHashPassword,
            // oldPassword: oldHashPassword,
            oldPassword: this.state.oldPassword,
          };
          UserService.changePassowrd(changePassowrd)
            .then(async (user: IUser) => {
              await AsyncStorage.setItem('logged_user', JSON.stringify(user));
              this.setState({
                user: user,
                isLoading: false,
              });
              this.showSnackBarMessage('Password was changed!');
            })
            .catch((err: AxiosError) => {
              this.setState({
                isLoading: false,
              });
              this.showSnackBarMessage(err.message);
            });
        } else {
          this.showSnackBarMessage(this.state.languageService.get('general_error'));
        }
      }

      private checkInputData(): boolean {
        let isNotError = true;
    
        if (
          this.state.newSecondPassword.length == 0 ||
          this.state.newPassword.length == 0
        ) {
          this.setState({
            isValidNewPassword: false,
          });
          isNotError = false;
        }
        if (this.state.oldPassword.length == 0) {
          this.setState({
            isValidOldPassword: false,
          });
          isNotError = false;
        }
        if (!isNotError) {
          this.showSnackBarMessage(
            this.state.languageService.get('incomplete_data'),
          );
          return isNotError;
        }
    
        if (this.state.newPassword !== this.state.newSecondPassword) {
          this.showSnackBarMessage(
            this.state.languageService.get('invalid_password'),
          );
          this.setState({
            isValidNewPassword: false,
          });
          return false;
        }
    
        return true;
      }

      private showSnackBarMessage(message: string) {
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_LONG,
        });
      }

      render() {
        return (
          <Container>
            <CustomHeader navigation={this.props.navigation} titleText="home">
              <View style={styles.customHeader}></View>
            </CustomHeader>
            <ScrollView>
              <KeyboardAvoidingView>
                <Fragment>
                  {this.state.isLoading === true}
                  <View style={styles.sgRegisterView}>
                    <Text style={styles.sgTitleText}>
                      {this.state.languageService.get('change_password_form')}
                    </Text>
                    <View style={styles.sgFormView}>
                      <ScTextInput
                        placeHolder={this.state.languageService.get('l_name')}
                        icon={'person'}
                        value={this.state.lastname}
                        editable={false}
                      />
                      <ScTextInput
                        placeHolder={this.state.languageService.get('f_name')}
                        icon={'person'}
                        value={this.state.firstname}
                        editable={false}
                      />
    
                      <ScTextInput
                        placeHolder={this.state.languageService.get('email')}
                        icon={'mail'}
                        keyboardType={'email-address'}
                        value={this.state.email}
                        editable={false}
                      />
                      <ScTextInput
                        value={this.state.oldPassword}
                        placeHolder={this.state.languageService.get('old_password')}
                        icon={'lock'}
                        secureTextEntry={true}
                        bgColor={!this.state.isValidOldPassword ? '#FAAABA' : ''}
                        onChangeText={oldPasswod =>
                          this.setState({
                            oldPassword: oldPasswod,
                            isValidOldPassword: true,
                          })
                        }
                      />
                      <ScTextInput
                        value={this.state.newPassword}
                        placeHolder={this.state.languageService.get('new_password')}
                        icon={'lock'}
                        secureTextEntry={true}
                        bgColor={!this.state.isValidNewPassword ? '#FAAABA' : ''}
                        onChangeText={newPassword =>
                          this.setState({
                            newPassword: newPassword,
                            isValidNewPassword: true,
                          })
                        }
                      />
                      <ScTextInput
                        value={this.state.newSecondPassword}
                        placeHolder={this.state.languageService.get(
                          'conf_new_pass',
                        )}
                        icon={'lock'}
                        secureTextEntry={true}
                        bgColor={!this.state.isValidNewPassword ? '#FAAABA' : ''}
                        onChangeText={newSecondPassowrd =>
                          this.setState({
                            newSecondPassword: newSecondPassowrd,
                            isValidNewPassword: true,
                          })
                        }
                      />
                    </View>
                    <ScButton
                      onClick={this.onChangePassowrd.bind(this)}
                      text={this.state.languageService.get('change_password_form')}
                    />
                  </View>
                </Fragment>
              </KeyboardAvoidingView>
            </ScrollView>
          </Container>
        );
      }
  }