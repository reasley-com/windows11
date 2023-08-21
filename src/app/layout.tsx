import './globals.css'

export const metadata = {
	title: 'Windows 11',
	description: 'Next js practice',
}

export default function RootLayout({ children }: { children: React.ReactNode}) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	)
}
