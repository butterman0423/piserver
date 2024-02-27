import { Links, Outlet } from "@remix-run/react";

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