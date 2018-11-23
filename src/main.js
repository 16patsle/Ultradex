/**
 * @license
 * Copyright 2018 Patrick Sletvold
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License from the attached LICENSE file or at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Buefy from "buefy/dist/buefy";
import "buefy/dist/buefy.css";
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
