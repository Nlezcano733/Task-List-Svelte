<script>
  import Navbar from "../components/Navbar.svelte";
  import SignInForm from "../components/SignInForm.svelte";
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
<main>
  <SignInForm
    on:error="{() => settingToaster('Error in sign in')}"
    on:errorPass="{() => settingToaster("Error, passwords don't match")}"
  />
  <Toaster {...toasterProps} />
</main>
