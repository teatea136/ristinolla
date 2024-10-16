

//Aloitus tila ennen peliä ja tarvittavat muutujat määritellään toimintoja varten.
let vuoro = "";
let peliKaynnissa = false;
let sisalto = 
["T", "I", "C", 
"T", "A", "C",
"T", "O", "E"];
document.querySelector('#aloitusNappi').style.visibility = "visible";
document.querySelector('#ilmoitus').style.visibility = "hidden";




// Aloitus nappi joka aktivoi pelin kutsumalla pelinKaynnistus funktiota
const klikkaaAloita = () => {
    pelinKaynnistys();
    document.querySelector('#aloitusNappi').style.visibility = "hidden";
}

// Pelin käynnistyessä otetaan käynnissäolo tieto talteen ja nollataan ruudukkoa vastaava muisti taulukko sisalto ja HTML solujen sisältö vastaavasti. 

const pelinKaynnistys = () => {
    peliKaynnissa = true;
    vuoro = "X";
    sisalto = 
    ["", "", "", 
    "", "", "",
    "", "", ""];
    //Lisätään kuuntelijat jokaiselle solulle ja parannetaan selkeyttä myös vaihtamalla osoitin klikkattavuutta näyttämään HTMLään. 
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', klikkaa));
    document.querySelectorAll('.cell').forEach(cell => cell.style.cursor = 'pointer');
}


// Aina kun html taulukon cell ruutuihin sidottu click kuuntelija aktivoituu käyttäjän klikkauksesa tätä funktiota kutsutaan.

// Tarkistaa onko ruutu tyhjä ja jos on, laittaa siihen sen merkin jonka vuoro on käynnissä. Lopussa vielä kutsuu voittorivin testaamisen ja vuoronvaihdon. 
const klikkaa = (klikattuRuutu) => {
    // HTMLssä ruuduilla on idt jotka merkkaavat mikä ruutu on mikä numerolla 0-8, haetaan id numero jotta tiedetään mitä ruutua käsitellään.
    const ruutu = klikattuRuutu.target;
    const ruutuNro = parseInt(ruutu.getAttribute('id'));
    //Tarkistetaan että taulukkomme ruutu on tyhjä ja peli käynnissä. 
    if (sisalto[ruutuNro] === "" && peliKaynnissa) {
        //sitten lisätään sekä javascipt taulukkoon(sisalto) muistiin se merkki kenen vuoro on ja  laitetaan sen visuaalinen vastine näkymään myös HTML sivulle.
        if (vuoro === "X") {
            sisalto[ruutuNro] = "X";
            document.getElementById(ruutuNro.toString()).innerHTML = "X";
        }
        if (vuoro === "O") {
            sisalto[ruutuNro] = "O"
            document.getElementById(ruutuNro.toString()).innerHTML = "O"
            
        }
        testaaVoittorivi();
        vuoronVaihto();
    }
    console.log(vuoro);
    
}


console.log(sisalto);


// Vuoroa vaihtava funktio.
const vuoronVaihto = () => {
    if (vuoro === "X" ) {
        vuoro = "O";
        return;
    }
    if (vuoro === "O") {
        vuoro = "X";
        return;
    } else {
        console.log("Virhe vuoron vaihdossa.")
        return;
    }
}

//Voittorivejä joita vasten testataan onko mitään näistä käynnissä olevassa pelissä. Jokainen numero vastaa yhtä ruutua ristinollan yhdeksästä ruudusta.
//Jokainen kolmen lista listassa on ruutujen eli niiden numeroitujen ruutujen yhdistelmä joka on suora eli voittava rivi. 
const voittoRivit = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Tämä funktio testaa onko käynnissä olevassa pelissä esiintynyt voittoriviä,  niin se lopettaa pelin ja ilmoittaa tuloksen. 
const testaaVoittorivi = () => {
    let peliVoitettu = false;
    //tämä for looppi käy läpi kaikki kahdeksan (0-7) voittoriviä eli voittoRivit taulukon pituuden ajan.
    for (let i = 0; i <= 7; i++) {
        const voittoRivi = voittoRivit[i]; //testattava voittorivi
        // Tallenetaan voittoRiviä vastaavien sisalto-taulukon kolmen solun kohtien sisällöt eli X tai Y merkki, muuttujaan jotta voimme verrata niitä toisiinsa.
        let a = sisalto[voittoRivi[0]]; 
        let b = sisalto[voittoRivi[1]];
        let c = sisalto[voittoRivi[2]];
        // Jos sisaltotaulukossa voittorivissä on vielä tyhjiä kohtia, jatketaan for loopissa seuraavaan, kunnes kaikki voittorivit on käyty läpi.
        if (a === "" || b === "" || c === "") {
            continue;
        }
        //Jos sisaltotaulukosta saadut muuttujat a, b, c ovat sama merkki X tai Y on jokin voittorivit taulukon voittoriveistä tullut täyteen ja peli on voitettu, tallenetaan sen tilanne todeksi ja lopetetaan voittorivien läpikäynti break komennolla.
        if (a === b && b === c) {
            peliVoitettu = true;
            break;
        }
    }

    //kun peliVoitettu tai tasaPeli muuttuu todeksi peli lopetetaan (peliKaynnissa = false) ja ilmoitus joka sisältää tuloksen tulee näkyviin HTML sivulla. 
    if (peliVoitettu) {
        peliKaynnissa = false;
        document.querySelector('#ilmoitus').style.visibility = "visible";
        document.querySelector('#ilmoitusTeksti').innerHTML =  `VOITTAJA ON ${vuoro}`
        return;

    }
    let tasaPeli = !sisalto.includes(""); //Tarkistetaan että taulukossa ei ole tyhjiä paikkoja jäljellä vaikka voittoriviä ei ole löytynyt.
    if (tasaPeli) {
        peliKaynnissa = false;
        document.querySelector('#ilmoitus').style.visibility = "visible";
        document.querySelector('#ilmoitusTeksti').innerHTML =  `TASAPELI`
        return;
    }

}


// Piilotetaan ilmoitus kun pelin uudelleen käynnistysnapin kuuntelija aktivoituu ja käynnistetään peli.
const klikkaaReplay = () => {
    document.querySelector('#ilmoitus').style.visibility = "hidden";
    document.getElementById('ilmoitusTeksti').innerHTML = "";
    pelinKaynnistys();
}





//Kuuntelijat ilmoitusten napeille
document.querySelector('#aloitusNappi').addEventListener('click', klikkaaAloita);
document.querySelector('#ilmoitusNappi').addEventListener('click', klikkaaReplay);


