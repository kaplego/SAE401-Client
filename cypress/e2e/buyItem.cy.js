describe('achetter un meuble', () => {
	it('passes', () => {
		cy.visit('http://localhost:5173');
		cy.get('a').contains('Chaise & Tabouret').click();
		cy.get('.card-produit').first().click();

		cy.get('button').contains('Ajouter au panier').click();

		// 1 item in cart
		cy.get('#cart-number > .input-control > .input').should('contain.value', 1);
		cy.get('button:has(svg.lucide-plus-icon)').click();
		cy.get('#cart-number > .input-control > .input').should('contain.value', 2);
		cy.get('button:has(svg.lucide-plus-icon)').click();
		cy.get('#cart-number > .input-control > .input').should('contain.value', 3);
		cy.get('button:has(svg.lucide-plus-icon)').click();
		cy.get('#cart-number > .input-control > .input').should('contain.value', 4);
		// 4 items in cart

		cy.get('button:has(svg.lucide-minus-icon)').click();
		cy.get('#cart-number > .input-control > .input').should('contain.value', 3);
		// 3 items in cart

		cy.get('[href="/cart"]').click();

		cy.get('.cart-quantity > .input-control > .input').should('contain.value', 3);

		cy.get('button:has(svg.lucide-plus-icon)').click();
		cy.get('.cart-quantity > .input-control > .input').should('contain.value', 4);
		// 4 items in cart

		cy.get('button:has(svg.lucide-minus-icon)').click();
		cy.get('.cart-quantity > .input-control > .input').should('contain.value', 3);
		cy.get('button:has(svg.lucide-minus-icon)').click();
		cy.get('.cart-quantity > .input-control > .input').should('contain.value', 2);
		// 2 items in cart


		cy.get('a.button').click();

		cy.get('#email').type('luc-damas@hop.fr');
		cy.get('#password').type('mdp');

		cy.get('button.button').contains('Se connecter').click();

		cy.url().should('include', '/cart');

		cy.get('a.button').contains('Payer').click();

		cy.url().should('include', '/paiement');

		cy.get('#idadresselivr').select("TEST adresse, ST TRIVIER SUR MOIGNANS");
		cy.get('#idtransporteur').select("Chronopost");
		cy.get('#instructionlivraison').type("Ceci est une commande de TEST");

		cy.get('label[for="express"]').last().click();
		cy.get('#express').should('be.checked');
		cy.get('label[for="assurance"]').last().click();
		cy.get('#assurance').should('be.checked');
		cy.get('select.input').last().select(0);

		cy.get('button.button').contains('Payer').click();

		cy.url().should('include', '/compte/commandes/');


		// FIN DU TEST

	});
});
