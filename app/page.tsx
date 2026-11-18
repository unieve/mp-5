"use client";

import { useState, type FormEvent } from "react";
import createNewLink from "@/createNewLink";

export default function Home() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setShortUrl("");

    const result = await createNewLink(url, alias);

    if (result.alias) {
      setShortUrl(`${window.location.origin}/r/${result.alias}`);
    } else {
      setError(result.error ?? "Could not create the link.");
    }
  }

  return (
      <main>
        <h1>URL Shortener</h1>

        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="url">Original URL</label>
            <input
                id="url"
                type="url"
                placeholder="https://www.bu.edu"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                required
            />
          </p>

          <p>
            <label htmlFor="alias">Custom alias</label>
            <input
                id="alias"
                type="text"
                placeholder="bu"
                value={alias}
                onChange={(event) => setAlias(event.target.value)}
                required
            />
          </p>

          <button type="submit">Create short link</button>
        </form>

        {error && <p role="alert">{error}</p>}

        {shortUrl && (
            <p>
              Your short link: <a href={shortUrl}>{shortUrl}</a>
            </p>
        )}
      </main>
  );
}
