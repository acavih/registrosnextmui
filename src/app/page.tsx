import { reactServerBinder } from "@/utils/db_binders";
import HomePage from "./HomePage";

export default reactServerBinder(async function Home() {
    const resources = await this.db.models.Resource.find().limit(20)
    console.log(resources)
    return (
        <HomePage />
    );
})
