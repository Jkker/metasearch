import Engine from 'models/Engine.js';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			lowercase: true,
			required: [true, "can't be blank"],
			match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
			index: true,
		},
		email: {
			type: String,
			lowercase: true,
			required: [true, "can't be blank"],
			match: [/\S+@\S+\.\S+/, 'is invalid'],
			index: true,
		},
		image: String,
		hash: String,
		salt: String,
		config: [Engine],
	},
	{ timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
