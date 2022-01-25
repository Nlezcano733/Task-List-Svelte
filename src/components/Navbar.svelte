<script>
  import { signOut } from "firebase/auth";
  import { auth } from "../firebase/firebase";
  let pathname = window.location.pathname;

  const handleSignOut = () => {
    try {
      sessionStorage.removeItem("currentUser");
      signOut(auth);
      window.location.href = "/login";
    } catch (e) {
      console.error(e.message);
    }
  };
</script>

<header class="navbar bg-secondary py-2">
  <nav class="container flex justify-content-between">
    <h1 class="navbar-brand text-white">To do - Svelte</h1>
    {#if pathname === "/"}
      <button on:click="{handleSignOut}">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    {/if}
  </nav>
</header>

<style>
  .navbar-brand {
    font-family: "Patua One", Arial, Helvetica, sans-serif !important;
    letter-spacing: -1px !important;
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
  }

  button:active {
    background-color: transparent;
  }

  i {
    font-size: 20px;
    color: white;
    margin-left: 30px;
    transition: all 0.2s linear;
  }

  i:hover {
    color: #492;
  }
</style>
