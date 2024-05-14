// document.addEventListener("DOMContentLoaded", function () {
//     const colorPicker = document.getElementById("colorPicker");
//     const toolbarColorPicker = document.getElementById("toolbarColorPicker"); const imageUpload = document.getElementById("imageUpload");
//     colorPicker.addEventListener("input", function () {
//         const selectedColor = colorPicker.value; applyTheme(selectedColor);
//     });
//     toolbarColorPicker.addEventListener("input", function () {
//         const toolbarColor = toolbarColorPicker.value; applyToolbarColor(toolbarColor);
//     });
//     imageUpload.addEventListener("change", function (event) {
//         const file = event.target.files[0];
//         if (file) {
//             const imageUrl = URL.createObjectURL(file);
//             applyTheme(`url(${imageUrl})`);
//         }
//     });
//     function applyToolbarColor(color) {
//         chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
//             chrome.scripting.executeScript(tabs[0].id, {
//                 code: `document.querySelector("body").style.backgroundColor = "${color}";`
//             });
//         });
//     }
// });
document.addEventListener('DOMContentLoaded', function () {
    var applyButton = document.getElementById('applyButton');
  
    applyButton.addEventListener('click', function () {
      var backgroundColor = document.getElementById('backgroundColor').value;
      var fileInput = document.getElementById('backgroundImage');
      var file = fileInput.files[0];
  
      if (file) {
        var reader = new FileReader();
        reader.onloadend = function () {
          var imageDataUrl = reader.result;
          applyStyles(backgroundColor, imageDataUrl);
        };
        reader.readAsDataURL(file);
      } else {
        applyStyles(backgroundColor, null);
      }
    });
  
    function applyStyles(backgroundColor, backgroundImage) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript(
          tabs[0].id,
          {
            code: `
              document.body.style.backgroundColor = "${backgroundColor}";
              ${
                backgroundImage
                  ? `document.body.style.backgroundImage = "url('${backgroundImage}')";`
                  : ''
              }
            `
          }
        );
      });
    }
  }); 
