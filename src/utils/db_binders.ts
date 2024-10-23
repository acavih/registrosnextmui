import { DB_MODELS } from '@/db'
import { MONGODB_URI } from '@/vars'
import chalk from 'chalk'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

const connectionOptions: mongoose.ConnectOptions = {}

type HandlerScope = {
    db: {
        models: typeof DB_MODELS
    }
}

type NextHandler = (this: HandlerScope, req: NextRequest, res: NextResponse) => void
type ServerReactBinder = (this: HandlerScope, ...args) => void

async function connectMongo () {
    console.log('connection', mongoose.connection.readyState)
    if (mongoose.connection.readyState === 1) {
        console.log(chalk.bgRed.white("La conexión a la base de datos ya se realizó"))
        return
    }
    
    console.log(chalk.bgRed.white("Conectando a la base de datos"))
    await mongoose.connect(MONGODB_URI, connectionOptions)
    console.log(chalk.bgRed.white(" -> Conectado a la base de datos correctamente"))
};

export function apiHandler (handler: NextHandler): NextHandler {
    return async (req, res) => {
        try {
            await connectMongo()
            return await handler.bind({db: {models: DB_MODELS}})(req, res)
        } catch (error: any) {
            console.log('Un error desconocido', error.message)
            return NextResponse.json({message: 'Error interno'}, {
                status: 500
            })
        }
    }
};

export function reactServerBinder (rc: ServerReactBinder)  {
    return async function (...args) {
        return await rc.bind({db: {models: DB_MODELS}}) (...args)
    }
}
