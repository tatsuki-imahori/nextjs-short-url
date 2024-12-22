import { getUrls } from "@/server/lib/db/shorUrl";

export async function UrlList() {
    const urls = await getUrls();

    const host = process.env.NEXT_PUBLIC_SHORT_URL_HOST || "http://localhost:3000";

    return (
        <div className="bg-gray-100 p-6 border-2 border-black rounded-lg max-w-md mx-auto mt-6 ">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">URLs</h2>
            <ul className="space-y-2">
                {urls.map((url) => (
                    <li
                        key={url.short_id}
                        className="border border-gray-800 rounded-md p-4 hover:shadow-md"
                    >
                        <div className="text-gray-900 font-medium break-words">
                            Original URL:{" "}
                            <a
                                href={url.original_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-900 underline hover:text-gray-600 break-words"
                            >
                                {url.original_url}
                            </a>
                        </div>
                        <div className="mt-1 text-gray-900 break-words">
                            Short URL:{" "}
                            <a
                                href={`${host}/r/${url.short_id}`}
                                target="_blank"
                                className="text-gray-900 underline hover:text-gray-600 break-words"
                            >
                                {`${host}/r/${url.short_id}`}
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
