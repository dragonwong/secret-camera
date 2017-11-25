import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigator from './src/pages';

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default class App extends React.Component {
  state = {
    assetsAreLoaded: false,
  };

  componentWillMount() {
    this.loadAssetsAsync();
  }
  async loadAssetsAsync() {
    try {
      await Promise.all([
        // Asset.loadAsync([
        //   require('./assets/images/robot-dev.png'),
        //   require('./assets/images/robot-prod.png'),
        // ]),
        // Font.loadAsync([
        //   // This is the font that we are using for our tab bar
        //   Ionicons.font,
        //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
        //   // to remove this if you are not using it in your app
        //   { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        // ]),
      ]);
    } catch (e) {
      // In this case, you might want to report the error to your error
      // reporting service, for example Sentry
      console.warn(
        'There was an error caching assets (see: App.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e);
    } finally {
      this.setState({ assetsAreLoaded: true });
    }
  }

  render() {
    if (!this.state.assetsAreLoaded && !this.props.skipLoadingScreen) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        {
          isIOS ? (
            <StatusBar barStyle="light-content" />
          ) : (
            <View style={styles.statusBarUnderlay} />
            )
        }
        <RootNavigator />
      </View>
    );
  }
}
