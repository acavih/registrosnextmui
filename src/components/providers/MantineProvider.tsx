import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
    fontFamily: 'Open sans, System font',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
    headings: { fontFamily: 'Open sans, System font' },
});

export default function MantineCustomProvider({children}) {
    return (
        <MantineProvider theme={theme}>
            {children}
        </MantineProvider>
    );
}