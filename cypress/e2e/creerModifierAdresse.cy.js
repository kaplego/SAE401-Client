describe('créer puis modifier une adresse', () => {
	it('passes', () => {
		cy.visit('http://localhost:5173');

		// Login
		cy.get('[href="/compte"]').first().click();

		cy.get('#email').type('luc-damas@hop.fr');
		cy.get('#password').type('mdp');

		cy.get('button.button').contains('Se connecter').click();

		cy.get('[href="/compte/adresses"] > .card-account').click();

		cy.get('.card-address').then(($addresses) => {
			const addressExists =
				$addresses.filter((index, element) => {
					return Cypress.$(element).text().includes('TEST adresse');
				}).length > 0;

			if (addressExists) {
				cy.log('Element exists');
				cy.contains('.card-address', 'TEST adresse')
					.first()
					.then(($element) => {
						// On utilise wrap() pour intéragir avec l'élément $parent
						cy.wrap($element).find('button.button-modif').first().click();

						cy.get('#numerorue')
							.first()
							.then(($numerorueInput) => {
								if ($numerorueInput.val() == '7') {
									cy.get('#numerorue').clear().type('8');
									cy.get('button.button').contains('Enregistrer').click();
									cy.wrap($element)
										.contains("rue de l'arc en ciel")
										.should('contain.text', "8 rue de l'arc en ciel,");
								} else {
									cy.get('#numerorue').clear().type('7');
									cy.get('button.button').contains('Enregistrer').click();
									cy.wrap($element)
										.contains("rue de l'arc en ciel")
										.should('contain.text', "7 rue de l'arc en ciel,");
								}
							});
					});
			} else {
				cy.log('Element does not exist');
				cy.get('#add-address').click();

				cy.get('#nomadresse').type('TEST adresse');
				cy.get('#numerorue').type('7');
				cy.get('#nomrue').type("rue de l'arc en ciel");

				cy.get('#pays').select('France');

				cy.get('#departement').type('Haute-Savoie');
				cy.get('#ville').type('ANNECY');
				cy.get('#codepostal').type('74000');

				cy.get('button.button').contains('Enregistrer').click();

				cy.contains('.card-address', 'TEST adresse').should('be.visible');
			}
		});
	});
});
