import { HighlightTextPipe } from './highlight-text.pipe';

describe('HighlightTextPipe', () => {
  it('create an instance', () => {
    const pipe = new HighlightTextPipe();
    expect(pipe).toBeTruthy();
  });

  it('wrap a simple string in a <span>', () => {
    const pipe = new HighlightTextPipe();
    expect(pipe.transform('foobar', 'foo')).toBe('<span class="highlight-text">foo</span>bar')
  })
});
