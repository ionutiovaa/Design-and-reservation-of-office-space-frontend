import * as React from 'react';
import { AppRegistry, Button, Dimensions, ScrollView, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Container, View, Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import Share from 'react-native-share';

import CustomHeader from '../navigation-menu/custom-header/CustomHeader';
import LanguageService from '../../services/LanguageService';
import styles from '../book-view/BookViewStyle';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import TimePicker from "react-native-24h-timepicker";
import DelButton from '../sc-button/DelButton';
import { IUser } from '../../data-models/User';
import BookService from '../../services/BookService';
import IUtilizare from '../../data-models/Utilizare';
import IForGetSchedules from '../../data-models/ForGetSchedules';
import ISchedules from '../../data-models/Schedules';
import ViewShot from 'react-native-view-shot';
import QRCode from 'react-native-qrcode-svg';
import CameraRoll from "@react-native-community/cameraroll";

interface IStateBookView {
  languageService: LanguageService,
  modalVisible: boolean,
  currentDate: Date,
  date: string,
  startTime: string,
  endTime: string,
  schedules: ISchedules[],
  uriqrcode: string,
  qrcodeValue: string,
  first: boolean,
  free: boolean,
}

export default class BookView extends React.Component<any, IStateBookView>{
  svg;
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
      schedules: [],
      uriqrcode: "",
      qrcodeValue: "",
      first: true,
      free: false,
    }
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  private onYes() {
    this.toggleModal();
    this.onsendBook();
  }

  private async checkFree(): Promise<boolean> {
    if (this.state.startTime != "" && this.state.endTime != "" && this.state.date != "") {
      const param = this.props.navigation.getParam('position');

      const jsonUser = await AsyncStorage.getItem('logged_user');
      const user: IUser = JSON.parse(jsonUser) as IUser;

      var username: string = user.username;
      var position: string = param;
      var startDate: string = this.state.date + " " + this.state.startTime + ":00";
      var finalDate: string = this.state.date + " " + this.state.endTime + ":00";

      const utilizare: IUtilizare = {
        username: username,
        position: position,
        startDate: startDate,
        finalDate: finalDate
      };
      BookService.checkFree(utilizare).then((result): boolean => {
        this.setState({ free: result });
        if (result == false)
          return result;
      });
      return true;
    }
  }

  onConfirmStartTime(startHour, startMinute) {
    if (this.state.endTime != "") {
      var endH = +this.state.endTime.split(":")[0];
      var endM = +this.state.endTime.split(":")[1];
      if (startHour > endH) {
        this.showSnackBarMessage(this.state.languageService.get('invalidStartTime'));
        return;
      }
      else if (startHour == endH && startMinute >= endM) {
        this.showSnackBarMessage(this.state.languageService.get('invalidStartTime'));
        return;
      }
    }
    this.TimePicker2.close();
    this.setState({ startTime: `${startHour}:${startMinute}` }, () => {
      this.checkFree();
    });
  }

  onConfirmEndTime(endHour, endMinute) {
    this.setState({ endTime: `${endHour}:${endMinute}` });
    if (this.state.startTime != "") {
      var startH = +this.state.startTime.split(":")[0];
      var startM = +this.state.startTime.split(":")[1];
      if (startH > endHour) {
        this.showSnackBarMessage(this.state.languageService.get('invalidEndTime'));
        return;
      }
      else if (startH == endHour && startM >= endMinute) {
        this.showSnackBarMessage(this.state.languageService.get('invalidEndTime'));
        return;
      }
    }
    this.TimePicker.close();
    this.setState({ endTime: `${endHour}:${endMinute}` }, () => {
      this.checkFree();
    });
  }

  private showSnackBarMessage(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  private giveUp() {
    this.refreshPage();
    this.props.navigation.navigate('MapView', { transition: 'vertical' });
  }

  private async onsendBook() {
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
    const param = this.props.navigation.getParam('position');

    const jsonUser = await AsyncStorage.getItem('logged_user');
    const user: IUser = JSON.parse(jsonUser) as IUser;

    var username: string = user.username;
    var position: string = param;
    var startDate: string = this.state.date + " " + this.state.startTime + ":00";
    var finalDate: string = this.state.date + " " + this.state.endTime + ":00";

    const utilizare: IUtilizare = {
      username: username,
      position: position,
      startDate: startDate,
      finalDate: finalDate
    };
    BookService.insertBook(utilizare).then((items: IUtilizare) => {
      this.showSnackBarMessage(this.state.languageService.get('bookSucces'));
      this.refreshPage();
      this.props.navigation.navigate('MapView', { transition: 'vertical' });
    });

  }

  public onDate(date): ISchedules[] {
    this.setState({ first: false });
    this.setState({ date: date });
    const forGetSchedules: IForGetSchedules = {
      date: this.state.date,
      position: this.props.navigation.getParam('position')
    };
    var schedulesList: ISchedules[];
    BookService.getSchedules(forGetSchedules).then((items: ISchedules[]) => {
      schedulesList = items;
      this.setState({ schedules: items })
    });
    return schedulesList;
  }

  private onCapture = uri => {
    this.setState({ uriqrcode: uri });
  }

  private savePhoto() {
    CameraRoll.save(this.state.uriqrcode).then(
      () => Alert.alert("The qrcode was saved to your phone!")
    )
  }

  private shareQR() {
    this.svg.toDataURL((data) => {
      const shareImageBase64 = {
        title: "QR",
        message: this.state.qrcodeValue,
        url: `data:image/png;base64,${data}`
      };
      Share.open(shareImageBase64);
    });
  }

  private refreshPage() {
    this.setState({ date: "" });
    this.setState({ startTime: "" });
    this.setState({ endTime: "" });
    this.setState({ first: true });
  }

  async componentDidMount() {
    const param = this.props.navigation.getParam('position');
    this.setState({ qrcodeValue: param });
  }

  private schedule() {
    return this.state.schedules.map((data, i) => {
      return (
        <View style={{}}>
          <Text style={{ fontSize: 17, color: '#3f4194' }}>
            {" "}{i + 1}.  {data.startTime} - {data.endTime}
          </Text>
        </View>
      )
    })
  }


  render() {

    const maxDate = new Date(this.state.currentDate.setMonth(this.state.currentDate.getMonth() + 1));

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

          <ScrollView>
            <Text style={styles.sgTitleText}>
              {this.state.languageService.get('schedule_form')}
            </Text>
            <View style={styles.dateView}>
              <Text style={{ marginLeft: 17, fontSize: 18, color: '#3f4194' }}>
                {this.state.languageService.get('selectDate')}
              </Text>
              <View style={{ borderColor: '#3f4194', borderWidth: 1.0, borderRadius: 10, alignSelf: 'center', width: Dimensions.get('screen').width - 10 }}>
                <View style={{ marginLeft: -13, marginTop: 10, alignItems: 'center' }}>
                  <DatePicker
                    style={{ width: 300 }}
                    date={this.state.date}
                    mode="date"
                    placeholder={this.state.languageService.get('calendar')}
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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <View style={styles.container}>

                    <TouchableOpacity
                      onPress={() => this.TimePicker2.open()}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>{this.state.languageService.get('chooseStartHour')}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#3f4194' }}>{this.state.startTime}</Text>
                    <TimePicker
                      maxHour={19}
                      ref={ref => {
                        this.TimePicker2 = ref;
                      }}
                      onCancel={() => this.TimePicker2.close()}
                      itemStyle={{}}
                      onConfirm={() => { this.onConfirmStartTime(this.TimePicker2.state.selectedHour, this.TimePicker2.state.selectedMinute) }}
                    />
                  </View>
                  <View style={styles.container}>

                    <TouchableOpacity
                      onPress={() => this.TimePicker.open()}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>{this.state.languageService.get('chooseEndHour')}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#3f4194' }}>{this.state.endTime}</Text>
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
              </View>
            </View>
            {!this.state.first && (
              <View style={{ marginTop: 3, borderColor: '#3f4194', borderWidth: 1.0, borderRadius: 10, alignSelf: 'center', width: Dimensions.get('screen').width - 10 }}>
                <Text style={{ marginLeft: 17, fontSize: 15, color: '#3f4194', marginBottom: 3 }}>
                  {this.state.languageService.get('schedules')}
                </Text>

                <ScrollView style={{ height: 80 }}>
                  {this.state.date && this.state.schedules.length == 0 ? <Text style={styles.textNothing}>{this.state.languageService.get('nothing')}</Text> : this.schedule()}
                </ScrollView>
              </View>
            )

            }

            <Text style={{ marginLeft: 17, fontSize: 18, color: '#3f4194' }}>
              {this.state.languageService.get('the_code')}
            </Text>
            <View style={{ alignItems: 'center', marginTop: 0 }}>
              <ViewShot onCapture={this.onCapture} captureMode="mount">
                <View style={{ backgroundColor: 'white', height: 300, width: 300, alignItems: 'center', paddingTop: 25 }}>
                  <QRCode ref="qrCode"
                    value={this.state.qrcodeValue != "" ? this.state.qrcodeValue : "#"}
                    size={250}
                    getRef={(ref) => (this.svg = ref, this.savePhoto.bind(ref))}

                  />
                </View>
              </ViewShot>
              <View style={styles.qrbottoms}>
                <View style={styles.container}>

                  <Feather
                    style={styles.container}
                    color={'blue'}
                    onPress={this.savePhoto.bind(this)}
                    size={22}
                    name={'download'}
                  />
                  <Text onPress={this.savePhoto.bind(this)} style={{ color: '#3f4194' }}>
                    {this.state.languageService.get('save')}
                  </Text>

                </View>
                <View style={styles.container}>
                  <Feather
                    style={styles.container}
                    color={'blue'}
                    onPress={this.shareQR.bind(this)}
                    size={22}
                    name={'share-2'}
                  />
                  <Text onPress={this.shareQR.bind(this)} style={{ color: '#3f4194' }}>
                    {this.state.languageService.get('share')}
                  </Text>
                </View>
              </View>
              <TouchableHighlight activeOpacity={true ? 1 : 0.2} style={{ marginTop: 20, borderRadius: 12, height: 40, width: 240, backgroundColor: this.state.free ? '#bdbae3' : '#dbdbdb' }} onPress={this.toggleModal.bind(this)} disabled={this.state.free ? false : true}>
                <View>
                  <Text style={{ alignSelf: 'center', paddingTop: 8, color: '#3f4194' }}>{this.state.languageService.get('sendBook')}</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.bottom}>
              <DelButton
                text={this.state.languageService.get('giveUp')}
                onClick={this.giveUp.bind(this)}
              />
            </View>

          </ScrollView>
        </React.Fragment>
      </Container>
    );
  }
}

AppRegistry.registerComponent('BookView', () => BookView);