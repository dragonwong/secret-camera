import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const GAP = 15;
const BUTTON_SIDE = (width - (GAP * 5)) / 4;
const KEYBOARD_HEIGHT = (BUTTON_SIDE * 5) + (GAP * 4);

// const BORDER = {
//   borderColor: 'red',
//   borderWidth: 1,
// };

const brightness = ((levels) => {
  const brightnessObj = {};
  while (levels) {
    levels -= 1;
    brightnessObj[`brightness${levels}`] = {
      backgroundColor: `rgba(0, 0, 0, 0.${levels})`,
    };
  }
  return brightnessObj;
})(10);

export default StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: 'black',
    padding: GAP,
    paddingTop: 23,
    justifyContent: 'space-between',
  },

  monitor: {
    height: 100,
    flexDirection: 'row',
  },
  preview: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  previewCamera: {
    flex: 1,
  },
  previewOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  ...brightness,
  info: {
    flex: 1,
  },
  infoText: {
    color: 'rgb(166, 166, 166)',
  },

  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    color: 'white',
    fontSize: 70,
  },

  keyboard: {
    height: KEYBOARD_HEIGHT,
    justifyContent: 'space-between',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: BUTTON_SIDE,
    height: BUTTON_SIDE,
    borderRadius: BUTTON_SIDE / 2,
  },
  bigButton: {
    width: (BUTTON_SIDE * 2) + GAP,
  },
  iconFont: {
    marginBottom: -4,
  },
});


    // justifyContent: 'center',
