(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),r=t(13),o=t.n(r),c=t(14),l=t(2),i=t(3),m=t.n(i),s=function(){return m.a.get("/api/persons").then((function(e){return e.data}))},f=function(e){return m.a.post("/api/persons",e).then((function(e){return e.data}))},d=function(e,n){return m.a.delete("".concat("/api/persons","/").concat(e),n).then((function(e){return e.data}))},b=function(e){var n=e.person,t=e.removePerson;return u.a.createElement("li",null,n.name," ",n.number,u.a.createElement("button",{onClick:t}," Delete "))},p=function(e){var n=e.onSubmit,t=e.newName,a=e.newNumber,r=e.nHandler,o=e.pHandler;return u.a.createElement("div",null,u.a.createElement("form",{onSubmit:n},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:t,onChange:o})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{value:a,onChange:r})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add"))))},v=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],r=n[1],o=Object(a.useState)(""),i=Object(l.a)(o,2),m=i[0],v=i[1],E=Object(a.useState)(""),h=Object(l.a)(E,2),w=h[0],j=h[1],O=Object(a.useState)(null),g=Object(l.a)(O,2),k=g[0],S=g[1];Object(a.useEffect)((function(){s().then((function(e){r(e)}))}),[]);var y=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"info"},n)};return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(y,{message:k}),u.a.createElement("h2",null," Add new "),u.a.createElement(p,{onSubmit:function(e){(e.preventDefault(),t.some((function(e){return e.name===m})))?(window.alert("".concat(m," is already added to phonebook")),v("")):f({name:m,number:w}).then((function(e){r(t.concat(e)),v(""),j(""),S("Person ".concat(m," added succesfully!")),setTimeout((function(){S(null)}),3e3)}))},pHandler:function(e){v(e.target.value)},nHandler:function(e){j(e.target.value)},newName:m,newNumber:w}),u.a.createElement("h2",null,"Numbers"),u.a.createElement("div",null,t.map((function(e,n){return u.a.createElement(b,{key:n,person:e,removePerson:function(){return function(e){console.log(e);var n=t.find((function(n){return n.id===e})),a=Object(c.a)({},n);window.confirm("Delete ".concat(n.name," from the Phonebook ?"))&&(d(e,a).then((function(n){r(t.filter((function(t){return t.id!==e?t:n.data})))})),S("Person ".concat(n.name," removed succesfully!")),setTimeout((function(){S(null)}),3e3))}(e.id)}})}))))};t(37);o.a.render(u.a.createElement(v,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.c66943b3.chunk.js.map