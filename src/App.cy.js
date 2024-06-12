import React from 'react'
import TestsWithRouter from "./testing-helper";

describe('<App />', () => {
    it('verify default components are present', () => {
        cy.mount(<TestsWithRouter/>)
        cy.findByTestId("homeComponent").should('exist')
        cy.findByTestId("footerComponent").should('exist')

        cy.findByRole('heading', {name: 'Welcome'}).should('be.visible')
        cy.findByRole('button', {name: 'Let me in!'}).should('be.visible')
    });

    it('should let me in', () => {
        cy.mount(<TestsWithRouter/>)

        cy.findByRole('button', {name: 'Let me in!'}).click();
        cy.findByRole('heading', {name: 'Welcome'}).should('not.exist')
    });

    it.skip('should not display first modal again', () => {
        cy.mount(<TestsWithRouter/>)

        cy.findByRole('button', {name: 'Let me in!'}).click();
        cy.findByRole('heading', {name: 'Welcome'}).should('not.exist')

        cy.findByRole('heading', {name: 'Welcome'}).should('not.exist')
    });
})
