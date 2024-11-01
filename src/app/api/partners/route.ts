import { apiHandler } from "@/utils/db_binders";
import { NextResponse } from "next/server";

export const POST = apiHandler(async function createPartner(req) {
    const payload = await req.json()
    console.log('payload', payload)
    await this.models.Partner.create(payload)
    return NextResponse.json({message: 'recibido'})
}) as any