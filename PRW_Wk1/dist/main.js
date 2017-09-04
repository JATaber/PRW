'use strict';

$(document).ready(function () {

    var storage = window.localStorage;
    var dataString = void 0;
    var data = void 0;

    if (!storage.recipes) {
        var storageData = $.get({
            url: 'https://api.myjson.com/bins/f4ayd',
            dataType: 'json',
            async: false
        }).responseJSON;

        console.log(storageData);

        dataString = JSON.stringify(storageData);
        console.log(dataString);

        storage.setItem("recipes", dataString);

        console.log(JSON.parse(storage.getItem("recipes")));
    } else {
        data = JSON.parse(storage.getItem("recipes"));

        console.log(data.recipes);
        console.log(data.recipes.length);
    }

    var modalAdd = $('#addRecipe');
    var addBtn = $('#add');
    var closeModal = $('.fa-times');
    var cancelBtn = $('.btn-cancel');
    var submitBtn = $('.btn-submit');

    addBtn.on('click', function () {
        modalAdd.toggle();
    });

    closeModal.on('click', function (e) {
        e.preventDefault();
        modalAdd.hide();
    });

    cancelBtn.on('click', function (e) {
        e.preventDefault();
        modalAdd.hide();
    });

    var recData = '';
    data = JSON.parse(storage.getItem("recipes"));

    for (var i = 0; i < data.recipes.length; i++) {
        var rating = data.recipes[i].starRating;
        var desc = data.recipes[i].description;
        var id = data.recipes[i].recipeID;

        recData += '<article data-id="' + id + '">';
        recData += '<h2>' + data.recipes[i].category + '</h2>';
        recData += '<img src="images/food-salad-restaurant-person.jpg" alt="recipe-image">';
        recData += '<h3>' + data.recipes[i].title + '</h3>';
        recData += '<p>' + desc + '</p>';
        recData += '<div class="artFoot"><p>Star Rating: ' + rating.toFixed(1) + '</p><p><button class="edit-btn" id="edit-btn">' + '<i class="fa fa-pencil fa-fw" aria-hidden="true">' + '</i></button><button class="del-btn" id="del-btn">' + '<i class="fa fa-trash fa-fw" id="' + i + '" aria-hidden="true"></i></button></p></div>';
        recData += '</article>';
        console.log(id);
    }

    $('#recipe-details').append(recData);

    submitBtn.on('click', function (e) {
        e.preventDefault();

        var articleId = data.length += 1;
        var arrayID = articleId -= 1;
        var dish = $('#dishType').val();
        var title = $('#name').val();
        var descrip = $('#details').val();

        data.push({ recipeID: articleId, title: title, description: descrip, category: dish, starRating: 0, photoUrl: null });

        data = JSON.parse(storage.getItem("recipes"));
        console.log(data);

        recData = '';

        recData += '<article data-id="' + articleId + '">';
        recData += '<h2>' + dish + '</h2>';
        recData += '<img src="images/food-salad-restaurant-person.jpg" alt="recipe-image">';
        recData += '<h3>' + title + '</h3>';
        recData += '<p>' + descrip + '</p>';
        recData += '<div class="artFoot"><p>Star Rating: 0</p><p><button class="edit-btn" id="edit-btn">' + '<i class="fa fa-pencil fa-fw" aria-hidden="true">' + '</i></button><button class="del-btn" id="del-btn">' + '<i class="fa fa-trash fa-fw" id="' + arrayID + '" aria-hidden="true"></i></button></p></div>';
        recData += '</article>';
        console.log(arrayID);

        $('#recipe-details').append(recData);
        modalAdd.hide();
    });

    $('.fa-trash').on('click', function (e) {
        var trashID = e.target.id;

        $(this).parent().parent().parent().parent().remove();
        console.log(trashID);
    });

    var edit = $('i.fa-pencil');

    edit.on('click', function (e) {
        var editId = e.target.id;

        modalAdd.toggle();
        //$(this).parent().parent().parent().parent().remove();
    });
});