'use client'

import { Box, Button, IconButton, List, ListItem, MenuItem, Select, Stack, Typography } from '@mui/material'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import {Edit} from '@mui/icons-material'


export default function ResourcesPage({resources}) {
    const [typesResources] = useState<string[]>(_.uniq(resources.map(r => r.type)))
    const [currentResource, setCurrentResource] = useState(typesResources[0])

    const currentResourcesItems = useMemo(
        () => resources.filter(r => r.type === currentResource),
        [currentResource, resources]
    )

    return (
        <Stack direction={'column'} gap={3}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="h4" color="initial">Recursos</Typography>
                <Button variant="contained" color="primary">
                  Añadir recurso
                </Button>
            </Box>
            <Select 
                value={currentResource} onChange={(e) => setCurrentResource(e.target.value)}
            >
                {typesResources.map((item) => <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>)}
            </Select>

            <List>
                {currentResourcesItems.map((item) => <ListItem key={item.name}>
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <Edit />
                            </IconButton>
                        }
                    >
                        {item.name}
                    </ListItem>
                </ListItem>)}
            </List>
        </Stack>
    )
}


/**
 * 
 * 
 * <Grid>
            <Grid.Col span={8}>
                <Box display={'flex'} style={{justifyContent: 'space-between'}}>
                    <Title order={2}>
                        Listado de elementos
                    </Title>
                    <Box>
                        <IconContainer onClick={() => {
                            alert('Añadiendo recurso')
                        }}>
                            <IconCirclePlus color='white' />
                        </IconContainer>
                    </Box>
                </Box>
                <div>
                    {resources.filter(r => r.type === currentResource).map(r => (
                        <Box className={styles.separator} key={r.id}>
                            <Box px={10} py={5} display={'flex'} style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Box>
                                    <Title order={3}>{r.name}</Title>
                                    <Text>{r.type}</Text>
                                </Box>
                                <Box>
                                    <IconContainer>
                                        <IconPencil color='white' onClick={() => {
                                            alert('Editando recurso')
                                        }} />
                                    </IconContainer>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </div>
            </Grid.Col>
            <Grid.Col span={4}>
                <Title order={4}>Tipos de recursos</Title>
                {typesResources.map(r => (
                    <Box key={r} style={{cursor: 'pointer'}} onClick={() => setCurrentResource(r)}>
                        <Text c={currentResource === r ? 'blue' : ''}>{r}</Text>
                    </Box>
                ))}
            </Grid.Col>
        </Grid>
 */