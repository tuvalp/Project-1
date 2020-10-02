// Global Values
var global_root = "home";
var global_roots = ["home", "movies", "shows", "my_list"];
var global_topBarID = 1;
var global_color;
var global_color_option = ["Default", "Blue", "Green", "Red"];

// Load Events
document.addEventListener("DOMContentLoaded", () => {
    sideMenu.activeButton();
    Roots.change();
    Settings.colorLoad();

    // Show in Top
    const item = Store.getItems();
    const itemLen = item.length-1;
    TopBar.ShowInTop(item[itemLen]);
});

// roots
class Roots {
    static change(){
        topNav.display();

        if(global_root == "home"){
            Brow.displayItems();

            const item = Store.getItems();
            const itemLen = item.length-1;
            TopBar.ShowInTop(item[itemLen]);

        }else if(global_root == "movies"){
            const select = document.querySelector("#genre");
            const select_sort = document.querySelector("#sort");
            Brow.displayItems("movie");

            const item = Store.getItemsBy("movie");
            const itemLen = item.length-1;
            TopBar.ShowInTop(item[itemLen]);
            
            select.addEventListener("change", () => {
                Brow.displayItems("movie", select.value, "", select_sort.value);
                document.querySelector(".selectTitle").remove();
            });

            select_sort.addEventListener("change", () => {
              Brow.displayItems("movie", select.value, "", select_sort.value);
              document.querySelector(".SortselectTitle").remove();
            });
        }else if(global_root == "shows"){
          const select = document.querySelector("#genre");
          const select_sort = document.querySelector("#sort");
          Brow.displayItems("show");

          const item = Store.getItemsBy("show");
          const itemLen = item.length-1;
          TopBar.ShowInTop(item[itemLen]);
            
          select.addEventListener("change", () => {
            Brow.displayItems("show", select.value, "", select_sort.value);
            document.querySelector(".selectTitle").remove();
          });

          select_sort.addEventListener("change", () => {
            Brow.displayItems("show", select.value, "", select_sort.value);
            document.querySelector(".SortselectTitle").remove();
          });

        }else if(global_root == "my_list"){
          const item = Store.getItemsBy("", "", 1);
          if(item.length > 0){
            const itemLen = item.length-1;
            TopBar.ShowInTop(item[itemLen]);
          }else{
            const item = Store.getItems();
            const itemLen = item.length-1;
            TopBar.ShowInTop(item[itemLen]);
          }

            Brow.displayItems("", "", 1);
        }

        Brow.itemActive();
    }
}

// Item Class
class Item {
    constructor(id, type, title, description, year, time, genre, frontImg, backImg) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.description = description;
        this.year = year;
        this.time = time;
        this.genre = genre;
        this.frontImg = frontImg;
        this.backImg = backImg;
        this.myList = 0;
    }
} 

// Episode Class
class Episode {
    constructor(id, itemId, season, title, time, date, frontImg, backImg){
      this.id = id;
      this.itemID = itemId;
      this.season = season;
      this.title = title;
      this.time = time;
      this.date = date;
      this.frontImg = frontImg;
      this.backImg = backImg;
    }
}

// Store
class Store {
    static getItems() {
      let items;
      if(localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
  
      return items;
    }

    static getItemsBy(type, id, myList) {
      const Items = Store.getItems();
      let item = new Array;
      

      if(id){
        Items.forEach((itemX) => {
          if(itemX.id == id){
            item = itemX;
          }
        });
      }else if(myList){
        Items.forEach((itemX) => {
          if(itemX.myList == 1){
            item.push(itemX);
          }
        });
      }else if(type){
        Items.forEach((itemX) => {
          if(itemX.type == type){
            item.push(itemX);
          }
        });
      }
  
      return item;
    }

    // Items Count
    static itemCount() {
      const Items = Store.getItems();
      var ItemsLength = Items.length;
      ItemsLength -= 1;

      let itemCount;
      if(Items[ItemsLength]){
        itemCount = Items[ItemsLength].id;
      }else{
        itemCount = 0;
      }

      return itemCount;
    }

    // Items Gengres
    static genreList(type){
      const Items = Store.getItems();
      let genre = [];

      Items.forEach((item) => {
        if(item.type == type){
          const items_genre = item.genre;
          const item_genre = items_genre.split(",");

          item_genre.forEach((IG) => {
            const IGtrim = Trim(IG);
            if(genre.includes(IGtrim) == false){
              genre.push(IGtrim);
            }
          });
        }
      });
      
      return genre;
    }

    // Season List
    static seasonList(item){
      const episodes = Store.getEpisodeByItem(item.id);
      let seasons = [];

      episodes.forEach((episode) => {
          const episode_season = episode.season;

          if(!seasons.includes(episode_season)){
            seasons.push(episode_season);
          }

      });
      
      return seasons;
    }
  
    // Add Item
    static addItem(item) {
      const items = Store.getItems();
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
    }

    // Remove Item
    static removeItem(id) {
      const items = Store.getItems();
  
      items.forEach((item, index) => {
        if(item.id == id) {
          items.splice(index, 1);
        }
      });
  
      localStorage.setItem('items', JSON.stringify(items));
    }  

    // Edit Item
    static editItem(item){
      const Items = Store.getItems();
      Items.forEach((Item) => {
        
        if(Item.id == item.id){
          Item.title = item.title;
          Item.description = item.description;
          Item.year = item.year;
          Item.time = item.time;
          Item.genre = item.genre;
          Item.frontImg = item.frontImg;
          Item.backImg = item.backImg;
          Item.myList = item.myList;
        }
      });

      localStorage.setItem('items', JSON.stringify(Items));
    }

    // Episode Fuction
    static getEpisode() {
      let episodes;
      if(localStorage.getItem('episodes') === null) {
        episodes = [];
      } else {
        episodes = JSON.parse(localStorage.getItem('episodes'));
      }

      return episodes;
    }

    static getEpisodeByItem(itemId, season){
      const Episodes = Store.getEpisode();
      let episode = [];

      Episodes.forEach((episodeX) => {
        if(episodeX.itemID == itemId){
          episode.push(episodeX);
        }
      });

      return episode;
    }

    // Add Episode
    static addEpisode(episode) {
      const episodes = Store.getEpisode();
      episodes.push(episode);
      localStorage.setItem('episodes', JSON.stringify(episodes));
    }

    // Items Count
    static episodeCount() {
      const Episodes = Store.getEpisode();
      var EpisodesLegth = Episodes.length;
      EpisodesLegth -= 1;

      let episodesCount;
      if(Episodes[EpisodesLegth]){
        episodesCount = Episodes[EpisodesLegth].id;
      }else{
        episodesCount = 0;
      }

      return episodesCount;
    }
}


// Model Control
class Model {
    static open(){
      const model = document.querySelector(".model");
      model.style.display = "block";
      model.innerHTML = "";
      document.getElementsByTagName("body")[0].classList = "hide";
    }

    static close(){
      const model = document.querySelector(".model");
      model.style.display = "none";
      model.innerHTML = "";
      document.getElementsByTagName("body")[0].classList = "show";
    }
}

// ## Function ##
function Trim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

function compareAtZ(a, b) {
  const bandA = a.title.toUpperCase();
  const bandB = b.title.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}

function compareZtA(a, b) {
  const bandA = a.title.toUpperCase();
  const bandB = b.title.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = -1;
  } else if (bandA < bandB) {
    comparison = 1;
  }
  return comparison;
}

function compareYearD(a, b) {
  const bandA = a.year.toUpperCase();
  const bandB = b.year.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}

function compareYearU(a, b) {
  const bandA = a.year.toUpperCase();
  const bandB = b.year.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = -1;
  } else if (bandA < bandB) {
    comparison = 1;
  }
  return comparison;
}

function Sort(items, by){
  let Items;
  switch (by) {
    case "AtZ":
      Items = items.sort(compareAtZ);
      break;

    case "ZtA":
      Items = items.sort(compareZtA);
      break;

    case "YearD":
      Items = items.sort(compareYearD);
      break;

    case "YearU":
      Items = items.sort(compareYearU);
      break;
  
    default:
      Items = items;
      break;
  }

  return Items;
}
