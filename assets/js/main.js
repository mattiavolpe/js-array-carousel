/*
Consegna:
Dato un array contenente una lista di cinque immagini, creare un carosello come nello screenshot allegato.

MILESTONE 1
Per prima cosa, creiamo il markup statico:
costruiamo il container e inseriamo un'immagine grande al centro: avremo così la struttura base e gli stili pronti per poterci poi concentrare solamente sull'aspetto logico.

MILESTONE 2
Adesso rimuoviamo tutto il markup statico e inseriamo tutte le immagini dinamicamente servendoci dell'array fornito e un semplice ciclo for che concatena un template literal.
Tutte le immagini saranno nascoste, tranne la prima, che avrà una classe specifica che la renderà visibile.
Al termine di questa fase ci ritroveremo con lo stesso slider stilato nella milestone 1, ma costruito dinamicamente attraverso JavaScript.

MILESTONE 3
Al click dell'utente sulle frecce, il programma cambierà l’immagine attiva, che quindi verrà visualizzata al posto della precedente.

BONUS 1:
Aggiungere il ciclo infinito del carosello. Ovvero se è attiva la prima immagine e l'utente clicca la freccia per andare all’immagine precedente, dovrà comparire l’ultima immagine dell’array e viceversa.

BONUS 2:
Aggiungere la visualizzazione di tutte le thumbnails sulla destra dell’immagine grande attiva, come nello screenshot proposto. Tutte le miniature avranno un layer di opacità scura, tranne quella corrispondente all’immagine attiva, che invece avrà un bordo colorato.
Al click delle frecce, oltre al cambio di immagine attiva, gestire il cambio di miniatura attiva.

Prima di partire a scrivere codice:
Non lasciamoci spaventare dalla complessità apparente dell'esercizio, ma analizziamo prima, come abbiamo fatto sempre, cosa ci potrebbe aspettare.
Abbiamo completato ormai da qualche giorno la sessione HTML e CSS, se non ci ricordiamo qualcosa andiamo pure a riguardare alcuni argomenti. Non dedichiamo però al ripasso più di una mezz'ora, così da non perdere di vista il focus dell'esercizio.

Consigli del giorno:
Costruiamo del carosello una versione statica contenente solamente un'immagine. Di questa versione statica al momento opportuno commenteremo (oscureremo) alcuni elementi per poterli riprodurre dinamicamente in js. Potremo quindi usarli come "template".
Scriviamo sempre prima per punti il nostro algoritmo in italiano per capire cosa vogliamo fare
Al momento giusto (ihihhi starà a voi capire quale) rispondete a questa domanda: "Quanti cicli servono?"
*/

// CREATE AN ARRAY WITH IMAGES SOURCE
const imgList = ["./assets/img/01.webp", "./assets/img/02.webp", "./assets/img/03.webp", "./assets/img/04.webp", "./assets/img/05.webp"];

// SELECT THE CAROUSEL ELEMENT OF THE DOM
const carouselElement = document.querySelector(".carousel");

// SET A COUNTER FOR THE ACTIVE IMAGE
let activeImage = 0;

// CREATE THE ACTIVE IMAGE ELEMENT, SET IT'S ATTRIBUTES AND THE CLASS FOR VISIBILITY
for (let i = 0; i < imgList.length; i++) {
  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", `${imgList[i]}`);
  imgElement.setAttribute("alt", `Image${i}`);
  if (i == activeImage) {
    imgElement.classList.add("visible");
  }
  carouselElement.insertAdjacentElement("beforeend", imgElement);
}

// SELECT THE ICONS TO BROWSE THE IMAGES
const nextImageIconElement = document.querySelector(".next_image");
const prevImageIconElement = document.querySelector(".prev_image");

// SELECT THE RENDERED IMAGES
const insertedImgList = document.querySelectorAll(".carousel > img");

// SELECT THE CURRENT RENDERED IMAGE
let currentImage = insertedImgList[activeImage];

// CREATE THUMBNAIL CONTAINER AND INSERT IT IN THE DOM
const thumbnailContainerElement = document.createElement("div");
thumbnailContainerElement.id = "thumbnail_container";
carouselElement.insertAdjacentElement("beforeend", thumbnailContainerElement);

// LET'S TAKE WE WANT TO SEE 5 IMAGES IN THE THUMBNAIL AND NO MORE THAN THIS
for (let i = 0; i < 5; i++) {

  // CREATE THE CONTAINER FOR THE SINGLE THUMBNAIL
  const singleThumbnailContainer = document.createElement("div");

  // CREATE THE SINGLE THUMBNAIL ELEMENT
  const singleThumbnailElement = document.createElement("img");
  singleThumbnailElement.setAttribute("src", `${imgList[i]}`);

  // SET THE ACTIVE CLASS TO THE CURRENT IMAGE RELATED THUMBNAIL
  if (i == activeImage) {
    singleThumbnailContainer.classList.add("active");
  }

  // APPEND BOTH THE THUMBNAIL AND IT'S CONTAINER TO THE DOM
  singleThumbnailContainer.insertAdjacentElement("beforeend", singleThumbnailElement);
  thumbnailContainerElement.insertAdjacentElement("beforeend", singleThumbnailContainer);
}

const insertedThumbnailList = document.querySelectorAll("#thumbnail_container > div");

let currentActiveThumbnail = insertedThumbnailList[activeImage];

// <---------- EVENTS ---------->

// CREATE EVENT LISTENER FOR NEXT IMAGE
nextImageIconElement.addEventListener("click", function() {
  removeClasses();
  activeImage++;
  if (activeImage == imgList.length) {
    activeImage = 0;
  }
  setCurrent();
  currentImage.style.animation = "slide-down 0.6s 1";
});

// CREATE EVENT LISTENER FOR PREVIOUS IMAGE
prevImageIconElement.addEventListener("click", function() {
  removeClasses();
  activeImage--;
  if (activeImage == -1) {
    activeImage = imgList.length - 1;
  }
  setCurrent();
  currentImage.style.animation = "slide-up 0.6s 1";
});

// CREATE EVENT LISTENERS FOR POINTER OVER THUMBNAIL CONTAINER
thumbnailContainerElement.addEventListener("pointerover", function() {
  for (let i = 0; i < 5; i++) {
    opacity1(i);
  }
});

// CREATE EVENT LISTENERS FOR POINTER OUT THUMBNAIL CONTAINER
thumbnailContainerElement.addEventListener("pointerout", function() {
  for (let i = 0; i < 5; i++) {
    opacity0(i);
  }
});

// CREATE EVENT LISTENERS FOR POINTER OVER NEXT IMAGE ARROW
nextImageIconElement.addEventListener("pointerover", function() {
  for (let i = 0; i < 5; i++) {
    opacity1(i);
  }
});

// CREATE EVENT LISTENERS FOR POINTER OVER PREVIOUS IMAGE ARROW
prevImageIconElement.addEventListener("pointerover", function() {
  for (let i = 0; i < 5; i++) {
    opacity1(i);
  }
});

// MAKE CURRENT IMAGE AND THUMBNAIL CHANGE IN CASE OF CLICK ON THUMBNAIL
insertedThumbnailList.forEach(thumbnail => {
  thumbnail.addEventListener("click", function() {
    removeClasses();
    for (let i = 0; i < insertedThumbnailList.length; i++) {
      if (insertedThumbnailList[i] == thumbnail) {
        activeImage = i;
        setCurrent();
      }
    }
  })  
});

// <---------- FUNCTIONS ---------->

function opacity0(i) {
  insertedThumbnailList[i].style.opacity = 0;
}

function opacity1(i) {
  insertedThumbnailList[i].style.opacity = 1;
}

function removeClasses() {
  currentImage.classList.remove("visible");
  currentActiveThumbnail.classList.remove("active");
  // NO SLIDE ANIMATION IF YOU CLICK DIRECTLY ON THUMBNAIL
  currentImage.style.animation = "";
}

function setCurrent() {
  currentImage = insertedImgList[activeImage];
  currentActiveThumbnail = insertedThumbnailList[activeImage];
  currentImage.setAttribute("src", `${imgList[activeImage]}`);
  currentImage.setAttribute("alt", `Image${activeImage}`);
  currentImage.classList.add("visible");
  currentActiveThumbnail.classList.add("active");
}