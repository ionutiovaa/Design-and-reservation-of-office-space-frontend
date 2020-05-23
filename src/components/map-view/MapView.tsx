import * as React from 'react';
import {AppRegistry, Button,  Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Container, View, Text} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import LanguageService from '../../services/LanguageService';
import styles from '../map-view/MapViewStyle';
import Modal from 'react-native-modal';

interface IStateMapView{
    languageService: LanguageService,
    modalVisible: boolean,
    rows: number,
    columns: number,
}

export default class MapView extends React.Component<any, IStateMapView>{
    constructor(props: any) {
        super(props);
        this.state={
          languageService: new LanguageService(),
          modalVisible: false,
          rows: 10,
          columns: 10,
        }
      }

      toggleModal = () => {
        this.setState({modalVisible: !this.state.modalVisible});
      };

      private onYes(){
        this.toggleModal();
        this.props.navigation.navigate('BookView');
      }

      private onCell(coords: Array<number>){
        console.log(coords[0], coords[1]);
        this.toggleModal();
      }

      private onFloorUp(){
        console.log("UP");
      }

      private onFloorDown(){
        console.log("DOWN");
      }

      private onAddRow(){
        this.setState({
          rows: this.state.rows + 1
        })
      }

      render(){

        //const rows = 10;
        //const columns = 10;
        const mymap = [];

        //for (let i = 0; i<rows; i++) {
          for (let i = 0; i<this.state.rows; i++) {
            let row = [];

            //for (let j = 0; j<columns; j++) {
              for (let j = 0; j<this.state.columns; j++) {
                row.push({
                    text: ''+ j + i,
                    coords: [j, i],
                  })}

            mymap.push(row);
  }

        return(
          
          <Container>
          <CustomHeader navigation={this.props.navigation} titleText="home">
            <View style={styles.customHeader}></View>
          </CustomHeader>
          
            <React.Fragment>
              
            
            <Modal
                  animationIn={'slideInLeft'}
                  animationOut={'slideOutRight'}
                  isVisible={this.state.modalVisible}>
                  
                  <View style={{flex: 1, maxHeight: 180, backgroundColor: 'white'}}>
                  <Text style={styles.title}>{this.state.languageService.get('sureReserve')}</Text>
                    <View style={{flexDirection: 'row', flex: 10}}>
                    <View style = {styles.yesButton}>
                      <Button title={this.state.languageService.get('yes')} onPress={this.onYes.bind(this)} />
                    </View>
                    <View style={styles.noButton}>
                    <Button title={this.state.languageService.get('no')} onPress={this.toggleModal} />
                    </View>
                    </View>
                  </View>
                
                  </Modal>
                  
            
                <Text style={styles.title}>{this.state.languageService.get('plan')}</Text>
                <Feather
                    style={styles.floorUp}
                    color={'blue'}
                    onPress={this.onFloorUp.bind(this)}
                    size={22}
                    name={'chevron-up'}
                    //name={'corner-right-up'}
                  />
                  
                <View style={{ flexDirection: 'row', flex: 1, maxHeight: 350, marginTop: 20, marginRight: 38 }}>
                    
      {mymap.map(row => (
        <View style={{ display: 'flex', flex: 1 }}>
          {row.map(cell => (
            <TouchableHighlight onPress={this.onCell.bind(this, cell.coords)} style={{ flex: 1,  backgroundColor: 'red' , borderStyle: 'solid', borderColor: 'black', borderWidth: 1.0}}>
              <Text>{cell.text}</Text>
            </TouchableHighlight>
          ))}
        </View>
      ))}
      <Feather
                    
                    color={'blue'}
                    onPress={this.onAddRow.bind(this)}
                    size={22}
                    name={'plus'}
                    //name={'corner-right-up'}
                  />
    </View>
    
    <Feather
                    style={styles.floorDown}
                    color={'blue'}
                    onPress={this.onFloorDown.bind(this)}
                    size={22}
                    name={'chevron-down'}
                    //name={'corner-right-down'}
                  />
                  <View style={{marginTop: 22}}>
                  
                  <View style={{marginTop: 200}}>
                  
              </View>
                
                </View>
                
                
                
                
    </React.Fragment>
            
          
        </Container>
        );
      }
}

AppRegistry.registerComponent('MapView', () => MapView);
