<script>
	import { Router, Route } from "svelte-routing";
	import Index from "./Pages/index.svelte";
	import Login from "./Pages/login.svelte";
	import Signin from "./Pages/signin.svelte";
	import NotFound from "./Pages/NotFound.svelte";
</script>

<Router>
	<Route path="/login" component="{Login}" />
	<Route path="/signin" component="{Signin}" />
	<Route component="{NotFound}" />
	<Route path="/" component="{Index}" />
</Router>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Patua+One&display=swap");
</style>
