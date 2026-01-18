import { mount } from 'cypress/react';

describe('Example Component Test', () => {
    it('should render', () => {
        // Arrange

        // Act
        mount(<button type='button'>Test</button>);

        // Assert
        cy.get('button').should('contain', 'Test');
    });
});
