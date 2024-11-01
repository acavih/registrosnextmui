import Partner from "@/db/models/Partner";
import { apiHandler } from "@/utils/db_binders";
import { NextResponse } from "next/server";

export const GET = apiHandler(async function listPartners(req) {
    const search = req.nextUrl.searchParams.get('search') ?? ''
    console.log('search', search)

    const partnersList = search.length > 0
        ? (await (Partner as any).search({searchQuery: search})).partners
        : await this.raw(async () => {
            const partners = await this.models.Partner.find({}).limit(20)
            return partners
        })

    return NextResponse.json(partnersList)
}) as any