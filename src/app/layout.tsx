import "./globals.css"
import { Toaster } from 'react-hot-toast'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Statizer | v0.1 beta</title>
      </head>
      <body>
        <Toaster position="bottom-center" />
        {children}
        </body>
    </html>
  )
}
