const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl_2: "https://guest:welcome2qauto@qauto.forstudy.space/",
    video: true,
    setupNodeEvents(on, config) {},
    env: {
      userEmail: "testuser1@furtune.com",
      userPassword: "Test1234!",
    },
  },
});
