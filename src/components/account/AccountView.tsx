import * as React from 'react';
import {AppRegistry, KeyboardAvoidingView} from 'react-native';
import { Container, View, Text } from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import {AxiosError} from 'axios';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import styles from './AccountStyles';
import {IUser} from '../../data-models/User';
import LanguageService from '../../services/LanguageService';
import { Icon } from '@material-ui/core';
import Modal from './Modal'
import UserService from '../../services/UserService';
import DelButton from '../sc-button/DelButton';


interface IAccountState {
  user: IUser;
  languageService: LanguageService;
  userType: string;
  isOpenModal: boolean;
  loading: boolean;
  success: boolean;
}

export default class AccountView extends React.Component<any, IAccountState> {
    constructor(props: any) {
        super(props);
        this.state={
          user: Object(null),
          languageService: new LanguageService(),
          userType: "",
          isOpenModal: false,
          loading: false,
          success: false,
        }
      }

      toggleModal = () => {
        this.setState({
          isOpenModal: !this.state.isOpenModal,
        });
      };

      approveModal = () => {
        this.setState({loading: true });
        setTimeout(() => this.setState({ 
          loading: false,
          success: true 
        }), 1000)
        setTimeout(() => this.setState({ 
          isOpenModal: false 
        }), 3000)
      };

      async componentDidMount() {
        const jsonUser = await AsyncStorage.getItem('logged_user');
        if (jsonUser != null) {
          const user: IUser = JSON.parse(jsonUser) as IUser;
          if (user != null && user.id) {
            this.setState({
              user: user,
            });
          }
        }
        let type: string;
        type = await AsyncStorage.getItem('userType');
        type = type.toLowerCase();
        type = type.charAt(0).toUpperCase() + type.substring(1);
        this.setState({
          userType: type,
        })
      }

      private async clearStoredData() {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('logged_user');
        await AsyncStorage.removeItem('userType');
      }
      
      private deleteUser(): void {
        UserService.delete(this.state.user.id).then(async (user: IUser) => {
          this.showSnackBarMessage(this.state.languageService.get('deleted'));
          this.clearStoredData();
          this.props.navigation.navigate('Login');
        })
        .catch((err: AxiosError) => {
          this.showSnackBarMessage(err.message);
        });
      }

      private showSnackBarMessage(message: string) {
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_LONG,
        });
      }
    
      render() {
        const { loading, success } = this.state;
        return (
          <Container>
            <CustomHeader navigation={this.props.navigation} titleText="home">
              <View style={styles.customHeader}></View>
            </CustomHeader>
            <ScrollView>
              <KeyboardAvoidingView>
                <React.Fragment>
                  <View style={styles.acFormView}>
                    <Text style={styles.acMainText}>{this.state.languageService.get('l_name')}: {this.state.user.lastName}</Text>
                    <Text style={styles.acMainText}>{this.state.languageService.get('f_name')}: {this.state.user.firstName}</Text>
                    <Text style={styles.acMainText}>{this.state.languageService.get('email')}: {this.state.user.email}</Text>
                    <Text style={styles.acMainText}>{this.state.languageService.get('phone')}: {this.state.user.mobileNumber}</Text>
                    <Text style={styles.acMainText}>{this.state.languageService.get('userType')}: {this.state.userType}</Text>
                  </View>
                </React.Fragment>
              </KeyboardAvoidingView>
            </ScrollView>
            <View style={styles.bottom}>
                    <DelButton
                      text={this.state.languageService.get('delete_account')}
                      onClick={this.deleteUser.bind(this)}
                    />
                   </View>
          </Container>



          // <Container>
          //   <CustomHeader navigation={this.props.navigation} titleText="home">
          //     <React.Fragment>
          //       <View style={styles.acFormView}>
          //       <Text style={styles.acMainText}>{this.state.languageService.get('l_name')}: {this.state.user.lastName}</Text>
          //         <Text style={styles.acMainText}>{this.state.languageService.get('f_name')}: {this.state.user.firstName}</Text>
          //         <Text style={styles.acMainText}>{this.state.languageService.get('email')}: {this.state.user.email}</Text>
          //         <Text style={styles.acMainText}>{this.state.languageService.get('phone')}: {this.state.user.mobileNumber}</Text>
          //         <Text style={styles.acMainText}>{this.state.languageService.get('userType')}: {this.state.userType}</Text>
          //         <DelButton
          //           text={this.state.languageService.get('delete_account')}
          //           onClick={this.deleteUser.bind(this)}
          //         />
          //       </View>
              /* <View style={styles.formView}>
                <View style={styles.acFormView}>
                  <Text style={styles.acMainText}>{this.state.languageService.get('l_name')}: {this.state.user.lastName}</Text>
                  <Text style={styles.acMainText}>{this.state.languageService.get('f_name')}: {this.state.user.firstName}</Text>
                  <Text style={styles.acMainText}>{this.state.languageService.get('email')}: {this.state.user.email}</Text>
                  <Text style={styles.acMainText}>{this.state.languageService.get('phone')}: {this.state.user.mobileNumber}</Text>
                  <Text style={styles.acMainText}>{this.state.languageService.get('userType')}: {this.state.userType}</Text>
                </View> */
              // <View>
                  
                    /* <Modal show={this.state.isOpenModal} onApprove={this.approveModal} onClose={this.toggleModal}>
                      {loading && "Loading..."}
                      {success && "Success (make me green)"}
                      {!success && !loading && "Here's some text for the modal"}
                    </Modal> */
                // </View>
                /* </View> */
          //     </React.Fragment>
          //   </CustomHeader>
          // </Container>
        );
    }
}

AppRegistry.registerComponent('AccountView', () => AccountView);