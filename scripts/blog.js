import { posts } from './post.js';
// post.js



// ---------------------------------------------Retrieve posts from local storage-------------------------------------------//
const storedPosts = JSON.parse(localStorage.getItem('posts'));
if (storedPosts) {
    posts.push(...storedPosts);
}
// ---------------------------------------------Save posts in local storage-------------------------------------------------//

function storageSave(){
  localStorage.setItem('posts', JSON.stringify(posts));

}

// ---------------------------------------------ADD POSTS FUNCTION-----------------------------------------------//
displayPosts();

function addPost() {
    document.getElementById("postForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const imageURL = document.getElementById("imageURL").value;
        const postTitle = document.getElementById("postTitle").value;
        const postBody = document.getElementById("postDescription").value;

        const newPost = {
            id: posts.length + 1, 
            postImage: imageURL,
            postTitle: postTitle,
            postBody: postBody,
        };
      

        posts.push(newPost);
        
        storageSave();

        // Reset input fields
        document.getElementById("imageURL").value = "";
        document.getElementById("postTitle").value = "";
        document.getElementById("postDescription").value = "";

        displayPosts();

    });
}

// ----------------------------------------------------------DISPLAY POSTS FUNCTION--------------------------------------------------------------//

function displayPosts() {
    let postHtml = '';

    posts.forEach((post) => {
        postHtml +=
        `<div class="full-card" >
            <div class="img-div">
                <img src="${post.postImage}" alt="" class="postImage"/>
            </div>
            <div class="card-body">
                <h2 class="postTitle">${post.postTitle}</h2>
                <p class="postBody">${post.postBody}</p>
                <div>
                    <a href="#" class="read-more">Read more <span class="sr-only">about ${post.id}</span></a>
                    <button id="button" class="cardBtn edit btnStyle" data-post-id="${post.id}"> edit</button>
                    <button class="cardBtn deleteBtn btnStyle" data-post-id="${post.id}">delete</button>
                    </div>
                </div>
            </div>`;
        });
    
        document.querySelector('.cards-section').innerHTML = postHtml;
    
        // Attach event listeners to delete buttons
        document.querySelectorAll('.deleteBtn').forEach(deleteBtn => {
            deleteBtn.addEventListener('click', function() {
                const postId = deleteBtn.dataset.postId;
                deletePost(postId); // Call the alertt function with postId as argument
            });
        });
       // Attach event listeners to edit buttons
         document.querySelectorAll('.edit').forEach(editBtn => {
        editBtn.addEventListener('click', function() {
            const postId = editBtn.dataset.postId;
            // console.log("Editing post with ID:", postId);
            editPost(postId);
        });
    });
}

// ----------------------------------------------------------DELETE FUNCTION--------------------------------------------------------------//
function deletePost(postId) {
        const index = posts.findIndex(post => post.id === postId);
            posts.splice(index, 1);
            storageSave();
            displayPosts();
    }
  
// ----------------------------------------------------------EDIT FUNCTION--------------------------------------------------------------//

function editPost(postId) {
        // console.log("Editing post with ID:", postId);
        
        var postToEdit;
        posts.forEach((post) => {
            if (post.id == postId) {
                postToEdit = post;
            }
        });
    
        // Check if postToEdit is defined
        if (!postToEdit) {
            console.error("Post not found!");
            return;
        }
    
        console.log("Post to edit:", postToEdit);
    
        const editForm = `
                <form class="edit-form" id="formForEdit" style=" background-color: #f2f2f2; padding: 20px; border-radius: 5px;text-align: center;">
                    <label for="imageURL">Image</label><br>
                    <input type="text" id="imageURL1" name="imageURL" required  value="${postToEdit.postImage}" ><br>
    
                    <label for="postTitle">Title:</label><br>
                    <input type="text" id="postTitle1" name="postTitle" required value="${postToEdit.postTitle}"><br>
    
                    <label for="postDescription">Description:</label><br>
                    <textarea id="postDescription1" name="postDescription" rows="4" cols="50" required >${postToEdit.postBody}</textarea><br>
    
                    <button type="submit" class="btnStyle">Save</button>
                    <button onclick="document.getElementById('formForEdit').style.display='none';" class="btnStyle">Close</button>

                </form>
        `;
        // Append the edit form to the container div
        document.getElementById(`edit-form-container`).innerHTML = editForm;
    
        document.querySelector('.edit-form').addEventListener('submit', function(event) {
            event.preventDefault();
        
            // Update the postToEdit object with the new values from the form
            postToEdit.postImage = document.getElementById(`imageURL1`).value;
            postToEdit.postTitle = document.getElementById(`postTitle1`).value;
            postToEdit.postBody = document.getElementById(`postDescription1`).value;
        
            // Save the updated posts array to localStorage
            storageSave();
        
            // Display the updated posts
            displayPosts();
        });
        

    }

addPost();
    
// displayPosts();





// -----------------------------------------SEARCH-------------------------------------------------------------------//
function displaySearchInput(){
    const searchInput =`<div class="d-flex justify-content-center h-100">
    <div class="search">
        <input type="text" class="search-input" placeholder="search..." name="" id="searchItem">
        <a href="#" class="search-icon">
            <button   id="searchBTN" class="search-icon" ><i  class="fa fa-search"></i> </button>  
        </a>
    </div>
    </div>`
   //   <i class="fa fa-search"></i> 
    document.querySelector(".search-section").innerHTML=searchInput;
    const btnSearch = document.getElementById("searchBTN");
    // const keyword ="hello";
   
        btnSearch.addEventListener("click",function()
        {
            alert("searching post:");
            const keyword = document.getElementById("searchItem").value;

            const searchResults = searchPostsByTitle(keyword);

            console.log("searching post:", searchResults);
            displaySearchPost( searchResults);

        });
}


displaySearchInput();

function searchPostsByTitle(keyword) {
        const searchTerm = keyword.toLowerCase();
    
        const searchResults = posts.filter(post => post.postTitle.toLowerCase().includes(searchTerm));
    
        return searchResults;
    }

function displaySearchPost(results){
        let postHtml = '';
        results.forEach(result => {
            postHtml +=
                `<div class="full-card">
                    <div class="img-div">
                        <img src="${result.postImage}" alt="" class="postImage"/>
                    </div>
                    <div class="card-body">
                        <h2 class="postTitle">${result.postTitle}</h2>
                        <p class="postBody">${result.postBody}</p>
                        <div>
                            <a href="#" class="read-more">Read more <span class="sr-only">about ${result.id}</span></a>
                            <button class="cardBtn edit" data-post-id="${result.id}">edit</button>
                            <button class="cardBtn deleteBtn" data-post-id="${result.id}">delete</button>
                        </div>
                    </div>
                </div>`;
        });
            document.querySelector('.cards-section').innerHTML = postHtml;
    

            // Attach event listeners to delete buttons
            document.querySelectorAll('.deleteBtn').forEach(deleteBtn => {
                deleteBtn.addEventListener('click', function() {
                    const postId = deleteBtn.dataset.postId;
                    deletePost(postId); // Call the alertt function with postId as argument
                });
            });
            // Attach event listeners to edit buttons
            document.querySelectorAll('.edit').forEach(editBtn => {
            editBtn.addEventListener('click', function() {
                const postId = editBtn.dataset.postId;
                // console.log("Editing post with ID:", postId);
                editPost(postId);
            });
            });

    }






















// -----------------------------------------------------display add form -------------------------------------------------------------------//

function displayyForm(){
    let addForm = document.getElementById("postForm");
    addForm.style.display= "block";  // hide form when page loads
    
};

document.getElementById("addPost").addEventListener("click",function()
{
    displayyForm();
});

// ------------------------------------------------------------------------------------------------------------------------//

// ------------------------------------------------------delete storage------------------------------------------------------//
function deleteStorage(){
    localStorage.clear();
}

document.getElementById( "delBtn" ).addEventListener("click", function() {
        deleteStorage();
        location.reload();
        alert("All Posts have been deleted");

    });