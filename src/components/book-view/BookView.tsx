import * as React from 'react';
import {AppRegistry, Button,  Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Container, View, Text} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import LanguageService from '../../services/LanguageService';
import styles from '../book-view/BookViewStyle';
import Modal from 'react-native-modal';

interface IStateBookView{
    languageService: LanguageService,
    modalVisible: boolean,
}

export default class BookView extends React.Component<any, IStateBookView>{
    constructor(props: any) {
        super(props);
        this.state={
          languageService: new LanguageService(),
          modalVisible: false,
        }
    }

    toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
    };

    render(){
        return(
          
          <Container>
          <CustomHeader navigation={this.props.navigation} titleText="home">
            <View style={styles.customHeader}></View>
          </CustomHeader>
          
            <React.Fragment>
              
            
            </React.Fragment>
            
          
        </Container>
        );
      }
}

AppRegistry.registerComponent('BookView', () => BookView);