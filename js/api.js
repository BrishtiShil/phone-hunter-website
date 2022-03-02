const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data...
    searchField.value = '';
    // load Data...
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}

// display mobile result....
const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (data.length == 0) {
        searchResult.textContent = "show no result found";
    }
    const first20Data = data.slice(0, 20);
    first20Data.forEach(data => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 text-center mx-auto">
        <div>
            <img class="w-50" src="${data.image}"  alt="">
            </div>
            <div class="card-body">
               <h3>Name: ${data.phone_name}</h3>
               <h5>Brand: ${data.brand}</h5>
               <button onclick="loadMobileDetail('${data.slug}')" class="btn btn-success">Details</button>
             </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadMobileDetail = (id) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMobileDetails(data.data));
};
// display mobile details....
const displayMobileDetails = (info) => {
    const mobileDetails = document.getElementById('mobile-details');
    mobileDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${info.image}" class="modal-img-top" alt="...">
                <div class="modal-body ">
                    <h3 class="fw-bold">Name: ${info.name}</h3>
                    <h5 class="fw-light">ReleaseDate: ${info.releaseDate ? info.releaseDate : 'no release date found'}</h5> 
                    <h5>MainFeatures: </h5>
                    <h6>Storage: <span class="fw-light">${info.mainFeatures.storage}</span></h6>
                    <h6>DisplaySize: <span class="fw-light">${info.mainFeatures.displaySize}</span></h6>
                    <h6>Memory: <span class="fw-light">${info.mainFeatures.memory}</span></h6>
                    <h6>ChipSet: <span class="fw-light">${info.mainFeatures.chipSet}</span></h6>
                    <h5>Sensors: <span class="fw-light">${info.mainFeatures.sensors}</span></h5>
                    <h5>Others: </h5>
                    <h6>Bluetooth: <span class="fw-light">${info.others.Bluetooth}</span></h6>
                    <h6>WLAN: <span class="fw-light">${info.others.WLAN}</span></h6>
                    <h6>GPS: <span class="fw-light">${info.others.GPS}</span></h6>
                </div>
        `;
    mobileDetails.appendChild(div);
}