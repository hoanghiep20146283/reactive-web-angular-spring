import { browser, element, by } from 'protractor';

describe('User List App', async () => {
    await browser.get('/users');
});

it('Should have a header', async () => {
    const header = by.css('h2');
    const text = await element(header).getText();
    expect(text).toBe('Filtered Users');
})