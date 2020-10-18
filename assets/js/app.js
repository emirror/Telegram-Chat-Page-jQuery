$(document).ready(function () {

    // define a counter for request occurs just one time.
    var counter = 0;

    // add message to list
    $('#send-message').on('click', () => {
        sendMessage();
    });

    $('#text-message').on('keyup', e => {
        if (e.key == 'Enter')
            sendMessage();
    });

    // show message & profile detail 
    $('.profile-section').on('click', () => {

        if (counter == 0) {
            $.ajax({
                cache: true,
                type: "GET",
                dataType: 'json',
                url: 'http://www.json-generator.com/api/json/get/bVcmdcFQrS?indent=2',
                success: function (data) {
                    data.map(user => {
                        $('.mobile p').text(user.mobile);
                        $('.username p').text(user.username);
                        $('.bio p').text(user.bio);
                    });
                },
                complete: function () {
                    $('.fixed-header').addClass('detail');
                    showhide('.message-section', '.profile-detail');
                }
            });

            counter++;

        } else {
            $('.fixed-header').addClass('detail');
            showhide('.message-section', '.profile-detail');
        }

    });

    $('.back').on('click', () => {
        $('.fixed-header').removeClass('detail');
        showhide('.profile-detail', '.message-section');
    });

});

// functions --->

const sendMessage = () => {
    const list = $('#messages ul');
    const getTime = new Date();
    const message = $('#text-message').val().trim();
    const hours = getTime.getHours();
    const minutes = getTime.getMinutes();

    if (!message == '') {
        setTimeout(() => {
            list.append(`<li><p class="text">${message}<span class="time">${hours}:${minutes}</span></p></li>`);
            list.animate({ scrollTop: list.find('li').last().offset().top }, 1000);
        }, 2000);
    }

    $('#text-message').val('');
}

const showhide = (isHide, isShow) => {
    $(isHide).hide();
    $(isShow).fadeIn('slow');
}

