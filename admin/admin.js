// UI Class: Handle UI Tasks
class UI {
  static displayItems() {
    const Items = Store.getItems();
    Items.forEach((item) => UI.addItemToList(item));
  }
  
  static addItemToList(item) {
    const list = document.querySelector('#items-list');
    const row = document.createElement('tr');
    row.id = item.id;
    
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.type}</td>
      <td>${item.title}</td>
      <td>
        <a class="btn btn-outline-warning btn-sm edit">Edit</a>
        <a class="btn btn-outline-danger btn-sm delete">Remove</a>
      </td>
    `;
  
    list.appendChild(row);
  }
  
  static deleteItem(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static EditItem(id) {
    const item = Store.getItemsBy("", id);
    UI.ShowDiv("editItem");

    document.querySelector('#items-edit').classList = item.id;
    document.querySelector('#Etitle').value = item.title;
    document.querySelector('#Edescription').value = item.description;
    document.querySelector('#Eyear').value = item.year;
    document.querySelector('#Etime').value = item.time;
    document.querySelector('#Egenre').value = item.genre;
    document.querySelector('#EfrontImg').value = item.frontImg;
    document.querySelector('#EbackImg').value = item.backImg;
  }

  
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const table = document.querySelector('.table');
    container.insertBefore(div, table);
  
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }
  
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#year').value = '';
    document.querySelector('#time').value = '';
    document.querySelector('#genre').value = '';
    document.querySelector('#frontImg').value = '';
    document.querySelector('#backImg').value = '';
  }

  static ShowDiv(id){
    const div = document.getElementById(id);
    if(div.style.display == "none"){
      div.style.display = "block";
      document.querySelector(".model-close").style.display = "block";
      document.getElementsByTagName("body")[0].classList = "hide";

      document.querySelector(".model-close").addEventListener("click", () => {
        document.getElementById(id).style.display = "none";
        document.querySelector(".model-close").style.display = "none";
        document.getElementsByTagName("body")[0].classList = "show";
    });
    }else{
      div.style.display = "none";
      document.querySelector(".model-close").style.display = "none";
      document.getElementsByTagName("body")[0].classList = "show";
    }
  }
  
}

// Event: Add a Item
document.querySelector('#items-add').addEventListener('submit', (e) => {
   
  // Prevent actual submit
  e.preventDefault();
  
  // Get form values
  var id = Store.itemCount();
  id += 1;
  const type = document.querySelector('#type').value;
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const year = document.querySelector('#year').value;
  const time = document.querySelector('#time').value;
  const genre = document.querySelector('#genre').value;
  const frontImg = document.querySelector('#frontImg').value;
  const backImg = document.querySelector('#backImg').value;

  // Validate
  if(title === '' || description === '' || year === '' || genre === '' || frontImg === '' || backImg === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
  // Instatiate Item
    const item = new Item(id, type, title, description, year, time, genre, frontImg, backImg);
  
    // Add item to UI
    UI.addItemToList(item);
    // Add item to store
    Store.addItem(item);
  
    // Show success message
    UI.showAlert('Item Added', 'success');
  
    // Clear fields
    UI.clearFields();
    UI.ShowDiv("addItem");
  }
});


// Event Edit Item
document.querySelector('#items-edit').addEventListener('submit', (e) => {
  const id = document.querySelector("#items-edit").className;
  const Item = Store.getItemsBy("", id);
  Item.title = document.querySelector('#Etitle').value;
  Item.description = document.querySelector('#Edescription').value;
  Item.year = document.querySelector('#Eyear').value;
  Item.time = document.querySelector('#Etime').value;
  Item.genre = document.querySelector('#Egenre').value;
  Item.frontImg = document.querySelector('#EfrontImg').value;
  Item.backImg = document.querySelector('#EbackImg').value;

  Store.editItem(Item);
  UI.showAlert('Item Edit', 'success');
  
  // Clear fields
  UI.clearFields();
  UI.ShowDiv("editItem");
  UI.showAlert('Item Edit', 'success');
});
  
// Event: Display item
document.addEventListener('DOMContentLoaded', UI.displayItems);

// Button Event
document.querySelector('#items-list').addEventListener('click', (e) => {

  // Edit
  if(e.target.classList.contains("edit")){
    UI.EditItem(e.target.parentElement.parentElement.id);
  }

  // Delete
  if(e.target.classList.contains("delete")){
    // Remove book from UI
    UI.deleteItem(e.target);
    // Remove book from store
    Store.removeItem(e.target.parentElement.parentElement.id);
    // Show success message
    UI.showAlert('Item Removed', 'danger');
  }
});


// Episode
document.addEventListener("DOMContentLoaded", () => {
  const Items = Store.getItems();
  const itemSelect = document.querySelector("#AEitemId");
  Items.forEach(item => {
      if(item.type == "show"){
        itemSelect.innerHTML += `<option value="${item.id}">${item.title}</option>`; 
      }
  });
});

// Event: Add a Episode
document.querySelector('#episode-add').addEventListener('submit', (e) => {
   
  // Prevent actual submit
  e.preventDefault();
  
  // Get form values
  var id = Store.episodeCount();
  id += 1;
  const itemId = document.querySelector('#AEitemId').value;
  const season = document.querySelector('#AEseason').value;
  const title = document.querySelector('#AEtitle').value;
  const time = document.querySelector('#AEtime').value;
  const date = document.querySelector('#AEdate').value;
  const frontImg = document.querySelector('#AEfrontImg').value;
  const backImg = document.querySelector('#AEbackImg').value;

  const episode = new Episode(id, itemId, season, title, time, date, frontImg, backImg);
  
  Store.addEpisode(episode);
  UI.showAlert('Episode Added', 'success');
});

