import{w as O,e as o,f as t,u as m,c as h}from"./index-LL0TXkFX.js";import{B as z,c as F}from"./BarTools-N2UlU2cG.js";import{S as _}from"./Pencil-QGxK1LOb.js";import{j as S}from"./jsx-runtime-vNq4Oc-g.js";import{A as W}from"./AdditionalTools-oA026oHe.js";import{M as G}from"./MenuColor-rOzQ30Bd.js";import{L as K}from"./LayerPixel-U8d2XOMo.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./_baseIsEqual-s5eN0r56.js";import"./index-oRJpL3FP.js";import"./uniq-k0XJCYw2.js";import"./index-AKtXjuxE.js";import"./index-PPLHz8o0.js";import"./Button-8DP-SAVY.js";import"./index-4g5l5LRQ.js";import"./index-jmm5gWkb.js";import"./drawing-NMDk_joy.js";import"./SelectorTools-WidX7HX_.js";import"./color-YzMN_seH.js";import"./InfoCanvas-5SNNwg8P.js";import"./ColorsSelected-AmYWgARb.js";import"./Color-hDHhdzi7.js";import"./ConfigDownload-RNSUTe-V.js";import"./Select-2-3frRzV.js";import"./ConfigurationCanvas-iAOsKAEf.js";import"./InputNumber-lsN1jdQ-.js";import"./Modal-vqJ8Sz3F.js";import"./Brush-VNqF3Bn-.js";/* empty css                       */import"./Eraser-5ZgIk8R8.js";import"./ListColors-i7CpeDRm.js";import"./ColorSample-pomN2IVD.js";import"./PickerColor-av9vKr27.js";import"./OutputColor-wVbVE8Xl.js";import"./SliderColor-qD6QqK60.js";const Q="_joinRoom_m3pps_1",Z={joinRoom:Q};function C(){var x="/home/endgame/js/personal-projects/appDrawing/front/src/page/joinRoom/JoinRoom.tsx",r="4b3e5e2a7168cf9013332cc5d407b572b77471e8",s=window,e="__coverage__",Y={path:"/home/endgame/js/personal-projects/appDrawing/front/src/page/joinRoom/JoinRoom.tsx",statementMap:{0:{start:{line:8,column:2},end:{line:13,column:7}},1:{start:{line:15,column:0},end:{line:21,column:50}},2:{start:{line:17,column:4},end:{line:17,column:38}},3:{start:{line:19,column:4},end:{line:19,column:90}}},fnMap:{0:{name:"JoinRoom",decl:{start:{line:7,column:24},end:{line:7,column:32}},loc:{start:{line:7,column:37},end:{line:14,column:1}},line:7}},branchMap:{},s:{0:0,1:0,2:0,3:0},f:{0:0},b:{},inputSourceMap:{version:3,file:null,sources:["/home/endgame/js/personal-projects/appDrawing/front/src/page/joinRoom/JoinRoom.tsx"],names:[],mappings:"AAUI;AAVJ;AACA;AACA;AACA;AACA;AAIA;AACE;AAEI;AAAiB;AACL;AACF;AACC;AAIjB;"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"4b3e5e2a7168cf9013332cc5d407b572b77471e8"},v=s[e]||(s[e]={});(!v[x]||v[x].hash!==r)&&(v[x]=Y);var k=v[x];return C=function(){return k},k}C();function H({}){return C().f[0]++,C().s[0]++,S.jsxs("div",{className:Z.joinRoom,children:[S.jsx(W,{}),S.jsx(K,{}),S.jsx(z,{}),S.jsx(G,{})]})}C().s[1]++;try{C().s[2]++,H.displayName="JoinRoom",C().s[3]++,H.__docgenInfo={description:"",displayName:"JoinRoom",props:{}}}catch{}const Ma={title:"v1/Page/JoinRoom",component:H,args:{},parameters:{layout:"fullscreen"},play:async({canvasElement:x,step:r})=>{const{getByRole:s,findByRole:e,findAllByRole:Y}=O(x),v=s("layerDrawing"),k=s("layerMouse"),P=s("navigation"),q=s("menuTools"),N=s("menuColor"),M=s("ColorSelectorBox"),j=s("buttonBrush"),E=s("combobox");await r("comprobando que los componentes se encuentren renderizados",async()=>{await o(v).toBeInTheDocument(),await o(k).toBeInTheDocument(),await o(P).toBeInTheDocument(),await o(q).toBeInTheDocument(),await o(N).toBeInTheDocument(),await o(M).toBeInTheDocument(),await o(E).toBeInTheDocument(),await r("comprobando valores iniciales",async()=>{await o(M.textContent).toContain("hsla(0, 100%, 50%, 1)"),await o(j).toHaveClass(F.InUse),await o(E).toHaveValue("square")})}),await r("interacción con el canvas",async()=>{await r("cambiando de color",async()=>{const a=s("sliderHue"),$=s("sliderSaturation"),y=s("sliderLightness"),u=s("sliderAlpha"),l={hue:20,saturation:80,lightness:60,alpha:1};t.change(a,{target:{value:l.hue}}),t.change($,{target:{value:l.saturation}}),t.change(y,{target:{value:l.lightness}}),t.change(u,{target:{value:l.alpha}}),await o(a).toHaveValue(`${l.hue}`),await o($).toHaveValue(`${l.saturation}`),await o(y).toHaveValue(`${l.lightness}`),await o(u).toHaveValue(`${l.alpha}`);const d=await e("ColorSelectorBox"),w=await e("colorPanelPrimary");await o(d.textContent).toBe(`hsla(${l.hue}, ${l.saturation}%, ${l.lightness}%, ${l.alpha})`),await o(w).toHaveAttribute("data-color",`hsla(${l.hue}, ${l.saturation}%, ${l.lightness}%, ${l.alpha})`)}),await r("añadiendo color a la lista",async()=>{const a=s("addColor");t.click(a);const $=await e("listColor");await o($.children.length).toBe(2)}),await r("dibujando un cuadrado en el canvas",async()=>{const a=await e("layerMouse"),{left:$,top:y}=a.getBoundingClientRect(),u={clientX:$+200,clientY:y+200},l={clientX:$+270,clientY:y+250},d=10,w={clientY:u.clientY+(l.clientY-u.clientY)/2,clientX:u.clientX+(l.clientX-u.clientX)/2};await m.type(a,"b"),t(a,h.mouseDown(a,u));for(let n=u.clientX;n<=l.clientX;n+=d)t(a,h.mouseMove(a,{clientX:n,clientY:u.clientY})),t(a,h.mouseMove(a,{clientX:n,clientY:l.clientY}));for(let n=u.clientY;n<=l.clientY;n+=d)t(a,h.mouseMove(a,{clientX:u.clientX,clientY:n})),t(a,h.mouseMove(a,{clientX:l.clientX,clientY:n}));t.mouseUp(v),await m.type(a,"d"),await r("obtener el color de una parte del canvas",async()=>{t(a,h.click(a,w));let n=await e("ColorSelectorBox");await o(n.textContent).not.toBe("hsla(20, 80%, 60%, 1)"),t(a,h.click(a,l)),n=await e("ColorSelectorBox"),await o(n.textContent).toBe("hsla(20, 80%, 60%, 1)")});const c={hue:222,saturation:90,lightness:50,alpha:1};await r("rellenar el cuadrado",async()=>{const n=s("buttonFillBucket");await m.click(n),await m.type(a,"x");const g=await e("sliderHue"),p=await e("sliderSaturation"),b=await e("sliderLightness"),A=await e("sliderAlpha");t.change(g,{target:{value:c.hue}}),t.change(p,{target:{value:c.saturation}}),t.change(b,{target:{value:c.lightness}}),t.change(A,{target:{value:c.alpha}}),t(a,h.click(a,w)),await m.type(a,"d"),t(a,h.click(a,w));const f=await e("ColorSelectorBox");await o(f.textContent).toBe(`hsla(${c.hue}, ${c.saturation}%, ${c.lightness}%, ${c.alpha})`)}),await r("deshacer",async()=>{const n=s("buttonUndo");await m.click(n),t(a,h.click(a,w));const g=await e("ColorSelectorBox");await o(g.textContent).not.toBe(`hsla(${c.hue}, ${c.saturation}%, ${c.lightness}%, ${c.alpha})`)}),await r("rehacer",async()=>{const n=s("buttonRedo");await m.click(n),t(a,h.click(a,w)),t(a,h.click(a,w));const g=await e("ColorSelectorBox");await o(g.textContent).toBe(`hsla(${c.hue}, ${c.saturation}%, ${c.lightness}%, ${c.alpha})`)}),await r("borrar partes del interior del cuadrado",async()=>{const n=s("buttonEraser");await m.click(n),t(a,h.mouseDown(a,w)),t(a,h.mouseUp(a,w));const g=s("buttonEyeDropper");await m.click(g),t(a,h.click(a,w));let p=await e("ColorSelectorBox");await o(p.textContent).not.toBe(`hsla(${c.hue}, ${c.saturation}%, ${c.lightness}%, ${c.alpha})`),t(a,h.click(a,{clientX:w.clientX-d,clientY:w.clientY+d})),p=await e("ColorSelectorBox"),await o(p.textContent).toBe(`hsla(${c.hue}, ${c.saturation}%, ${c.lightness}%, ${c.alpha})`)}),await r("cambiar el tamaño del cuadrado",async()=>{await m.click(j),await r("x2",async()=>{const n=await e("combobox"),g=await e("spinbutton");await m.selectOptions(n,_.square),await o(n).toHaveValue("square"),await m.click(g),await m.keyboard("2{enter}");let p=await e("ColorSelectorBox");const b=await e("sliderHue"),A=await e("sliderSaturation"),f=await e("sliderLightness"),R=await e("sliderAlpha"),i={hue:301,saturation:50,lightness:50,alpha:1};t.change(b,{target:{value:i.hue}}),t.change(A,{target:{value:i.saturation}}),t.change(R,{target:{value:i.alpha}}),t.change(f,{target:{value:i.lightness}}),await o(p.textContent).toBe(`hsla(${i.hue}, ${i.saturation}%, ${i.lightness}%, ${i.alpha})`),t(a,h.mouseDown(a,u)),t(a,h.mouseUp(a,u));const B=s("buttonEyeDropper");await m.click(B),t(a,h.click(a,{clientX:u.clientX-d,clientY:u.clientY})),p=await e("ColorSelectorBox"),await o(p.textContent).toBe(`hsla(${i.hue}, ${i.saturation}%, ${i.lightness}%, ${i.alpha})`),t(a,h.click(a,{clientX:u.clientX,clientY:u.clientY-d})),p=await e("ColorSelectorBox"),await o(p.textContent).toBe(`hsla(${i.hue}, ${i.saturation}%, ${i.lightness}%, ${i.alpha})`),t(a,h.click(a,{clientX:u.clientX,clientY:u.clientY+d})),p=await e("ColorSelectorBox"),await o(p.textContent).not.toBe(`hsla(${i.hue}, ${i.saturation}%, ${i.lightness}%, ${i.alpha})`),t(a,h.click(a,{clientX:u.clientX+d,clientY:u.clientY})),p=await e("ColorSelectorBox"),await o(p.textContent).not.toBe(`hsla(${i.hue}, ${i.saturation}%, ${i.lightness}%, ${i.alpha})`)}),await r("x3",async()=>{await m.click(j);const n=await e("combobox");await m.selectOptions(n,_.rectangle),await o(n).toHaveValue(_.rectangle);const[g,p]=await Y("spinbutton");await m.click(g),await m.keyboard("3{enter}"),await m.click(p),await m.keyboard("2{enter}"),await o(g).toHaveValue("3"),await o(p).toHaveValue("2");let b=await e("ColorSelectorBox");const A=await e("sliderHue"),f=await e("sliderSaturation"),R=await e("sliderLightness"),i=await e("sliderAlpha"),B={hue:100,saturation:50,lightness:50,alpha:1};t.change(A,{target:{value:B.hue}}),t.change(f,{target:{value:B.saturation}}),t.change(i,{target:{value:B.alpha}}),t.change(R,{target:{value:B.lightness}}),await o(b.textContent).toBe(`hsla(${B.hue}, ${B.saturation}%, ${B.lightness}%, ${B.alpha})`)})}),await r("cambiar el tamaño del rectángulo",async()=>{await r("x2",async()=>{}),await r("x3",async()=>{})})})}),await r("configurar canvas",async()=>{}),await r("descargar el canvas en una imagen",async()=>{}),await r("mover canvas",async()=>{})}},D={args:{}},X={};var I,T,V;D.parameters={...D.parameters,docs:{...(I=D.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {}
}`,...(V=(T=D.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};var J,L,U;X.parameters={...X.parameters,docs:{...(J=X.parameters)==null?void 0:J.docs,source:{originalSource:"{}",...(U=(L=X.parameters)==null?void 0:L.docs)==null?void 0:U.source}}};const Ea=["Default","Brush"];export{X as Brush,D as Default,Ea as __namedExportsOrder,Ma as default};
//# sourceMappingURL=JoinRoom.stories-X5R8e3co.js.map
