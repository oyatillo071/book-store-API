const wrapper = document.querySelector("#wrapper");
let shopCards = "";

function priceUpdate() {
  document.querySelector(".price-sum").innerHTML = `${sum} $`;
}
function craeteBlock(data) {
  if (data.author == undefined) {
    return "";
  }
  return `
       <div class="card">
         <img
       class="book-img"
       src="./images/book.jpg"
       alt="book cover" />
       <div class="book-left">
     
       <h4 class="book-title">${data.title}</h4>
       <h5 class="book-author">Author:${data.author}</h5>
       <p class="book-genre">Genre: ${data.genre}</p>
       <p class="book-publisher">Publicher : ${data.publisher}</p>
       <p class="book-publication-date">Publication Date: ${data.publication_date}</p>
       <p class="book-isbn">ISBN: ${data.ISBN}</p>
           <p class="book-disc">
       About book:${data.description}
       </p>
       
       <p class="book-rating">Rating: ${data.rating}</p>
       <p class="book-stock">Stock: ${data.stock}</p>
       <p class="book-language">Lang: ${data.language}</p>
       <p class="book-pages">Pages: ${data.pages}</p>
       <p class="book-id" style="display:none" >id: ${data.id}</p >
       <h2 class="book-price">Price:${data.price} $</h2>
       
       <button class="book-buy " card-price="${data.price}" card-author="${data.author}">
       add to cart</button>
       </div>
     
       </div>`;
}
let sum = 0;

console.log(sum);

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://json-api.uz/api/project/my-books/books", {
    method: "GET",
  })
    .then((response) => {
      if (response.status == 200) {
        console.log(response.status);
        return response.json();
      }
    })
    .then((data) => {
      wrapper.innerHTML = "";
      data.data.forEach((element) => {
        let card = craeteBlock(element);
        wrapper.innerHTML += card;
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

let buyBtn = document.querySelectorAll("button");
let buy = document.querySelectorAll(".book-buy");

document.querySelector(".close-btn").addEventListener("click", () => {
  document.querySelector(".shop_cards-modal").style.display = "none";
});
wrapper.addEventListener("click", function (event) {
  let targetItem = event.target;
  if (targetItem.classList.contains("book-buy")) {
    let price = targetItem.getAttribute("card-price");
    let author = targetItem.getAttribute("card-author");
    alert("Book add to shop");
    sum += parseFloat(price);
    document.querySelector(".modal-res").innerHTML += `
      <div class="shop-card">
        <div class="shop-card-title-wrapper">
          <h2 class="book-title-shop">${author}</h2>
          <h3 class="book-price-shop">${parseFloat(price)}</h3>
        </div>
        <button class="remove-card">X</button>
      </div>
    `;
  }
});

document.querySelector(".btn").addEventListener("click", () => {
  document.querySelector(".shop_cards-modal").style.display = "flex";
  priceUpdate();
});

document.querySelector(".close-btn").addEventListener("click", () => {
  document.querySelector(".shop_cards-modal").style.display = "none";
});

document
  .querySelector(".modal-res")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-card")) {
      event.target.closest(".shop-card").remove();
    }
  });
