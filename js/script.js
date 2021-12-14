const imageContainer = document.getElementById('imageContainer');
const loader  = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// unsplash API
const count = 15;
const apiKey = '-Urt1ba6H_QJ925MCQkfn-aYtl-19FL9wvg3-ZYvHu8';
const APIurl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



function imageLoaded(){
    imagesLoaded++;
    console.log('loaded');
    if (imagesLoaded === photoArray.length){
        ready = true;
    }
}

// helper function to set the attributes to the element 
// as an object
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

function displayPhotos(){
    imagesLoaded = 0;
    photoArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src:photo.urls.regular,
            alt: photo.description,
        });
        if(!photo.description){
            img.setAttribute('title', 'unsplash photo');
        } else {
            img.setAttribute('title', photo.description);
        }
        // event listener check when the image is finished loading 
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}


async function getPhotosFromAPI(){
    try {
        const response = await fetch(APIurl);
        photoArray = await response.json();
        displayPhotos();
        loader.hidden = true;
    } catch(error){
        // catch the error
    }
}


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotosFromAPI();
    }
})




// on load
getPhotosFromAPI();