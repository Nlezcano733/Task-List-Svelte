<script>
  import { onMount } from "svelte";
  import Navbar from "../components/Navbar.svelte";
  import Card from "../components/Card.svelte";
  import Toaster from "../components/Toster.svelte";
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
  let toasterProps = {
    msg: "",
    bg: "",
    show: false,
  };

  let currentUser;
  let taskList = [];
  let task = initialTask;
  let finishedList = false;

  const settingToaster = (msgIn, bgIn) => {
    toasterProps = {
      msg: msgIn,
      bg: bgIn ? "success" : "danger",
      show: true,
    };
  };

  const HandleSubmit = async () => {
    const bodyPost = {
      ...task,
      uid: currentUser,
      created_date: new Date(),
    };
    try {
      await addTask(bodyPost);
      document.querySelector("form").reset();
      settingToaster("Task added correctly", true);
    } catch (e) {
      settingToaster("Error in submit");
      console.error(e.message);
    }
  };

  const HandleDelete = async () => {
    try {
      deleteCollection(currentUser);
      settingToaster("Task list deleted correctly", true);
    } catch (e) {
      console.error(e);
      settingToaster("Error on deleting task list");
    }
  };

  onMount(async () => {
    const dataUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (dataUser) {
      currentUser = dataUser.user?.uid;
      getTasks((tasks) => (taskList = [...tasks]), currentUser);
    } else {
      window.location.href = "/login";
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
</script>

<svelte:head>
  <title>Todo Svelte</title>
</svelte:head>
<Navbar />
{#if currentUser}
  <main class="container ">
    <div class="row">
      <section class="col-12 col-md-5 col-lg-4 mt-4">
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
          <div class="ms-sm-1 row gap-2">
            <button
              type="reset"
              class="col-12 col-sm-4 btn btn-outline-primary"
            >
              Reset
            </button>
            <button type="submit" class="col-12 col-sm-4 btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </section>

      <section class="col-12 col-md-7 col-lg-8 ps-4 mt-4">
        {#each taskList as data}
          <Card
            {...data}
            on:message="{() => settingToaster('Task deleted correctly', true)}"
            on:error="{() => settingToaster('Error on deleting task')}"
          />
        {:else}
          <p class="text-center text-white mt-5">No tasks listed</p>
        {/each}

        {#if finishedList}
          <div class="row">
            <button
              class="btn btn-primary col-12 mt-4"
              on:click="{HandleDelete}"
            >
              Delete list
            </button>
          </div>
        {/if}
      </section>
    </div>
  </main>
{/if}
<Toaster {...toasterProps} />

<style>
  textarea {
    width: 100%;
    height: 150px;
    resize: none;
  }
</style>
