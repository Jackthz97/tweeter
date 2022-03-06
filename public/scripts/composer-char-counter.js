// Runs on server start
$(() => {
  const changeCounterStyle = monitorCharCount();

  $('#tweet-text').on('input', function() {
    const remainingChars = getRemainingChars(this.value);
    const counter = $(this).siblings().children().last();
    counter.text(remainingChars);
    changeCounterStyle(counter, remainingChars);
  });

  // Clears character counter
  $("button").on("click", function() {
    let char = $(".counter").text();
    let charLength = Math.floor(char);
    if (charLength >= 0) {
      $(".counter").text("140");
    }
  });
});

// Gets the user text and returns numbers of remaining characters
const getRemainingChars = (val) => {
  const tweetSize = 140;

  return tweetSize - val.length;
};

// Checks if remaining numbers of characters are over the max limit
const monitorCharCount = () => {
  let MaxChar = 140;

  const changeCounterStyle = (element, remainingChars) => {
    const addClassName = MaxChar >= 0 && remainingChars < 0;
    const removeClassName = MaxChar < 0 && remainingChars >= 0;
    if (addClassName) {
      element.addClass('exceededCharCount'); // Add new element with font color red
    } else if (removeClassName) {
      element.removeClass('exceededCharCount');
    }
    MaxChar = remainingChars;
  };

  return changeCounterStyle;
};