import CreateShortUrl from "./_components/CreateShortUrl";
import { UrlList } from "./_components/UrlList";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto space-y-10">
                <h1 className="text-center text-2xl font-bold text-gray-800">
                    Short URL Generator
                </h1>
                <CreateShortUrl />
                <UrlList />
            </div>
        </div>
    );
}
