<script setup lang="ts">
import { createRecord, query, updateRecord } from "thin-backend";
import { useQuery } from "thin-backend-vue";

export interface Todo {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isFinish: boolean;
}

const todos: any = useQuery(query("todos").orderBy("createdAt"));

function updateTask(todo: Todo) {
  updateRecord("todos", todo.id, { name: window.prompt("New title") || "" });
}

function addTask() {
  createRecord("todos", {
    name: window.prompt("Title:") || "",
  });
}
</script>

<template>
  <div>
    <div
      v-for="(todo, index) in todos"
      :key="index"
      v-on:dblclick="updateTask(todo)"
    >
      {{ todo.name }}
    </div>

    <button v-on:click="addTask()">Add Task</button>
  </div>
</template>
