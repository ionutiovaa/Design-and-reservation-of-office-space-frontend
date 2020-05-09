import {createAppContainer} from 'react-navigation';

import LoginView from '../components/login/LoginView';
import MainView from '../components/main-view/MainView';
import RegisterView from '../components/register/RegisterView';

const reactNavigation = require('react-navigation-stack');
const MainNavigator = reactNavigation.createStackNavigator(
    {
        Login: {screen: LoginView},
        MainView: {screen: MainView},
        Register: {screen: RegisterView},
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        swipeEnabled: false,
    },
);

const MainRoute = createAppContainer(MainNavigator);
export default MainRoute;