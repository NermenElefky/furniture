// let's do some effects ehen clicking on search icon
const searchBtn = document.querySelector(".search")
const searchInput = document.querySelector(".search input");
const searchSpanEffect = document.querySelector(".search span")
const searchIcon = document.querySelector(".search i")

searchBtn.addEventListener("click",()=>{
    if (searchInput.style.width == 0 + "px"){
        searchInput.style.width = 140 + "px"
        searchInput.focus() //set the input filed focus auto
        searchInput.style.paddingLeft = 11 + "px";
        searchSpanEffect.style.width = 0
        
        // set the icon color dynmaic
        searchIcon.style.color = window.getComputedStyle(document.body).getPropertyValue("--main-color")
    }
    else{
        searchInput.style.width = 0 
        searchInput.style.paddingLeft = 0;
        searchSpanEffect.style.width = 100 + "%"
        searchIcon.style.color = "#fff"
    }
})

// make our slider auto
const wrapper = document.querySelector(".wrapper")
const sliders = Array.from(document.querySelectorAll(".wrapper > div"))
const slider_number = document.querySelector(".slidernumber");
const slider_change_time = 8000
let prev_clicked = false

const auto_slider = ()=>{

    // find the active slider and define the next to display then remove active class from it
    function remove_add (e){
        if(prev_clicked) {
            e.previousElementSibling == null ?wrapper.lastElementChild.classList.add("active") : 
            e.previousElementSibling.classList.add("active")     
        }
       else{
            e.nextElementSibling == null ?wrapper.firstElementChild.classList.add("active") :
            e.nextElementSibling.classList.add("active")
       }
       e.classList.remove("active")
    }

    // add class active to the next slide
    remove_add(wrapper.querySelector(".active"))    

    // change the slider number
    slider_number.innerText = wrapper.querySelector(".active").getAttribute("data-slider-number")

}

// call the func every 8000 ms
let slider_interval = setInterval(auto_slider , slider_change_time)

// next and prev buttons
const next = document.querySelector(".next")
const previous = document.querySelector(".prev")

// if next clicked
next.addEventListener("click",()=>{
    clearInterval(slider_interval) // to make the slider take the full time
    auto_slider()
    // we can't use setintervai directly without previous invoke of function 
    // becuase this function needs to take 7000 to make the change and we want it immedaitly
    slider_interval = setInterval(auto_slider , slider_change_time)
})

// if previous clicked  
previous.addEventListener("click",()=>{
    clearInterval(slider_interval)
    prev_clicked = true;
    auto_slider()
    prev_clicked = false
    slider_interval = setInterval(auto_slider , slider_change_time)
})

// change the main image apparence in second slider
const main_image_second_slider = document.querySelector(".second-slider-main-image")

wrapper.querySelector(".second_furn_slide").addEventListener("click",(e)=>{
     if (e.target.closest(".color") != null ){
            let main_img_src = e.target.tagName == "IMG" ? 
            e.target.getAttribute("src") : 
            e.target.firstElementChild.getAttribute("src")

            // now set the main image source
            main_image_second_slider.setAttribute("src" , main_img_src)
     }
})

// make love cation
const love_icons = document.querySelectorAll(".love i");

love_icons.forEach((icon)=>{
    icon.addEventListener("click",()=>{
            icon.classList.toggle("fa-solid")
            icon.classList.toggle("fa-regular")

    })
})

// make best seller section
const slider_header = document.querySelectorAll(".products_header li")
const slider_header_parent = document.querySelector(".products_header ul")
const products  = document.querySelectorAll(".best-one")

slider_header.forEach((header)=>{
    header.addEventListener("click",()=>{
        
        // remove active class
        slider_header_parent.querySelector(".productActive").classList.remove("productActive")
        
        // now add it ti the clicked one
        header.classList.add("productActive")
        
        // get the special data type to help in display products
        let special_class = header.getAttribute("data-type")
        
        // remove class show
        products.forEach((pro)=>{
            if (pro.classList.contains(special_class)){
                pro.classList.add("show")
                pro.classList.remove("hide")
                return
            }
                pro.classList.remove("show")
                pro.classList.add("hide")
        })
    })
})


// set the height of best_seller section because it has an absolute child
const products_displayer = document.querySelector(".products_displayer");
const products_displayer_ele = document.querySelector(".products_displayer_container");


// now let's set the height 
products_displayer.style.height = products_displayer_ele.getBoundingClientRect().height + "px"; 
window.onresize = ()=>{

    products_displayer.style.height = products_displayer_ele.getBoundingClientRect().height + "px"; 
}

// now add typed js to the birth section

var typed2 = new Typed('#changable-text', {
    strings: ['<strong>Sofas</strong>', '<strong>Chairs</strong>', '<strong>Rooms</strong>','<strong>Kids Furniture</strong>' , '<Strong>Tables</strong>'],
    typeSpeed: 10,
    backSpeed: 2,
    fadeOut: true,
    loop: true
  });


//   new products section slider
const products_wrapper = document.querySelector(".products-n-wrapper");
const control_arrs = document.querySelectorAll("span.control");
const products_child = document.querySelector(".products-new-slide");


control_arrs.forEach((arr)=>{
    arr.addEventListener("click",()=>{
        
        // get the margin right of the new product to add it when scrolling
        let product_margin = window.getComputedStyle(products_child).marginRight
        let product_mar_left = window.getComputedStyle(products_child).marginLeft;
        // the number to add or subtract of the scrolling
        let add_or_subtract = +product_margin.split("p")[0] + +product_mar_left.split("p")[0] + products_child.getBoundingClientRect().width;
        

        // to the next
        if (arr.closest(".right")){
            products_wrapper.scrollLeft += add_or_subtract
            return
        }
        // to the prev 
        products_wrapper.scrollLeft -= add_or_subtract
        
    })
})

// make the counter on events section
const events = document.querySelector(".events")
let enter_section_times = false

const counter = {
    days : 12,
    hours : 6 ,
    minutes : 44 , 
    seconds : 50
}

const counter_f = (ele , t)=>{
    let s = setInterval(() => {
        ele.innerText++
        if (Number(ele.innerText) == t){
            clearInterval(s)
        }
    }, (700 / t));
}

window.onscroll = ()=>{
    if (window.scrollY >= (events.offsetTop - (.9*events.offsetHeight))){
            // let's make the counter :)

           if (!enter_section_times){
            for (let [time_name , time_value] of Object.entries(counter)){
                counter_f(document.querySelector(`.${time_name} .number span`) , time_value)
               }
            enter_section_times = true
           }

    }
}

// start testmonails section
let next_prev = document.querySelectorAll(".change");
        let testmonails = Array.from(document.querySelectorAll(".testmonail"));
        next_prev.forEach((btn)=>{
            btn.addEventListener("click",()=>{
                // add to all testimonails class testmonail-hidden
                testmonails.forEach((testi)=>{
                        testi.classList.add("testmonail-hidden");
                    })
                btn.closest(".right") ?  testmonails.push(testmonails.shift()) : testmonails.unshift(testmonails.pop()); 
                testmonails[0].classList.remove("testmonail-hidden");
            })
        })

// make the user icon working
const user_icon = document.querySelector(".user_account");
const user_chooces = user_icon.querySelector("ul")


// let's add products to card 
const add_to_card_btns = document.querySelectorAll(".addtocart");
const cart = document.querySelector(".boughts-info")
const checkoutBtn = document.querySelector(".checkout")

add_to_card_btns.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        // get the image (the element which can get the src , heading and price)
        let pro = btn.parentElement.previousElementSibling.firstElementChild

        // get the image src
        let product_image = pro.getAttribute("src")

        // get the product name
        let product_name = pro.getAttribute("data-product-name")

        // get the product price
        let product_price = pro.getAttribute("data-product-price")

        let product = `
        <div class = "cart-product show">
        <div class = "p">
        <img src = "${product_image}">
        <div class = "text">
        <p>${product_name} <br><i class="fa-solid fa-dollar-sign"></i><span class = "product-price">${product_price}</span> x <span class = "product-number">1</span> <span class = "total"><i class="fa-solid fa-dollar-sign"></i>${product_price}</span></p>
        <div class="number">
            <button class = "minus">
                <i class="fa-solid fa-minus minus"></i>
            </button>
            <p class = "counter-number">1</p>
            <button  class = "plus">
                <i class="fa-solid fa-plus plus"></i>
            </button>
          </div>
        </div>
        <button class ="dlt"><i class="fa-solid fa-trash dlt"></i></button>
        </div>
        </div>`

        // now add to cart\
        if (cart.lastElementChild.classList.contains("empty")){
                cart.innerHTML =`<p class = "c">Cart</p>` + product
            }
            else {
                cart.innerHTML+=product
            }
            checkoutBtn.style.display = "block"    
        // make a point to alert user to the new action
            let cart_notification = document.querySelector(".user-alert")
            cart_notification.style.display = "block";

        // now scroll to top
        window.scrollTo({top : 0 , behavior : "smooth"})
        })


})
// minus function to decrease 
document.body.addEventListener("click",(e)=>{
    if (e.target.classList.contains("minus") || e.target.classList.contains("plus") ){
       
        let product_info = e.target.closest(".text")
        let prod_price = product_info.querySelector(".product-price")
        let prod_number = product_info.querySelector(".product-number")
        let total = product_info.querySelector(".total")
        let counter = product_info.querySelector(".counter-number")

        // we will change this number
        let prod_number_after_action = Number(prod_number.innerText)
        
        // increase or decrease the prod number
        if (e.target.classList.contains("minus") ){
                if (prod_number_after_action != 1){
                    prod_number_after_action -=1
                }
        } 
        else {
            prod_number_after_action+=1
        }

        // now implement the changes 
        prod_number.innerText = prod_number_after_action
        counter.innerText = prod_number_after_action
        total.innerHTML = `<i class="fa-solid fa-dollar-sign"></i>${(prod_number_after_action * prod_price.innerText).toFixed(2)}`
    }
    if (e.target.classList.contains("dlt")){
            e.target.closest(".cart-product").classList.add("hide")
            e.target.closest(".cart-product").classList.remove("show")
           
            let prodcuts_number_in_cart = cart.querySelectorAll(".cart-product.show").length
            if (prodcuts_number_in_cart == 0){
                checkoutBtn.style.display = "none"
                cart.innerHTML = `
                <p class = "c">Cart</p>
                <p class = "empty">Your cart is empty</p>
                `
            }
    }
})

// open the cart when clicking on the icon 
const cart_icon = document.querySelector(".shopping")
const cart_parent = document.querySelector(".user_boughts")


// make header icons working
document.body.addEventListener("click",(e)=>{
    // make shopping icon work
    if (cart_parent.style.display == "none" && e.target.classList.contains("shopping-icon")){
            cart_parent.style.display = "block"
            document.querySelector(".user-alert").style.display = "none"
    }
    else if(cart_parent.style.display == "block")  {
            if (e.target.classList.contains("shopping-icon") || !e.target.closest(".shopping")){
                cart_parent.style.display = "none"
            }
    }
    // make user account icon working 
    if (e.target.classList.contains("user-account-icon") && user_chooces.style.display == "none" ){
        user_chooces.style.display = "block"      
    }
    else if (user_chooces.style.display == "block"){
        if (e.target.classList.contains("user-account-icon") || !e.target.closest(".user_account")){
            user_chooces.style.display = "none"
        }
    }
    // make the hamburger icon work 
    if (e.target.classList.contains("ham") && action_menu.style.display == "none"){
        action_menu.style.display = "block"
    }
    else if (action_menu.style.display == "block"){
        if (e.target.classList.contains("ham") || !e.target.closest(".hamburger") ){
            action_menu.style.display = "none"
        }
    }
})

// hamburger icon menu
const hamburger = document.querySelector(".hamburger")
const action_menu = document.querySelector(".nested-links")

hamburger.addEventListener("click",()=>{
    hamburger.querySelectorAll("span").forEach((span)=>{
        span.classList.toggle("hoverd")
    })
})
