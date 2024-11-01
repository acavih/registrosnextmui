'use client'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                size: 'small',
            },
        },
        MuiSelect: {
            defaultProps: {
                fullWidth: true,
                size: 'small',
            },
        }
    },
});

export default function MuiThemeProvider({children}) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}
