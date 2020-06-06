import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    formView: {
        paddingTop: 20,
        width: Dimensions.get('screen').width - 60,
        flex: 1
    },
    textInput: {
        padding: 10,
        alignItems: 'center',
    },
    textStyle: {
        paddingTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3f4194',
        textDecorationLine: 'underline',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 70,
        position: 'absolute',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: -180,
        bottom: 40,
        alignContent: 'center',
        marginLeft: 60,
        alignSelf: 'center',
        alignItems: 'center',
    },
});

export default styles;