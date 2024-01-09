const loadAllData = () => {
  console.log();
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((response) => response.json())
    // .then(data => console.log(data));
    // .then(data => console.log(data.data));
    .then((data) => displayAllData(data.data));

}

const displayAllData = (data) => {
    // console.log(data);
    // console.log(data.length);

    // const companyContainer = document.getElementById('company-container');

    const halfContainer = data.tools.slice(0, 6);
    // console.log(halfContainer);
    const restHalfContainer = data.tools.slice(6, 12);
    // console.log(restHalfContainer);


    processCompanies(halfContainer);
    const seeMore = document.getElementById('see-more');
    seeMore.classList.remove('d-none');

    // console.log(seeMore.classList);
    // processCompanies(halfContainer);
    // console.log(seeMore.classList);
    // console.log(seeMore.classList);

    document.getElementById('btn-see-more').addEventListener('click', function () {
        // console.log("button clicked");
        processCompanies(restHalfContainer);
        seeMore.classList.add('d-none');
    })

    const sortByDateBtn = document.getElementById("sortByDateBtn");
    sortByDateBtn.addEventListener("click", () => {
      sortDataByDate(data);
    });

}

const processCompanies = (companies) => {

    const companyContainer = document.getElementById('company-container');

    companies.forEach(singleCompany => {
        // console.log(companies);
        // console.log(companies.name);
        // console.log(singleCompany.id);

        const companyDiv = document.createElement('div');
        companyDiv.classList.add('col');
        companyDiv.innerHTML = `
        <div class="card h-100 p-3">
        <img style="height: 200px" src="${
          singleCompany.image
        }" class="card-img-top img-thumbnail" alt="${singleCompany.name}">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p class="card-text">
            ${generateFeatures(singleCompany.features)}
            </p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
            <div>
                <h3>${singleCompany.name}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                    <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                <small class="text-muted">${singleCompany.published_in}</small>
            </div>
            <button onclick="loadCompanyModalDetails('${
              singleCompany.id
            }')" data-bs-toggle="modal" data-bs-target="#companyModal" class="btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red"
                    class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
            </button>
        </div>
    </div>
        `;
        companyContainer.appendChild(companyDiv);
    });
}

const sortDataByDate = (data) => {
  if (data && data.tools) {
    data.tools.sort(
      (a, b) => new Date(b.published_in) - new Date(a.published_in)
    );

    const companyContainer = document.getElementById("company-container");
    companyContainer.innerHTML = "";

    processCompanies(data.tools);
  } else {
    console.error("Data structure is not as expected.");
  }
};

const generateFeatures = (features) => {
    let featureHTML = '';
    for (let i = 0; i < features.length; i++) {
        featureHTML += `<li>${features[i]}</li>`
    }
    return featureHTML;
}


const loadCompanyModalDetails = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(response => response.json())
        // .then(data => console.log(data))
        // .then(data => console.log(data.data))
        .then(data => displayCompanyModalDetails(data.data))
}

const displayCompanyModalDetails = (company) => {

    const companyModalBody = document.getElementById('company-modal-body');
    companyModalBody.innerHTML = `

                <div class="card p-2 bg-warning-subtle">
                    <h5>${company.description}</h5>
                    <div
                        class="container text-center gap-2 d-flex justify-content-around align-items-center">

                        <div class="container text-center m-2">
                            <div class="d-flex justify-content-around">
                                <div style="width: 30%;" class="col-sm-12 col-md-6 shadow rounded p-3 m-2">
                                    ${company.pricing[0].price ? company.pricing[0].price : "Free of Cost/" }
                                    ${company.pricing[0].plan}
                                </div>
                                <div style="width: 30%;" class="col-sm-12 col-md-6 shadow rounded p-3 m-2">
                                    ${company.pricing[1].price ? company.pricing[1].price : "Free of Cost/"}
                                    ${company.pricing[1].plan}
                                </div>
                                <div style="width: 30%;" class="col-sm-12 col-md-6 shadow rounded p-3 m-2">
                                    <p>Contact Us ${company.pricing[2].plan}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <h5>Features</h5>
                            ${generateObjectFeatures(company.features)}
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <h5>Integrations</h5>
                            ${generateObjectIntegrations(company.integrations)}
                            
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="d-grid justify-content-end">
                        <button type="button" class="btn btn-danger position-absolute top-0 end-0">${company.accuracy.score*100}% accuracy</button>
                    </div>
                    <img class="img-thumbnail"
                        src="${company.image_link[0]}"
                        alt="">
                    <div class="card-body text-center">
                        <h6>${company.input_output_examples[0].input}</h6>
                        <p class="card-text">${company.input_output_examples[0].output}</p>
                    </div>
                </div>
    `;
}

const generateObjectFeatures = (features) => {
    // console.log(features);
    let obJectFeature = '';
    for (const property in features) {
        // console.log(property, features[property].feature_name);
        obJectFeature += `<li>${features[property].feature_name}</li>`
    }
    return obJectFeature;
};

const generateObjectIntegrations = (integrations) => {
    // console.log(integrations);
    let obJectFeature = '';
    for (const property in integrations) {
        // console.log(property, integrations[property]);
        obJectFeature += `<li>${integrations[property]}</li>`
    }
    if(obJectFeature.length === 0){
        return "No data Found";
    }
    return obJectFeature;
};

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// const toggleSpinner = isLoading => {
//     const loaderSection = document.getElementById('loader');
//     if(isLoading){
//         loaderSection.classList.remove('d-none')
//         toggleSpinner(false);
//     }
//     else{
//         loaderSection.classList.add('d-none');
//     }
// }

loadAllData();
