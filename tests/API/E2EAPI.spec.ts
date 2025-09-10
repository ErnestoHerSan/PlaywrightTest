import {test, expect} from '@playwright/test'
import { request } from 'http';
import { title } from 'process';

const REPO = 'RepoE2E';
const USER = 'ErnestoHerSan';

let apiContext;

//CCREA UN NUEVO REPOSITORIO
test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        //TODOS LOS REQUEST QUE ENVIAMOS VAN EN ESTE ENDPOINT
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            //HEADER MISMO QUE EN LA DOCU DE PLAYWRIGHT
          'Accept': 'Application/vnd.github.v3+json',
          'Authorization': `token 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1`,
        }, 
    });
});

//ELIMINAMOS TODAS LAS RESUESTAS
test.afterAll(async ({}) => {
    await apiContext.dispose();
})

//GET A UN ISSUE DE UN FEATURE
test('El ultimo issue crerado es el primero en la fila', async({page}) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[FEATURE] test e2e',
            body: 'Description del feature',
        }
    });
    expect (newIssue.ok()).toBeTruthy;

    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    await page.reload();
    //await page.getByRole('link', { name: 'Open  (1)' }).click();

    const firstIssue=page.locator('//a[@data-testid="issue-pr-title-link"]').first();
    await expect(firstIssue).toHaveText('[FEATURE] test e2e');
});


