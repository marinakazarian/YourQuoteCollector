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
      var toolbarColor = document.getElementById('toolbarColor').value;
      var shape = document.getElementById('shape').value;
      var pattern = document.getElementById('pattern').value;
  
      applyStyles(backgroundColor, toolbarColor, shape, pattern);
    });
  
    function applyStyles(backgroundColor, toolbarColor, shape, pattern) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript(
          tabs[0].id,
          {
            code: `
              document.body.style.backgroundColor = "${backgroundColor}";
              document.querySelector('header').style.backgroundColor = "${toolbarColor}";
              ${
                shape !== 'none'
                  ? `document.querySelector('header').style.borderRadius = "${shape}";`
                  : ''
              }
              ${
                pattern !== 'none'
                  ? `document.querySelector('header').style.backgroundImage = "url('${getPatternUrl(pattern)}')";`
                  : ''
              }
            `
          }
        );
      });
    }
  
    function getPatternUrl(pattern) {
      switch (pattern) {
        case 'stripes':
          return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAIklEQVR42mP8z/CfAQYTgPEj7A4EIQLNB2NBQTGigAAAABJRU5ErkJggg==';
        case 'dots':
          return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAATElEQVR42mP8/v7z7gMQJQA+2mBqDiBSMMYY4r6CsDDElBMNjG8DYjICJJvIZiDIwhcAKGNUEJhJQSwAAAAAAAAAAAAAAAMDuAU1aAgAEk5l1sAAAAASUVORK5CYII=';
        case 'checkerboard':
          return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAiklEQVR42mP4//8/AyUYwAop9DvATCYLG9gI5oj0gEoGEigOAIwCsUAJB6SWAnAUgFzABMCvSwGxgGgOGCqFIAAe9AAeLQdwGg4Y6oUUgAJDkBEoD4If2AAAAAElFTkSuQmCC';
        default:
          return '';
      }
    }
  });
  