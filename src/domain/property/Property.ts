import { Schema } from 'effect';

export const PropertySchema = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  image_url: Schema.String,
  location: Schema.String,
  type: Schema.String,
  rent: Schema.Number,
  bedrooms: Schema.Number,
  bathrooms: Schema.Number,
});

export const PropertiesSchema = Schema.Array(PropertySchema);

export type Property = typeof PropertySchema.Type;
export type Properties = typeof PropertiesSchema.Type;
