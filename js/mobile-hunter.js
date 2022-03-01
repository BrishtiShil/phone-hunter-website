const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}
const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    data?.forEach(data => {
        // console.log(data);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 text-center mx-auto">
            <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
               <h3 class="card-title">${data.phone_name}</h3>
               <h5 class="card-title">${data.brand}</h5>
               <button onclick="loadDataDetail('${data.slug}')">Details</button>
             </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadDataDetail = phoneId => {
    // console.log(slug);
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
}