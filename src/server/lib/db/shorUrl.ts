"use server";

import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/utils/supabase/types/supabase";

export async function addShortUrl(
    originalUrl: string,
    shortId: string
): Promise<Tables<"short_urls">[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("short_urls")
        .insert([{ original_url: originalUrl, short_id: shortId }])
        .select();

    if (error) {
        console.error("Error adding short URL:", error);
        throw new Error("Failed to add short URL");
    }

    return data!;
}

export async function getOriginalUrl(shortId: string): Promise<string | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("short_urls")
        .select("original_url")
        .eq("short_id", shortId)
        .single();

    if (error) {
        console.error("Error fetching original URL:", error);
        throw new Error("Original URL not found");
    }

    try {
        await logClick(shortId);
    } catch (logError) {
        console.error("Error logging click:", logError);
    }

    return data?.original_url || null;
}

async function logClick(shortId: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
        .from("click_logs")
        .insert([{ short_id: shortId }]);

    if (error) {
        console.error("Error logging click:", error);
        throw new Error("Failed to log click");
    }
}

export async function getUrls(): Promise<Tables<"short_urls">[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("short_urls")
        .select("*");

    if (error) {
        console.error("Error fetching URLs:", error);
        throw new Error("Failed to fetch URLs");
    }

    return data || [];
}
