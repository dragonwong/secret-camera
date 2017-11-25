import {
  StyleSheet,
} from 'react-native';

const GAP = 20;
const textStyle = {
  fontSize: 18,
};

export default StyleSheet.create({
  all: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    paddingLeft: GAP,
  },
  main: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgb(218, 217, 223)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 15,
    paddingRight: GAP,
  },
  nameContainer: {
    flex: 1,
  },
  mainText: {
    ...textStyle,
  },
  rightText: {
    ...textStyle,
    color: 'rgb(140, 140, 140)',
  },
});
