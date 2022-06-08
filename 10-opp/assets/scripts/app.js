class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // description;
  // price;

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;

    // will call the subclass method because this refers to what calls the method, and that is how we will use it
    // the constructor of the sub class will call super() but this will refer to the subclass
    // this will not refer to the Component base class
    if(shouldRender) {
      this.render();
    }
  }

  // empty render, it will be overrided in sub classes
  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId, false);  // false means do not allow super to call render
    
    this.orderProducts = () => {
      console.log('Ordering...');
      console.log(this.items);
    };

    this.render();
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  //orderProducts() {
  //  console.log('Ordering...');
  //  console.log(this.items);
  //}

  // this arrow function is set up in constructor, so that we can call render after it is created,
  //    as opposed to the super calling render which would cause an error
  //orderProducts = () => {
  //  console.log('Ordering...');
  //  console.log(this.items);
  //}

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector('button');
    //orderButton.addEventListener('click', () => this.orderProducts());  // orderProducts is a normal function
    orderButton.addEventListener('click', this.orderProducts); // orderProducts is an arrow function
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false); // false means for parent class not to render
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  // if class was not extending Component we could define the products here
  // but when ProductList extends Component, this definition here will not take place
  //   until after super is called, but super needs this data since it is calling render
  #products = [];  // # makes products private(new feature of javascript which only works in chrome right now)

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
      new Product(
        'A Pillow',
        'assets/img/pillow.jpg',
        'A soft pillow!',
        19.99
      ),
      new Product(
        'A Carpet',
        'assets/img/carpet.jpg',
        'A carpet which you might like - or not.',
        89.99
      )
    ];

    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, 'prod-list');
    }
  }

  render() {
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list')
    ]);

    if(this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart('app');
    new ProductList('app');
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
