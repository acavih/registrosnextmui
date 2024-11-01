import { reactServerBinder } from '@/utils/db_binders'
import React from 'react'
import PartnerIdPage from './PartnerIdPage'

export default reactServerBinder(async function Page(props) {
    const params = await props.params
    console.log('params', params)

    const partner = await this.raw(async () => {
        return await this.models.Partner.findById(params.partnerId)
            .populate([
                'sexo', 'socioono', 'nacionalidad',
                'ciudadresidencia', 'howDidKnowUs', 'yearDidKnowus'
            ])
    })
    console.log(partner)
    return (
        <PartnerIdPage partner={partner} />
    )
})
