import {
  constructDetails,
  generateHex,
  lockColors,
  mapLockedColors,
  reconstructColors,
  cleanResults
 } from './dataHandlers';

describe('dataHandlers', () => {
  describe('constructDetails', () => {
    it('should take a currentPalette and assign properties to a new object', () => {
      const mockCurrentPalette = {
        palette: 'Testing',
        project_name: 'Test_Project',
        colors: [
          { hex_1: '#ABABAB', locked: false},
          { hex_2: '#CDCDCD', locked: false },
          { hex_3: '#EFEFEF', locked: false },
          { hex_4: '#121212', locked: false },
          { hex_5: '#343434', locked: false }
        ]
      };
      const expected = {
        project_name: 'Test_Project',
        palette: 'Testing',
        hex_1: '#ABABAB',
        hex_2: '#CDCDCD',
        hex_3: '#EFEFEF',
        hex_4: '#121212',
        hex_5: '#343434'
      }
      expect(constructDetails(mockCurrentPalette)).toEqual(expected);
    });
  });

  describe('generateHex', () => {
    it('should return a string of six hexadecimal characters with a # in front', () => {
      const testHex = generateHex();
      const alphaRegex = /[G-Z]/g;
      expect(testHex.length).toEqual(7);
      expect(testHex[0]).toEqual('#');
      expect(testHex.match(alphaRegex)).toEqual(null);
    });
  });

  describe('lockColors', () => {
    it('should return an array with color objects\' locked property set to true at the correct index', () => {
      const testColors = [
        { hex_1: '#ABABAB', locked: false},
        { hex_2: '#CDCDCD', locked: false },
        { hex_3: '#EFEFEF', locked: false },
        { hex_4: '#121212', locked: false },
        { hex_5: '#343434', locked: false }
      ];
      const expected = [
        { hex_1: '#ABABAB', locked: false},
        { hex_2: '#CDCDCD', locked: true },
        { hex_3: '#EFEFEF', locked: false },
        { hex_4: '#121212', locked: false },
        { hex_5: '#343434', locked: false }
      ];
      expect(lockColors(testColors, 1)).toEqual(expected);
    });
  });

  describe('mapLockedColors', () => {
    it('should return an array with the hex value of unlocked colors replaced by new values', () => {
      const testColors = [
        { hex_1: '#ABABAB', locked: true },
        { hex_2: '#CDCDCD', locked: false },
        { hex_3: '#EFEFEF', locked: true },
        { hex_4: '#121212', locked: false },
        { hex_5: '#343434', locked: true }
      ];
      const expected = [
        { hex_1: '#ABABAB', locked: true },
        { hex_2: '#123456', locked: false },
        { hex_3: '#EFEFEF', locked: true },
        { hex_4: '#123456', locked: false },
        { hex_5: '#343434', locked: true }
      ];
      expect(mapLockedColors(testColors)[0]).toEqual(expected[0]);
      expect(mapLockedColors(testColors)[2]).toEqual(expected[2]);
      expect(mapLockedColors(testColors)[4]).toEqual(expected[4]);
    });
  });

  describe('reconstructColors', () => {
    it('should return an array of five hex colors with incremented keys of hex_[number]', () => {
      const mockPalette = {
        hex_1: '#ABABAB',
        hex_2: '#CDCDCD',
        hex_3: '#EFEFEF',
        hex_4: '#121212',
        hex_5: '#343434'
      };
      const expected = [
        { hex_1: '#ABABAB' },
        { hex_2: '#CDCDCD' },
        { hex_3: '#EFEFEF' },
        { hex_4: '#121212' },
        { hex_5: '#343434' }
      ];
      expect(reconstructColors(mockPalette)).toEqual(expected);
    });
  });

  describe('cleanResults', () => {
    it('should take in an array of objects and return an array of objets without created_at or updated_at keys', () => {
      const mockPaletteArray = [
        {
          created_at: 'Now',
          updated_at: 'Later',
          hex_1: '#ABABAB',
          hex_2: '#12345',
          hex_3: '#EFEFEF',
          hex_4: '#ABABAB',
          hex_5: '#343434'
        },
        {
          created_at: 'Now',
          updated_at: 'Later',
          hex_1: '#ABABAB',
          hex_2: '#CDCDCD',
          hex_3: '#EFEFEF',
          hex_4: '#EFEFEF',
          hex_5: '#343434'
        },
        {
          created_at: 'Now',
          updated_at: 'Later',
          hex_1: '#ABABAB',
          hex_2: '#CDCDCD',
          hex_3: '#EFEFEF',
          hex_4: '#1A2A3A',
          hex_5: '#343434'
        }
      ];
      const expected = [
        {
          hex_1: '#ABABAB',
          hex_2: '#12345',
          hex_3: '#EFEFEF',
          hex_4: '#ABABAB',
          hex_5: '#343434'
        },
        {
          hex_1: '#ABABAB',
          hex_2: '#CDCDCD',
          hex_3: '#EFEFEF',
          hex_4: '#EFEFEF',
          hex_5: '#343434'
        },
        {
          hex_1: '#ABABAB',
          hex_2: '#CDCDCD',
          hex_3: '#EFEFEF',
          hex_4: '#1A2A3A',
          hex_5: '#343434'
        }
      ];
      expect(cleanResults(mockPaletteArray)).toEqual(expected);
    });
  });
});