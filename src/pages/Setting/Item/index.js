import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import styles from './styles.js';

function Button(props) {
  let children = props.children;

  if (typeof children === 'string') {
    children = (
      <Text style={styles.rightText}>
        {children}
      </Text>
    );
  }

  return (
    <TouchableHighlight
      style={styles.button}
      onPress={props.onPress}
      underlayColor="#666"
    >
      <View style={styles.all} >
        <MaterialCommunityIcons
          name={props.iconName}
          size={28}
          style={styles.iconFont}
        />
        <View style={styles.main}>
          <View style={styles.nameContainer}>
            <Text style={styles.mainText}>
              {props.name}
            </Text>
          </View>
          {children}
        </View>
      </View>
    </TouchableHighlight>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onPress: PropTypes.func,
};
Button.defaultProps = {
  name: '',
  iconName: '',
  children: '',
  onPress: () => {},
};

export default Button;
