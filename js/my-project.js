// global data
let datas = [
  {
    endDate: "2023-02-22",
    imagesProject: "./assets/images/blog-img-detail.png",
    namaProject: "Pasar Coding di Indonesia Dinilai Masih Menjanjikan",
    next: '<li><img src="./assets/images/teknology/next-logo.svg" alt="" width="50px" height="50" /></li>',
    node: '<li><img src="./assets/images/teknology/node-logo.svg" alt="" width="50px" height="50" /></li>',
    react: "",
    startDate: "2023-01-25",
    textAreaInput: "Pernahkah kalian merasa terkagum-kagum dengan teknologi masa depan yang kalian jumpai pada film-film sci-fi.",
    type: "",
    link: "./blog-content.html",
  },
];

// function getData to tigger submit buttonn
function getData(event) {
  event.preventDefault();

  let namaProject = document.getElementById("namaProject").value;
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let textAreaInput = document.getElementById("text-area-input").value;
  let imagesProject = document.getElementById("img-project").files;

  // getting values thecnology
  let node = document.getElementById("checkBoxNode").checked ? document.getElementById("checkBoxNode").value : false;
  let react = document.getElementById("checkBoxReact").checked ? document.getElementById("checkBoxReact").value : false;
  let next = document.getElementById("checkBoxNext").checked ? document.getElementById("checkBoxNext").value : false;
  let type = document.getElementById("checkBoxType").checked ? document.getElementById("checkBoxType").value : false;

  //  validation input
  if (namaProject == "") {
    alert("harap masukan nama");
  } else if (startDate == "") {
    alert("harap masukan tanggal mulai project");
  } else if (endDate == "") {
    alert("harap masukan tanggal berakhir project");
  } else if (textAreaInput == "") {
    alert("harap masukan penjelsan project anda");
  } else if (node == false && react == false && next == false && type == false) {
    alert("harap pilih salah satu");
  } else if (imagesProject.length == 0) {
    alert("harap masukan gambar anda");
  } else {
    // create url object to image input
    imagesProject = URL.createObjectURL(imagesProject[0]);

    node = node != false ? `<li><img src="${node}" alt="" width="50px" height="50" /></li>` : "";
    next = next != false ? `<li><img src="${next}" alt="" width="50px" height="50" /></li>` : "";
    react = react != false ? `<li><img src="${react}" alt="" width="50px" height="50" /></li>` : "";
    type = type != false ? `<li><img src="${type}" alt="" width="50px" height="50" /></li>` : "";

    // created blog object
    let blogData = {
      namaProject,
      startDate,
      endDate,
      textAreaInput,
      imagesProject,
      node,
      react,
      next,
      type,
      atPost: new Date(),
    };

    // push blog data to global object
    datas.push(blogData);
    // calling function showdata
    console.log(datas);
    // calling function showData
    showData();
  }
}

// global render data
window.onload = function () {
  if (datas.length != 0) {
    showData();
  }
};

// function showData
function showData() {
  console.log("hello world");
  document.getElementById("all-card").innerHTML = "";
  // created button
  let dltButtn = document.createElement("button");
  dltButtn.innerText = "delete button";
  let edtButtn = document.createElement("button");
  edtButtn.innerText = "edit button";
  //
  for (let index = 0; index < datas.length; index++) {
    document.getElementById("all-card").innerHTML += ` 
    <div class="card-dinamis" id="dinamisCard">
            <div class="image" id="imageProject"><img src="${datas[index].imagesProject}" alt="" /></div>
            <div class="header-blog">
              <h1 class="judul-blog"><a href="${datas[index].link}">${datas[index].namaProject}</a></h1>
            </div>
            <div class="deskrip-waktu" >
              <p>${dataDate(datas[index].startDate, datas[index].endDate)}</p>
            </div>
            <div class="article-blog">
              <p>${datas[index].textAreaInput}</p>
            </div>
            <div class="technology">
              <ul>
               ${datas != false ? datas[index].node : ""}
               ${datas != false ? datas[index].react : ""}
                ${datas != false ? datas[index].next : ""}
                ${datas != false ? datas[index].type : ""}
                </ul>
            </div>
            <div class="group-button">
            <div class="editButton">
              <button class="editButton">edit</button>
            </div>
            <div class="deleteButton">
              <button class="deleteButton">delete</button>
            </div>
          </div>
          </div>
          `;
  }
}

// function dateLine
function dataDate(start, end) {
  let firstValue = new Date(start).getTime();
  let secondValue = new Date(end).getTime();
  let difference = secondValue - firstValue;

  let valueMonth = Math.floor(difference / (30 * 24 * 60 * 60 * 1000));
  if (valueMonth > 0) {
    return `deadline ${valueMonth} bulan lagi`;
  } else {
    let valueWeek = Math.floor(difference / (7 * 24 * 60 * 60 * 1000));
    if (valueWeek > 0) {
      return `Durasi: ${valueWeek}`;
    } else {
      let valueDay = Math.floor(difference / (24 * 60 * 60 * 1000));
      if (valueDay > 0) {
        return `Durasi: ${valueDay}`;
      } else {
        let valueHour = Math.floor(difference / (60 * 60 * 1000));
        if (valueHour > 0) {
          return `Durasi: ${valueHour}`;
        } else {
          let minuteValue = Math.floor((difference / 60) * 1000);
          if (minuteValue > 0) {
            return `Durasi: ${minuteValue}`;
          } else {
            let secondValue = Math.floor(difference / 1000);
            if (secondValue > 0) {
              return `deadline ${secondValue} lagi`;
            } else {
              return `waktu anda sudah habis`;
            }
          }
        }
      }
    }
  }
}
