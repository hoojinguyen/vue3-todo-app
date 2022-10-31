<template>
  <form class="todo-form" @submit.prevent="submitForm">
    <input v-model="form.name" type="text" placeholder="Enter name" required />
    <input
      v-model="form.descripton"
      placeholder="Enter description"
      type="text"
      required
    />
    <button>
      {{ formType === "create" ? "Add new Item" : "Update Todo" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import type { TodoItem } from "@/stores/todo";
import { computed, ref } from "vue";

type FormType = "create" | "update";

const props = defineProps<{
  data: TodoItem | undefined;
}>();

const emits = defineEmits<{
  (e: "submit", value: { data: TodoItem; type: FormType }): void;
}>();

const formType = computed<FormType>(() => (props.data ? "update" : "create"));

const form = ref<TodoItem>(props.data || { id: "", name: "", descripton: "" });

const submitForm = () => {
  emits("submit", { data: form.value, type: formType.value });
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
