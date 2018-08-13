var topicsArray = ["MineCraft", "FortNite", "Overwatch", "League of Legends", "PUBg", "Monster Hunter World","Grand Theft Auto V", "No Man's Sky", "Super Smash Bros", "Dark Souls"]

function displayButtons() {
    for (let i = 0; i < topicsArray.length; i++) {
        
        var topic = topicsArray[i];
        console.log(topic);
        var newBtn = $('<button>');
        newBtn.addClass("btn btn-light topic-button");
        newBtn.text(topic);
        topic = topic.replace(/\s/g,'');
        console.log(topic)
        newBtn.val(topic);
        $('.btnsHere').append(newBtn);
    }
}

displayButtons()