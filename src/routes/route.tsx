import {createAppContainer} from 'react-navigation';

import LoginView from '../components/login/LoginView';
import MainView from '../components/main-view/MainView';
import RegisterView from '../components/register/RegisterView';
import leftDrawer from './LeftDrawer';
import AccountView from '../components/account/AccountView';
import MapView from 'react-native-maps';
import BookView from '../components/book-view/BookView';

const reactNavigation = require('react-navigation-stack');
const MainNavigator = reactNavigation.createStackNavigator(
    {
        LeftDrawer: {screen: leftDrawer},
        Login: {screen: LoginView},
        //MainView: {screen: MainView},
        Register: {screen: RegisterView},
        //MapView: {screen: MapView}
        //Account: {screen: AccountView},
        BookView: {screen: BookView}
        
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        swipeEnabled: false,
    },
);

const MainRoute = createAppContainer(MainNavigator);
export default MainRoute;