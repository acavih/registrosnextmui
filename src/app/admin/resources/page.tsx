import React from 'react'
import { reactServerBinder } from "@/utils/db_binders";
import ResourcesPage from './ResourcesPage';

export default reactServerBinder(async function Page() {
    const resources = await this.raw(async () => {
        return await this.models.Resource.find({}).sort('name').sort('type')
    })

    console.log(resources[0])

    return (
        <ResourcesPage resources={resources} />
    )
})
