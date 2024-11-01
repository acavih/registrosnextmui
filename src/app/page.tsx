import { reactServerBinder } from "@/utils/db_binders";
import HomePage from "./HomePage";
import { getServerSession } from "next-auth";

export default reactServerBinder(async function Home() {
    const session = await getServerSession()
    console.log('session', session)
    return (
        <HomePage />
    );
})
