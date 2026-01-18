import { describe, expect, it } from '@jest/globals';

describe('Example Unit Test', () => {
    it('should pass', () => {
        // Arrange
        const value = true;

        // Act
        const comparison = value == true;

        // Assert
        expect(comparison).toBeTruthy();
    });
});
