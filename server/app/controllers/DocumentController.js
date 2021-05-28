const documentModel = require('../models/document');
const storeDocument = require('../cores/storeDocument');

class DocumentController {
    /** GET /api/document */
    async index(req, res, next) {
        const { id, type, update } = req.query;
        if (!id && !type && !update) {
            try {
                var documents = await documentModel.find({}).select('type -_id');
                var documentCopy = documents.map(value => value.type);
                documents = Array.from(new Set(documentCopy));
                return res.json({ success: true, documents });
            } catch (err) {
                console.log(err)
                return res.status(400).json({ success: false, message: "Internal server error" });
            }
        }
        return res.status(400).json({ success: false, message: "Bad request" })
    }










    // //[GET] /api/document
    // index(req, res, next) {
    //     const { id, type, update } = req.query;
    //     if (id || update) {
    //         var cache = id ? id : update;
    //         documentModel.find({ type })
    //             .then(documents => {
    //                 documentModel.findOne({ _id: cache })
    //                     .then(document => {
    //                         res.json({ document, documents });
    //                     })
    //             })
    //     }
    //     else if (type) {
    //         documentModel.find({ type })
    //             .then(documents => {
    //                 res.json(documents);
    //             })
    //     }
    //     else {
    //         res.json("not thing");
    //     }
    // }
    // //[POST] /api/document/create
    // create(req, res, next) {
    //     var obj = storeDocument(req.body);
    //     var data = new documentModel(obj);
    //     data.save();
    //     res.redirect('back');
    // }
    // //[PUT] /api/document/:id/update
    // update(req, res, next) {
    //     const { id } = req.params;
    //     var obj = storeDocument(req.body);
    //     documentModel.updateOne({ _id: id }, obj)
    //         .then(() => {
    //             res.redirect('back');
    //         })
    // }
    // //[DELETE] /api/document/:id/delete
    // delete(req, res, next) {
    //     const { id } = req.params;
    //     documentModel.delete({ _id: id })
    //         .then(() => {
    //             res.redirect('/document');
    //         })
    //         .catch(err => {
    //             res.status(404).json({ success: fasle, message: err.message });
    //         })
    // }

}

module.exports = new DocumentController;