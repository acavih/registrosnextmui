'use client'
import { Toolbar, TextField, Card, CardContent, CardHeader, CardActions, Button, Grid2 } from '@mui/material';
import LoginAppBar from './LoginAppBar';
import Container from '@mui/material/Container'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

function HomePage() {
    const router = useRouter()
    return (
        <>
            <LoginAppBar />
            <Toolbar />
            <Container maxWidth="md" sx={{mt: 3}}>
                <Card component={'form'} onSubmit={async (e) => {
                    e.preventDefault()
                    const fd = new FormData(e.target as HTMLFormElement)
                    const username = fd.get('username')
                    const password = fd.get('password')
                    const signin = await signIn('credentials', {
                        username, password
                    })
                    if (!signin?.ok) {
                        console.log('Login fallido')
                    }
                    router.push('/admin/partners')
                }}>
                    <CardHeader title="Iniciar sesión" />
                    <CardContent>
                        <Grid2 gap={2} container>
                            <Grid2 size={12}>
                                <TextField name='username' label="Username" />
                            </Grid2>
                            <Grid2 size={12}>
                                <TextField name='password' label="Contraseña" type='password' />
                            </Grid2>
                        </Grid2>
                    </CardContent>
                    <CardActions>
                        <Button type='submit' variant="contained" color="primary" disableElevation>
                          Iniciar sesión
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </>
    )
}

export default HomePage
