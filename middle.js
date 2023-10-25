
module.exports = (req, res, next) => {
  // Check if any required fields are missing in the request body
  const { title, author, category, publicationYear, price, quantity, description, imageUrl } = req.body;
    if (title && author && category && publicationYear && price && quantity && description && imageUrl) {
        next();
    }
    else {
        res.status(400).send("All fields are required");
    }
};



