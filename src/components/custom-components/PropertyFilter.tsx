"use client";

import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PropertyFilter = () => {
  const router = useRouter();

  const options = ["Apartment", "House", "Villa"];

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (type) params.append("type", type);
    if (location) params.append("location", location);
    if (min) params.append("min", String(min));
    if (max) params.append("max", String(max));
    const query = params.toString();
    router.push(`/properties${query ? `?${query}` : ""}`);
  };

  const handleReset = () => {
    setType("");
    setLocation("");
    setMin(0);
    setMax(0);

    router.push("/properties");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="bg-white p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:flex-wrap gap-3">
          <div className="w-full md:w-[180px]">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {options.map((opt) => (
                  <SelectItem key={opt} value={opt.toLowerCase()}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            className="flex-1 min-w-[180px]"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <Input
            type="number"
            className="w-full md:w-[140px]"
            placeholder="Min Rent"
            value={min || ""}
            onChange={(e) => setMin(Number(e.target.value))}
          />

          <Input
            type="number"
            className="w-full md:w-[140px]"
            placeholder="Max Rent"
            value={max || ""}
            onChange={(e) => setMax(Number(e.target.value))}
          />

          <div className="flex flex-col md:flex-row w-full md:w-auto gap-2">
            <Button className="w-full md:w-auto" onClick={handleSearch}>
              Search
            </Button>
            <Button variant="outline" className="w-full md:w-auto" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
