import { apiHandler } from "@/utils/db_binders";
import { NextResponse } from "next/server";
import _ from "lodash";

export const GET = apiHandler(async function getStats(req) {
    const fechaDesde = req.nextUrl.searchParams.get('fechaDesde')
    const fechaHasta = req.nextUrl.searchParams.get('fechaHasta')
    const attentions = await this.raw(async () => {
        const attentions = await this.models.Attention.find({
            fechaatencion: {
                $gte: fechaDesde,
                $lte: fechaHasta
            }
        }).populate({
            path: 'user',
            populate: ['sexo','socioono', 'nacionalidad', 'ciudadresidencia', 'howDidKnowUs', 'yearDidKnowus']
        })
        return attentions
    })
    const users = _.uniqBy(attentions.map(a => a.user), '_id')

    return NextResponse.json({attentions, users})
})