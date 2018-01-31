/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
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
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function renderTweets(tweets) {
    for (let obj of tweets) {
      $('#tweets-container').append(createTweetElement(obj));
    }
  }

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

  let getTweets = function (cb) {
    $.get('/tweets', data, function(refreshedTweets){
        renderTweets(refreshedTweets);
    });
  }


  let $button = $('#tweetButton');
  $button.on('click', function (event) {
    event.preventDefault();
    let $tweetText = $('#writeTweet').serialize()
    //first post then get
    $.post("/tweets", $tweetText, function(data, status, xhr) {
      getTweets(data);
    });
  });


});

