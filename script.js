window.onload = function() {

         // create a couple of elements in an otherwise empty HTML page
         var heading = document.createElement("h1");
         var heading_text = document.createTextNode("Big Head!");
         heading.appendChild(heading_text);
         document.body.appendChild(heading);

         var test = document.createElement("p");
         var text = document.createTextNode("welcome in arbisoft");
         test.appendChild(text);
         document.body.appendChild(test);
      }
        function changeColor(newColor) {
        var elem = document.getElementById('para');
        elem.style.color = newColor;
}
        function getTagData(){
        var data = document.getElementByTagName('p').innerHTML('data');
        }


        var b = document.querySelector("button");
       // b.setAttribute("name","helloButton");
       // b.setAttribute("disabled","");

        var div1 = document.getElementById("para");
        alert(div1);

        //window.dump("ddddddd");