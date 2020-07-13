$(document).ready(function () {

    // BURGER MENU
    $('.burger_btn').on('click', function () {
        $('.burger_menu').toggleClass('burger_menu_click');
    })
    $('.burger_menu li').on('click', function () {
        $('.burger_menu').removeClass('burger_menu_click');
    })

    // ACTIVE LINK

    var positions = [],
        currentActive = null,
        links = $('.scroll-to');

    $(".anchor").each(function () {
        positions.push({
            top: $(this).position().top - 100,
            a: links.filter('[href="#' + $(this).attr('id') + '"]')
        });
    });

    positions = positions.reverse();

    $(window).on('scroll', function () {
        var winTop = $(window).scrollTop();
        for (var i = 0; i < positions.length; i++) {
            if (positions[i].top < winTop) {
                if (currentActive !== i) {
                    currentActive = i;
                    links.removeClass('active');
                    positions[i].a.addClass("active");
                }
                break;
            }
        }
    });

    // ANCHOR
    $(document).ready(function () {
        $(".header_menu, .footer_menu, .burger_menu").on("click", "a", function (event) {
            event.preventDefault();
            var id = $(this).attr('href'),
                top = $(id).offset().top;
            $('body,html').animate({
                scrollTop: top
            }, 1000);
        });
    });

    // GSAP SCROLL
    var controller = new ScrollMagic.Controller();

    var h = document.querySelector("svg").getBoundingClientRect().height;

    var action = gsap.timeline()
        .to(".car", {
            duration: 750,
            repeat: 0,
            paused: false,
            yoyo: false,
            ease: "slow",
            motionPath: {
                path: "#test-path-1",
                align: "#test-path-1",
                autoRotate: false,
                alignOrigin: [0.5, 0.5]
            }
        }).to(".car", {
            duration: 85,
            repeat: 0,
            paused: false,
            yoyo: false,
            ease: "slow",
            motionPath: {
                path: "#test-path-2",
                align: "#test-path-2",
                autoRotate: false,
                alignOrigin: [0.5, 0.5]
            }
        }).to(".car", {
            duration: 85,
            repeat: 0,
            paused: false,
            yoyo: false,
            ease: "slow",
            motionPath: {
                path: "#test-path-3",
                align: "#test-path-3",
                autoRotate: false,
                alignOrigin: [0.5, 0.5]
            }
        })



    var scene = new ScrollMagic.Scene({
            duration: 2200,
            triggerHook: 0.06,
            triggerElement: '.trigger_start'
        })
        .setTween(action)
        .addTo(controller)

    // HOME BANNER SLIDER

    var slideWrapper = $(".main-slider"),
        iframes = slideWrapper.find('.embed-player'),
        lazyImages = slideWrapper.find('.slide-image'),
        lazyCounter = 0;

    // POST commands to YouTube
    function postMessageToPlayer(player, command) {
        if (player == null || command == null) return;
        player.contentWindow.postMessage(JSON.stringify(command), "*");
    }

    // When the slide is changing
    function playPauseVideo(slick, control) {
        var currentSlide, slideType, startTime, player, video;

        currentSlide = slick.find(".slick-current");
        slideType = currentSlide.attr("class").split(" ")[1];
        player = currentSlide.find("iframe").get(0);
        startTime = currentSlide.data("video-start");

        if (slideType === "youtube") {
            switch (control) {
                case "play":
                    postMessageToPlayer(player, {
                        "event": "command",
                        "func": "mute"
                    });
                    postMessageToPlayer(player, {
                        "event": "command",
                        "func": "playVideo"
                    });
                    break;
                case "pause":
                    postMessageToPlayer(player, {
                        "event": "command",
                        "func": "pauseVideo"
                    });
                    break;
            }
        }
    }

    // Resize player
    function resizePlayer(iframes, ratio) {
        if (!iframes[0]) return;
        var win = $(".main-slider"),
            width = win.width(),
            playerWidth,
            height = win.height(),
            playerHeight,
            ratio = ratio || 16 / 9;

        iframes.each(function () {
            var current = $(this);
            if (width / ratio < height) {
                playerWidth = Math.ceil(height * ratio);
                current.width(playerWidth).height(height).css({
                    left: (width - playerWidth) / 2,
                    top: 0
                });
            } else {
                playerHeight = Math.ceil(width / ratio);
                current.width(width).height(playerHeight).css({
                    left: 0,
                    top: (height - playerHeight) / 2
                });
            }
        });
    }

    // DOM Ready
    $(function () {
        // Initialize
        slideWrapper.on("init", function (slick) {
            slick = $(slick.currentTarget);
            setTimeout(function () {
                playPauseVideo(slick, "play");
            }, 1000);
            resizePlayer(iframes, 16 / 9);
        });
        slideWrapper.on("beforeChange", function (event, slick) {
            slick = $(slick.$slider);
            playPauseVideo(slick, "pause");
        });
        slideWrapper.on("afterChange", function (event, slick) {
            slick = $(slick.$slider);
            playPauseVideo(slick, "play");
        });
        slideWrapper.on("lazyLoaded", function (event, slick, image, imageSource) {
            lazyCounter++;
            if (lazyCounter === lazyImages.length) {
                lazyImages.addClass('show');
            }
        });

        //start the slider
        slideWrapper.slick({
            autoplaySpeed: 8000,
            lazyLoad: "progressive",
            speed: 600,
            arrows: true,
            autoplay: true,
            dots: true,
            cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
            prevArrow: '<svg class="prev_arr" width="24" height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Path" fill-rule="evenodd" clip-rule="evenodd" d="M23.2917 19.921L4.10222 0.70841C3.15777 -0.237139 1.62701 -0.237139 0.708337 0.70841C-0.236112 1.62776 -0.236112 3.16088 0.708337 4.10635L18.2139 21.6331L0.708337 39.1597C-0.236112 40.1052 -0.236112 41.6122 0.708337 42.5577C1.62701 43.5031 3.15777 43.5031 4.10222 42.5577L23.2918 23.3189C24.2361 22.3996 24.2361 20.8665 23.2917 19.921Z" fill="white"/></svg>',
            nextArrow: '<svg class="next_arr" width="24" height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Path" fill-rule="evenodd" clip-rule="evenodd" d="M23.2917 19.921L4.10222 0.70841C3.15777 -0.237139 1.62701 -0.237139 0.708337 0.70841C-0.236112 1.62776 -0.236112 3.16088 0.708337 4.10635L18.2139 21.6331L0.708337 39.1597C-0.236112 40.1052 -0.236112 41.6122 0.708337 42.5577C1.62701 43.5031 3.15777 43.5031 4.10222 42.5577L23.2918 23.3189C24.2361 22.3996 24.2361 20.8665 23.2917 19.921Z" fill="white"/></svg>',
        });
    });

    // Resize event
    $(window).on("resize.slickVideoPlayer", function () {
        resizePlayer(iframes, 16 / 9);
    });

    // MAP INIT

    $(function () {
        var map;
        var infoBox = new google.maps.InfoWindow();
        var mapContainer = $('#map');
        mapContainer.width('70%').height(500);

        function initialize() {
            var mapOptions = {
                center: new google.maps.LatLng(34.02, -118.69),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#444444"
                        }]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#f2f2f2"
                        }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [{
                                "saturation": -100
                            },
                            {
                                "lightness": 45
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "simplified"
                        }]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{
                                "color": "#91f1bd"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    }
                ]
            };

            map = new google.maps.Map(document.getElementById("map"), mapOptions);

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(34.02, -118.69),
                map: map,
                icon: 'img/marker.png'
            });

        }

        initialize();

        let cityListItem = [{
                "city": "Los Angeles",
                "lat": 34.02,
                "lng": -118.69,
                "address": "2005 Stokes Isle Apt, 896 , Los Angeles 10010",
                "schedule_1": "11:00-19:00",
                "schedule_2": "11:00-16:00",
                "phone1": "(0043) 568 456 902",
                "phone2": "+380654535463",
                "email1": "hello@pad.architectu",
                "email2": "support@pad.architec"
            },
            {
                "city": "New York",
                "lat": 40.69,
                "lng": -74.25,
                "address": "2065 Stokes Isle Apt, 896 , New York 10010",
                "schedule_1": "11:00-18:00",
                "schedule_2": "11:00-15:00",
                "phone1": "(0043) 568 456 902",
                "phone2": "+380654535463",
                "email1": "hello@pad.architectu",
                "email2": "support@pad.architec"
            },
            {
                "city": "Boston",
                "lat": 42.31,
                "lng": -71.11,
                "address": "2005 Stokes Isle Apt, 896 , Boston 10010",
                "schedule_1": "11:00-20:00",
                "schedule_2": "11:00-16:00",
                "phone1": "(0043) 568 456 902",
                "phone2": "+380654535463",
                "email1": "hello@pad.architectu",
                "email2": "support@pad.gmail"
            },
            {
                "city": "Detroit",
                "lat": 42.3,
                "lng": -83.2,
                "address": "2005 Stokes Isle Apt, 896 , Detroit 010",
                "schedule_1": "11:00-21:00",
                "schedule_2": "11:00-16:00",
                "phone1": "(0043) 568 456 902",
                "phone2": "+380654535463",
                "email1": "hello@pad.com",
                "email2": "support@pad.architec"
            }

        ];

        function initListItem(data) {
            if (data.length > 0) {
                var list = $('<div>');
                $.each(data, function (index, city) {
                    var item = $('<div class="city_item">')
                        .on('click', city, showCity)
                        .html(`<div class="d_flex city_title_container"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.6719 24.3594C23.6094 24.4062 23.5391 24.4375 23.4609 24.4531C23.3984 24.4844 23.3281 24.5 23.25 24.5C23.2031 24.5 23.1562 24.4922 23.1094 24.4766C23.0625 24.4766 23.0156 24.4688 22.9688 24.4531L15.75 21.5469L8.55469 24.4297C8.53906 24.4297 8.53125 24.4297 8.53125 24.4297C8.53125 24.4297 8.53125 24.4375 8.53125 24.4531C8.53125 24.4531 8.52344 24.4531 8.50781 24.4531C8.46094 24.4688 8.41406 24.4766 8.36719 24.4766C8.33594 24.4922 8.29688 24.5 8.25 24.5C8.20312 24.5 8.15625 24.4922 8.10938 24.4766C8.07812 24.4766 8.03906 24.4688 7.99219 24.4531C7.99219 24.4531 7.98438 24.4531 7.96875 24.4531C7.96875 24.4375 7.96875 24.4297 7.96875 24.4297C7.96875 24.4297 7.96094 24.4297 7.94531 24.4297L0.46875 21.4531C0.328125 21.3906 0.210938 21.2969 0.117188 21.1719C0.0390625 21.0469 0 20.9062 0 20.75V2.75C0 2.64063 0.0234375 2.53125 0.0703125 2.42188C0.117188 2.3125 0.1875 2.22656 0.28125 2.16406C0.375 2.08594 0.476562 2.03906 0.585938 2.02344C0.710938 1.99219 0.828125 1.99219 0.9375 2.02344L3.9375 2.77344C4.14062 2.82031 4.28906 2.9375 4.38281 3.125C4.49219 3.29688 4.52344 3.48438 4.47656 3.6875C4.42969 3.89062 4.3125 4.04688 4.125 4.15625C3.95312 4.25 3.76562 4.27344 3.5625 4.22656L1.5 3.71094V20.2344L7.5 22.6484V17.75C7.5 17.5469 7.57031 17.375 7.71094 17.2344C7.86719 17.0781 8.04688 17 8.25 17C8.45312 17 8.625 17.0781 8.76562 17.2344C8.92188 17.375 9 17.5469 9 17.75V22.6484L15 20.2344V17.75C15 17.5469 15.0703 17.375 15.2109 17.2344C15.3672 17.0781 15.5469 17 15.75 17C15.9531 17 16.125 17.0781 16.2656 17.2344C16.4219 17.375 16.5 17.5469 16.5 17.75V20.2344L22.5 22.6484V6.33594L20.0625 5.72656C19.8594 5.67969 19.7031 5.57031 19.5938 5.39844C19.5 5.21094 19.4766 5.01562 19.5234 4.8125C19.5703 4.60938 19.6797 4.46094 19.8516 4.36719C20.0391 4.25781 20.2344 4.22656 20.4375 4.27344L23.4375 5.02344C23.5938 5.07031 23.7266 5.16406 23.8359 5.30469C23.9453 5.42969 24 5.57812 24 5.75V23.75C24 23.875 23.9688 23.9922 23.9062 24.1016C23.8594 24.2109 23.7812 24.2969 23.6719 24.3594ZM12.4922 18.3125C12.4141 18.375 12.3359 18.4219 12.2578 18.4531C12.1797 18.4844 12.0938 18.5 12 18.5C11.9062 18.5 11.8203 18.4844 11.7422 18.4531C11.6641 18.4219 11.5859 18.375 11.5078 18.3125C11.4453 18.2656 11.0859 17.9297 10.4297 17.3047C9.77344 16.6641 9.05469 15.8359 8.27344 14.8203C7.50781 13.8047 6.8125 12.6484 6.1875 11.3516C5.5625 10.0391 5.25 8.67969 5.25 7.27344C5.25 6.35156 5.42188 5.47656 5.76562 4.64844C6.125 3.82031 6.60938 3.10156 7.21875 2.49219C7.84375 1.88281 8.5625 1.39844 9.375 1.03906C10.1875 0.679687 11.0625 0.5 12 0.5C12.9375 0.5 13.8125 0.679687 14.625 1.03906C15.4375 1.39844 16.1484 1.88281 16.7578 2.49219C17.3828 3.10156 17.8672 3.82031 18.2109 4.64844C18.5703 5.47656 18.75 6.35156 18.75 7.27344C18.75 8.67969 18.4375 10.0391 17.8125 11.3516C17.1875 12.6484 16.4844 13.8047 15.7031 14.8203C14.9375 15.8359 14.2266 16.6641 13.5703 17.3047C12.9141 17.9297 12.5547 18.2656 12.4922 18.3125ZM12 2C11.2812 2 10.6016 2.14062 9.96094 2.42188C9.32031 2.6875 8.75781 3.0625 8.27344 3.54688C7.80469 4.03125 7.42969 4.59375 7.14844 5.23438C6.88281 5.875 6.75 6.55469 6.75 7.27344C6.75 8.28906 6.95312 9.28906 7.35938 10.2734C7.78125 11.2578 8.27344 12.1797 8.83594 13.0391C9.41406 13.8828 10 14.625 10.5938 15.2656C11.1875 15.9062 11.6562 16.3906 12 16.7188C12.3438 16.3906 12.8125 15.9062 13.4062 15.2656C14 14.6094 14.5781 13.8594 15.1406 13.0156C15.7188 12.1719 16.2109 11.2578 16.6172 10.2734C17.0391 9.28906 17.25 8.28906 17.25 7.27344C17.25 6.55469 17.1094 5.875 16.8281 5.23438C16.5625 4.59375 16.1875 4.03125 15.7031 3.54688C15.2344 3.0625 14.6797 2.6875 14.0391 2.42188C13.3984 2.14062 12.7188 2 12 2ZM9 7.29688C9 6.46875 9.28906 5.76562 9.86719 5.1875C10.4609 4.59375 11.1719 4.29688 12 4.29688C12.8281 4.29688 13.5312 4.59375 14.1094 5.1875C14.7031 5.76562 15 6.46875 15 7.29688C15 8.125 14.7031 8.83594 14.1094 9.42969C13.5312 10.0078 12.8281 10.2969 12 10.2969C11.1719 10.2969 10.4609 10.0078 9.86719 9.42969C9.28906 8.83594 9 8.125 9 7.29688ZM13.5 7.29688C13.5 6.89062 13.3516 6.53906 13.0547 6.24219C12.7578 5.94531 12.4062 5.79688 12 5.79688C11.5938 5.79688 11.2422 5.94531 10.9453 6.24219C10.6484 6.53906 10.5 6.89062 10.5 7.29688C10.5 7.71875 10.6484 8.07812 10.9453 8.375C11.2422 8.65625 11.5938 8.79688 12 8.79688C12.4062 8.79688 12.7578 8.65625 13.0547 8.375C13.3516 8.07812 13.5 7.71875 13.5 7.29688Z" fill="#BBBBBB"/>
                        </svg>
                        <p class="city_title">${city.city}</p>
                        </div>
                        <span class="city_address">${city.address}</span>
                        `);
                    list.append(item);
                });
                $('#cities').html(list);
            }
        };
        initListItem(cityListItem);

        function showCity(event) {
            let mapInfoBox = $('.map_info_box');
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(event.data.lat, event.data.lng),
                map: map,
                icon: 'img/marker.png'
            });
            mapInfoBox = mapInfoBox.html(
                `
                    <div class="city">${event.data.city}</div>
                            <div class="address">${event.data.address}</div>
                            <div class="work_schedule">
                                <div class="title">
                                    <img src="img/clock.png">
                                    <p class="title_name">Work Schedule</p>
                                </div>
                                <p class="black_font">Mon - Sat:<span class="grey_font">${event.data.schedule_1}</span></p>
                                <p class="black_font">Sun:<span class="grey_font">${event.data.schedule_2}</span></p>
                            </div>
                            <div class="phone">
                                <div class="title">
                                    <img src="img/phone.png">
                                    <p class="title_name">Phone</p>
                                </div>
                                <a class="grey_font" href="tel:${event.data.phone1}">${event.data.phone1} </a>
                                <a class="grey_font" href="${event.data.phone2}">${event.data.phone2}</a>
                            </div>
                            <div class="email">
                                <div class="title">
                                    <img src="img/mail.png">
                                    <p class="title_name">Email</p>
                                </div>
                                <a class="grey_font" href="mailto:${event.data.email1}">${event.data.email1}</a>
                                <a class="grey_font" href="mailto:${event.data.email2}">${event.data.email2}</a>
                            </div>
                `
            );
            var coords = new google.maps.LatLng(event.data.lat, event.data.lng);
            infoBox.open(map);
            map.setCenter(coords);
        }
    });

    // HEADER SCROLL

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1) {
            $('header').addClass("header_restyle");
        } else {
            $('header').removeClass("header_restyle");
        }
    });


    // BANNER

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    const bgVideoID = document.querySelector('.js-background-video').getAttribute('data-video');

    const playerOptions = {

        autoplay: 1,
        mute: 1,
        autohide: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        iv_load_policy: 3,
        loop: 1,
        playlist: bgVideoID,

    }

    const videoOverlay = document.querySelector('.js-video-overlay');

    let ytPlayer;

    function onYouTubeIframeAPIReady() {
        ytPlayer = new YT.Player('yt-player', {
            width: '1280',
            height: '720',
            videoId: bgVideoID,
            playerVars: playerOptions,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }


    function onPlayerReady(event) {
        event.target.playVideo();

        const videoDuration = event.target.getDuration();

        setInterval(function () {
            const videoCurrentTime = event.target.getCurrentTime();
            const timeDifference = videoDuration - videoCurrentTime;

            if (2 > timeDifference > 0) {
                event.target.seekTo(0);
            }
        }, 1000);
    }


    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            videoOverlay.classList.add('header__video-overlay--fadeOut');
        }
    }


})