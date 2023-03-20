$(document).ready(function() {
    if (typeof jQuery == 'undefined') {
        console.log('jQuery is not loaded!');
      } else {
        console.log('jQuery version:', jQuery.fn.jquery);
      }
    $('#calculateBtn').click(function() {
      var length = $('#length').val();
      var width = $('#width').val();
      var height = $('#height').val();
      var weight = $('#weight').val();
  
      if (!length || !width || !height || !weight) {
        alert('Please enter all dimensions and weight');
        return;
      }
  
    var product = null;

    $.ajax({
        url: 'http://127.0.0.1:3000/find_by_dimensions',
        method: 'GET',
        data: {
          length: length,
          width: width,
          height: height,
          weight: weight
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function(data) {
          if (data.length > 0) {
            product = data;
            $('#resultMessage').html('Use this ' + product.name);
            $('#resultModal').modal('show');
            setTimeout(function() {
              $('#resultMessage').modal('hide');
              $('#resultModal').html(product.name);
            }, 5000);
          } else {
            alert('No product found for the entered dimensions and weight');
          }
        },
        error: function() {
          alert('Error in fetching data from server');
        }
      });
    });
});      