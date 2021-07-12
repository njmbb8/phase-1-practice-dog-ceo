const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 

fetch(imgUrl)
.then((response) => response.json())
.then(function(data){
    data.message.forEach(function(imagePath){
        const imageNode = document.createElement('img');
        imageNode.setAttribute('src', imagePath);
        document.getElementById('dog-image-container').appendChild(imageNode);
    })
})

const breedNodeArray = [];

function limitBreeds() {
    startLetter = document.getElementById('breed-dropdown').value
    breedNodeArray.forEach(function(activeNode){
        if(activeNode.textContent[0] === startLetter){
            activeNode.style.display = 'inherit';
        }
        else{
            activeNode.style.display = 'none';
        }
    })
}

fetch(breedUrl)
.then((response) => response.json())
.then(function(data){
    Object.entries(data.message).forEach(function(breed){
        const breedName = breed[0];
        const breedNode = document.createElement('li');
        breedNode.textContent = breedName;
        breedNodeArray.push(breedNode);
        document.getElementById('dog-breeds').appendChild(breedNode);
        limitBreeds();
    })
})

document.addEventListener('click', function(e){
    if(e.target.nodeName === 'LI'){
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        e.target.style.color = `rgb(${r}, ${g}, ${b})`;
    }
})


document.addEventListener('DOMContentLoaded', function(e){
    limitBreeds();
    document.getElementById('breed-dropdown').onchange = function(){
        limitBreeds();
    }
})