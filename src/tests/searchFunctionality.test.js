const mockProperties = [
  {
    id: 'prop1',
    type: 'house',
    bedrooms: 4,
    price: 850000,
    description: 'Victorian House',
    location: 'Bromley, BR1',
    postcode: 'BR1',
    dateAdded: '2025-11-15',
  },
  {
    id: 'prop2',
    type: 'flat',
    bedrooms: 2,
    price: 450000,
    description: 'Modern Flat',
    location: 'Canary Wharf, E14',
    postcode: 'E14',
    dateAdded: '2025-10-20',
  },
  {
    id: 'prop3',
    type: 'house',
    bedrooms: 3,
    price: 625000,
    description: 'Semi-detached House',
    location: 'Wimbledon, SW19',
    postcode: 'SW19',
    dateAdded: '2025-12-01',
  },
  {
    id: 'prop4',
    type: 'flat',
    bedrooms: 1,
    price: 275000,
    description: 'Studio Flat',
    location: 'Camden, NW1',
    postcode: 'NW1',
    dateAdded: '2025-12-15',
  },
  {
    id: 'prop5',
    type: 'house',
    bedrooms: 5,
    price: 1250000,
    description: 'Executive Residence',
    location: 'Richmond, TW10',
    postcode: 'TW10',
    dateAdded: '2025-11-01',
  },
];

const filterProperties = (properties, criteria) => {
  let filtered = [...properties];

  if (criteria.type && criteria.type !== 'any') {
    filtered = filtered.filter(
      (property) => property.type.toLowerCase() === criteria.type.toLowerCase()
    );
  }

  if (criteria.minPrice) {
    filtered = filtered.filter(
      (property) => property.price >= Number(criteria.minPrice)
    );
  }
  if (criteria.maxPrice) {
    filtered = filtered.filter(
      (property) => property.price <= Number(criteria.maxPrice)
    );
  }

  if (criteria.minBedrooms && criteria.minBedrooms !== 'Any') {
    const minBeds = criteria.minBedrooms === '5+' ? 5 : Number(criteria.minBedrooms);
    filtered = filtered.filter((property) => property.bedrooms >= minBeds);
  }
  if (criteria.maxBedrooms && criteria.maxBedrooms !== 'Any') {
    const maxBeds = criteria.maxBedrooms === '5+' ? 999 : Number(criteria.maxBedrooms);
    filtered = filtered.filter((property) => property.bedrooms <= maxBeds);
  }

  if (criteria.dateFrom) {
    const fromDate = new Date(criteria.dateFrom);
    filtered = filtered.filter((property) => {
      const propertyDate = new Date(property.dateAdded);
      return propertyDate >= fromDate;
    });
  }
  if (criteria.dateTo) {
    const toDate = new Date(criteria.dateTo);
    filtered = filtered.filter((property) => {
      const propertyDate = new Date(property.dateAdded);
      return propertyDate <= toDate;
    });
  }

  if (criteria.postcode) {
    filtered = filtered.filter((property) =>
      property.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())
    );
  }

  return filtered;
};

describe('Search Functionality', () => {
  test('should filter properties by type (house)', () => {
    const criteria = { type: 'house' };
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(3);
    expect(result.every((p) => p.type === 'house')).toBe(true);
  });

  test('should filter properties by type (flat)', () => {
    const criteria = { type: 'flat' };
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.type === 'flat')).toBe(true);
  });

  test('should filter properties by price range', () => {
    const criteria = { minPrice: 400000, maxPrice: 700000 };
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.price >= 400000 && p.price <= 700000)).toBe(true);
  });

  test('should filter properties by minimum bedrooms', () => {
    const criteria = { minBedrooms: '3' };
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(3);
    expect(result.every((p) => p.bedrooms >= 3)).toBe(true);
  });

  test('should filter properties by postcode', () => {
    const criteria = { postcode: 'BR1' };
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(1);
    expect(result[0].postcode).toBe('BR1');
  });

  test('should filter properties by date range', () => {
    const criteria = { dateFrom: '2025-11-01', dateTo: '2025-11-30' };
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(2);
  });

  test('should apply multiple criteria simultaneously', () => {
    const criteria = {
      type: 'house',
      minPrice: 500000,
      maxPrice: 1000000,
      minBedrooms: '3',
    };
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(2);
    expect(result.every((p) => 
      p.type === 'house' && 
      p.price >= 500000 && 
      p.price <= 1000000 && 
      p.bedrooms >= 3
    )).toBe(true);
  });

  test('should return all properties when no criteria specified', () => {
    const criteria = { type: 'any' };
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(5);
  });

  test('should return empty array when no properties match', () => {
    const criteria = {
      type: 'house',
      postcode: 'E14',
    };
    const result = filterProperties(mockProperties, criteria);
    expect(result).toHaveLength(0);
  });
});
