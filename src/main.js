import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Buefy from "buefy";
import "buefy/lib/buefy.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWeightHanging,
  faArrowsAltV,
  faFeatherAlt,
  faShieldAlt,
  faBolt,
  faHeart,
  faCaretDown,
  faCaretRight
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([
  faWeightHanging,
  faArrowsAltV,
  faFeatherAlt,
  faShieldAlt,
  faBolt,
  faHeart,
  faCaretDown,
  faCaretRight
]);

Vue.component("fa-icon", FontAwesomeIcon);

Vue.use(Buefy);

Vue.config.productionTip = false;

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("titlecase", function(value) {
  if (!value) return "";
  value = value.toString();
  value = value.split(" ");
  const newValue = [];
  value.forEach(val => {
    newValue.push(val.charAt(0).toUpperCase() + val.slice(1));
  });
  return newValue.join(" ");
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
