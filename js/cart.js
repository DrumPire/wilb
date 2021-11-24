const cart = function() {
  const cartBtn = document.querySelector('.button-cart'),
      cart = document.getElementById('modal-cart'),
      modalClose = cart.querySelector('.modal-close'),
      goodsContainer = document.querySelector('.long-goods-list'),
      cartTable = document.querySelector('.cart-table__goods'),
      modalForm = document.querySelector('.modal-form');

  const deleteCartItem = id => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const newCart = cart.filter(good => {
      return good.id !== id;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const plusCartItem = id => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const newCart = cart.map(good => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const minusCartItem = id => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const newCart = cart.map(good => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--;
        }
      }
      return good;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const addToCart = id => {
    const goods = JSON.parse(localStorage.getItem('goods')),
          clickedGood = goods.find(good => good.id === id),
          cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    if (cart.some(good => good.id === clickedGood.id)) {
      cart.map(good => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const renderCartGoods = goods => {
    cartTable.innerHTML = '';
    goods.forEach(good => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${good.name}</td>
        <td>${good.price}$</td>
        <td><button class="cart-btn-minus"">-</button></td>
        <td>${good.count}</td>
        <td><button class=" cart-btn-plus"">+</button></td>
        <td>${+good.price * +good.count}$</td>
        <td><button class="cart-btn-delete"">x</button></td>
      `;

      cartTable.append(tr);

      tr.addEventListener('click', e => {
        if (e.target.classList.contains('cart-btn-minus')) {
          minusCartItem(good.id);
        } else if (e.target.classList.contains('cart-btn-plus')) {
          plusCartItem(good.id);
        } else if (e.target.classList.contains('cart-btn-delete')) {
          deleteCartItem(good.id);
        }
      });
    });
  };

  const openCart = () => {
    const cartArrey = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    renderCartGoods(cartArrey);

    cart.classList.add('active');
  };

  const closeCart = () => {
    cart.classList.remove('active');
  };

  if (goodsContainer) {
    goodsContainer.addEventListener('click', e => {
      if (e.target.closest('.add-to-cart')) {
        const buttonToCart = e.target.closest('.add-to-cart'),
              goodId = buttonToCart.dataset.id;

        addToCart(goodId);
      }
    });
  }

  const sendForm = () => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        cart: cart,
        name: '',
        phone: ''
      })
    }).then(() => closeCart());
  };

  modalForm.addEventListener('submit', e => {
    e.preventDefault();
    sendForm();
  });
  cartBtn.addEventListener('click', openCart);
  modalClose.addEventListener('click', closeCart);
};

cart();