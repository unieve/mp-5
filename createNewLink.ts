"use server";

import getCollection, { LINKS_COLLECTION } from "@/db";
import { MongoServerError } from "mongodb";

export default async function createNewLink(url: string, alias: string) {
    url = url.trim();
    alias = alias.trim();

    if (!/^[a-zA-Z0-9_-]+$/.test(alias)) {
        return { error: "Use letters, numbers, hyphens, or underscores for your alias." };
    }

    try {
        const destination = new URL(url);

        if (destination.protocol !== "http:" && destination.protocol !== "https:") {
            return { error: "Enter a URL starting with http:// or https://." };
        }
    } catch {
        return { error: "Enter a valid URL, such as https://www.bu.edu." };
    }

    try {
        const linksCollection = await getCollection(LINKS_COLLECTION);
        const res = await linksCollection.insertOne({ _id: alias, url: url });

        if (!res.acknowledged) {
            return { error: "Could not save the link. Please try again." };
        }

        return { alias: alias };
    } catch (error) {
        if (error instanceof MongoServerError && error.code === 11000) {
            return { error: "That alias is already taken." };
        }

        return { error: "Could not save the link. Please try again." };
    }
}