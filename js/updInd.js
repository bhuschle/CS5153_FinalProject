"use strict";

// products

// Computer
const comp1 = {
  name: '2021 Macbook Pro 14"',
  price: 1999.0,
  img: "/static/img/prodImg/macbook.jpg",
  altImg: "Macbook Pro fourteen inch",
  desc:
    "Apple M1 Pro or M1 Max chip for a massive leap in CPU, GPU, and machine learning performance Up to 10-core CPU delivers up to 3.7x faster performance to fly through pro workflows quicker than ever",
};

// Tablets
const tab1 = {
  name: "Kindle - black",
  price: 59.99,
  img: "/static/img/prodImg/kindle.jpg",
  altImg: "black kindle",
  desc:
    "Purpose-built for reading with a 167 ppi glare-free display that reads like real paper, even in direct sunlight. Adjustable brightness lets you read comfortably",
};

const tab2 = {
  name: '2021 Apple iPad 10.2"',
  price: 429.99,
  img: "/static/img/prodImg/ipad.jpg",
  altImg: "2021 Apple iPad ten point two inch",
  desc:
    "Gorgeous 10.2-inch Retina display with True Tone A13 Bionic chip with Neural Engine 8MP Wide back camera, 12MP Ultra Wide front camera with Center Stage",
};

// Accessories
const acc1 = {
  name: "Alex Tech 10ft - cord protector",
  price: 9.99,
  img: "/static/img/prodImg/protector.jpg",
  altImg: "ten foot cord protector",
  desc:
    "Size: Diameter: 1/2 inch| Length: 10 Feet | Color: Black. Our wire loom is split and easy to load wires. Once loaded, our cable sleeve will close on itself and perfect wire wrap",
};

const acc2 = {
  name: "Lisen Desk Stand",
  price: 15.99,
  img: "/static/img/prodImg/stand.jpg",
  altImg: "Lisen phone desk stand",
  desc:
    "This cell phone stand for desk is the only one on the market equipped with a weighted base and an aluminum alloy rod taller electronic stand.",
};

// Phones
const pho1 = {
  name: "Samsung S21 FE",
  price: 549.99,
  img: "/static/img/prodImg/s21fe.jpg",
  altImg: "Samsung S twenty one Fan Edition",
  desc:
    "The 120Hz display delivers a super smooth scroll, with optimized refresh rate, and a fast touch response gives seamless visuals in both work and play",
};

const update_index = document.querySelector(".item_index");

function updateV1Prod(name, price, img, altImg, desc) {
  const html = `
  <div class="col-md d-flex align-items-stretch my-3">
    <div class="card h-100 rounded" style="width: 18rem;">
      <img
        class="card-img-top rounded px-2 py-2"
        height="160"
        width="160"
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
  </div>`;

  update_index.insertAdjacentHTML("afterbegin", html);
}

update_index.innerHTML = "";
//updateV1Prod(comp1.name, comp1.price, comp1.img, comp1.altImg, comp1.desc);
updateV1Prod(tab1.name, tab1.price, tab1.img, tab1.altImg, tab1.desc);
updateV1Prod(tab2.name, tab2.price, tab2.img, tab2.altImg, tab2.desc);
updateV1Prod(acc1.name, acc1.price, acc1.img, acc1.altImg, acc1.desc);
updateV1Prod(acc2.name, acc2.price, acc2.img, acc2.altImg, acc2.desc);
updateV1Prod(pho1.name, pho1.price, pho1.img, pho1.altImg, pho1.desc);
updateV1Prod(comp1.name, comp1.price, comp1.img, comp1.altImg, comp1.desc);
updateV1Prod(tab1.name, tab1.price, tab1.img, tab1.altImg, tab1.desc);
updateV1Prod(tab2.name, tab2.price, tab2.img, tab2.altImg, tab2.desc);
updateV1Prod(acc1.name, acc1.price, acc1.img, acc1.altImg, acc1.desc);
updateV1Prod(acc2.name, acc2.price, acc2.img, acc2.altImg, acc2.desc);
updateV1Prod(pho1.name, pho1.price, pho1.img, pho1.altImg, pho1.desc);
