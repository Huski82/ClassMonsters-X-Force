let newMessages, newMessageAlert,sendMessageBtn, newMessageCreateBtn;
let messCreateFrom, messChanged,params;
let messIdLoc = document.querySelector('.message-id');
let messSubject = document.querySelector('.message-subject')
let messText = document.querySelector('.message-textarea');
let messFrom = document.querySelector('.message-from')
let messList = document.querySelectorAll('.list-container .list-group');
let lname,fname,role,full_name;
let activeMess = {};
let stu_img,alt,stu_name; 


let begHtml =`<div class="row row-space-2" >
  </div><div class="col-md-6 m-b-2">\
    <divclass="p-10 bg-white">\
        <div class="media media-xs overflow-visible">\
            <a class="media-left" href="javascript:;">`;

// //let midHtml= `<img src=${stu_img} alt=${alt} class="media-object img-circle"></a>
//             <div class="media-body valign-middle">
//                 <b class="text-inverse">${full_name}</b>`;


let endHtml= ` 
           </div>
            <div class="media-body valign-middle text-right overflow-visible">
                <div class="btn-group dropdown">
                    <a href="javascript:;" class="btn btn-default">Friends</a>
                    <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle" aria-expanded="false"></a>
                    <ul class="dropdown-menu dropdown-menu-right" x-placement="bottom-end"
                        style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(101px, 34px, 0px);">
                        <li>
                          <a href="javascript:;">Action1</a>
                        </li>
                          <a href="javascript:;">Action2</a>
                        <li>
                          <a href="javascript:;">Action3</a>
                        </li>
                        <li>
                          <a href="javascript:;">Action4</a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </div>`

// Teacher Functions
const getStudents = (t_id,cb) => {
  console.log("getting Students");
  fetch(`/api/students/${t_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {return res.json()
  }).then((students) => {
    //console.log(students)
    cb(students); 
  }).catch(err => console.error(err))
}    

//main
params = getParams();
uid = params.uid;
//getUserInfor is in common 
getUserInfo(uid, user =>  {
  lname = user.last_name;
  fname = user.first_name;
  fn_loc = document.querySelector('#user_full_name');
  fn_loc.innerText = `${fname} ${lname}`
});
 
if (window.location.pathname === '/teacher') {
    //these are from common & message js since they are common to students and teachers
    let allStuHtml = "";
    getMess(uid);
    getAndRendMessages(uid);
    getStudents(uid, students =>{
      let headHtml = `<h4 class="m-t-0 m-b-20"> Student List (${students.length})</h4>`
      students.forEach(st => {   
      let midHtml =  `<img src="./images/${st.Character.filename}" alt="${st.Character.alt_txt}" class="media-object img-circle"></a>
      <div class="media-body valign-middle">
          <b class="text-inverse">${st.first_name} ${st.last_name}</b>`;
      console.log(midHtml)        

      /* Things we can set in the future
        "email": null,
        "nickname": null,
        "parentFName": null,
        "parentLName": null,
        "parentPhoneNumber": null,
        "parentEmail": null,*/

      allStuHtml += begHtml + midHtml + endHtml; 
      // console.log (stuHtml)        
      });
      let stuInfo = document.querySelector('#profile-friends')
      stuInfo.innerHTML = headHtml + allStuHtml;
    })
}