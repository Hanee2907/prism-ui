import{j as e}from"./jsx-runtime-CBDCb4rg.js";import{L as H,g as p,E as o,H as a,B as z,h as s,i as g,P,b as L,j as E,k as N,l as r,m as k}from"./index-D7NKZ9uj.js";import"./index-B-o1Wr-g.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BitKiEOA.js";const T={title:"Components/Surfaces",component:H,parameters:{docs:{description:{component:"Lens is the signature card: move the pointer over it and a soft light and a rainbow edge follow. Cards, chips, badges, progress and avatars share the same glass."}}}},i={render:()=>e.jsxs(H,{style:{width:320,display:"grid",gap:10},children:[e.jsx(o,{children:"Studio"}),e.jsx(a,{size:2,as:"h3",children:"Morning light"}),e.jsx("p",{className:"pr-muted",style:{margin:0},children:"Sunrise at 6:52, golden hour at 4:31."}),e.jsx(L,{label:"Notify me",defaultChecked:!0})]})},t={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 280px)",gap:20},children:[e.jsxs(p,{style:{display:"grid",gap:8},children:[e.jsx(o,{children:"Weekly report"}),e.jsx(a,{size:2,as:"h3",children:"You slept 7h 40m"}),e.jsx("p",{className:"pr-muted",style:{margin:0},children:"18 minutes more than last week."})]}),e.jsxs(p,{variant:"spectrum",style:{display:"grid",gap:8},children:[e.jsx(o,{children:"Featured"}),e.jsx(a,{size:2,as:"h3",children:"Prism Pro"}),e.jsx(z,{variant:"glass",size:"sm",style:{color:"#16123a",justifySelf:"start"},children:"Upgrade ✦"})]})]})},d={render:()=>e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:10,alignItems:"center"},children:[e.jsx(s,{children:"New"}),e.jsx(s,{tone:"mint",children:"Live"}),e.jsx(s,{tone:"coral",children:"Sold out"}),e.jsx(s,{tone:"ink",children:"v1.0"}),e.jsxs(g,{children:[e.jsx(P,{})," Recording"]}),e.jsx(g,{children:"✦ Light, bent beautifully"})]})},l={render:()=>e.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center"},children:[e.jsx(E,{value:82,label:"Focus"}),e.jsx("div",{style:{width:220},children:e.jsx(N,{value:65,label:"Upload"})}),e.jsx(r,{name:"Hanee Patel"}),e.jsxs(k,{label:"3 people in this studio",children:[e.jsx(r,{name:"Aria"}),e.jsx(r,{name:"Ravi"}),e.jsx(r,{name:"Mei"})]})]})},n={render:()=>e.jsxs("div",{style:{display:"grid",gap:16,maxWidth:640},children:[e.jsxs(a,{size:"display",children:["Made of ",e.jsx("em",{children:"light."})]}),e.jsxs(a,{size:1,as:"h2",children:["Bend it ",e.jsx("em",{children:"beautifully"})]}),e.jsx(a,{size:2,children:"Stay in the glow"}),e.jsx("p",{className:"pr-lead",children:"Frosted glass layers and one rainbow that runs through everything."})]})};var c,m,h;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <Lens style={{
    width: 320,
    display: 'grid',
    gap: 10
  }}>
      <Eyebrow>Studio</Eyebrow>
      <Heading size={2} as="h3">
        Morning light
      </Heading>
      <p className="pr-muted" style={{
      margin: 0
    }}>
        Sunrise at 6:52, golden hour at 4:31.
      </p>
      <Switch label="Notify me" defaultChecked />
    </Lens>
}`,...(h=(m=i.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var u,y,x;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 280px)',
    gap: 20
  }}>
      <Card style={{
      display: 'grid',
      gap: 8
    }}>
        <Eyebrow>Weekly report</Eyebrow>
        <Heading size={2} as="h3">
          You slept 7h 40m
        </Heading>
        <p className="pr-muted" style={{
        margin: 0
      }}>
          18 minutes more than last week.
        </p>
      </Card>
      <Card variant="spectrum" style={{
      display: 'grid',
      gap: 8
    }}>
        <Eyebrow>Featured</Eyebrow>
        <Heading size={2} as="h3">
          Prism Pro
        </Heading>
        <Button variant="glass" size="sm" style={{
        color: '#16123a',
        justifySelf: 'start'
      }}>
          Upgrade ✦
        </Button>
      </Card>
    </div>
}`,...(x=(y=t.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var v,j,b;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center'
  }}>
      <Badge>New</Badge>
      <Badge tone="mint">Live</Badge>
      <Badge tone="coral">Sold out</Badge>
      <Badge tone="ink">v1.0</Badge>
      <Chip>
        <Pulse /> Recording
      </Chip>
      <Chip>✦ Light, bent beautifully</Chip>
    </div>
}`,...(b=(j=d.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var f,w,C;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 24,
    alignItems: 'center'
  }}>
      <Ring value={82} label="Focus" />
      <div style={{
      width: 220
    }}>
        <Progress value={65} label="Upload" />
      </div>
      <Avatar name="Hanee Patel" />
      <AvatarGroup label="3 people in this studio">
        <Avatar name="Aria" />
        <Avatar name="Ravi" />
        <Avatar name="Mei" />
      </AvatarGroup>
    </div>
}`,...(C=(w=l.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var S,B,A;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 16,
    maxWidth: 640
  }}>
      <Heading size="display">
        Made of <em>light.</em>
      </Heading>
      <Heading size={1} as="h2">
        Bend it <em>beautifully</em>
      </Heading>
      <Heading size={2}>Stay in the glow</Heading>
      <p className="pr-lead">Frosted glass layers and one rainbow that runs through everything.</p>
    </div>
}`,...(A=(B=n.parameters)==null?void 0:B.docs)==null?void 0:A.source}}};const U=["LensCard","Cards","ChipsAndBadges","ProgressAndAvatars","Typography"];export{t as Cards,d as ChipsAndBadges,i as LensCard,l as ProgressAndAvatars,n as Typography,U as __namedExportsOrder,T as default};
