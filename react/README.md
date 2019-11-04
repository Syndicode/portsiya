This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `storybook:start`

Runs `start-storybook -p 9009 -s public`<br />
Spins out [Storybook]() server on port `9009`<br />

### `storybook:build`

Runs `build-storybook -s public`<br />

### `storybook:stories_to_png`

Runs `node ./scripts/stories-screenshot`.<br />
Takes a screenshot of a componnents `.mdx` story and puts it in the components directory.<br />

### `component:create`

Runs `node ./scripts/components-scaffold component:create`.<br />
Scaffolds a component folder using this [template](https://github.com/Syndicode/portsiya/tree/master/react/scripts/components-scaffold/template).<br />

#### Usage:

```
yarn component:create Text --path ./some/path
```

Puts newly created `Text` folder into `./some/path`.<br />
If no `--path` provided will use `./src/components` or `./components` by default.<br />

### `component:pull`

TODO
