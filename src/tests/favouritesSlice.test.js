/**
 * Tests for the Redux Favourites Slice
 * Testing add, remove, clear, and duplicate prevention functionality
 */
import favouritesReducer, {
  addToFavourites,
  removeFromFavourites,
  clearFavourites,
  reorderFavourites,
} from '../store/slices/favouritesSlice';

describe('Favourites Slice', () => {
  const mockProperty = {
    id: 'prop1',
    type: 'house',
    bedrooms: 4,
    price: 850000,
    description: 'Test Property',
    location: 'Test Location',
    postcode: 'BR1',
    dateAdded: '2025-11-15',
    mainImage: 'https://example.com/image.jpg',
    images: ['https://example.com/image1.jpg'],
  };

  const mockProperty2 = {
    id: 'prop2',
    type: 'flat',
    bedrooms: 2,
    price: 450000,
    description: 'Test Property 2',
    location: 'Test Location 2',
    postcode: 'E14',
    dateAdded: '2025-10-20',
    mainImage: 'https://example.com/image2.jpg',
    images: ['https://example.com/image2.jpg'],
  };

  const initialState = {
    items: [],
  };

  test('should return the initial state', () => {
    expect(favouritesReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  test('should add a property to favourites', () => {
    const state = favouritesReducer(initialState, addToFavourites(mockProperty));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockProperty);
  });

  test('should prevent duplicate properties from being added', () => {
    const stateWithOne = favouritesReducer(initialState, addToFavourites(mockProperty));
    const stateWithDuplicate = favouritesReducer(stateWithOne, addToFavourites(mockProperty));
    expect(stateWithDuplicate.items).toHaveLength(1);
  });

  test('should remove a property from favourites', () => {
    const stateWithProperty = { items: [mockProperty] };
    const state = favouritesReducer(stateWithProperty, removeFromFavourites(mockProperty.id));
    expect(state.items).toHaveLength(0);
  });

  test('should clear all favourites', () => {
    const stateWithProperties = { items: [mockProperty, mockProperty2] };
    const state = favouritesReducer(stateWithProperties, clearFavourites());
    expect(state.items).toHaveLength(0);
  });

  test('should reorder favourites', () => {
    const stateWithProperties = { items: [mockProperty, mockProperty2] };
    const reorderedItems = [mockProperty2, mockProperty];
    const state = favouritesReducer(stateWithProperties, reorderFavourites(reorderedItems));
    expect(state.items[0].id).toBe('prop2');
    expect(state.items[1].id).toBe('prop1');
  });
});
