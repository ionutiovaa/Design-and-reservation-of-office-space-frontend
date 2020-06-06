import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'lightblue',
  },
  customHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    position: 'absolute',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
    left: 10,
    right: 10,
    top: 80,
    bottom: 50,
  },
  textInputStyle: {
    width: '100%',
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    textAlign: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 21,
    color: '#9395db'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default styles;
