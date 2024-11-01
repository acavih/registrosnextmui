'use client'
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import EditPartnerButton from './EditPartnerButton'

export default function PartnerIdPage({partner}) {
    return (
        <Stack dir={'vertical'} gap={2}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="h4" color="initial">{partner.nombre} {partner.apellidos}</Typography>
                <EditPartnerButton partner={partner} />
            </Box>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>{partner.nombre}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}
