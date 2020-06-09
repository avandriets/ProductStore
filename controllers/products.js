module.exports.getProducts = (req, res, next) => {

  res.status(200).json({
    total: 2,
    items: [
      {
        id: 'p-1',
        name: 'Product one',
        productDescription: 'Product One Description',
      },
      {
        id: 'p-2',
        name: 'Product two',
        productDescription: 'Product Two Description',
      },
    ],
  });

};
