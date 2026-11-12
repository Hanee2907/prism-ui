import{j as e}from"./jsx-runtime-CBDCb4rg.js";import{T as f,S as k,a as S,C as s,R as o,b as j,c as w}from"./index-D7NKZ9uj.js";import"./index-B-o1Wr-g.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BitKiEOA.js";const V={title:"Components/Forms",component:f,args:{label:"Your name",placeholder:"Hanee Patel",hint:"As it should appear on your profile."},parameters:{docs:{description:{component:"Glass fields with real labels and hints. Errors say what went wrong in words, not just colour."}}}},a={},l={args:{label:"Email",defaultValue:"hanee@",error:"That email is missing its domain, like gmail.com."}},r={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 260px)",gap:20},children:[e.jsx(f,{label:"Your name",placeholder:"Hanee Patel"}),e.jsxs(k,{label:"Plan",defaultValue:"Studio",children:[e.jsx("option",{children:"Starter"}),e.jsx("option",{children:"Studio"}),e.jsx("option",{children:"Pro"})]}),e.jsx(S,{label:"Message",placeholder:"Tell us what you're making",style:{gridColumn:"1 / -1"}})]})},t={render:()=>e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:24,alignItems:"center",maxWidth:640},children:[e.jsx(s,{label:"Email me updates",defaultChecked:!0}),e.jsx(s,{label:"Weekly digest"}),e.jsx(o,{name:"billing",label:"Monthly",defaultChecked:!0}),e.jsx(o,{name:"billing",label:"Yearly"}),e.jsx(j,{label:"Night shift",defaultChecked:!0}),e.jsx(w,{label:"View",defaultValue:"week",options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"}]})]})};var i,n,d;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(d=(n=a.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};var m,p,c;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    defaultValue: 'hanee@',
    error: 'That email is missing its domain, like gmail.com.'
  }
}`,...(c=(p=l.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var u,h,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 260px)',
    gap: 20
  }}>\r
      <TextField label="Your name" placeholder="Hanee Patel" />\r
      <Select label="Plan" defaultValue="Studio">\r
        <option>Starter</option>\r
        <option>Studio</option>\r
        <option>Pro</option>\r
      </Select>\r
      <TextArea label="Message" placeholder="Tell us what you're making" style={{
      gridColumn: '1 / -1'
    }} />\r
    </div>
}`,...(g=(h=r.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var b,x,y;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 24,
    alignItems: 'center',
    maxWidth: 640
  }}>\r
      <Checkbox label="Email me updates" defaultChecked />\r
      <Checkbox label="Weekly digest" />\r
      <Radio name="billing" label="Monthly" defaultChecked />\r
      <Radio name="billing" label="Yearly" />\r
      <Switch label="Night shift" defaultChecked />\r
      <Segmented label="View" defaultValue="week" options={[{
      value: 'day',
      label: 'Day'
    }, {
      value: 'week',
      label: 'Week'
    }, {
      value: 'month',
      label: 'Month'
    }]} />\r
    </div>
}`,...(y=(x=t.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};const P=["Text","WithError","AllFields","Choices"];export{r as AllFields,t as Choices,a as Text,l as WithError,P as __namedExportsOrder,V as default};
