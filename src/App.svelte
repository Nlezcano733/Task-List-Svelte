<script>
	import { Router, Route } from "svelte-routing";
	import Index from "./Pages/index.svelte";
	import Login from "./Pages/login.svelte";
	import Signin from "./Pages/signin.svelte";
</script>

<Router>
	<Route path="/" component="{Index}" />
	<Route path="/login" component="{Login}" />
	<Route path="/signin" component="{Signin}" />
</Router>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Patua+One&display=swap");
</style>
