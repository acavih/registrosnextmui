'use client'
import RegistrosBarChart from '@/components/charts/RegistrosBarChart'
import RegistrosPieChart from '@/components/charts/RegistrosPieChart'
import { keyStat } from '@/utils/stats'
import { AppBar, Box, Button, Grid2, Stack, Toolbar, Typography } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

export default function StatsPage(props) {
    const [attentions, setAttentions] = useState(props.attentions)
    const [partners, setPartners] = useState(props.partners)
    const [fechaDesde, setFechaDesde] = useState<Dayjs | null>(null)
    const [fechaHasta, setFechaHasta] = useState<Dayjs | null>(null)

    useEffect(() => {
        // if (partners === null) return
        const sexosData = keyStat(partners, 'sexo')
        console.log('sexos', sexosData)
    }, [partners, attentions])

    useEffect(() => {
        if (fechaDesde === null || fechaHasta === null) return
        if (fechaDesde.isAfter(fechaHasta)) return
        refreshData(fechaDesde.toISOString(), fechaHasta.toISOString())
    }, [fechaDesde, fechaHasta])
    
    return (
        <Box>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Clipped drawer asa
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Stack direction={'column'} gap={2}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h4" color="initial">Estadisticas</Typography>
                    <Stack direction={'row'} gap={2}>
                        <Button variant="contained" color="primary">
                                Atenciones ({attentions.length})
                        </Button>
                        <Button variant="contained" color="primary">
                                Socios ({partners.length})
                        </Button>
                    </Stack>
                </Box>
                <Box sx={{border: '1px solid', p: 2}}>
                    <Typography variant="h5" color="initial">Filtrar por fecha</Typography>
                    <Stack direction={'row'} gap={2}>
                        <DateTimePicker label="Fecha desde" value={fechaDesde} onChange={(e) => setFechaDesde(e)} />
                        <DateTimePicker label="Fecha hasta" value={fechaHasta} onChange={(e) => setFechaHasta(e)} />
                    </Stack>
                    <Button variant="contained" color="primary" sx={{mt: 1}}>
                            Actualizar
                    </Button>
                </Box>
                <Grid2 gap={3} container>
                    <Grid2 size={9}>
                        <Grid2 container>
                            <Grid2 size={4}>
                                <RegistrosPieChart data={keyStat(partners, 'sexo')} />
                            </Grid2>
                            <Grid2 size={4}>
                                <RegistrosPieChart data={keyStat(partners, 'sexo')} />
                            </Grid2>
                            <Grid2 size={4}>
                                <RegistrosPieChart data={keyStat(partners, 'sexo')} />
                            </Grid2>
                            <Grid2 size={6}>
                                <RegistrosBarChart />
                            </Grid2>
                            <Grid2 size={6}>
                                <RegistrosBarChart />
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 size={3}>
                        <Typography variant="body1" color="initial">Filtros</Typography>
                    </Grid2>
                </Grid2>
            </Stack>
        </Box>
    )

    async function refreshData(fechaDesde: string, fechaHasta: string) {
        const req = await fetch('/api/stats?' + new URLSearchParams({fechaDesde, fechaHasta}))
        const data = await req.json()
        setAttentions(data.attentions)
        setPartners(data.users)
    }
}
