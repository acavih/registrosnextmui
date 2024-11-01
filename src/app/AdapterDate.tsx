'use client'
import 'dayjs/locale/es'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function AdapterDate({ children }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
            {children}
        </LocalizationProvider>
    );
}