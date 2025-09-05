let defaultBalance = 1000;
let enteredAmount = 0;
let isAddingAmount = true;

function showMessage(elementId, message) {
  const element = document.getElementById(elementId);
  element.innerHTML = message;
}

function pinSubmission() {
  let pin = document.getElementById("pinInput").value;
  if (pin.length !== 4) {
    showMessage("loginMessage", "Please enter 4 digit pin");
  } else if (pin.length === 4) {
    document.getElementById("atmMenu").style.display = "block";
    document.getElementById("loginScreen").style.display = "none";
  }
}

function limitInputLength(input) {
  // Prevent typing beyond 4 digits
  if (input.value.length > 4) {
    input.value = input.value.slice(0, 4); // Keep only first 4 digits
    document.getElementById("loginMessage").innerHTML =
      "ONLY 4 DIGITS ALLOWED!";
  }
}

function logoutFn() {
  document.getElementById("atmMenu").style.display = "none";
  document.getElementById("loginScreen").style.display = "block";
  document.getElementById("pinInput").value = "";
  showMessage("atmMessage", "");
  location.reload();
}

function checkBalance() {
  showMessage("atmMessage", `Current Balance is : ${defaultBalance}`);
}

function openEntAmtPanel() {
  document.getElementById("enterAmount").style.display = "block";
  document.getElementById("cancelBtn").style.display = "inline";
  document.getElementById("add_withdraw_btn").style.display = "inline";
}

function openForAddAmt() {
  openEntAmtPanel();
  showMessage("add_withdraw_btn", "Add Amount");
  document.getElementById("depositBtn").style.display = "none";
  document.getElementById("withdrawBtn").style.display = "inline";
  isAddingAmount = true;
}

function openForwithdrawAmt() {
  openEntAmtPanel();
  showMessage("add_withdraw_btn", "Withdraw Amount");
  document.getElementById("withdrawBtn").style.display = "none";
  document.getElementById("depositBtn").style.display = "inline";
  isAddingAmount = false;
}

function closeEntAmtPanel() {
  document.getElementById("enterAmount").style.display = "none";
  document.getElementById("cancelBtn").style.display = "none";
  document.getElementById("withdrawBtn").style.display = "inline";
  document.getElementById("add_withdraw_btn").style.display = "none";
  document.getElementById("depositBtn").style.display = "inline";
  showMessage("atmMessage", "");
}

function amountChangingProcess() {
  enteredAmount = Number(document.getElementById("enterAmount").value);
  if (enteredAmount === 0 || enteredAmount.length === 0) {
    showMessage("atmMessage", "Please enter valid amount first");
    return;
  } else {
    document.getElementById("enterAmount").value = "";

    function updateAddAmt() {
      defaultBalance = defaultBalance + enteredAmount;
      document.getElementById("enterAmount").placeholder =
        "Amount successfully added!";
      checkBalance();
    }

    function updateWithdrawAmt() {
      if (defaultBalance >= enteredAmount) {
        defaultBalance = defaultBalance - enteredAmount;
        document.getElementById("enterAmount").placeholder =
          "Amount successfully withdraw!";
        checkBalance();
      } else {
        showMessage("atmMessage", "Hey! You don't have sufficient balance");
      }
    }

    if (!isAddingAmount) {
      updateWithdrawAmt();
    } else {
      updateAddAmt();
    }

    setTimeout(() => {
      document.getElementById("enterAmount").placeholder =
        "Enter the amount here...";
    }, 3000);
  }
}
