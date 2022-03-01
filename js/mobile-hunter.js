const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}
const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (data.length == 0) {
        searchResult.textContent = "show no result found";
    }
    data.forEach(data => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 text-center mx-auto">
            <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
               <h3 class="card-title">${data.phone_name}</h3>
               <h5 class="card-title">${data.brand}</h5>
               <button onclick="loadMobileDetail('${data.slug}')">Details</button>
             </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadMobileDetail = phoneId => {
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMobileDetails(data));
}
const displayMobileDetails = data => {
    console.log(data);
    const mobileDetails = document.getElementById('mobile-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">${data.phone_name}</h3>
                <h4 class="card-title">${data.releaseDate}</h4>                <h4class="card-title">${data.mainFeatures[storage.chipSet.memory.displaySize]}</h4>
                <a href="" class="btn btn-primary">Go somewhere</a>
            </div>
    `;
    mobileDetails.appendChild(div);
}