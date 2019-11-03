const program = require("commander");
const createComponent = require("./lib/commands/create-component");

let path = undefined;
const setPath = value => {
  path = value;
};

program
  .command("component:create <name>")
  .option("-p, --path <path>", "path to put created component in", setPath)
  .action(name => createComponent(name, path));

program.parse(process.argv);
