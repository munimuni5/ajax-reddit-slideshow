var slidesArray = [];
var currentIndex = 0;
var interval;

// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $("#search-form").on("submit", search);
});

function switchImage(){
  console.log('tick', slidesArray[currentIndex]);
  currentIndex++;
  if(currentIndex >= slidesArray.length){
    currentIndex = 0;
  }
  var image = document.createElement('img');
  image.src = slidesArray[currentIndex].url;

  $('#result').empty();
  $('#result').append(image);
}

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();
  //showLoader();
  clearSearchResults();

  // Get the users search input and save it in a variable.
  var userInput = $("#query").val() || 'blue heeler';
  console.log("user input is " + userInput);

  $.get("https://www.reddit.com/search.json", {
    q: userInput,
    limit: 10
  }).done(function(response) {
    addSearchResult(response.data.children);
    console.log(response.data.children);
    interval = setInterval(switchImage, 3000);
  });

  // hideLoader();
}

// Clear previous search results.
function clearSearchResults() {
  clearInterval(interval);
  $("#results").html("");
}

// Adds a single result object to the page.
function addSearchResult(results) {
  //TO DO
  // Create a list item to contain the search result link
  for(var i = 0; i < results.length; i++) {
    //console.log(results[i].data.title);

    // };
    // console.log(results[i].data.title);
    // var li = document.createElement('li');
    // var image = document.createElement('img');
    // image.src = results[i].data.url;

    //console.log(results);

    // var thumbnail = document.createElement('p');
   // // create an anchor tag
   //  var a = document.createElement('a');
   //  a.href = results[i].data.url;
   //  a.textContent = results[i].data.title;
    if(results[i].data.url){
        slidesArray.push(results[i].data);
    }

    //Add tagling below search result title
    // image.src = results[i].data.thumbnail;
    // image.style.height = 25;
    // image.style.width = 25;
    // var commentsLinks = document.createElement('ul');


   // put the link inside the list item.
    // $(li).append(image);
    // $(li).append(a);
  // add the list item to the list of search results
    // $('#results').append(image);
  }
}

  //runs slides
//   animateSlides();
//   setInterval(deanimateSlides, 10000);
// }

// function animateSlides() {
//   $('#slides').slidesjs({
//     width: 940,
//     height: 428,
//     play: {
//       active: true,
//       auto: true,
//       interval: 1000,
//       swap: true,
//       pauseOnHover: true,
//       restartDelay: 2500,
//     }
//   });
// }
//
// function deanimateSlides() {
// 	location.reload();
// }
//
// function showLoader()
// {
//     $(".loader").fadeIn("slow");
// }
// function hideLoader()
// {
//     $(".loader").fadeOut("slow");
// }
