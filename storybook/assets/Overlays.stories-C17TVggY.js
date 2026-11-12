import{j as e}from"./jsx-runtime-CBDCb4rg.js";import{r as T}from"./index-B-o1Wr-g.js";import{d as N,A,e as t,N as Y,B as r,f as D,M as E,u as H}from"./index-D7NKZ9uj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BitKiEOA.js";const G={title:"Components/Navigation & feedback",component:N,args:{label:"Report",items:[{label:"Overview",content:"You spent 2 hours in daylight today."},{label:"Light",content:"Brightest at 1:20 pm. Golden hour starts at 4:31."},{label:"Sleep",content:"7h 40m, with the screen dimmed from 10 pm."}]},parameters:{docs:{description:{component:"Tabs (arrow keys, Home, End), accordion, callouts, tooltip, a native-dialog modal, toasts and the glass nav."}}}},a={name:"Tabs"},s={name:"Accordion",render:()=>e.jsx("div",{style:{width:460},children:e.jsx(A,{items:[{title:"Is Prism UI free?",content:"Yes. Link the stylesheet and start building.",open:!0},{title:"Does it work with React?",content:"Yes, these are the React components."},{title:"Will glass be hard to read?",content:"No. Every text colour is tested for contrast."}]})})},n={render:()=>e.jsxs("div",{style:{display:"grid",gap:10,width:520},children:[e.jsxs(t,{tone:"info",children:[e.jsx("b",{children:"Tip:"})," layer glass over a colourful background."]}),e.jsxs(t,{tone:"success",children:[e.jsx("b",{children:"Saved."})," Your theme is ready to copy."]}),e.jsxs(t,{tone:"warning",children:[e.jsx("b",{children:"Heads up:"})," very busy backgrounds make glass harder to read."]}),e.jsxs(t,{tone:"error",children:[e.jsx("b",{children:"Couldn't save."})," Check your connection and try again."]})]})};function M(){const[S,o]=T.useState(!1),w=H();return e.jsxs("div",{style:{display:"flex",gap:12},children:[e.jsx(D,{tip:"Saved to your library",children:e.jsx(r,{variant:"glass",children:"Hover me"})}),e.jsx(r,{variant:"ink",onClick:()=>o(!0),children:"Open modal"}),e.jsx(r,{onClick:()=>w("Theme copied ✓","success"),children:"Show a toast"}),e.jsx(E,{open:S,onClose:()=>o(!1),eyebrow:"Share",title:"Send this theme to a friend?",actions:e.jsxs(e.Fragment,{children:[e.jsx(r,{variant:"ghost",onClick:()=>o(!1),children:"Not now"}),e.jsx(r,{onClick:()=>o(!1),children:"Copy link"})]}),children:e.jsx("p",{className:"pr-muted",children:"They'll get a link with your exact colours and roundness."})})]})}const l={name:"Tooltip, modal & toast",render:()=>e.jsx(M,{})},i={render:()=>e.jsx(Y,{"aria-label":"Demo",brand:"Studio",links:[{href:"#home",label:"Home",current:!0},{href:"#work",label:"Work"},{href:"#contact",label:"Contact"}],action:e.jsx(r,{size:"sm",children:"Sign up"})})};var c,d,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: 'Tabs'
}`,...(u=(d=a.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var m,p,h;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: 'Accordion',
  render: () => <div style={{
    width: 460
  }}>\r
      <Accordion items={[{
      title: 'Is Prism UI free?',
      content: 'Yes. Link the stylesheet and start building.',
      open: true
    }, {
      title: 'Does it work with React?',
      content: 'Yes, these are the React components.'
    }, {
      title: 'Will glass be hard to read?',
      content: 'No. Every text colour is tested for contrast.'
    }]} />\r
    </div>
}`,...(h=(p=s.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var b,g,y;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 10,
    width: 520
  }}>\r
      <Callout tone="info">\r
        <b>Tip:</b> layer glass over a colourful background.\r
      </Callout>\r
      <Callout tone="success">\r
        <b>Saved.</b> Your theme is ready to copy.\r
      </Callout>\r
      <Callout tone="warning">\r
        <b>Heads up:</b> very busy backgrounds make glass harder to read.\r
      </Callout>\r
      <Callout tone="error">\r
        <b>Couldn't save.</b> Check your connection and try again.\r
      </Callout>\r
    </div>
}`,...(y=(g=n.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var x,v,f;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'Tooltip, modal & toast',
  render: () => <ModalDemo />
}`,...(f=(v=l.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var k,j,C;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <Nav aria-label="Demo" brand="Studio" links={[{
    href: '#home',
    label: 'Home',
    current: true
  }, {
    href: '#work',
    label: 'Work'
  }, {
    href: '#contact',
    label: 'Contact'
  }]} action={<Button size="sm">Sign up</Button>} />
}`,...(C=(j=i.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};const L=["TabsStory","AccordionStory","Callouts","TooltipModalToast","GlassNav"];export{s as AccordionStory,n as Callouts,i as GlassNav,a as TabsStory,l as TooltipModalToast,L as __namedExportsOrder,G as default};
