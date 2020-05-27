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
  title: {
    textAlign: 'center',
    //fontWeight: 'bold',
    fontSize: 19,
    marginTop: 35,
    color: '#719192',
    fontWeight: '100',
    //marginBottom: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
    alignItems: 'center',
  },
  container: {

    alignItems: "center",
    alignSelf: 'center',
    marginLeft: 46,
    //backgroundColor: "black",
    //paddingTop: 100,

  },
  text: {
    fontSize: 20,
    marginTop: 10
  },
  button: {
    backgroundColor: "#4EB151",
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 3,
    // marginVertical: 50
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }

});

export default styles;