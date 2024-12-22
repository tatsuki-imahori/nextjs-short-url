
import { getOriginalUrl } from "@/server/lib/db/shorUrl";
import { redirect } from "next/navigation";

type Props = {
    params: {
        short: string;
    };
}

export default async function RedirectPage({params}: Props) {
    const { short } = await params;

    const originalUrl = await getOriginalUrl(short);
    if (!originalUrl) {
        return redirect(`http://localhost:3000`);
    }

    redirect(`${originalUrl}`);
}