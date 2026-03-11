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

        it('should display new modal content', () => {
            cy.mount(<TestsWithRouterRoot/>)

            cy.get('.modal-backdrop').should('exist')
            cy.findByRole('dialog').should('exist')
            cy.findByText(/curated collection of quality principles/).should('be.visible')
            cy.findByText(/you won't see this message again/).should('be.visible')
        });

        it('should let me in', () => {
            cy.mount(<TestsWithRouterRoot/>)

            cy.findByRole('button', {name: 'Let me in!'}).click();
            cy.findByRole('heading', {name: 'Welcome'}).should('not.exist')
            cy.get('.modal-backdrop').should('not.exist')
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

        it('should render all 11 tag pills', () => {
            cy.setCookie('isFirstTime', "false");
            cy.mount(<TestsWithRouterOverview/>)

            cy.get('.tag-pill').should('have.length', 11)
        });

        it('should toggle active state when a pill is clicked', () => {
            cy.setCookie('isFirstTime', "false");
            cy.mount(<TestsWithRouterOverview/>)

            cy.get('.tag-pill').first().as('firstPill')
            cy.get('@firstPill').should('have.attr', 'aria-pressed', 'false')

            cy.get('@firstPill').click()
            cy.get('@firstPill').should('have.attr', 'aria-pressed', 'true')
            cy.get('@firstPill').should('have.class', 'tag-pill--active')

            cy.get('@firstPill').click()
            cy.get('@firstPill').should('have.attr', 'aria-pressed', 'false')
            cy.get('@firstPill').should('not.have.class', 'tag-pill--active')
        });

        it('should filter principles when a tag pill is selected', () => {
            cy.setCookie('isFirstTime', "false");
            cy.mount(<TestsWithRouterOverview/>)

            cy.get('.description').then($all => {
                const totalCount = $all.length

                cy.contains('.tag-pill', 'Testing').click()
                cy.get('.description').should('have.length.below', totalCount)
                cy.get('.description').should('have.length.above', 0)
            })
        });

        it('should show all principles when no pills are selected', () => {
            cy.setCookie('isFirstTime', "false");
            cy.mount(<TestsWithRouterOverview/>)

            cy.get('.tag-pill').filter('[aria-pressed="true"]').should('have.length', 0)
            cy.get('.description').should('have.length.above', 10)
        });
    })
})