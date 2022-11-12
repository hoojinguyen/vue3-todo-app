<template>
  <form class="todo-form" @submit.prevent="submitForm">
    <input v-model="form.name" type="text" placeholder="Enter name" required />
    <button>
      {{ form.id ? "Update Item" : "Add new Item" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { useTodoStore, type TodoItem } from "@/stores/todo";
import { ref, watch } from "vue";
import { uuid } from "@/utils";

const props = defineProps<{
  data: TodoItem;
}>();

const emit = defineEmits<{
  (e: "reset"): void;
}>();

const todoStore = useTodoStore();

const form = ref<TodoItem>(props.data);

watch(
  () => props.data,
  (newValue) => (form.value = newValue)
);

const submitForm = () => {
  const { value } = form;
  if (value.id) {
    todoStore.update(value);
  } else {
    todoStore.add({ ...value, id: uuid() });
  }

  emit("reset");
};
</script>

<style scoped>
.todo-form {
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

input {
  border: 1px solid black;
  padding: 10px;
}

button {
  border: 1px solid black;
  padding: 5px;
  font-weight: bold;
}
</style>
