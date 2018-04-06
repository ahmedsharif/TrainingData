//var current_url = window.location.href;
//if (current_url == "http://127.0.0.1:8000/logout_user/") {
//  localStorage.clear();
//}

var AlbumsListPage = {
  init: function() {
    this.$container = $(".albums-container");
    this.render();
    this.bindEvents();
  },

  render: function() {},

  bindEvents: function() {
    $(".btn-favorite", this.$container).on("click", function(e) {
      e.preventDefault();

      var self = $(this);
      var url = $(this).attr("href");
      $.getJSON(url, function(result) {
        if (result.success) {
          $(".glyphicon-star", self).toggleClass("active");
        }
      });

      return false;
    });
  }
};

var SongsListPage = {
  init: function() {
    this.$container = $(".songs-container");
    this.render();
    this.bindEvents();
  },

  render: function() {},

  bindEvents: function() {
    $(".btn-favorite", this.$container).on("click", function(e) {
      e.preventDefault();

      var self = $(this);
      var url = $(this).attr("href");
      $.getJSON(url, function(result) {
        if (result.success) {
          $(".glyphicon-star", self).toggleClass("active");
        }
      });

      return false;
    });
  }
};

$(document).ready(function() {
  AlbumsListPage.init();
  SongsListPage.init();
});

/*
var error_response = function(data) {
  $(".api-response").html(
    "API Response: " +
      data.status +
      " " +
      data.statusText +
      "<br/>Content: " +
      data.responseText
  );
};
var susccess_response = function(data) {
  $(".api-response").html(
    "API Response: OK<br/>Content: " + JSON.stringify(data)
  );
};


$(document).ready(function() {
  $("form.ajax-post button[type=submit]").click(function() {
    var form = $("form.ajax-post");
    $.post(form.attr("action"), form.serialize())
      .fail(function(data) {
        error_response(data);
      })
      .done(function(data) {
        susccess_response(data);
      });
    return false;
  });
});
*/