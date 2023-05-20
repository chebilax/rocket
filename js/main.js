'use strict';

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
let btnFire;
let btnStop;
let btnReset;
let compteur = 10;
let timer;
let billboard = document.querySelector('#billboard span');
let rocket = document.querySelector('#rocket');
let alertShown = false;

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/
function decollage() {
    if (!alertShown) {
        if (confirm('Voulez-vous lancer le décollage de la fusée ?')) {
            timer = setInterval(startDecollage, 1000);
            alertShown = true;
        }
    } else {
        timer = setInterval(startDecollage, 1000);
    }
}

function startDecollage()
{
  
    btnFire.classList.add('disabled');
    btnFire.removeEventListener('click',decollage);
    btnStop.classList.remove('disabled');
    btnStop.addEventListener('click',stopDecollage);
    
    compteur--;
 
    billboard.textContent = compteur;
    
    if(compteur <= 0 )
    {
        
        clearInterval(timer);
        rocket.src="images/rocket3.gif";
        rocket.classList.add('tookOff');
        btnStop.classList.add('disabled');
        btnStop.removeEventListener('click',stopDecollage);
        
        
    }
    
    rocket.src="images/rocket2.gif";
}

function stopDecollage()
{
    btnStop.classList.add('disabled');
    btnStop.removeEventListener('click',stopDecollage);
    clearInterval(timer);
    btnFire.classList.remove('disabled');
    btnFire.addEventListener('click',decollage);
}


function resetDecollage() 
{
    clearInterval(timer);
    btnFire.classList.remove('disabled');
    compteur = 10;
    billboard.textContent = compteur;
    rocket.src="images/rocket1.png";
    rocket.classList.remove('tookOff');
    btnFire.addEventListener('click', decollage);
}



function etoiles()
{       
    let div = document.createElement('div');
    div.classList.add('star');
    div.style.top = getRandomInteger(0,100)+"%";
    div.style.left = getRandomInteger(0,100)+"%";
        
    let random = getRandomInteger(1,3);
    switch (random) {
        case 1:
            div.classList.add('tiny');
            break;
        case 2:
            div.classList.add('normal');
            break;
        case 3:
            div.classList.add('big');
            break;
        }
    document.body.appendChild(div);
}

function commandes() {
    alert('Green button : Start\nBlue button : Stop\nRed button : RàZ\n---------\nPress C to show commands again');
}


/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/
document.addEventListener('DOMContentLoaded', function() {
    // sélection des boutons
    btnFire = document.getElementById('firing-button');
    btnStop = document.getElementById('cancel-button');
    btnReset = document.getElementById('raz-button');
  
    // installation des événements
    btnFire.addEventListener('click', decollage);
    btnStop.addEventListener('click', stopDecollage);
    btnReset.addEventListener('click', resetDecollage);
  
    // appel à la fonction etoiles() toutes les 500ms
    setInterval(etoiles, 500);
  
    // Écoute de l'événement keydown ou keypress au niveau du document
    document.addEventListener('keydown', function(event) {
      // Vérification de la touche appuyée (touche "C")
      if (event.key === 'c' || event.key === 'C') {
        // Affichage de l'alerte avec les explications des boutons
        commandes();
      }
    });
  
    // affiche les instructions après 1s
    setTimeout(function() {
        commandes();
      }, 100);
  });
  
