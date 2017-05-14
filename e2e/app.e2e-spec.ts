import { Ng2DynamicModalPage } from './app.po';

describe('ng2-dynamic-modal App', () => {
  let page: Ng2DynamicModalPage;

  beforeEach(() => {
    page = new Ng2DynamicModalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
