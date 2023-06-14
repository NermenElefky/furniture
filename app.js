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
        
        console.log(add_or_subtract)
        // to the next
        if (arr.closest(".right")){
            products_wrapper.scrollLeft += add_or_subtract
            return
        }
        // to the prev 
        products_wrapper.scrollLeft -= add_or_subtract
        
    })
})
