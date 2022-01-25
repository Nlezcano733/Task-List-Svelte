<script>
  import { createEventDispatcher } from "svelte";
  import { updateTask, deleteTask } from "../firebase/firestore-crud";

  export let id, title, content, status;

  const svelteDispatch = createEventDispatcher();

  const onEdit = () => {
    const newStatus = status === "not_started" ? "done" : "not_started";
    const response = updateTask(id, newStatus);
    // todo hacer bind de props hacia index
  };

  const onDelete = async () => {
    const response = deleteTask(id);

    const message = response
      ? "Task deleted correctly!"
      : "Something went wrong";

    svelteDispatch("message", {
      text: message,
    });
  };
</script>

<div
  class="{`text-light card-container row ${
    status === 'done' ? 'card-filter-done' : 'bg-secondary'
  }`}"
>
  <h1
    class="{`card-title col-9 ${
      status === 'done' ? 'text-decoration-line-through' : ''
    }`}"
  >
    {title}
  </h1>

  <div class="col-3 card-buttons">
    <button
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="{'#card-detail-' + id}"
      aria-expanded="false"
      aria-controls="{'card-detail-' + id}"
    >
      <i class="fas fa-chevron-down"></i>
    </button>

    <button on:click="{onEdit}">
      {#if status === "not_started"}
        ✅
      {:else}
        ❌
      {/if}
    </button>

    <button on:click="{onDelete}"> 🗑️ </button>
  </div>
  <div class="collapse col-12" id="{'card-detail-' + id}">
    <div class="card card-body">
      {content}
    </div>
  </div>
</div>

<style>
  .card-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.8rem;
    margin-top: 1rem;
    border-radius: 0.5rem;
  }

  .card-filter-done {
    filter: grayscale(0.5);
    background-color: #333;
  }

  h1 {
    font-size: 18px;
  }

  .card-buttons {
    display: flex;
    justify-content: end;
  }

  button {
    margin-left: 0.5rem;
    width: 2.5rem;
    border-radius: 0.3rem;
    background-color: #d3d3d3;
  }

  #card-detail {
    width: 100%;
  }
</style>
