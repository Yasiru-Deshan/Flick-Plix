const router = require('express').Router()
const trailerCtrl = require('../controllers/trailerCtrl')

router.route('/trailers')
.get(trailerCtrl.getTrailers)
.post(trailerCtrl.createTrailer)

router.route('/trailers/:id')
.delete(trailerCtrl.deleteTrailer)
.put(trailerCtrl.updateTrailer)

module.exports = router