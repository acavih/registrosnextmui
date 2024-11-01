'use client'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Alert, Box, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import AddPartnerButton from './AddPartnerButton'

export default function PartnersPage(props) {
    const [partners, setPartners] = useState(props.partners)
    const [search, setSearch] = useState('')

    useEffect(() => void searchPartners(), [search])
    
    return (
        <Stack direction={'column'} gap={5}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h3" color="initial">Listado de socios {partners.length}</Typography>
                <AddPartnerButton />
            </Box>
            <TextField label="Busqueda de socios" value={search} onChange={(e) => setSearch(e.target.value)} />
            <TableContainer>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellidos</TableCell>
                            <TableCell>Correo electrónico</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {partners.map((item) => (
                            <PartnerTableRow item={item} key={item._id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )

    async function searchPartners() {
        const partnersReq = await fetch('/api/partners/list?' + new URLSearchParams({search}))
        const res = await partnersReq.json()
        setPartners(res)
    }
}

function PartnerTableRow({item}) {
    const [expanded, setExpanded] = useState(false)

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ArrowDropUp /> : <ArrowDropDown />}
                    </IconButton>
                </TableCell>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.apellidos}</TableCell>
                <TableCell>{item.correoelectronico}</TableCell>
                <TableCell>
                    <Button size='small' disableElevation href={'/admin/partners/' + item._id} variant="contained" color="primary">
                        Ver socio
                    </Button>
                </TableCell>
            </TableRow>
            {expanded && (
                <TableRow>
                    <TableCell colSpan={5}>
                        <Alert>
                            Mas información...
                        </Alert>
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}
