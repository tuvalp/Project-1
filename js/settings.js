class Settings {
    static open(){
        // Show Model
        Model.open();
        const model = document.querySelector(".model");

        // Cloce Button
        const close = document.createElement("span");
        close.classList = "close";
        close.innerText = "X";
        model.appendChild(close);

        const settings = document.createElement("div");
        settings.classList = "settings";

        const title = document.createElement("h1");
        title.innerText = "Settings";
        settings.appendChild(title);

        const color_label = document.createElement("label");
        color_label.innerHTML = `Color <br /><br />`;
        settings.appendChild(color_label);

        const color_select = document.createElement("select");
        color_select.classList = "color-select";
        settings.appendChild(color_select);

        global_color_option.forEach((color) => {
            const color_option = document.createElement("option");
            color_option.innerText = color;
            color_option.value = color;
            if(color == global_color){
                color_option.selected = 1;
            }
            color_select.appendChild(color_option);
        });

        model.appendChild(settings);

        // ## Event ##
        color_select.addEventListener("change", () => {
            Settings.changeColor(color_select.value);
            Settings.setColor();
        });

        // Close
        close.addEventListener("click", () => {
            model.removeChild(settings);
            Model.close();
        });
    }

    static setColor () { 
        const root = document.documentElement;

        if(localStorage.getItem("color")){
            const Color = JSON.parse(localStorage.getItem("color"));
            root.style.setProperty("--color3", Color[1]);
            root.style.setProperty("--color4", Color[2]);
            root.style.setProperty("--color5", Color[3]);
        }

    }

    static changeColor(color) {
        // Color Option
        const Default = ["Default", "#6F2232", "#950740", "#C3073F"];
        const Blue = ["Blue", "#0A337F", "#1258DC", "#6395F2"];
        const Green = ["Green", "#1B3409", "#375F1B", "#66B032"];
        const Red = ["Red", "#FD3A0F", "#FD3A0F", "#A72002"];

        switch (color) {
            case "Blue":
                localStorage.setItem('color', JSON.stringify(Blue));
                break;
            case "Green":
                localStorage.setItem('color', JSON.stringify(Green));
                break
            case "Red":
                localStorage.setItem('color', JSON.stringify(Red));
                break
            default:
                localStorage.setItem('color', JSON.stringify(Default));
                break;
        }

        global_color = JSON.parse(localStorage.getItem("color"))[0];

    }

    static colorLoad(){
        if(localStorage.getItem("color") == ""){
            Settings.changeColor("Default");
        }else {
            global_color = JSON.parse(localStorage.getItem("color"))[0];
        }

        Settings.setColor();
    }
}

// Settings Button Event
document.querySelector(".settings-button").addEventListener("click", () => {
    Settings.open();
});