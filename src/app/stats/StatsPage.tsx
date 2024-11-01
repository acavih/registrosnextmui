'use client'
import RegistrosBarChart from '@/components/charts/RegistrosBarChart';
import RegistrosBarChartHorizontal from '@/components/charts/RegistrosBarChartHorizontal';
import RegistrosPieChart from '@/components/charts/RegistrosPieChart';
import { keyStat, multipleKeyStat } from '@/utils/stats';
import { ArrowBack } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Grid2, IconButton, Stack, Tab } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FilterData from './FilterData';

const drawerWidth = 400;

export default function StatsPage(props) {
    const router = useRouter()
    const [attentions, setAttentions] = useState(props.attentions)
    const [partners, setPartners] = useState(props.partners)
    const [fechaDesde, setFechaDesde] = useState<Dayjs | null>(null)
    const [fechaHasta, setFechaHasta] = useState<Dayjs | null>(null)

    useEffect(() => {
        if (fechaDesde === null || fechaHasta === null) return
        if (fechaDesde.isAfter(fechaHasta)) return
        refreshData(fechaDesde.toISOString(), fechaHasta.toISOString())
    }, [fechaDesde, fechaHasta])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton onClick={() => router.push('/admin/resources')}>
                        <ArrowBack sx={{color: 'white'}} />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Estadísticas
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <FilterData attentions={attentions} partners={partners} />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
                        <Graphs {...{partners, attentions}} />
                    </Grid2>
                </Stack>
            </Box>
        </Box>
    );
    async function refreshData(fechaDesde: string, fechaHasta: string) {
        const req = await fetch('/api/stats?' + new URLSearchParams({fechaDesde, fechaHasta}))
        const data = await req.json()
        setAttentions(data.attentions)
        setPartners(data.users)
    }
}



function Graphs ({partners, attentions}) {
    const [currentTab, setCurrentTab] = useState(0)

    return (
        <Grid2 size={12}>
            <TabContext value={currentTab}>
                <TabList onChange={(e, newVal) => setCurrentTab(newVal)}>
                    <Tab value={0} label="Personas" />
                    <Tab value={1} label="Atenciones" />
                </TabList>
                <TabPanel value={0}>
                    <Grid2 container>
                        <Grid2 size={6}>
                            <RegistrosPieChart titleChart={'Sexo'} data={keyStat(partners, 'sexo')} />
                        </Grid2>
                        <Grid2 size={6}>
                            <RegistrosPieChart titleChart={'Socio o no'} data={keyStat(partners, 'socioono')} />
                        </Grid2>
                        <Grid2 size={12}>
                            <RegistrosBarChartHorizontal title={'Nacionalidad'} data={keyStat(partners, 'nacionalidad', 10)} />
                        </Grid2>
                        <Grid2 size={12}>
                            <RegistrosBarChartHorizontal title={'Ciudad residencia'} data={keyStat(partners, 'ciudadresidencia', 10)} />
                        </Grid2>
                        <Grid2 size={6}>
                            <RegistrosBarChart title={'Como nos conoció'} data={keyStat(partners, 'howDidKnowUs')} />
                        </Grid2>
                        <Grid2 size={6}>
                            <RegistrosBarChart title={'Año en que nos conoció'} data={keyStat(partners, 'yearDidKnowus')} />
                        </Grid2>
                    </Grid2>
                </TabPanel>
                <TabPanel value={1}>
                    <Grid2 container>
                        <Grid2 size={6}>
                            <RegistrosBarChart title={'Tipos de atenciones'} data={multipleKeyStat(attentions, 'tipoaenciones')} />
                        </Grid2>
                        <Grid2 size={6}>
                            <RegistrosBarChart title={'Proyectos'} data={multipleKeyStat(attentions, 'Proyectos')} />
                        </Grid2>
                        <Grid2 size={6}>
                            <RegistrosBarChart title={'Derivado a'} data={multipleKeyStat(attentions, 'derivadoa')} />
                        </Grid2>
                        <Grid2 size={6}>
                            <RegistrosBarChart title={'Derivado de'} data={multipleKeyStat(attentions, 'derivadode')} />
                        </Grid2>
                        <Grid2 size={6}>
                            <RegistrosBarChart title={'motivosatencion'} data={multipleKeyStat(attentions, 'motivosatencion')} />
                        </Grid2>
                        <Grid2 size={6}>
                            <RegistrosBarChart title={'Formacion'} data={multipleKeyStat(attentions, 'formacion')} />
                        </Grid2>
                        <Grid2 size={6}>
                            <RegistrosBarChart title={'Lugares de atención'} data={keyStat(attentions, 'lugaratencion')} />
                        </Grid2>
                    </Grid2>
                </TabPanel>
            </TabContext>
        </Grid2>
    )
}