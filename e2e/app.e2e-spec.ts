import { FooPage } from './app.po';

describe('foo App', () => {
  let page: FooPage;

  beforeEach(() => {
    page = new FooPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
