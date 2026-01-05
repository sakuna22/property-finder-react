/**
 * Tests for the Redux Search Slice
 * Testing search criteria state management
 */
import searchReducer, {
  setSearchCriteria,
  resetSearchCriteria,
  setType,
  setMinPrice,
  setMaxPrice,
  setMinBedrooms,
  setMaxBedrooms,
  setDateFrom,
  setDateTo,
  setPostcode,
} from '../store/slices/searchSlice';

describe('Search Slice', () => {
  const initialState = {
    type: 'any',
    minPrice: 0,
    maxPrice: 150000000,
    minBedrooms: 'Any',
    maxBedrooms: 'Any',
    dateFrom: null,
    dateTo: null,
    postcode: '',
  };

  test('should return the initial state', () => {
    expect(searchReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should set property type filter', () => {
    const state = searchReducer(initialState, setType('house'));
    expect(state.type).toBe('house');
  });

  test('should set min price filter', () => {
    const state = searchReducer(initialState, setMinPrice(200000));
    expect(state.minPrice).toBe(200000);
  });

  test('should set max price filter', () => {
    const state = searchReducer(initialState, setMaxPrice(500000));
    expect(state.maxPrice).toBe(500000);
  });

  test('should set min bedrooms filter', () => {
    const state = searchReducer(initialState, setMinBedrooms('2'));
    expect(state.minBedrooms).toBe('2');
  });

  test('should set max bedrooms filter', () => {
    const state = searchReducer(initialState, setMaxBedrooms('4'));
    expect(state.maxBedrooms).toBe('4');
  });

  test('should set date from filter', () => {
    const date = '2025-11-01';
    const state = searchReducer(initialState, setDateFrom(date));
    expect(state.dateFrom).toBe(date);
  });

  test('should set date to filter', () => {
    const date = '2025-12-31';
    const state = searchReducer(initialState, setDateTo(date));
    expect(state.dateTo).toBe(date);
  });

  test('should set postcode filter', () => {
    const state = searchReducer(initialState, setPostcode('BR1'));
    expect(state.postcode).toBe('BR1');
  });

  test('should set multiple search criteria at once', () => {
    const criteria = {
      type: 'flat',
      minPrice: 300000,
      maxPrice: 600000,
      postcode: 'E14',
    };
    const state = searchReducer(initialState, setSearchCriteria(criteria));
    expect(state.type).toBe('flat');
    expect(state.minPrice).toBe(300000);
    expect(state.maxPrice).toBe(600000);
    expect(state.postcode).toBe('E14');
  });

  test('should reset all search criteria', () => {
    const modifiedState = {
      type: 'house',
      minPrice: 200000,
      maxPrice: 800000,
      minBedrooms: '2',
      maxBedrooms: '5',
      dateFrom: '2025-01-01',
      dateTo: '2025-12-31',
      postcode: 'SW19',
    };
    const state = searchReducer(modifiedState, resetSearchCriteria());
    expect(state).toEqual(initialState);
  });
});
