describe('carte bancaire', () => {
	it('passes', () => {
		cy.visit('http://localhost:5173');

		// Login
		cy.get('[href="/compte"]').first().click();

		cy.get('#email').type('luc-damas@hop.fr');
		cy.get('#password').type('mdp');

		cy.get('button.button').contains('Se connecter').click();

		// Carte bancaire
		cy.get('[href="/compte/informations-bancaires"] > .card-account').click();

		cy.get('button.button').contains('Ajouter une carte bancaire').click();

		// Form
		cy.get('#name').type('Carte de TEST');
		cy.get('#titulaire').type('personne de test');
		cy.get('#number').type('1234823412331234');

		cy.get('label').contains("Mois d'expiration").click();
		cy.get('input#expmonth.input').type('3');

		cy.get('label').contains("Année d'expiration").click();
		cy.get('input#expyear.input').type('2031');
		cy.get('button.button').contains('Enregistrer').click();


		cy.get('p.label').contains('Carte de TEST').parent().parent().parent('.cb-container').find('button.delete').click({ force: true});
		cy.get('button.button').contains('Confirmer').click();

		cy.get('p.label').contains('Carte de TEST').should('not.exist');

	});
});
