import { test, Browser, expect, Page, webkit} from '@playwright/test';
import { SandboxPage } from '../Pages/SandboxPage';

(async () => {

    let browser:Browser;
    let page:Page;
    let sandBox;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        sandBox = new SandboxPage(page);
        await page.goto(sandBox.urlPage);
    })

    test.describe('Acciones en el Automation Sandbox',() => {    

        test('Clic en el boton id dinamico',async({}) => {

           await test.step('Clic en el boton dinámico', async({}) => {

                sandBox.clickbuttonIdDinamico();
                await expect(sandBox.textoButtonIdDinamico,'Texto no se encuentra visible').toBeVisible();

           })
        })

        test('Llenar campo de texto',async({}) => {

            await test.step('Ingresar texto en el campo',async() => {

                await expect(sandBox.textoEsUnAburruidoTexto,'Campo de texto no es editable').toBeEditable();
                sandBox.fillText();
                await expect(sandBox.textoEsUnAburruidoTexto,'El texto no es el mismo').toHaveValue('Estoy aprendiendo playright');
            })
        })

        test('Seleccionar textboxes',async({}) => {

            await test.step('Seleccionar el checkbox para pasta',async() => {

                await sandBox.checkPasta();
                await expect(sandBox.pastaCheckbox, 'El checkbox no estaba seleccionado').toBeChecked();

            })
        })

        test('Des seleccionar textboxes',async({}) => {

            await test.step('Des seleccionar el checkbox para pasta',async() => {
                
                await sandBox.checkPasta();
                await expect.soft(sandBox.pastaCheckbox, 'El checkbox no estaba seleccionado').toBeChecked();
                await sandBox.uncheckPasta();
                await expect(sandBox.pastaCheckbox).not.toBeChecked();

            })
        })
        
        test('Seleccionar un raddio button',async({}) => {

            await test.step('Clic en un raddio button',async() => {

                //Posibles valores Si/No
                let value='Si';
                await sandBox.clickOnRaddioButton(value);
                await expect(sandBox.raddioButtonSi,'El radio button "Si" no esta selecionado').toBeChecked();

                value='No'
                await sandBox.clickOnRaddioButton(value);
                await expect(sandBox.raddioButtonNo,'El radio button "No" no esta selecionado').toBeChecked();
            })
        })

        test('Seleccionar elemento de @dropdown', async({browserName}) => {
            //COMANDO PARA SALTAR LA EJECUCION DE UN BROWSER EN ESPECIFICO
            test.skip(browserName === 'webkit', 'No funciona en webkit aún');

            await test.step('Seleccionar elemento de dropdown de deporte', async() => {
                await sandBox.validateElementsFromList(page);
            })
        })

        test('Seleccionar elemento de dropdown dias de la semana', async({}) => {

            await test.step('Seleccionar elemento de dropdown de los dias de la semana', async() => {

                await sandBox.clickOnDaysOfTheWeek();

            })
        })

        test.skip('Cargar archivos',async({page}) => {

            //CARGAR UN ARCHIVO
            await page.getByLabel('Upload file').setInputFiles('rutaAlArchivoUno');
            
            //CARGAR DOS O MAS ARCHIVOS
            await page.getByLabel('Upload file').setInputFiles(['rutaAlArchivoUno','rutaAlArchivoDos']);

        })

        test.skip('Drop and down', async ({ page }) => {

            await page.getByTestId('arrastraDesde').dragTo(page.getByLabel('arrastraHacia'));

        })
        
        test('Validar elementos de la tabla estatica', async({}) => {

            await test.step('Valida los elementos de la tabla', async() => {

                const valoresColumnaNombre= await page.$$eval('//div[h2[text()="Tabla estática"]]/table/tbody/tr/td[2]', elements => elements.map(element => element.textContent));
                const nombreEsperado = ['Messi','Ronaldo','Mbappe'];
                expect(valoresColumnaNombre).toEqual(nombreEsperado);

            })

            //AGREGA UNA CAPTURA DE PANTALLA EN EL REPORTE
            await test.info().attach('Screenshot', {
                body: await page.screenshot(),
                contentType: 'image/png',
            })
        })

        test('Validar elementos de la tabla dinamica', async({}) => {

            await test.step('Valida los elementos de la tabla dinamica que no sean los mismos', async() => {
                //CONSTANTE QUE EXTRAE CADA UNO DE LA LISTA DE ELEMENTOS SELECCIONADOS POR MEDIO DE LA FUNCION 'ELEMENTS.MAP'
                const valoresTablaDinamica= await page.$$eval('//div[h2[text()="Tabla dinámica"]]/table/tbody/tr/td', elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica);
                await page.reload();
                const valoresTablaDinamicaReload= await page.$$eval('//div[h2[text()="Tabla dinámica"]]/table/tbody/tr/td', elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamicaReload);
                expect (valoresTablaDinamica,'Los valores no cambiaron').not.toEqual(valoresTablaDinamicaReload);
            })
        })

        test('Soft assertions',async({}) => {

            await test.step('Validaciones blandas',async() => {
                await expect.soft(sandBox.pizzaCheckbox,'No se encontro el elemento pizza').toBeVisible();
                await expect.soft(sandBox.hamburgesaCheckbox,'No se encontro el elemento hamburgesa').toBeVisible();
                await expect.soft(sandBox.pastaCheckbox,'No se encontro el elemento pasta').toBeVisible();
                await expect.soft(sandBox.heladoCheckbox,'No se encontro el elemento helado').toBeVisible();
                await expect.soft(sandBox.tortaCheckbox,'No se encontro el elemento torta').toBeVisible();
            })
        })

        test('Valida pop up', async({}) => { 
            test.info().annotations.push({
                type: 'HU 5214',
                description: 'Agregar una anotacion a un test espacifico'
            });

            await test.step('Valida el pop up', async() => {
                await sandBox.showPopUp(page);
                await expect(sandBox.textPopup,'Texto del pop up no nes el mismo').toHaveText('¿Viste? ¡Apareció un Pop-up!');
            })
        })

    })

    test.afterAll(async ({ browser }) => {
        
    })
    
})();