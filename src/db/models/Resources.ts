import mongoose from 'mongoose'

const MODEL_NAME = 'resources'

const resourceSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, default: '' },
    archived: { type: Boolean, default: false }
})

export const Resource = mongoose.models[MODEL_NAME] ?? mongoose.model(MODEL_NAME, resourceSchema)

export default Resource