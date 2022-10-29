<template>
  <div class="todo">
    <div class="wrapper">
      <h1 class="text-3xl font-bold underline">This is a todo page</h1>
      <div class="todo-form">
        <input type="text" placeholder="Enter name" v-model="form.name" />
        <input
          type="text"
          placeholder="Enter description"
          v-model="form.descripton"
        />
        <p v-show="messageError" class="message-error">{{ messageError }}</p>
        <button v-if="formType === 'create'" @click="formHandler.add()">
          Add new Item
        </button>
        <button v-else @click="formHandler.update()">Update Todo</button>
      </div>
      <div class="todo-list">
        <ol class="list-decimal" v-for="item in todoStore.list" :key="item.id">
          <li>
            <strong>ID: {{ item.id }}</strong>
            <h3>NAME: {{ item.name }}</h3>
            <span>DESC: {{ item.descripton }}</span>
            <button @click="formHandler.remove(item.id)">Remove</button>
            <button @click="formAction.swichType(item)">Edit</button>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore, type TodoItem } from "@/stores/todo";
import { uuid } from "@/utils";
import { ref } from "vue";

const initialForm = { id: "", name: "", descripton: "" };

type FormType = "create" | "update";

const form = ref<TodoItem>(initialForm);
const formType = ref<FormType>("create");
const messageError = ref("");

const todoStore = useTodoStore();

const formAction = {
  reset: () => {
    form.value = { id: "", name: "", descripton: "" };
    formType.value = "create";
  },
  swichType: (item: TodoItem, type: FormType = "update") => {
    form.value = { ...item };
    formType.value = type;
  },
  validate: () => {
    for (const [key, value] of Object.entries(form.value)) {
      if (key === "id") continue;

      if (!value) {
        messageError.value = `${key} should not be empty`;
        return false;
      }
    }

    return true;
  },
};

const formHandler = {
  add: () => {
    if (!formAction.validate()) return;

    todoStore.add({ ...form.value, id: uuid() });
    formAction.reset();
  },
  remove: (id: string) => {
    todoStore.remove(id);
  },
  update: () => {
    if (!formAction.validate()) return;

    todoStore.update(form.value);
    formAction.reset();
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .todo {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .todo-form {
    margin-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .todo-list {
    margin-top: 30px;
  }

  button {
    border: 1px solid black;
    padding: 5px;
    font-weight: bold;
  }

  input {
    border: 1px solid black;
    padding: 10px;
  }

  li {
    display: flex;
    flex-direction: column;
    gap: 15px;

    margin-bottom: 20px;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;

    cursor: pointer;
  }

  li:hover {
    border: 1px solid red;
  }

  .message-error {
    color: red;
    font-weight: bold;
    font-size: 24px;
  }
}
</style>
