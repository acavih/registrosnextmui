import mongoose from 'mongoose'
import Resource from './Resources'
import Partner from './Partner'

const MODEL_NAME = 'attentions'

const attentionSchema = new mongoose.Schema({
    comentario: { type: String },
    fechaatencion: { type: Date },
    tipoaenciones: [{ type: mongoose.Types.ObjectId, ref: Resource.modelName }],
    Proyectos: [{ type: mongoose.Types.ObjectId, ref: Resource.modelName }],
    motivosatencion: [{ type: mongoose.Types.ObjectId, ref: Resource.modelName }],
    derivadoa: [{ type: mongoose.Types.ObjectId, ref: Resource.modelName }],
    derivadode: [{ type: mongoose.Types.ObjectId, ref: Resource.modelName }],
    formacion: [{ type: mongoose.Types.ObjectId, ref: Resource.modelName }],
    voluntariado: [{ type: mongoose.Types.ObjectId, ref: Resource.modelName }],
    lugaratencion: { type: mongoose.Types.ObjectId, ref: Resource.modelName, default: null },
    cosaspendientes: { type: String, default: '' },
    fechacosaspendientes: { type: Date },
    user: { type: mongoose.Types.ObjectId, ref: Partner.modelName },
    archived: { type: Boolean, default: false },
    tests: [{ type: mongoose.Types.ObjectId, ref: 'tests' }]
})

export const Attention = mongoose.models[MODEL_NAME] ?? mongoose.model(MODEL_NAME, attentionSchema)

export default Attention