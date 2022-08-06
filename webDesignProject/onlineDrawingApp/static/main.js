$(function () {
    // A whole lot of Variables that needed to be predefined!
    var syncClient;
    var syncStream;
    var colorSaver = 'black';
    var message = $('#message');
    var clearBtn = $('#clear-btn');
    var lineWidthBtn1 = $('#lineWidth-btn1');
    var lineWidthBtn2 = $('#lineWidth-btn2');
    var lineWidthBtn3 = $('#lineWidth-btn3');
    var lineWidthBtn4 = $('#lineWidth-btn4');
    var eraseBtn = $('#erase-btn');
    var drawBtn = $('#draw-btn');
    var canvas = $('.whiteboard')[0];
    var context = canvas.getContext('2d');
    var lineWidth = 2;
    var lineWidhtSaver = lineWidth;
    var current = {
        color: $("#colorPicker").val(),
    };
    var drawing = false;

    // Function to get and create tokens for Multiplayer
    $.getJSON('/token', function(tokenResponse) {
        syncClient = new Twilio.Sync.Client(tokenResponse.token, { logLevel: 'debug' });
        syncClient.on('connectionStateChanged', function(state) {
            if (state != 'connected') {
                message.html('Sync is not live (websocket connection <span style="color: red">' + state + '</span>)…');
            } else {
                message.html('Sync is live!');
            }
        });

        // create the stream object
        syncClient.stream('drawingData').then(function(stream) {
            syncStream = stream;
            // listen update and sync drawing data
            syncStream.on('messagePublished', function(event) {
                // console.log(event.message.value);
                syncDrawingData(event.message.value);
            });
        });
    });

    // Functions for the basic Line drawing/mouse tracking and enabling the lines to be seen by other players. 
    // DO NOT CHANGE!

    // Base Function and twilio sync features.
    function drawLine(x0, y0, x1, y1, color, syncStream) {
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.stroke();
        context.closePath();

        if (!syncStream) { return; }
        var w = canvas.width;
        var h = canvas.height;

        // publish the drawing data to Twilio Sync server
        syncStream.publishMessage({
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color
        });
    }

    // 4 Functions to get the mouseposition, functionality on mouseDown/-Up and calls drawLine to draw onMouseMove.
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }

    function onMouseDown(e) {
        drawing = true;
        getMousePos;
        current.x = e.clientX || e.touches[0].clientX;
        current.y = e.clientY || e.touches[0].clientY;
    }

    function onMouseUp(e) {
        if (!drawing) { return; }
        drawing = false;
        drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, syncStream);
    }

    function onMouseMove(e) {
        if (!drawing) { return; }
        drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, syncStream);
        current.x = e.clientX || e.touches[0].clientX;
        current.y = e.clientY || e.touches[0].clientY;
    }

    // Function to limit the events number per second
    function throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function() {
            var time = new Date().getTime();
            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }

    // Color Picker! This function enables the colorpicker to change the color of draw function and color saver.
    $('#colorPicker').on('change', function() {
        current.color = this.value;
        colorSaver = this.value;
    });

    // 4 Functions to change Line Width to 4 different presets. Includes feature to disable the selected widht button for QOL and readability.
    function changeLineWidth1(){
        lineWidth = 2;
        var btn = $('#lineWidth-btn1');
        btn.prop("disabled", true); 
        var btn = $('#lineWidth-btn2');
        btn.prop("disabled", false); 
        var btn = $('#lineWidth-btn3');
        btn.prop("disabled", false); 
        var btn = $('#lineWidth-btn4');
        btn.prop("disabled", false); 
    }

    function changeLineWidth2(){
        lineWidth = 5;
        var btn = $('#lineWidth-btn1');
        btn.prop("disabled", false); 
        var btn = $('#lineWidth-btn2');
        btn.prop("disabled", true); 
        var btn = $('#lineWidth-btn3');
        btn.prop("disabled", false); 
        var btn = $('#lineWidth-btn4');
        btn.prop("disabled", false); 
    }

    function changeLineWidth3(){
        lineWidth = 10;
        var btn = $('#lineWidth-btn1');
        btn.prop("disabled", false); 
        var btn = $('#lineWidth-btn2');
        btn.prop("disabled", false); 
        var btn = $('#lineWidth-btn3');
        btn.prop("disabled", true); 
        var btn = $('#lineWidth-btn4');
        btn.prop("disabled", false); 
    }

    function changeLineWidth4(){
        lineWidth = 20;
        var btn = $('#lineWidth-btn1');
        btn.prop("disabled", false); 
        var btn = $('#lineWidth-btn2');
        btn.prop("disabled", false); 
        var btn = $('#lineWidth-btn3');
        btn.prop("disabled", false); 
        var btn = $('#lineWidth-btn4');
        btn.prop("disabled", true); 
    }

    // Function to erase. Disables draw Button for useablity and to prevent issues. Stores previous color and Linewidth from draw for QOL. 
    // Also disables colorpicker so that the User cant change the erase color.
    function eraseDrawing(){
            colorSaver = current.color;
            lineWidhtSaver = lineWidth;
            current.color = 'white';
            changeLineWidth4();
        var btn = $('#erase-btn');
        btn.prop("disabled", true); 
        var btn = $('#draw-btn');
        btn.prop("disabled", false); 
        document.getElementById("colorPicker").disabled = true; 
    }

    // Function to draw. Disables Erase Button for useablity and to prevent issues. Gets stored color and Linewidth back from Erase. Linewidht needs to be taken back by function for buttons to properly enable/disable.
    function drawingLineButton(){
            current.color = colorSaver;
            if (lineWidhtSaver === 2) {
                changeLineWidth1();
            } else if (lineWidhtSaver === 5) {
                changeLineWidth2();
            } else if(lineWidhtSaver === 10) {
                changeLineWidth3();
            } else {
                changeLineWidth4();
            }
        var btn = $('#erase-btn');
        btn.prop("disabled", false); 
        var btn = $('#draw-btn');
        btn.prop("disabled", true); 
        document.getElementById("colorPicker").disabled = false; 
    }

    // Function to clear the entire board
    function clearBoard() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Make Global!!!
    };

    // event listeners for canvas for mouse and touch
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseout', onMouseUp);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10));
    canvas.addEventListener('touchstart', onMouseDown);
    canvas.addEventListener('touchend', onMouseUp);
    canvas.addEventListener('touchcancel', onMouseUp);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10));

    // Functions for all the buttons
    drawBtn.on('click', drawingLineButton);
    clearBtn.on('click', clearBoard);
    lineWidthBtn1.on('click', changeLineWidth1);
    lineWidthBtn2.on('click', changeLineWidth2);
    lineWidthBtn3.on('click', changeLineWidth3);
    lineWidthBtn4.on('click', changeLineWidth4);
    eraseBtn.on('click', eraseDrawing);

    // Event listener for resizing, followed by function for resize
    window.addEventListener('resize', onResize);
    onResize();

    function onResize() {
        canvas.width = drawArea.innerWidth;
        canvas.height = drawArea.innerHeight;
    };
    // Check if we can change reuse this to work without putting it full screen!

    // End
});