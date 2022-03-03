/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

// Renders the returned result from createTweetElement to the container
const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    console.log(tweet);
    const userTweet = createTweetElement(tweet);
    // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    $('#tweets-container').append(userTweet);
  }
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
        <a class="tweetText">${longTextChecker(tweet.content.text)}</a>
        <p class="underline"></p>
      </footer>
      <div class="bottom-tags">
        <p class="postAge">${timeago.format(tweet.created_at)}</p>
        <div class="icon">
          <i id="flag" class="fa-solid fa-flag"></i>
          <i id="repeat" class="fa-solid fa-repeat"></i>
          <i id="heart" class="fa-solid fa-heart"></i>
        </div>
      </div>
    </section>
  `);

  return $tweet;
};

// If the text exceeds the width of the post replace the rest of the text with '...'
const longTextChecker = (text) => {
  const maxLength = 57;
  let string = "";
  let newText;

  if (text.length > maxLength) {
    newText = text.slice(0,56);
    string += newText + "...";
    return string;
  }
  return text;
};

// const loadTweets = () => {
//   let userTweetData = $.ajax('/tweets', { method: 'GET' });
//   return userTweetData;
// };

// Renders the tweets on startup
$(() => {
  renderTweets(data);
  $("#submitTweet").submit(function(event) {
    event.preventDefault();
    const serialized = event.target.serialize();
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: serialized,
      success: function(data) {
        console.log("TEST",data);
      }
    });
  });

});