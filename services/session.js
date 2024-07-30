const path = require("path");
const shell = require("shelljs");
const sessDir = "config/session";
const newsessDir = "config/botsession";
const defaultCfg = path.resolve(__dirname, "..", sessDir);
const sessionCfg = path.resolve(__dirname, "..", newsessDir);

const deldefsessionChecker = () => {
  if (shell.test("-d", defaultCfg)) {
    if (shell.test("-d", sessionCfg)) {
      shell.rm("-rf", defaultCfg);
      shell.rm("-rf", sessionCfg);
    }
    shell.rm("-rf", defaultCfg);
  }
};

const botsessionChecker = () => {
  if (shell.test("-d", defaultCfg)) {
    if (shell.test("-d", sessionCfg)) {
      shell.rm("-rf", sessionCfg);
    }
    shell.cp("-r", defaultCfg, sessionCfg);
    return sessionCfg;
  } else if (shell.test("-d", sessionCfg)) {
    shell.rm("-rf", sessionCfg);
    return sessionCfg;
  } else {
    return sessionCfg;
  }
};

const defsessionChecker = () => {
  if (shell.test("-d", defaultCfg)) {
    shell.rm("-rf", defaultCfg);
    return defaultCfg;
  } else {
    return defaultCfg;
  }
};

module.exports = {
  botsessionChecker,
  defsessionChecker,
  deldefsessionChecker
};