const loadCategoryData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();

    // tab container 
    const categoryData = data.data;
    categoryData.forEach((category) => {
        const categoryContainer = document.getElementById('category-container');
        const categoryName = category.category;
        // categoryContainer.classList.add('');
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="cardsData(${category.category_id})" class="tab btn btn-sm text-xs px-5 pt-3 pb-7">${categoryName}</button>
        `
        categoryContainer.appendChild(div);
    })
}



// card section 
const cardsData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    if (data.data.length > 0) {
        data.data.forEach((cardData) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card card-compact bg-base-100 shadow-xl">
                <figure><img class="h-52 w-full" src="${cardData.thumbnail}" alt="Shoes" /></figure>
                <div class="card-body flex flex-row gap-3">
                    <div>
                        <img class="w-10 h-10 rounded-full" src="${cardData.authors[0].profile_picture}" alt="">
                    </div>
                    <div>
                        <h2 class="text-base font-bold">${cardData.title}</h2>
                        <div class="flex gap-3 items-center my-2">
                            <span>${cardData.authors[0].profile_name}</span>
                            <img class="w-4 h-4" src="${cardData.authors[0].verified ? 'image/verity.png' : ''}" alt="">
                        </div>
                        <p>${cardData.others.views} views</p>
                    </div>
                </div>
            </div>
        `
            cardContainer.appendChild(div);
        }

        )
    }
    else {
        const emptyTab = document.getElementById('empty-tab');
        const div = document.createElement('div');
        emptyTab.innerHTML = '';
        div.innerHTML = `
        <div class="max-w-xl mx-auto my-auto mt-16">
             <img class="mx-auto" src="image/Icon.png" alt="">
             <h1 class="text-3xl font-bold pt-10">Oops!! Sorry, There is no content here</h1>
        </div>
        `
        emptyTab.appendChild(div)
    }
}


loadCategoryData()
cardsData('1000')