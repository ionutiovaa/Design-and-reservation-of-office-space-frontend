import * as React from 'react';
import { AppRegistry, KeyboardAvoidingView, Button, Image, Dimensions, Alert } from 'react-native';
import { Container, View, Text } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import { AxiosError } from 'axios';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import styles from './AccountStyles';
import { IUser } from '../../data-models/User';
import LanguageService from '../../services/LanguageService';
import Modal from 'react-native-modal';
import UserService from '../../services/UserService';
import DelButton from '../sc-button/DelButton';
import ScTextInput from '../sc-text-input/ScTextInput';


interface IAccountState {
  user: IUser;
  languageService: LanguageService;
  userType: string;
  isOpenModal: boolean;
  loading: boolean;
  success: boolean;
  modalVisible: boolean;
}

export default class AccountView extends React.Component<any, IAccountState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: Object(null),
      modalVisible: false,
      languageService: new LanguageService(),
      userType: "",
      isOpenModal: false,
      loading: false,
      success: false,
    }
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  private onYes() {
    this.toggleModal();
    this.deleteUser();
  }

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
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('logged_user');
      await AsyncStorage.removeItem('userType');
      this.showSnackBarMessage(this.state.languageService.get('deleted'));
      this.clearStoredData();
      Alert.alert(this.state.languageService.get('successfull_deleted'));
      this.props.navigation.navigate('Login');
    })
      .catch((err: AxiosError) => {
        this.showSnackBarMessage(err.message);
      });
    this.toggleModal();
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
            <React.Fragment>
              <Modal
                animationIn={'slideInUp'}
                animationOut={'slideOutRight'}
                isVisible={this.state.modalVisible}>
                <View style={{ flex: 1, maxHeight: 180, backgroundColor: 'white' }}>
                  <Text style={styles.title}>{this.state.languageService.get('sureDelete')}</Text>
                  <View style={{ flexDirection: 'row', flex: 10 }}>
                    <View style={styles.yesButton}>
                      <Button title={this.state.languageService.get('yes')} onPress={this.onYes.bind(this)} />
                    </View>
                    <View style={styles.noButton}>
                      <Button title={this.state.languageService.get('no')} onPress={this.toggleModal} />
                    </View>
                  </View>
                </View>

              </Modal>
              <Image style={{ marginTop: -50, resizeMode: 'cover', width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }} source={require('../../assets/background.jpeg')}></Image>
              <View style={styles.acFormView}>
                <ScTextInput
                  placeHolder={this.state.languageService.get('l_name')}
                  icon={'person'}
                  value={this.state.languageService.get('l_name') + ": " + this.state.user.lastName}
                  editable={false}
                />
                <ScTextInput
                  placeHolder={this.state.languageService.get('f_name')}
                  icon={'person'}
                  value={this.state.languageService.get('f_name') + ": " + this.state.user.firstName}
                  editable={false}
                />
                <ScTextInput
                  placeHolder={this.state.languageService.get('email')}
                  icon={'mail'}
                  value={this.state.languageService.get('email') + ": " + this.state.user.email}
                  editable={false}
                />
                <ScTextInput
                  placeHolder={this.state.languageService.get('phone')}
                  icon={'phone'}
                  value={this.state.languageService.get('phone') + ": " + this.state.user.mobileNumber}
                  editable={false}
                />
                <ScTextInput
                  placeHolder={this.state.languageService.get('userType')}
                  icon={'loyalty'}
                  value={this.state.languageService.get('userType') + ": " + this.state.user.userType}
                  editable={false}
                />

              </View>
            </React.Fragment>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.bottom}>
          <DelButton
            text={this.state.languageService.get('delete_account')}
            onClick={this.toggleModal.bind(this)}
          />
        </View>
      </Container>
    );
  }
}

AppRegistry.registerComponent('AccountView', () => AccountView);