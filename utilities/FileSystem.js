const fs = require('fs')

class FileSystem {
  static saveToFile(data, filename) {
    if (filename === undefined) {
      let now = new Date();

      filename = now.toISOString().replace(/\:/g, '')
    }
    fs.writeFileSync(filename, data);
  }

  static append(file, data) {
    fs.appendFileSync(file, data);
  }
}

module.exports = FileSystem;
