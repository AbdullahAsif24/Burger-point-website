let burgers = [
    {
        title: "Cheeseburger",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTO5g4_FN_KoL0qx56J07iARVlpKJ6OapBzBcrCws0Dve9F6UFQn1KBKSMYbC6Q",
        price: '$10',
        id: 867217468908575
    },
    {
        title: "Bacon Cheeseburger",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmSVqMnTcii4jXR9jkIzZTzltc7c-hStMxB6ITC69Dgy_AsTGG1Y5OU2kU12xQ",
        price: '$12',
        id: 591925351136361
    },
    {
        title: "Double Cheeseburger",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHSb5l4JfEy2KlYZuNtbbWykPfZ20B8WM-pkPbgHh_akpS-Tc8i90kqc_THtBO",
        price: '$14',
        id: 5925123123136361
    },
    {
        title: "Big Mac",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQAKABFwi8vpL7yShw9IEmua23UELnxVYQDQQ1wHiuNdsODeQNfs3ejOZW84mf8",
        price: '$6',
        id: 20711797653054
    },
    {
        title: "Whopper",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ9OmZoqg8k1y9NRAXvHrSM158TYM7Fv1xGNPPuG2SpfMnukLVRmESTFzhaajeV",
        price: '$7',
        id: 20711754323054
    }
]

let cardContainer = document.querySelectorAll('.card-container')[0]
cardContainer.innerHTML = ''

for (let i = 0; i < burgers.length; i++) {
    let burger = burgers[i]

    let product = `
    <div
    class='card md:w-[28%] w-[100%] py-3 px-2'>
    <div class='w-full max-w-md  mx-auto bg-white rounded-3xl shadow-xl overflow-hidden'>
        <div class='max-w-md mx-auto'>
            <div class='h-[200px]'
                style='background-image:url(${burger.image});background-size:cover;background-position:center'>
            </div>
            <div class='p-4 sm:p-6'>
                <p class='font-bold text-gray-700 text-[22px] leading-7 mb-1'>${burger.title}</p>
                <p class='text-[17px] font-bold text-[#0FB478]'>${burger.price}</p>


                <a onclick = addToCart(${i})
                    class='block text-white mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-indigo-600 rounded-[14px] hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'>
                    Add to cart
                </a>
            </div>
        </div>
    </div>

    `

    cardContainer.innerHTML += product


}


let cart = {}
function addToCart(index) {
    let { id } = burgers[index]

    if (id in cart) {
        console.log('match found');
        cart[id].qty++
        cart[id].totalPrice = cart[id].price.slice(1) * cart[id].qty;
    }else {
        let item = {...burgers[index]}
        item.qty = 1;
        item.totalPrice = item.price.slice(1);
        cart[id] = item;
    }
    
    printCart()
}


function printCart() {

    let cartContainer = document.querySelectorAll('.cart')[0] 
    cartContainer.innerHTML = `
    <div class="flex items-center justify-between pb-8 border-b border-gray-300">
                    <h2 class="font-manrope font-bold text-3xl leading-10 text-black">Food Cart</h2>
                    <h2 class="font-manrope font-bold text-xl leading-8 text-gray-600">${Object.keys(cart).length} Items</h2>
                </div>
                <div class="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                    <div class="col-span-12 md:col-span-7">
                        <p class="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                    </div>
                    <div class="col-span-12 md:col-span-5">
                        <div class="grid grid-cols-5">
                            <div class="col-span-3">
                                <p class="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                            </div>
                            <div class="col-span-2">
                                <p class="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                            </div>
                        </div>
                    </div>
                </div>
    `


    for (const key in cart) {
        
        let cartProduct =  `
        <div
                    class="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
                    <div class="w-full md:max-w-[126px]">
                        <img src="${cart[key].image}" alt="perfume bottle image"
                            class="mx-auto">
                    </div>
                     <div class="grid grid-cols-1 md:grid-cols-4 w-full">   <!-- main-card -->
                        <div class="md:col-span-2">
                            <div class="flex flex-col max-[500px]:items-center gap-3">
                                <h6 class="font-semibold text-base leading-7 text-black">${cart[key].title}</h6>
                                <h6
                                    class="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                                    ${cart[key].price}</h6>
                            </div>
                        </div>
                        <div class="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                            <div class="flex items-center h-full">
                                <button onclick = minusItem(${key})
                                    class="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                    <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                        xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                        fill="none">
                                        <path d="M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round" />
                                        <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                            stroke-linecap="round" />
                                        <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                            stroke-linecap="round" />
                                    </svg>
                                </button>
                                <input type="text"
                                    class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                                    placeholder="${cart[key].qty}">
                                <button onclick = addItem(${key})
                                    class="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                    <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                        xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                        fill="none">
                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6"
                                            stroke-linecap="round" />
                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                            stroke-width="1.6" stroke-linecap="round" />
                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                            stroke-width="1.6" stroke-linecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                            <p
                                class="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                                $${cart[key].totalPrice}</p>
                        </div>
                    </div>
                </div>
        `
    
        cartContainer.innerHTML += cartProduct;
    }

}

function addItem(key){
    cart[key].qty++
    cart[key].totalPrice = cart[key].price.slice(1) * cart[key].qty;
    printCart()
}

function minusItem(key){
    if (cart[key].qty > 1) {
        cart[key].qty--
        cart[key].totalPrice = cart[key].price.slice(1) * cart[key].qty;
    }else if (cart[key].qty <= 1) {
        delete cart[key]
    }

    printCart()
}
