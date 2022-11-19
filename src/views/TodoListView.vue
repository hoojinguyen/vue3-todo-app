<template>
  <template v-if="isLoggedIn">
    <div class="flex flex-col justify-center items-center pt-10">
      <h1 class="font-bold text-3xl">Todo List App</h1>
      <div class="mt-10">
        <label
          for="default-toggle"
          class="inline-flex relative items-center cursor-pointer"
        >
          <span
            class="mr-3 text-lg font-bold"
            :class="[
              isLoadFromLocal
                ? 'text-green-500 dark:text-gray-300'
                : 'text-gray-500 dark:text-gray-300',
            ]"
            >Use Local
          </span>
          <input
            type="checkbox"
            value=""
            id="default-toggle"
            class="sr-only peer"
            @change="toogleLoadDataMode"
          />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
          ></div>
          <span
            class="ml-3 text-lg font-bold"
            :class="[
              !isLoadFromLocal
                ? 'text-green-500 dark:text-gray-300'
                : 'text-gray-500 dark:text-gray-300',
            ]"
            >Use ThinBackend
          </span>
        </label>
      </div>

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
import { useTodoThinBackend } from "@/composables/thin-backend";
import { EStore } from "@/constants";
import { useTodoStore } from "@/stores/todo";
import type { IStore, ITodo } from "@/types";
import { sleep } from "@/utils";
import { computed, ref } from "vue";

const { isLoggedIn } = useAuth();
const todoLocal = useTodoStore();
const todoThinBackend = useTodoThinBackend();

const loadDataFrom = ref<IStore>(EStore.LOCAL);

const isLoadFromLocal = computed(() => loadDataFrom.value === EStore.LOCAL);
const todos = computed(() =>
  loadDataFrom.value === EStore.LOCAL
    ? todoLocal.todos
    : todoThinBackend.todos.value
);

const toogleLoadDataMode = (e: any) => {
  loadDataFrom.value = e.target.checked ? EStore.THIN : EStore.LOCAL;
};

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

    if (isLoadFromLocal.value) {
      todoLocal.add({ name: taskName.value });
    } else {
      await todoThinBackend.add({ name: taskName.value });
    }

    taskName.value = "";
  },
  updateTask: async (todo: ITodo, isChecked = false) => {
    if (isLoadFromLocal.value) {
      todoLocal.update(todo);
    } else {
      await todoThinBackend.update(todo);
    }

    if (!isChecked) {
      toggleUpdate(todo.id);
    }
  },
  deleteTask: async (id: string) => {
    if (isLoadFromLocal.value) {
      todoLocal.deleteById(id);
    } else {
      await todoThinBackend.deleteById(id);
    }
  },
};
</script>
