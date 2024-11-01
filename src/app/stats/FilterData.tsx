'use client'
import { multipleKeyStat } from '@/utils/stats';
import { Autocomplete, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import { useEffect, useState } from 'react';

export default function FilterData ({partners, attentions}) {
    const [filtersPartners, setFiltersPartners] = useState<any>({
        sexo: [],
        socioono: [],
        nacionalidad: [],
        ciudadresidencia: [],
        howDidKnowUs: [],
        yearDidKnowus: [],
    })

    useEffect(filterPartners, [filtersPartners])

    const setFilterPartnerHandler = (key) => (e, newInput) => setFiltersPartners({
        filtersPartners,
        [key]: newInput
    })

    return (
        <Box sx={{ overflow: 'auto', p: 1 }}>
            <Typography variant="h5" color="initial">Filtros socios</Typography>
            <Stack dir={'vertical'} gap={2}>
                <Autocomplete options={getFiltersFor(partners, 'sexo')} multiple
                    onChange={setFilterPartnerHandler('sexo')}
                    getOptionLabel={option => option.name}
                    renderInput={(params) => <TextField {...params} label="Sexo" />}
                />
                <Autocomplete options={getFiltersFor(partners, 'socioono')} multiple
                    onChange={setFilterPartnerHandler('socioono')}
                    getOptionLabel={option => option.name}
                    renderInput={(params) => <TextField {...params} label="Socio o no" />}
                />
                <Autocomplete options={getFiltersFor(partners, 'nacionalidad')} multiple
                    onChange={setFilterPartnerHandler('nacionalidad')}
                    getOptionLabel={option => option.name}
                    renderInput={(params) => <TextField {...params} label="Nacionalidad" />}
                />
                <Autocomplete options={getFiltersFor(partners, 'ciudadresidencia')} multiple
                    onChange={setFilterPartnerHandler('ciudadresidencia')}
                    getOptionLabel={option => option.name}
                    renderInput={(params) => <TextField {...params} label="Ciudad de residencia" />}
                />
                <Autocomplete options={getFiltersFor(partners, 'howDidKnowUs')} multiple
                    onChange={setFilterPartnerHandler('howDidKnowUs')}
                    getOptionLabel={option => option.name}
                    renderInput={(params) => <TextField {...params} label="Como nos conoció" />}
                />
                <Autocomplete options={getFiltersFor(partners, 'yearDidKnowus')} multiple
                    onChange={setFilterPartnerHandler('yearDidKnowus')}
                    getOptionLabel={option => option.name}
                    renderInput={(params) => <TextField {...params} label="Año en que nos conoció" />}
                />
            </Stack>
            <Typography variant="h5" color="initial">Filtros atenciones</Typography>
            <Stack dir={'vertical'} gap={2}>
                <Autocomplete options={getFiltersMultipleFor(attentions, 'tipoaenciones')} multiple
                    getOptionLabel={option => option?.name}
                    renderInput={(params) => <TextField {...params} label="Tipos de atenciones" />}
                />
                <Autocomplete options={getFiltersMultipleFor(attentions, 'Proyectos')} multiple
                    getOptionLabel={option => option?.name}
                    renderInput={(params) => <TextField {...params} label="Proyectos" />}
                />
                <Autocomplete options={getFiltersMultipleFor(attentions, 'motivosatencion')} multiple
                    getOptionLabel={option => option?.name}
                    renderInput={(params) => <TextField {...params} label="Motivos de atención" />}
                />
                <Autocomplete options={getFiltersMultipleFor(attentions, 'derivadoa')} multiple
                    getOptionLabel={option => option?.name}
                    renderInput={(params) => <TextField {...params} label="Derivado a" />}
                />
                <Autocomplete options={getFiltersMultipleFor(attentions, 'derivadode')} multiple
                    getOptionLabel={option => option?.name}
                    renderInput={(params) => <TextField {...params} label="Derivado de" />}
                />
                <Autocomplete options={getFiltersMultipleFor(attentions, 'formacion')} multiple
                    getOptionLabel={option => option?.name}
                    renderInput={(params) => <TextField {...params} label="Formación" />}
                />
                <Autocomplete options={getFiltersMultipleFor(attentions, 'voluntariado')} multiple
                    getOptionLabel={option => option?.name}
                    renderInput={(params) => <TextField {...params} label="Voluntariado" />}
                />
                <Autocomplete options={getFiltersFor(attentions, 'lugaratencion')} multiple
                    getOptionLabel={option => option?.name}
                    renderInput={(params) => <TextField {...params} label="Lugar de atención" />}
                />
            </Stack>
        </Box>
    )

    function filterPartners () {
        let filtered = partners.filter((p) => {
            for (let index = 0; index < filtersPartners.sexo.length; index++) {
                const element = filtersPartners.sexo[index];
                console.log('comprobar', element._id, p?.sexo._id)
                if (p !== null && element._id === p?.sexo._id)
                    return true
            }
        })
        filtered = partners.filter((p) => {
            for (let index = 0; index < filtersPartners.socioono.length; index++) {
                const element = filtersPartners.socioono[index];
                console.log('comprobar', element._id, p?.socioono._id)
                if (p !== null && element._id === p?.socioono._id)
                    return true
            }
        })
        console.log(filtered)
    }

    function getFiltersFor (elementSet, key) {
        return _.uniqBy(
            elementSet.filter(p => p !== null)
                .filter(p => typeof p[key] !== 'undefined').map(p => p[key]),
            '_id'
        ) as any[]
    }

    function getFiltersMultipleFor (elementSet, key) {
        return multipleKeyStat(elementSet, key)
    }
}