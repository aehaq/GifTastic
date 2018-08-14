//Declaring an array to hold topics, already including some default choices
var topicsArray = ["MineCraft", "FortNite", "Overwatch", "League of Legends", "PUBG", "Zelda","Grand Theft Auto V", "Battlefield", "Smash Bros", "Dark Souls"]

//Creating a function to update the buttons shown based off of topics currently in the array
function displayButtons() {

    //empties container for buttons to prime for repopulation
    $('.btnsHere').empty();
    
    //Each button will be created and appended one by one.
    for (let i = 0; i < topicsArray.length; i++) {

        //shorthand for topic we are currently working with
        var topic = topicsArray[i];

        //creates button with correct classes and appearance 
        var newBtn = $('<button>');
        newBtn.addClass("btn btn-light");
        newBtn.addClass("topic-button");
        newBtn.text(topic);

        //removes undesired characters before assigning the value we will later use for searching
        topic = topic.replace(/\s/g,'');
        newBtn.val(topic);

        //places the now ready button into the container
        $('.btnsHere').append(newBtn);
    }
}

//To ensure nothing is run before document is ready
$(document).ready(function() {

    //Display the initial set of buttons
    displayButtons();

    console.log(topicsArray)

    //When user clicks submit for a new game we want to create a new button
    $('#make-button').on("click", function(event) {
        event.preventDefault()

        //shorthand for the game we will make a button for
        var newTopic = $('#topic-input').val().trim();

        //Checks to make sure blank and duplicate topics are not submitted
        if (newTopic != '' && topicsArray.indexOf(newTopic) === -1) {

            //Adds new topic to array and empties search form
            topicsArray.push(newTopic)
            $('#topic-input').val('')

            console.log(topicsArray)

            //Displays the new list of buttons
            displayButtons(); 
        }
    });

    //When user clicks a button for a game, we want to display 10 gifs associated with that game.
    $(document).on( "click", ".topic-button", function() {
        event.preventDefault();

        $('.gifsHere').empty();

        //Here we prime a link for an ajax call from the giphy API.
        //In order to do this we create a variable for the buttons value and append it as a query to a search URL
        //Note: aside from the searchQuery, the additional specifications are a limit of 10 gifs and a max MPAArating of pg.
        var searchQuery = $(this).val();
        var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + searchQuery + '&api_key=DRB7jKmDoBDg0VkiLGyW8WAFVk5z67uN&rating=pg&limit=10';
        console.log(queryUrl);

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {

            var result = response.data;
            console.log(result)

            for (let i = 0; i < 10; i++) {

                var gif = result[i];

                var newDiv = $('<div>');
                newDiv.addClass("gif-container");

                newDiv.append('<p>Rating: ' + gif.rating + '</p>')

                var newImg = $('<img>');
                newImg.addClass("gifs")
                newImg.attr("src", gif.images.fixed_height_still.url);
                newImg.attr("stillImg", gif.images.fixed_height_still.url);
                newImg.attr("animImg", gif.images.fixed_height.url);
                newImg.attr("status", "still");

                newDiv.append(newImg);
                $('.gifsHere').append(newDiv);
            }

        })

    })

    $(document).on("click", ".gifs", function() {

        var status = $(this).attr("status");
        var play = $(this).attr("animImg");
        var pause = $(this).attr("stillImg");
        
        if (status === "still") {
            $(this).attr("src", play)
            $(this).attr("status", "animated")
        } else if (status === "animated") {
            $(this).attr("src", pause)
            $(this).attr("status", "still")
        }
    })


})
