// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  transform: tsjPreset.transform,
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Main Backend Services Unit Test",
        includeConsoleLog: false,
        includeFailureMsg: true,
      },
    ],
  ],
};
