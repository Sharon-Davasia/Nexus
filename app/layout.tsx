import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Nexus - Text-to-SaaS Platform",
    description: "Transform natural language into deployed, production-ready SaaS applications. Build faster with AI-powered development.",
    keywords: ["AI", "SaaS", "no-code", "application builder", "development platform"],
    authors: [{ name: "Nexus Team" }],
    openGraph: {
        title: "Nexus - Text-to-SaaS Platform",
        description: "Transform natural language into deployed, production-ready SaaS applications.",
        type: "website",
        url: "https://nexus.dev",
    },
    twitter: {
        card: "summary_large_image",
        title: "Nexus - Text-to-SaaS Platform",
        description: "Transform natural language into deployed, production-ready SaaS applications.",
    },
    viewport: "width=device-width, initial-scale=1",
    themeColor: "#0A0A0B",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" className="dark">
                <body className={inter.variable}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
