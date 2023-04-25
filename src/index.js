let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const andysToyCollection = document.querySelector('#toy-collection');

fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(andysToys => {
  andysToys.forEach(toy => {
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card');

    const toyImg = document.createElement('img');
    toyImg.src = toy.image;
    toyImg.setAttribute('class', 'toy-avatar');
    cardDiv.appendChild(toyImg);

    const toyH2 = document.createElement('h2');
    toyH2.textContent = toy.name;
    cardDiv.appendChild(toyH2);

    const toyP = document.createElement('p');
    toyP.textContent = `${toy.likes} likes`;
    cardDiv.appendChild(toyP);

    const toyBtn = document.createElement('button');
    toyBtn.setAttribute('class', 'like-button');
    toyBtn.setAttribute('id', toy.id);
    toyBtn.textContent = 'like';
    cardDiv.appendChild(toyBtn);

    andysToyCollection.appendChild(cardDiv);
  });
})
