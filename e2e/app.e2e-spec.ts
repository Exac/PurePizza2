import { PurePizza2Page } from './app.po';

describe('pure-pizza2 App', () => {
  let page: PurePizza2Page;

  beforeEach(() => {
    page = new PurePizza2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
