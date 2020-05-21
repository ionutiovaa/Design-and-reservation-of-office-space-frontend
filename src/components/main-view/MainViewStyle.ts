import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    containerStyle: {
		//flex:1,
		//margintop:180,
		//alignItems: 'center',
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
        
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
    position: 'absolute',
    
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
        fontSize: 21,
        color: 'rgb(0,122,255)'
      },
      buttonTouchable: {
        padding: 16
      }
});

export default styles;
