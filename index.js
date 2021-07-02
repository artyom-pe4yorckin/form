window.addEventListener("load", ready);
function ready() {
    //range
    let svgRange = document.querySelector("#js .range svg");
    let range = document.querySelector("#js .range");
    let pointer = document.querySelector("#js .pointer");
    let cntOfPoint = 4;
    let pointStep = 100/(cntOfPoint-1);
    let clipPath = document.querySelector("#myClip rect");
    let currentPoint = 3;//[0;3]
    range.addEventListener("mousedown", down);
    function down(e) {
        e.preventDefault();
        this.addEventListener("mousemove", move);
        this.addEventListener("mouseup", up);
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
            /*
            разделить диапазон на 4 части [0;3]
            перевести их в %
            получить позицию отпускания мыши
            перевести её в %
            получить ближайшую точку
            примагнитить к ближайшей точке
            */
            let end = ((e.clientX - this.getBoundingClientRect().left)/rangeWidth)*100;//% от края [0;100]
            currentPoint = Math.round(end/pointStep);
            let translate = currentPoint*(pointStep/100)*rangeWidth;//точка к котрой магнититься * шаг в % * ширина
            pointer.style.transform = "translatex("+(translate-15)+"px)";
            clipPath.setAttribute("width", (translate))
            this.removeEventListener("mousemove", move);
            this.removeEventListener("mouseup", up);
        }
    }
    clipPath.setAttribute("width", (range.getBoundingClientRect().width))
    pointer.style.transform = "translatex("+(range.getBoundingClientRect().width-15)+"px)";

    window.addEventListener("resize", function(){
        let rangeWidth = range.getBoundingClientRect().width;
        let translate = currentPoint*(pointStep/100)*rangeWidth;
        pointer.style.transform = "translatex("+(translate-15)+"px)";
        svgRange.setAttribute("width", rangeWidth);
        //clipPath.setAttribute("width", (translate))
    })

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
        this.querySelector(".options").classList.toggle("active");
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
