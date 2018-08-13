//Declaring an array to hold topics, already including some default choices
var topicsArray = ["MineCraft", "FortNite", "Overwatch", "League of Legends", "PUBg", "Monster Hunter World","Grand Theft Auto V", "No Man's Sky", "Super Smash Bros", "Dark Souls"]

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
        newBtn.addClass("btn btn-light topic-button");
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

    //When user clicks submit for a new game we want to create a new button
    $('#make-button').on("click", function(event) {
        event.preventDefault()

        //shorthand for the game we will make a button for
        var newTopic = $('#topic-input').val();

        //Checks to make sure blank and duplicate topics are not submitted
        if (newTopic != '' && topicsArray.indexOf(newTopic) === -1) {

            //Adds new topic to array and empties search form
            topicsArray.push(newTopic)
            $('#topic-input').val('')

            //Displays the new list of buttons
            displayButtons(); 
        }
    });

    //When user clicks a button for a game, we want to display 10 gifs associated with that game.
    $('.topic-button').on("click", function(event) {
        event.preventDefault();

        //Here we prime a link for an ajax call from the giphy API.
        //In order to do this we create a variable for the buttons value and append it as a query to a search URL

        var searchQuery = $(this).val();
        var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + searchQuery + '&api_key=DRB7jKmDoBDg0VkiLGyW8WAFVk5z67uN&limit=10';
        console.log(queryUrl)
    })


})
