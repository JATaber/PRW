$(document).ready(function(){
   const data = $.get({
       url:  'https://api.myjson.com/bins/f4ayd',
       dataType: 'json',
       async: false
   }).responseJSON;

   console.log(data.recipes);


   const modalAdd = $('#addRecipe');

   const addBtn = $('#add');

   addBtn.on('click', function(e){
       e.preventDefault();
       modalAdd.show();
   });

   var recData = '';

   for(x = 0; x < data.recipes.length; x++){
       const rating = data.recipes[x].starRating;
       const desc = data.recipes[x].description;
       const id = data.recipes[x].recipeID;

       recData += '<article data-id="' + id+ '">';
       recData += '<h2>' + data.recipes[x].category + '</h2>';
       recData += '<img src=' + data.recipes[x].photoUrl +' alt="recipe-image">';
       recData += '<h3>'  + data.recipes[x].title + '</h3>';
       recData += '<p>' + desc + '</p>';
       recData += '<div class="artFoot"><p>Star Rating: ' + rating.toFixed(1) + '</p><p><button class="edit-btn" id="edit-btn">' +
           '<i class="fa fa-pencil fa-fw" aria-hidden="true">' +
           '</i></button><button class="del-btn" id="del-btn">' +
           '<i class="fa fa-trash fa-fw" id="' + x + '" aria-hidden="true"></i></button></p></div>';
       recData += '</article>';
       console.log(id);
   }

   $('#recipe-details').append(recData);

    $('.fa-trash').on('click', function(e){
        let trashID = e.target.id;

        $(this).parent().parent().parent().parent().remove();
        console.log(trashID);
    });
    /*
    const remove = $('#del-btn');

    remove.on('click', function(){
        remove.parent().parent().parent().remove();
        console.log(remove.parent().parent().parent());
    });
    */

    const edit = $('i.fa-pencil');

});