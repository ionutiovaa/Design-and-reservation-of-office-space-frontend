import React from 'react';
import { Dimensions } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import AccountView from '../components/account/AccountView';
import MainView from '../components/main-view/MainView';
import MapView from '../components/map-view/MapView';

import NavigationMenu from '../components/navigation-menu/NavigationMenu';
import ChangePassword from '../components/change-password/ChangePassword';
import BookView from '../components/book-view/BookView';

const reactNavigation = require('react-navigation-drawer');
const WIDTH = Dimensions.get('window').width;
const token = AsyncStorage.getItem('token');
const leftDrawer = reactNavigation.createDrawerNavigator(
    {
        MapView: { screen: MapView },
        MainView: { screen: MainView },
        AccountView: { screen: AccountView },
        ChangePasswordView: { screen: ChangePassword },
        BookView: { screen: BookView }
    },
    {
        initialRouteName: 'MapView',
        drawerWidth: WIDTH * 0.7,
        drawerPosition: 'left',
        drawerType: 'back',
        contentComponent: (props: any) => <NavigationMenu {...props} />,
        drawerOpenRoute: 'LeftSideMenu',
        drawerCloseRoute: 'LeftSideMenuClose',
        drawerToggleRoute: 'LeftSideMenuToggle',
    },
);

export default leftDrawer;