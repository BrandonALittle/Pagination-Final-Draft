// GET ELEMENT CONTAINING STUDENT ITEMS
var studentListContainer = document.getElementsByTagName("ul")[0];

// GET LIST OF STUDENT ITEMS
var studentsList = studentListContainer.children;

// GET NUMBER OF PAGES (STUDENTS DIVIDED BY TEN)
var numberOfPages = Math.ceil((studentsList.length) / 10);

// HIDE ALL STUDENT ITEMS
var hideStudentsList = function () {
    for (i = 0; i < studentsList.length; i++) {
        var classList = studentsList[i].classList;
        classList.add("hidden");
    }
}

// SHOW SELECTED STUDENT ITEMS (DEFINED BY PAGE OF TEN)
var showPage = function (page) {
    var rangeMax = page * 10; 
    var rangeMin = rangeMax - 10;
    hideStudentsList();
    for (i = rangeMin; i < rangeMax; i++) {
        if (studentsList[i]) { // CHECK THAT THERE IS STUDENT ITEM AT THIS INDEX
            var classList = studentsList[i].classList;
            classList.remove("hidden"); // REMOVE CLASS THAT HIDES THE STUDENT LIST ITEM
        }
    }
}

// CREATE UNORDERED LIST FOR PAGINATION LINKS
var makePageList = function() {
    var pageList = document.createElement("ul"); // CREATE UNORDERED LIST
    // FOR EACH PAGE, CREATE  LIST ELEMENT, ADD LINK, ATTRIBUTE, SET PAGE NUMBER AS INNER TEXT, AND ADD TO UNORDERED LIST
    for (i = 1; i <= numberOfPages; i++) { 
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
    if (document.querySelector(".pagination")) {
        var oldPagination = document.querySelector(".pagination");
        oldPagination.parentElement.removeChild(oldPagination);
    }
    var page = document.querySelector(".page");
    page.appendChild(newPagination);
}

// BIND CLICK EVENTS TO PAGE DISPLAY
var bindPageHandlerEvents = function () {
    var paginationDiv = document.querySelector(".pagination");
    var pageList = paginationDiv.firstChild;
    var pageListItems = pageList.children;
    for (i = 0; i < pageListItems.length; i++) {
        var currentListItem = pageListItems[i]; // GET EACH PAGINATION LINK
        // BIND CLICK EVENT
        currentListItem.addEventListener('click', function () {
            var targetPage = event.target.innerText; // GET PAGE NUMBER FROM INNER TEXT OF LINK
            showPage(targetPage); // SEND PAGE NUMBER TO DISPLAY FUNCTION TO REFRESH STUDENTS ON PAGE
        });
    }
}


hideStudentsList();
makePageList();
showPage(1);
bindPageHandlerEvents();