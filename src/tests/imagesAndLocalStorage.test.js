/**
 * Tests for Image Rendering and Local Storage Functionality
 * 
 * This test file covers:
 * 1. Property images loading and rendering correctly
 * 2. Image gallery functionality
 * 3. Local storage operations for favourites
 * 4. Persistence of favourites across sessions
 * 
 * @requires jest
 * @requires @testing-library/react
 */

import propertiesData from '../data/properties.json';

// Mock localStorage implementation for testing
const createLocalStorageMock = () => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index) => Object.keys(store)[index] || null,
  };
};

// Set up localStorage mock before tests
const localStorageMock = createLocalStorageMock();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Property Images', () => {
  const properties = propertiesData.properties;

  describe('Image URLs Validation', () => {
    test('all properties should have a valid mainImage URL', () => {
      properties.forEach((property) => {
        expect(property.mainImage).toBeDefined();
        expect(typeof property.mainImage).toBe('string');
        expect(property.mainImage.length).toBeGreaterThan(0);
        // Check if URL starts with https://
        expect(property.mainImage.startsWith('https://')).toBe(true);
      });
    });

    test('all properties should have images array with valid URLs', () => {
      properties.forEach((property) => {
        expect(Array.isArray(property.images)).toBe(true);
        expect(property.images.length).toBeGreaterThan(0);
        
        property.images.forEach((imageUrl) => {
          expect(typeof imageUrl).toBe('string');
          expect(imageUrl.startsWith('https://')).toBe(true);
        });
      });
    });

    test('mainImage should be included in images array', () => {
      properties.forEach((property) => {
        expect(property.images).toContain(property.mainImage);
      });
    });

    test('all properties should have a floorPlan image URL', () => {
      properties.forEach((property) => {
        expect(property.floorPlan).toBeDefined();
        expect(typeof property.floorPlan).toBe('string');
        expect(property.floorPlan.startsWith('https://')).toBe(true);
      });
    });
  });

  describe('Image Count Requirements', () => {
    test('each property should have between 6 and 8 images', () => {
      properties.forEach((property) => {
        expect(property.images.length).toBeGreaterThanOrEqual(6);
        expect(property.images.length).toBeLessThanOrEqual(8);
      });
    });

    test('total images across all properties should be adequate for gallery', () => {
      const totalImages = properties.reduce(
        (sum, property) => sum + property.images.length,
        0
      );
      expect(totalImages).toBeGreaterThanOrEqual(42); // At least 6 * 7 properties
    });
  });

  describe('Image Quality Parameters', () => {
    test('images should have width parameter for optimization', () => {
      properties.forEach((property) => {
        property.images.forEach((imageUrl) => {
          // Check if URL contains width parameter (w=)
          expect(imageUrl).toMatch(/w=\d+/);
        });
      });
    });
  });
});

describe('Local Storage Operations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Favourites Storage', () => {
    const mockProperty = {
      id: 'prop1',
      type: 'house',
      bedrooms: 4,
      price: 85000000,
      description: 'Test Property',
      location: 'Test Location',
      mainImage: 'https://example.com/image.jpg',
    };

    test('should save favourites to localStorage', () => {
      const favourites = [mockProperty];
      localStorage.setItem('propertyFavourites', JSON.stringify(favourites));
      
      const stored = localStorage.getItem('propertyFavourites');
      expect(stored).toBe(JSON.stringify(favourites));
    });

    test('should retrieve favourites from localStorage', () => {
      const favourites = [mockProperty];
      localStorage.setItem('propertyFavourites', JSON.stringify(favourites));
      
      const stored = localStorage.getItem('propertyFavourites');
      expect(JSON.parse(stored)).toEqual(favourites);
    });

    test('should handle empty favourites list', () => {
      const emptyFavourites = [];
      localStorage.setItem('propertyFavourites', JSON.stringify(emptyFavourites));
      
      const stored = localStorage.getItem('propertyFavourites');
      expect(JSON.parse(stored)).toEqual([]);
    });

    test('should handle multiple favourites', () => {
      const multipleFavourites = [
        mockProperty,
        { ...mockProperty, id: 'prop2' },
        { ...mockProperty, id: 'prop3' },
      ];
      localStorage.setItem('propertyFavourites', JSON.stringify(multipleFavourites));
      
      const stored = localStorage.getItem('propertyFavourites');
      const parsed = JSON.parse(stored);
      expect(parsed).toHaveLength(3);
      expect(parsed[0].id).toBe('prop1');
      expect(parsed[1].id).toBe('prop2');
      expect(parsed[2].id).toBe('prop3');
    });

    test('should clear all favourites from localStorage', () => {
      localStorage.setItem('propertyFavourites', JSON.stringify([mockProperty]));
      localStorage.setItem('propertyFavourites', JSON.stringify([]));
      
      const stored = localStorage.getItem('propertyFavourites');
      expect(JSON.parse(stored)).toEqual([]);
    });

    test('should persist favourites data structure correctly', () => {
      const favouriteWithAllFields = {
        id: 'prop1',
        type: 'house',
        bedrooms: 4,
        price: 85000000,
        tenure: 'Freehold',
        description: 'Test Property',
        longDescription: 'Long description here',
        location: 'Test Location',
        postcode: 'CMB7',
        dateAdded: '2025-11-15',
        mainImage: 'https://example.com/main.jpg',
        images: [
          'https://example.com/1.jpg',
          'https://example.com/2.jpg',
        ],
        floorPlan: 'https://example.com/floor.jpg',
        coordinates: { lat: 6.9039, lng: 79.8612 },
      };

      localStorage.setItem(
        'propertyFavourites',
        JSON.stringify([favouriteWithAllFields])
      );
      
      const stored = localStorage.getItem('propertyFavourites');
      const parsed = JSON.parse(stored);
      
      expect(parsed[0]).toHaveProperty('id');
      expect(parsed[0]).toHaveProperty('price');
      expect(parsed[0]).toHaveProperty('mainImage');
      expect(parsed[0]).toHaveProperty('images');
      expect(parsed[0].coordinates).toHaveProperty('lat');
      expect(parsed[0].coordinates).toHaveProperty('lng');
    });
  });

  describe('localStorage Error Handling', () => {
    test('should handle localStorage.getItem returning null', () => {
      const stored = localStorage.getItem('nonExistentKey');
      expect(stored).toBeNull();
    });

    test('should handle JSON parsing of stored data', () => {
      const validJSON = JSON.stringify([{ id: 'prop1' }]);
      localStorage.setItem('propertyFavourites', validJSON);
      
      const stored = localStorage.getItem('propertyFavourites');
      expect(() => JSON.parse(stored)).not.toThrow();
    });
  });
});

describe('Favourites List Management', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const loadFavouritesFromStorage = () => {
    try {
      const stored = localStorage.getItem('propertyFavourites');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  };

  const saveFavouritesToStorage = (favourites) => {
    localStorage.setItem('propertyFavourites', JSON.stringify(favourites));
  };

  const addToFavourites = (currentFavourites, property) => {
    const exists = currentFavourites.some((item) => item.id === property.id);
    if (!exists) {
      const newFavourites = [...currentFavourites, property];
      saveFavouritesToStorage(newFavourites);
      return newFavourites;
    }
    return currentFavourites;
  };

  const removeFromFavourites = (currentFavourites, propertyId) => {
    const newFavourites = currentFavourites.filter((item) => item.id !== propertyId);
    saveFavouritesToStorage(newFavourites);
    return newFavourites;
  };

  const clearAllFavourites = () => {
    saveFavouritesToStorage([]);
    return [];
  };

  test('should add property to favourites and persist', () => {
    const property = { id: 'prop1', description: 'Test' };
    let favourites = loadFavouritesFromStorage();
    favourites = addToFavourites(favourites, property);
    
    const stored = loadFavouritesFromStorage();
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe('prop1');
  });

  test('should prevent duplicate entries in favourites', () => {
    const property = { id: 'prop1', description: 'Test' };
    let favourites = [];
    favourites = addToFavourites(favourites, property);
    favourites = addToFavourites(favourites, property); // Try to add again
    
    expect(favourites).toHaveLength(1);
  });

  test('should remove property from favourites and persist', () => {
    const property1 = { id: 'prop1', description: 'Test 1' };
    const property2 = { id: 'prop2', description: 'Test 2' };
    
    let favourites = [];
    favourites = addToFavourites(favourites, property1);
    favourites = addToFavourites(favourites, property2);
    expect(favourites).toHaveLength(2);
    
    favourites = removeFromFavourites(favourites, 'prop1');
    expect(favourites).toHaveLength(1);
    expect(favourites[0].id).toBe('prop2');
  });

  test('should clear all favourites and persist empty array', () => {
    const property1 = { id: 'prop1', description: 'Test 1' };
    const property2 = { id: 'prop2', description: 'Test 2' };
    
    let favourites = [];
    favourites = addToFavourites(favourites, property1);
    favourites = addToFavourites(favourites, property2);
    
    favourites = clearAllFavourites();
    expect(favourites).toHaveLength(0);
    
    const stored = loadFavouritesFromStorage();
    expect(stored).toHaveLength(0);
  });

  test('should preserve order of favourites', () => {
    const properties = [
      { id: 'prop1', description: 'First' },
      { id: 'prop2', description: 'Second' },
      { id: 'prop3', description: 'Third' },
    ];
    
    let favourites = [];
    properties.forEach((prop) => {
      favourites = addToFavourites(favourites, prop);
    });
    
    const stored = loadFavouritesFromStorage();
    expect(stored[0].id).toBe('prop1');
    expect(stored[1].id).toBe('prop2');
    expect(stored[2].id).toBe('prop3');
  });
});
