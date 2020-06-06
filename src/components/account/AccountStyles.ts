import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    formView: {
        paddingTop: 20,
        width: Dimensions.get('screen').width - 60,
    },
    acMainText: {
        color: '#3f4194',
        fontSize: 16,
        textAlign: 'left',
        marginTop: 15,
    },
    acFormView: {
        position: 'absolute',
        marginTop: 15,
        marginLeft: 30,
        marginRight: 30,
        width: Dimensions.get('screen').width - 60,
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
    bottom: {
        justifyContent: 'flex-end',
        marginBottom: 50,
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 0
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
        bottom: 0,
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