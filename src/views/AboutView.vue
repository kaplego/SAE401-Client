<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';

const isLoading = useLoadingStore();
isLoading.switchLoading(false);
</script>

<template>
	<main>
		<div class="container">
			<h1>Qui sommes nous et nos engagements
			</h1>
			<h2>Une équipe Hyper active
			</h2>
			<p>Créée en 2005, Miliboo est LA marque française de mobilier design en ligne. Elle a également ouvert trois concept stores, dont deux à Paris et un à Lyon, des espaces conçus comme de véritables lieux de vie, où « l’expérience client » prend tout son sens.</p>
			<p>Accessibles et expédiés en 48h/72h, les produits Miliboo séduisent aussi les européens; la marque est présente dans 6 pays d’Europe : France, Italie, Allemagne, Espagne, Belgique et Luxembourg.
			</p>
			<p>Avec un catalogue de 2800 références, Miliboo propose une offre large et exclusive de mobilier tendance et facile à vivre, pour toutes les pièces de la maison. Son ambition ? Permettre à chacune et chacun de composer un univers qui lui ressemble, en optant pour des meubles de qualité, au design tendance et fonctionnel pour être bien chez soi, au quotidien.</p>
			<h2>Nos engagements au quotidien</h2>
			<ul>
				<li>Un service client personnalisé à votre écoute, basé au siège de l'entreprise
				</li>
				<li>Une traçabilité à 100% de chaque meuble miliboo (numéro de série unique)
				</li>
				<li>Des contrôles qualité professionnels réalisés par nos équipes
				</li>
				<li>Choix et disponibilité des produits, plus de 90% de nos meubles sont en stock
				</li>
				<li>Le meilleur prix pour chaque pièce de mobilier (pas d’intermédiaires, Miliboo maîtrise toute la chaîne : conception, fabrication, expédition de ses meubles).
				</li>

			</ul>
			<h2>Un service client personnalisé à votre écoute
			</h2>
			<p>
Afin de garantir une qualité de service à la hauteur de vos attentes, le service client de Miliboo.com est basé au siège de notre société.
Valentine, Valérie, Shana, Emilie et Jade traitent vos demandes en direct et apportent une réponse personnalisée et rapide à vos interrogations.
Liza, Marianne, Julie et Emma à votre écoute pour traiter toutes vos demandes SAV, collaborent avec nos techniciens produits afin de vous apporter des réponses adaptées. Des pièces détachées sont régulièrement commandées auprès de nos fournisseurs afin d'assurer un suivi réactif à vos demandes.</p>
		</div>
	</main>
</template>
<style>
ul{
	list-style-position: inside
}</style>
