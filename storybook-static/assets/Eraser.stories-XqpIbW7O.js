import{w as m,e,f as p,u as t}from"./index-LL0TXkFX.js";import{E as l}from"./Eraser-5ZgIk8R8.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./_baseIsEqual-s5eN0r56.js";import"./index-oRJpL3FP.js";import"./uniq-k0XJCYw2.js";import"./index-AKtXjuxE.js";import"./index-PPLHz8o0.js";import"./jsx-runtime-vNq4Oc-g.js";import"./index-4g5l5LRQ.js";import"./Pencil-QGxK1LOb.js";/* empty css                       */import"./InputNumber-lsN1jdQ-.js";const T={title:"v1/Components/AdditionalTools/Templates/Eraser",component:l,play:async({canvasElement:c,step:r})=>{const a=await m(c).findByRole("spinbutton");await r("verificando que los componentes estén renderizados",async()=>{await e(a).toBeInTheDocument(),await r("cambiando los valores del tamaño del pincel",async()=>{p.change(a,{target:{value:10}}),await e(a).toHaveValue(10),await e(a).not.toHaveValue(20),await t.click(a),await t.keyboard("13{enter}"),await e(a).toHaveValue(13),await t.click(a),await t.keyboard("20{enter}"),await e(a).toHaveValue(20),await t.click(a),await t.keyboard("90{enter}"),await e(a).toHaveValue(9)})})}},o={args:{}};var i,s,n;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {}
}`,...(n=(s=o.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const _=["EraserSettings"];export{o as EraserSettings,_ as __namedExportsOrder,T as default};
//# sourceMappingURL=Eraser.stories-XqpIbW7O.js.map
