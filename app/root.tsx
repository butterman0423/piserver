import { LinksFunction } from "@remix-run/node";
import { Links, Outlet } from "@remix-run/react";

import styles from "app/styles.css";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles }
]

export default function App() {
    return (
    <>
        <html>
            <Links/>
        </html>
        <body>
            <Outlet />
        </body>
    </>
    )
}