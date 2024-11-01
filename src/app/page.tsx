import { reactServerBinder } from "@/utils/db_binders";
import HomePage from "./HomePage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default reactServerBinder(async function Home() {
    const session = await getServerSession()
    console.log('session', session)
    if (session !== null) {
        return redirect('/admin/partners')
    }
    return (
        <HomePage />
    );
})
