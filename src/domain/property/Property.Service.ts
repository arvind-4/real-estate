import { Effect } from 'effect';
import { Property } from '@/domain/property/Property';
import { Filters } from '@/domain/property/Filters';

export class PropertyService {
  static filter(properties: readonly Property[], filters: Filters) {
    return Effect.sync(() => {
      const { type, location, min, max } = filters;
      return properties.filter((house) => {
        if (type && !house.type.toLowerCase().includes(type.toLowerCase()))
          return false;
        if (
          location &&
          !house.location.toLowerCase().includes(location.toLowerCase())
        )
          return false;
        if (min !== undefined && house.rent < min) return false;
        if (max !== undefined && house.rent > max) return false;
        return true;
      });
    });
  }
}
