import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    formView: {
        paddingTop: 20,
        width: Dimensions.get('screen').width - 60,
    },
    acMainText: {
        color: '#719192',
        fontSize: 16,
        textAlign: 'left',
        marginTop: 15,
    },
    acFormView: {
        //flex: 1,
        //alignItems: 'center',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        width: Dimensions.get('screen').width - 60,
        //flex: 1,
        //backgroundColor: 'red',
        
    },
    customHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40,
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        bottom:0
    },
    textStyle: {
        textAlign: 'center',
        textAlignVertical: 'bottom',
        paddingTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
        textDecorationLine: 'underline',
        position: 'absolute',
        bottom:0,
    },
    backdropStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 50,
    },
    modalStyle: {
        backgroundColor: '#fff',
        borderRadius: 5,
        maxWidth: 500,
        minHeight: 300,
        margin: '0 auto',
        padding: 30,
    }
});

export default styles;