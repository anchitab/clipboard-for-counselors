function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
        document.getElementById("signout").style.cssFloat = "left";

    } else {
        x.className = "topnav";
        document.getElementById("signout").style.cssFloat = "right";
    }
}
