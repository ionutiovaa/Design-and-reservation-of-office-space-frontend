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
  cellStyle: {
    flex: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1.0,
  },
  mapStyle: {
    flexDirection: 'row',
    flex: 1,
    maxHeight: 310,
    marginLeft: 25
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
  modalContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  floorUp: {
    backgroundColor: '#bdbae3',
    marginLeft: 170,
    opacity: 0.3,
    marginTop: 13,
    marginBottom: -13,
    alignSelf: 'center',
    marginRight: 25,
  },
  floorDown: {
    backgroundColor: '#bdbae3',
    opacity: 0.3,
    marginTop: 7,
    alignSelf: 'center',
    marginLeft: 170,
    marginRight: 25,
  },
  title: {
    textAlign: 'center',
    fontSize: 19,
    marginTop: 35,
    color: '#3f4194',
    fontWeight: '100',
  },
  imageStyle: {
    height: 70,
    width: 70,
  }

});

export default styles;