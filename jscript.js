//Variables
const Lig = 26;
const Col  = 16;
let lines = 0;
let score = 0;
let gameOver = false;
let dropCounter = 0;
let lastTime = 0;
const colors = ["red", "green", "yellow", "blue", "purple", "cyan", "orange"];
const canvas = document.getElementById("tetrisCanva");
const ctx = canvas.getContext("2d");
const grid = createGrid(Lig,Col);
const interval = window.setInterval(GetMessage,3000);
const piece = 
[
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
];
const tetrisPiece =
    {
        pos:
            { x: 4,
                y: 2
            },
        piece: piece,
    };
const SHAPES =

    [
        [
            [0, 1, 0],
            [0, 1, 0],    //pièce J
            [1, 1, 0]
        ],

        [
            [0, 4, 0],
            [0, 4, 0],    //piece L
            [0, 4, 4]
        ],

        [
            [0, 0, 0],
            [5, 5, 5], //pièce T
            [0, 5, 0]
        ],

        [
            [0, 0, 0, 0],
            [0, 7, 7, 0],
            [0, 7, 7, 0],  // pièce O
            [0, 0, 0, 0]
        ],

        [
            [6, 6, 0],
            [0, 6, 6], // pièce Z
            [0, 0, 0]
        ],

        [
            [0, 3, 3],
            [3, 3, 0], //pièce S
            [0, 0, 0]
        ],

        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],  //pièce I
            [0, 2, 0, 0]
        ],

    ];

ctx.scale(15,15);

//objets
class player {
    constructor(id, name, team) 
    {
        this.id = id;
        this.name = name;
        this.team = team;
    }
    GetId()
    {
        return this.id;
    }
}

//boutons
const btn_RestartGame = document.getElementById("RestartGame");
btn_RestartGame.addEventListener("click", RestartGame);

const btn_AddConnect = document.getElementById("AddConnect");
btn_AddConnect.addEventListener("click", AddConnect);

const btn_AddMessage = document.getElementById("AddMessage");
btn_AddMessage.addEventListener("click", AddMessage);

const btn_ClientSettings = document.getElementById("btn_ClientSettings");
btn_ClientSettings.addEventListener("click", AfficherConnexionForm);

const btn_Partyline = document.getElementById("btn_Partyline");
btn_Partyline.addEventListener("click", AfficherPartyline);

const btn_Winner = document.getElementById("btn_WinList");
btn_Winner.addEventListener("click", AfficherWinner);

//fonctions d'affichages
function AfficherPartyline()
{
    Return();
    GetMessage();
    document.getElementById("Partyline").style.display = "inline";
    document.getElementById("chat").style.display="inline";
}

function AfficherConnexionForm()
{
    Return();
    document.getElementById("ConnexionForm").style.display = "inline";
}

function AfficherWinner()
{
    Return();
    GetWinner();
    document.getElementById("WinList").style.display = "inline";
}

function AfficherTetris()
{
    Return();
    timer();
    document.getElementById("tetris").style.display = "inline";
}

function Return()
{
    document.getElementById("ConnexionForm").style.display = "none";
    document.getElementById("Partyline").style.display = "none";
    document.getElementById("chat").style.display="none";
    document.getElementById("tetris").style.display = "none";
    document.getElementById("WinList").style.display = "none";
}

//fonctions jeu
function randomPiece()
{
    const pieces = "JLTOZSI";
    var random = Math.random();
    tetrisPiece.piece = createShape(pieces[Math.floor(pieces.length * random )]);
    tetrisPiece.pos.y = 0;
    tetrisPiece.pos.x = (grid[0].length / 2 |0 ) - (tetrisPiece.piece[0].length / 2 | 0); //on met | 0 après le /2

    if (collision (grid, tetrisPiece))
    {
        for (let i = 0; i < Lig; i++) 
        {  
            grid[i] = [];
            for (let j = 0; j < Col; j++) 
            {
                grid[i][j] =0;
                //alert("Game Over");
                gameOver = true;
                updatePlayer(gameOver);
                grid.unshift(new Array(Col).fill(0));
                break;
            }
        }
    }
}

function moveUP() 
{
    tetrisPiece.pos.y--;
    if (collision(grid, tetrisPiece)) 
    {
        tetrisPiece.pos.y++;
    }
}

function MoveDown() 
{
    tetrisPiece.pos.y++;
}

function MoveRight() 
{
    tetrisPiece.pos.x++;
    if (collision(grid, tetrisPiece)) 
    {
        tetrisPiece.pos.x--;
    }
}

function MoveLeft() 
{
    tetrisPiece.pos.x--;
    if (collision(grid, tetrisPiece)) 
    {
        tetrisPiece.pos.x++;
    }
}

function rotate(piece, direction) 
{ 
    for (let y = 0; y < piece.length; y++) 
    {
        for (let x = 0; x < y; x++) 
        {
            [piece[x][y], piece[y][x]] = [piece[y][x], piece[x][y]];
        }
    }
    if (direction > 0) 
    {
        piece.forEach((row) => row.reverse());
    } 
      else 
      {
        piece.reverse();
      }
}

function collision(grid, tetrisPiece) 
{
    for (let y = 0; y < tetrisPiece.piece.length; y++) 
    {
        for (let x = 0; x < tetrisPiece.piece[y].length; x++) 
        {
            if (tetrisPiece.piece[y][x] !== 0 && (grid[y + tetrisPiece.pos.y]
                && grid[y + tetrisPiece.pos.y][x + tetrisPiece.pos.x]) !== 0) 
                {
                    score++;
                    document.getElementById("score").innerText = score;
                    return true;
                }
        }
    }
    return false;
}

document.addEventListener("keydown",CONTROL);

function CONTROL(event)
{
    switch (event.keyCode) 
    {
        case 37: 
            MoveLeft();
            break;

        case 38: 
            rotate(piece, -1);
            let PositionDepart = tetrisPiece.pos.x;
            let decalage = 1;

            while (collision (grid, tetrisPiece)) 
            {
                tetrisPiece.pos.x +=decalage;
                decalage = -(decalage + (decalage > 0 ? 1 : -1));
                if (decalage > tetrisPiece.piece[0].length) 
                {
                    rotate(tetrisPiece.piece, direction);
                    player.pos.x = PositionDepart;
                    return;
                }
            }
            break;

        case 39:
            MoveRight();
            break;

        case 40:
            MoveDown();
            break;
    }
}

function createGrid(Lig, Col)
{
    let grid = [];

    for (let i = 0; i < Lig; i++) 
    {
        grid[i] = [];
        for (let j = 0; j < Col; j++) 
        {
            grid[i][j] =0;
        }
    }
    return grid;
}

function DrawPiece (piece, position) 
{
    piece.forEach((row, y) => 
    {
        row.forEach((value, x) => 
        {
            if (value !== 0) 
            {
                ctx.fillStyle = colors[value];
                ctx.fillRect(x + position.x, y+ position.y, 1, 1);
            }
        });
    });
}

function createShape(type)
{
    if (type ==="J")
    {
        return SHAPES[0];
    }
    else if (type ==="L") 
    {
        return SHAPES[1];
    }
    else if (type ==="T") 
    {
        return SHAPES[2];
    }
    else if (type ==="O") 
    {
        return SHAPES[3];
    }
    else if (type ==="Z") 
    {
        return SHAPES[4];
    }
    else if (type ==="S") 
    {
        return SHAPES[5];
    }
    else if (type ==="I") 
    {
        return SHAPES[6];
    }
}

function draw()
{
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    DrawPiece(grid, { x: 0, y: 0 });
    DrawPiece(tetrisPiece.piece, tetrisPiece.pos);
}

function timer(time = 0)
{
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if(dropCounter > 1000) 
    {
        MoveDown();
        if (collision(grid, tetrisPiece)) 
        {
            moveUP();
            print(grid, tetrisPiece);
            randomPiece();
            removeFullLines();
        }
        dropCounter = 0;
    }
    if(!gameOver)
    {
        draw();
        requestAnimationFrame(timer);
    }
}

function print(grid, tetrisPiece) 
{
    tetrisPiece.piece.forEach((row, y) => 
    {
        row.forEach((value, x) => 
        {
            if (value !== 0) 
            {
                grid[y + tetrisPiece.pos.y][x + tetrisPiece.pos.x] = value;
            }
        });
    });
}

function removeFullLines()
{
    grid.forEach((row,y) =>
    {
        if (row.every(value => value > 0))
        {
            lines++;
            score = score + 15;
            updatePlayer(gameOver);
            document.getElementById("ligne").innerText = lines;
            document.getElementById("score").innerText = score;
            grid.splice(y,1);
            grid.unshift(Array(Col).fill(0));
        }
    });
}

function RestartGame()
{
    timer();
    location.reload();
    document.getElementById("tetris").style.display = "inline";
    document.getElementById("StartGame").style.display = "inline";
}

//les requetes
function AddMessage()
{
    var xhr = new XMLHttpRequest();
    var NameParty = document.getElementById("NameParty").value;
    var Team = document.getElementById("TeamParty").value;
    var Message = document.getElementById("Message").value;

    var data = "para1="+encodeURIComponent(NameParty);
    data = data+"&para2="+encodeURIComponent(Team);
    data = data+"&para3="+encodeURIComponent(Message);

    xhr.open("POST","Chat.php");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(data);
}

function AddConnect()
{
    var xhr = new XMLHttpRequest();
    var name = document.getElementById("Name").value;
    var team = document.getElementById("Team").value;

    var data = "para1="+encodeURIComponent(name);
    data = data+"&para2="+encodeURIComponent(team);

    xhr.open("POST","Inscription.php");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(data);
    GetPlayer();
}

function GetPlayer()
{
    var xhr = new XMLHttpRequest();
    var name = document.getElementById("Name").value;
    var team = document.getElementById("Team").value;
    var data = "para1="+encodeURIComponent(name);
    data = data+"&para2="+encodeURIComponent(team);
    let player1;

    xhr.onreadystatechange = function() 
    {
        if (this.readyState === 4 && this.status === 200) 
        {
            displayPlayer = document.getElementById("displayPlayer");
            let response = JSON.parse(xhr.response);
            player1 = new player(response.pid,name, team);
            displayPlayer.innerHTML = "player " + player1.GetId();
        }
    }
    xhr.open("GET", "RecupPlayer.php?"+data);
    xhr.send();

    Return();
    AfficherTetris();
}

function GetMessage()
{
    var xhr = new XMLHttpRequest();
    var totaMessage = "";
    xhr.onreadystatechange = function() 
    {
        if (this.readyState === 4 && this.status === 200) 
        {
            const arrayMsg = JSON.parse(xhr.responseText);
            table = document.getElementById("TableMsg");

            for(var i of arrayMsg)
            {
                var row = "<p><b>" + i.name + "</b><br>" + i.msg + "<br></p>" ;
                totaMessage += row;
            }
            table.innerHTML = totaMessage;
        }
    }
    xhr.open("GET", "RecupMessage.php");
    xhr.send();
}

function GetWinner(){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            winner = document.getElementById("winner");
            let response = JSON.parse(xhr.response);
            winner.innerHTML = "Le gagnant est : " + response.name + " de la team " + response.team + " avec " + response.lines + " lignes !" ;
        }
    }
    xhr.open("GET", "RecupWinner.php");
    xhr.send();
}

function updatePlayer(gameOver){
    var xhr = new XMLHttpRequest();
    var name = document.getElementById("Name").value;
    var team = document.getElementById("Team").value;
    var lost = 0;
    if(gameOver === true){
        lost = 1;
    }

    var data = "para1="+encodeURIComponent(name);
    data = data+"&para2="+encodeURIComponent(team);
    data = data+"&para3="+encodeURIComponent(lines);
    data = data+"&para4="+encodeURIComponent(lost);

    xhr.open("POST", "UpdatePlayer.php");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(data);
}