/* eslint-disable no-undef */
import React from 'react'
import {TestsWithRouterRoot, TestsWithRouterOverview} from "./testing-helper";

describe('<App />', () => {
    describe('Root test', () => {
        it('verify default components are present', () => {
            cy.mount(<TestsWithRouterRoot/>)
            cy.findByTestId("homeComponent").should('exist')
            cy.findByTestId("footerComponent").should('exist')

            cy.findByRole('heading', {name: 'Welcome'}).should('be.visible')
            cy.findByRole('button', {name: 'Let me in!'}).should('be.visible')
        });

        it('should let me in', () => {
            cy.mount(<TestsWithRouterRoot/>)

            cy.findByRole('button', {name: 'Let me in!'}).click();
            cy.findByRole('heading', {name: 'Welcome'}).should('not.exist')
        });

        it('should not display first modal again', () => {
            cy.mount(<TestsWithRouterRoot/>)
            cy.clearCookies()

            cy.findByRole('heading', {name: 'Welcome'}).should('exist')
            cy.findByRole('button', {name: 'Let me in!'}).click();
            cy.findByRole('heading', {name: 'Welcome'}).should('not.exist')

            cy.mount(<TestsWithRouterRoot/>)
            cy.findByRole('heading', {name: 'Welcome'}).should('not.exist')
        });

        it('should show all desired items', () => {
            cy.setCookie('isFirstTime', "false");
            cy.mount(<TestsWithRouterRoot/>)

            cy.get('#principle-container > h1').should('exist')
            cy.get('.description').should('exist')
            cy.findAllByTestId('source').should('have.length.above', 0)

            cy.findByRole('button', {name: 'previous'}).should('exist')
            cy.findByRole('button', {name: 'next'}).should('exist')

            cy.findByTestId('copy', ).should('exist')
            cy.findByTestId('Tweet principle').should('exist')
            cy.findByTestId('LinkedIn principle').should('exist')
            cy.get('.HeaderTitle').should('exist')
            cy.findByTestId('open overview').should('exist')

            cy.findByText('By Geert van de Lisdonk').should('exist')
            cy.findByRole('link', {name: 'twitter'}).should('exist')
            cy.findAllByRole('link', {name: 'LinkedIn'}).should('exist')

        })
    })

    describe('Overview tests', () => {
        it('should let me in', () => {
            cy.clearCookies()
            cy.mount(<TestsWithRouterOverview/>)

            cy.findByRole('button', {name: 'Let me in!'}).click();
            cy.findByRole('heading', {name: 'Welcome'}).should('not.exist')
        });

        it('should show multiple prinicples', () => {
            cy.setCookie('isFirstTime', "false");
            cy.mount(<TestsWithRouterOverview/>)

            cy.findAllByRole('heading').should('have.length.above', 10)
            cy.findAllByRole('paragraph').should('have.length.above', 10)

        });
    })
})