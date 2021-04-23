import mongoose from 'mongoose';

const EngineSchema = new mongoose.Schema({
	url: { type: String, unique: true, required: true, trim: true }, //search key replaced with '%s'
	urlMobile: { type: String, unique: true, required: false, trim: true }, //search key replaced with '%s'
	name: { type: String, unique: true, required: true, trim: true },
	priority: { type: Number, default: 0 }, // larger number = greater priority
	blockedRegions: [String], // 2 letter ISO-3166-1 country codes
	locale: String,
	embeddable: Boolean, // true = embedded iframe; false = external link
	slug: String, // slug for retrieving icons
});

export default EngineSchema;
