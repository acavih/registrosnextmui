import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

export const MODEL_NAME = 'users'

const userSchema = new mongoose.Schema({
    user: { type: String },
    password: { type: String }
}, {
    statics: {
        async checkPassword(password, hash) {
            return await bcryptjs.compare(password, hash)
        }
    }
})

userSchema.pre('save', async function hashPassword(this: any) {
    console.log('hola desde el pre save')
    this.set('password', await bcryptjs.hash(this.get('password'), 8))
})

export const User = mongoose.models[MODEL_NAME] ?? mongoose.model(MODEL_NAME, userSchema)

export default User