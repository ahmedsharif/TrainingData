for (let i = 0; i < 7; i++) {
      x = "txt" + i;
      document.getElementById(x).firstChild.nodeValue = '&<>'
    }

    document.getElementById("innerHTMLtxt").textContent =
        document.getElementById("txt").innerHTML
    document.getElementById("textContenttxt").textContent =
        document.getElementById("txt").textContent

    function modifyText() {
      var t2 = document.getElementById("t2");
      alert(t2.firstChild.nodeValue);
      if (t2.firstChild.nodeValue == "three") {
        t2.firstChild.nodeValue = "two";
      } else {
        t2.firstChild.nodeValue = "three";
      }
    }

    function modifyText(new_text) {
      var t2 = document.getElementById("t2");
      t2.firstChild.nodeValue = new_text;
     }

    // add event listener to table
    var el = document.getElementById("outside");
    //el.addEventListener("click", modifyText, false);

    el.addEventListener("click", function(){modifyText("four")}, false);
