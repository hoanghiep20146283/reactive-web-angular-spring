import { Card } from './card.model';

describe('Card', () => {
  it('should create an instance', () => {
    expect(new Card("test", 1)).toBeTruthy();
  });
});
