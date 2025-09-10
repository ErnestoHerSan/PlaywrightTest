import { test, Browser, expect, Page, webkit} from '@playwright/test';

(async () => {

    let browser:Browser;
    let page:Page;

    test.describe('Acciones en el Automation Sandbox',() => {

        test('Clic en el boton id dinamico',async({page}) => {

            await test.step('Ir a url del sandbox page range testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

           await test.step('Clic en el boton dinámico', async({}) => {
                const buttonIdDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });
                await buttonIdDinamico.click({force:true});

                //VALIDA QUE EL TEXTO ESTE VISIBLE
                await expect(page.getByText('OMG, aparezco después de 3'),'Texto no se encuentra visible').toBeVisible();
                
                //SE FUERZA A QUE EJECUTE UN CLIC O UNA ACCION
                //force:tre 

                //CLIC DERECHO
                //await buttonIdDinamico.click({button: 'right'});

                //DOBLE CLIC
                //await buttonIdDinamico.dblclick();

                //HOVER SOBRE ELEMENTO CON MOUSE
                //await buttonIdDinamico.hover();
           })
        })

        test('Llenar campo de texto',async({page}) => {

            await test.step('Ir a la pagina', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Ingresar texto en el campo',async() => {

                //VALIDA QUE EL CAMPO DE TEXTO SEA EDITABLE
                await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }),'Campo de texto no es editable').toBeEditable();
                await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill('Estoy aprendiendo playright');

                //TAMBIEN SE PUEDE UTILIZAR TYPE
                //await page.getByRole('textbox', { name: 'Un aburrido texto' }).type('Estoy aprendiendo playright');

                //INGRESAR UNA TECLA 
                //await page.getByRole('textbox', { name: 'Un aburrido texto' }).press('F');

                //VALIDA QUE EL TECTO INGRESADO SEA EL CORRECTO
                await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }),'El texto no es el mismo').toHaveValue('Estoy aprendiendo playright');
            })
        })

        test('Seleccionar textboxes',async({page}) => {

            await test.step('Go to main page training',async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Seleccionar el checkbox para pasta',async() => {
                await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check();
                //VALIDA QUE EL CHECKBOX NO ESTE SELECCIONADO
                await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' }), 'El checkbox no estaba seleccionado').toBeChecked();
            })

            await test.step('Des seleccionar el checkbox para pasta',async() => {
                //DESELECIONAR UN ELEMENTO
                await page.getByRole('checkbox', { name: 'Pasta 🍝' }).uncheck();
                //VALIDA QUE EL CHECKBOX ESTE SELECCIONADO
                await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' })).not.toBeChecked();


            })
        })
        
        test('Seleccionar un raddio button',async({page}) => {

            await test.step('Go to main page for trainig',async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Clic en un raddio button',async() => {
                await page.getByRole('radio', { name: 'No' }).check();
                await expect(page.getByRole('radio', { name: 'No' }),'El radio button no esta selecionado').toBeChecked();
            })
        })

        test('Seleccionar elemento de @dropdown', async({page, browserName}) => {
            //COMANDO PARA SALTAR LA EJECUCION DE UN BROWSER EN ESPECIFICO
            test.skip(browserName === 'webkit', 'No funciona en webkit aun');

            await test.step('Go to main page', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Seleccionar elemento de dropdown de deporte', async() => {
                //ESTA OPCION SOLO SIRVE SI EL ELEMENTO ES DE TIPO "SELECT"
                //await page.getByLabel('Dropdown').selectOption('Tennis');
                //await expect(page.getByLabel('Dropdown')).toHaveValue('Tennis');

                //const dropdownDeportes = page.getByLabel('formBasicSelect');
                //await expect(dropdownDeportes).toHaveValues([/Fútbol/,/Tennis/,/Basketball/]);

                //VALIDA TODOS LOS ELEMENTOS DE UNA LISTA
                const listaDeportes = ['Fútbol','Tennis','Basketball'];
                for (let opcion of listaDeportes){
                    //const elemento = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                    const elemento = await page.$(`//select[@id='formBasicSelect']/option[text()='${opcion}']`);

                    if(elemento){
                        console.log(`Opcion ${opcion} aparece en la lista`);
                    }
                    else{
                        console.log(`Opcion ${opcion} no aparece en la lista`);
                    }
                }
            })
        })

        test('Seleccionar elemento de dropdown dias de la semana', async({page}) => {

            await test.step('Go to main page', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Seleccionar elemento de dropdown de los dias de la smana', async() => {
                await page.getByRole('button', { name: 'Día de la semana' }).click();
                await page.getByRole('link', { name: 'Miércoles' }).click;
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
        
    
    
        test.only('Validar elementos de la tabla estatica', async({page}) => {

            await test.step('Go to main page', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Valida los elementos de la tabla', async() => {
                //CONSTANTE QUE EXTRAE CADA UNO DE LA LISTA DE ELEMENTOS SELECCIONADOS POR MEDIO DE LA FUNCION 'ELEMENTS.MAP'
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


        test('Validar elementos de la tabla dinamica', async({page}) => {

            await test.step('Go to main page', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

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

        test('Soft assertions',async({page}) => {

            await test.step('Go to main page for trainig',async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Validaciones blandas',async() => {
                await expect.soft(page.getByText('Pizzaa 🍕'),'No se encontro el elemento pizza').toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔'),'No se encontro el elemento hamburgesa').toBeVisible();
                await expect.soft(page.getByText('Pastaa 🍝'),'No se encontro el elemento pasta').toBeVisible();
                await expect.soft(page.getByText('Helado 🍧'),'No se encontro el elemento helado').toBeVisible();
                await expect.soft(page.getByText('Tortaa 🍰'),'No se encontro el elemento torta').toBeVisible();
            })
        })

        test('Valida pop up', async({page}) => {
            //CAMBIA EL ESTATUS DE LA EJECUCION DE FALIDO A PASADO Y AL REVEZ
            test.fail();
            //AGREGA UNA ANOTACION EN EL REPORTE 
            test.info().annotations.push({
                type: 'HU 5214',
                description: 'Agregar una anotacion a un test espacifico'
            });

            await test.step('Go to principal page', async() =>{
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Valida el pop up', async() => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!'),'Texto del pop up no nes el mismo').toHaveText('¿Viste? ¡Apareció un Pop-up!');
            })
        })

    })
})();