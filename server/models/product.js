import mongoose, { Schema } from 'mongoose';

const Product = Schema({
	title: {
		type: String,
		lowercase: true,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	category: {
		type: Schema.Types.ObjectId
	}
});

export default mongoose.model('Product', Product);