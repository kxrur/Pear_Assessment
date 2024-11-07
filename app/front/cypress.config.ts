const { defineConfig } = require("cypress");


module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  video: true,

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: "http://localhost:5173",
    defaultCommandTimeout: 10000,  // 10 seconds
    requestTimeout: 15000,         // 15 seconds
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
