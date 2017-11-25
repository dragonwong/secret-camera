/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const Router = {
  initialRoute: null,
  navigation: null,
  pages: {},
  register(name, component) {
    if (name in Router.pages) {
      // wait for YellowBox
      setTimeout(() => {
        console.warn(`[Router] Page name '${name}' has been registered.`);
      });
    }
    Router.pages[name] = component;
  },
  open(name) {
    if (!Router.navigation) {
      return;
    }
    Router.navigation.navigate(name);
  },
  back() {
    Router.navigator.pop();
  },
};

export default Router;
