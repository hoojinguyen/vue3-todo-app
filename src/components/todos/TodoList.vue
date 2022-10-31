<template>
  <div class="todo-list">
    <ol class="list-decimal" v-for="item in list" :key="item.id">
      <li>
        <strong>ID: {{ item.id }}</strong>
        <h3>NAME: {{ item.name }}</h3>
        <span>DESC: {{ item.descripton }}</span>
        <button @click="$emit('remove', item.id)">Remove</button>
        <button @click="$emit('update', item)">Edit</button>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem, TodoList } from "@/stores/todo";

defineProps<{
  list: TodoList;
}>();

defineEmits<{
  (e: "remove", id: string): void;
  (e: "update", value: TodoItem): void;
}>();
</script>

<style scoped>
.todo-list {
  margin-top: 30px;
}

button {
  border: 1px solid black;
  padding: 5px;
  font-weight: bold;
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
</style>
