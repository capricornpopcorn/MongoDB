$('.m-1 btn btn-danger').off('click').click(function() {
    $.ajax({
      url: '/items-api/' + $(this).parent('tr').find('.name-api').text(),
      type: 'delete',
      success: printTask,
    });
  });