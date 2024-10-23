import mongoose from 'mongoose'
import Resource from './Resources'

const MODEL_NAME = 'members'

const partnerSchema = new mongoose.Schema({
    codigo: { default: '', type: String },
    nombre: { default: '', type: String },
    apellidos: { default: '', type: String },
    fechanacimiento: { type: Date },
    sipcard: { default: '', type: String },
    correoelectronico: { default: '', type: String },
    telefono: { default: '', type: String },
    observaciones: { default: '', type: String },
    cosaspendientes: { default: '', type: String },
    sexo: { type: mongoose.Types.ObjectId, ref: Resource.modelName },
    socioono: { type: mongoose.Types.ObjectId, ref: Resource.modelName },
    nacionalidad: { type: mongoose.Types.ObjectId, ref: Resource.modelName },
    ciudadresidencia: { type: mongoose.Types.ObjectId, ref: Resource.modelName },
    howDidKnowUs: { type: mongoose.Types.ObjectId, ref: Resource.modelName },
    yearDidKnowus: { type: mongoose.Types.ObjectId, ref: Resource.modelName }
})

export const Partner = mongoose.models[MODEL_NAME] ?? mongoose.model('members', partnerSchema)

export default Partner