const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto2.forstudy.space/",
    video: true,
    setupNodeEvents(on, config) {},
    env: {
      userEmail: "testuser1@furtune.com",
      userPassword: "Test1234!",
    },
  },
});
