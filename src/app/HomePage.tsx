'use client'

import React from 'react'

function HomePage() {
    
    return (
        <div>
            <div>HomePage</div>
            <button onClick={async () => {
                await fetch('/api/prueba')
            }}>Mandar petición a api</button>
        </div>
    )
}

export default HomePage
