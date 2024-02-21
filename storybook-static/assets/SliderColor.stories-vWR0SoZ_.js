import{S as w}from"./SliderColor-qD6QqK60.js";import{w as x,e as D}from"./index-LL0TXkFX.js";import"./jsx-runtime-vNq4Oc-g.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./_baseIsEqual-s5eN0r56.js";import"./index-oRJpL3FP.js";import"./uniq-k0XJCYw2.js";import"./index-AKtXjuxE.js";import"./index-PPLHz8o0.js";const e={hue:0,saturation:100,lightness:50},U={title:"v1/UI/SliderColor",component:w,args:{},parameters:{layout:"centered"},play:async({canvasElement:f})=>{const v=x(f).getByRole("slider");await D(v).toBeInTheDocument()}},r={},a={args:{style:{background:"linear-gradient(to right, hsl(0deg 100% 50%),hsl(90deg 100% 50%), hsl(180deg 100% 50%), hsl(270deg 100% 50%),  hsl(360deg 100% 50%))"}}},s={args:{style:{background:`linear-gradient(to right, hsl(${e.hue}deg 0% 50%), hsl(${e.hue}deg 100% 50%)`}}},t={args:{style:{background:`linear-gradient(to right, hsl(${e.hue}deg ${e.saturation}% 0%), hsl(${e.hue}deg 100% 50%), hsl(${e.hue}deg ${e.saturation}% 100%))`}}},o={args:{style:{background:`linear-gradient(to right, transparent, hsl(${e.hue}deg 100% 50%))`}}};var n,l,i;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(l=r.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var d,c,g;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    style: {
      background: \`linear-gradient(to right, hsl(0deg 100% 50%),hsl(90deg 100% 50%), hsl(180deg 100% 50%), hsl(270deg 100% 50%),  hsl(360deg 100% 50%))\`
    }
  }
}`,...(g=(c=a.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var h,u,p;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    style: {
      background: \`linear-gradient(to right, hsl(\${color.hue}deg 0% 50%), hsl(\${color.hue}deg 100% 50%)\`
    }
  }
}`,...(p=(u=s.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,S,$;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:"{\n  args: {\n    style: {\n      background: `linear-gradient(to right, hsl(${color.hue}deg ${color.saturation}% 0%), hsl(${color.hue}deg 100% 50%), hsl(${color.hue}deg ${color.saturation}% 100%))`\n    }\n  }\n}",...($=(S=t.parameters)==null?void 0:S.docs)==null?void 0:$.source}}};var y,b,k;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    style: {
      background: \`linear-gradient(to right, transparent, hsl(\${color.hue}deg 100% 50%))\`
    }
  }
}`,...(k=(b=o.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};const j=["Default","SliderHue","SliderSaturation","SliderLightness","SliderAlpha"];export{r as Default,o as SliderAlpha,a as SliderHue,t as SliderLightness,s as SliderSaturation,j as __namedExportsOrder,U as default};
//# sourceMappingURL=SliderColor.stories-vWR0SoZ_.js.map
