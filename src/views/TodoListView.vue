<template>
  <template v-if="isLoggedIn">
    <div class="flex flex-col justify-center items-center pt-10">
      <h1 class="font-bold text-3xl">Todo App use ThinBackend</h1>
      <div class="w-full text-center mt-10">
        <input
          class="w-3/5 border-solid rounded-lg border-2 border-slate-500 p-5 text-lg focus:outline-none focus:border-green-500 focus:ring-green-500 peer"
          type="text"
          placeholder="Please enter the todo"
          v-model="taskName"
          @keyup.enter="handler.addTask"
        />
      </div>
      <div class="w-full mt-5 flex flex-col justify-center items-center gap-4">
        <div
          v-for="(todo, index) in todos"
          :key="todo.id"
          class="inline-block w-3/5 p-5 border-2 border-solid border-slate-400 rounded-xl hover:bg-slate-100 hover:cursor-pointer"
        >
          <div class="float-left flex justify-start items-center gap-10">
            <input
              type="checkbox"
              class="accent-green-800 w-8 h-8"
              v-model="todo.isFinish"
              @change="handler.updateTask(todo, true)"
            />
            <input
              ref="inputUpdateRefs"
              :class="{
                'disabled:line-through disabled:decoration-red-500':
                  todo.isFinish,
              }"
              class="text-2xl font-semibold bg-inherit w-full focus:outline-none pb-1 border-b-2 border-green-500 disabled:border-none"
              type="text"
              v-model="todo.name"
              @keyup.enter="handler.updateTask(todo)"
              :disabled="todo.id !== idUpdating"
            />
          </div>
          <div class="float-right mt-2 flex gap-3">
            <button
              class="text-lg hover:text-red-500"
              @click="toggleUpdate(todo.id, index)"
            >
              <font-awesome-icon icon="fa-solid fa-pen" />
            </button>
            <button
              class="text-lg hover:text-red-500"
              @click="handler.deleteTask(todo.id)"
            >
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </button>
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
    </div>
  </template>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/auth";
import { useTodo, type ITodo } from "@/composables/todo";
import { sleep } from "@/utils";
import { ref } from "vue";

const { isLoggedIn, login, logout } = useAuth();
const { todos, add, update, deleteById } = useTodo();

const taskName = ref("");
const idUpdating = ref("");
const inputUpdateRefs = ref<HTMLInputElement[]>([]);

const toggleUpdate = async (id: string, index?: number) => {
  idUpdating.value = idUpdating.value === id ? "" : id;

  // This act update value for idUpdating field and enable input and need async function here to work correctly
  await sleep(0);

  if (index !== undefined) {
    inputUpdateRefs.value[index].focus();
  }
};

const handler = {
  addTask: async () => {
    if (!taskName.value) return;
    await add({ name: taskName.value });
    taskName.value = "";
  },
  updateTask: async (todo: ITodo, isChecked = false) => {
    await update(todo);
    if (!isChecked) {
      toggleUpdate(todo.id);
    }
  },
  deleteTask: async (id: string) => {
    await deleteById(id);
  },
};
</script>
