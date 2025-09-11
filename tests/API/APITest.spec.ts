import {test, expect} from '@playwright/test'
import { request } from 'http';
import { title } from 'process';

const REPO = 'RepoLoco';
const USER = 'ErnestoHerSan';

//CREA UN NUEVO REPOSITORIO
test.beforeAll(async ({ request }) => {
    const response = await request.post('user/repos', {
        data: {
            name: REPO
        }
    });
    expect(response.ok()).toBeTruthy();
});

//GENERA UN NUEVO ISSUE
test('Se puede crear un Issue en el repo de git', async({request}) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[BUG] reporte 1',
            body: 'Description del bug',
        }
    });
    await expect (newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    await expect(issues.ok()).toBeTruthy();
    await expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[BUG] reporte 1',
        body: 'Description del bug',
    }));
});

//GET A UN ISSUE DE UN FEATURE
test.fixme('Se puede crear un request de feature', async({request}) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[FEATURE] reporte 1',
            body: 'Description del feature',
        }
    });
    expect (newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    await expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[FEATURE] reporte 1',
        body: 'Description del feature',
    }));
});

//ELIMINA EL REPOSITORIO
test.afterAll(async ({ request }) => {
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();
})
