'use strict';

$(document).ready(function () {
    var data = $.get({
        url: 'https://api.myjson.com/bins/f4ayd',
        dataType: 'json',
        async: false
    }).responseJSON;

    console.log(data.recipes);

    var modalAdd = $('#addRecipe');

    var addBtn = $('#add');

    addBtn.on('click', function (e) {
        e.preventDefault();
        modalAdd.show();
    });

    var recData = '';

    for (x = 0; x < data.recipes.length; x++) {
        var rating = data.recipes[x].starRating;
        var desc = data.recipes[x].description;

        recData += '<article >';
        recData += '<h2>' + data.recipes[x].category + '</h2>';
        recData += '<img src=' + data.recipes[x].photoUrl + ' alt="recipe-image">';
        recData += '<h3>' + data.recipes[x].title + '</h3>';
        recData += '<p>' + desc + '</p>';
        recData += '<div class="artFoot"><p>Star Rating: ' + rating.toFixed(1) + '</p><p><i class="fa fa-pencil" aria-hidden="true">' + '</i> <i class="fa fa-trash" aria-hidden="true"></i></p></div>';
        recData += '</article>';
    }

    $('#recipe-details').append(recData);

    var remove = $('i.fa-trash');

    var edit = $('i.fa-pencil');
});