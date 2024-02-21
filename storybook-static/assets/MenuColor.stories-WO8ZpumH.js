import{M as T,c as h}from"./MenuColor-rOzQ30Bd.js";import{w as I,e,u as i,f as l}from"./index-LL0TXkFX.js";import"./jsx-runtime-vNq4Oc-g.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./ListColors-i7CpeDRm.js";import"./Button-8DP-SAVY.js";import"./ColorSample-pomN2IVD.js";import"./Color-hDHhdzi7.js";import"./PickerColor-av9vKr27.js";import"./OutputColor-wVbVE8Xl.js";import"./SliderColor-qD6QqK60.js";import"./_baseIsEqual-s5eN0r56.js";import"./index-oRJpL3FP.js";import"./uniq-k0XJCYw2.js";import"./index-AKtXjuxE.js";import"./index-PPLHz8o0.js";const G={title:"v1/Components/MenuColor",component:T,args:{},play:async({canvasElement:y,step:o})=>{const t=I(y),v=await t.findByRole("menuColor"),c=t.getByText("color"),D=t.getByRole("pickerColor"),f=t.getByRole("listColor");await o("verificando que los componentes estén renderizados",async()=>{await e(v).toBeInTheDocument(),await e(c).toBeInTheDocument(),await e(D).toBeInTheDocument(),await e(f).toBeInTheDocument()}),await o("cerrando el menu",async()=>{const n=await t.findByRole("menuColor");await i.click(c),await e(n).toHaveClass(h.barDesignClose)}),await o("open el menu",async()=>{const n=await t.findByRole("menuColor");await i.click(c),await e(n).toHaveClass(h.barDesignOpen)}),await o("interactuando con el menu",async()=>{const n=await t.findByRole("menuColor"),r=t.getByRole("list"),m=t.getByRole("sliderHue"),u=t.getByRole("sliderSaturation"),d=t.getByRole("sliderLightness"),w=t.getByRole("sliderAlpha"),p=t.getByRole("addColor");await e(n).toHaveClass(h.barDesignOpen),await e(r.childElementCount).toBe(1),await e(m).toBeInTheDocument(),await e(u).toBeInTheDocument(),await e(d).toBeInTheDocument(),await e(w).toBeInTheDocument(),await e(p).toBeInTheDocument(),await o("cambiando colores",async()=>{const a={hue:20,saturation:20,lightness:20,alpha:1};l.change(m,{target:{value:a.hue}}),l.change(u,{target:{value:a.saturation}}),l.change(d,{target:{value:a.lightness}}),l.change(w,{target:{value:a.alpha}}),await e(m).toHaveValue(`${a.hue}`),await e(u).toHaveValue(`${a.saturation}`),await e(d).toHaveValue(`${a.lightness}`),await e(w).toHaveValue(`${a.alpha}`)}),await o("añadiendo un color",async()=>{await i.click(p),await e(r.childElementCount).toBe(2)}),await o("añadiendo un color repetido",async()=>{await i.click(p),await e(r.childElementCount).toBe(2)}),await o("eliminando color",async()=>{const a=await t.findAllByRole("listitem");l.contextMenu(a[0]);const[R]=await t.findAllByText(/delete/i);await i.click(R),await e(r.childElementCount).toBe(1)})})},parameters:{docs:{description:{component:"menu en donde puedes escoger el color de la herramienta del pincel"}}}},s={};var g,B,C;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(C=(B=s.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};const J=["Default"];export{s as Default,J as __namedExportsOrder,G as default};
//# sourceMappingURL=MenuColor.stories-WO8ZpumH.js.map
