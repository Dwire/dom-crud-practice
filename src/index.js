document.addEventListener('DOMContentLoaded', () => {

  getAllGifts()

  const giftList = document.querySelector('.gift-list')
  const formButton = document.querySelector("#new-gift-form")

  formButton.addEventListener("submit", grabFormInputs)
  giftList.addEventListener('click', handleDeleteEvent)


// --------------- FETCH CALLS ---TO DATABASE---------------
function getAllGifts(){
  return fetch("http://localhost:3000/gifts")
  .then(res => res.json())
  .then(displayAllGifts)
}

function createGiftPost(giftObj){
  fetch("http://localhost:3000/gifts", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(giftObj)
  })
  .then(res => res.json())
  .then(displaySingleImage)
}

function fetchDeletGift(giftId){
  fetch(`http://localhost:3000/gifts/${giftId}`, {
    method: 'DELETE'
  })
}

// -------------ADD TO DOM---------------------
function displaySingleImage(gift){
  let currentList = document.querySelector('.gift-list')
  currentList.innerHTML += `<li> ${gift.name} <img src=${gift.image}></li>`
}


function displayAllGifts(gifts) {
  // debugger
  console.log("SECOND");
  gifts.map(gift => {
    giftList.innerHTML += `
    <div>
      <h1> ${gift.name} </h1>
      <img src=${gift.image}>
      <button class='delete' id="${gift.id}"> Delete </button>
      <button class='edit' data-gift-id="${gift.id}"> Edit </button>
    </div>`
  })
}

//--------------------- EDIT FUNCTION ------------------------
// function populateForm(giftId, name, url){
//   let imgInput = document.querySelector('#gift-image-input')
//   let nameInput = document.querySelector('#gift-name-input')
//   let formBtn = document.querySelector('#gift-form-button')
//
//   imgInput.value = url
//   nameInput.value = name
//   formBtn.id = ""
//   // formBtn['data-id'] = giftId
//
//   console.log(form);
// }


// ----------------- HANDLE EVENTS ---------------------------

function grabFormInputs(e){
  e.preventDefault()

  const nameInput = document.querySelector("#gift-name-input").value
  const imageInput = document.querySelector("#gift-image-input").value

  let giftObj = {name: nameInput, image: imageInput}

  createGiftPost(giftObj)
}

function handleDeleteEvent(e) {
  if (e.target.className === "delete"){
    let giftId = e.target.id
    fetchDeletGift(giftId)
    e.target.parentElement.remove()
  }else if (e.target.className === "edit"){
    let giftUrl = e.target.parentElement.children[1].src
    let giftName = e.target.parentElement.children[0].innerText
    let giftId = e.target.dataset.giftId
    // populateForm(giftId, giftName, giftUrl)
  }
}













})
