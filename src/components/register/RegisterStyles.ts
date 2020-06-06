import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  sgFormView: {
    marginTop: 0,
    marginLeft: 30,
    marginRight: 30,
    width: Dimensions.get('screen').width - 60,
  },
  sgRegisterView: {
    alignItems: 'center',
    position: 'absolute',
  },
  sgTitleText: {
    marginTop: 5,
    color: '#3f4194',
    fontSize: 23,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 20,
  },
  sgText: {
    marginLeft: 20,
    color: '#3f4194',
    fontSize: 17,
    textAlign: 'left',
  },
  sgPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingTop: 20,
  },
  customHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: 19,
    marginTop: 35,
    color: '#3f4194',
    fontWeight: '100',
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
});
export default styles;
