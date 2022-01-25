<script>
  export let msg, bg, show;

  $: if (show === true) {
    setTimeout(() => {
      show = false;
    }, 3000);
  }
</script>

<div
  style="{`display: ${show && 'block'};`}"
  class="{`toast align-items-center bg-${bg} text-white position-absolute bottom-0 end-0 mb-4 me-5`}"
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
>
  <div class="d-flex">
    <div class="toast-body">
      {msg}
    </div>
    <button
      type="button"
      class="btn-close text-white me-2 m-auto"
      data-bs-dismiss="toast"
      aria-label="Close"></button>
  </div>
</div>
