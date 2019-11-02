const path = require("path");

module.exports = [
  "@storybook/addon-docs/react/preset",
  {
    name: "@storybook/preset-create-react-app",
    options: {
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
      }
    }
  }
];
