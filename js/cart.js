const cart = function() {
  const cartBtn = document.querySelector('.button-cart'),
      cart = document.getElementById('modal-cart'),
      modalClose = cart.querySelector('.modal-close');

  const openCart = () => {
    cart.classList.add('active');
  };

  const closeCart = () => {
    cart.classList.remove('active');
  };

  cartBtn.addEventListener('click', openCart);
  modalClose.addEventListener('click', closeCart);
};

cart();