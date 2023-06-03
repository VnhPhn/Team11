const addToCartButtons = document.getElementsByClassName('add-to-cart-button');
const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartButton = document.getElementById('close-cart');
const cartItemsElement = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let itemCount = 0;
let totalPrice = 0;

// Xử lý sự kiện khi click nút "Thêm vào giỏ hàng"
for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener('click', () => {
    const product = addToCartButtons[i].parentNode;
    const productName = product.querySelector('h3').innerText;
    const productPriceElement = product.querySelector('.price');
    const productPriceText = productPriceElement.childNodes[0].textContent;
    const productPrice = parseFloat(productPriceText.replace(/[^\d.]/g, ''));

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingCartItem = orderItems.find(item => item.name === productName);
    if (existingCartItem) {
      return; // Đã tồn tại sản phẩm, không thêm lại vào giỏ hàng
    }

    itemCount++;
    cartCount.innerText = itemCount;

    totalPrice += productPrice;

    const cartItem = document.createElement('li');
    cartItem.setAttribute('data-name', productName);
    updateCartItemPrice(cartItem, productPrice);
    cartItemsElement.appendChild(cartItem);

    updateCartTotal();
  });
}

// Xử lý sự kiện khi click nút giỏ hàng
cartButton.addEventListener('click', () => {
  cartOverlay.style.display = 'flex';
});

// Xử lý sự kiện khi click nút đóng giỏ hàng
closeCartButton.addEventListener('click', () => {
  cartOverlay.style.display = 'none';
});

// Cập nhật tổng tiền trong giỏ hàng
function updateCartTotal() {
  cartTotal.innerText = `Tổng tiền: ${formatNumber(totalPrice.toFixed(0)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}đ`;
}

// Định dạng số với dấu chấm hàng trăm
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Cập nhật giá tiền sản phẩm trong giỏ hàng
function updateCartItemPrice(cartItem, productPrice) {
  cartItem.innerText = `${productName} - ${formatNumber(productPrice.toFixed(0))}đ`;
}

// Xử lý sự kiện khi click nút "Đặt hàng"
const orderButtons = document.getElementsByClassName('add-to-cart-button');

for (let i = 0; i < orderButtons.length; i++) {
    orderButtons[i].addEventListener('click', () => {
        const product = orderButtons[i].parentNode;
        const productName = product.querySelector('h2').innerText;
        const productPrice = parseFloat(product.querySelector('.price').innerText.replace('đ', '').replace('.', ''));

        const cartItem = document.createElement('li');
        cartItem.innerText = `${productName} - ${productPrice}đ`;
        cartItemsElement.appendChild(cartItem);

        itemCount++;
        cartCount.innerText = itemCount;

        totalPrice += productPrice;
        updateCartTotal();
    });
}

// Lấy danh sách sản phẩm trong giỏ hàng từ Local Storage (nếu có)
let orderItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Hàm hiển thị giỏ hàng
function displayCart() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";

  // Hiển thị sản phẩm trong giỏ hàng
  orderItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price}</span>
      <button class="remove-item" data-id="${item.id}">Xoá</button>
    `;
    cartItemsElement.appendChild(listItem);
  });

  // Hiển thị thông báo khi giỏ hàng rỗng
  const emptyCartMessage = document.getElementById("empty-cart-message");
  if (orderItems.length === 0) {
    emptyCartMessage.style.display = "block";
  } else {
    emptyCartMessage.style.display = "none";
  }

  // Tính tổng tiền
  const totalPriceElement = document.getElementById("total-price");
  const totalPrice = orderItems.reduce((total, item) => total + item.price, 0);
  totalPriceElement.textContent = "$" + totalPrice;

  // Bắt sự kiện click nút "Xoá"
  const removeButtons = document.getElementsByClassName("remove-item");
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", removeItem);
  }
}

// Xoá sản phẩm khỏi giỏ hàng
function removeItem(event) {
  const itemId = event.target.dataset.id;
  orderItems = orderItems.filter((item) => item.id !== itemId);
  localStorage.setItem("cartItems", JSON.stringify(orderItems));
  displayCart();
}

// Hiển thị giỏ hàng khi tải trang
displayCart();


