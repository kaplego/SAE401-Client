describe('créer un compte', () => {
	it('passes', () => {
		cy.visit('http://localhost:5173');

		cy.get('[href="/compte"]').first().click();
		cy.url().should('include', '/auth/connexion');

		cy.get('[href="/auth/inscription"]').click();
		cy.url().should('include', '/auth/inscription');

		const d = new Date();
		const number = d.getTime();

		cy.get('#signup-nom').type('testnom ' + number);
		cy.get('label[for="signup-prenom"]').click();
		cy.get('#signup-prenom').type('testprenom');

		cy.get('#signup-email').type('test'+ number +'@lololol.com');
		cy.get('#signup-password').type('mdp');

		cy.get('label[for="signup-phone"]').click();
		cy.get('#signup-phone').type('0612121212');

		cy.get('button.button').contains("S'inscrire").click();

		cy.get('#email').type('test'+ number + '@lololol.com');
		cy.get('#password').type('mdp');

		cy.get('button.button').contains('Se connecter').click();

		cy.get('h1').contains("Bienvenue");

	});
});
