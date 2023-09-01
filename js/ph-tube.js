const loadCategoryData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();

    // tab container 
    const categoryData = data.data;
    categoryData.forEach((category) => {
        const categoryContainer = document.getElementById('category-container');
        const categoryName = category.category;
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="cardsData(${category.category_id})" class="tab btn btn-sm text-xs px-5 pt-3 pb-7">${categoryName}</button>
        `
        categoryContainer.appendChild(div);
    })
}


// card data load 
const cardsData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    datas = data;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    const errorMessage = document.getElementById('no-data-error-message');
    if (data.data.length === 0) {
        errorMessage.classList.remove('hidden');
    }
    else {
        errorMessage.classList.add('hidden');
    }


    // timer section 
    data.data.forEach((cardData) => {
        const convertSec = (sec) => {
            const hrs = Math.floor(sec / 3600);
            const min = Math.floor((sec % 3600) / 60);
            return { hrs, min };
        }
        const timerData = cardData.others.posted_date;
        const { hrs, min } = convertSec(timerData);
        console.log(hrs, min);


        // card section 
        const div = document.createElement('div');
        const verifyImg = `<img class="w-4 h-4" src="image/verify.png" alt=""></img>`
        div.innerHTML = `
            <div class="card card-compact bg-base-100 shadow-xl relative">
            <figure><img class="h-52 w-full" src="${cardData.thumbnail}" alt="Shoes" /></figure>
            <div>
                <p id="timer" class='absolute bottom-32 right-2 px-2 py-1 rounded-sm bg-black text-white text-sm '>${hrs === 0 ? '' : hrs}${hrs === 0 ? '' : 'hrs '}${min === 0 ? '' : min}${min === 0 ? '' : 'min '}${hrs === 0 ? '' : ' ago'}</p>
            </div>
            <div class="card-body flex flex-row gap-3">
                <div>
                    <img class="w-10 h-10 rounded-full" src="${cardData.authors[0].profile_picture}" alt="">
                </div>
                <div>
                    <h2 class="text-base font-bold">${cardData.title}</h2>
                    <div class="flex gap-3 items-center my-2">
                        <span>${cardData.authors[0].profile_name}</span>
                        <p> ${cardData.authors[0].verified === true ? verifyImg : ''} </p>
                    </div>
                    <p id="views">${cardData.others.views} views</p>
                </div>
            </div>
        </div>
    `
        cardContainer.appendChild(div);
    }

    )
}


// sort by view section 
const sortByView = () => {
    const cardContainer = document.getElementById('card-container');
    const cardData = Array.from(cardContainer.children);
    const cardDataSort = cardData.sort((card1, card2) => {
        const viewCount1 = card1.querySelector('#views').innerText.split('K', 1);
        const viewCount2 = card2.querySelector('#views').innerText.split('K', 1);

        const viewCount1Int = parseInt(viewCount1);
        const viewCount2Int = parseInt(viewCount2);
        console.log(viewCount1Int);
        console.log(viewCount2Int);

        return viewCount2 - viewCount1;
    })
    cardContainer.innerHTML = '';

    cardDataSort.forEach(card => {
        cardContainer.appendChild(card);
    })
}




loadCategoryData()
cardsData('1000')