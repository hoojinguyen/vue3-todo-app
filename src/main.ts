import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/styles/base.css";
import "./assets/styles/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

library.add(faTrashCan, faPen, faGithub);

app.use(createPinia());
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
