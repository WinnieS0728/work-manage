"use strict";var _api=require("../templates/js/_api.js");function missionCreate(){var e,n,s,i,l,o,a,r,c;return regeneratorRuntime.async(function(t){for(;;)switch(t.prev=t.next){case 0:return c=function(){var t=Object.values(s.files).map(function(t){return t.name}),e=Object.keys(s.files);0!=t&&(a.classList.add("show"),d3.select(".upload-list").selectAll(".fileInfo:not(:first-child)").data(t).join(function(t){return t.append("tr").attr("class","fileInfo").html('\n                    <td class="id"></td>\n                    <td class="name"></td>\n                    <td class="delete">\n                        <button type="button"><i class="fa-solid fa-trash"></i></button>\n                    </td>\n                ')},function(t){return t.html('\n                <td class="id"></td>\n                <td class="name"></td>\n                <td class="delete">\n                    <button type="button"><i class="fa-solid fa-trash"></i></button>\n                </td>\n            ')},function(t){return t.remove()}),d3.select(".upload-list").selectAll(".fileInfo:not(:first-child) .name").data(t).text(function(t){return t}),d3.select(".upload-list").selectAll(".fileInfo:not(:first-child) .id").data(e).text(function(t){return Number(t)+1}),o.classList.add("show"))},r=function(){var t=Object.values(s.files);console.log(t)},t.next=4,regeneratorRuntime.awrap((0,_api.getMissionsAPI)());case 4:e=t.sent,d3.select(".formTitle .info .mission_id span").text(e.length+1),d3.select(".formTitle .info .mission_creator span").text(user),n=d3.timeFormat("%Y-%m-%d")(new Date),d3.select(".formTitle .info .mission_createDate span").text(n),s=document.querySelector("#mission_attach"),i=document.querySelector("#file-confirm"),l=document.querySelector("#file-preview"),o=document.querySelector(".upload-control .done"),a=document.querySelector(".upload-list .fileInfo.title"),i.addEventListener("click",r),l.addEventListener("click",c),0;case 17:case"end":return t.stop()}})}missionCreate();