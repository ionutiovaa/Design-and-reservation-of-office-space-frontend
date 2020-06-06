import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navDrawBg: { backgroundColor: '#3f4194' },
  headerNavMenu: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-start',
  },
  titleNavMenu: {
    paddingTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  lineStyle: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    margin: 10,
  },
  subTitleNavMenu: {
    fontWeight: 'bold',
    lineHeight: 50,
  },
  navMenuButton: {
    padding: 10,
    flexDirection: 'row',
    marginVertical: 5,
  },
  navMenuButtonText: {
    fontSize: 16,
    opacity: 0.6,
    marginLeft: 14,
    marginTop: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  sectionText: {
    opacity: 0.5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemOpacity: {
    opacity: 0.3,
  },
  textFormat: {
    color: 'white',
    fontFamily: 'System',
  },
  customHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
