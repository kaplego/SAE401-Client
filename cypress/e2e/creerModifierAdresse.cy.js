describe('créer puis modifier une adresse', () => {
	it('passes', () => {
		cy.visit('http://localhost:5173');

		// Login
		cy.get('[href="/compte"]').first().click();

		cy.get('#email').type('luc-damas@hop.fr');
		cy.get('#password').type('mdp');

		cy.get('button.button').contains('Se connecter').click();

		cy.get('[href="/compte/adresses"] > .card-account').click();



		cy.get('body', { timeout: 10000 }).then(($body) => {
			if ($body.find('p:contains("TEST adresse")').length > 0) {
				cy.log("Element exists");

			} else {
				cy.log("Element does not exist");
				cy.get('#add-address').click();

				cy.get('#nomadresse').type("TEST adresse");
				cy.get('#numerorue').type("7");
				cy.get('#nomrue').type("rue de l'arc en ciel");


				cy.get('#pays').select('France');

				cy.get('#departement').type("Haute-Savoie");
				cy.get('#ville').type("ANNECY");
				cy.get('#codepostal').type("74000");

				cy.get('button.button').contains('Enregistrer').click();


			}
		});

	});
});