import{j as e}from"./jsx-runtime-CBDCb4rg.js";import{L as H,g as p,E as o,H as r,B as z,h as a,i as g,P,b as L,j as E,k as N,l as s,m as k}from"./index-D7NKZ9uj.js";import"./index-B-o1Wr-g.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BitKiEOA.js";const T={title:"Components/Surfaces",component:H,parameters:{docs:{description:{component:"Lens is the signature card: move the pointer over it and a soft light and a rainbow edge follow. Cards, chips, badges, progress and avatars share the same glass."}}}},i={render:()=>e.jsxs(H,{style:{width:320,display:"grid",gap:10},children:[e.jsx(o,{children:"Studio"}),e.jsx(r,{size:2,as:"h3",children:"Morning light"}),e.jsx("p",{className:"pr-muted",style:{margin:0},children:"Sunrise at 6:52, golden hour at 4:31."}),e.jsx(L,{label:"Notify me",defaultChecked:!0})]})},t={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 280px)",gap:20},children:[e.jsxs(p,{style:{display:"grid",gap:8},children:[e.jsx(o,{children:"Weekly report"}),e.jsx(r,{size:2,as:"h3",children:"You slept 7h 40m"}),e.jsx("p",{className:"pr-muted",style:{margin:0},children:"18 minutes more than last week."})]}),e.jsxs(p,{variant:"spectrum",style:{display:"grid",gap:8},children:[e.jsx(o,{children:"Featured"}),e.jsx(r,{size:2,as:"h3",children:"Prism Pro"}),e.jsx(z,{variant:"glass",size:"sm",style:{color:"#16123a",justifySelf:"start"},children:"Upgrade ✦"})]})]})},d={render:()=>e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:10,alignItems:"center"},children:[e.jsx(a,{children:"New"}),e.jsx(a,{tone:"mint",children:"Live"}),e.jsx(a,{tone:"coral",children:"Sold out"}),e.jsx(a,{tone:"ink",children:"v1.0"}),e.jsxs(g,{children:[e.jsx(P,{})," Recording"]}),e.jsx(g,{children:"✦ Light, bent beautifully"})]})},l={render:()=>e.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center"},children:[e.jsx(E,{value:82,label:"Focus"}),e.jsx("div",{style:{width:220},children:e.jsx(N,{value:65,label:"Upload"})}),e.jsx(s,{name:"Hanee Patel"}),e.jsxs(k,{label:"3 people in this studio",children:[e.jsx(s,{name:"Aria"}),e.jsx(s,{name:"Ravi"}),e.jsx(s,{name:"Mei"})]})]})},n={render:()=>e.jsxs("div",{style:{display:"grid",gap:16,maxWidth:640},children:[e.jsxs(r,{size:"display",children:["Made of ",e.jsx("em",{children:"light."})]}),e.jsxs(r,{size:1,as:"h2",children:["Bend it ",e.jsx("em",{children:"beautifully"})]}),e.jsx(r,{size:2,children:"Stay in the glow"}),e.jsx("p",{className:"pr-lead",children:"Frosted glass layers and one rainbow that runs through everything."})]})};var c,m,h;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <Lens style={{
    width: 320,
    display: 'grid',
    gap: 10
  }}>\r
      <Eyebrow>Studio</Eyebrow>\r
      <Heading size={2} as="h3">\r
        Morning light\r
      </Heading>\r
      <p className="pr-muted" style={{
      margin: 0
    }}>\r
        Sunrise at 6:52, golden hour at 4:31.\r
      </p>\r
      <Switch label="Notify me" defaultChecked />\r
    </Lens>
}`,...(h=(m=i.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var u,y,x;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 280px)',
    gap: 20
  }}>\r
      <Card style={{
      display: 'grid',
      gap: 8
    }}>\r
        <Eyebrow>Weekly report</Eyebrow>\r
        <Heading size={2} as="h3">\r
          You slept 7h 40m\r
        </Heading>\r
        <p className="pr-muted" style={{
        margin: 0
      }}>\r
          18 minutes more than last week.\r
        </p>\r
      </Card>\r
      <Card variant="spectrum" style={{
      display: 'grid',
      gap: 8
    }}>\r
        <Eyebrow>Featured</Eyebrow>\r
        <Heading size={2} as="h3">\r
          Prism Pro\r
        </Heading>\r
        <Button variant="glass" size="sm" style={{
        color: '#16123a',
        justifySelf: 'start'
      }}>\r
          Upgrade ✦\r
        </Button>\r
      </Card>\r
    </div>
}`,...(x=(y=t.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var v,j,b;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center'
  }}>\r
      <Badge>New</Badge>\r
      <Badge tone="mint">Live</Badge>\r
      <Badge tone="coral">Sold out</Badge>\r
      <Badge tone="ink">v1.0</Badge>\r
      <Chip>\r
        <Pulse /> Recording\r
      </Chip>\r
      <Chip>✦ Light, bent beautifully</Chip>\r
    </div>
}`,...(b=(j=d.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var f,w,C;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 24,
    alignItems: 'center'
  }}>\r
      <Ring value={82} label="Focus" />\r
      <div style={{
      width: 220
    }}>\r
        <Progress value={65} label="Upload" />\r
      </div>\r
      <Avatar name="Hanee Patel" />\r
      <AvatarGroup label="3 people in this studio">\r
        <Avatar name="Aria" />\r
        <Avatar name="Ravi" />\r
        <Avatar name="Mei" />\r
      </AvatarGroup>\r
    </div>
}`,...(C=(w=l.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var S,B,A;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 16,
    maxWidth: 640
  }}>\r
      <Heading size="display">\r
        Made of <em>light.</em>\r
      </Heading>\r
      <Heading size={1} as="h2">\r
        Bend it <em>beautifully</em>\r
      </Heading>\r
      <Heading size={2}>Stay in the glow</Heading>\r
      <p className="pr-lead">Frosted glass layers and one rainbow that runs through everything.</p>\r
    </div>
}`,...(A=(B=n.parameters)==null?void 0:B.docs)==null?void 0:A.source}}};const U=["LensCard","Cards","ChipsAndBadges","ProgressAndAvatars","Typography"];export{t as Cards,d as ChipsAndBadges,i as LensCard,l as ProgressAndAvatars,n as Typography,U as __namedExportsOrder,T as default};
