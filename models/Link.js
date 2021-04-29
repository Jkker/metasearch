import mongoose from 'mongoose'

const LinkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    url: { type: String, required: true, trim: true }, //search key replaced with '%s'
    platform: {
      desktop: { type: Boolean, default: true },
      mobile: { type: Boolean, default: true },
    },
    priority: { type: Number, default: 0 }, // larger number = greater priority
    blockedRegions: { type: [String], default: [] }, // 2 letter ISO-3166-1 country codes (e.g. "US")
    locale: String, // BCP-47 language tag (e.g. "en-US")
    embeddable: { type: Boolean, default: false }, // true = embedded iframe; false = external link
    slug: { type: String },
    style: {
      // obtained from simple-icon using slugs
      hex: { type: String, default: '#FFFFFF' },
      svg: { type: String },
    },
  },
  { timestamps: true }
)

export default mongoose.models.Link || mongoose.model('Link', LinkSchema)
