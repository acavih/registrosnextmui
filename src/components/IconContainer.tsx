import { Box, BoxProps } from '@mantine/core'
import React, { PropsWithChildren } from 'react'
import {ComponentProps} from 'react'

type IconContainerProps = PropsWithChildren<BoxProps> & ComponentProps<'div'>

export default function IconContainer({children, ...rest}: IconContainerProps) {
    return (
        <Box display={'flex'} p={7} bg={'blue'} style={{alignSelf: 'center', borderRadius: '50px'}} {...rest as any}
            renderRoot={(props) => <div {...props} />}
        >
            {children}
        </Box>
    )
}
