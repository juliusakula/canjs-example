// Escapes a reg exp string
module.exports = function(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
