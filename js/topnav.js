class topNav{
    static display(){
        const topnav = document.querySelector(".topNav");

        // Clear Top Nav
        topnav.innerHTML = "";

        if(global_root == "home"){
            const span = document.createElement("span");
            span.innerHTML = "Home";
            topnav.appendChild(span);
        }else if (global_root == "movies"){
            const span = document.createElement("span");
            span.innerHTML = "Movies";
            topnav.appendChild(span);

            const select = document.createElement("select");
            select.id = "genre";

            const title_option = document.createElement("option");
            title_option.classList = "selectTitle option";
            title_option.value = "";
            title_option.innerHTML = "Genre";

            const all_option = document.createElement("option");
            all_option.value = "";
            all_option.innerHTML = "All";
            select.appendChild(title_option);
            select.appendChild(all_option);
            topnav.appendChild(select);

            const Genres = Store.genreList("movie");
            Genres.forEach((genre) => {
                const this_genre = document.createElement("option");
                this_genre.value = genre;
                this_genre.innerText = genre;
                select.appendChild(this_genre);
            });

            const select_sort = document.createElement("select");
            select_sort.id = "sort";

            const sort_title_option = document.createElement("option");
            sort_title_option.classList = "SortselectTitle option";
            sort_title_option.innerHTML = "Sort";
            select_sort.appendChild(sort_title_option);

            const sort_default_option = document.createElement("option");
            sort_default_option.value= "";
            sort_default_option.innerHTML = "Default";
            select_sort.appendChild(sort_default_option);

            const AtZ = document.createElement("option");
            AtZ.value = "AtZ";
            AtZ.innerText = "A-Z";

            const ZtA = document.createElement("option");
            ZtA.value = "ZtA";
            ZtA.innerText = "Z-A";

            const YearU = document.createElement("option");
            YearU.value = "YearU";
            YearU.innerText = "New to Old (Year)";

            const YearD = document.createElement("option");
            YearD.value = "YearD";
            YearD.innerText = "Old to New (Year)";

            select_sort.appendChild(AtZ);
            select_sort.appendChild(ZtA);
            select_sort.appendChild(YearU);
            select_sort.appendChild(YearD);
            topnav.appendChild(select_sort);

        }else if (global_root == "shows"){
            const span = document.createElement("span");
            span.innerHTML = "Shows";
            topnav.appendChild(span);

            const select = document.createElement("select");
            select.id = "genre";

            const title_option = document.createElement("option");
            title_option.classList = "selectTitle";
            title_option.value = "";
            title_option.innerHTML = "Genre";

            const all_option = document.createElement("option");
            all_option.value = "";
            all_option.innerHTML = "All";
            select.appendChild(title_option);
            select.appendChild(all_option);
            topnav.appendChild(select);

            const Genres = Store.genreList("show");
            Genres.forEach((genre) => {
                const this_genre = document.createElement("option");
                this_genre.value = genre;
                this_genre.innerText = genre;
                select.appendChild(this_genre);
            });

            const select_sort = document.createElement("select");
            select_sort.id = "sort";

            const sort_title_option = document.createElement("option");
            sort_title_option.classList = "SortselectTitle option";
            sort_title_option.innerHTML = "Sort";
            select_sort.appendChild(sort_title_option);

            const sort_default_option = document.createElement("option");
            sort_default_option.value= "";
            sort_default_option.innerHTML = "Default";
            select_sort.appendChild(sort_default_option);

            const AtZ = document.createElement("option");
            AtZ.value = "AtZ";
            AtZ.innerText = "A-Z";

            const ZtA = document.createElement("option");
            ZtA.value = "ZtA";
            ZtA.innerText = "Z-A";

            const YearU = document.createElement("option");
            YearU.value = "YearU";
            YearU.innerText = "New to Old (Year)";

            const YearD = document.createElement("option");
            YearD.value = "YearD";
            YearD.innerText = "Old to New (Year)";

            select_sort.appendChild(AtZ);
            select_sort.appendChild(ZtA);
            select_sort.appendChild(YearU);
            select_sort.appendChild(YearD);
            topnav.appendChild(select_sort);
        }else if(global_root == "my_list"){
            const span = document.createElement("span");
            span.innerHTML = "My List";
            topnav.appendChild(span);
        }
    }
}

class TopBar {
    // Show item in Top Niv
    static ShowInTop(item){

        const topbar = document.querySelector(".topBar");
        topbar.style = `background-image: linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.7) ,rgba(0,0,0,1)), url("${item.backImg}");`;
        topbar.innerHTML = "";

        if(item.id != global_topBarID){
            // Animtion
            topbar.classList.add("run");
            setTimeout(() => {topbar.classList.remove("run");}, 1000);
        }
        
        global_topBarID = item.id;

        let time, play_button;

        if(item.type == "movie"){
            time = item.time;

            play_button = document.createElement("button");
            play_button.classList = "topBar-play";
            play_button.innerHTML = `<i class="material-icons">play_arrow</i>Play`;
        }else if(item.type == "show"){
            const season = Store.seasonList(item);
            time = `${season.length} Seasons`;

            play_button = document.createElement("button");
            play_button.classList = "topBar-episode";
            play_button.innerHTML = `<i class="material-icons">playlist_play</i>Episodes`;
        }

        const content = document.createElement("div");
        content.classList = "content";
        topbar.appendChild(content);

        const title = document.createElement("h1");
        title.innerText = item.title;
        content.appendChild(title);

        const light = document.createElement("span");
        const description = document.createElement("span");
        light.classList = "light";
        light.innerHTML = `${item.year} | ${item.genre} | ${time}`;
        description.innerHTML = `<br /><br /> ${item.description}`;
        content.appendChild(light);
        content.appendChild(description);

        const buttons = document.createElement("div");
        buttons.classList = "topBar-buttons";
        topbar.appendChild(buttons);
        buttons.appendChild(play_button);

        const moreinfo_button = document.createElement("button");
        moreinfo_button.classList = "topBar-moreinfo"
        moreinfo_button.innerHTML = `<i class="material-icons">info</i>More Info`;
        buttons.appendChild(moreinfo_button);

        const addToList_button = document.createElement("button");
        addToList_button.classList = "topBar-addToList";
        if(item.myList == 0){
            addToList_button.innerHTML = `<i class="material-icons">star_outline</i>`;
        }else {
            addToList_button.innerHTML = `<i class="material-icons">star</i>`;
        }

        buttons.appendChild(addToList_button);

        // ## Event ##
        // Action Button
        if(item.type == "movie"){
            document.querySelector('.topBar-play').addEventListener('click', (e) => {Brow.openPlayer(item);});
        }else if(item.type == "show"){
            document.querySelector('.topBar-episode').addEventListener('click', (e) => {Episodes.open(item);});
        }

        // More Info Button
        document.querySelector('.topBar-moreinfo').addEventListener('click', (e) => {MoreInfo.open(item);});
        
        // Add To MyList Button
        document.querySelector('.topBar-addToList').addEventListener('click', (e) => {
            Brow.AddToMyList(item); 
            TopBar.ShowInTop(item);
            if(global_root == "my_list"){
                Roots.change();
            }
        });
  
    }
}