const handleFourOhFour = (req, res) => {
  console.log("noshipo");
  res.status(200).json({ message: "hello" });
};

module.exports = { handleFourOhFour };
