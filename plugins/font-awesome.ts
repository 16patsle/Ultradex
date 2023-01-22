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
  faGlobe,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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
  faTimes,
  faGlobe
);

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-expect-error Types for FontAwesomeIcon are indeed compatible
  nuxtApp.vueApp.component("fa-icon", FontAwesomeIcon);
});
