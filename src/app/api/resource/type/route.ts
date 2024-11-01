import { apiHandler } from "@/utils/db_binders";
import { NextResponse } from "next/server";

export const GET = apiHandler(async function (req) {
    const resources = await this.raw(async () => {
        return await this.models.Resource
            .find({type: req.nextUrl.searchParams.get('type')})
            .sort({name: 'asc'})
    })
    return NextResponse.json(resources)
})