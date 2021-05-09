
let list;
let listAdd;
let itemCount;
let totalPrice;

let email = sessionStorage.getItem('email'); //gets the users email from sessionStorage

getCart(email);

function getCart($email) {
    $.ajax({
        url: Url + 'GetCart',
        type: 'get',
        dataType: 'json',
        data: {"email":$email},
        contentType: 'text/plain',
        success: function (data) {

            list = '';
            listAdd = '';
            itemCount = 0;
            totalPrice = 0;

            $.each(data['data']['List'], function (i, item) {
                listAdd = '<div class="row main align-items-center">\n' +
                    '                        <div class="col-2"><img class="img-fluid" src="' + item['image'] + '"></div>\n' +
                    '                        <div class="col">\n' +
                    '                            <div class="row text-muted">' + item['operating_system'] + '</div>\n' +
                    '                            <div class="row">' + item['title'] + '</div>\n' +
                    '                        </div>\n' +
                    '                        <div class="col"> <a class="border">1</a></div>\n' +
                    '                        <div class="col">&dollar; ' + item['money_price'] + ' <a onclick="deleteItem(' + item['id'] + ')" type="button">&#10005;</a></div>\n' +
                    '                    </div>';
                list = list + listAdd;
                itemCount++;
                totalPrice += parseInt(item['money_price']);
            });

            $('#cart-list').html(list);
            $('#item-count').html(itemCount + ' items');
            $('#item-total').html(itemCount + ' items');
            $('#item-price').html('&dollar; ' + totalPrice);

        },
        error: function (data) {
            alert("Error while fetching data.");
        }
    });
}

function deleteItem($id) {

    let email =$.trim($('#email').val());

    $.ajax({
        url: Url+'Cart/' + $id, //API url
        type: 'delete', //type of request (get)
        dataType: 'json', //dataType, which is json for this lab.
        data: JSON.stringify({'product_id':$id, 'email':email}), //data to be sent
        contentType: 'text/plain', //contentType, which is text/plain since json is sent as plain text.
       success: function(){
           alert('Product was deleted from cart');
       },
       error: function(){
           alert('Product was not deleted from cart');
       }
      
    });
}

function checkOut() {

    let email =$.trim($('#email').val());

    $.ajax({
        url: Url+'Cart', //API url
        type: 'put', //type of request (get)
        dataType: 'json', //dataType, which is json for this lab.
        data: JSON.stringify({ 'email':email}), //data to be sent
        contentType: 'text/plain', //contentType, which is text/plain since json is sent as plain text.
       success: function(){
           alert('Checkout complete');
       },
       error: function(){
           alert('Error');
       }
      
    });

}

//let email = sessionStorage.getItem('email'); //gets the users email from sessionStorage

function deleteAll($email) {


    $.ajax({
        url: Url+'Cart', //API url
        type: 'delete', //type of request (get)
        dataType: 'json', //dataType, which is json for this lab.
        data: JSON.stringify({'email':$email}), //data to be sent
        contentType: 'text/plain', //contentType, which is text/plain since json is sent as plain text.
       success: function(){
           alert('Product was deleted from cart');
       },
       error: function(){
           alert('Product was not deleted from cart');
       }
      
    });
}




