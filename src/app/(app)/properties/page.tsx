import CustomCard from "@src/components/custom-components/CustomCard";
import { getProperties } from "@src/domain/property/GetProperty";
import PropertyFilter from "@src/components/custom-components/PropertyFilter";

type SearchParams = {
  type?: string;
  location?: string;
  min?: string;
  max?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function PropertyPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getProperties({
    type: params.type,
    location: params.location,
    min: params.min ? Number(params.min) : undefined,
    max: params.max ? Number(params.max) : undefined,
  });
  return (
    <main>
      <PropertyFilter />
      <div className="px-4 py-6 bg-gray-100 lg:px-20 lg:py-16">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((property) => (
            <CustomCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}
