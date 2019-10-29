import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";

addDecorator(
  withOptions({
    name: "portsiya of react",
    hierarchyRootSeparator: /\|/
  })
);

addDecorator(story => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100px"
    }}
  >
    {story()}
  </div>
));

configure(
  require.context("../src/components", true, /\.stories\.(js|mdx)$/),
  module
);
