const mongoose = require('mongoose');
const MpathPlugin  = require('mongoose-mpath');
const mongoosePaginate = require('mongoose-paginate-v2');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
CategorySchema.plugin(MpathPlugin);
CategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Category', CategorySchema);