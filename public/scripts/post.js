$(document).ready(function() {
    console.log( "page ready!" );

    let allPosts = [];
    let $postList;

    $postList = $('#postTarget');

    // $.ajax({
    // 	method: 'GET',
    // 	url: '/upload',
    // 	success: handleSuccess,
    // 	error: handleError
    // });


    $('#newPostForm').on('submit', function(e) {
    	e.preventDefault();
    	console.log($('#textInput'))
    	$.ajax({
    		method: 'POST',
    		url: '/upload',
    		data: $('#textInput').serialize(),
    		success: newPostSuccess,
    		error: newPostError
    	});
    });

function getPostHtml(postList) {
console.log(allPosts);
  return `<li>
            My Story: <b>${postList.input}</b>
            <br />
            <br />
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${postList._id}>Delete</button>
          </li>`;
}

function getAllPostHtml(post) {
  return post.map(getPostHtml).join("");
}

//function to render all posts to view
function render () {
  $postList.empty();// empty existing posts from view
  let postHtml = getAllPostHtml(allPosts); // pass `allToDos` into the template function
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
  $('#newPostForm input').val(''); //clearing the input field after successful post
  // console.log(json);
  allPosts.push(json); //pushing all data from the array into json
  render();
}

function newPostError() {
  console.log('new post error!');
}



});