const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link');
  

  const getData = () => {
    fetch('https://test-ec323-default-rtdb.europe-west1.firebasedatabase.app/db.json')
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('goods', JSON.stringify(data));
        const goods = JSON.parse(localStorage.getItem('goods'));
        console.log(goods);
      });
  };

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      getData();
    });
  });

};

getGoods();