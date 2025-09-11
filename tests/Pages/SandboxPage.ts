import {type Locator, type Page} from '@playwright/test';

export class SandboxPage{

    readonly page:Page;
    readonly urlPage: string;
    readonly buttonIdDinamico: Locator;
    readonly textoButtonIdDinamico: Locator;
    readonly textoEsUnAburruidoTexto: Locator;
    readonly raddioButtonNo: Locator;
    readonly raddioButtonSi: Locator;
    readonly listDiasDeLaSemana: Locator;
    readonly elementListDiasDeLaSemana: Locator;
    readonly pastaCheckbox: Locator;
    readonly hamburgesaCheckbox: Locator;
    readonly pizzaCheckbox: Locator;
    readonly heladoCheckbox: Locator;
    readonly tortaCheckbox: Locator; 
    readonly showPopup: Locator;
    readonly textPopup: Locator;

    constructor(page: Page){
        this.page = page;
        this.urlPage = 'https://thefreerangetester.github.io/sandbox-automation-testing/';
        this.buttonIdDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });
        this.textoButtonIdDinamico = page.getByText('OMG, aparezco después de 3');
        this.textoEsUnAburruidoTexto = page.getByRole('textbox', { name: 'Un aburrido texto' });
        this.raddioButtonNo = page.getByRole('radio', { name: 'No' });
        this.raddioButtonSi = page.getByRole('radio', { name: 'Si' });
        this.listDiasDeLaSemana = page.getByRole('button', { name: 'Día de la semana' });
        this.elementListDiasDeLaSemana = page.getByRole('link', { name: 'Miércoles' });
        this.pizzaCheckbox = page.getByText('Pizza 🍕');
        this.hamburgesaCheckbox = page.getByText('Hamburguesa 🍔')
        this.pastaCheckbox = page.getByRole('checkbox', { name: 'Pasta 🍝' });
        this.heladoCheckbox = page.getByText('Helado 🍧');
        this.tortaCheckbox = page.getByText('Torta 🍰');
        this.showPopup = page.getByRole('button', { name: 'Mostrar popup' });
        this.textPopup = page.getByText('¿Viste? ¡Apareció un Pop-up!');
    }

    async checkPasta(){
        await this.pastaCheckbox.check();
    }

    async uncheckPasta(){
        await this.pastaCheckbox.uncheck();
    }

    async clickbuttonIdDinamico(){
        await this.buttonIdDinamico.click({force:true});
    }

    async fillText(){
        await this.textoEsUnAburruidoTexto.fill('Estoy aprendiendo playright');
    }

    async clickOnRaddioButton(value: string){
        //Options No/Si
        if(value=='No')
            this.raddioButtonNo.click();
        else if(value=='Si')
            this.raddioButtonSi.click();
    }

    async validateElementsFromList(page){

        const listaDeportes = ['Fútbol','Tennis','Basketball'];
        
        for (let opcion of listaDeportes){
        
            const elemento = await page.$(`//select[@id='formBasicSelect']/option[text()='${opcion}']`);
        
            if(elemento)
                console.log(`Opcion ${opcion} aparece en la lista`);
            else
                console.log(`Opcion ${opcion} no aparece en la lista`);
        }
    }

    async clickOnDaysOfTheWeek(){

        await this.listDiasDeLaSemana.click();
        await this.elementListDiasDeLaSemana.click();

    }

    async showPopUp(page){

        await this.showPopup.click();
        
    }



}

