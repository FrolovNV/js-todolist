<template>
  <div class="task-list-container">
    <h2>Todo List</h2>

    <div class="task-input-panel">
      <input type="text" v-model="inputData" placeholder="Введите новую задачу" @keyup.enter="add">
      <button @click="add">Добавить задачу</button>
    </div>

    <table class="task-table">
      <tbody>
        <tr v-for="(task, index) in tasks" :key="task.id">
          <td>
            <label class="task-checkbox">
              <input type="checkbox" v-model="task.completed" @click="handleCompleteTask(task)">
            </label>
          </td>
          <td :class="{ 'is-completed': task.completed }">{{ task.task }}</td>
          <td>
            <button @click="handleDelete(task)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>

class Task {
  id: number;
  task: string;
  due_date: Date;
  completed: boolean;

  constructor(id: number, task: string, due_date: Date, completed: boolean) {
    this.id = id;
    this.task = task;
    this.due_date = due_date;
    this.completed = completed;
  }
}

const inputData = ref("");
let tasks: Ref<Array<Task>> = ref(await $fetch('/api/readTasks'));

async function add() {
  const val: Task = await $fetch('/api/ultraapi', {
    method: 'post',
    body: { text: inputData.value }
  });
  const obj = { id: val.id, task: val.task, due_date: val.due_date, completed: val.completed };
  if (obj != null) {
    tasks.value.push(obj);
  }
  inputData.value = "";
}

function formatDate(date: Date): string {
  if (date == null) {
    return "";
  }
  return date.toString().replace('-', '.').split('T')[0].replace('-', '.');
}

async function handleDelete(task: Task) {
  await $fetch("/api/deleteTask", {
    method: 'post',
    body: { id: task.id }
  })
  tasks.value = tasks.value.filter(item => item.id != task.id);
}

async function handleCompleteTask(task: Task) {
  await $fetch("/api/completeTask", {
    method: 'post',
    body: { id: task.id, completed: !task.completed }
  });
}

</script>

<style scoped>
.task-list-container {
  padding: 1em;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  /* Border around the entire table */
  border-radius: 4px;
  /* Optional: rounded corners for the table */
  overflow: hidden;
  /* To ensure the border-radius clips the content */
}

.task-table td {
  padding: 0.5em;
  /* Remove the border-bottom property that was here previously */
}

.task-table tr:first-child td {
  border-top: none;
}

.task-table tr td:first-child {
  border-left: none;
}

.task-table tr td:last-child {
  border-right: none;
}

/* Style for input panel */
.task-input-panel {
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
}

.task-input-panel input {
  flex-grow: 1;
  /* Input field takes up the remaining space */
  padding: 0.5em;
  margin-right: 0.5em;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.task-input-panel button {
  padding: 0.5em 1em;
  background-color: #6200ea;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.task-input-panel button:hover {
  background-color: #7f39fb;
}

/* Add this to remove the outline around the input when it is focused */
.task-input-panel input:focus {
  outline: none;
  border-color: #6200ea;
}

.task-mark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 1px solid #000;
}

/* .task-checkbox input:checked~.task-mark {
  background-color: #6200ea;
} */

.task-mark:after {
  content: "";
  position: absolute;
  display: none;
}

.task-checkbox input:checked~.task-mark:after {
  display: block;
}

.task-mark:after {
  left: 7px;
  top: 3px;
  width: 6px;
  height: 11px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

a {
  color: #6200ea;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.is-completed {
  text-decoration: line-through;
  color: #aaa;
}
</style>