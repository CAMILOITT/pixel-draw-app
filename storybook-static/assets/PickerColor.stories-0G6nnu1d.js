import{j as C}from"./jsx-runtime-vNq4Oc-g.js";import{w,e as t,f as m}from"./index-LL0TXkFX.js";import{C as g}from"./color-YzMN_seH.js";import{r as S}from"./index-4g5l5LRQ.js";import{P as h}from"./PickerColor-av9vKr27.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./_baseIsEqual-s5eN0r56.js";import"./index-oRJpL3FP.js";import"./uniq-k0XJCYw2.js";import"./index-AKtXjuxE.js";import"./index-PPLHz8o0.js";import"./OutputColor-wVbVE8Xl.js";import"./SliderColor-qD6QqK60.js";const b={title:"v1/Components/PickerColor",component:h,args:{colors:{colorPrimary:{alpha:1,hue:50,lightness:50,saturation:50},colorSecondary:{alpha:1,hue:50,lightness:50,saturation:50},colorFocus:"colorPrimary"},setColor:c=>c},argTypes:{setColor:{control:{type:""}},colors:{control:{type:"object"},table:{type:{summary:"ColorProps"}}}},play:async({canvasElement:c,step:i})=>{const n=w(c),o=n.getByRole("ColorSelectorBox"),l=n.getByRole("sliderHue"),s=n.getByRole("sliderSaturation"),e=n.getByRole("sliderLightness"),u=n.getByRole("sliderAlpha");await i("verificando que los componentes estén renderizados",async()=>{await t(o).toBeInTheDocument(),await t(l).toBeInTheDocument(),await t(s).toBeInTheDocument(),await t(e).toBeInTheDocument(),await t(u).toBeInTheDocument(),await i("cambiando de valor del colores",async()=>{const a=g.getDataHsla(o.textContent);await t(o).toHaveTextContent(`hsla(${a[0]}, ${a[1]}%, ${a[2]}%, ${a[3]})`),await t(l).toHaveValue(a[0].toString()),await t(s).toHaveValue(a[1].toString()),await t(e).toHaveValue(a[2].toString()),await t(u).toHaveValue(a[3].toString()),m.change(l,{target:{value:20}}),m.change(s,{target:{value:50}}),m.change(e,{target:{value:50}}),m.change(u,{target:{value:.5}});const r=g.getDataHsla(o.textContent);t(o).toHaveTextContent(`hsla(${r[0]}, ${r[1]}%, ${r[2]}%, ${r[3]})`),t(l).toHaveValue(r[0].toString()),t(s).toHaveValue(r[1].toString()),t(e).toHaveValue(r[2].toString()),t(u).toHaveValue(r[3].toString())})})},render:function({colors:i}){const[n,o]=S.useState(i);function l(s){i.colorFocus==="colorPrimary"?o(e=>({...e,colorPrimary:s})):o(e=>({...e,colorSecondary:s}))}return C.jsx(h,{colors:n,setColor:l})}},p={args:{}};var d,v,y;p.parameters={...p.parameters,docs:{...(d=p.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {}
}`,...(y=(v=p.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};const k=["Default"];export{p as Default,k as __namedExportsOrder,b as default};
//# sourceMappingURL=PickerColor.stories-0G6nnu1d.js.map
