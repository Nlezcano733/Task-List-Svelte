<script>
  export let id, title, content, status;
</script>

<div class="bg-secondary text-light card-container row">
    <h1 class="card-title col-9">
      {title}
    </h1>

    <div class="col-3 card-buttons">
    <button 
    type="button" data-bs-toggle="collapse" 
      data-bs-target={"#card-detail-" + id}
      aria-expanded="false" 
      aria-controls={"card-detail-" + id}
    >
      <i class="fas fa-chevron-down" ></i>
    </button>
    <button>
      {#if status} 
      ✅
      {:else} 
      ❌
      {/if}
    </button>
    <button>
      🗑️
    </button>
  </div>
  <div class="collapse col-12" id={"card-detail-" + id}>
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
    margin-top: 0.5rem;
  }
  h1{
    font-size: 18px;
  }

  .card-buttons{
    display: flex;
    justify-content: end;
  }

  #card-detail {
    width: 100%;
  }
</style>