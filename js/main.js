
$(document).on('ready', function(){
    // Place your code here, inside the document ready handler.

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response.
  var searchImages = function(tags){
    
  //Accessing the API, iterating over JSON array, grabbing the URL for a new 'img' that is then appended
  //to the list of items.
    
  var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
   
    $.getJSON( flickrAPI, {
      tags: tags,
      tagmode: "any",
      format: "json"
    }).done(function( data ) {
      console.log("success!");
      $.each(data.items, function(i,item){ 
        var itemSource = item.media.m;
        console.log(itemSource);
        var newImage = $('<img>').attr('src', itemSource);
        var newListItem = $('<li>').append(newImage);
        var newTitle = $('<p class="image-title">').html(item.title).appendTo(newListItem);
        var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem);
        var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newListItem);
        $(newListItem).appendTo('#images');
        if (i === 10) {
          return false;
        }
      }); 
    });
  };
 
 //setting up the button even handler to take input and pass it to the 'searchImages' function   
  
    $('button.search').on('click', function(event){
      event.preventDefault();
      var searchValue = $(event.target.parentElement).find('input[name="searchText"]')[0];
      console.log(searchValue.value);
      searchImages(searchValue.value);
      
    });       
  
    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target

});
