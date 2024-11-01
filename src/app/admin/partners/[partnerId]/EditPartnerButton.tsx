import ResourceInput from '@/components/resources/ResourceInput';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditPartnerButton({partner}) {
    const {
        register,
        handleSubmit,
        reset,
        setValue
    } = useForm()

    console.log(partner.fechanacimiento)

    const [fechaNacimiento, setFechaNacimiento] = useState<Dayjs | null>(partner.fechanacimiento && dayjs(partner.fechanacmiento))
    
    async function processData(payload) {
        console.log('payload partner', payload)
        const req = await fetch('/api/partners', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        if (!req.ok) {
            console.log('error')
            return
        }
        const data = await req.json()
        console.log(data)
        handleClose()
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (open === false) reset()
    }, [open])
    
    return (
        <>

            <Button onClick={handleOpen} variant='contained'>Añadir socio</Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='lg'
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit(async (values) => {
                        processData({
                            ...values,
                            fechanacimiento: fechaNacimiento?.toISOString()
                        })
                    })
                }}
            >
                <DialogTitle>Añadir socio</DialogTitle>
                <DialogContent>
                    <Grid2 sx={{my: 1}} container gap={3}>
                        <Grid2 size={{xs: 12}}>
                            <TextField  label="Nombre" {...register('nombre')} defaultValue={partner.nombre} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <TextField  label="Apellidos" {...register('apellidos')} defaultValue={partner.apellidos} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <DatePicker label="Fecha de nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e)} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <TextField  label="Tarjeta SIP" {...register('sipcard')} defaultValue={partner.sipcard} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <TextField  label="Correo electrónico" {...register('correoelectronico')} defaultValue={partner.correoelectronico} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <TextField  label="Telefono" {...register('telefono')} defaultValue={partner.telefono} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <TextField multiline label="Observaciones" {...register('observaciones')} defaultValue={partner.observaciones} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <TextField multiline label="Cosas pendientes" {...register('cosaspendientes')} defaultValue={partner.cosaspendientes} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <ResourceInput label="Sexo" type={'sexos'} defaultValue={partner.sexo._id} onChange={(e) => {
                                setValue('sexo', e)
                            }} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <ResourceInput label="Socio o no" type={'socioonos'} defaultValue={partner.socioono._id} onChange={(e) => {
                                setValue('socioono', e)
                            }} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <ResourceInput label="nacionalidad" type={'nacionalidads'} defaultValue={partner.nacionalidad._id}  onChange={(e) => {
                                setValue('nacionalidad', e)
                            }} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <ResourceInput label="Ciudad de residnecia" type={'residencias'} defaultValue={partner.ciudadresidencia._id} onChange={(e) => {
                                setValue('ciudadresidencia', e)
                            }} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <ResourceInput label="Como nos conoció" type={'comoNosConoció'} defaultValue={partner.howDidKnowUs._id} onChange={(e) => {
                                setValue('howDidKnowUs', e)
                            }} />
                        </Grid2>
                        <Grid2 size={{xs: 12}}>
                            <ResourceInput label="Año en que conoció" type={'anioConocio'} defaultValue={partner.yearDidKnowus._id} onChange={(e) => {
                                setValue('yearDidKnowus', e)
                            }} />
                        </Grid2>
                    </Grid2>
                    <DialogActions>
                        <Button type='submit' disableElevation variant="contained" color="primary">
                                Añadir socio
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
