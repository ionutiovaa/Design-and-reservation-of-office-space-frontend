import {StyleSheet, Dimensions} from 'react-native';

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
      backgroundColor: 'red' ,
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: 1.0,
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
      opacity: 0.3,
      marginTop: 13,
      marginBottom: -13,
      alignSelf: 'center',
      marginRight: 25,
    },
    floorDown:{
      opacity: 0.3,
      marginTop: 7,
      alignSelf: 'center',
      marginRight: 25,
    },
    title:{
      textAlign: 'center',
      //fontWeight: 'bold',
      fontSize: 19,
      marginTop: 35,
      color: '#719192',
      fontWeight: '100',
      //marginBottom: 1,
    }

});

export default styles;