import { ReactNode } from "react";
import TopBar from "../appBars/TopBar";
import LayoutFooter from "../footers/LayoutFooter";

export type LayoutProps = {
    children?: ReactNode,
    className?: string
}

const Layout = ({
    children,
    className = ''
}: LayoutProps) => {

    return (
        <section
            className={`flex flex-col h-screen
                overflow-hidden ${className}`}>
            <TopBar />
            <main
                className="h-full">
                {children}
            </main>
            <LayoutFooter />
        </section>
    )
}

export default Layout;