document.addEventListener("DOMContentLoaded", function () {
    const colorPicker = document.getElementById("colorPicker");
    const toolbarColorPicker = document.getElementById("toolbarColorPicker"); const imageUpload = document.getElementById("imageUpload");
    colorPicker.addEventListener("input", function () {
        const selectedColor = colorPicker.value; applyTheme(selectedColor);
    });
    toolbarColorPicker.addEventListener("input", function () {
        const toolbarColor = toolbarColorPicker.value; applyToolbarColor(toolbarColor);
    });
    imageUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            applyTheme(`url(${imageUrl})`);
        }
    });
    function applyToolbarColor(color) {
        chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
                code: `document.querySelector("body").style.backgroundColor = "${color}";`
            });
        });
    }
});