$(document).on('ready', function() {
   
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
    
    
})
            