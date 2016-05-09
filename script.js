var selected_project = null;
var selected_img = null;
var og_root = null;

var choice_tree = {
    'KARO':['MADE','ON'],
    'MADE':['THIS','PRETTY SOUNDS','POETRY','WRDCVLT','WHY STAY','TALK2ME'],
    'ON':['GITHUB','TUMBLR'],
}

$(document).ready(
    function () {
        //SET splash
		var splash = '#beige'
        selected_project = $(splash);
        selected_project.addClass('splash');
        $('.project').css('display','none')
        toggle_display(splash)
		/*

        //TWEAK overlay:hover
        $('#info').hover(function(event) {
            $('.overlay').removeClass('hover-listener');
        })
        $('#root').hover(function() {
            $('.overlay').addClass('hover-listener');
        },function() {
            $('.overlay').removeClass('hover-listener');
        })

        //STYLE overlay tree
        style_overlay()
		*/

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


function style_overlay() {
    //Poorly designed
    //TODO restructure as a table of trees
    var karo = $('#root').children()[0]
    //ADD Faux names
    var num_faux = $('#root>li>ul>li').length
            + $('#root>li>ul>li').last().children().last().children().length
            - 2
    for (i = 0; i < num_faux; i++) {
        var new_karo = document.createElement("div");
        new_karo.innerHTML = "KARO"
        new_karo.id = "name_"+(i+1)
        new_karo.style.display = 'none';
        new_karo.className = 'name faux'
        $('#root>li').first().append(new_karo)
    }

    //Try to display a menu of choices on hover
    /*
    $('#root>li:nth-child(2)').hover(function() {
        $('#root>li>ul').css('display','block')
        $('#choice_2').css('display','hidden')
        $(this).css('display','hidden')
    }, function() {
        $('.sub-menu').css('display','hidden')
        $('#root>li>ul').css('display','hidden')
        $('#choice_2').css('display','block')
        $('#root>li').css('display','inline-block')
    })
    */

    $('#root>li>ul>li').hover(function() {
        //DISPLAY all faux name elements
        $('.faux').css('display','block')
        //HIDE all names
        $('.name').css('visibility','hidden')
        //SHOW corresponding name
        $('#name_'+$(this).index()).css('visibility','visible')
    }, function() {
        $('.faux').css('display','none')
        $('.rootname').css('visibility','visible')
    })

    $('#root>li>ul>li>ul>li').hover(function() {
        //HIDE all aunts and uncles
        $('#root>li>ul>li').css('visibility','hidden')
        //SHOW parent()
        $(this).parent().parent().css('visibility','visible')
    }, function() {
        //SHOW all aunts and uncles
        $('#root>li>ul>li').css('visibility','visible')
    })
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

