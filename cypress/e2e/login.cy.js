describe('login', () => {
	it('finds the login button', () => {
		cy.visit('http://localhost:5173');

		cy.get('[href="/compte"]').first().click();
		cy.url().should('include', '/auth/connexion');

		cy.get('#email').type('luc-damas@hop.fr');
		cy.get('#password').type('mdp');

		cy.get('button.button').contains('Se connecter').click();

		cy.url().should('include', '/compte');

	});
});
