/**
 * Tests for the Redux Properties Slice
 * Testing property filtering and state management
 */
import propertiesReducer, {
  setFilteredProperties,
  setSelectedProperty,
  resetFilters,
  setLoading,
  setError,
} from '../store/slices/propertiesSlice';

describe('Properties Slice', () => {
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
  ];

  test('should set filtered properties correctly', () => {
    const initialState = {
      allProperties: mockProperties,
      filteredProperties: mockProperties,
      selectedProperty: null,
      loading: false,
      error: null,
    };

    const filteredList = [mockProperties[0]];
    const state = propertiesReducer(initialState, setFilteredProperties(filteredList));
    
    expect(state.filteredProperties).toHaveLength(1);
    expect(state.filteredProperties[0].id).toBe('prop1');
  });

  test('should set selected property', () => {
    const initialState = {
      allProperties: mockProperties,
      filteredProperties: mockProperties,
      selectedProperty: null,
      loading: false,
      error: null,
    };

    const state = propertiesReducer(initialState, setSelectedProperty(mockProperties[0]));
    expect(state.selectedProperty).toEqual(mockProperties[0]);
  });

  test('should reset filters to show all properties', () => {
    const initialState = {
      allProperties: mockProperties,
      filteredProperties: [mockProperties[0]],
      selectedProperty: null,
      loading: false,
      error: null,
    };

    const state = propertiesReducer(initialState, resetFilters());
    expect(state.filteredProperties).toEqual(state.allProperties);
  });

  test('should set loading state', () => {
    const initialState = {
      allProperties: [],
      filteredProperties: [],
      selectedProperty: null,
      loading: false,
      error: null,
    };

    const state = propertiesReducer(initialState, setLoading(true));
    expect(state.loading).toBe(true);
  });

  test('should set error state', () => {
    const initialState = {
      allProperties: [],
      filteredProperties: [],
      selectedProperty: null,
      loading: false,
      error: null,
    };

    const errorMessage = 'Failed to load properties';
    const state = propertiesReducer(initialState, setError(errorMessage));
    expect(state.error).toBe(errorMessage);
  });
});
