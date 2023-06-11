const notFound = (req, res) => {
  return res.status(404).send("Not found path in system");
};

module.exports = notFound;
