describe('login', () => {
	it('finds the login button', () => {
		cy.visit('http://localhost:5173');

		cy.get('a.icon-button').first().click();
		cy.url().should('include', '/login');

		cy.get('#email').type('luc-damas@hop.fr');
		cy.get('#password').type('mdp');

		cy.get('button.button').contains('Se connecter').click();

		cy.url().should('include', '/account');

	});
});
