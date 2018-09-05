/* eslint-disable */
import $ from 'jquery';
let totalcartamt=0;
var count=0;
let mincarttotal = 200;
if($('[data-mincarttotal]').length){
  mincarttotal = parseFloat($.trim($('[data-mincarttotal]').data('mincarttotal')));
}
$('a[href="/checkout.php"], .checkoutMultiple, .cart-additionalCheckoutButtons').hide();

var cname = 'Novelty';
if($('[data-cname]').length){
  cname = $.trim($('[data-cname]').data('cname'));
}

$(document).ajaxStop(function(){
  if(totalcartamt < mincarttotal && count != 0){
    $('.custom-cart').removeClass('CheckingCart');
    if(!document.querySelectorAll('.checkout-alert').length) {
     let div = document.createElement('div');
     //div.innerHTML = `Items in cart must be total of $${orderAmount} or more in order to checkout`;
     div.innerHTML = '<div class="alertBox alertBox--info"><div class="alertBox-column alertBox-icon"><icon glyph="ic-success" class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg></icon></div><p class="alertBox-column alertBox-message"><span>Minimum order of $'+mincarttotal+' is required for one or more items in your cart.</span></p></div>';
     div.className = 'checkout-alert';

     $(div).insertBefore('[data-cart-content]');
    }

    $('.checkout-alert').fadeIn();
    $('a[href="/checkout.php"],.checkoutMultiple,.cart-additionalCheckoutButtons').hide();
    $('a[href="/checkout.php"],.checkoutMultiple,.cart-additionalCheckoutButtons').css("pointer-events","none");
  } else {
      $('.custom-cart').removeClass('CheckingCart');
    $('.checkout-alert').fadeOut();
    $('a[href="/checkout.php"],.checkoutMultiple,.cart-additionalCheckoutButtons').show();
    $('a[href="/checkout.php"],.checkoutMultiple,.cart-additionalCheckoutButtons').css("pointer-events","auto");
  }
});
export default class minorderClass{
  constructor() {
     this.minmumordercheck();
}
 minmumordercheck(){
    if($('body.type-cart').length){
count=0;
totalcartamt=0;
//$('#cart-preview-dropdown ul.previewCartList > li').each(function(){
$('[data-cart-content] table.cart > tbody > tr').each(function(){
  if(totalcartamt <= mincarttotal){
  //var purl = $(this).find('.previewCartItem-name a').attr('href');
  var purl = $(this).find('.cart-item-name a').attr('href');
  let item = this;
  $.ajax({
      url: purl,
      type: "GET",
      async: true,
      success: function(data) {
        let checkoutcatnm = $.trim($(data).find('.catname').text());
        if(checkoutcatnm!=cname){
          console.log(cname);
          totalcartamt +=parseFloat($(item).find('.cartitemTotal').data('pprice'));
          count++;
        } else {

        }


      },
      complete: function() {


      }

  });

} else {
  return false;
}
});

}
}






};
/* eslint-enable */
