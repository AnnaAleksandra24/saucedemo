describe('User Authentication', () => {

    beforeEach(() => {
        cy.visit('/index.html'); // Runs before every test
    });

    it('Verifies the web page contains "Username" and "Password" text fields and "Login" button', () => {
        cy.get('[data-test="username"]').should('be.visible');
        cy.get('[data-test="password"]').should('be.visible');
        cy.get('#login-button').should('be.visible');
    });

    it('Valid username ("standard_user") and valid password ("secret_sauce") should allow login', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory.html');
    });

    it('Locked out user should see an error message', () => {
        cy.get('[data-test="username"]').type('locked_out_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('#login-button').click();
        cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
        
        // Verify error disappears after clicking the dismiss button
        cy.get('button.error-button').click();
        cy.get('[data-test="error"]').should('not.exist');
    });

    it('Problem user can log in but experiences broken UI', () => {
        cy.get('[data-test="username"]').type('problem_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory.html');
    });

    it('Performance glitch user should be able to log in', () => {
        cy.get('[data-test="username"]').type('performance_glitch_user'); // Fixed incorrect quotes
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory.html');
    });

});
