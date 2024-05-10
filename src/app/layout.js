import './globals.css'

export const metadata = {
    title: 'kacir',
    description: 'kocar',
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>{children}</body>
        </html>
    )
}
