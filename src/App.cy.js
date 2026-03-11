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
            cy.findByTestId('LinkedIn principle').should('exist')
            cy.get('.HeaderTitle').should('exist')
            cy.findByTestId('open overview').should('exist')

            cy.findByText('By Geert van de Lisdonk').should('exist')
            cy.findAllByRole('link', {name: 'LinkedIn'}).should('exist')

        })

        it('should have og:image meta tag', () => {
            cy.setCookie('isFirstTime', "false");
            cy.mount(<TestsWithRouterRoot/>)

            cy.get('head meta[property="og:image"]', {timeout: 5000}).should('exist')
                .and('have.attr', 'content')
                .and('match', /\/og-images\/.*\.png$/)
            cy.get('head meta[property="og:image:width"]').should('exist')
                .and('have.attr', 'content', '1200')
            cy.get('head meta[property="og:image:height"]').should('exist')
                .and('have.attr', 'content', '630')
        })

        it('should use LinkedIn share-offsite endpoint with share page URL', () => {
            cy.setCookie('isFirstTime', "false");
            cy.mount(<TestsWithRouterRoot/>)

            cy.findByTestId('LinkedIn principle')
                .should('have.attr', 'href')
                .and('include', 'linkedin.com/sharing/share-offsite/')
                .and('include', '%2Fshare%2F')
        })
    })

    describe('Overview tests', () => {
        it('should let me in', () => {
            cy.clearCookies()
            cy.mount(<TestsWithRouterOverview/>)

            cy.findByRole('button', {name: 'Let me in!'}).click();
            cy.findByRole('heading', {name: 'Welcome'}).should('not.exist')
        });

        it('should show multiple principles', () => {
            cy.setCookie('isFirstTime', "false");
            cy.mount(<TestsWithRouterOverview/>)

            cy.findAllByRole('heading').should('have.length.above', 10)
            cy.findAllByRole('paragraph').should('have.length.above', 10)

        });
    })
})