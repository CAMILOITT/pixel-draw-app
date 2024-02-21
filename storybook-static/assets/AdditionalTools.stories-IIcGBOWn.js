import{j as a}from"./jsx-runtime-vNq4Oc-g.js";import{w as y,e as i}from"./index-LL0TXkFX.js";import{T as l,S as h,C as f}from"./SelectorTools-WidX7HX_.js";import{A as s}from"./AdditionalTools-oA026oHe.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./_baseIsEqual-s5eN0r56.js";import"./index-oRJpL3FP.js";import"./uniq-k0XJCYw2.js";import"./index-AKtXjuxE.js";import"./index-PPLHz8o0.js";import"./Brush-VNqF3Bn-.js";import"./InputNumber-lsN1jdQ-.js";import"./Select-2-3frRzV.js";import"./Pencil-QGxK1LOb.js";/* empty css                       */import"./Eraser-5ZgIk8R8.js";const k={title:"v1/Components/AdditionalTools",component:s,args:{toolSelect:l.brush},tags:["autodocs"],render:o=>{const{toolSelect:e}=o;return a.jsx(h.Provider,{value:{...f,toolSelect:e},children:a.jsx(s,{})})},play:async({canvasElement:o})=>{const c=await y(o).findByRole("navigation");i(c).toBeInTheDocument(),i(c).toHaveTextContent("PixelDraw")},parameters:{docs:{description:{component:"encabezado de la aplicación esta contiene el nombre de la app y a su lado algunas configuraciones de las herramientas que interactúan con el canvas como modificadores del pincel y borrador si no esta seleccionada ninguna de estas herramientas no muestra los modificadores."}}}},r={render:o=>{const{toolSelect:e}=o;return a.jsx(h.Provider,{value:{...f,toolSelect:e},children:a.jsx(s,{})})}},t={args:{toolSelect:l.brush},argTypes:{toolSelect:{control:"none"}}},n={args:{toolSelect:l.eraser},argTypes:{toolSelect:{control:"none"}}};var d,m,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => {
    const {
      toolSelect
    } = (args as {
      toolSelect: Tools;
    });
    return <SelectorToolsContext.Provider value={{
      ...Context,
      toolSelect
    }} children={<AdditionalTools />} />;
  }
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,g,S;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    toolSelect: Tools.brush
  },
  argTypes: {
    toolSelect: {
      control: 'none'
    }
  }
}`,...(S=(g=t.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var T,x,v;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    toolSelect: Tools.eraser
  },
  argTypes: {
    toolSelect: {
      control: 'none'
    }
  }
}`,...(v=(x=n.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const G=["Default","AdditionalToolsBrush","AdditionalToolsEraser"];export{t as AdditionalToolsBrush,n as AdditionalToolsEraser,r as Default,G as __namedExportsOrder,k as default};
//# sourceMappingURL=AdditionalTools.stories-IIcGBOWn.js.map
