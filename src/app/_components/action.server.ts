"use server";

import { addShortUrl } from "@/server/lib/db/shorUrl";
import { customAlphabet } from "nanoid";
import { revalidatePath } from "next/cache";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 7);

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export async function createShortUrlAction(_, formData: FormData) {
    const originalUrl = formData.get("originalUrl") as string;

    if (!originalUrl) {
        return {
            status: 400,
            body: {
                error: "originalUrl is required",
            },
        };
    }

    if (!isValidUrl(originalUrl)) {
        return {
            status: 400,
            body: {
                error: "Invalid URL format",
            },
        };
    }

    const shortId = nanoid();
    const host = process.env.NEXT_PUBLIC_SHORT_URL_HOST || "http://localhost:3000";
    const shortUrl = `${host}/r/${shortId}`;

    try {
        await addShortUrl(originalUrl, shortId);
    } catch (error) {
        console.error("Error adding short URL:", error);
        return {
            status: 500,
            body: {
                error: "Failed to save short URL",
            },
        };
    }
    revalidatePath("/");

    return {
        status: 200,
        body: {
            originalUrl,
            shortUrl,
        },
    };
}
