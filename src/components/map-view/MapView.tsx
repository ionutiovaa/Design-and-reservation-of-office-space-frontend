import * as React from 'react';
import { AppRegistry, Button, TouchableHighlight, Image } from 'react-native';
import { Container, View, Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Snackbar from 'react-native-snackbar';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import LanguageService from '../../services/LanguageService';
import styles from '../map-view/MapViewStyle';
import Modal from 'react-native-modal';
import FloorService from '../../services/FloorService';
import { IUser } from '../../data-models/User';
import ILoc from '../../data-models/Loc';

interface IStateMapView {
  languageService: LanguageService,
  modalVisible: boolean,
  rows: number,
  columns: number,
  floorsCount: number,
  currentFloor: number,
  position: string,
  isAdmin: boolean;
  currentValue: number,
  places: ILoc[],
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
      isAdmin: true,
      currentValue: 0,
      places: []
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async refreshMap() {
    FloorService.getLocuriByEtaj(this.state.currentFloor).then((items: ILoc[]) => {
      this.setState({
        places: items
      });
    });
    await this.delay(200);
  }

  async componentDidMount() {
    this.isAdministrator();
    this.refreshMap();
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

  private async isAdministrator() {
    const jsonUser = await AsyncStorage.getItem('logged_user');
    const user: IUser = JSON.parse(jsonUser) as IUser;

    if (user.userType != "ADMINISTRATOR") {
      this.setState({
        isAdmin: false,
      })
    }
  }

  private onCellBook(coords: Array<number>) {
    this.setState({
      position: this.state.currentFloor + ":" + coords[0].toString() + ":" + coords[1].toString(),
    })
    this.toggleModal();
  }

  private async onCellAdd(coords: Array<number>) {
    this.setState({
      position: this.state.currentFloor.toString() + ":" + coords[0].toString() + ":" + coords[1].toString(),
    })
    await this.delay(200);
    const loc: ILoc = {
      pozitie: this.state.position,
      qrCode: "",
      value: this.state.currentValue
    };
    FloorService.addPlace(loc);
    await this.delay(200);
    this.componentDidMount();
    this.setState({ currentValue: 0 });
  }

  private async onFloorUp() {
    if (this.state.currentFloor < this.state.floorsCount) {
      this.setState({
        currentFloor: this.state.currentFloor + 1
      });
    }
    await this.delay(100);
    this.refreshMap();
  }

  private async onFloorDown() {
    if (this.state.currentFloor > 1) {
      this.setState({
        currentFloor: this.state.currentFloor - 1
      });
    }
    await this.delay(100);
    this.refreshMap();
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

  private async onAddFloor() {
    this.setState({
      floorsCount: this.state.floorsCount + 1,
    });
    this.setState({
      currentFloor: this.state.floorsCount + 1,
    })
    FloorService.addFloor();
  }

  private onDesk() {
    this.setState({
      currentValue: 1
    });
  }

  private onDoor() {
    this.setState({
      currentValue: 5
    });
  }

  private onWall() {
    this.setState({
      currentValue: 9
    });
  }

  private closeItem() {
    this.setState({
      currentValue: 0
    });
  }

  private onDeskRotate() {
    if (this.state.currentValue == 1) {
      this.setState({ currentValue: 2 });
    }
    else if (this.state.currentValue == 2) {
      this.setState({ currentValue: 3 });
    }
    else if (this.state.currentValue == 3) {
      this.setState({ currentValue: 4 });
    }
    else if (this.state.currentValue == 4) {
      this.setState({ currentValue: 1 });
    }
  }

  private onDoorRotate() {
    if (this.state.currentValue == 5) {
      this.setState({ currentValue: 6 });
    }
    else if (this.state.currentValue == 6) {
      this.setState({ currentValue: 7 });
    }
    else if (this.state.currentValue == 7) {
      this.setState({ currentValue: 8 });
    }
    else if (this.state.currentValue == 8) {
      this.setState({ currentValue: 5 });
    }
  }
  private onWallRotate() {
    if (this.state.currentValue == 9) {
      this.setState({ currentValue: 10 });
    }
    else if (this.state.currentValue == 10) {
      this.setState({ currentValue: 11 });
    }
    else if (this.state.currentValue == 11) {
      this.setState({ currentValue: 12 });
    }
    else if (this.state.currentValue == 12) {
      this.setState({ currentValue: 9 });
    }
  }

  private isDesk(): boolean {
    return this.state.currentValue == 1 || this.state.currentValue == 2 || this.state.currentValue == 3 || this.state.currentValue == 4
  }

  private isDoor(): boolean {
    return this.state.currentValue == 5 || this.state.currentValue == 6 || this.state.currentValue == 7 || this.state.currentValue == 8
  }

  private isWall(): boolean {
    return this.state.currentValue == 9 || this.state.currentValue == 10 || this.state.currentValue == 11 || this.state.currentValue == 12
  }

  private printSelect() {
    this.showSnackBarMessage(this.state.languageService.get('plsSelect'));
  }

  private printSelectDesk() {
    this.showSnackBarMessage(this.state.languageService.get('plsSelectDesk'));
  }

  private existsAlready() {
    this.showSnackBarMessage(this.state.languageService.get('existsAlready'));
  }

  private showSnackBarMessage(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  render() {
    const mymap = [];
    for (let i = 0; i < this.state.rows; i++) {
      let row = [];
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
            {this.state.isAdmin && <Button title={this.state.languageService.get('addFloor')} onPress={this.onAddFloor.bind(this)}></Button>}
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View>
              <Feather

                style={[styles.floorUp, (this.state.currentFloor == this.state.floorsCount) ? { opacity: 0.3 } : { opacity: 1 }]}
                color={'blue'}
                onPress={this.onFloorUp.bind(this)}
                size={22}
                name={'corner-right-up'}
              />
            </View>
            {this.state.isAdmin && <Feather
              style={{ height: 24, marginTop: 13, marginLeft: 40, marginRight: 5 }}
              color={'blue'}
              onPress={this.onRemoveRow.bind(this)}
              size={22}
              name={'minus'}
            />}
            {this.state.isAdmin && <Feather
              style={{ marginTop: 13, marginLeft: 10 }}
              color={'blue'}
              onPress={this.onAddRow.bind(this)}
              size={22}
              name={'plus'}
            />}
          </View>

          <View style={[styles.mapStyle, this.state.isAdmin ? { marginRight: 14, marginTop: 8 } : { marginRight: 20, marginTop: 20 }]}>

            {mymap.map(row => (
              <View style={{ display: 'flex', flex: 1 }}>

                {row.map(cell => {

                  const checkPlaceExistence = positionParam => this.state.places.some(({ pozitie }) => pozitie == positionParam);
                  const pos = this.state.currentFloor.toString() + ":" + cell.coords[0] + ":" + cell.coords[1];
                  let image;
                  var cellIsDesk = false;
                  var cellIsDoor = false;
                  var cellIsWall = false;
                  if (checkPlaceExistence(pos)) {
                    const val = this.state.places.find(p => p.pozitie == pos).value;
                    if (val == 1) {
                      image = <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/desk.jpeg')}></Image>
                      cellIsDesk = true;
                    }
                    else if (val == 2) {
                      image = <Image style={{ width: '100%', height: '100%', transform: [{ rotate: '90deg' }] }} source={require('../../assets/desk.jpeg')}></Image>
                      cellIsDesk = true;
                    }
                    else if (val == 3) {
                      image = <Image style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }] }} source={require('../../assets/desk.jpeg')}></Image>
                      cellIsDesk = true;
                    }
                    else if (val == 4) {
                      image = <Image style={{ width: '100%', height: '100%', transform: [{ rotate: '270deg' }] }} source={require('../../assets/desk.jpeg')}></Image>
                      cellIsDesk = true;
                    }
                    else if (val == 5) {
                      image = <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/door.jpeg')}></Image>
                      var cellIsDoor = true;
                    }
                    else if (val == 6) {
                      image = <Image style={{ width: '100%', height: '100%', transform: [{ rotate: '90deg' }] }} source={require('../../assets/door.jpeg')}></Image>
                      var cellIsDoor = true;
                    }
                    else if (val == 7) {
                      image = <Image style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }] }} source={require('../../assets/door.jpeg')}></Image>
                      var cellIsDoor = true;
                    }
                    else if (val == 8) {
                      image = <Image style={{ width: '100%', height: '100%', transform: [{ rotate: '270deg' }] }} source={require('../../assets/door.jpeg')}></Image>
                      var cellIsDoor = true;
                    }
                    else if (val == 9) {
                      image = <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/wall.jpeg')}></Image>
                      var cellIsWall = true;
                    }
                    else if (val == 10) {
                      image = <Image style={{ width: '100%', height: '100%', transform: [{ rotate: '90deg' }] }} source={require('../../assets/wall.jpeg')}></Image>
                      var cellIsWall = true;
                    }
                    else if (val == 11) {
                      image = <Image style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }] }} source={require('../../assets/wall.jpeg')}></Image>
                      var cellIsWall = true;
                    }
                    else if (val == 12) {
                      image = <Image style={{ width: '100%', height: '100%', transform: [{ rotate: '270deg' }] }} source={require('../../assets/wall.jpeg')}></Image>
                      var cellIsWall = true;
                    }
                  }

                  return (
                    <TouchableHighlight
                      onPress={cellIsDesk ? this.onCellBook.bind(this, cell.coords) : !this.state.isAdmin ? this.printSelectDesk.bind(this) : (this.state.currentValue == 0 && cellIsDesk) ? this.onCellBook.bind(this, cell.coords) : (this.state.currentValue == 0 && (cellIsDoor || cellIsWall)) ? this.printSelectDesk.bind(this) : (this.state.currentValue == 0 && !cellIsDoor && !cellIsWall && !cellIsDesk) ? this.printSelect.bind(this) : (this.state.currentValue != 0 && (cellIsWall || cellIsDesk || cellIsDoor)) ? this.existsAlready.bind(this) : this.onCellAdd.bind(this, cell.coords)}
                      style={styles.cellStyle}>
                      <View>
                        {image}
                      </View>
                    </TouchableHighlight>
                  )
                })}
              </View>
            ))}
            <View>
              {this.state.isAdmin &&
                <Feather
                  color={'blue'}
                  onPress={this.onAddColumn.bind(this)}
                  size={22}
                  name={'plus'}
                />}
              {this.state.isAdmin &&
                <Feather
                  style={{ marginTop: 13 }}
                  color={'blue'}
                  onPress={this.onRemoveColumn.bind(this)}
                  size={22}
                  name={'minus'}
                />}
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Feather
              style={[styles.floorDown, this.state.currentFloor == 1 ? { opacity: 0.3 } : { opacity: 1 }]}
              color={'blue'}
              onPress={this.onFloorDown.bind(this)}
              size={22}
              name={'corner-right-down'}
            />
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 50 }}>
              <Text style={{ textDecorationLine: 'underline' }}>{this.state.currentFloor == 1 ? "1st floor" : this.state.currentFloor + "nd floor"}</Text>
            </View>
          </View>

          {this.state.isAdmin && (
            <View style={{ marginTop: 35, marginLeft: 25, flexDirection: 'row' }}>

              <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 10 }}>
                {this.isDesk() && (
                  <Feather
                    style={{ marginLeft: 12, position: 'absolute', marginTop: -27, backgroundColor: '#bdbae3' }}
                    color={'blue'}
                    onPress={this.onDeskRotate.bind(this)}
                    size={22}
                    name={'rotate-ccw'}
                  />)}
                <TouchableHighlight style={{ width: 70, height: 70 }} onPress={this.onDesk.bind(this)}>
                  <View>
                    <Image style={[
                      styles.imageStyle, this.isDesk() ? { borderColor: 'black', borderWidth: 2.0 } : {}, this.state.currentValue == 2 ? { transform: [{ rotate: '90deg' }] } : this.state.currentValue == 3 ? { transform: [{ rotate: '180deg' }] } : this.state.currentValue == 4 ? { transform: [{ rotate: '270deg' }] } : {}]}
                      source={require('../../assets/desk.jpeg')}>
                    </Image>
                    {this.isDesk() && (
                      <MaterialIcons size={18} onPress={this.closeItem.bind(this)} name="close" style={{ backgroundColor: 'red', position: 'absolute', top: 0, right: 0 }}></MaterialIcons>
                    )}
                    <Text style={{ alignSelf: 'center', fontSize: 13 }}>{this.state.languageService.get('desk')}</Text>
                  </View>
                </TouchableHighlight>
              </View >

              <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 40 }}>
                {this.isDoor() && (
                  <Feather
                    style={{ marginLeft: 12, position: 'absolute', marginTop: -27, backgroundColor: '#bdbae3' }}
                    color={'blue'}
                    onPress={this.onDoorRotate.bind(this)}
                    size={22}
                    name={'rotate-ccw'}
                  />)}
                <TouchableHighlight style={{ width: 70, height: 70 }} onPress={this.onDoor.bind(this)}>
                  <View>
                    <Image style={[styles.imageStyle, this.isDoor() ? { borderColor: 'black', borderWidth: 2.0 } : {}, this.state.currentValue == 6 ? { transform: [{ rotate: '90deg' }] } : this.state.currentValue == 7 ? { transform: [{ rotate: '180deg' }] } : this.state.currentValue == 8 ? { transform: [{ rotate: '270deg' }] } : {}]}
                      source={require('../../assets/door.jpeg')}></Image>
                    {this.isDoor() && (<MaterialIcons size={18} onPress={this.closeItem.bind(this)} name="close" style={{ backgroundColor: 'red', position: 'absolute', top: 0, right: 0 }}></MaterialIcons>)}
                    <Text style={{ alignSelf: 'center', fontSize: 13 }}>{this.state.languageService.get('door')}</Text>
                  </View>
                </TouchableHighlight>
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 40 }}>
                {this.isWall() && (
                  <Feather
                    style={{ marginLeft: 12, position: 'absolute', marginTop: -27, backgroundColor: '#bdbae3' }}
                    color={'blue'}
                    onPress={this.onWallRotate.bind(this)}
                    size={22}
                    name={'rotate-ccw'}
                  />)}
                <TouchableHighlight style={{ width: 70, height: 70 }} onPress={this.onWall.bind(this)}>
                  <View>
                    <Image style={[styles.imageStyle, this.isWall() ? { borderColor: 'black', borderWidth: 2.0 } : {}, this.state.currentValue == 10 ? { transform: [{ rotate: '90deg' }] } : this.state.currentValue == 11 ? { transform: [{ rotate: '180deg' }] } : this.state.currentValue == 12 ? { transform: [{ rotate: '270deg' }] } : {}]}
                      source={require('../../assets/wall.jpeg')}></Image>
                    {this.isWall() && (<MaterialIcons size={18} onPress={this.closeItem.bind(this)} name="close" style={{ backgroundColor: 'red', position: 'absolute', top: 0, right: 0 }}></MaterialIcons>)}
                    <Text style={{ alignSelf: 'center', fontSize: 13 }}>{this.state.languageService.get('wall')}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          )}
        </React.Fragment>
      </Container>
    );
  }
}

AppRegistry.registerComponent('MapView', () => MapView);
