const fs = require("fs");

exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const notesDirectory = themeOptions.notesDirectory || "content/garden/";
  if (!fs.existsSync(notesDirectory)) {
    reporter.info(`Creating notes directory: ${notesDirectory}`);
    fs.mkdirSync(notesDirectory, { recursive: true });
  }
};
