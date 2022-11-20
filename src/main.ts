import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/styles/main.css";
import "./assets/styles/base.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { initThinBackend } from "thin-backend";

const app = createApp(App);

library.add(faTrashCan, faPen, faGithub);

app.use(createPinia());
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");

initThinBackend({
  host: "https://todo-with-vue3.thinbackend.app",
});
