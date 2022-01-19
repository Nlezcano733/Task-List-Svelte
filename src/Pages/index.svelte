<script>
  import { onMount } from "svelte";
  import Navbar from "../components/Navbar.svelte";
  import Card from '../components/Card.svelte';
  import {addTask, getTasks} from '../firebase/firestore-crud';

  const initialTask = {
    title: "",
    content:"",
    status: "not_started"
  }

  /*
  optional data
    {
    id:"1",
    title:"Prueba de card",
    content:"Prueba de que funciona collapse",
    status:"not_started"
  }
  */
  let taskList = [{
    id:"1",
    title:"Prueba de card",
    content:"Prueba de que funciona collapse",
    status:"not_started"
  },
  {
    id:"2",
    title:"Prueba de card",
    content:"Prueba de que funciona collapse",
    status:"not_started"
  }
];
  let task = initialTask

  const HandleSubmit = async e => {
    const bodyPost = {
      ...task,
      created_date: new Date
    }
    // await addTask(bodyPost);
    document.querySelector('form').reset();
  }

  $: console.log("TASK",taskList)

  // onMount(async ()=> getTasks((tasks)=> taskList = [...tasks] ));

</script>

<Navbar />
<main class="container ">
  <div class="row">
  <section class="col-4 mt-4">
    <form class="text-light" on:submit|preventDefault={HandleSubmit}>

      <div class="mb-3">
        <label for="taskTitle" class="form-label">Task name</label>
        <input 
          type="text" 
          class="form-control" 
          id="taskTitle" 
          placeholder="Enter a task"
          bind:value={task.title}
        >
      </div>

      <div class="mb-3">
        <label for="taskContent" class="form-label">Content</label>
        <textarea 
          class="form-control" 
          id="taskContent" 
          placeholder="Enter a content"
          bind:value={task.content}
        ></textarea>
      </div>
      
      <button type="reset" class="btn btn-outline-primary">Reset</button>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </section>

  <section  class="col-8 ps-4 mt-4">
    {#each taskList as data}
      <Card
        id={data.id}
        title={data.title}
        content={data.content}
        status={data.status}
      />
    {:else}
      <p>No tasks listed</p>
    {/each}
  </section>

</div>

</main>

<style>
  textarea{
    width: 100%;
    height: 150px;
    resize: none;
  }
</style>