class Episodes {
    static open(item, moreInfo) {
        // Show Model
        Model.open();
        const model = document.querySelector(".model");
        let close, back;

        // Cloce Button
        if(moreInfo){
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

        const episodes = document.createElement("div");
        episodes.classList = "episodes";

        const title = document.createElement("span");
        title.classList = "title";
        title.innerHTML = `${item.title} <br />`;
        episodes.appendChild(title);

        const seasons = Store.seasonList(item);
        const seasons_select = document.createElement("select");
        seasons_select.classList = "seasons";

        seasons.forEach(season => {
            const option = document.createElement("option");
            option.value = season;
            option.innerText = `Season ${season}`;
            seasons_select.appendChild(option);
        });

        episodes.appendChild(seasons_select);

        model.appendChild(episodes);
        Episodes.display(item, seasons_select.value);

        // ## Event ##
        // Season selected
        seasons_select.addEventListener("change", () => {
            const episodeBrow = document.querySelector(".episodeBrow");
            episodes.removeChild(episodeBrow);
            Episodes.display(item, seasons_select.value); 
        });

        // Close Button
        if(moreInfo){
            back.addEventListener("click", () => {
                model.removeChild(episodes);
                MoreInfo.open(item);
            });
        }else{
            close.addEventListener("click", () => {
                model.removeChild(episodes);
                Model.close();
            });
        }
        
    }

    static display(item, season){
        const episodesItem = Store.getEpisodeByItem(item.id);
        const episodes = document.querySelector(".episodes");
        const episodeBrow = document.createElement("div");
        episodeBrow.classList = "episodeBrow";

        episodesItem.forEach((episode) => {
            if(episode.season == season){
                const episodeFront = document.createElement("div");
                episodeFront.classList = "episodeFront";

                const img = document.createElement("img");
                img.src = episode.frontImg;

                const info = document.createElement("div");
                info.classList = "info";
                info.innerHTML = `<strong style="font-size: 16px">${episode.title}</strong> (${episode.time})<br />${episode.date}`;

                episodeFront.appendChild(img);
                episodeFront.appendChild(info);
                episodeBrow.appendChild(episodeFront);

            }
        });

        episodes.appendChild(episodeBrow);
    }


}