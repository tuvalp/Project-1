class Brow {
    // Browser 
    static displayItems(type, genre, myList, sort){
        const main = document.querySelector(".main");
        main.innerHTML = "";
        const brow = document.createElement("div");
        brow.classList = "browser";
        main.appendChild(brow);
        
        if(myList){
            const Items = Sort(Store.getItemsBy("", "", 1), sort);
            if(Items.length > 0){
                Items.forEach((item) => {
                    Brow.Showitem(item);
                }); 
            }else{
                console.log("empty");
                const div = document.createElement("div");
                div.innerText = "Your List is empty!";
                document.querySelector(".main").appendChild(div);
            }

        }else{
            if(type){
                const Items = Sort(Store.getItemsBy(type, "", ""), sort);

                if(genre){
                    Items.forEach((item) => {
                        if(item.genre.includes(genre)){
                            Brow.Showitem(item);
                        }
                    });
                }else{
                    Items.forEach((item) => {
                        Brow.Showitem(item);
                    });
                }
            }else{
                const Items = Sort(Store.getItems(), sort);
                if(genre){
                    Items.forEach((item) => {
                        if(item.genre.includes(genre)){
                            Brow.Showitem(item);
                        }
                    });
                }else{
                    Items.forEach((item) => Brow.Showitem(item));
                }
            }
        }
    }    

    // Item Disply
    static Showitem(item){
        const Browser = document.querySelector(".browser");

        const ItemDiv = document.createElement("div");
        ItemDiv.classList = "itemFront";
        Browser.appendChild(ItemDiv);

        const ItemImg = document.createElement("img");
        ItemImg.id = item.id;
        ItemImg.src = item.frontImg;
        ItemDiv.appendChild(ItemImg);

        // Click Event
        ItemDiv.addEventListener("click", () => {
            TopBar.ShowInTop(item);
            Brow.itemActive();
            //Brow.ItemClick();
        });
    }

    // Item Active
    static itemActive() {
        const items = document.querySelector(".browser").children;
        let x;

        for(x = 0; x < items.length; x++){
            if(items[x].firstChild.id == global_topBarID){
                items[x].firstChild.classList.add("active");
            }else{
                items[x].firstChild.classList.remove("active");
            }
        }
    }

    // Add To MyList
    static AddToMyList(item){
        if(item.myList == 0){
            item.myList = 1;
        }else{
            item.myList = 0;
        }
        Store.editItem(item);
    }
}