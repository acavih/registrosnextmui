import { reactServerBinder } from '@/utils/db_binders'
import React from 'react'
import PartnersPage from './PartnersPage'

export default reactServerBinder(async function Page() {
    const partners = await this.raw(async () => {
        const partners = await this.models.Partner.find({}).limit(20)
        return partners
    })
    return (
        <PartnersPage partners={partners} />
    )
})
