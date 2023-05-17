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
// let's make our slider in the landing page
const wrapper = document.querySelector(".wrapper")
let sliderWidth = document.querySelector(".firt-furniture-slide").clientWidth // this width will be changlable when making it responsive
let bullets = document.querySelector(".bullets")
let sliderNumber = 3
let i = 3;

// make slider work auto
const sliderShow = function(){
    let translatedValue = (sliderNumber - i)*(sliderWidth + 55)
    wrapper.style.transform = `translateX(-${translatedValue}px)`
    // remove the active class
    bullets.querySelector(".active-slide").classList.remove("active-slide")
    // now add it 
    bullets.querySelector(`[data-slide-number = "${i}"]`).classList.add("active-slide")
    i > 1 ? i-- : i=3 // to make the slider return to the first slide again
    setTimeout(sliderShow , 7000)
}
sliderShow();

// make slide go to next or prev slide

let prev_x , active_slider_number , isDrag = false;
const strat_drag = function(e){
     isDrag = true // just to control mosuemove only work when start dragging
     prev_x = e.pageX || e.touches[0].pageX
     active_slider_number = bullets.querySelector(".active-slide").getAttribute("data-slide-number")
}

const prev_next_slide = function(e){
        if (!isDrag) {return}
        let current_x = e.pageX || e.touches[0].pageX
        // check if the user wants the next or prev slider
        if (prev_x > current_x){

            if (active_slider_number == 1){
                wrapper.style.transform = `translateX(0px)`
            }
            else{
                let translatedValue = (active_slider_number)*(sliderWidth + 55)
            wrapper.style.transform = `translateX(-${translatedValue}px)`
            }
        }
        else{
            if (active_slider_number  == sliderNumber){
                let translatedValue = (active_slider_number-1)*(sliderWidth + 55)
                wrapper.style.transform = `translateX(-${translatedValue}px)`
            }
            else{
                let translatedValue = (active_slider_number-(sliderNumber-2))*(sliderWidth + 55)
                wrapper.style.transform = `translateX(-${translatedValue}px)`
            }
        }
} 

const stop_drag = function (){
    isDrag = false;
}
wrapper.addEventListener("mousedown",strat_drag)
wrapper.addEventListener("touchstart",strat_drag)

wrapper.addEventListener("mousemove",prev_next_slide)
wrapper.addEventListener("touchmove",prev_next_slide)

wrapper.addEventListener("mouseup",stop_drag)
wrapper.addEventListener("touchend",stop_drag)
