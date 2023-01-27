// api url
const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news',
    params: { count: '20', safeSearch: 'Off', textFormat: 'Raw' },
    headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': 'a76e590590mshadfec3b510c6bb4p1017a7jsnf33837e90ac9',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
};

// Defining async function
function getapi() {
    axios.request(options).then(function (response) {
        console.log(response.data.value);
        show(response.data);
    }).catch(function (error) {
        console.error(error);
    });
};

// Calling that async function
getapi();

// Function to define innerHTML for HTML table
function show(data) {
    let tab = [];
    // Loop to access all rows
    for (let r of data.value) {
        tab += `<div class="card w-25 p-3 " >
                    <div class="card-body">
                    <div class='w-50' style='height:100px'>
                        <img  src='${r.image && r.image.thumbnail.contentUrl}' alt='No-Image' />
                    </div>
                        <h5 class="card-title">${r.name}</h5>
                        <p class="card-text">${r.description}</p>
                    </div>
                    <div >
                        <p onclick="singlePage(${JSON.stringify(r).split('"').join("&quot;")})" class="btn btn-primary">Click to Read more.</p>
                    </div>
                </div>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("news").innerHTML = tab;
}

function singlePage(r) {
    const parsedData = JSON.stringify(r)
    localStorage.setItem("currentItem", parsedData);
    window.location.href = '/single-news.html';

}