describe('User can visit the site and log into application.', () => {

    it('opens the homepage on full screen.', () => {
        // Set the viewport.
        cy.viewport(1920, 1080);
        // Vist the page.
        cy.visit('/');
    });

    it('Clicks on the login button.', () => {
        // Set the viewport.
        cy.viewport(1920, 1080);
        // Click on the login button.
        cy.get('#logIn').click();
    });

    it('Completes the login forms.', () => {
        // Set the viewport.
        cy.viewport(1920, 1080);
        // Complete the username and password.
        cy.get('#loginEmail').type('dipogeorge@hotmail.com');
        cy.get('#loginPassword').type('password');
        //Click on the login button.
        cy.get('#loginBtn').click();
        // we should be redirected to /dashboard
        cy.url().should('include', '/application/dashboard')
        cy.get('.title').contains('Dashboard')
    });
})
