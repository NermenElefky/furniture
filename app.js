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
let i = 1;
let n =1;
const add_active_class = function (){
    // now add the active class to the active slide
    bullets.querySelector(".active-slide").classList.remove("active-slide")
    bullets.querySelector(`[data-slide-number = "${i}"]`).classList.add("active-slide")
}

const sliderShow = function (){
        let translatedValue = (n-1)*(sliderWidth + 55)
        wrapper.style.transform = `translateX(-${translatedValue}px)`
        i= n
        n == sliderNumber ? n =1 : n++
        add_active_class()
        setTimeout(sliderShow , 7000)
}
sliderShow();
// make slide go to next or prev slide

let prev_x , active_slider_number , isDrag = false , to_next = false , to_prev = false;
const strat_drag = function(e){
     isDrag = true // just to control mosuemove only work when start dragging
     prev_x = e.pageX || e.touches[0].pageX
    }

const prev_next_slide = function(e){
        if (!isDrag) {return}
        let current_x = e.pageX || e.touches[0].pageX
        // check if the user wants the next or prev slider
        if (prev_x > current_x){
                to_next = true;
                
        }
        else{
            to_prev = true
            
        }
    }      

const stop_drag = function (){
    if (to_next){
            if (i == sliderNumber){
                wrapper.style.transform +=0
            }
            else{
                // to the next
            let translatedValue = (sliderWidth + 55)
            wrapper.style.transform += `translateX(-${translatedValue}px)`
            i++;
            add_active_class()
        }
    }
    if (to_prev){
        if (i == 1){
            wrapper.style.transform = `translateX(0px)`
        }
        else{
            let translatedValue = (sliderWidth + 55)
            wrapper.style.transform += `translateX(${translatedValue}px)`
            i--
            add_active_class()
        }
    }
    to_next = false
    isDrag = false
    to_prev = false
    console.log("now i is "+i)
}
wrapper.addEventListener("mousedown",strat_drag)
wrapper.addEventListener("touchstart",strat_drag)

wrapper.addEventListener("mousemove",prev_next_slide)
wrapper.addEventListener("touchmove",prev_next_slide)

wrapper.addEventListener("mouseup",stop_drag)
wrapper.addEventListener("touchend",stop_drag)
