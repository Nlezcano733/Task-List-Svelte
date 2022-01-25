<script>
  import { onMount } from "svelte";
  import Navbar from "../components/Navbar.svelte";
  import Card from "../components/Card.svelte";
  import {
    addTask,
    getTasks,
    deleteCollection,
  } from "../firebase/firestore-crud";

  const initialTask = {
    title: "",
    content: "",
    status: "not_started",
  };

  let currentUser;
  let taskList = [];
  let task = initialTask;
  let finishedList = false;

  const HandleSubmit = async () => {
    const bodyPost = {
      ...task,
      uid: currentUser,
      created_date: new Date(),
    };
    await addTask(bodyPost);
    document.querySelector("form").reset();
  };

  onMount(async () => {
    const dataUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (dataUser) {
      currentUser = dataUser.user?.uid;
      getTasks((tasks) => (taskList = [...tasks]), currentUser);
    }
  });

  $: {
    const actualList = taskList.map((t) => t?.status);
    if (actualList.length > 0 && actualList.every((t) => t === "done")) {
      finishedList = true;
    } else {
      finishedList = false;
    }
  }

  const handleMessage = (event) => {
    alert(event.detail.text);
  };
</script>

<Navbar />
<main class="container ">
  <div class="row">
    <section class="col-4 mt-4">
      <form class="text-light" on:submit|preventDefault="{HandleSubmit}">
        <div class="mb-3">
          <label for="taskTitle" class="form-label">Task name</label>
          <input
            type="text"
            class="form-control"
            id="taskTitle"
            placeholder="Enter a task"
            bind:value="{task.title}"
          />
        </div>

        <div class="mb-3">
          <label for="taskContent" class="form-label">Content</label>
          <textarea
            class="form-control"
            id="taskContent"
            placeholder="Enter a content"
            bind:value="{task.content}"></textarea>
        </div>

        <button type="reset" class="btn btn-outline-primary">Reset</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </section>

    <section class="col-8 ps-4 mt-4">
      {#each taskList as data}
        <Card {...data} on:message="{handleMessage}" />
      {:else}
        <p class="text-center text-white mt-5">No tasks listed</p>
      {/each}
      {#if finishedList}
        <button class="btn btn-primary" on:click="{deleteCollection}">
          Delete list
        </button>
      {/if}
    </section>
  </div>
</main>

<style>
  textarea {
    width: 100%;
    height: 150px;
    resize: none;
  }
</style>
