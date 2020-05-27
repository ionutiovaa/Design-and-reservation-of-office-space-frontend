import * as React from 'react';
import { AppRegistry, Button, Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Container, View, Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import LanguageService from '../../services/LanguageService';
import styles from '../map-view/MapViewStyle';
import Modal from 'react-native-modal';
import FloorService from '../../services/FloorService';

interface IStateMapView {
  languageService: LanguageService,
  modalVisible: boolean,
  rows: number,
  columns: number,
  floorsCount: number,
  currentFloor: number,
  position: string,
}

export default class MapView extends React.Component<any, IStateMapView>{
  constructor(props: any) {
    super(props);
    this.state = {
      languageService: new LanguageService(),
      modalVisible: false,
      rows: 0,
      columns: 0,
      floorsCount: 0,
      currentFloor: 1,
      position: "",
    }
  }

  async componentDidMount() {
    FloorService.getDimensions().then(async (dim: string) => {
      var dimenstions = dim.split(":");
      var r = +dimenstions[0];
      var c = +dimenstions[1];
      this.setState({
        rows: r,
        columns: c
      });
    });

    FloorService.getFloorsCount().then(async (count: number) => {
      this.setState({
        floorsCount: count
      })
    });
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  private onYes() {
    this.toggleModal();
    this.props.navigation.navigate('BookView', { position: this.state.position });
  }

  private onCell(coords: Array<number>) {
    this.setState({
      position: this.state.currentFloor.toString() + ":" + coords[0].toString() + ":" + coords[1].toString(),
    })
    this.toggleModal();
  }

  private onFloorUp() {
    if (this.state.currentFloor < this.state.floorsCount) {
      this.setState({
        currentFloor: this.state.currentFloor + 1
      });
    }
  }

  private onFloorDown() {
    if (this.state.currentFloor > 1) {
      this.setState({
        currentFloor: this.state.currentFloor - 1
      });
    }
  }

  private onAddRow() {
    this.setState({
      rows: this.state.rows + 1
    });
    FloorService.updateDimensions("row:plus");
  }

  private onRemoveRow() {
    this.setState({
      rows: this.state.rows - 1
    });
    FloorService.updateDimensions("row:minus");
  }

  private onAddColumn() {
    this.setState({
      columns: this.state.columns + 1
    });
    FloorService.updateDimensions("column:plus");
  }

  private onRemoveColumn() {
    this.setState({
      columns: this.state.columns - 1
    });
    FloorService.updateDimensions("column:minus");
  }

  private addFloor() {
    this.setState({
      floorsCount: this.state.floorsCount + 1
    });
    FloorService.addFloor();
  }

  private onDesk() {
    console.log("desk");
  }



  render() {

    //const rows = 10;
    //const columns = 10;
    const mymap = [];

    //for (let i = 0; i<rows; i++) {
    for (let i = 0; i < this.state.rows; i++) {
      let row = [];

      //for (let j = 0; j<columns; j++) {
      for (let j = 0; j < this.state.columns; j++) {
        row.push({
          text: '' + j + i,
          coords: [j, i],
        })
      }

      mymap.push(row);
    }

    return (

      <Container>
        <CustomHeader navigation={this.props.navigation} titleText="home">
          <View style={styles.customHeader}></View>
        </CustomHeader>

        <React.Fragment>


          <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutRight'}
            isVisible={this.state.modalVisible}>

            <View style={{ flex: 1, maxHeight: 180, backgroundColor: 'white' }}>
              <Text style={styles.title}>{this.state.languageService.get('sureReserve')}</Text>
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


          <Text style={styles.title}>{this.state.languageService.get('plan')}</Text>
          <View style={{ alignContent: 'space-around', alignItems: 'center', marginTop: 14 }}>
            <Button title={this.state.languageService.get('addFloor')} onPress={this.addFloor.bind(this)}></Button>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View>
              <Feather

                style={[styles.floorUp, this.state.currentFloor == this.state.floorsCount ? { opacity: 0.3 } : { opacity: 1 }]}
                color={'blue'}
                onPress={this.onFloorUp.bind(this)}
                size={22}
                //name={'chevron-up'}
                name={'corner-right-up'}
              />
            </View>
            <Feather
              style={{ height: 24, marginTop: 13, marginLeft: 40, marginRight: 5 }}
              color={'blue'}
              onPress={this.onRemoveRow.bind(this)}
              size={22}
              name={'minus'}
            />
            <Feather
              style={{ marginTop: 13, marginLeft: 10 }}
              color={'blue'}
              onPress={this.onAddRow.bind(this)}
              size={22}
              name={'plus'}
            />
          </View>

          <View style={{ flexDirection: 'row', flex: 1, maxHeight: 310, marginTop: 8, marginRight: 14, marginLeft: 25 }}>

            {mymap.map(row => (
              <View style={{ display: 'flex', flex: 1 }}>
                {row.map(cell => (
                  <TouchableHighlight onPress={this.onCell.bind(this, cell.coords)} style={{ flex: 1, backgroundColor: 'red', borderStyle: 'solid', borderColor: 'black', borderWidth: 1.0 }}>
                    <Text>{cell.text}</Text>
                  </TouchableHighlight>
                ))}
              </View>
            ))}
            <View>
              <Feather
                color={'blue'}
                onPress={this.onAddColumn.bind(this)}
                size={22}
                name={'plus'}
              />
              <Feather
                style={{ marginTop: 13 }}
                color={'blue'}
                onPress={this.onRemoveColumn.bind(this)}
                size={22}
                name={'minus'}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Feather
              style={[styles.floorDown, this.state.currentFloor == 1 ? { opacity: 0.3 } : { opacity: 1 }]}
              color={'blue'}
              onPress={this.onFloorDown.bind(this)}
              size={22}
              //  name={'chevron-down'}
              name={'corner-right-down'}
            />
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 50 }}>
              <Text style={{ textDecorationLine: 'underline' }}>{this.state.currentFloor == 1 ? "1st floor" : this.state.currentFloor + "nd floor"}</Text>
            </View>
          </View>
          <View style={{ marginTop: 10, backgroundColor: 'green', marginLeft: 25 }}>

            <TouchableHighlight style={{ backgroundColor: 'red', width: 34, height: 34 }} onPress={this.onDesk.bind(this)}>
              <Text>desk</Text>
            </TouchableHighlight>


          </View>




        </React.Fragment>


      </Container>
    );
  }
}

AppRegistry.registerComponent('MapView', () => MapView);
