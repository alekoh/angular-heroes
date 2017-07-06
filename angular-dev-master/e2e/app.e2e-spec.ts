import { AngularHeroesPage } from './app.po';

describe('angular-heroes App', function() {
  let page: AngularHeroesPage;

  beforeEach(() => {
    page = new AngularHeroesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
