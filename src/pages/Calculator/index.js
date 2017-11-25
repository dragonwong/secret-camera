import React from 'react';
import {
  Text,
  View,
  CameraRoll,
} from 'react-native';
import {
  Camera,
  Permissions,
} from 'expo';
import autobind from 'autobind-decorator';
// https://expo.github.io/vector-icons/
import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
  BUTTON_COLOR_MAP,
} from '../../constant/styles.js';
import Button from './Button';
import styles from './styles.js';

export default class Calculator extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    brightnessLevel: 5,
    monitorText: '',
    hasCameraPermission: null,
    // 摄像头方向
    cameraType: Camera.Constants.Type.back,
    // 是否是隐蔽模式
    secretMode: false,
    // 拍摄模式：1. PHOTO 拍照；2. CAMERA 摄影；3. MULTI_PHOTO 连拍
    shootMode: 'PHOTO',
    // 在非拍照的拍摄模式下，是否处理拍摄中
    isShooting: false,
    // 是否展示预览
    showPreview: true,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  setStateSafely(attr, value) {
    if (this.state[attr] !== value) {
      this.setState({
        [attr]: value,
      });
    }
  }

  @autobind
  getCamera(el) {
    this.camera = el;
  }

  @autobind
  openSetting() {
    this.props.navigation.navigate('Setting');
  }

  @autobind
  onPress0() {
    this.addMonitorText(0);
    this.shoot();
  }
  @autobind
  onPress1() {
    this.addMonitorText(1);
  }
  @autobind
  onPress2() {
    this.addMonitorText(2);
  }
  @autobind
  onPress3() {
    this.addMonitorText(3);
    this.setPreviewDarker();
  }
  @autobind
  onPress4() {
    this.addMonitorText(4);
  }
  @autobind
  onPress5() {
    this.addMonitorText(5);
  }
  @autobind
  onPress6() {
    this.addMonitorText(6);
    this.setPreviewLighter();
  }
  @autobind
  onPress7() {
    this.addMonitorText(7);
  }
  @autobind
  onPress8() {
    this.addMonitorText(8);
  }
  @autobind
  onPress9() {
    this.addMonitorText(9);
  }

  // 显示屏追加文字
  addMonitorText(text) {
    this.setState({
      monitorText: `${this.state.monitorText}${text}`,
    });
  }
  // 显示屏清空文字
  @autobind
  claerMonitorText() {
    this.setState({
      monitorText: '',
    });
  }


  // 预览亮度变暗
  setPreviewDarker() {
    if (this.state.brightnessLevel < 9) {
      this.setState({
        brightnessLevel: this.state.brightnessLevel + 1,
      });
    }
  }
  // 预览亮度变亮
  setPreviewLighter() {
    if (this.state.brightnessLevel > 0) {
      this.setState({
        brightnessLevel: this.state.brightnessLevel - 1,
      });
    }
  }

  switchShootMode(mode) {
    if (!this.state.isShooting) {
      this.setStateSafely('shootMode', mode);
    }
  }
  @autobind
  setShootModeToPhoto() {
    this.switchShootMode('PHOTO');
  }
  @autobind
  setShootModeToCamera() {
    this.switchShootMode('CAMERA');
  }
  @autobind
  setShootModeToMultiPhoto() {
    this.switchShootMode('MULTI_PHOTO');
  }

  @autobind
  switchSecretMode() {
    this.setState({
      secretMode: !this.state.secretMode,
    });
  }
  @autobind
  switchShowPreview() {
    this.setState({
      showPreview: !this.state.showPreview,
    });
  }
  @autobind
  switchCameraType() {
    this.setState({
      cameraType: this.state.cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }

  shoot() {
    switch (this.state.shootMode) {
      case 'PHOTO':
        this.takePhoto();
        break;
      case 'CAMERA':
        this.takeVideo();
        break;
      case 'MULTI_PHOTO':
        this.takeMultiPhoto();
        break;
      default:
        break;
    }
  }

  // 拍照
  async takePhoto() {
    const photo = await this.camera.takePictureAsync();
    CameraRoll.saveToCameraRoll(photo.uri);
  }
  // 连拍
  takeMultiPhoto() {
    if (this.state.isShooting) {
      this.stopTakeMultiPhoto();
    } else {
      this.startTakeMultiPhoto();
    }
  }
  // 连拍：开始
  startTakeMultiPhoto() {
    this.setState({
      isShooting: true,
    });
    this.takeMultiPhotoIntervalId = setInterval(() => {
      this.takePhoto();
    }, 1000);
  }
  // 连拍：结束
  stopTakeMultiPhoto() {
    this.setState({
      isShooting: false,
    });
    clearInterval(this.takeMultiPhotoIntervalId);
  }
  // 摄影
  takeVideo() {
    if (this.state.isShooting) {
      this.stopTakeVideo();
    } else {
      this.startTakeVideo();
    }
  }
  // 摄影：开始
  startTakeVideo() {
    this.setState({
      isShooting: true,
    });
    this.camera.recordAsync().then((res) => {
      CameraRoll.saveToCameraRoll(res.uri);
    }, (res) => {
      // TODO: 拍摄失败处理
      console.log('fail', res);
    });
  }
  // 摄影：结束
  stopTakeVideo() {
    this.setState({
      isShooting: false,
    });
    this.camera.stopRecording();
  }

  render() {
    const {
      secretMode,
      shootMode,
      showPreview,
      isShooting,
      hasCameraPermission,
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    // 拍摄模式
    // 文字提示
    let shootModeText = '';
    // 按钮选中状态
    let photoColorType = 'yellow';
    let cameraColorType = 'yellow';
    let multiPhotoColorType = 'yellow';

    switch (shootMode) {
      case 'PHOTO':
        photoColorType = 'white';
        shootModeText = '拍照';
        break;
      case 'CAMERA':
        cameraColorType = 'white';
        shootModeText = '摄像';
        break;
      case 'MULTI_PHOTO':
        multiPhotoColorType = 'white';
        shootModeText = '连续拍照';
        break;
      default:
        break;
    }

    // 镜头方向
    const cameraTypeText = this.state.cameraType === Camera.Constants.Type.back
      ? '前置' : '后置';

    return (
      <View style={styles.all}>
        <View style={styles.monitor}>
          {
            secretMode ? (
              <View style={styles.info} />
            ) : (
              <View style={styles.info}>
                <Text style={styles.infoText}>拍摄模式：{shootModeText}</Text>
                <Text style={styles.infoText}>摄像头状态：{isShooting ? '使用中' : '等待'}</Text>
                <Text style={styles.infoText}>摄像头调用：{cameraTypeText}</Text>
                <Text style={styles.infoText}>镜头预览：{showPreview ? '开' : '关'}</Text>
              </View>
            )
          }
          {
            showPreview ? (
              <View style={styles.preview}>
                <Camera
                  style={styles.previewCamera}
                  type={this.state.cameraType}
                  ref={this.getCamera}
                />
                <View style={[styles.previewOverlay, styles[`brightness${this.state.brightnessLevel}`]]} />
              </View>
            ) : null
          }
        </View>
        <View style={styles.screen}>
          <Text
            style={styles.resultText}
            numberOfLines={1}
          >{this.state.monitorText}</Text>
        </View>
        <View style={styles.keyboard} >
          <View style={styles.line}>
            <Button
              type="grey"
              style={styles.button}
              onPress={this.claerMonitorText}
            >
              AC
            </Button>
            <Button
              type="grey"
              style={styles.button}
              onPress={this.flip}
            >
              <MaterialCommunityIcons
                name={secretMode ? 'contrast' : 'ghost'}
                size={32}
                style={styles.iconFont}
              />
              {
                // incognito eye-off
              }
            </Button>
            <Button
              type="grey"
              style={styles.button}
              onPress={this.switchSecretMode}
            >
              {
                secretMode ? (
                  '%'
                ) : (
                  <MaterialCommunityIcons
                    name="calculator"
                    size={32}
                    style={styles.iconFont}
                  />
                )
              }
            </Button>
            <Button
              type="yellow"
              style={styles.button}
              onPress={this.openSetting}
            >
              <MaterialCommunityIcons
                name={secretMode ? 'division' : 'settings'}
                size={32}
                color="white"
                style={styles.iconFont}
              />
            </Button>
          </View>
          <View style={styles.line}>
            <Button
              style={styles.button}
              onPress={this.onPress7}
            >
              7
            </Button>
            <Button
              style={styles.button}
              onPress={this.onPress8}
            >
              8
            </Button>
            <Button
              style={styles.button}
              onPress={this.onPress9}
            >
              9
            </Button>
            <Button
              type={photoColorType}
              style={styles.button}
              onPress={this.setShootModeToPhoto}
            >
              <MaterialCommunityIcons
                name={secretMode ? 'close' : 'camera'}
                size={32}
                color={BUTTON_COLOR_MAP[photoColorType].textColor}
                style={styles.iconFont}
              />
            </Button>
          </View>
          <View style={styles.line}>
            <Button
              style={styles.button}
              onPress={this.onPress4}
            >
              4
            </Button>
            <Button
              style={styles.button}
              onPress={this.onPress5}
            >
              5
            </Button>
            <Button
              style={styles.button}
              onPress={this.onPress6}
            >
              {
                secretMode ? (
                  '6'
                ) : (
                  <MaterialCommunityIcons
                    name="lightbulb"
                    size={32}
                    style={styles.iconFont}
                    color="white"
                  />
                )
              }
            </Button>
            <Button
              type={cameraColorType}
              style={styles.button}
              onPress={this.setShootModeToCamera}
            >
              <MaterialCommunityIcons
                name={secretMode ? 'minus' : 'camcorder'}
                size={32}
                color={BUTTON_COLOR_MAP[cameraColorType].textColor}
                style={styles.iconFont}
              />
            </Button>
          </View>
          <View style={styles.line}>
            <Button
              style={styles.button}
              onPress={this.onPress1}
            >
              1
            </Button>
            <Button
              style={styles.button}
              onPress={this.onPress2}
            >
              2
            </Button>
            <Button
              style={styles.button}
              onPress={this.onPress3}
            >
              {
                secretMode ? (
                  '3'
                ) : (
                  <MaterialCommunityIcons
                    name="lightbulb-outline"
                    size={32}
                    style={styles.iconFont}
                    color="white"
                  />
                )
              }
            </Button>
            <Button
              type={multiPhotoColorType}
              style={styles.button}
              onPress={this.setShootModeToMultiPhoto}
            >
              <MaterialCommunityIcons
                name={secretMode ? 'plus' : 'animation'}
                size={32}
                color={BUTTON_COLOR_MAP[multiPhotoColorType].textColor}
                style={styles.iconFont}
              />
            </Button>
          </View>
          <View style={styles.line}>
            <Button
              style={[styles.button, styles.bigButton]}
              onPress={this.onPress0}
            >
              {
                secretMode ? (
                  '0'
                ) : (
                  <MaterialCommunityIcons
                    name={isShooting ? 'stop-circle-outline' : 'radiobox-marked'}
                    size={40}
                    color={isShooting ? 'rgb(226, 70, 61)' : 'white'}
                    style={styles.iconFont}
                  />
                  )
              }
            </Button>
            <Button
              style={styles.button}
              onPress={this.switchShowPreview}
            >
              {
                secretMode ? (
                  '.'
                ) : (
                  <MaterialCommunityIcons
                    name="account-box"
                    size={32}
                    color="white"
                    style={styles.iconFont}
                  />
                )
              }
            </Button>
            <Button
              type="yellow"
              style={styles.button}
              onPress={this.switchCameraType}
            >
              <MaterialCommunityIcons
                name={secretMode ? 'equal' : 'rotate-3d'}
                size={32}
                color="white"
                style={styles.iconFont}
              />
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
