$(document).ready(function(){

    const storage = window.localStorage;
    let dataString;

    if(!storage.recipes) {
        let storageData = $.get({
            url: 'https://api.myjson.com/bins/f4ayd',
            dataType: 'json',
            async: false
        }).responseJSON;

        console.log(storageData);

        dataString = JSON.stringify(storageData);
        console.log(dataString);


        storage.setItem("recipes", dataString);

        console.log(JSON.parse(storage.getItem("recipes")));
    }else{
        let data = JSON.parse(storage.getItem("recipes"));

        console.log(data);
    }

    let data = JSON.parse(storage.getItem("recipes"));
    const modalAdd = $('#addRecipe');
    const addBtn = $('#add');
    const closeModal = $('.fa-times');
    const cancelBtn = $('.btn-cancel');
    const submitBtn = $('.btn-submit');

    let dish = $('#dishType').val();
    let title = $('#name').val();
    let descrip = $('#details').val();

   addBtn.on('click', function(e){
       e.preventDefault();
       modalAdd.toggle();
   });

   closeModal.on('click', function(e){
       e.preventDefault();
       modalAdd.hide();
   });

   cancelBtn.on('click', function(e){
       e.preventDefault();
       modalAdd.hide();
   });


   let recData = '';

   for(x = 0; x < data.length; x++){
       const rating = data[x].starRating;
       const desc = data[x].description;
       const id = data[x].recipeID;

       recData += '<article data-id="' + id+ '">';
       recData += '<h2>' + data[x].category + '</h2>';
       recData += '<img src="images/food-salad-restaurant-person.jpg" alt="recipe-image">';
       recData += '<h3>'  + data[x].title + '</h3>';
       recData += '<p>' + desc + '</p>';
       recData += '<div class="artFoot"><p>Star Rating: ' + rating.toFixed(1) + '</p><p><button class="edit-btn" id="edit-btn">' +
           '<i class="fa fa-pencil fa-fw" aria-hidden="true">' +
           '</i></button><button class="del-btn" id="del-btn">' +
           '<i class="fa fa-trash fa-fw" id="' + x + '" aria-hidden="true"></i></button></p></div>';
       recData += '</article>';
       console.log(id);
   }

   $('#recipe-details').append(recData);

    submitBtn.on('click', function(e){
        e.preventDefault();

        let id = data.length += 1;

        data.push({recipeID: id,title: title,description: descrip,category: dish,starRating: 0,photoUrl: null});

        data = JSON.parse(storage.getItem("recipes"));
        console.log(data);

        /*recData = '';


        recData += '<article data-id="' + id + '">';
        recData += '<h2>' + dish + '</h2>';
        recData += '<img src="images/food-salad-restaurant-person.jpg" alt="recipe-image">';
        recData += '<h3>'+ title +'</h3>';
        recData += '<p>' + descrip + '</p>';
        recData += '<div class="artFoot"><p>Star Rating: 0</p><p><button class="edit-btn" id="edit-btn">' +
            '<i class="fa fa-pencil fa-fw" aria-hidden="true">' +
            '</i></button><button class="del-btn" id="del-btn">' +
            '<i class="fa fa-trash fa-fw" id="' + x + '" aria-hidden="true"></i></button></p></div>';
        recData += '</article>';

        $('#recipe-details').append(recData);
        modalAdd.hide();*/
    });

    $('.fa-trash').on('click', function(e){
        let trashID = e.target.id;


        //$(this).parent().parent().parent().parent().remove();
        console.log(trashID);
    });


    const edit = $('i.fa-pencil');

    edit.on('click',function(e){
        let editId = e.target.id;

        modalAdd.toggle();
        //$(this).parent().parent().parent().parent().remove();
    })

});