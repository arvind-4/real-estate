'use client';

import React, { useState, useEffect } from 'react';
import { Effect, pipe } from 'effect';
import { Schema } from 'effect';

import Card from '@/components/Card';
import { PropertiesSchema, Property } from '@/domain/property/Property';

const HomePage = () => {
  const options = ['Apartment', 'House', 'Villa'];

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState<Property[]>([]);

  const optionChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value.toLowerCase());
  };

  const fetchProperties = () => {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (location) params.append('location', location);
    if (min) params.append('min', String(min));
    if (max) params.append('max', String(max));
    const query = params.toString();

    const program = pipe(
      Effect.tryPromise(() => fetch(`/api/property?${query}`)),
      Effect.flatMap((res) => Effect.tryPromise(() => res.json())),
      Effect.flatMap((json) => {
        console.log('json', json);
        if (!json.data) {
          return Effect.fail(new Error('No data field in response'));
        }
        return Schema.decodeUnknown(PropertiesSchema)(json.data);
      }),
      Effect.tap((validated) =>
        Effect.sync(() => {
          setData([...validated]);
        })
      ),
      Effect.catchAll((err) =>
        Effect.sync(() => {
          console.error('Fetch/Decode error:', err);
        })
      )
    );
    Effect.runPromise(program);
  };

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetchProperties();
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLocation('');
    setType('');
    setMin(0);
    setMax(0);

    setTimeout(fetchProperties, 0);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
      <div className="py-5">
        <h1 className="text-2xl font-bold text-center text-blue-600 lg:text-4xl">
          Search Property
        </h1>
      </div>

      <div className="m-4 lg:m-0">
        <div className="p-8 bg-white lg:flex lg:justify-center">
          <div className="space-y-4 lg:flex lg:space-x-4">
            <select onChange={optionChangeHandler} value={type}>
              <option value="">All</option>
              {options.map((option, index) => (
                <option key={index} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Enter your Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              type="number"
              placeholder="Minimum Rent"
              value={min || ''}
              onChange={(e) => setMin(Number(e.target.value))}
            />

            <input
              type="number"
              placeholder="Maximum Rent"
              value={max || ''}
              onChange={(e) => setMax(Number(e.target.value))}
            />

            <button
              className="px-4 py-2 bg-gray-600 text-white rounded"
              onClick={handleSearch}
            >
              Search
            </button>

            <button
              className="px-4 py-2 bg-gray-600 text-white rounded"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <section className="px-4 py-4 bg-gray-200 lg:px-32 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((property: Property) => (
            <Card key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
