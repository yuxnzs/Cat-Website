import Cat from "./Cat.js";
import API_KEY from "./Config.js";

declare var $: any;

async function getCats(): Promise<Cat[]> {
  try {
    const response = await $.ajax({
      url: "https://api.thecatapi.com/v1/images/search?limit=30&has_breeds=1&size=small",
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function createCatCards(cat: Cat) {
  const catCard = `
    <div class="col-md-6 col-lg-4 col-xl-4 col-xxl-12">
          <div class="card overflow-hidden bg-light border-0">
            <div class="row g-0">
              <!-- Cat image -->
              <div class="col-sm-12 col-lg-12 col-xxl-3 cat-img">
                <img
                  src="${cat.url}"
                  alt=""
                />
              </div>
              <!-- Cat info -->
              <div class="col-sm-12 col-lg-12 col-xxl-9">
                <div class="card-body">
                  <p class="card-title fs-3 mb-1">${cat.breeds[0].name}</p>
                  <p class="card-text cat-info fs-5 mb-2 text-truncate">
                    ${cat.breeds[0].origin} • Life span: ${cat.breeds[0].life_span} years
                  </p>
                  <p class="card-text cat-intro justify-text">
                    ${cat.breeds[0].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  `;

  return $(catCard);
}

function renderCats(cats: Cat[]) {
  const catCards = cats.map((cat) => createCatCards(cat));
  // Append all catCards to the container not the array itself
  $(".container .row").append(...catCards);
}

$("#get-cats").on("click", function () {
  getCats().then((cats) => {
    renderCats(cats);
    console.log("Success");
  });
});
