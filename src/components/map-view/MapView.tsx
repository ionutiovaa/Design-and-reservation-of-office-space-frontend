import * as React from 'react';
import {AppRegistry, Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, Linking, TouchableHighlight} from 'react-native';
import {Container, View, Text} from 'native-base';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import LanguageService from '../../services/LanguageService';
import {Language} from '../../data-models/Language';
import styles from '../map-view/MapViewStyle';
import { Button } from '@material-ui/core';

interface IStateMapView{
    languageService: LanguageService;
    currentLanguage: Language;
}

export default class MapView extends React.Component<any, IStateMapView>{
    constructor(props: any) {
        super(props);
      }

      private onCell(coords: Array<number>){
        console.log(coords[0], coords[1]);
      }

      render(){

        const rows = 10;
        const columns = 10;
        const mymap = [];

        for (let i = 0; i<rows; i++) {
            let row = [];

            for (let j = 0; j<columns; j++) {
                row.push({
                    text: ''+ i + j,
                    coords: [i, j],
                  })}

            mymap.push(row);
  }

        return(
            // <Container>
            // <CustomHeader navigation={this.props.navigation} titleText="home">
            //   <View style={styles.customHeader}></View>
            // </CustomHeader>
            
            //   <KeyboardAvoidingView>
            //     <React.Fragment>
                  
                <View style={{ flexDirection: 'row', flex: 1}}>
                    {true && (<View>
            <Text>sf</Text>
            </View>)}
      {mymap.map(row => (
        <View style={{ display: 'flex', flex: 1 }}>
          {row.map(cell => (
            <TouchableHighlight onPress={this.onCell.bind(this, cell.coords)} style={{ flex: 1,  backgroundColor: 'red' , borderStyle: 'solid', borderColor: 'black', borderWidth: 1.0}}>
              <Text>{cell.text}</Text>
            </TouchableHighlight>
          ))}
        </View>
      ))}
    </View>
                  
        //         </React.Fragment>
        //       </KeyboardAvoidingView>
            
        //   </Container>
        );
      }
}

AppRegistry.registerComponent('MapView', () => MapView);
