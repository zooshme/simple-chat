function init() {
  var App = document.getElementById('app');
  var conversationList = document.createElement('ol')
  conversationList.className = "conversation-list";
  App.innerHTML = conversationList;

  hz('conversations').limit(10000).watch().subscribe(function(items) {
    var conversationItems = items.map(function(item) {
      var conversationItem = document.createElement('li');
      conversationItem.className = 'conversation-item';
      conversationItem.innerHTML =
      return '<li class="conversation-item">' + item.title + '<a href="#" data-id="' + item.id + '" class="delete-button">Delete</a></li>';
    });
    conversationList.innerHTML(conversationItems);
  });

  var $Form = $('#form');

  $Form.on('submit', function(e) {
    e.preventDefault();
    hz('conversations').store({
      title: $('#title').val(),
      description: $('#description').val()
    });
    return false;
  });

  $DeleteButtons = $('.delete-button');

  $DeleteButtons.on('click', function(e) {
    e.preventDefault();
    hz('conversations').remove($(this).data('id'));
    return false;
  });

}

function isUserLoggedIn() {

}
