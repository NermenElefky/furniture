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
