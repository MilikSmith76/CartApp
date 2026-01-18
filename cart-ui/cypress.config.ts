import { defineConfig } from 'cypress'
 
const config = defineConfig({
  component: {
    devServer: {
      bundler: 'webpack',
      framework: 'next',
    },
    indexHtmlFile: 'support/index.html',
    specPattern: '__component__/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'support/component.ts',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {},
    specPattern: '__e2e__/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },
});

export default config;
