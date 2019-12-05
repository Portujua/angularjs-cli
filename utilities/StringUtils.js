class StringUtils {
  static cammelCase(str) {
    return str[0].toLowerCase() + str.substring(1)
  }

  static capitalize(str) {
    return str[0].toUpperCase() + str.substring(1)
  }

  static underscorize(str) {
    return str.replace(/[A-Z]/g, function (char, index) {
      return (index !== 0 ? '_' : '') + char.toLowerCase();
    });
  }

  static dasherize(str) {
    return str.replace(/[A-Z]/g, function (char, index) {
      return (index !== 0 ? '-' : '') + char.toLowerCase();
    });
  }
}

module.exports = StringUtils;
