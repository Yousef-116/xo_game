(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[200],{2:function(e,s,c){Promise.resolve().then(c.bind(c,8256))},9326:function(e,s,c){"use strict";var n=c(7437);c(2265);var r=c(1359);s.Z=function(e){let{id:s,go:c,cells:i,roomPlayerOne:a,winner:l,winningIndices:t,handleCellClick:o}=e,u=t.includes(s);return(0,n.jsx)("div",{className:"square ".concat(i[s]===a?"circle":"cross"," ").concat(u?"circle"===l||l==a?"p1w":"p2w":""),onClick:()=>{""!==l&&"Draw!"!==l||i[s]||o(s)},children:i[s]&&(0,n.jsx)(n.Fragment,{children:"circle"===i[s]||i[s]===a?(0,n.jsx)(r.JO,{className:"c",icon:"material-symbols:circle-outline"}):"cross"===i[s]||""!==i[s]?(0,n.jsx)(r.JO,{className:"x",icon:"maki:cross"}):null})})}},8009:function(e,s,c){"use strict";var n=c(7437),r=c(1359);c(2265),s.Z=function(e){let{player1:s,player2:c,draw:i}=e;return(0,n.jsxs)("div",{className:"result-row gameboard",children:[(0,n.jsxs)("div",{className:"p1",children:[(0,n.jsx)(r.JO,{className:"",icon:"material-symbols:circle-outline"})," ",(0,n.jsx)("div",{children:s})," "]}),(0,n.jsxs)("div",{className:"draw",children:[(0,n.jsx)(r.JO,{className:"",icon:"f7:infinite"})," ",(0,n.jsx)("div",{children:i})]}),(0,n.jsxs)("div",{className:"p2",children:[(0,n.jsx)(r.JO,{className:"x",icon:"maki:cross"}),(0,n.jsx)("div",{children:c})]})]})}},8256:function(e,s,c){"use strict";c.r(s),c.d(s,{default:function(){return t}});var n=c(7437),r=c(9326),i=c(2265),a=c(8009);let l=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];function t(){let[e,s]=(0,i.useState)(["","","","","","","","",""]),[c,t]=(0,i.useState)("circle"),[o,u]=(0,i.useState)(""),[d,m]=(0,i.useState)(0),[x,j]=(0,i.useState)(0),[h,f]=(0,i.useState)(0),[N,v]=(0,i.useState)([]);(0,i.useEffect)(()=>{let s="";l.forEach(c=>{e[c[0]]===e[c[1]]&&e[c[1]]===e[c[2]]&&""!==e[c[0]]&&(s=e[c[0]],v(c))}),s?o!==s&&(u(s),"circle"===s?m(e=>e+1):"cross"===s&&j(e=>e+1)):e.every(e=>""!==e)&&""===o&&(u("Draw!"),f(e=>e+1)),console.log(N)},[e,o]);let w=n=>{if(""===e[n]&&!o){let r=[...e];r[n]=c,s(r),t("circle"===c?"cross":"circle")}};return(0,n.jsxs)("div",{className:"container",children:[(0,n.jsxs)("div",{className:"message",children:[""!==o?"Draw!"===o?"Draw!":(0,n.jsxs)(n.Fragment,{children:["Player ",(0,n.jsx)("span",{className:"circle"===o?"circle":"cross",children:o})," wins!"]}):"It's now ".concat(c,"'s turn"),o&&""!==o&&(0,n.jsx)("button",{className:"reset-btn",onClick:function(){s(["","","","","","","","",""]),t("Draw!"==o?c:o),u(""),v([])},children:"Reset"})]}),(0,n.jsx)("div",{className:"gameboard",children:e.map((s,i)=>(0,n.jsx)(r.Z,{id:i,go:c,cells:e,roomPlayerOne:"circle",winner:o,winningIndices:N,handleCellClick:w}))}),(0,n.jsx)(a.Z,{player1:d,player2:x,draw:h})]})}}},function(e){e.O(0,[359,971,23,744],function(){return e(e.s=2)}),_N_E=e.O()}]);