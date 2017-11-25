import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

import {
  BUTTON_COLOR_MAP,
} from '../../../constant/styles.js';
import styles from './styles.js';

function Button(props) {
  let children = props.children;

  if (typeof children === 'string') {
    children = (
      <Text
        style={[styles.text, {
          color: BUTTON_COLOR_MAP[props.type].textColor,
        }]}
      >
        {children}
      </Text>
    );
  }

  return (
    <TouchableHighlight
      style={[styles.button, {
        backgroundColor: BUTTON_COLOR_MAP[props.type].backgroundColor,
      }, props.style]}
      onPress={props.onPress}
      underlayColor={BUTTON_COLOR_MAP[props.type].underlayColor}
    >
      {children}
    </TouchableHighlight>
  );
}

Button.propTypes = {
  style: View.propTypes.style,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onPress: PropTypes.func,
  type: PropTypes.oneOf(['black', 'grey', 'yellow', 'white']),
};
Button.defaultProps = {
  style: null,
  children: '',
  onPress: () => {},
  type: 'black',
};

export default Button;
