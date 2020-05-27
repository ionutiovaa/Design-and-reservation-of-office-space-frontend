import * as React from 'react';
import { AppRegistry, Button, Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight, BackHandler } from 'react-native';
import { Container, View, Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Snackbar from 'react-native-snackbar';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import LanguageService from '../../services/LanguageService';
import styles from '../book-view/BookViewStyle';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import TimePicker from "react-native-24h-timepicker";
import ScButton from '../sc-button/ScButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import DelButton from '../sc-button/DelButton';

interface IStateBookView {
  languageService: LanguageService,
  modalVisible: boolean,
  currentDate: Date,
  date: string,
  startTime: string,
  endTime: string,
}

export default class BookView extends React.Component<any, IStateBookView>{
  TimePicker: any;
  TimePicker2: any;
  constructor(props: any) {
    super(props);
    this.state = {
      languageService: new LanguageService(),
      modalVisible: false,
      currentDate: new Date(),
      date: "",
      startTime: "",
      endTime: "",
    }
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  private onDate(date) {
    this.setState({ date: date });
    console.log(this.state.date);
  }

  private onsendBook() {
    if (this.state.date === "") {
      this.showSnackBarMessage(this.state.languageService.get('empty_date'));
      return;
    }
    if (this.state.startTime === "") {
      this.showSnackBarMessage(this.state.languageService.get('empty_start'));
      return;
    }
    if (this.state.endTime === "") {
      this.showSnackBarMessage(this.state.languageService.get('empty_end'));
      return;
    }
    console.log(this.state.date);
    console.log(this.state.startTime);
    console.log(this.state.endTime);
    const param = this.props.navigation.getParam('position');
    console.log("PARAM: ", param);



  }

  onConfirmStartTime(startHour, startMinute) {
    console.log("confSTART");
    if (this.state.endTime != "") {
      var endH = +this.state.endTime.split(":")[0];
      var endM = +this.state.endTime.split(":")[1];
      if (startHour > endH) {
        console.log("pls3");
        this.showSnackBarMessage(this.state.languageService.get('invalidStartTime'));
        return;
      }
      else if (startHour == endH && startMinute >= endM) {
        console.log("pls4");
        this.showSnackBarMessage(this.state.languageService.get('invalidStartTime'));
        return;
      }
    }
    this.setState({ startTime: `${startHour}:${startMinute}` });
    this.TimePicker2.close();
  }

  onConfirmEndTime(endHour, endMinute) {
    console.log("confEND");
    if (this.state.startTime != "") {
      var startH = +this.state.startTime.split(":")[0];
      var startM = +this.state.startTime.split(":")[1];
      console.log("HS", startH, "MS: ", startM);
      console.log("HE", endHour, "ME: ", endMinute);
      if (startH > endHour) {
        console.log("pls");
        this.showSnackBarMessage(this.state.languageService.get('invalidEndTime'));
        return;
      }
      else if (startH == endHour && startM >= endMinute) {
        console.log("pls2");
        this.showSnackBarMessage(this.state.languageService.get('invalidEndTime'));
        return;
      }
    }
    this.setState({ endTime: `${endHour}:${endMinute}` });
    this.TimePicker.close();
  }

  private showSnackBarMessage(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  private giveUp() {
    this.props.navigation.navigate('MapView');
  }

  // async componentWillMount() {
  //   const { param } = this.props.navigation.state.params.position;
  //   console.log("PARAM: ", param);
  // }


  render() {

    const maxDate = new Date(this.state.currentDate.setMonth(this.state.currentDate.getMonth() + 1));

    return (

      <Container>
        <CustomHeader navigation={this.props.navigation} titleText="home">
          <View style={styles.customHeader}></View>
        </CustomHeader>

        <React.Fragment>
          <View>
            <DatePicker
              style={{ width: 300 }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate={new Date()}
              maxDate={maxDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 10
                },
                dateInput: {
                  marginLeft: 50
                }
              }}
              onDateChange={(date) => { this.onDate(date) }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 100 }}>
            <View style={styles.container}>

              <TouchableOpacity
                onPress={() => this.TimePicker2.open()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{this.state.languageService.get('chooseHour')}</Text>
              </TouchableOpacity>
              <Text>{this.state.startTime}</Text>
              <TimePicker

                maxHour={19}
                ref={ref => {
                  this.TimePicker2 = ref;
                }}
                onCancel={() => this.TimePicker2.close()}
                itemStyle={{}}
                onConfirm={() => this.onConfirmStartTime(this.TimePicker2.state.selectedHour, this.TimePicker2.state.selectedMinute)}
              />
            </View>
            <View style={styles.container}>

              <TouchableOpacity
                onPress={() => this.TimePicker.open()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{this.state.languageService.get('chooseHour')}</Text>
              </TouchableOpacity>
              <Text>{this.state.endTime}</Text>
              <TimePicker
                maxHour={20}
                ref={ref => {
                  this.TimePicker = ref;
                }}
                itemStyle={{}}
                onCancel={() => this.TimePicker.close()}
                onConfirm={() => this.onConfirmEndTime(this.TimePicker.state.selectedHour, this.TimePicker.state.selectedMinute)}
              />
            </View>
          </View>
          <View style={{ alignItems: 'center', marginTop: 300 }}>
            <ScButton
              onClick={this.onsendBook.bind(this)}
              text={this.state.languageService.get('sendBook')}
            />
          </View>
          <View style={styles.bottom}>
            <DelButton
              text={this.state.languageService.get('giveUp')}
              onClick={this.giveUp.bind(this)}
            />
          </View>


        </React.Fragment>
      </Container>
    );
  }
}

AppRegistry.registerComponent('BookView', () => BookView);