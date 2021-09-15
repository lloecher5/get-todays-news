///select elements in the DOM
const form = document.querySelector("form");
const submitButton = document.querySelector("button");
const input = document.querySelector("input");
const articleContainer = document.querySelector(".articles");

//funcition to render articles in the HTML
const renderArticles = (arr) => {
  //function takes in array and maps it to an HTML element
  const htmlArray = arr.map((article) => {
    return `<div class="article-element">
            <h3>${article.title}</h3>
            <img
              src="${article.urlToImage}"
            />
            <button class = "open-url" data-url ="${article.url}" > Click to open article </button>
            
          </div>`;
  });

  //joins the HTML array together into a big string
  return htmlArray.join("");
};

//gets the current date and formats in yyyy-mm-dd to input into the url
const today = new Date();
const offset = today.getTimezoneOffset();
const todayOffset = new Date(today.getTime() - offset * 60 * 1000);
const todayFormatted = todayOffset.toISOString().split("T")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //changes the text of the submit button while fetching
  submitButton.innerText = "Searching for articles...";

  fetch(
    `https://newsapi.org/v2/everything?qInTitle=${input.value}&from=${todayFormatted}&sortBy=popularity&apiKey=244380a8953f4a0b80a3781b0fb08305`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //creates array of articles that gets passed into the function renderArticles
      const articleArray = data.articles;
      //adds the HTML elements to the page
      articleContainer.innerHTML = renderArticles(articleArray);
      submitButton.innerText = "Search again!";
      //add event listener to buttons
      document.addEventListener("click", (e) => {
        //if element contains the class url-open
        if (e.target.classList.contains("open-url")) {
          //selects the url of the selected button using the data-url attribute
          const articleURL = e.target.dataset.url;
          //opens the targeted url
          window.open(articleURL, "_blank");
        }
      });
    });
});
