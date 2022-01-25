<script>
  import { createEventDispatcher } from "svelte";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase/firebase";
  import { Link } from "svelte-routing";
  let formData = {
    email: "",
    password: "",
    repeatedPassword: "",
  };

  const dispatcher = createEventDispatcher();

  const handleRegister = async () => {
    try {
      if (formData.password === formData.repeatedPassword) {
        const user = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        sessionStorage.setItem("currentUser", user);
        window.location.href = "/";
      } else {
        dispatcher("errorPass");
      }
    } catch (e) {
      dispatcher("error");
      console.error(e.message);
    }
  };
</script>

<form on:submit|preventDefault="{handleRegister}">
  <div class="form-header">
    <h2>Sign in</h2>
    <Link to="/login" class="btn btn-secondary text-white py-1">Log in</Link>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input
      type="email"
      class="form-control"
      id="email"
      bind:value="{formData.email}"
      pattern="{`^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z])$`}"
      required="{true}"
    />
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input
      type="password"
      class="form-control"
      id="password"
      bind:value="{formData.password}"
      pattern="{'.{8,}'}"
      required="{true}"
    />
  </div>
  <div class="mb-3">
    <label for="passwordRepeat" class="form-label">Repeat password</label>
    <input
      type="password"
      class="form-control"
      id="passwordRepeat"
      bind:value="{formData.repeatedPassword}"
      pattern="{'.{8,}'}"
      required="{true}"
    />
  </div>
  <div class="row gap-2 px-3">
    <button type="submit" class="btn btn-primary col-12 py-1">Sign in</button>
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
</style>
