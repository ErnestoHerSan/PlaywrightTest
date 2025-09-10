import { test, expect, Page} from '@playwright/test';

let page:Page;

test.describe('Navigation excercises', () => {

    const secciones = [
        {nombre: 'Academia', url: '/academia', tituloEsperado: 'Academia'},
        {nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos'},
        {nombre: 'Mentorías', url: '/mentoria-1-1-con-pato', tituloEsperado: 'Mentoría personalizada de avance de carrera para testers de software'},
        {nombre: 'Talleres', url: '/talleres-y-webinars', tituloEsperado: 'Webinars en vivo'},
        {nombre: 'Blog', url: '/blog', tituloEsperado: 'Free Range Testers'},
        {nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos'},
        //Agregar mas secciones si es necesario
    ];

    for(const seccion of secciones){

        test(`Validate principal link ${seccion.nombre}` ,async({page}) => {
            await test.step('Go to main page', async() => {
                page.goto('https://www.freerangetesters.com');
                await expect(page).toHaveTitle('Free Range Testers');
            })

            await test.step(`When clik on ${seccion.nombre}`,async()=> {
                await page.getByRole('link', { name: seccion.nombre, exact: true }).click();
                await page.waitForURL(`**${seccion.url}`);
            })

            await test.step(`Go to page with title ${seccion.tituloEsperado}`,async() => {
                await expect(page).toHaveTitle(seccion.tituloEsperado);
            })
        })
    }
})

/*
//FILTRA POR XPATH
//page.locator('xpath=//a[text()="Cursos"]').click();

//FILTRA POR TEXTO 
await.page.getByRole('listItem')
.filter({hastText:'Playstation 5'})
.getByRole('button',{name:'Add to cart'})
.click();

//Filtra por otro atributo *Mas recomendada
await.page.getByRole('listItem')
.filter({has: page.getByRole('heading',{name:'Xbox series X'})})
.getByRole('button',{name:'Add to cart'}).click();

//FILTRA POR ELEMENTO VISIBLE
page.locator('button').locator('visible=true').click();

//SELECIONA EL PRIMER Y ULTIMO ELEMENTO DE UNA TABLA
page.getByRole('listItem').first();
page.getByRole('listItem').last();

*/
