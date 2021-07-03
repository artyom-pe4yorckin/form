window.addEventListener("load", ready);
function ready() {
    //якоря
    if(window.location.hash!=""){
        let items = document.querySelectorAll(".menu-item a[href='"+window.location.hash+"']");
        for(let i=0; i<items.length; i++){
            items[i].closest(".menu-item").classList.add("active");
        }
    }
    let menuitems = document.querySelectorAll(".menu-item");
    for(let m=0; m<menuitems.length; m++){
        menuitems[m].addEventListener("click", checkAncor);
    }
    function checkAncor(){
        let activeitems = this.closest("header").querySelectorAll(".menu-item.active");
        for(let i=0; i<activeitems.length; i++){
            activeitems[i].classList.remove("active");
        }
        this.classList.add("active");
    }

    //range
    let svgRange = document.querySelector("#js .range svg");
    let range = document.querySelector("#js .range");
    let pointer = document.querySelector("#js .pointer");
    let cntOfPoint = 4;
    let pointStep = 100/(cntOfPoint-1);
    let clipPath = document.querySelector("#myClip rect");
    let currentPoint = 3;//[0;3]
    range.addEventListener("pointerdown", down);
    function down(e) {
        e.preventDefault();
        this.addEventListener("pointermove", move);
        this.addEventListener("pointerup", up);
        let start = e.clientX;
        let translate = start - this.getBoundingClientRect().left;
        let rangeWidth = this.getBoundingClientRect().width;
        pointer.style.transform = "translatex("+translate+"px)";
        function move(e) {
            let start = e.clientX;
            let translate = start - this.getBoundingClientRect().left>rangeWidth ? rangeWidth : start - this.getBoundingClientRect().left;
            pointer.style.transform = "translatex("+(translate+15)+"px)";
            clipPath.setAttribute("width", (translate+30))
        }
        function up(e) {
            let end = ((e.clientX - this.getBoundingClientRect().left)/rangeWidth)*100;//% от края [0;100]
            currentPoint = Math.round(end/pointStep);
            let translate = currentPoint*(pointStep/100)*rangeWidth;//точка к котрой магнититься * шаг в % * ширина
            pointer.style.transform = "translatex("+(translate-15)+"px)";
            clipPath.setAttribute("width", (translate))
            this.removeEventListener("pointermove", move);
            this.removeEventListener("pointerup", up);
        }
    }
    

    function setRangeParam(){
        let viewBox = svgRange.getAttribute("viewBox").split(" ").map(function(v){
            return +v
        });
        let rangeWidth = svgRange.getBoundingClientRect().width;
        let translate = currentPoint*(pointStep/100)*rangeWidth;
        viewBox[2] = svgRange.getBoundingClientRect().width;
        pointer.style.transform = "translatex("+(translate-15)+"px)";
        svgRange.setAttribute("viewBox", viewBox.join(" "));
        clipPath.setAttribute("width", currentPoint*(pointStep/100)*svgRange.getBoundingClientRect().width)
    }
    setRangeParam();

    window.addEventListener("resize", setRangeParam)

    //мобильное меню
    let burger = document.querySelector("#mobile-menu .burger");
    let burgerMenu = document.querySelector("#mobile-menu .burger-menu");
    burger.onclick = function(){
        burgerMenu.classList.toggle("active");
        burger.classList.toggle("close");
    }

    //Селект
    let selects = document.querySelectorAll(".select");
    for(let s=0;s<selects.length;s++){
        selects[s].addEventListener("click", showOptions);
        let options = selects[s].querySelectorAll(".options>*");
        for(let p=0;p<options.length;p++){
            options[p].addEventListener("click", changeVal);
        }
    }
    function showOptions(){
        this.classList.toggle("active");
    }
    function changeVal(){
        this.closest(".select").querySelector("input").value = this.value;
    }

    //плейсхолдеры
    let inputWrapper = document.querySelectorAll(".input");
    let inputs = document.querySelectorAll(".input input");
    for(let i=0;i<inputWrapper.length;i++){
        inputWrapper[i].addEventListener("click", minimizePlaceholder);
    }
    for(let i=0;i<inputs.length;i++){
        inputs[i].addEventListener("blur", checkVal);
    }
    function minimizePlaceholder(){
        this.classList.add("min");
    }
    function checkVal(){
        if(this.value==""){
            this.closest(".input").classList.remove("min");
        }
    }
}
