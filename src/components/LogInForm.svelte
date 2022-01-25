<script>
  import { createEventDispatcher } from "svelte";
  import { Link } from "svelte-routing";
  import {
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
  } from "firebase/auth";
  import { auth } from "../firebase/firebase";

  const dispatcher = createEventDispatcher();

  let formData = {
    email: "",
    password: "",
  };

  const saveUser = (user) => {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  };

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      saveUser(user);
      window.location.href = "/";
    } catch (e) {
      dispatcher("error");
      console.error(e.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      saveUser(user);
      window.location.href = "/";
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleAnonymous = async () => {
    try {
      const user = await signInAnonymously(auth);
      saveUser(user);
      window.location.href = "/";
    } catch (e) {
      console.error(e.message);
    }
  };
</script>

<form on:submit|preventDefault="{handleLogin}">
  <div class="form-header">
    <h2>Log in</h2>
    <Link to="/signin" class="btn btn-secondary text-white py-1">Sign in</Link>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input
      type="email"
      class="form-control"
      id="email"
      bind:value="{formData.email}"
    />
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input
      type="password"
      class="form-control"
      id="password"
      bind:value="{formData.password}"
    />
  </div>
  <div class="row gap-2 px-3">
    <button type="submit" class="btn btn-primary col-12 py-1">Log in</button>
    <button
      type="submit"
      class="btn btn-secondary col-12 py-1"
      on:click="{handleGoogleAuth}"
    >
      <i class="fab fa-google"></i> &nbsp; Log in with Google
    </button>
    <button
      type="submit"
      class="btn btn-secondary col-12 py-1"
      on:click="{handleAnonymous}"
    >
      <i class="fas fa-user"></i>&nbsp; Log in anonimously
    </button>
  </div>
</form>

<style>
  form {
    width: 400px;
    height: fit-content;
    margin: 30px auto;
    padding: 20px 15px;
    background-color: #fafafa;
    border: 1px solid #ccc;
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 24px;
  }

  h2 {
    width: fit-content;
    font-size: 20px;
    padding-left: 12px;
  }
  i {
    color: white;
  }
</style>
