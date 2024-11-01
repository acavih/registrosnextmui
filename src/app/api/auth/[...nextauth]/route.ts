import User from '@/db/models/User'
import { connectMongo } from '@/utils/db_binders'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectMongo()

                const user = await User.findOne({
                    user: credentials?.username
                }) as any

                if (!user) {
                    throw new Error('Credenciales incorrectas')
                }

                console.log('usuario encontrado', user)
                
                if (!(User as any).checkPassword(credentials?.password, user.password)) {
                    throw new Error('Credenciales incorrectas')
                }

                console.log('contraseña correcta')

                return { id: user._id, name: user.user, email: user.user }
            }
        })
    ]
})

export { handler as GET, handler as POST }
