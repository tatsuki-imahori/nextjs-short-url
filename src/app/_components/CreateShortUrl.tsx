"use client";

import { useActionState } from "react";
import { createShortUrlAction } from "./action.server";

export default function CreateShortUrl() {
    const [state, formAction, isPending] = useActionState(createShortUrlAction, null);

    return (
        <div className="bg-gray-100 p-6 border-2 border-black rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Create Short URL</h2>
            <form action={formAction} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Original URL:
                    </label>
                    <input
                        type="text"
                        name="originalUrl"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                        placeholder="Enter your URL"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full py-2 px-4 font-semibold rounded-md shadow-md transition-colors duration-200 ${
                        isPending
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-800"
                    }`}
                >
                    {isPending ? "Creating..." : "Create Short URL"}
                </button>
            </form>
            {state && (
                <div className="mt-4">
                    {state.body.shortUrl && (
                        <p className="text-gray-800 font-medium">
                            Short URL:{" "}
                            <a
                                href={state.body.shortUrl}
                                target="_blank"
                                className="underline text-black hover:text-gray-700"
                            >
                                {state.body.shortUrl}
                            </a>
                        </p>
                    )}
                    {state.body.error && (
                        <p className="text-red-600 font-medium">{state.body.error}</p>
                    )}
                </div>
            )}
        </div>
    );
}
