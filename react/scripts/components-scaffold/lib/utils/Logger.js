class Logger {
  logs = [];

  log = (msg, mode = "log") => {
    const step = this.logs.length + 1;
    const resultMsg = `:: ${step} :: ${msg}`;
    console[mode](resultMsg);
    this.logs.push(resultMsg);
  };

  getLogs = () => {
    return [...this.logs];
  };
}

module.exports = Logger;
