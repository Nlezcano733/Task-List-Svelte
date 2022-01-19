<script>
  export let projects = []
</script>

<header class="navbar bg-secondary py-2">
  <nav class="container flex justify-content-between">
    <h1 class="navbar-brand text-white">To do - Svelte</h1>
    <div>
      <select class="form-select bg-secondary" aria-label="Default select example">
        <option>Select a project</option>
        {#each projects as project}
          <option value={project} class="text-capitalize"> {project} </option>
        {/each}
      </select>
      <i class="fas fa-sign-out-alt"></i>
    </div>
    </nav>
  </header>
  
<style>
  div{
    display: flex;
    align-items: center;
    width: fit-content;
  }

  select {
    color: white;
    border: none;
    outline: none;
    border-radius: 0px;
    border-bottom: 1px solid #d1d1d1;
  }
  
  select:focus {
    box-shadow: none;
    border-bottom: 1px solid #fafafa;
  }

  i{
    font-size: 20px;
    color: white;
    margin-left: 30px;
    transition: all 0.2s linear;
  }

  i:hover {
    color: #492;
  }
</style>