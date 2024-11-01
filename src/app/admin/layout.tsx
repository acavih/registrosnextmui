import { redirect } from "next/navigation"
import AdminLayout from "./AdminLayout"
import { getServerSession } from "next-auth"

export default async function Layout({children}) {
    const session = await getServerSession()
    if (session === null) {
        return redirect('/')
    }
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    )
}
