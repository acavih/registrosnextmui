'use client'

import IconContainer from '@/components/IconContainer'
import { AppShell, Box, Container, Grid, Text, Title } from '@mantine/core'
import { IconPencil, IconCirclePlus } from '@tabler/icons-react'
import React, { useState } from 'react'
import _ from 'lodash'

import styles from './list.module.css'

export default function ResourcesPage({resources}) {
    const [typesResources] = useState<string[]>(_.uniq(resources.map(r => r.type)))
    const [currentResource, setCurrentResource] = useState(typesResources[0])

    return (
        <AppShell>
            <AppShell.Header>
                <Box px={20} py={2} bg={'blue.8'} c={'white'}>
                    <Title size={'h2'}>
                        Registros
                    </Title>
                </Box>
            </AppShell.Header>
            <AppShell.Main>
                <Container mt={50} size={'xl'}>
                    <Grid>
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
                </Container>
            </AppShell.Main>
        </AppShell>
    )
}
