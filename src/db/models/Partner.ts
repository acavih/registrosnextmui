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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
partnerSchema.statics.search = async function ({searchQuery, page = 1, itemsPerPage = 20}) {
    const partnerQueryFields = [
        // '$codigo', ' ',
        '$nombre', ' ',
        '$apellidos', ' ',
        '$telefono', ' ',
        '$sipcard', ' ',
        '$correoelectronico'
    ]

    let pattern = (searchQuery || '').replace(/\s/g, '.*')
    const specialCharacters = ['+', '/', '(', '[', ']', ')', '^', '{', '}', '$']
    specialCharacters.forEach(char => {
        pattern = pattern.replace(new RegExp('\\' + char, 'g'), '\\' + char);
    })

    const aggregatesPipeline = [
        {
            $addFields: {
                qUser: { $concat: partnerQueryFields }
            }
        },
        {$match: { qUser: new RegExp(pattern, 'i') }},
        {$limit: 20}
    ]
    const aggregatePartners = await this.aggregate(aggregatesPipeline)
    return { partners: aggregatePartners, totalItems: [] }
}

export const Partner = mongoose.models[MODEL_NAME] ?? mongoose.model('members', partnerSchema)

export default Partner