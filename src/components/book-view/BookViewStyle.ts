import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({

  customHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    position: 'absolute',
  },
  yesButton: {
    width: 70,
    marginLeft: 60,
    marginTop: 40,
  },
  noButton: {
    width: 70,
    marginLeft: 60,
    marginTop: 40
  },
  title: {
    textAlign: 'center',
    fontSize: 19,
    marginTop: 35,
    color: '#3f4194',
    fontWeight: '100',
  },
  bottom: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textNothing: {
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 14,
    color: '#3f4194'
  },
  buttonPress: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
  },
  qrbottoms: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -20,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1
  },
  textChoose: {
    fontSize: 30,
  },
  sgTitleText: {
    marginTop: 5,
    color: '#3f4194',
    fontSize: 23,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000066',
  },
  welcomePress: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  buttonDisabled: {
    borderColor: '#000066',
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#4EB151",
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  },
  dateView: {
    marginTop: 10,
  }

});

export default styles;