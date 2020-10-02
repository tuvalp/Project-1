class Search {
    static open(value){
        // Show Model
        Model.open();
        const model = document.querySelector(".model");

        // Cloce Button
        const close = document.createElement("span");
        close.classList = "close";
        close.innerText = "X";
        model.appendChild(close);

        const search = document.createElement("div");
        search.classList = "search";

        const search_input = document.createElement("input");
        search_input.classList = "search-input";
        if(value){
            search_input.value = value;
        }else {
            search_input.value = "Search...";
        }
        search.appendChild(search_input);

        const result = document.createElement("div");
        result.classList = "result";
        search.appendChild(result);

        model.appendChild(search);

        // ## Event ##
        // Clear input
        search_input.addEventListener("click", () => {search_input.value = "";});

        // Filter result

        function showResult() {
            const Items = Store.getItems();
            result.innerHTML = "";

            Items.forEach((item) => {
                const item_title = item.title.toUpperCase();
                const search_value = search_input.value.toUpperCase();
                
                if(search_value != ''){
                    if(item_title.indexOf(search_value) > -1){
                        const itemFront = document.createElement("div");
                        itemFront.classList = "itemFront";

                        const img = document.createElement("img");
                        img.src = item.frontImg;
                        img.id = item.id;
                        itemFront.appendChild(img);
                        result.appendChild(itemFront);
                    }
                }

            });

        }
        if(value){
            showResult();
        }

        search_input.addEventListener("keyup", () => {
            showResult();
        });

        // Item Click
        result.addEventListener("click", (e) => {
            const id = e.target.id;
            const item = Store.getItemsBy("", id);
            MoreInfo.open(item, search_input.value);
        });

        // Cloce
        close.addEventListener("click", () => {
            model.removeChild(search);
            Model.close();
        });
    }
}


// SideMenu Button Event
document.querySelector(".search-button").addEventListener("click", () => {
    Search.open();
});