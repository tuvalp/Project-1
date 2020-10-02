class MoreInfo {
    static open (item, search){
        // Show Model
        Model.open();
        const model = document.querySelector(".model");
        let close, back;
        // Cloce/Back Button
        if(search){
            back = document.createElement("i");
            back.classList = "material-icons";
            back.id = "back";
            back.innerText = "navigate_next";
            model.appendChild(back);
        }else{
            close = document.createElement("span");
            close.classList = "close";
            close.innerText = "X";
            model.appendChild(close);
        }

        let timeValue, play_button;

        if(item.type == "movie"){
            timeValue = item.time;

            play_button = document.createElement("button");
            play_button.classList = "moreInfo-play";
            play_button.innerHTML = `<i class="material-icons">play_arrow</i>Play`;
        }else{
            const season = Store.seasonList(item);
            timeValue = `${season.length} Seasons`;

            play_button = document.createElement("button");
            play_button.classList = "moreInfo-episode";
            play_button.innerHTML = `<i class="material-icons">playlist_play</i>Episodes`;
        }

        const moreInfo = document.createElement("div");
        moreInfo.classList = "moreInfo";

        const title = document.createElement("h1");
        title.style = `font-size: 48px; text-align: left`;
        title.innerText = item.title;
        moreInfo.appendChild(title);

        const descrption = document.createElement("span");
        descrption.innerHTML = `${item.description} <br /><br />`;
        moreInfo.appendChild(descrption);

        const year = document.createElement("span");
        year.innerHTML = `<b>Year: <b> <b style="color: var(--color5)">${item.year}</b><br />`;
        moreInfo.appendChild(year);

        const genre = document.createElement("span");
        genre.innerHTML = `<b>Genre: <b> <b style="color: var(--color5)">${item.genre}</b><br />`;
        moreInfo.appendChild(genre);

        const time = document.createElement("span");
        time.innerHTML = `<b>Duration: <b> <b style="color: var(--color5)">${timeValue}</b><br />`;
        moreInfo.appendChild(time);

        const buttons = document.createElement("div");
        buttons.classList = "buttons";

        buttons.appendChild(play_button);

        const addToList_button = document.createElement("button");
        addToList_button.classList = "moreInfo-addToList";
        if(item.myList == 0){
            addToList_button.innerHTML = `<i class="material-icons">star_outline</i>`;
        }else {
            addToList_button.innerHTML = `<i class="material-icons">star</i>`;
        }
        buttons.appendChild(addToList_button);
        moreInfo.appendChild(buttons);
        
        model.appendChild(moreInfo);

        // ## Event ##
        // Close Button
        if(search){
            back.addEventListener("click", () => {
                model.removeChild(moreInfo);
                Search.open(search);
            });
        }else {
            close.addEventListener("click", () => {
                model.removeChild(moreInfo);
                Model.close();
            });
        }

        // Play/Episodes Button
        if(item.type == "movie"){
            document.querySelector(".moreInfo-play").addEventListener("click", () => {});
        }else{
            document.querySelector(".moreInfo-episode").addEventListener("click", () => {Episodes.open(item, 1)});
        }

        // Add to myList
        document.querySelector('.moreInfo-addToList').addEventListener('click', (e) => {
            Brow.AddToMyList(item); 
            TopBar.ShowInTop(item);

            model.removeChild(moreInfo);
            MoreInfo.open(item);

            if(global_root == "my_list"){
                Roots.change();
            }
        });
    }

}