import React from 'react';
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  Picker,
  Linking,
  AsyncStorage,
} from 'react-native';
import {
  Camera,
} from 'expo';
import HeaderedSheet from 'rnx-ui/HeaderedSheet';
import autobind from 'autobind-decorator';

import Item from './Item';
import styles from './styles.js';

export default class Setting extends React.Component {
  static navigationOptions = {
    // header: null,
    title: '设置',
  };

  state = {
    // 连拍间隔
    multiPhotoInterval: 500,
    // picker 中显示的连拍间隔
    multiPhotoIntervalInPicker: 500,
    multiPhotoIntervalPickerVisible: false,
    type: Camera.Constants.Type.back,
  };

  // 打开连拍间隔 picker
  @autobind
  openMultiPhotoIntervalPicker() {
    this.setState({
      multiPhotoIntervalPickerVisible: true,
    });
  }
  // 关闭连拍间隔 picker
  @autobind
  cancelMultiPhotoIntervalPicker() {
    this.setState({
      multiPhotoIntervalPickerVisible: false,
    });
  }
  // 连拍间隔 picker 变化回调
  @autobind
  onMultiPhotoIntervalPickerChange(itemValue) {
    this.setState({
      multiPhotoIntervalInPicker: itemValue,
    });
  }
  // 连拍间隔 picker 确认选择
  @autobind
  confirmMultiPhotoIntervalPicker() {
    const multiPhotoInterval = this.state.multiPhotoIntervalInPicker;
    const newState = {
      multiPhotoIntervalPickerVisible: false,
    };

    if (multiPhotoInterval !== this.state.multiPhotoInterval) {
      newState.multiPhotoInterval = multiPhotoInterval;
      AsyncStorage.mergeItem('setting', JSON.stringify({
        multiPhotoInterval,
      }), (error) => {
        console.log(error);
      });
    }
    this.setState(newState);
  }
  feedback() {
    Linking.openURL('mailto:i@wangdagen.com').catch((err) => {
      // todo: 埋点
      console.error('An error occurred', err);
    });
  }
  mark() {
    // todo: 替换位本 app 的链接
    Linking.openURL('https://itunes.apple.com/cn/app/expo-client/id982107779?mt=8').catch((err) => {
      // todo: 埋点
      console.error('An error occurred', err);
    });
  }

  render() {
    return (
      <View style={styles.all}>
        <StatusBar barStyle="dark-content" animated />
        <ScrollView>
          <View style={styles.list}>
            <Item
              name="照片水印"
              iconName="format-italic"
            >
              {'开关'}
            </Item>
            <Item
              name="连拍间隔"
              iconName="animation"
              onPress={this.openMultiPhotoIntervalPicker}
            >
              {`${this.state.multiPhotoInterval}ms`}
            </Item>
            <Item
              name="语言"
              iconName="translate"
            >
              {'中文'}
            </Item>
            <Item
              name="解锁所有功能"
              iconName="lock-open-outline"
            />
            <Item
              name="意见与反馈"
              iconName="message-text-outline"
              onPress={this.feedback}
            />
            <Item
              name="去评分"
              iconName="heart-outline"
              onPress={this.mark}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}>隐形相机</Text>
            <Text style={styles.infoText}>v1.0.0</Text>
            <Text style={styles.infoText}>Copyright © 2017-2018 WANGDAGEN</Text>
          </View>
        </ScrollView>
        <HeaderedSheet
          visible={this.state.multiPhotoIntervalPickerVisible}
          leftBtn="取消"
          rightBtn="确定"
          onPressLeftBtn={this.cancelMultiPhotoIntervalPicker}
          onPressRightBtn={this.confirmMultiPhotoIntervalPicker}
          onPressOverlay={this.cancelMultiPhotoIntervalPicker}
        >
          <Picker
            selectedValue={this.state.multiPhotoIntervalInPicker}
            onValueChange={this.onMultiPhotoIntervalPickerChange}
          >
            <Picker.Item label="500ms" value="500" />
            <Picker.Item label="1000ms" value="1000" />
          </Picker>
        </HeaderedSheet>
      </View>
    );
  }
}
