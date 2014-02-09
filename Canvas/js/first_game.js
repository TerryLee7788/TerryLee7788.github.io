window.addEventListener( 'load', eventWindowLoaded, false );

var Debugger = function(){};
Debugger.log = function( msg ){
    try{
        console.log(msg);
    }catch(exception){
        return ;
    }
};

function eventWindowLoaded(){
    canvasApp();
}
function canvasSupport (){
    return Modernizr.canvas;
}

function canvasApp(){
    var guesses = 0,
        message = '從a到z 猜一個字母 ',
        letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        today = new Date(),
        letterToGuess = '',
        higherOrLower = '',
        lettersGuessed,
        gameover = false;
    if( !canvasSupport() ){
        return ;
    }
    
    var theCanvas = document.getElementById('canvasOne'),
        context = theCanvas.getContext('2d');
    
    initGame();
    
    function initGame(){
        var letterIndex = Math.floor( Math.random() * letters.length );
        var formElement = document.getElementById('createImageData');
        letterToGuess = letters[letterIndex];
        guesses = 0;
        lettersGuessed = [];
        gameover = false;
        window.addEventListener( 'keyup', eventKeyPressed, true );
        formElement.addEventListener( 'click', createImageDataPressed, false );
        drawScreen();
    }
    
    function eventKeyPressed( e ){
        if( !gameover ){
            var letterPressed = String.fromCharCode( e.keyCode );
            letterPressed = letterPressed.toLowerCase();
            guesses++;
            lettersGuessed.push(letterPressed);
            
            if( letterPressed === letterToGuess ){
                gameover = true;
            }else{
                letterIndex = letters.indexOf( letterToGuess );
                guessIndex = letters.indexOf( letterPressed );
                Debugger.log( guessIndex );
                if( guessIndex < 0 ){
                    higherOrLower = '你在亂打吧!!!';
                }else if( guessIndex > letterIndex ){
                    higherOrLower = '低一點!!';
                }else{
                    higherOrLower = '高一點!!';
                }
            }
            drawScreen();
        }
    }
    function drawScreen(){
        //background
        context.fillStyle = '#ffffaa';
        context.fillRect( 0, 0, 500, 300 );
        
        //border
        context.strokeStyle = '#000000';
        context.strokeRect( 5, 5, 490, 290 );
        context.textBaseline = 'top';
        
        //date
        context.fillStyle = '#000000';
        context.font = '10px _sans';
        //context.fillText( today, 150, 10 );
        context.fillText( '今天是: ' + today.getFullYear() + ' / ' + (today.getMonth() + 1) + ' / ' + today.getDate(), 200, 10 );
        
        //news
        context.fillStyle = '#ff0000';
        context.font = '16px _sans';
        context.fillText( message, 125, 30 );
        
        //guess count
        context.fillStyle = '#109910';
        context.font = '16px _sans';
        context.fillText( '你已經猜了: [' + guesses + '] 次', 125, 60 );
        
        //show 低一點 or 高一點
        context.fillStyle = '#000000';
        context.font = '20px _sans';
        context.fillText('高一點或低一點: ' + higherOrLower, 150, 125 );
        
        //guessed text
        context.fillStyle = '#FF0000';
        context.font = '30px _sans';
        context.fillText('你猜過的字母: ' + lettersGuessed.toString(), 8, 258 );
        if( gameover ){
            context.fillStyle = '#FF0000';
            context.font = '40px _sans';
            context.fillText( '你猜對了!!', 150, 180 );
        }
    }
    function createImageDataPressed( e ){
        window.open( theCanvas.toDataURL(), 'canvasImage', 'left=0, top=0, width=' + theCanvas.width + ', height=' + theCanvas.heigth + ', toolbar=0, resizable=0' );
    }
}