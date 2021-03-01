const forEach = (items, callback) => {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
};

module.exports = forEach;
