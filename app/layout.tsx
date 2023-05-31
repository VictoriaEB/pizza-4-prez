import './globals.css'

export const metadata = {
  title: 'Pizza 4 Prez',
  description: 'This is pizza for prez',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head></head>
      <body>{children}</body>
    </html>
  )
}
