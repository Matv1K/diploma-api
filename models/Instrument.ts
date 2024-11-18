import mongoose from 'mongoose';

const instrumentSchema = new mongoose.Schema(
  { name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    isNew: { type: Boolean, default: false },
    section: { type: String, required: true },
    brandName: { type: String, required: true },
    salePrice: { type: Number, default: 0 },
    onSale: { type: Boolean, default: false },
    bought: { type: Number, default: 0 },
    colors: { type: Array, required: true },
    instrumentType: { type: String, required: true },
    characteristics: {
      type: Object,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    } },
  { timestamps: true, suppressReservedKeysWarning: true },
);

export default mongoose.model('Instrument', instrumentSchema);
