<script>
  import Navbar from "../components/Navbar.svelte";
  import LogInForm from "../components/LogInForm.svelte";
  import Toaster from "../components/Toster.svelte";
  let toasterProps = {
    msg: "",
    bg: "",
    show: false,
  };

  const settingToaster = (msgIn, bgIn) => {
    toasterProps = {
      msg: msgIn,
      bg: bgIn ? "success" : "danger",
      show: true,
    };
  };
</script>

<Navbar />
<main class="postion-relative">
  <LogInForm on:error="{() => settingToaster('Error in login')}" />
  <Toaster {...toasterProps} />
</main>
