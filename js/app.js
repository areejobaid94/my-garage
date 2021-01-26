"use strict";
let carsArr = [];
let form = document.getElementById('main-form');
let table = document.getElementById('result-table');

let  appendAll = function() {
    for (let i = 0 ; i < carsArr.length;i++){
        let tr = document.createElement('tr');
        table.appendChild(tr);
        let tdImg = document.createElement('td');
        let img = document.createElement('img');
        img.src = carsArr[i].img;
        tdImg.appendChild(img);
        tr.appendChild(tdImg);
        let tdText = document.createElement('td');
        let pcat = document.createElement('p');
        pcat.textContent = `Car Name: ${carsArr[i].name}`
        tdText.appendChild(pcat);
        let pModel = document.createElement('p');
        pModel.textContent = `Model Year: ${carsArr[i].model}`;
        tdText.appendChild(pModel);
        tr.appendChild(tdText);
        let tdButton = document.createElement("td");
        tdButton.innerHTML = `<button onclick="deleteRow(this)">Delete</button>`;
        tr.appendChild(tdButton)
    }
};

function car (name, category, model){
    this.name = name;
    this.category = category;
    this.model = model;
    console.log(category);
    this.img = `../imgs/${category.toLowerCase()}.png`;
    this.appendRow();
    carsArr.push(this);
};


car.prototype.appendRow = function() {
    let tr = document.createElement('tr');
    table.appendChild(tr);
    let tdImg = document.createElement('td');
    let img = document.createElement('img');
    img.src = this.img;
    tdImg.appendChild(img);
    tr.appendChild(tdImg);
    let tdText = document.createElement('td');
    let pcat = document.createElement('p');
    pcat.textContent = `Car Name: ${this.name}`
    tdText.appendChild(pcat);
    let pModel = document.createElement('p');
    pModel.textContent = `Model Year: ${this.model}`;
    tdText.appendChild(pModel);
    tr.appendChild(tdText);
    let tdButton = document.createElement("td");
    tdButton.innerHTML = `<button onclick="deleteRow(this)">Delete</button>`;
    tr.appendChild(tdButton)
};

window.onload = function (){
    carsArr = localStorage.getItem('carsArr') != null ? JSON.parse(localStorage.getItem('carsArr')) : [];
    let arr = [];
    appendAll();
}

let deleteRow = function(btn){
    var row = btn.parentNode.parentNode;
    var index = row.rowIndex -1;
    row.parentNode.removeChild(row);
    carsArr.splice(index, 1);
    updateLS();
}
let updateLS = function(){
    localStorage.setItem('carsArr', JSON.stringify(carsArr))
}

let handelSubmit = function(event){
    event.preventDefault();
    let newCar = new car(event.target.name.value, event.target.category.value, event.target.model.value);
    updateLS();
};
let DeleteAll = function(){
    localStorage.removeItem('carsArr');
    carsArr = [];
    updateLS();
    table.innerHTML = '';
}
form.addEventListener('submit',handelSubmit);

