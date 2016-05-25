var selected_project = null;
var selected_img = null;
var og_root = null;
var table;

$(document).ready(
    function () {
		// ADD Projects
		table = $('#side-bar ul');
		Object.keys(projects).forEach(function(e, i , arr) {
			build_project(e, projects[e]);
		});

        //SET splash
		var splash = '#beige'
        selected_project = $(splash);
        selected_project.addClass('splash');
        $('.project').css('display','none')
        toggle_display(splash)

        //Image toggle
        $('.cropped').click( function() {
            if (selected_img != null) {
                if (selected_img[0].src == $(this)[0].src)
                    selected_img.toggleClass('uncropped')
                else {
                    selected_img.removeClass('uncropped')
                    $(this).addClass('uncropped')
                }
            } else {
                $(this).addClass('uncropped')
            }
            selected_img = $(this)
        })
    })

function build_project( label, repo ) {
	// label : label to be used on the bottun
	// repo : the corresponding repo to sources
	
	// Add Project
	var repo_root = "http://karoantonio.github.io/"
	var proj = $('<iframe>');
	proj.addClass('project');
	proj.attr('id',repo);
	proj.attr('data-src', repo_root + repo + "/");
	$('#content').prepend(proj);
	
	// Add Button
	var button = $('<div>');
	var row = $('<li>');
	button.html(label);
	button.attr('id',repo + '_button');
	row.prepend(button);
	table.prepend(row);
	button.click(function(){
		toggle_display('#'+repo);
	});
}

function send_email() {
    $.ajax({
  type: 'POST',
  url: 'https://mandrillapp.com/api/1.0/messages/send.json',
  data: {
    'key': 'Gl_eL5YtBMU5IbUt1XCjnQ',
    'message': {
      'from_email': $('#from_email')[0].value,
      'to': [
          {
            'email': 'karoantonio@gmail.com',
            'name': 'Karo',
            'type': 'to'
          },
        ],
      'autotext': 'true',
      'subject': 'Person from karoantonio.com',
      'html': $('#email_content')[0].value,
    }
  }
 }).done(function(response) {
        console.log(response)
        $('#email_feedback')[0].innerHTML = response[0]['status'] + "!"
 });
}

function toggle_display(id) {
    var e = $(id);
    if (selected_project != null) {
        selected_project.css('display','none')
        selected_project[0].src = ""
    }
    //Set Choices
    //TODO make more robust
    //Move Choices to top
    var choice_one = $(id+'_button').parent().parent().parent()
    choice_one.parent().prepend(choice_one)
    var choice_two = $(id+'_button').parent()
    choice_two.parent().prepend(choice_two)
    selected_project = e;
    if (e.css('display') == 'none') {
        $(id+'_button')
        e.css('display','block')
    } else {
        e.css('display','none')
    }
    if (e[0]['src'] != undefined && e[0]['src'] != 'undefined'){
        e[0].src = e.data('src');
        $('#info')[0].innerHTML = e[0].src;
        $('#info')[0].onclick = function () { window.open(e[0].src); }
    } else {
        $('#info')[0].innerHTML = "";
        $('#info')[0].onclick = null;
    }
    $('.overlay').css('pointer-events','none');
    $('.overlay').removeClass('hover-listener');
}

