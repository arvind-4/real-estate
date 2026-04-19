import { Effect, pipe } from "effect";
import { Schema } from "effect";
import { PropertiesSchema } from "@src/domain/property/Property";
import { headers } from "next/headers";

export const getProperties = async (params?: {
  type?: string;
  location?: string;
  min?: number;
  max?: number;
}) => {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const search = new URLSearchParams();

  if (params?.type) search.append("type", params.type);
  if (params?.location) search.append("location", params.location);
  if (params?.min) search.append("min", String(params.min));
  if (params?.max) search.append("max", String(params.max));

  const query = search.toString();

  const program = pipe(
    Effect.tryPromise({
      try: () =>
        fetch(`${baseUrl}/api/properties${query ? `?${query}` : ""}`, {
          cache: "no-store",
        }),
      catch: (e) => new Error(`Fetch failed: ${String(e)}`),
    }),
    Effect.flatMap((res) =>
      Effect.tryPromise({
        try: () => res.json(),
        catch: (e) => new Error(`JSON parse failed: ${String(e)}`),
      })
    ),
    Effect.flatMap((json) => {
      if (!json?.data) {
        return Effect.fail(new Error("Invalid API response: missing data"));
      }
      return Schema.decodeUnknown(PropertiesSchema)(json.data);
    }),
    Effect.catchAll((err) =>
      Effect.sync(() => {
        console.error("EFFECT ERROR:", err);
        return [];
      })
    )
  );
  return Effect.runPromise(program);
};
