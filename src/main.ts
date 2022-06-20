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
import { createApp } from "vue";
import { createPinia } from "pinia";

import { Collapse, Loading, Notification } from "@oruga-ui/oruga-next";
import { bulmaConfig } from "@oruga-ui/theme-bulma";
import "@oruga-ui/theme-bulma/dist/bulma.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWeightHanging,
  faArrowsAltV,
  faFeatherAlt,
  faShieldAlt,
  faBolt,
  faHeart,
  faCaretDown,
  faCaretRight,
  faBars,
  faTimes,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import App from "./App.vue";
import { router } from "./router";
import "./registerServiceWorker";

library.add(
  faWeightHanging,
  faArrowsAltV,
  faFeatherAlt,
  faShieldAlt,
  faBolt,
  faHeart,
  faCaretDown,
  faCaretRight,
  faBars,
  faTimes
);

const app = createApp(App)
  .use(createPinia())
  .use(router)
  .component("fa-icon", FontAwesomeIcon)
  .use(Collapse, bulmaConfig)
  .use(Loading, bulmaConfig)
  .use(Notification, bulmaConfig)
  .component("RecycleScroller", RecycleScroller);

app.mount("#app");
