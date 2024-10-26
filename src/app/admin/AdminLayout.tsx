'use client'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { usePathname } from 'next/navigation';
import Link from 'next/link'

const drawerWidth = 240;

export default function AdminLayout({children}) {
    const pathname = usePathname()
    const menu = [
        {activePattern: 'users', href: '/admin/users', text: 'Usuarios'},
        {activePattern: 'partners', href: '/admin/partners', text: 'Socios'},
        {activePattern: 'resources', href: '/admin/resources', text: 'Recursos'},
        {activePattern: 'stats', href: '/admin/stats', text: 'Estadísticas'},
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
            Clipped drawer {pathname}
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
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menu.map((text) => (
                            <ListItemButton LinkComponent={Link} href={text.href}
                                key={text.text} selected={pathname.includes(text.activePattern)}
                            >
                                <ListItemText primary={text.text} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
