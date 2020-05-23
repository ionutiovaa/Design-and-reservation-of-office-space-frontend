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