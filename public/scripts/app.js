$(document).ready(function() {

  function renderTweets(tweets) {
    $(".tweet-box").remove();
    for (let obj of tweets) {
      $("#tweets-container").prepend(createTweetElement(obj));
    }
  }

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

  // Creates extra CSS for rendered elements.

  $("#tweets-container").on("mouseenter", "article", function(event) {
    $(this).find("header").css({
      "opacity": "1",
      "background-color": "#00a087",
      "color": "#e8fdff"
    });
    $(this).find("footer img").css({
      "opacity": "1"
    });
  });

  $("#tweets-container").on("mouseleave", "article", function(event) {
    $(this).find("header").css({
      "opacity": "0.7",
      "background-color": "#DCDCDC",
      "color": "#244751"
    });
    $(this).find("footer img").css({
      "opacity": "0"
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
    $("#new-tweet").slideToggle(400, function () {
      $("#writeTweet").val("");
      $(this).find(".counter").text("140");
    });
    $.flash("Your tweet has been posted!")
  });


  // Callback Ajax function to GET tweet data
  let getTweets = function () {
    $.get("/tweets", function(refreshedTweets) {
        renderTweets(refreshedTweets);
    });
  }

  //Ensures all tweets are rendered at document load
  getTweets();

  //Toggles and resets Tweet Composer
  $("#newTweetButton").on("click", function () {
    $("#new-tweet").slideToggle(400, function () {
      $("#writeTweet").focus();
    });
  });

});

