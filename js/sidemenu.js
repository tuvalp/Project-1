class sideMenu {
    static open(){
        document.querySelector(".sideMenu-hide").style.display = "block";
        document.querySelector(".sideMenu").style.width = "240px";
        document.querySelector(".sideMenu-more").style.display = "block";
        document.querySelector(".sideMenu-user").style.display = "block";
    }

    static close(){
        document.querySelector(".sideMenu-hide").style.display = "none";
        document.querySelector(".sideMenu-more").style.display = "none";
        document.querySelector(".sideMenu-user").style.display = "none";
        document.querySelector(".sideMenu").style.width = "65px";
    }

    // Check Active Buttons
    static activeButton() {
        const buttons = document.querySelector(".sideMenu-buttons").children;
        let x;
        for(x = 0; x < buttons.length; x++){
            if(buttons[x].id == global_root){
                buttons[x].classList.add("active");
            }else{
                buttons[x].classList.remove("active");
            }
        }
    } 
}


// ## Event ##
// SideMenu Open
document.querySelector(".sideMenu").addEventListener('mouseenter', (e) => {sideMenu.open();});
// SideMenu close
document.querySelector(".sideMenu").addEventListener('mouseleave', (e) => {sideMenu.close();});

// Button click
document.querySelector(".sideMenu-buttons").addEventListener("click", (elemnt) => {
    if(global_roots.includes(elemnt.target.id)){
        global_root = elemnt.target.id;
    }else if(global_roots.includes(elemnt.target.parentElement.id)){
        global_root = elemnt.target.parentElement.id;
    }

    sideMenu.activeButton();
    sideMenu.close();
    Roots.change();
});