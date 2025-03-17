<script setup lang="ts">
import '@/assets/sass/home.scss';
</script>

<template>
	<main class="home">
		<nav id="productCategory">
			<div class="container">
				<div class="item">
					<p class="item-name">Canapés & Fauteuils</p>
					<div class="dropdown dropdown-columns">
						<div class="column">
							<p class="column-title">Titre</p>
							<p class="column-item">Item</p>
							<p class="column-item">Item</p>
						</div>
						<div class="column">
							<p class="column-title">Titre</p>
							<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
							<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
							<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
							<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
							<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
						</div>
					</div>
				</div>

				<p class="item">Chaise & Tabouret</p>

				<p class="item">Bureau</p>

				<p class="item">Table</p>

				<p class="item">Rangement</p>

				<p class="item">Chambre</p>

				<p class="item">Enfant</p>

				<p class="item">Jardin</p>

				<p class="item">Luminaire</p>

				<p class="item">Déco</p>

				<p class="item">Meubles reconditionnés</p>
			</div>
		</nav>
	</main>
</template>
<style scoped></style>
