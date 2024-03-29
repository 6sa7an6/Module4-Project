const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

let products = JSON.parse(localStorage.getItem('productList'));

//function showStartEnd
let clickSearch = () => {
    document.getElementsByClassName('header__search')[0].style.display = 'block'
}
let closeSearch = () => {
    document.getElementsByClassName('header__search')[0].style.display = 'none'
}
window.onload = () => {
    let checkLoginAdmin = localStorage.getItem('adminId')
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                document.getElementsByClassName('header__right')[0].innerHTML = `
                <ul>
                <li><span onclick="clickSearch()" class="material-symbols-outlined">
                        search
                    </span></li>
                <li>Xin chào ${users[i].name}</li>
                <li>
                <div class="cart">
                <span onclick ='order()' class="material-symbols-outlined">
                shopping_bag
                </span>
                <span class="count">${users[i].count}</span>
                </div>
                </li>
                <li onclick = 'logOut()'><span class="material-symbols-outlined">
                logout
                </span></a>
                    </li>
            </ul>
                `
            }
        }
    } else if (checkLoginAdmin) {
        document.getElementsByClassName('header__right')[0].innerHTML = `
                <ul>
                <li><span onclick="clickSearch()" class="material-symbols-outlined">
                        search
                    </span></li>
                <li>Xin chào ADMIN </li>
                <li>
                <a href="../page/admin.html"><span class="material-symbols-outlined">
                person
                </span></a>
                </li>
                <li onclick = 'logOut()'><span class="material-symbols-outlined">
                logout
                </span></a>
                    </li>
            </ul>
                `
    }
}
window.onload();
let cancelPopup = () => {
    document.getElementsByClassName('popup__login')[0].style.display = 'none'
}

let addToCart = (productId) => {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    let products = JSON.parse(localStorage.getItem('productList'))
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                for (let j = 0; j < products.length; j++) {
                    if (products[j].id == productId) {
                        let result = users[i].cart.filter((item) => {
                            return item.id == productId;
                        })
                        if (result.length == 0) {
                            users[i].cart.push({ ...products[j], quantity: 1 });
                            localStorage.setItem('users', JSON.stringify(users));
                            showCount();
                        } else {
                            for (let k = 0; k < users[i].cart.length; k++) {
                                if (users[i].cart[k].id == productId) {
                                    users[i].cart[k].quantity == ++users[i].cart[k].quantity;
                                    localStorage.setItem('users', JSON.stringify(users));
                                    showCount();
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        document.getElementsByClassName('popup__login')[0].style.display = 'block';
    }
}
function debounce(func, delay) {
    let timeoutId;
  
    return function() {
      const context = this;
      const args = arguments;
  
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(function() {
        func.apply(context, args);
      }, delay);
    };
  }
let search = () => {
    let inputValue = document.getElementById('search').value;
    let result = products.filter((item) => {
        return item.name.indexOf(inputValue) != -1;
    })
    if (result.length != 0) {
        renderProducts(result);
    }
    else {
        renderProducts();
    }
}
let findItem = debounce(search,1000);
document.getElementById('search').addEventListener('keyup',findItem);
let showCount = () => {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                let count = 0;
                for (let j = 0; j < users[i].cart.length; j++) {
                    count += users[i].cart[j].quantity;
                }
                document.getElementsByClassName('count')[0].innerHTML = count;
                users[i].count = count;
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
    }
}
showCount();
let logOut = () => {
    let checkLoginAdmin = localStorage.getItem('adminId')
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        localStorage.removeItem('userId');
        popup();
        setTimeout(() => {
            updateUIAfterLogout();
        }, 2000);
    } else if (checkLoginAdmin) {
        localStorage.removeItem('adminId');
        popup();
        setTimeout(() => {
            updateUIAfterLogout();
        }, 2000);
    }
}
let updateUIAfterLogout = () => {
    document.getElementsByClassName('popup__logout')[0].style.display = 'none';
    document.getElementsByClassName('header__right')[0].innerHTML = `
        <ul>
            <li><span onclick="clickSearch()" class="material-symbols-outlined">search</span></li>
            <li><a href="../page/login.html"><span class="material-symbols-outlined">
            person
            </span></a></li>
            <li>
                <a href="../page/register.html"><span class="material-symbols-outlined">
                    how_to_reg
            </span></a>
            </li>
        </ul>
    `;
}
popup = () => {
    document.getElementsByClassName('popup__logout')[0].style.display = 'block';
}
let order = () => {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                if (users[i].role == 'active') {
                    window.location.href = '../page/cart.html'
                } else {
                    document.getElementsByClassName('popup__block')[0].style.display = 'block';
                }
            }
        }
    }
}
let cancelPopupBlock = () => {
    document.getElementsByClassName('popup__block')[0].style.display = 'none'
}
let cancelPopupLogin = () => {
    document.getElementsByClassName('popup__login')[0].style.display = 'none'
}
let contact = () => {
    document.getElementsByClassName('contact')[0].scrollIntoView();
    document.getElementsByClassName('popup__block')[0].style.display = 'none'
}
