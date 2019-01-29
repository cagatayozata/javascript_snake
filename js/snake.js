
// snake coordinates
var snake = [ {x:5, y:5},{x:5, y:4},{x:5, y:3},{x:6, y:3},{x:7, y:3}] ;
var fruite_pos = [{ x:0, y:0 }];
var point=100;
var con=0;

// background ( grid )
function background_grid() {

  var row = '';
  var rowcolumn='';

  // creating rows
  for( var i = 0; i < 10; i++ )
    row += '<td cellpadding="0" cellspacing="0"></td>';

  // creating columns & merging rows and columns
  for( var i = 0; i < 10; i++ )
    rowcolumn += '<tr cellpadding="0" cellspacing="0">' + row + '</tr>';

  // including columns & rows to #game_area
  $('#game_area').append('<table id="cgmt" cellspacing="0">' + rowcolumn + '</table>');

}

// creating a snake
function snake_shape (){

  var head= snake[0];
  var body= snake[1];
  var tail= snake[4];
  var bodyTail;

  // creating head of snake
  var headTile =  findHeadTile() ;
  $('tr').eq( head.x ).find('td').eq(head.y).addClass('snakeHead').css("background-position", tile(headTile));

  // creating body of snake
  for (var i = 1; i < 4; i++) {
    bodyTail = findBodyTile(i) ;
    body=snake[i];
    $('tr').eq( body.x ).find('td').eq(body.y).addClass('snakeCell').css("background-position", tile(bodyTail)) ;
  }

    // creating tail of snake
    var tailTile =  findTailTile() ;
    $('tr').eq( tail.x ).find('td').eq(tail.y).addClass('snakeCell').css("background-position", tile(tailTile));

}

// returning head picture
function findHeadTile() {

    // head coordinates
    var head1=snake[0];
    var body1=snake[1];

    if (body1.x==head1.x && head1.y>body1.y)
      return 4;
    else if (body1.x==head1.x && head1.y<body1.y)
      return 8;
    else if (body1.y==head1.y && head1.x>body1.x)
        return 9;
      else
        return 3;

}

// returning tail picture
function findTailTile() {

  // tail coordinates
  var tail1=snake[4];
  var body3=snake[3];

  if (body3.x==tail1.x && tail1.y>body3.y)
    return 18;
  else if (body3.x==tail1.x && tail1.y<body3.y)
    return 14;
  else if (tail1.y==body3.y && tail1.x>body3.x)
      return 13;
    else
      return 19;

}

// returning body pictures
function findBodyTile(index) {

    // body coordinates
   var selected=snake[index];
   var next=snake[index+1];
   var pre=snake[index-1];

   //to turn left
   if (pre.y < selected.y && next.x > selected.x )
      return 2;
  else if(pre.x > selected.x && next.y < selected.y)
      return 2;
  //to turn right
    else if (pre.y > selected.y && next.x < selected.x)
      return 5;
  else if(pre.x < selected.x && next.y > selected.y)
      return 5;
   //to be horizontal body
   else if (pre.x === selected.x && next.y < selected.y)
      return 1;
  else if(pre.x === selected.x && next.y > selected.y )
      return 1;
  //to turn up
  else if (pre.y === selected.y && next.y < selected.y)
      return 12;
  else if (pre.x === selected.x && next.x < selected.x)
      return 12;
  //to turn down
   else if(pre.x > selected.x && next.y > selected.y )
      return 0;
  else if(pre.x === selected.x && next.x > selected.x)
      return 0;
  //to be vertical body
  else if(pre.x > selected.x && next.y === selected.y )
      return 7;
  else if(pre.x < selected.x && next.y === selected.y )
      return 7;

}

// calculating tile no
function tile(no) {
    var left = (no % 5) * -64 + "px" ;
    var top = Math.floor(no/5)* -64 + "px" ;
    return left + " " + top ;
}

// adding fruit
function add_fruit() {

  // receiving click position
  $("#cgmt td").click(function() {

      var col = parseInt( $(this).index() );
      var row= parseInt( $(this).parent().index() );

      if (con==0 && (snake[0].x != row || snake[0].y != col) && (snake[1].x != row || snake[1].y != col)&& (snake[2].x != row || snake[2].y != col)&& (snake[3].x != row || snake[3].y != col) && (snake[4].x != row || snake[4].y != col)) {
      fruite_pos[0].x=row;
      fruite_pos[0].y=col;

      // adding fruit to td
        $('tr').eq(row).find('td').eq(col).addClass('snakeCell').css("background-position", tile(15));
        directions();
        con=1;
      }

  });

}

// grid on-off
function grid_control() {

  // controlling selected whether or not
  $('input[type="checkbox"]').click(function(){
      // ON
      if($(this).prop("checked") == true){
        $('td').css({'border': '1px solid #ccc', 'height': '60px', 'width': '60px'});
        $('label').html("GRID ON") ;
      }
      // OFF
      else if($(this).prop("checked") == false){
          $('td').css({'border': 'none', 'height': '62px', 'width': '62px'});
         $('label').html("GRID OFF") ;
      }
  });

}

// tooltip
function somefood() {

  // head coordinate
  var head= snake[0];

  // adding tooltip
  $('tr').eq( head.x ).find('td').eq(head.y).qtip({ // Grab some elements to apply the tooltip to
    content: {
       text: 'Please Some Food!',
       title: 'SNAKE SAYS:',
   }
  });

}

// moving snake
function snakemove(dir) {

    for ( var i=snake.length-2; i >= 0; i--) {
        snake[i+1] = snake[i] ;
    }

    head = snake[0] ;
    snake[0] = { x: head.x +dir.x, y : head.y + dir.y } ;

    // calling tooltip
    somefood();

}

// sending directions
function directions() {

  var inteval;

  // setting interval
  interval=setInterval(function(){

      if(snake[0].x!=fruite_pos[0].x || snake[0].y!=fruite_pos[0].y){
        removeSnake();

       if (snake[0].x > fruite_pos[0].x) {

            snakemove({x:-1, y:0}) ;
        }
        else if (snake[0].x < fruite_pos[0].x){
            snakemove({x:1, y:0}) ;
        }
        else {
          if (snake[0].y > fruite_pos[0].y) {

              snakemove({x:0, y:-1}) ;
          }
          else {
              snakemove({x:0, y:1}) ;
          }
        }

         snake_shape();
      }

      if (con==1 && snake[0].x==fruite_pos[0].x && snake[0].y==fruite_pos[0].y) {
        $('#result').html(point).fadeIn().animate({'font-size':'200px'},400).fadeOut().animate({'font-size':'5px'},700);
          // increase point
          point+=100;
          // flag 0
          con=0;
          // clearing interval
          clearInterval(interval);
      }

  },500);

}

// removing snake
function removeSnake() {

    for ( var i=0; i<snake.length; i++) {
        // removing class td
        $('tr').eq( snake[i].x ).find('td').eq(snake[i].y).removeClass('snakeCell snakeHead').qtip('destroy');
    }

}

// main
$( document ).ready(function(){

  background_grid(); // backgorund

  snake_shape(); // snake

  add_fruit(); // add fruit

  grid_control(); // on-off

  somefood(); //tooltip

});
