import './globals.css'
import { Navbar } from '@/app/_component/navbar'

export const metadata = {
    title: 'kacir',
    description: 'kocar',
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <Navbar />
                <>{children}</>
            </body>
        </html>
    )
}
