import { CopyAll } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

const CanvasButtonWrapper = ({children}) => {
    const elementRef = useRef(null);

    const copyToClipboard = async () => {
        const element = elementRef.current as any;
        if (!element) return;

        // Crear un canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Ajustar el tamaño del canvas
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;

        // Dibujar el elemento en el canvas
        ctx!.drawImage(await html2canvas(element), 0, 0);

        // Convertir el canvas a una imagen en formato data URL
        const dataUrl = canvas.toDataURL('image/png');

        // Copiar la imagen al portapapeles
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'image/png': fetch(dataUrl).then(res => res.blob()),
                }),
            ]);
            alert('Imagen copiada al portapapeles!');
        } catch (error) {
            console.error('Error al copiar la imagen: ', error);
        }
    };

    return (
        <Box sx={{position: 'relative'}}>
            <Box ref={elementRef}>
                {children}
            </Box>
            <IconButton sx={{position: 'absolute', top: '0px', right: '0px'}} onClick={copyToClipboard}>
                <CopyAll />
            </IconButton>
        </Box>
    );
};

export default CanvasButtonWrapper;
