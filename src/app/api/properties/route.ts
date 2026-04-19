import { NextResponse } from "next/server";
import { Effect, pipe, Schema } from "effect";

import { PropertiesSchema } from "@src/domain/property/Property";
import { PropertyService } from "@src/domain/property/Property.Service";
import data from "@src/data/property.json";
import { FilterSchema } from "@src/domain/property/Filters";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const program = pipe(
    Object.fromEntries(searchParams.entries()),
    Schema.decodeUnknown(FilterSchema),
    Effect.flatMap((filters) =>
      pipe(
        data,
        Schema.decodeUnknown(PropertiesSchema),
        Effect.flatMap((properties) => PropertyService.filter(properties, filters))
      )
    ),
    Effect.map((filtered) => NextResponse.json({ data: filtered })),
    Effect.catchAll((error) =>
      Effect.succeed(
        NextResponse.json(
          {
            error: "Invalid query params",
            details: error,
          },
          { status: 400 }
        )
      )
    )
  );
  return Effect.runPromise(program);
}
