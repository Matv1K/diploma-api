import express from 'express';

import { instrumentValidator } from '../../validators/instrumentValidator';

import InstrumentController from '../../controllers/instrumentController';

const router = express.Router();

router.post('/', instrumentValidator, InstrumentController.createInstrument);
router.get('/', InstrumentController.getAllInstruments);
router.get('/popular', InstrumentController.getPopularInstruments);
router.get('/new', InstrumentController.getNewInstruments);
router.get('/amount', InstrumentController.getInstrumentCount);
router.get('/sale', InstrumentController.getInstrumentsOnSale);
router.get('/section/:section', InstrumentController.getInstrumentsBySection);
router.get('/section/subtype/:subtype', InstrumentController.getInstrumentsBySubtype);
router.get('/brands/:brand', InstrumentController.getInstrumentsByBrand);
router.get('/:id', InstrumentController.getInstrumentById);
router.get('/search/query', InstrumentController.searchInstruments);
router.get('/rating/:instrumentId', InstrumentController.getInstrumentRating);

export default router;
