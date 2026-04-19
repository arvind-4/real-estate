import { Schema } from "effect";

export const FilterSchema = Schema.Struct({
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),

  min: Schema.optional(
    Schema.NumberFromString.pipe(
      Schema.filter((n) => !isNaN(n), {
        message: () => "Invalid min value",
      })
    )
  ),

  max: Schema.optional(
    Schema.NumberFromString.pipe(
      Schema.filter((n) => !isNaN(n), {
        message: () => "Invalid max value",
      })
    )
  ),
});

export type Filters = Schema.Schema.Type<typeof FilterSchema>;
