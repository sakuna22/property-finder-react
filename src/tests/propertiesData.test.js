import propertiesData from '../data/properties.json';

describe('Properties JSON Data', () => {
  const properties = propertiesData.properties;

  test('should have exactly 7 properties', () => {
    expect(properties).toHaveLength(7);
  });

  test('each property should have all required fields', () => {
    const requiredFields = [
      'id',
      'type',
      'bedrooms',
      'price',
      'tenure',
      'description',
      'longDescription',
      'location',
      'postcode',
      'dateAdded',
      'mainImage',
      'images',
      'floorPlan',
      'coordinates',
    ];

    properties.forEach((property) => {
      requiredFields.forEach((field) => {
        expect(property).toHaveProperty(field);
      });
    });
  });

  test('should have diverse property types', () => {
    const types = properties.map((p) => p.type);
    const uniqueTypes = [...new Set(types)];
    expect(uniqueTypes).toContain('house');
    expect(uniqueTypes).toContain('flat');
  });

  test('should have diverse price ranges', () => {
    const prices = properties.map((p) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    expect(maxPrice - minPrice).toBeGreaterThan(500000);
  });

  test('should have diverse bedroom counts', () => {
    const bedrooms = properties.map((p) => p.bedrooms);
    const uniqueBedrooms = [...new Set(bedrooms)];
    expect(uniqueBedrooms.length).toBeGreaterThanOrEqual(4);
  });

  test('should have diverse postcodes', () => {
    const postcodes = properties.map((p) => p.postcode);
    const uniquePostcodes = [...new Set(postcodes)];
    expect(uniquePostcodes.length).toBeGreaterThanOrEqual(5);
  });

  test('each property should have 6-8 images', () => {
    properties.forEach((property) => {
      expect(property.images.length).toBeGreaterThanOrEqual(6);
      expect(property.images.length).toBeLessThanOrEqual(8);
    });
  });

  test('should have valid date format for dateAdded', () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    properties.forEach((property) => {
      expect(property.dateAdded).toMatch(dateRegex);
    });
  });

  test('should have valid coordinates with lat and lng', () => {
    properties.forEach((property) => {
      expect(property.coordinates).toHaveProperty('lat');
      expect(property.coordinates).toHaveProperty('lng');
      expect(typeof property.coordinates.lat).toBe('number');
      expect(typeof property.coordinates.lng).toBe('number');
    });
  });

  test('each property should have unique id', () => {
    const ids = properties.map((p) => p.id);
    const uniqueIds = [...new Set(ids)];
    expect(uniqueIds.length).toBe(properties.length);
  });
});
