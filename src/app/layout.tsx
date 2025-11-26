import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/literata";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Panic Manual",
  description: "AI-powered guides to fight back against confusing medical bills and collection letters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light') {
                  document.documentElement.classList.remove('dark')
                } else {
                  document.documentElement.classList.add('dark')
                  if (!localStorage.theme) localStorage.theme = 'dark'
                }
              } catch (_) {
                document.documentElement.classList.add('dark')
              }
            `,
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-text">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
