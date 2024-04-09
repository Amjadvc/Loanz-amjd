const submitFrom = document.querySelector("#form");
submitFrom.addEventListener("submit", function (e) {
  e.preventDefault();
});

// moveFromOneStepTwoAnother
const formSteps = [...submitFrom.querySelectorAll("[data-step]")];

let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains("flex");
});

function showCurrentStep(methode) {
  methode === "plus" ? (currentStep += 1) : (currentStep -= 1);
  let dirction = "";
  dirction = methode === "plus" ? "next" : "back";
  formSteps.forEach((step, index) => {
    if (index === currentStep) {
      step.classList.remove("hidden");
      step.classList.add("flex");

      if (dirction === "back") {
        step.classList.add("animate-slide-prev");
      } else {
        step.classList.add("animate-slide-next");
      }
      // console.log(dirction);

      setTimeout(() => {
        step.classList.remove("animate-slide-prev", "animate-slide-next");
      }, 500);
    } else {
      step.classList.remove("flex");
      step.classList.add("hidden");
    }
  });

  updateProgressBar();
}

///Hedaer

const previousBtn = document.querySelector("[ data-previous]");

previousBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    showCurrentStep("minus");
  }
});

const progress = document.querySelector("[ data-progress]");
const progressTracker = document.querySelector("[ data-progress-tracker]");

const totalSteps = formSteps.length - 1;
const stepWidth = 100 / totalSteps;

function updateProgressBar() {
  const progressWidth = stepWidth * currentStep;
  const trackerPosition = `calc(${stepWidth * currentStep}% - 0.1rem)`;

  progress.style.cssText = `width: ${progressWidth}%; transition:0.3s ease-in-out`;
  progressTracker.style.cssText = `left:${trackerPosition}; transition:0.3s ease-in-out  `;
}

// Start Step1
const rangeValue = document.querySelector("#rangeValue");
const rangeInput = document.querySelector(".range");

const showRangedata = document.querySelector('[data-show="rangeBtn"]');
// console.log(showRangedata);

const rageBtnData = [
  { 100: "$100" },
  { 250: "$250" },
  { 500: "$500" },
  { 750: "$750" },
  { 1000: "$1000" },
  { 1500: "$1,500" },
  { 2500: "$2,500" },
  { 5000: "$5,000" },
  { 7500: "$7,500" },
  { 10000: "$10,000" },
];

rageBtnData.map((btn) => {
  [[dataValue, outValue]] = Object.entries(btn);
  // console.log(dataValue);
  // console.log(outValue);
  const btnRange = document.createElement("button");
  btnRange.setAttribute("data-value", dataValue);
  btnRange.setAttribute("data-target", "rangeAmount");
  btnRange.type = "button";
  btnRange.classList.add(
    "rounded-xs",
    "p-4",
    "bg-white",
    "w-full",
    "border",
    "border-1",
    "border-blue-200",
    "text-gray-900",
    "text-xl",
    "shadow-sm",
    "scale-95",
    "hover:scale-100",
    "hover:bg-blue-500",
    "hover:text-white",
    "transition",
    "ease-in-out",
    "duration-200"
  );
  btnRange.textContent = outValue;
  showRangedata.appendChild(btnRange);
});

const buttonsRangeInput = document.querySelectorAll(
  '[data-target="rangeAmount"]'
);

function formatNumberWithCommas(number) {
  return parseInt(number).toLocaleString();
}

function updateRangeValue(value) {
  rangeInput.value = value;
  rangeValue.textContent = formatNumberWithCommas(value);
}

rangeInput.addEventListener("input", function () {
  updateRangeValue(rangeInput.value);
});

buttonsRangeInput.forEach((button) => {
  button.addEventListener("click", (e) => {
    showCurrentStep("plus");

    e.preventDefault();
    const dataValue = button.getAttribute("data-value");
    updateRangeValue(dataValue);

    buttonsRangeInput.forEach((btn) => {
      if (btn === button) {
        btn.classList.remove("bg-white", "text-gray-900");
        btn.classList.add("bg-blue-500", "text-white");
      } else {
        btn.classList.remove("bg-blue-500", "text-white");
        btn.classList.add("bg-white", "text-gray-900");
      }
    });
  });
});

const stepOne = document.querySelector("#step1");
const stepOneBtn = stepOne.querySelector("[data-next]");

stepOneBtn.addEventListener("click", function () {
  showCurrentStep("plus");
});

// End Step1

// Start Step2

const stepTwo = document.querySelector("#step2");
const summitButton = stepTwo.querySelector("[data-next]");

const firstNameInp = document.querySelector("#firstName");
const lastNameInp = document.querySelector("#lastName");

summitButton.addEventListener("click", function () {
  if (validateStepTwoInputs()) {
    showCurrentStep("plus");
  }

  firstNameInp.addEventListener("input", validateStepTwoInputs);
  lastNameInp.addEventListener("input", validateStepTwoInputs);
});

const setError = (element, message, placeholder) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('[error="error"]');

  // console.log(errorDisplay);
  errorDisplay.innerText = message;
  element.setAttribute("placeholder", placeholder);
  element.classList.remove("border-gray-400");
  element.classList.add("bg-pink-100", "border-rose-300");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('[error="error"]');
  errorDisplay.innerText = "";
  element.classList.remove("bg-pink-100", "border-rose-300");
  element.classList.add("bg-white", "border-gray-400");
};

const validateStepTwoInputs = () => {
  let isValid = true;

  const firstNameValue = firstNameInp.value.trim();
  const lastNameValue = lastNameInp.value.trim();

  if (firstNameValue === "" || firstNameValue.length < 2) {
    setError(firstNameInp, "First name is requird.", "First Name");
    isValid = false;
  } else {
    setSuccess(firstNameInp);
  }

  if (lastNameValue === "") {
    setError(lastNameInp, "Last name is requird.", "Last Name");
    isValid = false;
  } else {
    setSuccess(lastNameInp);
  }

  return isValid;
};

// End Step2

// start step3

const stepThree = document.querySelector("#step3");
const summitButtontwo = stepThree.querySelector("[data-next]");
const emailAddressInp = document.querySelector("#emailAddress");
const phoneNumberInp = document.querySelector("#phoneNumber");
const checkBoxInp = document.querySelector("#checkBox");
const errorCheckVisabel = document.querySelector("#errorChek");
const errorCheckMessage = document.querySelector("#errorChekMessage");

phoneNumberInp.addEventListener("input", formatPhoneNumber);

function formatPhoneNumber() {
  let input = phoneNumberInp.value.replace(/\D/g, "");
  let formattedNumber = "";

  formattedNumber = input.length > 0 ? "(" + input.slice(0, 3) : "";
  formattedNumber += input.length > 3 ? ") " + input.slice(3, 6) : "";
  formattedNumber += input.length > 6 ? "-" + input.slice(6, 10) : "";

  phoneNumberInp.value = formattedNumber;
}

summitButtontwo.addEventListener("click", function () {
  if (validiteStepThreeInp()) {
    showCurrentStep("plus");
  }

  emailAddressInp.addEventListener("input", validiteStepThreeInp);
  phoneNumberInp.addEventListener("input", validiteStepThreeInp);
  checkBoxInp.addEventListener("click", validiteStepThreeInp);
});

const setError2 = (element, message, placeholder) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector("#error");

  errorDisplay.innerText = message;
  element.setAttribute("placeholder", placeholder);
  element.classList.remove("border-gray-400");
  element.classList.add("bg-pink-100", "border-rose-300");
};

const setSuccess2 = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector("#error");
  errorDisplay.innerText = "";
  element.classList.remove("bg-pink-100", "border-rose-300");
  element.classList.add("bg-white", "border-gray-400");
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
};

const validiteStepThreeInp = () => {
  let isValid = true;

  const emailAddressInpValue = emailAddressInp.value.trim();
  const phoneNumberInpValue = phoneNumberInp.value.trim().replace(/\D/g, "");

  if (emailAddressInpValue === "") {
    setError2(emailAddressInp, " Email Address is requird.", "Email");
    isValid = false;
  } else if (!isValidEmail(emailAddressInpValue)) {
    setError2(emailAddressInp, "Please enter a valid email.", "Email");
    isValid = false;
  } else {
    setSuccess2(emailAddressInp);
  }

  if (phoneNumberInpValue === "") {
    setError2(phoneNumberInp, "Phone number is requird.", "Phone");
    isValid = false;
  } else if (!isValidPhoneNumber(phoneNumberInpValue)) {
    setError2(phoneNumberInp, "Please enter a valid phone number.", "Phone");
    isValid = false;
  } else {
    setSuccess2(phoneNumberInp);
  }

  if (checkBoxInp.checked === false) {
    errorCheckVisabel.classList.remove("hidden");
    errorCheckVisabel.classList.add("flex");

    errorCheckMessage.classList.remove("hidden");
    errorCheckMessage.classList.add("block");
    isValid = false;
  } else {
    errorCheckVisabel.classList.remove("flex");
    errorCheckVisabel.classList.add("hidden");

    errorCheckMessage.classList.remove("block");
    errorCheckMessage.classList.add("hidden");
  }

  return isValid;
};

// End step3

// Start step4
const stateSelect = document.querySelector("#state");

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maryland",
  "Missouri",
  "New Hampshire",
  "Ohio",
  "Rhode Island",
  "Syria",
  "Tennessee",
  "Virginia",
  "Washington",
];

const options = states.map((state) => {
  const option = document.createElement("option");
  option.value = state.slice(0, 2);
  option.textContent = state;
  return option;
});

options.forEach((option) => {
  stateSelect.appendChild(option);
});

const stepFoure = document.querySelector("#step4");
const summitButtonFoure = stepFoure.querySelector("[data-next]");
const streetAddressInp = document.querySelector("#streetAddress");
const cityInp = document.querySelector("#city");
const zipInp = document.querySelector("#zip");

summitButtonFoure.addEventListener("click", function () {
  if (validiteStepFoureInp()) {
    showCurrentStep("plus");
  }

  streetAddressInp.addEventListener("input", validiteStepFoureInp);
  cityInp.addEventListener("input", validiteStepFoureInp);
  zipInp.addEventListener("input", validiteStepFoureInp);
});

const setErrorFoure = (element, message, placeholder) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('[data-error="address"]');

  errorDisplay.innerText = message;
  element.setAttribute("placeholder", placeholder);
  element.classList.remove("border-gray-400");
  element.classList.add("bg-pink-100", "border-rose-300");
};

const setSuccessFoure = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('[data-error="address"]');
  errorDisplay.innerText = "";
  element.classList.remove("bg-pink-100", "border-rose-300");
  element.classList.add("bg-white", "border-gray-400");
};

const validiteStepFoureInp = () => {
  let isValid = true;

  const streetAddressInpValue = streetAddressInp.value.trim();
  const cityInpValue = cityInp.value.trim();
  const zipInpValue = zipInp.value.trim();

  if (streetAddressInpValue === "" || streetAddressInpValue.length < 4) {
    setErrorFoure(
      streetAddressInp,
      "This field is required. PO Box addresses not allowed.",
      "Street Address"
    );
    isValid = false;
  } else {
    setSuccessFoure(streetAddressInp);
  }

  if (cityInpValue === "" || cityInpValue.length < 4) {
    setErrorFoure(cityInp, "This field is required.", "City");
    isValid = false;
  } else {
    setSuccessFoure(cityInp);
  }

  if (zipInpValue === "" || zipInpValue.length < 4) {
    setErrorFoure(zipInp, "This field is required.", "Zip Code");
    isValid = false;
  } else {
    setSuccessFoure(zipInp);
  }

  return isValid;
};

// End step4

// Start step5

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthsContainer = document.querySelector(".monthsContainer");
const daysContainer = document.querySelector(".daysContainer");
const yearsContainer = document.querySelector(".yearsContainer");
const btnMonth = document.getElementById("btn_month");
const btnDay = document.getElementById("btn_day");
const btnYear = document.getElementById("btn_year");
const btnRest = document.getElementById("btn_reset");

months.map((month, i) => {
  const monthValue = `${i + 1 < 10 ? "0" + (i + 1) : i + 1}`;

  const monthBtn = document.createElement("button");
  monthBtn.innerText = month;
  monthBtn.value = monthValue;
  monthBtn.setAttribute("data-value", monthValue);
  monthBtn.setAttribute("data-target", "month");
  monthBtn.classList.add(
    "border",
    "border-1",
    "border-gray-400",
    "rounded-md",
    "py-2",
    "text-lg",
    "bg-white",
    "hover:bg-blue-500",
    "hover:border-blue-500",
    "hover:text-white",
    "transition",
    "ease-in-out",
    "duration-300"
  );

  monthsContainer.appendChild(monthBtn);
});
const monthesBtns = document.querySelectorAll('[data-target="month"]');

//function to greate a days form selected month
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

Array.from(monthesBtns).map((btn, i) => {
  btn.addEventListener("click", function () {
    const monthDataValue = btn.dataset.value;
    btnMonth.innerHTML = monthDataValue;

    btnMonth.classList.remove("text-blue-500");
    btnMonth.classList.add("text-gray-700");
    btnDay.classList.remove("text-gray-700");
    btnDay.classList.add("text-blue-500");

    monthsContainer.classList.remove("grid");
    monthsContainer.classList.add("hidden");
    daysContainer.classList.remove("hidden");
    daysContainer.classList.add("grid");

    const numDaysOfMonth = getDaysInMonth(2000, i + 1);
    const arrayOfDays = Array(numDaysOfMonth)
      .fill()
      .map((_, i) => i + 1);

    greateDays(arrayOfDays);

    checkDate();
  });
});

function greateInitialDays() {
  const arra = generateNubers(1, 31).reverse();

  greateDays(arra);
}
greateInitialDays();

///days
function greateDays(numDays) {
  daysContainer.textContent = "";

  numDays.map((day, i) => {
    const dayValue = `${i + 1 < 10 ? "0" + (i + 1) : i + 1}`;
    const dayBtn = document.createElement("button");

    dayBtn.innerText = day;
    dayBtn.value = dayValue;
    dayBtn.setAttribute("data-value", dayValue);
    dayBtn.setAttribute("data-target", "day");

    dayBtn.classList.add(
      "border",
      "border-1",
      "border-gray-400",
      "rounded-md",
      "py-2",
      "text-lg",
      "bg-white",
      "hover:bg-blue-500",
      "hover:border-blue-500",
      "hover:text-white",
      "transition",
      "ease-in-out",
      "duration-300"
    );
    daysContainer.appendChild(dayBtn);
  });
  const daysBtns = document.querySelectorAll('[data-target="day"]');

  handelClickonDayBtn(daysBtns);
}

function handelClickonDayBtn(daysBtns) {
  Array.from(daysBtns).map((btn, i) => {
    btn.addEventListener("click", function () {
      const dayDataValue = btn.dataset.value;
      btnDay.innerHTML = dayDataValue;

      btnDay.classList.remove("text-blue-500");
      btnDay.classList.add("text-gray-700");

      btnYear.classList.remove("text-gray-700");
      btnYear.classList.add("text-blue-500");

      daysContainer.classList.remove("grid");
      daysContainer.classList.add("hidden");

      yearsContainer.classList.remove("hidden");
      yearsContainer.classList.add("grid");

      checkDate();
    });
  });
}

///
let firstYearsShow = document.getElementById("firstYears");
let secondYearsShow = document.getElementById("secondYears");
let years_options = document.getElementById("years_options");

function handelMoreOpt() {
  years_options.addEventListener("click", () => {
    years_options.classList.add("hidden");
    secondYearsShow.classList.remove("hidden");
    secondYearsShow.classList.add("grid");
  });
}
handelMoreOpt();

function generateYears(element, from, to) {
  const RangYears = generateNubers(from, to);
  RangYears.map((year) => {
    const yearBtn = document.createElement("button");
    yearBtn.innerText = year;
    yearBtn.type = "button";
    yearBtn.value = year;
    yearBtn.classList.add(
      "button-year",
      "border",
      "border-1",
      "border-gray-400",
      "rounded-md",
      "py-2",
      "text-md",
      "bg-white",
      "hover:bg-blue-500",
      "hover:border-blue-500",
      "hover:text-white",
      "transition",
      "ease-in-out",
      "duration-300"
    );
    element.appendChild(yearBtn);
    handelClickedButton(yearBtn);
  });
}

function generateNubers(a, b) {
  let min = Math.min(a, b);
  let max = Math.max(a, b);
  let arr = [];
  for (let i = max; i >= min; i--) {
    arr.push(i);
  }
  return arr;
}

function showFirstYears() {
  generateYears(firstYearsShow, 2006, 1962);
}
function showSecondYears() {
  generateYears(secondYearsShow, 1961, 1917);
}

showFirstYears();
showSecondYears();

function handelClickedButton(allYearsBtn) {
  allYearsBtn.addEventListener("click", (e) => {
    btnYear.innerHTML = e.target.value;

    btnYear.classList.remove("text-blue-500");
    btnYear.classList.add("text-gray-700");

    yearsContainer.classList.remove("flex");
    yearsContainer.classList.add("hidden");

    checkDate();
  });
}

///move from one btn to another

// Function to handle button clicks
function handleBtnClick(e, containers) {
  const clickedBtn = e.target;
  containers.forEach((container) => {
    if (clickedBtn.id === container.id) {
      clickedBtn.classList.remove("text-gray-700");
      clickedBtn.classList.add("text-blue-500");
    } else {
      container.classList.remove("text-blue-500");
      container.classList.add("text-gray-700");
    }
  });
}

// Function to toggle visibility of data containers
function toggleContainerVisibility(containerToShow, containersToHide) {
  containersToHide.forEach((container) => {
    container.classList.remove("grid");
    container.classList.add("hidden");
  });
  containerToShow.classList.remove("hidden");
  containerToShow.classList.add("grid");
}

//Function to Rest
function resetButtonsAndContainers() {
  btnMonth.textContent = "MM";
  btnDay.textContent = "DD";
  btnYear.textContent = "YYYY";

  btnMonth.classList.remove("text-gray-700");
  btnMonth.classList.add("text-blue-500");

  const btnsArray = [btnDay, btnYear];
  btnsArray.forEach((btn) => {
    btn.classList.remove("text-blue-500");
    btn.classList.add("text-gray-700");
  });

  // Reset container visibility
  toggleContainerVisibility(monthsContainer, [daysContainer, yearsContainer]);

  //rest button
  dateNext.classList.add("opacity-30");
  dateNext.setAttribute("disabled", "disabled");
}

// Event listeners for button clicks
btnMonth.addEventListener("click", function (e) {
  handleBtnClick(e, [btnMonth, btnDay, btnYear]);
  toggleContainerVisibility(monthsContainer, [daysContainer, yearsContainer]);
});

btnDay.addEventListener("click", function (e) {
  handleBtnClick(e, [btnMonth, btnDay, btnYear]);
  toggleContainerVisibility(daysContainer, [monthsContainer, yearsContainer]);
});

btnYear.addEventListener("click", function (e) {
  handleBtnClick(e, [btnMonth, btnDay, btnYear]);
  toggleContainerVisibility(yearsContainer, [monthsContainer, daysContainer]);
});

btnRest.addEventListener("click", resetButtonsAndContainers);

////////btton ckeck if empty
const stepFive = document.querySelector("#step5");
const dateNext = stepFive.querySelector("[data-next]");
// console.log(dateNext);

function checkDate() {
  const date = [btnMonth, btnDay, btnYear];
  const trueEle = date.filter((i) => {
    return !isNaN(parseInt(i.textContent.trim()));
  });
  if (trueEle.length === 3) {
    dateNext.classList.remove("opacity-30");
    dateNext.removeAttribute("disabled");
  }
}
dateNext.addEventListener("click", function () {
  showCurrentStep("plus");
});
// End step5

function nextAction(btns) {
  Array.from(btns).map((btn) => {
    btn.addEventListener("click", () => {
      showCurrentStep("plus");
    });
  });
}

function generateBtns(data, showElement) {
  data.map((btn_data) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-next", "");
    btn.classList.add(
      "py-4",
      "px-4",
      "text-xl",
      "rounded-xs",
      "text-md",
      "md:text-lg",
      "border",
      "border-1",
      "border-blue-400",
      "hover:border-blue-300",
      "shadow-sm",
      "hover:shadow-md",
      "md:shadow-blue-500/0",
      "hover:shadow-blue-500/30",
      "hover:bg-blue-500",
      "hover:text-white",
      "transition",
      "ease-in-out",
      "duration-200",
      "hover:scale-100",
      "bg-white",
      "text-gray-900",
      "scale-95"
    );
    btn.value = Object.keys(btn_data).join("");
    btn.textContent = Object.values(btn_data).join("");
    showElement.appendChild(btn);
  });
}

//Start Step 6
const stepSix = document.querySelector("#step6");
const placeToShowDataStepSix = stepSix.querySelector("[data-show]");
const unsecuredDebtData = [
  { 1500: "$15,000 +" },
  { 10000: "$10,000 - $14,999" },
  { 7500: "$7,500 - $9,999" },
  { 5000: "$5,000 - $7,499" },
  { 0: "$0 - $4,499" },
];
generateBtns(unsecuredDebtData, placeToShowDataStepSix);
const allBtnsSix = placeToShowDataStepSix.querySelectorAll("[data-next]");
nextAction(allBtnsSix);
//End Step 6

//Start step7
const stepSeven = document.querySelector("#step7");
const placeToShowDataStepSeven = stepSeven.querySelector("[data-show]");
const longLivedData = [
  { 60: "5 Years or more" },
  { 48: "4 Years" },
  { 36: "3 Years" },
  { 24: "2 Years" },
  { 12: "One Year or less" },
];
generateBtns(longLivedData, placeToShowDataStepSeven);
const allBtnsSeven = placeToShowDataStepSeven.querySelectorAll("[data-next]");
nextAction(allBtnsSeven);
//End step7

// Strat step8
const stepEight = document.querySelector("#step8");
const placeToShowDataStepEight = stepEight.querySelector("[ data-show]");
const RentHomeData = [
  { OWN_MORTGAGEPAYMENTS: ["With Mortgage", "./assets/icons/own.svg"] },
  { OWN_NOMORTGAGE: ["No Mortgage", "./assets/icons/own.svg"] },
  { RENT: ["Rent", "./assets/icons/rent.svg"] },
  { OTHER: ["Other", "./assets/icons/other.svg"] },
];

RentHomeData.map((btnData) => {
  const [btnValue, [text, srcImg]] = Object.entries(btnData)[0];

  const btn = document.createElement("button");
  btn.type = "button";
  btn.value = btnValue;
  btn.setAttribute("data-next", "");
  btn.classList.add(
    "bg-white",
    "text-gray-900",
    "py-4",
    "px-4",
    "rounded-xs",
    "w-full",
    "text-md",
    "md:text-md",
    "border",
    "hover:border-blue-300",
    "hover:shadow-md",
    "hover:shadow-blue-500/30",
    "transition",
    "ease-in-out",
    "duration-200",
    "hover:scale-100",
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "scale-95",
    "md:shadow-blue-500/0",
    "border-blue-200",
    "shadow-sm",
    "border-1",
    "leading-4",
    "font-semibold"
  );

  const img = document.createElement("img");
  img.src = srcImg;
  img.classList.add("h-16", "w-auto", "mx-auto", "grow-0");

  const textWraber = document.createElement("div");
  textWraber.classList.add("pt-1.5", "grow", "flex", "items-center");
  const textIneer = document.createTextNode(text);
  textWraber.appendChild(textIneer);

  btn.appendChild(img);
  btn.appendChild(textWraber);

  placeToShowDataStepEight.appendChild(btn);
});
const allBtnsEight = placeToShowDataStepEight.querySelectorAll("[data-next]");
nextAction(allBtnsEight);

// End step8

//
//formate Function
function formatPayment(element) {
  let input = element.value.replace(/\D/g, "");

  if (input === "") {
    element.value = "";
    return;
  }

  let number = parseInt(input, 10);
  let formattedNumber = number.toLocaleString();
  element.value = formattedNumber;
}

//setError
const setErrorPayment = (step, elementInp, message, placeholder) => {
  const errorDisplay = step.querySelector("#error");
  errorDisplay.innerText = message;
  elementInp.setAttribute("placeholder", placeholder);
  elementInp.classList.remove("border-gray-400");
  elementInp.classList.add("bg-pink-100", "border-rose-300");
};

//setSuccess
const setSuccessPayment = (step, elementInp) => {
  const errorDisplay = step.querySelector("#error");
  errorDisplay.innerText = "";
  elementInp.classList.remove("bg-pink-100", "border-rose-300");
  elementInp.classList.add("bg-white", "border-gray-400");
};

//

//Start step9
const stepNine = document.querySelector("#step9");
const summitButtonNine = stepNine.querySelector("[data-next]");
const monthlyPaymentInp = document.querySelector("#monthlyPayment");

monthlyPaymentInp.addEventListener("input", () =>
  formatPayment(monthlyPaymentInp)
);
//TO REFACTOR
summitButtonNine.addEventListener("click", function () {
  if (validateStepNineInp()) {
    showCurrentStep("plus");
  }

  monthlyPaymentInp.addEventListener("input", validateStepNineInp);
});

const validateStepNineInp = () => {
  let isValid = true;
  const monthlyPaymentValue = monthlyPaymentInp.value.trim();

  if (monthlyPaymentValue === "") {
    setErrorPayment(
      stepNine,
      monthlyPaymentInp,
      "This field is required.",
      "Monthly Payment"
    );
    isValid = false;
  } else {
    setSuccessPayment(stepNine, monthlyPaymentInp);
  }

  return isValid;
};

//End step9

//Start step10
const stepTen = document.querySelector("#step10");
const errorTwoContainer = document.querySelector("#errorContainer");
const summitButtonTen = stepTen.querySelector("[data-next]");
const personalIncomeInp = document.querySelector("#personalIncome");
const householdIncomeInp = document.querySelector("#householdIncome");

personalIncomeInp.addEventListener("input", () =>
  formatPayment(personalIncomeInp)
);

householdIncomeInp.addEventListener("input", () =>
  formatPayment(householdIncomeInp)
);

summitButtonTen.addEventListener("click", function () {
  if (validateStepTenInp()) {
    showCurrentStep("plus");
  }

  personalIncomeInp.addEventListener("input", validateStepTenInp);
  householdIncomeInp.addEventListener("input", validateStepTenInp);
});

const validateStepTenInp = () => {
  let isValid = true;
  const personalIncomeValue = personalIncomeInp.value.trim();
  const householdIncomeValue = householdIncomeInp.value.trim();

  if (personalIncomeValue === "") {
    setErrorPayment(
      stepTen,
      personalIncomeInp,
      "This field is required.",
      "Personal Income"
    );
    isValid = false;
  } else {
    setSuccessPayment(stepTen, personalIncomeInp);
  }

  if (householdIncomeValue === "") {
    setErrorPayment(
      errorTwoContainer,
      householdIncomeInp,
      "This field is required.",
      "Household Income"
    );
    isValid = false;
  } else {
    setSuccessPayment(errorTwoContainer, householdIncomeInp);
  }

  return isValid;
};
//End  step10

//start ad

const adBtnOpen = document.querySelector('[data-target="adBtn"]');
const adContainer = document.querySelector('[data-target="adContainer"]');
const adLoader = document.querySelector('[data-target="adLoader"]');
const adData = document.querySelector('[data-target="adData"]');
const adClose = document.querySelector('[data-target="closeAd"]');

adBtnOpen.addEventListener("click", () => {
  adContainer.classList.remove("hidden");
  adLoader.classList.remove("hidden");
  setTimeout(() => {
    adLoader.classList.add("hidden");
  }, 2000);
  setTimeout(() => {
    adData.classList.remove("hidden");
  }, 2000);
});

adClose.addEventListener("click", () => {
  adData.classList.add("animate-fade-out");

  setTimeout(() => {
    adData.classList.remove("animate-fade-out");
    adData.classList.add("hidden");
    adContainer.classList.add("hidden");
  }, 800);
});

console.log(adBtnOpen);

//end ad
