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
        url: 'localhost:3000/products',
        method: 'GET',
        data: {
          length: length,
          width: width,
          height: height,
          weight: weight
        },
        success: function(data) {
          if (data.length > 0) {
            product = data[0];
            $('#productModalBody').html('Use this ' + product.name);
            $('#productModal').modal('show');
            setTimeout(function() {
              $('#productModal').modal('hide');
              $('#productName').html(product.name);
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