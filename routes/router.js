const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const router = new express.Router();

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'ashish',
    password: 'ashish',
    database: 'packageManager'
})

// getting and stroring image
var imgConfig = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
})

const upload = multer({ storage: imgConfig })

// api to add products
router.post('/product', upload.single('image'), (req, res) => {
    const {
        id,
        title,
        description,
        terms_condition
    } = req.body
        console.log("🚀 ~ file: router.js:34 ~ router.post ~ description", description)
    const { filename } = req.file

    if (!filename) res.status(422).json({ status: 422, message: 'image is required' })

    try {
        connection.query('INSERT INTO products SET ?', { id, title, image: filename, description, terms_condition }, (err, data) => {
            if (err) {

            } else {
                res.send({ success: true, data })
            }
        })
    } catch (error) {
        res.send({ success: false, message: 'Error' })
    }

});

// api to fetch all products
router.get('/product', (req, res) => {
    connection.query('SELECT * FROM products', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({ success: true, data })
        }
    })
});

// api to fetch products from id
router.get('/product/:id', (req, res) => {
    connection.query('SELECT * FROM products WHERE id=?', [req.params.id], (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                data[i].description = JSON.parse(data[i]?.description)
                data[i].terms_condition = JSON.parse(data[i]?.terms_condition)
            }
            let response = {
                success: true,
                data: data
            }
            console.log("???????????", data)
            res.send(response)
        }
    })
});

// api to delete products from id
router.delete('/product/:id', (req, res) => {
    const { id } = req.params
    connection.query(`DELETE FROM products WHERE id=${id}`, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let response = {
                success: true,
                data: data
            }
            res.send(response)
        }
    })
});

module.exports = router;