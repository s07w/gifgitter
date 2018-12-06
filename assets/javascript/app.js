var topics = ["The Simpsons", "King of the Hill", "Home Movies", "Mission Hill"];

function makeButtons() {
    $('#buttonsView').empty();
    // loops through topics and creates buttons with these attributes, adds them to buttonsView
    for (var i = 0; i < topics.length; i++){
        //generates buttons dynamically
        var a = $('<button>');
        //adds class 'topic'
        a.addClass('topic');
        //adds attribute for data based on topics integer
        a.attr('data-name', topics[i]);
        //provdes button text
        a.text(topics[i]);
        //adds button to HTML
        $('#buttonsView').append(a);

    }
}

//when a button is clicked
$('#addTopic').on("click", function(event) {
    event.preventDefault();
    //grabs user input
    var topic = $('#topic-input').val().trim();
    //pushes input into array
    topics.push(topic);
    //console.log(topic);
    //renders all buttons plus user added buttons
    makeButtons();
    //user can hit Enter key instead of clicking submit    
    $("#topic-input").val("");

    return false
});



//displays gifs

  function displayGifs() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=y7J1Ip9RY2CTPAHwBdiC767Tbic2R9ki&q=" + topic + "&limit=10&offset=0&lang=en";

    //ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        // loop through each gif and add variables
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class=gifs>');
            var topicGif = $('<img>');
            topicGif.attr('src', results[i].images.fixed_height_still.url);
					topicGif.attr('data-still', results[i].images.fixed_height_still.url);
					topicGif.attr('data-state', 'still');
					topicGif.addClass('gif');
					topicGif.attr('data-animate', results[i].images.fixed_height.url);
				var rating = results[i].rating;
				var p = $('<p>').text('Rating: ' + rating);
				gifDiv.append(topicGif)
				gifDiv.append(p)

				$("#gifsView").prepend(gifDiv);

        }
    
    });
} 

// stop/start gifs 
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// displaying topic gifs
$(document).on("click", ".topic", displayGifs);

// initially calls the makeButtons function
makeButtons();