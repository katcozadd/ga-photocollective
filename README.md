# GA Colorado Collective
## Big Picture:
The Colorado Collective is a online community that allows users to be a part of a creative collective dedicated to celebrating Colorado. Users must sign up to be able to use this collective space. Once inside of the collective they are taken to a "news feed" sort of concept where all users can go in and share photos and stories of their experiences exploring Colorado.

### Trello and Planning
Here is a link to my [Trello Board](https://trello.com/b/0ihpyaob/project-2-photo-collective
) for this project.

The planning process for this project did not come at any ease for me. I had difficulty coming up with a concept that I wanted to pursue. The photo collective feels overdone, but I do feel passionate about photography and Colorado, so why not!?

I changed my from my original plan a little bit by adding a section where users can input a story in text instead of just posting photos. I went back into my Trello Board and updated some of those changes.

### Aproach Taken 
Unlike in my first project, I decide to tackle some of my larger "issues"/user stories that had the most velocity first. Although this was pretty difficult, it definitely felt pretty satisfying to see that I was able to create logic that worked. 

Then I moved on to styling. I tried to make this project responsive so users can use this on their phones, which has been difficult as well. I also tried some new things, like using a video as a background and using ejs partials to make my navagation bars.

### Technical Requirements 
The following technologies were all requiements for this project:

- **HTML / EJS**: Your HTML should be semantic and valid. Your app uses EJS to render information on the page.

- **Node and Express**: Your app will need to have its own server, built using Express.

- **MVC Pattern**: Your app uses Models, Views, Controllers pattern we have gone over in class.

- **Mongo + Mongoose**: Your app will need to persist data. Your app should have at least two database tables. The second DB table can be post-MVP.

- **CSS & Design**: Your app should be pleasing to look at. Your design should take usability into account.

- **JavaScript or jQuery**: Your app should have some interactivity on the front end -- DOM manipulation, microinteractions, etc.

- At least 2 Resources: Relationship optional, but recommended. Most projects require one One-to-Many relationship to function properly :)

**One of these**:
- BCrypt & Auth
- Using a third party API like Twilio, or OMBD, Google Maps, etc.

### Technologies Used
For this project I used a front-end framework called [Materialize](http://materializecss.com/) CSS for my upload file forms and navigation bar.

This helped hugely for uploading my photos.

```
<form id="imageForm" action="/upload" method="POST" enctype="multipart/form-data">
	<div class="file-field input-field">
		<div class="btn blue-grey lighten-3">
			<span>File</span>
			<input name="myImage" type="file">
		</div>
			<div class="file-path-wrapper">
			<input class="file-path validate" type="text">
		</div>
	</div>
	<button id="create" type="submit" class="blue-grey darken-1 btn">Submit</button>
</form>
```

### Obstacles
The biggest obstacle that I have faced with this project has been using a backend controller to get all of the image data from the database and using frontend JavaScript to append those images to the DOM and keep them there. I am still currently working on this issue.

### Proud Moments
I am proud of the layout and how everything on this project looks. 

I am also proud of the fact that I was able to narrow down how I wanted to go about uploading photos. I used an Express middleware called Multer that processes file uploads.

Here is a code snippet of some of the functions I had to create before creating a backend controller to upload the images:
```
//set storage engine
const storage = multer.diskStorage({ 
	destination: './public/uploads/',//stores the uploaded photos in a public folder called uploads
	filename: function(req, file, callback){
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); //names the file with a dated milisecond and the name I have set for it in the form
	}
});

//initialize upload
const upload = multer({
	storage: storage,
	limits: {fileSize: 10000000}, //setting a maximum file size
	fileFilter: function(req, file, callback) {
		checkFileType(file, callback); // checks the file type to see if we will be able to upload it
	}	
}).single('myImage');

//Check file type
function checkFileType(file, callback) {
	const filetypes = /jpeg|jpg|png|gif/; //file can only be of these file types otherwise a file cannot be uploaded
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //creating variable to test that the name of the file has specific filetype in it
	const mimetype = filetypes.test(file.mimetype); //creating variable to compare the file mimetype to the specified mimetypes
	if (mimetype && extname) {
		return callback(null, true); //if the mimetype and extname both are the correct filetype upload photo
	} else {
		callback('Error! Only images can be uploaded.'); //if not display this error message
	}
}
```

### Project Continuation
A few things that I wanted to continue working on with this project:
1. Complete full CRUD for images
2. Create user profile pages
3. Alter sign up details so username is also required

### Deployment
I deployed this project on a website called https://www.heroku.com/home.

The link to my project is [here](https://colorado-collective.herokuapp.com/)!

### Personal Flare
The video used on the homepage was the first little film that I made few years back while on an amazing hike to an alpine lake in Crested Butte. 
