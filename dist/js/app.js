var hz = new Horizon({
  authType: 'twitter'
});
if (!hz.hasAuthToken()) {
  $('#forbidden').show();
  $('#app').hide();
  $('#sign-in').on('click', function(e) {
    e.preventDefault();
    hz.authEndpoint('twitter').subscribe(function(endpoint) {
      window.location.pathname = endpoint;
    })
    return false;
  })
} else {
  hz.onReady(function() {
    $('#forbidden').hide();
    $('#app').show();

    var user;

    hz.currentUser().fetch().subscribe(function(user) {
      if (typeof user.nickname !== 'undefined') {
        $('#nickname-form').hide();

      } else {
        $('#nickname-form').show();
        $('#nickname-form').on('submit', function(e) {
          e.preventDefault();
          hz('users').upsert({
            id: user.id,
            nickname: $('#nickname').val()
          })
          return false;
        })
      }
    });
    $('#form').on('submit', function(e) {
      e.preventDefault();
      hz('messages').store({
        message: $('#message').val(),
        user_id: user.id
      })
      return false;
    })
  });

  hz.connect();
}