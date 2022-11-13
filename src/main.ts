import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "./assets/style.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { initThinBackend } from "thin-backend";

const app = createApp(App);

library.add(faTrashCan, faPen);

app.use(createPinia());
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");

initThinBackend({
  host: "https://todo-with-vue3.thinbackend.app",
});
