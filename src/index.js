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
const addToyForm = document.querySelector('.add-toy-form');

const toyCard = toy => {
  const toyDiv = document.createElement('div');
  toyDiv.setAttribute('class', 'card');

  const toyImg = document.createElement('img');
  toyImg.src = toy.image;
  toyImg.setAttribute('class', 'toy-avatar');
  toyDiv.appendChild(toyImg);

  const toyHeader = document.createElement('h2');
  toyHeader.textContent = toy.name;
  toyDiv.appendChild(toyHeader);

  const toyLikes = document.createElement('p');
  toyLikes.textContent = `${toy.likes} likes`;
  toyDiv.appendChild(toyLikes);

  const toyBtn = document.createElement('button');
  toyBtn.setAttribute('class', 'like-button');
  toyBtn.setAttribute('id', toy.id);
  toyBtn.textContent = 'like';
  toyDiv.appendChild(toyBtn);

  return toyDiv;
}

fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(andysToys => {
  andysToys.forEach(toy => {
    const toyCards = toyCard(toy);
    andysToyCollection.appendChild(toyCards);
  });
})

addToyForm.addEventListener('submit', e => {
  e.preventDefault();

    fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': addToyForm.name.value,
      'image': addToyForm.image.value,
      'likes': 0
    }),
  })
    .then(resp => resp.json())
    .then(toy => {
      const newToy = toyCard(toy);
      andysToyCollection.appendChild(newToy);
  })
})


fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(() => {
  const toyLikeButtons = document.querySelectorAll('.like-button');

  toyLikeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', e => {
      const toyId = e.target.id;
      const presentLikes = e.target.previousSibling.textContent;
      const updatedLikes = parseInt(presentLikes) + 1;

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          likes: updatedLikes
        })
      })
      .then(resp => resp.json())
      .then(data => {
        e.target.previousSibling.textContent = `${data.likes} likes`;
      })
    })
  })
})
