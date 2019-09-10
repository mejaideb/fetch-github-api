var baseurl = "https://api.github.com/users/";
var todo;
var tbl;

function submit() {
  var name = document.getElementById("name");
  getGitUsers(name.value);
}

function getGitUsers(name) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", baseurl + name + "/repos", true);

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      todo = JSON.parse(xmlhttp.responseText);
      var tbltop = `<table id="table">
         <tr><th>Id</th><th>Full_name</th><th>Forks</th><th>Watchers</th><th>language</th><th>MarkImportant</th></tr>`;
      //main table content we fill from data from the rest call
      var main = "";
      for (i = 0; i < todo.length; i++) {
        main +=
          "<tr><td>" +
          todo[i].id +
          "</td><td>" +
          todo[i].full_name +
          "</td><td>" +
          todo[i].fork +
          "</td><td>" +
          todo[i].watchers +
          "</td><td>" +
          todo[i].language +
          "</td><td>" +
          "<button class='MarkImportantButton'>Mark Important</button>" +
          "</td></tr>";
      }
      var tblbottom = "</table>";
      tbl = tbltop + main + tblbottom;
      document.getElementById("data").innerHTML = tbl;

      let buttons = document.querySelectorAll(".MarkImportantButton");
      buttons.forEach(button =>
        button.addEventListener("click", _ => handleMarkImportant(button))
      );
    }
  };
  xmlhttp.send();
}

function handleMarkImportant(button) {
  let impTable = document.getElementById("imp");
  impTable.appendChild(button.parentElement.parentElement);
  button.remove();
}
