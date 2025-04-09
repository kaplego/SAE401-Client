<template>
	<div class="header">
		<h1>Miliboo, les meubles faciles à vivre.</h1>
		<img src="/public/img/decoration/header.jpg" />
	</div>
</template>

<style lang="scss">
.header {
	position: relative;
}
.header img {
	position: absolute;
	filter: brightness(60%);
	width: 100%;
	object-fit: cover;
	top: 0;
	left: 0;
}
.header h1 {
	display: flex;
	left: 50%;
	margin-top: 200px;
	transform: translate(-50%, -50%);
	position: absolute;
	z-index: 100;
	font-weight: bold;
	color: white;
}
</style>
