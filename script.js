
// Function to display data from local storage
function showData() {
    document.getElementById("balance-amount").textContent = localStorage.getItem("Total-Amount");
    document.getElementById("amount").textContent = localStorage.getItem("Total-Amount");
    var data = JSON.parse(localStorage.getItem("expenses")) || [];
    var list = document.getElementById("list");
    list.innerHTML = ""; // Clear the list before appending new items
    data.forEach(function(item) {
        list.innerHTML += `
          <div class="sublist-content">
            <p class="product">${item.productTitle}</p>
            <p class="amount">${item.userAmount}</p>
          </div>
        `;
    });
}

// Function to set the budget
function setBudget() {
    var totalAmountInput = document.getElementById("total-amount");
    var budgetError = document.getElementById("budget-error");
    var totalAmount = parseInt(totalAmountInput.value);
    if (isNaN(totalAmount) || totalAmount <= 0) {
        budgetError.classList.remove("hide");
    } else {
        budgetError.classList.add("hide");
        localStorage.setItem("Total-Amount", totalAmount);
        showData();
    }
}

// Function to add an expense
function setExpense() {
    var productTitleInput = document.getElementById("product-title");
    var userAmountInput = document.getElementById("user-amount");
    var productTitleError = document.getElementById("product-title-error");
    var productTitle = productTitleInput.value.trim();
    var userAmount = parseInt(userAmountInput.value);
    if (productTitle === "" || isNaN(userAmount) || userAmount <= 0) {
        productTitleError.classList.remove("hide");
    } else {
        productTitleError.classList.add("hide");
        var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        var expense = {
            productTitle: productTitle,
            userAmount: userAmount
        };
        expenses.push(expense);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        showData();
        productTitleInput.value = "";
        userAmountInput.value = "";
    }
}

// Event listeners for buttons
document.getElementById("total-amount-button").addEventListener("click", setBudget);
document.getElementById("check-amount").addEventListener("click", setExpense);

// Initial function call to display data from local storage
showData();

