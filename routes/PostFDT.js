const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const mongoose = require("mongoose");

var { PostFDT } = require('../model/postFDT')

const storage = multer.diskStorage({
    destination: './public/uploads/Foundation',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.gif' && ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new Error('Only image is allowed'), false)
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

router.get('/', (req, res) => {
    PostFDT.find((err, docs) => {
        if (!err)
            res.send(docs)
        else
            console.log('Error #1 : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/map', async (req, res) => {
    let result = await PostFDT.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.body.data)
            }
        }
    ]);
    console.log(result)
    res.send(result[0])
})

router.post('/addFav/:id', (req, res) => {
    console.log("Post_id: " + req.params.id)
    console.log("currentuser_id: " + req.body.currentUser_id)

    user.findByIdAndUpdate(req.body.currentUser_id, { $addToSet: { favorite: req.params.id } }, function (error, update) {
        if (error) {
            console.log(error)
        }
    })
})
router.post('/', upload.single('image'), (req, res) => {
    console.log(req.body.item)
    var newRecord = new PostFDT({
        title: req.body.title,
        message: req.body.message,
        n_item: req.body.n_item,
        promptpay: req.body.promptpay,
        category: req.body.category,
        image: req.file.filename,
        endtime: req.body.endtime,
        lat: req.body.lat,
        lng: req.body.lng,
        $addToSet: { item: req.body.item },
    })
    console.log(newRecord)
    newRecord.save((err, docs) => {
        if (!err)
            res.send(docs)
        else
            console.log('Error #2 : ' + JSON.stringify(err, undefined, 2))
    })
})

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    var updatedRecord = {
        title: req.body.title,
        message: req.body.message,
        item: req.body.item,
        n_item: req.body.n_item,
        promptpay: req.body.promptpay,
        endtime: req.body.endtime,
        lat: req.body.lat,
        lng: req.body.lng
    }

    PostFDT.findByIdAndUpdate(req.params.id, { $set: updatedRecord }, { new: true }, (err, docs) => {
        if (!err)
            res.send(docs)
        else
            console.log('Error #3 : ' + JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No #4 : ' + req.params.id)

    PostFDT.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err)
            res.send(docs)
        else
            console.log('Error #5 : ' + JSON.stringify(err, undefined, 2))
    })
})


// router.get('/:id', (req, res) => {
//     console.log(req.params.id)
//     PostFDT.findById(req.params.id, (err, docs) => {
//         if (!err)
//             res.send(docs)
//         else
//             console.log('Error #6 : ' + JSON.stringify(err, undefined, 2))
//     })
// })

module.exports = router