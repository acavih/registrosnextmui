import { apiHandler } from "@/utils/db_binders";
import { NextResponse } from "next/server";

export const GET = apiHandler(async function prueba () {
    console.log('En prueba api')
    const resources = await this.db.models.Resource.find({}).limit(20)
    console.log(resources)
    return NextResponse.json({msg: 'hola'})
})