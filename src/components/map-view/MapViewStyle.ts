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

});

export default styles;