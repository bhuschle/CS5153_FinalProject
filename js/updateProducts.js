
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
}