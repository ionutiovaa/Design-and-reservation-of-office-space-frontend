import { createAppContainer } from 'react-navigation';
import React, { Component } from 'react';

import LoginView from '../components/login/LoginView';
import RegisterView from '../components/register/RegisterView';
import leftDrawer from './LeftDrawer';
import BookView from '../components/book-view/BookView'

const reactNavigation = require('react-navigation-stack');

const MainNavigator = reactNavigation.createStackNavigator(
    {
        LeftDrawer: {
            screen: leftDrawer,
            navigationOptions: {
                headerShown: false,
            },
        },

        Login: {
            screen: LoginView,
            navigationOptions: {
                headerShown: false,

            },

        },

        Register: {
            screen: RegisterView,
            navigationOptions: {
                headerTitle: '',
                headerStyle: {
                    backgroundColor: '#3f4194',
                },
                headerTintColor: 'black',
            },

        },

        BookView: { screen: BookView }
    },
    {
        initialRouteName: 'Login',
        swipeEnabled: false,
    },
);

const MainRoute = createAppContainer(MainNavigator);
export default MainRoute;