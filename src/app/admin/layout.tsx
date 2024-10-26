import AdminLayout from "./AdminLayout"

export default function Layout({children}) {
    console.log("admi layout")
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    )
}
