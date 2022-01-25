<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import Navbar from "../components/Navbar.svelte";

  let page = "/";

  onMount(() => {
    const user = sessionStorage.getItem("currentUser");
    page = user ? "/" : "/login";
  });
</script>

<Navbar />

<div>
  <h2>404 - Page not found</h2>
  <Link to="{`${page}`}">
    <span class="link">
      <i class="fas fa-arrow-circle-left"></i> Go back to a safe page
    </span>
  </Link>
</div>

<style>
  div {
    position: relative;
  }
  h2 {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: white;
    animation: floating 6.5s infinite ease-in-out;
  }

  @keyframes floating {
    0% {
      top: 40px;
      color: #fff;
    }
    50% {
      top: 60px;
      color: #492;
    }
    100% {
      top: 41px;
      color: #fff;
    }
  }

  .link {
    position: absolute;
    top: 110px;
    left: 50vw;
    transform: translateX(-50%);
    color: white;
    transition: all 200ms linear;
  }

  .link:hover {
    color: #492;
  }
</style>
