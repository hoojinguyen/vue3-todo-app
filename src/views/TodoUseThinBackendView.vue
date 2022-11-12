<template>
  <template v-if="isLoggedIn">
    <div class="flex flex-col justify-center items-center">
      <button
        class="border-solid border-2 px-10 py-3 border-red-500 rounded-xl font-bold text-lg hover:bg-red-500 hover:text-white"
        @click="logout"
      >
        LOGOUT
      </button>
    </div>
    <div class="flex flex-col justify-center items-center pt-10">
      <h1 class="font-bold text-3xl">Todo App use ThinBackend</h1>
      <div class="w-full text-center mt-10">
        <input
          class="w-3/5 border-solid rounded-lg border-2 border-slate-500 p-5 text-lg focus:outline-none focus:border-green-500 focus:ring-green-500 peer"
          type="text"
          placeholder="Please enter the todo"
          v-model="taskName"
          @keyup.enter="addTask"
        />
      </div>
      <div class="w-full mt-5 flex flex-col justify-center items-center gap-4">
        <div
          v-for="todo in todos"
          :key="todo.id"
          class="inline-block w-3/5 p-5 border-2 border-solid border-slate-400 rounded-xl"
        >
          <div class="float-left flex justify-start items-center gap-10">
            <input
              type="checkbox"
              class="accent-green-800 w-8 h-8"
              :checked="todo.isFinish"
            />
            <label
              class="text-lg font-semibold"
              :class="{ 'line-through decoration-slate-500': todo.isFinish }"
            >
              {{ todo.name }}
            </label>
          </div>
          <div class="float-right">
            <button>DELETE</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="h-full flex flex-col justify-center items-center">
      <h1 class="mb-10 font-bold text-2xl tracking-wide">
        You need login to access data from thin backend
      </h1>
      <button
        class="border-solid border-2 px-10 py-3 border-red-500 rounded-xl font-bold text-lg hover:bg-red-500 hover:text-white"
        @click="login"
      >
        LOGIN
      </button>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/auth";
import { createRecord, query, updateRecord } from "thin-backend";
import { useQuery } from "thin-backend-vue";
import { ref } from "vue";

export interface Todo {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isFinish: boolean;
}

const { isLoggedIn, login, logout } = useAuth();

const todos = useQuery(query("todos").orderBy("createdAt"));

const taskName = ref("");

const updateTask = (todo: Todo) => {
  updateRecord("todos", todo.id, { name: taskName.value });
};

const addTask = async () => {
  if (!taskName.value) return;
  await createRecord("todos", { name: taskName.value });
  taskName.value = "";
};
</script>
