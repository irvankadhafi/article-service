const { body } = require('express-validator');

module.exports.articleValidationRules = () => [
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Nama author tidak boleh kosong.')
    .isLength({ min: 3 })
    .withMessage('Nama author minimal 3 karakter.')
    .isLength({ max: 50 })
    .withMessage('Nama author maksimal 50 karakter.'),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Judul artikel tidak boleh kosong.')
    .isLength({ min: 5 })
    .withMessage('Judul minimal 5 karakter.'),
  body('body')
    .notEmpty()
    .withMessage('Body artikel tidak boleh kosong.')
    .isLength({ min: 10 })
    .withMessage('Body artikel minimal 10 karakter.'),
];
