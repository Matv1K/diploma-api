import Instrument from '../../models/Instrument';

import { ApiError, InstrumentI } from '../../types';

interface InstrumentQuery {
  sort?: string;
  section?: string;
  instrumentType?: string;
  brandName?: string;
  [key: string]: unknown;
}

class InstrumentService {
  async createInstrument(instrumentData: InstrumentI) {
    const newInstrument = new Instrument(instrumentData);
    return await newInstrument.save();
  }

  async getAllInstruments() {
    const instruments = await Instrument.find();
    return instruments;
  }

  async getAllInstrumentsPaginated(page: number, limit: number, query: InstrumentQuery) {
    const skip = (page - 1) * limit;

    let sortCondition;

    if (Object.prototype.hasOwnProperty.call(query, 'sort')) {
      sortCondition = query.sort;
      delete query.sort;
    }

    const instruments = await Instrument.find(query).skip(skip).limit(limit).sort(sortCondition);

    return instruments;
  }

  async getPopularInstruments() {
    const instruments = await Instrument.aggregate([{ $sort: { bought: -1 } }, { $limit: 10 }]);
    return instruments;
  }

  async getNewInstruments() {
    const instruments = await Instrument.aggregate([{ $match: { isNew: true } }, { $sort: { bought: -1 } }, { $limit: 20 }]);
    return instruments;
  }

  async getInstrumentCount() {
    const count = await Instrument.countDocuments();
    return count;
  }

  async getInstrumentsOnSale() {
    const instruments = await Instrument.find({ onSale: true });
    return instruments;
  }

  async getInstrumentsBySection(section: string, page: number = 1, pageSize: number = 10) {
    try {
      const skip = (page - 1) * pageSize;

      const instruments = await Instrument.find({ section })
        .skip(skip)
        .limit(pageSize);

      if (instruments.length === 0) {
        return [];
      }

      return instruments;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(`Failed to fetch instruments for section ${section}: ${apiError.message}`);
    }
  }

  async getInstrumentsBySubtype(subtype: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const instruments = await Instrument.find({ instrumentType: subtype })
      .skip(skip)
      .limit(limit);

    const totalInstruments = await Instrument.countDocuments({ instrumentType: subtype });
    const hasMore = skip + instruments.length < totalInstruments;

    return { instruments, hasMore };
  }

  async getInstrumentsByBrand(brand: string) {
    const instruments = await Instrument.find({ brandName: brand });
    return instruments;
  }

  async getInstrumentById(id: string) {
    const instrument = await Instrument.findById(id);
    return instrument;
  }

  async searchInstruments(query: string) {
    const instruments = await Instrument.find({ name: { $regex: query, $options: 'i' } }).limit(10);
    return instruments;
  }
}

export default new InstrumentService();
