/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

// Renders the returned result from createTweetElement to the container
const renderTweets = (tweets) => {
  const $form = $('#tweets-container');
  $form.empty();
  for (let tweet of tweets) {
    console.log(tweet);
    const userTweet = createTweetElement(tweet);
    // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    $form.append(userTweet);
  }
};

// Escape function
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Takes in a tweet object and is responsible for returning a tweet element containing the entire HTML structure of the tweet
const createTweetElement = function(tweet) {
  let $tweet = $(`
    <section class="tweetsPost">
        <article class="tweet-header">
        <div class="userInfo">
          <img id="avatars" src=${tweet.user.avatars}>
          <p class="userFirstName">${tweet.user.name}</p>
        </div>
        <p class="tweetHandle">${tweet.user.handle}</p>
      </article>
      <footer class="tweet-footer">
        <div class="tweet-text-box">
          <a class="tweetText">${escape(tweet.content.text)}</a>
        </div>
        <p class="underline"></p>
      <div class="bottom-tags">
        <p class="postAge">${timeago.format(tweet.created_at)}</p>
        <div class="icon">
          <i id="flag" class="fa-solid fa-flag"></i>
          <i id="repeat" class="fa-solid fa-repeat"></i>
          <i id="heart" class="fa-solid fa-heart"></i>
        </div>
      </div>
      </footer>
    </section>
  `);

  return $tweet;
};


// Renders the tweets on startup
$(() => {

  // Performs GET requests to the server
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (data) => {
        renderTweets(data);
      },
      error: (err) => {
        console.log("Error: ", err);
      }
    });
  };
  loadTweets();

  // Handles the form submission
  $("#submitTweet").submit(function(event) {
    event.preventDefault(); // Prevent the Default behaviour
    const serializedData = $(event.target).serialize(); // Serialize the form data
    const textLength = event.target[0].value.length; // length of the text

    // Displays error message when conditions are meet
    if (textLength === 0 || textLength === null) {
      $(".errorMessage").text("⚠️ Write some Tweets first! ⚠️"); // Adds error msg to element
      $(".errorMessage").addClass("errorMessageTrue"); // Adds class containing the CSS style to display error msg
      $(".errorMessageTrue").hide().slideDown();  // Using the slideDown method to display the error msg to the page
      return;
    }
    if (textLength > 140) {
      $(".errorMessage").text("⚠️ Exceeded max character limit of 140 ⚠️");
      $(".errorMessage").addClass("errorMessageTrue");
      $(".errorMessageTrue").hide().slideDown();
      return;
    } else { // Resets the error msg
      $(".errorMessage").removeClass("errorMessageTrue");
      $(".errorMessage").text("");
      $("#submitTweet")[0].reset(); // Clears the textaera when submitted
    }

    // Submit a POST request to the server with the serializedData
    $.post("/tweets", serializedData, (response) => {
      console.log("response", response);
      loadTweets();
    }).catch((err)=>{
      console.log("Error: ", err);
    });
  });

});