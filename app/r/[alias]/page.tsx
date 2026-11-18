import { notFound, redirect } from "next/navigation";
import getCollection, { LINKS_COLLECTION } from "@/db";

type PageProps = {
    params: Promise<{ alias: string }>;
};

export default async function AliasPage({ params }: PageProps) {
    const { alias } = await params;
    const links = await getCollection(LINKS_COLLECTION);
    const link = await links.findOne({ _id: alias });

    if (!link) {
        notFound();
    }

    redirect(link.url);
}
