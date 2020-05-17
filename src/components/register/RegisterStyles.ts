import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  sgFormView: {
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    width: Dimensions.get('screen').width - 60,
  },
  sgRegisterView: {
    alignItems: 'center',
  },
  sgTitleText: {
    marginTop: 35,
    color: '#719192',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 24,
  },
  sgText: {
    color: '#719192',
    fontSize: 15,
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
});
export default styles;
