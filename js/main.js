// CREATE RANGE INDICATOR;
var rangeIndex = document.createElement("h4");

// GET ELEMENT CONTAINING STUDENT ITEMS
var studentListContainer = document.getElementsByTagName("ul")[0];

// GET LIST OF STUDENT ITEMS
var studentsList = studentListContainer.children;

// INITIALIZE CURRENT STUDENT LIST, WHICH CAN CHANGE
var currentList = studentsList;

// INITIALIZE NUMBER OF PAGES (STUDENTS DIVIDED BY TEN)
var numberOfPages = Math.ceil((currentList.length) / 10);

// ADD SEARCH BAR TO PAGE
var addSearch = function () {
    var pageHeader = document.querySelector(".page-header");
    var searchArea = document.createElement("div");
    var searchBox = document.createElement("input");
    var searchButton = document.createElement("button");
    searchArea.setAttribute("class", "student-search");
    searchBox.setAttribute("id", "search");
    searchBox.setAttribute("placeholder", "Search for students...");
    searchButton.setAttribute("id", "search-button");
    searchButton.innerText = "Search";
    searchArea.appendChild(searchBox);
    searchArea.appendChild(searchButton);
    pageHeader.appendChild(searchArea);
};

// HIDE ALL STUDENT ITEMS
var hideStudentsList = function () {
    for (i = 0; i < studentsList.length; i++) { // for each student item
        var classList = studentsList[i].classList; // get class list
        classList.add("hidden"); // and add hidden class to list
        classList.remove("show"); // remove css animation class
    }
};

// SHOW SELECTED STUDENT ITEMS (DEFINED BY PAGE OF TEN)
var showPage = function (page, currentList) {
    var rangeMax = page * 10; // calculate upper range of items to show
    var rangeMin = rangeMax - 10; // calculate the lower end of the limit. THIS IS PROBLEMATIC
    rangeIndex.innerText = " Showing students " + rangeMin + " - " + (rangeMax - 1) + " out of " + currentList.length; // add statement to indicate which student items are currently being shown from the matching set
    var pageHeader = document.querySelector(".page-header");
    pageHeader.appendChild(rangeIndex); // add message to page
    hideStudentsList(); // hide all student items so that the page can refresh
    for (i = rangeMin; i < rangeMax; i++) {
        if (currentList[i]) { // CHECK THAT THERE IS STUDENT ITEM AT THIS INDEX
            var classList = currentList[i].classList;
            classList.remove("hidden"); // REMOVE CLASS THAT HIDES THE STUDENT LIST ITEM
            classList.toggle("show");
        }
    }
};

// CREATE UNORDERED LIST FOR PAGINATION LINKS
var makePageList = function() {
    if (document.querySelector(".pagination")) { // if there is already a pagination list,
        var page = document.querySelector(".page"); 
        var pagination = document.querySelector(".pagination"); 
        page.removeChild(pagination); // get it and remove it
    }
    var pageList = document.createElement("ul"); // CREATE UNORDERED LIST
    // FOR EACH PAGE, CREATE  LIST ELEMENT, ADD LINK, ATTRIBUTE, SET PAGE NUMBER AS INNER TEXT, AND ADD TO UNORDERED LIST
    for (i = 1; i <= numberOfPages; i++) { // create  new pagination list
        var page = document.createElement("li");
        var pageLink = document.createElement("a");
        pageLink.setAttribute("href", "#");
        pageLink.innerText = i;
        page.appendChild(pageLink);
        pageList.appendChild(page);
    }
    var newPagination = document.createElement("div"); // CREATE PAGINATION CONTAINER
    newPagination.appendChild(pageList); 
    newPagination.classList.add("pagination");
    var page = document.querySelector(".page");
    page.appendChild(newPagination); // add pagination container and list to page
};

// BIND CLICK EVENTS TO PAGE DISPLAY
var bindPageHandlerEvents = function () {
    var paginationDiv = document.querySelector(".pagination"); // get pagination div
    var pageList = paginationDiv.firstChild;
    var pageListItems = pageList.children;
    for (i = 0; i < pageListItems.length; i++) {
        var currentListItem = pageListItems[i]; // GET EACH PAGINATION LINK
        // BIND CLICK EVENT
        currentListItem.addEventListener('click', function () {
            var targetPage = event.target.innerText; // GET PAGE NUMBER FROM INNER TEXT OF LINK
            showPage(targetPage, currentList); // SEND PAGE NUMBER TO DISPLAY FUNCTION TO REFRESH STUDENTS ON PAGE
        });
    }
};

// GET USER SEARCH INPUT AND CREATE MATCHNG LIST
var search = function () {
    var searchTarget = document.querySelector("#search").value; // get user input
    var searchTargetExp = new RegExp(searchTarget,'i'); // create new regular expression from user input
    var newStudentList = []; // create new list of results
    hideStudentsList(); // hide all student items to refresh page
    for (i=0; i<studentsList.length; i++) {
        var studentName = studentsList[i].querySelector("h3").innerText; // get student info
        var studentEmail = studentsList[i].querySelector("span").innerText;
        var testForName = searchTargetExp.test(studentName); // compare search query to student info
        var testForEmail = searchTargetExp.test(studentEmail);
        if (testForName || testForEmail) { // if student info matches search query, add student to list
            newStudentList.push(studentsList[i]);
        }
    }
    currentList = newStudentList; // update list to matching student list
    numberOfPages = Math.ceil((currentList.length) / 10);
    makePageList(); // create pagination for list
    showPage(1, currentList); // show first page
    bindPageHandlerEvents(); // bind click events
    if (searchTarget.length > 0) {
        rangeIndex.innerText = "showing students that match '" + searchTarget + "'";
    }
    if (currentList.length === 0) { // if there are no matching students
        noResultsMessage.classList.remove("hidden"); // show message telling user there are no matching results
    } else {
        noResultsMessage.classList.add("hidden");
    }
};

// bind event to search box
var bindSearch = function () {
    var searchBox = document.querySelector("#search"); // get search box
    searchBox.addEventListener('input', function () { // add event to user input, making search dynamically responsive
        search();
    });
    var searchButton = document.querySelector("#search-button"); 
    searchButton.addEventListener('click', function () { // add event to search button
        search();
    });
};

    var content = document.querySelector(".page"); 
    var noResultsMessage = document.createElement("h1"); // create message telling user there are no results
    noResultsMessage.innerText = "I'm sorry. None of our student records match your search.";
    content.appendChild(noResultsMessage);
    noResultsMessage.classList.add("hidden");

// initialize page
addSearch();
hideStudentsList();
makePageList();
showPage(1, document.getElementsByTagName("ul")[0].children);
bindPageHandlerEvents();
bindSearch();