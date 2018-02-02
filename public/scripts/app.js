$(document).ready(function() {

  function renderTweets(tweets) {
    $(".tweet-box").remove();
    for (let obj of tweets) {
      $("#tweets-container").prepend(createTweetElement(obj));
    }
  }

/* Known bugs: * Need to highlight whole tweetbox
               * Clear textbox after tweet
               * Make sure charCounter resets after box clear
*/

  // Creates HTML for tweets
  function createTweetElement(tweet) {

  let $tweetBox = $("<article>").addClass("tweet-box");
  let $header = $("<header>").addClass("clearfix");
  let $avatarImg = $("<img>").addClass("screenpic").attr("src", tweet.user.avatars.small);;
  let $spanName = $("<span>").addClass("name").text(tweet.user.name);
  let $spanUser = $("<span>").addClass("username").text(tweet.user.handle);

  $tweetBox.append($header);
  $header.append($avatarImg);
  $header.append($spanName);
  $header.append($spanUser);

  let $div = $("<div>");
  let $mainTweet = $("<p>").addClass("main-tweet").text(tweet.content.text);

  $tweetBox.append($div);
  $div.append($mainTweet);

  let $footer = $("<footer>");
  let $spanDate = $("<span>").addClass("time-since").text(timeDifference(Date.now(), tweet.created_at));
  let $imgLike = $("<img>").addClass("like").attr("src", "images/vectors/heart.svg");
  let $imgReTweet = $("<img>").addClass("retweet").attr("src", "images/vectors/retweet.svg");
  let $imgFlag = $("<img>").addClass("flag").attr("src", "images/vectors/flag.svg");

  $tweetBox.append($footer);
  $footer.append($spanDate);
  $footer.append($imgLike);
  $footer.append($imgReTweet);
  $footer.append($imgFlag);

  return $tweetBox;

  }

  // Creates extra CSS for rendered elements. This needs to be fixed so that
  // only header goes green but when mouseenter for whole element

  $("#tweets-container").on("mouseenter", "header", function(event) {
    $(this).css({
      "opacity": "1",
      "background-color": "#00a087",
      "color": "#e8fdff"
    });
  });

  $("#tweets-container").on("mouseleave", "header", function(event) {
    $(this).css({
      "opacity": "0.7",
      "background-color": "#DCDCDC",
      "color": "#244751"
    });
  });


  $("#tweets-container").on("mouseenter", "footer img", function(event) {
    $(this).css({
      "opacity": "1",
    });
  });

  $("#tweets-container").on("mouseleave", "footer img", function(event) {
    $(this).css({
      "opacity": "0.5",
    });
  });

  let $button = $("#tweetButton");
  $button.on("click", function (event) {
    event.preventDefault();
    let $tweetText = $("#writeTweet");
    let tweetLen = $("#writeTweet").val().length;

    // Validity checks

    if (tweetLen === 0) {
      $.flash("Your tweet is empty!");
       return null;
     }

    if (tweetLen > 140) {
      $.flash("\"Brevity is the soul of wit\" - Your tweet is too long! ");
      return null;
      }

    // Ajax to POST tweet data
    $.post("/tweets", $tweetText.serialize(), function(data, status, xhr) {
      getTweets();
    });
  });

  // Callback Ajax function to GET tweet data
  let getTweets = function () {
    $.get("/tweets", function(refreshedTweets) {
        renderTweets(refreshedTweets);
    });
  }

  //Ensures all tweets are rendered at document load
  getTweets();

  // Auto close when tweet is POSTed
  //Toggles Tweet Composer
  $("#newTweetButton").on("click", function () {
    $("#new-tweet").slideToggle(400, function () {
      $("#writeTweet").val("");
      $("#writeTweet").focus();
    });
  });

});

