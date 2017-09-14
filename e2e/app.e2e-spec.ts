import { EfulbolPage } from './app.po';

describe('efulbol App', () => {
  let page: EfulbolPage;

  beforeEach(() => {
    page = new EfulbolPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
