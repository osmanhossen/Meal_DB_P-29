// async await diye catch and normal kivabe kore seta dui vabe Example dewa ache
// search or CNTL + F = Example
const loadMeals = (SearchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${SearchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};
const displayMeals = (meals) => {
  // step-1
  const mealContainer = document.getElementById("meals_container");
  // before Search clear
  mealContainer.innerText = "";
  // step--2
  meals.forEach((meal) => {
    // step--3
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
     <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">এটি খুব মজার এবং সুস্বাদু  খাবার।</p>
           <button onclick="loadMealOrders(${meal.idMeal})" type="button" class="btn btn-success fs-5 fw-bold me-2" data-bs-toggle="modal" data-bs-target="#mealOrders">Order</button>

<button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btn btn-warning fs-5 fw-bold" data-bs-toggle="modal" data-bs-target="#mealDetails">Details</button> 
            </div>
            <div class="card-footer d-flex align-items-center justify-content-center">
              <small class="text-muted text-center">Last Ordered 7 mins ago</small>
            </div>
          </div>
          
          `;
    // step--4
    mealContainer.appendChild(mealDiv);
  });
};
// const searchMeals = () => {};

document.getElementById("search_btn").addEventListener("click", function () {
  const SearchText = document.getElementById("search_field").value;

  loadMeals(SearchText);

  // clear search field
  SearchText.value = "";
});
// For Order Button--------------
// Async Await Example And Catch error
// catch  aivabe o dora jai abar (Details) e Niche onno rokom catch dekano hyece
const loadMealOrders = async (mealId) => {
  const url = ` https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMealOrders(data.meals[0]);
  } catch (error) {
    console.log(error);
  }
};
const displayMealOrders = (orders) => {
  console.log(orders);
  document.getElementById("mealOrdersLabel").innerText = orders.strMeal;
  const OrdersMeal = document.getElementById("mealOrdersBody");
  OrdersMeal.innerHTML = `
  <img class="img-fluid" src="${orders.strMealThumb}">
  <br>
  <h5 class="fw-bolder p-1 text-warning"> Price : <small class="fw-bold text-success "> $20 </small> </h5>
  <h5 class="fw-bolder p-1 text-warning"> Area : <small class="fw-bold text-success">${orders.strArea}</small></h5>
  <h5 class="fw-bolder text-warning p-1"> Details : <p class="fw-normal text-success"> ${orders.strInstructions}</p></h5>
  <h5 class="fw-bolder text-success">তৈরী করা দেখতে : <a target="_blank" class="text-decoration-none fw-normal text-white btn btn-success" href=${orders.strYoutube}>  See Here </a> </h5>
  `;
};

// For Details Button------------------------
// Async Await Example And Catch error
// catch aivabe o dora jai abar (orders) e opore onno rokom catch dekano hyece
const loadMealDetails = (mealId) => {
  const url = ` https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]))
    .catch((error) => console.log(error));
};
const displayMealDetails = (details) => {
  console.log(details);
  document.getElementById("mealDetailsLabel").innerText = details.strMeal;
  const detailsMeal = document.getElementById("mealDetailsBody");
  detailsMeal.innerHTML = `
  <img class="img-fluid" src="${details.strMealThumb}">
  <br>
  <h5 class="fw-bolder p-1 text-warning">বেশি পছন্দ করেন/More Like People : <small class="fw-normal text-success">${details.strArea}</small></h5>
  <h5 class="fw-bolder text-warning p-1">তৈরী করার উপাদান সমুহ/For Make Ready Items : <p class="fw-normal text-success">${details.strIngredient1} , ${details.strIngredient2} , ${details.strIngredient3} , ${details.strIngredient4} , ${details.strIngredient5} , ${details.strIngredient6} , ${details.strIngredient7} , ${details.strIngredient8} , ${details.strIngredient9}, ${details.strIngredient10} , ${details.strIngredient11} , ${details.strIngredient12} , ${details.strIngredient13} , ${details.strIngredient14}, ${details.strIngredient15}, ${details.strIngredient16} Thats All...</p> </h5>

  <h5 class="fw-bolder text-success">তৈরী করা দেখতে /How To Make : <a target="_blank" class="text-decoration-none fw-normal text-white btn btn-success" href=${details.strYoutube}>  See Here</a> </h5>
  `;
};

loadMeals("fish");
