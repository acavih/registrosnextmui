import { Autocomplete, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

export default function ResourceInput({
    label, type, onChange, defaultValue = '', multiple = false
}) {
    const [resourceList, setResourceList] = useState<any[]>([])

    useEffect(() => {
        retrieveResources()
    }, [])

    return (
        <Autocomplete multiple={multiple}
            defaultValue={defaultValue}
            onChange={async (e, newVal) => onChange(newVal)}
            options={resourceList.map(r => r._id)}
            getOptionLabel={(r) => resourceList.filter(a => a._id === r)[0]?.name ?? ''}
            renderInput={(params) => (
                <TextField {...params} label={label ?? "Resouce input"} />
            )}
        />
    )

    async function retrieveResources() {
        const resources = await fetch('/api/resource/type?' + new URLSearchParams({type}))
        const resourcesData = await resources.json()
        setResourceList(resourcesData)
    }
}
