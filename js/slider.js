//define global variables
var image = [],
    imageNumber,
    imageLength,
    flickr = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1e96d71e506797151f901590a412d700&text=Salt+Lake+Coffee&format=json&nojsoncallback=1",
    myRequest = new XMLHttpRequest();

//send request to flickrAPI
myRequest.onreadystatechange = flickrAPI;
myRequest.open("GET", flickr);
myRequest.send();

//AJAX function grabs information and parses it and provides a url
function flickrAPI() {
    if(this.readyState === 4 && this.status === 200){
        var json = JSON.parse(this.responseText);
        var photos = json.photos.photo;
        var urls = photos.map(function(photo) {
            return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg';
        });

        updateImages(urls);
    } else if (this.readyState === 4 && this.status !== 200) {
        alert("local images are currently unavailable. Please check your internet connection");
    }
}

//display or hide photo gallery
function showSlider() {
  var showSlide = document.getElementById("container");
  showSlide.style.display = (showSlide.style.display != "none" ? "block" : "" );
}

function hideSlider() {
    var hideSlide = document.getElementById("container");
    hideSlide.style.display = (hideSlide.style.display != "block" ? "none" : "" );
}

document.getElementById("showCoffee").addEventListener("click", showSlider);
document.getElementById("hide_slider").addEventListener("click", hideSlider);

//Once flickr API is successful store image links within image array
function updateImages(images) {
    image = images;
    imageNumber = 0;
    imageLength = images.length;
    changeImage(0);
}

//Scroll through images
function changeImage(x) {
    imageNumber += x;
    //if you've reached end of array... start over
    if (imageNumber > imageLength) {
        imageNumber = 0;
    }
    if (imageNumber < 0) {
        imageNumber = imageLength;
    }

    //console.log(image[imageNumber]);
    document.getElementById("img").src = image[imageNumber];
}