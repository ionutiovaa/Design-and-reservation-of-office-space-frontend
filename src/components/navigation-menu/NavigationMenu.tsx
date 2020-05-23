import React from 'react';
import { Image } from 'react-native';
import {Content, List, Container, Left, Text, View, Drawer } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableNativeFeedback} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import DrawerItem from './DrawerItem';
import styles from './styles/NavMenuStyle';
import LanguageService from '../../services/LanguageService';
import {IUser} from '../../data-models/User';

interface IStateNavigationMenu {
    user: IUser;
    languageService: LanguageService;
    isAdmin: boolean;
  }
  
  interface IPropsNavMenu {
    navigation: any;
  }
  
  export default class NavigationMenu extends React.Component<
    IPropsNavMenu,
    IStateNavigationMenu
  > {
    constructor(props: IPropsNavMenu) {
      super(props);
      this.state = {
        user: Object(null),
        languageService: new LanguageService(),
        isAdmin: true,
      };
    }

    
  
    async componentDidMount() {

      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
          stores.map((result, i, store) => {
            console.log({ [store[i][0]]: store[i][1] });
            return true;
          });
        });
      });
      const jsonUser = await AsyncStorage.getItem('logged_user');
      if (jsonUser != null) {
        const user: IUser = JSON.parse(jsonUser) as IUser;
        if (user != null && user.id) {
          this.setState({
            user: user,
          });
        }
      }
      this.setAdmin();
    }

    private setAdmin(){
      
      if (this.isAdministrator()){
        this.setState({
          isAdmin: true,
        });
      }   
      else{
        this.setState({
          isAdmin: false,
        })
      }
    }
  
    private async clearStoredData() {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('logged_user');
      await AsyncStorage.removeItem('userType');
    }
  
    private logout() {
      this.clearStoredData();
      this.props.navigation.navigate('Login');
    }

    private navigateToMainView() {
      this.props.navigation.navigate('MainView');
    }

    private navigateToAccountView() {
        this.props.navigation.navigate('AccountView');
    }

    private navigateToChangePasswordView(){
        this.props.navigation.navigate('ChangePasswordView');
    }

    private navigateToMapView(){
      this.props.navigation.navigate('MapView');
  }

    private async isAdministrator() {
      if (await AsyncStorage.getItem('userType') != "ADMINISTRATOR"){
        this.setState({
          isAdmin: false,
        })
      }
    }
    
  
      render() {
        return (
          <ScrollView style={styles.navDrawBg}>
            <Container style={styles.navDrawBg}>
              <View style={{alignItems: 'center'}}>
                <View style={styles.headerNavMenu}>
                  <Text style={[styles.titleNavMenu, styles.textFormat]}>
                    DESKS AT JOB
                  </Text>
                </View>
                <Text style={[styles.textFormat]}>
                  {this.state.user.firstName} {this.state.user.lastName}
                </Text>
              </View>
              <View style={[styles.lineStyle, styles.itemOpacity]} />
              <Content style={{marginTop: 12}}>
                <List>
                <View style={styles.navMenuButton}>
                  <Feather
                    style={styles.itemOpacity}
                    color={'white'}
                    size={22}
                    name = {this.state.isAdmin ? 'layers' : 'map'}
                  />
                <DrawerItem
                  sectionItemText={this.state.languageService.get('activities')}
                  onClick={()=>this.navigateToMapView()}
                />
                </View>
                <View style={styles.navMenuButton}>
                <Feather
                    style={styles.itemOpacity}
                    color={'white'}
                    size={22}
                    name = {'camera'}
                  />
                <DrawerItem
                  sectionItemText={this.state.languageService.get('scan')}
                  iconName={'settings'}
                  onClick={()=>this.navigateToMainView()}
                />
                </View>
                <View style={styles.navMenuButton}>
                  <Feather
                    style={styles.itemOpacity}
                    color={'white'}
                    size={22}
                    name={'key'}
                  />
                <DrawerItem
                  sectionItemText={this.state.languageService.get('chpass')}
                  onClick={()=>this.navigateToChangePasswordView()}
                />
                </View>
                <View style={styles.navMenuButton}>
                  <Feather
                    style={styles.itemOpacity}
                    color={'white'}
                    size={22}
                    name={'user'}
                  />
                <DrawerItem
                  sectionItemText={this.state.languageService.get('myAccount')}
                  onClick={()=>this.navigateToAccountView()}
                />
                </View>
                </List>
              </Content>
              <View style={[styles.lineStyle, styles.itemOpacity]} />
              <TouchableNativeFeedback
                onPress={this.logout.bind(this)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View
                  style={[
                    styles.navMenuButton,
                    styles.navDrawBg,
                    {marginLeft: 10, marginBottom: 0},
                  ]}>
                  <Feather
                    style={styles.itemOpacity}
                    color={'white'}
                    size={18}
                    name={'log-out'}
                  />
                  <Left style={{marginLeft: 10}}>
                    <Text style={[styles.navMenuButtonText, styles.textFormat]}>
                      {this.state.languageService.get('logout')}
                    </Text>
                  </Left>
                </View>
              </TouchableNativeFeedback>
            </Container>
          </ScrollView>
        );
      }
  }
  