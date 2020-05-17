import React, {Fragment} from 'react';
import {Text, View, KeyboardAvoidingView} from 'react-native';
import {AxiosError} from 'axios';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';

import ScButton from '../sc-button/ScButton';
import ScTextInput from '../sc-text-input/ScTextInput';
import ScPicker from '../sc-picker/ScPicker';
import ServEchipe from '../../services/RegisterService';
import {CheckBox} from 'react-native-elements';
import {IUser} from '../../data-models/User';
import UserService from '../../services/UserService';
import LanguageService from '../../services/LanguageService';
import {UserType} from '../../data-models/UserType';
import {ScrollView} from 'react-native-gesture-handler';
import UserToEchipa from '../../data-models/UserToEchipa';
import styles from './RegisterStyles';
import IRole from '../../data-models/Role';
import AuthenticateService from '../../services/AuthenticateService';

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
    //echipa: string;
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
    //echipe: UserToEchipa[];
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
          //role: this.state.languageService.get('role'),
          userType: null,
          //echipa: '',
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
          //echipe: [],
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

        if (this.state.username.length == 0){
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
        // ServEchipe.getEchipe().then((items: UserToEchipa[]) => {
        //   //items.unshift(this.state.languageService.get('later'));
        //   const later: UserToEchipa = {
        //     username: "",
        //     numeEchipe: this.state.languageService.get('later'),
        //   }
        //   items.unshift(later);
        //   console.log(items);
        //   this.setState({
        //     echipe: items,
        //   });
        // });
        let rolesItems = [];
        for (let type in UserType){
          rolesItems.push(this.state.languageService.get(type));
        }
        this.setState({
          roles: rolesItems,
        })
      }

      private onRegister() {
        //if (!this.checkInputData()) return;
    
        this.setState({
          isLoading: true,
        });

        // let userRole: UserType = null;
        // console.log(this.state.userType);
        // console.log(this.state.languageService.get('employee'));
        // if (this.state.userType == this.state.languageService.get('employee')){
        //   this.setState({userType: UserType.ANGAJAT});
        // }
        // else if (this.state.userType == this.state.languageService.get('manager')){
        //   this.setState({userType: UserType.MANAGER});
        // }
        // else if (this.state.userType == this.state.languageService.get('administrator')){
        //   this.setState({userType: UserType.ADMINISTRATOR});
        // }
        //this.setState({userType: userRole});
        let typeFinal: UserType = null;
        if (this.state.userType === null){
          // this.setState({
          //   userType: UserType.ANGAJAT,
          // })
          typeFinal = UserType.ANGAJAT;
        }
        else{
          for (let type in UserType){
            if (this.state.userType == this.state.languageService.get(type)){
              typeFinal = UserType[type];
              // this.setState({
              //   userType: UserType[type]
              // })
            }
          }
        }
        var type: string = UserType[typeFinal];
        //AsyncStorage.setItem('userType', type);

        const user: IUser = {
          //username: this.state.email.split('@')[0],
          firstName: this.state.firstname,
          lastName: this.state.lastname,
          email: this.state.email,
          username: this.state.username,
          password: '',
          mobileNumber: this.state.mobileNumber,
          //userType: this.state.userType,
          userType: typeFinal,
          //echipe: this.state.echipe,
          token: '',
        };
        console.log(this.state.userType);
        // sha256(this.state.password).then((hash: string) => {
        user.password = this.state.password;
        // user.password = hash;
        // });
        UserService.insert(user)
          .then((newUser: IUser) => {
            this.showSnackBarMessage(
              this.state.languageService.get('succes_create_account'),
            );
            this.setState({
              isLoading: false,
            });
            this.props.navigation.navigate('MainView', {
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
                <View style={styles.sgRegisterView}>
                  <Text style={styles.sgTitleText}>
                    {this.state.languageService.get('register_form')}
                  </Text>
                  <View style={styles.sgFormView}>
                    <ScTextInput
                      value={this.state.lastname}
                      placeHolder={this.state.languageService.get('l_name')}
                      //icon={'person'}
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
                      //icon={'person'}
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
                      //icon={'phone'}
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
                      //icon={'mail'}
                      keyboardType={'email-address'}
                      bgColor={!this.state.isValidEmail ? '#FAAABA' : ''}
                      onChangeText={newEmail =>
                        this.setState({email: newEmail, isValidEmail: true})
                      }
                    />
                    <ScTextInput
                      value={this.state.username}
                      placeHolder={this.state.languageService.get('username')}
                      //icon={'mail'}
                      keyboardType={'email-address'}
                      bgColor={!this.state.isValidUsername ? '#FAAABA' : ''}
                      onChangeText={newUsername =>
                        this.setState({username: newUsername, isValidUsername: true})
                      }
                    />
                    <ScTextInput
                      value={this.state.password}
                      placeHolder={this.state.languageService.get('password')}
                      //icon={'lock'}
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
                      //icon={'lock'}
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
                      {/* <View>
                        <Text style={styles.sgText}>
                          {this.state.languageService.get('team')}
                        </Text>
                        <ScPicker
                          selectedValue={this.state.echipa}
                          pickerItems={this.state.echipe.map(item =>
                            item.toString(),
                          )}
                          onChangeValue={newEchipa =>
                            this.setState({echipa: newEchipa})
                          }
                        />
                      </View> */}
                      <View>
                        <Text style={styles.sgText}>
                          {this.state.languageService.get('role')}
                        </Text>
                        <ScPicker
                          selectedValue={this.state.userType}
                          pickerItems={this.state.roles}
                          onChangeValue={newRole =>
                            this.setState({userType: newRole})
                          }
                        />
                      </View>
                    </View>
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
                      checkedColor={'#3c4245'}
                    />
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