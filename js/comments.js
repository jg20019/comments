var model = {
    init: function (){
	this.load();
    },
    addComment: function (name, comment) {
	this._comments.push({name: name, comment: comment});
	this.save();
    },
    comments: function (){
	return this._comments;
    },
    load: function (){
	var storedComments = localStorage.getItem('comments');
	if (storedComments) {
	    this._comments = JSON.parse(storedComments);
	} else {
	    this._comments = [];
	}
    },
    save: function (){
	localStorage.setItem('comments', JSON.stringify(this._comments));
    },
};

var controller = {
    init: function (){
	model.init();
	view.init();
    },
    addComment: function (name, comment){
	if (name === "") {
	    name = "Anonymous";
	}
	model.addComment(name, comment);
	view.render();
    },
    comments: function (){
	// Returns the comments in reverse order
	var comments = [];
	for (var i = model._comments.length - 1; i >= 0; i--){
	    comments.push(model._comments[i]);
	}
	return comments;
    },
};

var view = {
    init: function (){
	this.name_input = document.querySelector('#name');
	this.comment_box = document.querySelector('#commentBox');
	this.submit_btn = document.querySelector('#submitButton');

	this.commentContainer = document.querySelector('#comments');

	this.template = '<div class="comment">';
	this.template += '<div class="name"> {{name}} </div>';
	this.template += '<div class="text"> {{comment}} </div>';
	this.template += '</div>';

	var view = this;
	this.submit_btn.onclick = function (e) {
	    e.preventDefault();
	    var name = view.name_input.value;
	    var comment = view.comment_box.value;
	    controller.addComment(name, comment);
	    view.clear();
	};
	this.render();
    },
    clear: function (){
	this.name_input.value = "";
	this.comment_box.value = "";
    },
    render: function (){
	var view = this;
	var renderedComments = controller.comments().map(function (comment) {
	    var html = view.template.replace(/{{name}}/, comment.name);
	    html = html.replace(/{{comment}}/, comment.comment);
	    return html;
	});
	this.commentContainer.innerHTML = renderedComments.join('');
    },
    
}; 

controller.init();
