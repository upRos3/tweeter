$(document).ready(function() {

  function renderTweets(tweets) {
    for (let obj of tweets) {
      $('#tweets-container').append(createTweetElement(obj));
    }
  }

// Creates HTML for tweets

  function createTweetElement(tweet) {

  let $tweetBox = $("<article>").addClass("tweet-box");
  let $header = $("<header>").addClass("clearfix");
  let $spanName = $("<span>").addClass('name').text(tweet.user.name);
  let $spanUser = $("<span>").addClass('username').text(tweet.user.handle);
  let $avatarImg = $("<img>").addClass('screenpic').attr('src', tweet.user.avatars.small);;

  $tweetBox.append($header);
  $header.append($avatarImg);
  $header.append($spanName);
  $header.append($spanUser);

  let $div = $("<div>");
  let $mainTweet = $("<p>").addClass("main-tweet").text(tweet.content.text);

  $tweetBox.append($div);
  $div.append($mainTweet);

  let $footer = $("<footer>");
  let $spanDate = $('<span>').addClass('time-since').text(tweet.created_at);
  let $imgLike = $('<img>').addClass('like').attr('src', 'images/vectors/heart.svg');
  let $imgReTweet = $('<img>').addClass('retweet').attr('src', 'images/vectors/retweet.svg');
  let $imgFlag = $('<img>').addClass('flag').attr('src', 'images/vectors/flag.svg');

  $tweetBox.append($footer);
  $footer.append($spanDate);
  $footer.append($imgLike);
  $footer.append($imgReTweet);
  $footer.append($imgFlag);

  return $tweetBox;

  // Need to add function to show when the tweet was made.

  }

  // Creates extra CSS for rendered elements

  $('#tweets-container').on("mouseenter", "header", function(event) {
    $(this).css({
      'opacity': '1',
      'background-color': '#00a087',
      'color': '#e8fdff'
    });
  });

  $('#tweets-container').on("mouseleave", "header", function(event) {
    $(this).css({
      'opacity': '0.7',
      'background-color': '#DCDCDC',
      'color': '#244751'
    });
  });

// Need to sort out at later date. Not a priority.

  // $('#tweets-container').on("mouseenter", "footer img", function(event) {
  //   $(this).css({
  //     'opacity': '1',
  //   });
  // });

  // $('#tweets-container').on("mouseleave", "footer img", function(event) {
  //   $(this).css({
  //     'opacity': '0.7'
  //   });
  // });

  let $button = $('#tweetButton');
  $button.on('click', function (event) {
    event.preventDefault();
    let $tweetText = $('#writeTweet');
    let tweetLen = $('#writeTweet').val().length;

// Flash messsages need CSS changed so it's seperate from scrolling.

    if (tweetLen === 0) {
      $.flash("Your tweet is empty!");
       return null;
     }

    if (tweetLen > 140) {
      $.flash("Brevity is the soul of wit");
      return null;
      }

    // Ajax to POST tweet data
    $.post("/tweets", $tweetText.serialize(), function(data, status, xhr) {
      getTweets(data);
    });
  });

  // Callback Ajax function to GET tweet data
  let getTweets = function (cb) {
    $.get('/tweets', cb, function(refreshedTweets) {
        renderTweets(refreshedTweets);
    });
  }

//BUG: Doesn't load page on first GET. Loads data fine from first tweet.

});

