'use strict';

// products

// Computer
const comp1 = { 
  name: '2021 Macbook Pro 14"',
  price: 1999.00,
  img: '/static/img/prodImg/macbook.jpg',
  altImg: 'Macbook Pro fourteen inch',
  desc: 'Apple M1 Pro or M1 Max chip for a massive leap in CPU, GPU, and machine learning performance Up to 10-core CPU delivers up to 3.7x faster performance to fly through pro workflows quicker than ever',
};

const update_index = document.querySelector('.item_index');


function updateV1Prod(name, price, img, altImg, desc) {
  const html = `
  <div class="col my-4 mx-4">
    <div class="card rounded" style="width: 18rem;">
      <img
        class="card-img-top rounded"
        style="height: 15rem"
        src="${img}"
        alt="${altImg}"
      />
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">
          ${desc}
        </p>
        <a
          href="#"
          >$${price}</a
        >
      </div>
    </div>
  </div>`

  update_index.insertAdjacentHTML('afterbegin', html);
}

updateV1Prod(comp1.name, comp1.price, comp1.img, comp1.altImg, comp1.desc);

function updateV2Prod(name, price, img, altImg, desc){
  const html = `
  <div class="card mb-3 mx-4 my-2" >
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${img}" class="img-fluid rounded-start" alt="${altImg}" style="height: 10rem; width: 10rem;">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${desc}</p>
            <a
                href="#"
                class="card-link"
                >$${price}
                </a>
          </div>
        </div>
      </div>
    </div>
    `

  update_index.insertAdjacentHTML('afterbegin', html);
}

updateV2Prod(comp1.name, comp1.price, comp1.img, comp1.altImg, comp1.desc);