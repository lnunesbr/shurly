function performCommand(event) {
  if (event.command === "shurlyShortenButton") {
    var reqUrl = safari.extension.settings.shurlyUrl + '?q=shurly/api/shorten&longUrl=' + escape(event.target.browserWindow.activeTab.url);
    if (safari.extension.settings.shurlyKey) {
      reqUrl += '&apiKey=' + safari.extension.settings.shurlyKey;
    }
    $.ajax({
      type: "GET",
      url: reqUrl,
      dataType: "json",
      success: shurlyDisplay,
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('An error has occurred while trying to contact the URL shortening site.');
      }
    });
  }
}

function validateCommand(event) {
  if (event.command === "shurlyShortenButton") {
    event.target.disabled = !event.target.browserWindow.activeTab.url;
  }
}

function shurlyDisplay(data){
  if (typeof data == 'object') {
    // if the returned data has a user id AND this user doesn't have an API key, get one
    if (data['user'] && !safari.extension.settings.shurlyKey) {
      shurlyGetKey();
    }
    if (data['success']) {
      if (data['user']) {
        message = 'Your short URL for this page is:';
      }
      else {
        message = 'The short URL for this page is:';
      }
      // remember prompt() will pause the script
      prompt(message, data['shortUrl']);
    }
    else {
      alert(data['error']);
    }
  }
  else {
    alert('An unknown error has occurred.');
  }
}

function shurlyGetKey() {
  var reqUrl = safari.extension.settings.shurlyUrl + '?q=shurly/api/key';
  $.ajax({
    type: "GET",
    url: reqUrl,
    dataType: "json",
    success: shurlyGetKeyParse,
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      // no errors please
    }
  });
}

function shurlyGetKeyParse(data) {
  if (typeof data == 'object' && data['success']) {
    safari.extension.settings.shurlyKey = data['key'];
  }
}

safari.application.addEventListener("command", performCommand, false);
safari.application.addEventListener("validate", validateCommand, false);
