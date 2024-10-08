const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

// Instancia de MemoryGame (crearla una sola vez fuera del evento 'load')
const memoryGame = new MemoryGame(cards);

window.addEventListener('load', (event) => {
  let html = '';
  
  // Generar el HTML de las cartas
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Asignar el HTML generado al contenedor 'memory-board'
  document.querySelector('#memory-board').innerHTML = html;

  // Seleccionar todas las cartas
  const allCards = document.querySelectorAll(".card");

  // Asignar evento de click a cada carta
  allCards.forEach((cardElement) => {
    cardElement.addEventListener('click', () => {
      
      // Evitar que más de dos cartas se giren al mismo tiempo
      if (memoryGame.pickedCards.length >= 2) return;
      
      // Obtener el nombre de la carta y añadirla al array pickedCards
      const cardName = cardElement.getAttribute('data-card-name');
      memoryGame.pickedCards.push(cardElement);
      
      // Voltear la carta visualmente
      cardElement.classList.add("turned");

      // Si se han seleccionado dos cartas, se procede a la comparación
      if (memoryGame.pickedCards.length === 2) {
        const [card1, card2] = memoryGame.pickedCards;

        // Usamos checkIfPair para verificar si ambas cartas son iguales
        if (memoryGame.checkIfPair(card1.getAttribute('data-card-name'), card2.getAttribute('data-card-name'))) {
          console.log('¡Pareja encontrada!');
          memoryGame.pairsGuessed++;

          // Dejamos las cartas volteadas (mantienen la clase 'turned')
        } else {
          // Si no coinciden, damos tiempo para verlas y las giramos de nuevo
          setTimeout(() => {
            card1.classList.remove('turned');
            card2.classList.remove('turned');
          }, 1000);
        }

        // Reiniciar el array pickedCards después de la comparación
        memoryGame.pickedCards = [];
        
        // Aumentar el número de pares intentados
        memoryGame.pairsClicked++;
      }
    });
  });
});


