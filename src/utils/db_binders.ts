import { DB_MODELS } from '@/db'
import { MONGODB_URI } from '@/vars'
import chalk from 'chalk'
import mongoose from 'mongoose'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

const appContext = {
    models: DB_MODELS,
    async raw (fn) {
        const result = await fn()
        return JSON.parse(JSON.stringify(result))
    }
}

const connectionOptions: mongoose.ConnectOptions = {}

type HandlerScope = typeof appContext

type NextHandler = (this: HandlerScope, req: NextRequest, res: NextResponse) => void
type ServerReactBinder = (this: HandlerScope, ...args) => void

export async function connectMongo () {
    console.log('connection', mongoose.connection.readyState)
    if (mongoose.connection.readyState === 1) {
        console.log(chalk.bgRed.white("La conexión a la base de datos ya se realizó"))
        return
    }
    
    console.log(chalk.bgRed.white("Conectando a la base de datos"))
    await mongoose.connect(MONGODB_URI, connectionOptions)
    console.log(chalk.bgRed.white(" -> Conectado a la base de datos correctamente"))
};

export function apiHandler (handler: NextHandler, isAuthorized: boolean = true): NextHandler {
    return async (req, res) => {
        try {
            if (isAuthorized) {
                // TODO: Falta por hacer autorización
                const session = await getServerSession()
                if (session === null) {
                    return NextResponse.json({}, {status: 401})
                }
            }

            await connectMongo()
            return await handler.bind(appContext)(req, res)
        } catch (error: any) {
            console.log('Un error desconocido', error.message)
            return NextResponse.json({message: 'Error interno'}, {
                status: 500
            })
        }
    }
};

export function reactServerBinder (rc: ServerReactBinder)  {
    return async function (params, searchParams) {
        await connectMongo()
        return await rc.bind(appContext) (params, searchParams)
    }
}
