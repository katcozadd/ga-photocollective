console.log("Sanity Check: JS is working!");
var $postList;
var allPosts = []; //empty array

$(document).ready(function(){

  $postList = $('#postTarget');
 
  $.ajax({
    method: 'GET', //getting all of the data from database
    url: '/upload', //on this url
    success: handleSuccess, //calls handleSuccess on success
    error: handleError //throws error on error
  });



  $("#storyCreate").on('click', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST', //post method
      url: '/uploads', //url to post on
      data: $('#newPostForm').serialize(), //serializing the form object
      success: newPostSuccess,
      error: newPostError
    });
  });

    $postList.on('click', '.delete', function() {
    console.log('clicked delete button to, /upload/' + $(this).attr('data-id'))
    $.ajax({
      method: 'DELETE',
      url: '/upload/'+$(this).attr('data-id'),
      success: deletePostSuccess,
      error: deletePostError
    });
  });


function getPostHtml(postList) {
  return `<li>
            <b>${postList.input}</b>
            <br />
            <br />
            <button type="button" name="button" class="blue-grey darken-1 btn delete" data-id=${postList._id}>Delete</button>
            <button type="button" name="button" class="blue-grey darken-1 btn update" data-id=${postList._id}>Update</button>
          </li>`;
}

function getAllPostHtml(post) {
  return post.map(getPostHtml).join("");
}

//function to render all posts to view
function render () {
  $postList.empty();// empty existing posts from view
  var postHtml = getAllPostHtml(allPosts); // pass `allToDos` into the template function
  $postList.append(postHtml);// append html to the view
};

function handleSuccess(json) {
  allPosts = json;//assigning the value of the json object into the empty array
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#postTarget').text('Failed to load posts');
}

function newPostSuccess(json) {
  $('#newPostForm input').val(''); //clearing the input fields after successful post
  console.log(json);
  allPosts.push(json); //pushing all data from the array into json
  render();
}

function newPostError() {
  console.log('new to do error!');
}

function deletePostSuccess(json) {
  let postId = json;
  console.log('delete post', postId);
  // find the todo with the correct ID and remove it from our allToDos array
  for(var index = 0; index < allPosts.length; index++) {
    if(allPosts[index]._id === postId) {
      allPosts.splice(index, 1);
      break;  
    }
  }
  render();
}

function deletePostError() {
  console.log('delete post error!');
}


});