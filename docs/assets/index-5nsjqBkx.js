(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Le=!1,D=globalThis,re=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ee=Symbol(),ae=new WeakMap;class We{constructor(e,t,s){if(this._$cssResult$=!0,s!==Ee)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=t}get styleSheet(){let e=this._styleSheet;const t=this._strings;if(re&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=ae.get(t)),e===void 0&&((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ae.set(t,e))}return e}toString(){return this.cssText}}const Ne=r=>new We(typeof r=="string"?r:String(r),void 0,Ee),Re=(r,e)=>{if(re)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=D.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},Ie=r=>{let e="";for(const t of r.cssRules)e+=t.cssText;return Ne(e)},he=re||Le?r=>r:r=>r instanceof CSSStyleSheet?Ie(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ze,defineProperty:De,getOwnPropertyDescriptor:ce,getOwnPropertyNames:Ye,getOwnPropertySymbols:He,getPrototypeOf:de}=Object,f=globalThis;let b;const pe=f.trustedTypes,Me=pe?pe.emptyScript:"",Y=f.reactiveElementPolyfillSupportDevMode;f.litIssuedWarnings??(f.litIssuedWarnings=new Set),b=(r,e)=>{e+=` See https://lit.dev/msg/${r} for more information.`,!f.litIssuedWarnings.has(e)&&!f.litIssuedWarnings.has(r)&&(console.warn(e),f.litIssuedWarnings.add(e))},queueMicrotask(()=>{var r;b("dev-mode","Lit is in dev mode. Not recommended for production!"),(r=f.ShadyDOM)!=null&&r.inUse&&Y===void 0&&b("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.")});const j=r=>{f.emitLitDebugLogEvents&&f.dispatchEvent(new CustomEvent("lit-debug",{detail:r}))},C=(r,e)=>r,Q={toAttribute(r,e){switch(e){case Boolean:r=r?Me:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r);break}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}break}return t}},Ce=(r,e)=>!ze(r,e),ue={attribute:!0,type:String,converter:Q,reflect:!1,useDefault:!1,hasChanged:Ce};Symbol.metadata??(Symbol.metadata=Symbol("metadata"));f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class v extends HTMLElement{static addInitializer(e){this.__prepare(),(this._initializers??(this._initializers=[])).push(e)}static get observedAttributes(){return this.finalize(),this.__attributeToPropertyMap&&[...this.__attributeToPropertyMap.keys()]}static createProperty(e,t=ue){if(t.state&&(t.attribute=!1),this.__prepare(),this.prototype.hasOwnProperty(e)&&(t=Object.create(t),t.wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol.for(`${String(e)} (@property() cache)`),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&De(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:n}=ce(this.prototype,e)??{get(){return this[t]},set(l){this[t]=l}};if(i==null){if("value"in(ce(this.prototype,e)??{}))throw new Error(`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);b("reactive-property-without-getter",`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`)}return{get:i,set(l){const a=i==null?void 0:i.call(this);n==null||n.call(this,l),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ue}static __prepare(){if(this.hasOwnProperty(C("elementProperties")))return;const e=de(this);e.finalize(),e._initializers!==void 0&&(this._initializers=[...e._initializers]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this.__prepare(),this.hasOwnProperty(C("properties"))){const t=this.properties,s=[...Ye(t),...He(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this.__attributeToPropertyMap=new Map;for(const[t,s]of this.elementProperties){const i=this.__attributeNameForProperty(t,s);i!==void 0&&this.__attributeToPropertyMap.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles),this.hasOwnProperty("createProperty")&&b("no-override-create-property","Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators"),this.hasOwnProperty("getPropertyDescriptor")&&b("no-override-get-property-descriptor","Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators")}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(he(i))}else e!==void 0&&t.push(he(e));return t}static __attributeNameForProperty(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this.__instanceProperties=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}__initialize(){var e;this.__updatePromise=new Promise(t=>this.enableUpdating=t),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),(e=this.constructor._initializers)==null||e.forEach(t=>t(this))}addController(e){var t;(this.__controllers??(this.__controllers=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this.__controllers)==null||t.delete(e)}__saveInstanceProperties(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this.__instanceProperties=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Re(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this.__controllers)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this.__controllers)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$attributeToProperty(e,s)}__propertyToAttribute(e,t){var l;const i=this.constructor.elementProperties.get(e),n=this.constructor.__attributeNameForProperty(e,i);if(n!==void 0&&i.reflect===!0){const o=(((l=i.converter)==null?void 0:l.toAttribute)!==void 0?i.converter:Q).toAttribute(t,i.type);this.constructor.enabledWarnings.includes("migration")&&o===void 0&&b("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`),this.__reflectingProperty=e,o==null?this.removeAttribute(n):this.setAttribute(n,o),this.__reflectingProperty=null}}_$attributeToProperty(e,t){var n,l;const s=this.constructor,i=s.__attributeToPropertyMap.get(e);if(i!==void 0&&this.__reflectingProperty!==i){const a=s.getPropertyOptions(i),o=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:Q;this.__reflectingProperty=i;const c=o.fromAttribute(t,a.type);this[i]=c??((l=this.__defaultValues)==null?void 0:l.get(i))??c,this.__reflectingProperty=null}}requestUpdate(e,t,s,i=!1,n){var l;if(e!==void 0){e instanceof Event&&b("","The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()");const a=this.constructor;if(i===!1&&(n=this[e]),s??(s=a.getPropertyOptions(e)),(s.hasChanged??Ce)(n,t)||s.useDefault&&s.reflect&&n===((l=this.__defaultValues)==null?void 0:l.get(e))&&!this.hasAttribute(a.__attributeNameForProperty(e,s)))this._$changeProperty(e,t,s);else return}this.isUpdatePending===!1&&(this.__updatePromise=this.__enqueueUpdate())}_$changeProperty(e,t,{useDefault:s,reflect:i,wrapped:n},l){s&&!(this.__defaultValues??(this.__defaultValues=new Map)).has(e)&&(this.__defaultValues.set(e,l??t??this[e]),n!==!0||l!==void 0)||(this._$changedProperties.has(e)||(!this.hasUpdated&&!s&&(t=void 0),this._$changedProperties.set(e,t)),i===!0&&this.__reflectingProperty!==e&&(this.__reflectingProperties??(this.__reflectingProperties=new Set)).add(e))}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){const e=this.performUpdate();return this.constructor.enabledWarnings.includes("async-perform-update")&&typeof(e==null?void 0:e.then)=="function"&&b("async-perform-update",`Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`),e}performUpdate(){var s;if(!this.isUpdatePending)return;if(j==null||j({kind:"update"}),!this.hasUpdated){this.renderRoot??(this.renderRoot=this.createRenderRoot());{const l=[...this.constructor.elementProperties.keys()].filter(a=>this.hasOwnProperty(a)&&a in de(this));if(l.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${l.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}if(this.__instanceProperties){for(const[n,l]of this.__instanceProperties)this[n]=l;this.__instanceProperties=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,l]of i){const{wrapped:a}=l,o=this[n];a===!0&&!this._$changedProperties.has(n)&&o!==void 0&&this._$changeProperty(n,void 0,l,o)}}let e=!1;const t=this._$changedProperties;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this.__controllers)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this.__markUpdated()}catch(i){throw e=!1,this.__markUpdated(),i}e&&this._$didUpdate(t)}willUpdate(e){}_$didUpdate(e){var t;(t=this.__controllers)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e),this.isUpdatePending&&this.constructor.enabledWarnings.includes("change-in-update")&&b("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties&&(this.__reflectingProperties=this.__reflectingProperties.forEach(t=>this.__propertyToAttribute(t,this[t]))),this.__markUpdated()}updated(e){}firstUpdated(e){}}v.elementStyles=[];v.shadowRootOptions={mode:"open"};v[C("elementProperties")]=new Map;v[C("finalized")]=new Map;Y==null||Y({ReactiveElement:v});{v.enabledWarnings=["change-in-update","async-perform-update"];const r=function(e){e.hasOwnProperty(C("enabledWarnings"))||(e.enabledWarnings=e.enabledWarnings.slice())};v.enableWarning=function(e){r(this),this.enabledWarnings.includes(e)||this.enabledWarnings.push(e)},v.disableWarning=function(e){r(this);const t=this.enabledWarnings.indexOf(e);t>=0&&this.enabledWarnings.splice(t,1)}}(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.2");f.reactiveElementVersions.length>1&&queueMicrotask(()=>{b("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m=globalThis,h=r=>{m.emitLitDebugLogEvents&&m.dispatchEvent(new CustomEvent("lit-debug",{detail:r}))};let Fe=0,A;m.litIssuedWarnings??(m.litIssuedWarnings=new Set),A=(r,e)=>{e+=r?` See https://lit.dev/msg/${r} for more information.`:"",!m.litIssuedWarnings.has(e)&&!m.litIssuedWarnings.has(r)&&(console.warn(e),m.litIssuedWarnings.add(e))},queueMicrotask(()=>{A("dev-mode","Lit is in dev mode. Not recommended for production!")});var ke,Xe;const x=(ke=m.ShadyDOM)!=null&&ke.inUse&&((Xe=m.ShadyDOM)==null?void 0:Xe.noPatch)===!0?m.ShadyDOM.wrap:r=>r,M=m.trustedTypes,fe=M?M.createPolicy("lit-html",{createHTML:r=>r}):void 0,$e=r=>r,$=(r,e,t)=>$e,Ge=r=>{if(E!==$)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");E=r},je=()=>{E=$},ee=(r,e,t)=>E(r,e,t),Pe="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Oe="?"+S,Ue=`<${Oe}>`,T=document,B=()=>T.createComment(""),L=r=>r===null||typeof r!="object"&&typeof r!="function",ne=Array.isArray,Ve=r=>ne(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",U=`[ 	
\f\r]`,Ke=`[^ 	
\f\r"'\`<>=]`,qe=`[^\\s"'>=/]`,_=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=1,V=2,Je=3,me=/-->/g,ye=/>/g,k=new RegExp(`>|${U}(?:(${qe}+)(${U}*=${U}*(?:${Ke}|("|')|))|$)`,"g"),Ze=0,we=1,Qe=2,xe=3,K=/'/g,q=/"/g,_e=/^(?:script|style|textarea|title)$/i,et=1,te=2,ie=3,le=1,F=2,tt=3,it=4,st=5,oe=6,rt=7,nt=r=>(e,...t)=>(e.some(s=>s===void 0)&&console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`),t.some(s=>s==null?void 0:s._$litStatic$)&&A("",`Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`),{_$litType$:r,strings:e,values:t}),lt=nt(et),P=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),be=new WeakMap,X=T.createTreeWalker(T,129);let E=$;function Ae(r,e){if(!ne(r)||!r.hasOwnProperty("raw")){let t="invalid template strings array";throw t=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(t)}return fe!==void 0?fe.createHTML(e):e}const ot=(r,e)=>{const t=r.length-1,s=[];let i=e===te?"<svg>":e===ie?"<math>":"",n,l=_;for(let o=0;o<t;o++){const c=r[o];let g=-1,d,y=0,p;for(;y<c.length&&(l.lastIndex=y,p=l.exec(c),p!==null);)if(y=l.lastIndex,l===_){if(p[ge]==="!--")l=me;else if(p[ge]!==void 0)l=ye;else if(p[V]!==void 0)_e.test(p[V])&&(n=new RegExp(`</${p[V]}`,"g")),l=k;else if(p[Je]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else l===k?p[Ze]===">"?(l=n??_,g=-1):p[we]===void 0?g=-2:(g=l.lastIndex-p[Qe].length,d=p[we],l=p[xe]===void 0?k:p[xe]==='"'?q:K):l===q||l===K?l=k:l===me||l===ye?l=_:(l=k,n=void 0);console.assert(g===-1||l===k||l===K||l===q,"unexpected parse state B");const I=l===k&&r[o+1].startsWith("/>")?" ":"";i+=l===_?c+Ue:g>=0?(s.push(d),c.slice(0,g)+Pe+c.slice(g)+S+I):c+S+(g===-2?o:I)}const a=i+(r[t]||"<?>")+(e===te?"</svg>":e===ie?"</math>":"");return[Ae(r,a),s]};class W{constructor({strings:e,["_$litType$"]:t},s){this.parts=[];let i,n=0,l=0;const a=e.length-1,o=this.parts,[c,g]=ot(e,t);if(this.el=W.createElement(c,s),X.currentNode=this.el.content,t===te||t===ie){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=X.nextNode())!==null&&o.length<a;){if(i.nodeType===1){{const d=i.localName;if(/^(?:textarea|template)$/i.test(d)&&i.innerHTML.includes(S)){const y=`Expressions are not supported inside \`${d}\` elements. See https://lit.dev/msg/expression-in-${d} for more information.`;if(d==="template")throw new Error(y);A("",y)}}if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(Pe)){const y=g[l++],I=i.getAttribute(d).split(S),z=/([.?@])?(.*)/.exec(y);o.push({type:le,index:n,name:z[2],strings:I,ctor:z[1]==="."?ht:z[1]==="?"?ct:z[1]==="@"?dt:G}),i.removeAttribute(d)}else d.startsWith(S)&&(o.push({type:oe,index:n}),i.removeAttribute(d));if(_e.test(i.tagName)){const d=i.textContent.split(S),y=d.length-1;if(y>0){i.textContent=M?M.emptyScript:"";for(let p=0;p<y;p++)i.append(d[p],B()),X.nextNode(),o.push({type:F,index:++n});i.append(d[y],B())}}}else if(i.nodeType===8)if(i.data===Oe)o.push({type:F,index:n});else{let y=-1;for(;(y=i.data.indexOf(S,y+1))!==-1;)o.push({type:rt,index:n}),y+=S.length-1}n++}if(g.length!==l)throw new Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`'+e.join("${...}")+"`");h&&h({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,t){const s=T.createElement("template");return s.innerHTML=e,s}}function O(r,e,t=r,s){var l,a;if(e===P)return e;let i=s!==void 0?(l=t.__directives)==null?void 0:l[s]:t.__directive;const n=L(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((a=i==null?void 0:i._$notifyDirectiveConnectionChanged)==null||a.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$initialize(r,t,s)),s!==void 0?(t.__directives??(t.__directives=[]))[s]=i:t.__directive=i),i!==void 0&&(e=O(r,i._$resolve(r,e.values),i,s)),e}class at{constructor(e,t){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=t}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){const{el:{content:t},parts:s}=this._$template,i=((e==null?void 0:e.creationScope)??T).importNode(t,!0);X.currentNode=i;let n=X.nextNode(),l=0,a=0,o=s[0];for(;o!==void 0;){if(l===o.index){let c;o.type===F?c=new N(n,n.nextSibling,this,e):o.type===le?c=new o.ctor(n,o.name,o.strings,this,e):o.type===oe&&(c=new pt(n,this,e)),this._$parts.push(c),o=s[++a]}l!==(o==null?void 0:o.index)&&(n=X.nextNode(),l++)}return X.currentNode=T,i}_update(e){let t=0;for(const s of this._$parts)s!==void 0&&(h&&h({kind:"set part",part:s,value:e[t],valueIndex:t,values:e,templateInstance:this}),s.strings!==void 0?(s._$setValue(e,s,t),t+=s.strings.length-2):s._$setValue(e[t])),t++}}class N{get _$isConnected(){var e;return((e=this._$parent)==null?void 0:e._$isConnected)??this.__isConnected}constructor(e,t,s,i){this.type=F,this._$committedValue=u,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=t,this._$parent=s,this.options=i,this.__isConnected=(i==null?void 0:i.isConnected)??!0,this._textSanitizer=void 0}get parentNode(){let e=x(this._$startNode).parentNode;const t=this._$parent;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,t=this){var s;if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=O(this,e,t),L(e))e===u||e==null||e===""?(this._$committedValue!==u&&(h&&h({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear()),this._$committedValue=u):e!==this._$committedValue&&e!==P&&this._commitText(e);else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(((s=this.options)==null?void 0:s.host)===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else Ve(e)?this._commitIterable(e):this._commitText(e)}_insert(e){return x(x(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){var t;if(this._$committedValue!==e){if(this._$clear(),E!==$){const s=(t=this._$startNode.parentNode)==null?void 0:t.nodeName;if(s==="STYLE"||s==="SCRIPT"){let i="Forbidden";throw s==="STYLE"?i="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.":i="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.",new Error(i)}}h&&h({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==u&&L(this._$committedValue)){const t=x(this._$startNode).nextSibling;this._textSanitizer===void 0&&(this._textSanitizer=ee(t,"data","property")),e=this._textSanitizer(e),h&&h({kind:"commit text",node:t,value:e,options:this.options}),t.data=e}else{const t=T.createTextNode("");this._commitNode(t),this._textSanitizer===void 0&&(this._textSanitizer=ee(t,"data","property")),e=this._textSanitizer(e),h&&h({kind:"commit text",node:t,value:e,options:this.options}),t.data=e}this._$committedValue=e}_commitTemplateResult(e){var n;const{values:t,["_$litType$"]:s}=e,i=typeof s=="number"?this._$getTemplate(e):(s.el===void 0&&(s.el=W.createElement(Ae(s.h,s.h[0]),this.options)),s);if(((n=this._$committedValue)==null?void 0:n._$template)===i)h&&h({kind:"template updating",template:i,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:t}),this._$committedValue._update(t);else{const l=new at(i,this),a=l._clone(this.options);h&&h({kind:"template instantiated",template:i,instance:l,parts:l._$parts,options:this.options,fragment:a,values:t}),l._update(t),h&&h({kind:"template instantiated and updated",template:i,instance:l,parts:l._$parts,options:this.options,fragment:a,values:t}),this._commitNode(a),this._$committedValue=l}}_$getTemplate(e){let t=be.get(e.strings);return t===void 0&&be.set(e.strings,t=new W(e)),t}_commitIterable(e){ne(this._$committedValue)||(this._$committedValue=[],this._$clear());const t=this._$committedValue;let s=0,i;for(const n of e)s===t.length?t.push(i=new N(this._insert(B()),this._insert(B()),this,this.options)):i=t[s],i._$setValue(n),s++;s<t.length&&(this._$clear(i&&x(i._$endNode).nextSibling,s),t.length=s)}_$clear(e=x(this._$startNode).nextSibling,t){var s;for((s=this._$notifyConnectionChanged)==null||s.call(this,!1,!0,t);e!==this._$endNode;){const i=x(e).nextSibling;x(e).remove(),e=i}}setConnected(e){var t;if(this._$parent===void 0)this.__isConnected=e,(t=this._$notifyConnectionChanged)==null||t.call(this,e);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}}class G{get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}constructor(e,t,s,i,n){this.type=le,this._$committedValue=u,this._$disconnectableChildren=void 0,this.element=e,this.name=t,this._$parent=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$committedValue=new Array(s.length-1).fill(new String),this.strings=s):this._$committedValue=u,this._sanitizer=void 0}_$setValue(e,t=this,s,i){const n=this.strings;let l=!1;if(n===void 0)e=O(this,e,t,0),l=!L(e)||e!==this._$committedValue&&e!==P,l&&(this._$committedValue=e);else{const a=e;e=n[0];let o,c;for(o=0;o<n.length-1;o++)c=O(this,a[s+o],t,o),c===P&&(c=this._$committedValue[o]),l||(l=!L(c)||c!==this._$committedValue[o]),c===u?e=u:e!==u&&(e+=(c??"")+n[o+1]),this._$committedValue[o]=c}l&&!i&&this._commitValue(e)}_commitValue(e){e===u?x(this.element).removeAttribute(this.name):(this._sanitizer===void 0&&(this._sanitizer=E(this.element,this.name,"attribute")),e=this._sanitizer(e??""),h&&h({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),x(this.element).setAttribute(this.name,e??""))}}class ht extends G{constructor(){super(...arguments),this.type=tt}_commitValue(e){this._sanitizer===void 0&&(this._sanitizer=E(this.element,this.name,"property")),e=this._sanitizer(e),h&&h({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===u?void 0:e}}class ct extends G{constructor(){super(...arguments),this.type=it}_commitValue(e){h&&h({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==u),options:this.options}),x(this.element).toggleAttribute(this.name,!!e&&e!==u)}}class dt extends G{constructor(e,t,s,i,n){if(super(e,t,s,i,n),this.type=st,this.strings!==void 0)throw new Error(`A \`<${e.localName}>\` has a \`@${t}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,t=this){if(e=O(this,e,t,0)??u,e===P)return;const s=this._$committedValue,i=e===u&&s!==u||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==u&&(s===u||i);h&&h({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:i,addListener:n,oldListener:s}),i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$committedValue=e}handleEvent(e){var t;typeof this._$committedValue=="function"?this._$committedValue.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$committedValue.handleEvent(e)}}class pt{constructor(e,t,s){this.element=e,this.type=oe,this._$disconnectableChildren=void 0,this._$parent=t,this.options=s}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){h&&h({kind:"commit to element binding",element:this.element,value:e,options:this.options}),O(this,e)}}const J=m.litHtmlPolyfillSupportDevMode;J==null||J(W,N);(m.litHtmlVersions??(m.litHtmlVersions=[])).push("3.3.3");m.litHtmlVersions.length>1&&queueMicrotask(()=>{A("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});const H=(r,e,t)=>{if(e==null)throw new TypeError(`The container to render into may not be ${e}`);const s=Fe++,i=(t==null?void 0:t.renderBefore)??e;let n=i._$litPart$;if(h&&h({kind:"begin render",id:s,value:r,container:e,options:t,part:n}),n===void 0){const l=(t==null?void 0:t.renderBefore)??null;i._$litPart$=n=new N(e.insertBefore(B(),l),l,void 0,t??{})}return n._$setValue(r),h&&h({kind:"end render",id:s,value:r,container:e,options:t,part:n}),n};H.setSanitizer=Ge,H.createSanitizer=ee,H._testOnlyClearSanitizerFactoryDoNotCallOrElse=je;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ut=(r,e)=>r,w=globalThis;let Be;w.litIssuedWarnings??(w.litIssuedWarnings=new Set),Be=(r,e)=>{e+=` See https://lit.dev/msg/${r} for more information.`,!w.litIssuedWarnings.has(e)&&!w.litIssuedWarnings.has(r)&&(console.warn(e),w.litIssuedWarnings.add(e))};class R extends v{constructor(){super(...arguments),this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.__childPart=H(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.__childPart)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.__childPart)==null||e.setConnected(!1)}render(){return P}}R._$litElement$=!0;R[ut("finalized")]=!0;var Te;(Te=w.litElementHydrateSupport)==null||Te.call(w,{LitElement:R});const Z=w.litElementPolyfillSupportDevMode;Z==null||Z({LitElement:R});(w.litElementVersions??(w.litElementVersions=[])).push("4.2.2");w.litElementVersions.length>1&&queueMicrotask(()=>{Be("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);var gt=Object.getOwnPropertyDescriptor,mt=(r,e,t,s)=>{for(var i=s>1?void 0:s?gt(e,t):e,n=r.length-1,l;n>=0;n--)(l=r[n])&&(i=l(i)||i);return i};const yt="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.3/p5.min.js";let se=class extends R{constructor(){super(),this.previewFrame=document.createElement("iframe"),this.previewFrame.classList.add("preview-iframe"),this.previewFrame.setAttribute("allowTransparency","true"),this.previewFrame.setAttribute("sandbox","allow-scripts allow-same-origin"),this.previewFrame.setAttribute("allowfullscreen","true"),this.previewFrame.setAttribute("allow","fullscreen")}createRenderRoot(){return this}setCode(r){this.runCode(r)}runCode(r){const e=`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>p5.js Sketch</title>
          <style>
              body { margin: 0; overflow: hidden; }
          </style>
          <script src="${yt}"><\/script>
          <script>
            if (typeof p5 === 'undefined') {
              document.write('<script src="p5.min.js"><\\/script>');
            }
          <\/script>
      </head>
      <body>
          <script>
            window.addEventListener('load', function() {
              if (typeof p5 === 'undefined') {
                document.body.innerHTML = '<div style="color:#ef4444; background:#0f172a; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:sans-serif; text-align:center;"><h2>Unable to load p5.js</h2><p>Please verify your internet connection or reload the page.</p></div>';
              }
            });
            try {
              ${r}
            } catch (error) {
              console.error("Error in sketch:", error);
              document.body.innerHTML = '<pre style="color:red; padding: 1em;">Error: ' + error.message + '</pre>';
            }
          <\/script>
      </body>
      </html>
    `;this.previewFrame.setAttribute("srcdoc",e)}render(){return lt`<div class="playground">
      <div class="main-container">
        ${this.previewFrame}
      </div>
    </div>`}};se=mt([ft("gdm-playground")],se);const wt=`
// ----- GAME STATE MANAGEMENT -----
let gameState = 'MENU'; // MENU, SETTINGS, PLAYING, TRANSITION, GAME_OVER
let currentLevel = 1;
let score = 0;
let scrollX = 0;
let levelHistory = [];
let frameCounter = 0;

// ----- GAME OBJECTS & ARRAYS -----
let fly;
let poops = [];
let enemies = [];
let foods = [];
let levelObjects = []; 
let backgroundObjects = [];
let exits = [];
let particles = [];
let scorePopups = [];
let enemyProjectiles = [];

// ----- GAME CONFIGURATION -----
let settings = {
    flySpeed: 4.2,
    gravity: 0.08,
    scrollSpeed: 1.6,
    spawnRates: {
        food: 0.010,
        enemy: 0.005,
        exit: 0.012,
    },
    levels: {
        1: { enemies: { rat: true, dog: true, bird: true, human: false, child: false } },
        2: { enemies: { rat: true, dog: false, bird: false, human: true, child: true } },
        3: { enemies: { rat: true, dog: true, bird: false, human: false, child: false } },
        4: { enemies: { rat: true, dog: false, bird: true, human: false, child: false } },
        5: { enemies: { rat: false, dog: false, bird: false, human: false, child: true } },
        6: { enemies: { rat: true, dog: true, bird: false, human: true, child: false } },
        7: { enemies: { rat: true, dog: true, bird: false, human: true, child: true } },
    }
};

let selectedLevelSettings = 1;
let controlScheme = 'MOUSE'; // 'MOUSE' or 'KEYBOARD'
`,xt=`
// ----- NARRATIVE TRANSITION SYSTEM -----
let activeTransition = null;

const LOCATION_TAGLINES = {
    1: { name: "Outdoors", tag: "Sunny Sidewalks, Busy Pavements & Hungry Pigeons" },
    2: { name: "Upstairs Bedroom", tag: "Cozy Carpets, Scattered Clothes & The Giant Human" },
    3: { name: "The Sewer", tag: "Murky Depths, Toxic Slime & Scurrying Sewer Rats" },
    4: { name: "The Attic", tag: "Dusty Rafters, Ancient Boxes & Sticky Spiderwebs" },
    5: { name: "The Bathroom", tag: "Slippery Porcelain, Steamy Mirrors & Splashing Sinks" },
    6: { name: "The Hall", tag: "Polished Hardwood, Ticking Clocks & Lofty Ceilings" },
    7: { name: "The Kitchen", tag: "Delicious Food Crumbs, Sizzling Stoves & Danger" }
};

let arrivalBanner = {
    level: 1,
    alpha: 0,
    timer: 0
};

function startTransition(exit) {
    const fromLevel = currentLevel;
    const toLevel = exit.toLevel;
    const fromName = levelConfigs[fromLevel] ? levelConfigs[fromLevel].name : 'Unknown';
    const toName = levelConfigs[toLevel] ? levelConfigs[toLevel].name : 'Unknown';
    const label = (exit.label || '').trim().toLowerCase();

    // Determine narrative theme based on exit label and connected locations
    let type = 'DOOR';
    let title = 'TRANSIT';
    let narrative = \`Moving from \${fromName} to \${toName}...\`;

    if (label.includes('window') || toName.includes('Outdoors') && label.includes('window')) {
        type = 'WINDOW';
        title = 'THROUGH THE WINDOW SASH';
        narrative = fromLevel === 1 
            ? 'Squeezing past the billowing lace curtains into the cozy bedroom!'
            : 'Escaping through the open glass window into the breezy outdoor sky!';
    } else if (label.includes('manhole')) {
        type = 'MANHOLE';
        title = 'CLIMBING UP THE MANHOLE';
        narrative = 'Ascending the rusty iron rungs into blinding outdoor sunshine!';
    } else if (label.includes('drain') || label.includes('sink') || toLevel === 3) {
        type = 'DRAIN';
        title = 'PLUNGING DOWN THE DRAIN';
        narrative = 'Whirling through soapy whirlpool water into the deep, dark sewer pipes!';
    } else if (label.includes('attic')) {
        type = 'ATTIC_HATCH';
        title = 'ASCENDING INTO THE ATTIC';
        narrative = 'Crawling up through the creaky ceiling hatch into dusty rafters!';
    } else if (label.includes('vent')) {
        type = 'VENT';
        title = 'RIDING THE AIR VENT DUCT';
        narrative = 'Whooshing through galvanized steel air conditioning ducts to the outside!';
    } else if (label.includes('stairs')) {
        type = 'STAIRS';
        title = 'BUZZING DOWN THE STAIRS';
        narrative = 'Gliding past polished wooden banister posts down to the kitchen floor!';
    } else if (label.includes('pipe')) {
        type = 'PIPE';
        title = 'SLIDING DOWN WALL PIPES';
        narrative = 'Following copper pipes through wall studs down into the kitchen!';
    } else {
        type = 'DOOR';
        title = 'SLIPPING UNDER THE DOOR';
        narrative = \`Navigating the doorway from \${fromName} into \${toName}!\`;
    }

    activeTransition = {
        fromLevel,
        toLevel,
        fromName,
        toName,
        label: exit.label || '',
        type,
        title,
        narrative,
        duration: 90, // ~1.5 seconds at 60fps
        timer: 0,
        swirlParticles: []
    };

    // Initialize custom transition particles
    for (let i = 0; i < 35; i++) {
        activeTransition.swirlParticles.push({
            x: random(width),
            y: random(height),
            vx: random(-3, 3),
            vy: random(-3, 3),
            size: random(3, 10),
            rot: random(TWO_PI),
            vRot: random(-0.1, 0.1),
            color: type === 'DRAIN' ? color(80, random(160, 240), 220, 200) :
                   type === 'WINDOW' ? color(255, 255, random(180, 255), 180) :
                   type === 'ATTIC_HATCH' ? color(240, 210, 160, 160) :
                   color(255, 255, 255, 180)
        });
    }

    gameState = 'TRANSITION';
}

function updateAndDrawTransition() {
    if (!activeTransition) {
        gameState = 'PLAYING';
        return;
    }

    activeTransition.timer++;
    const t = activeTransition.timer / activeTransition.duration; // 0.0 to 1.0

    // Switch level halfway through the transition so new scene loads underneath
    if (activeTransition.timer === Math.floor(activeTransition.duration / 2)) {
        changeLevel(activeTransition.toLevel);
    }

    // Draw backdrop based on transition type
    drawTransitionBackdrop(t);

    // Cinematic Letterbox bars
    const barHeight = min(60, sin(t * PI) * 70);
    fill(10, 12, 18);
    noStroke();
    rect(0, 0, width, barHeight);
    rect(0, height - barHeight, width, barHeight);

    // Draw Narrative Typography Overlay
    drawTransitionText(t);

    // End transition
    if (activeTransition.timer >= activeTransition.duration) {
        triggerArrivalBanner(activeTransition.toLevel);
        activeTransition = null;
        gameState = 'PLAYING';
    }
}

function drawTransitionBackdrop(t) {
    const type = activeTransition.type;
    const midX = width / 2;
    const midY = height / 2;

    if (type === 'WINDOW') {
        // Outdoors <-> Indoors Window Zoom
        let bgCol = lerpColor(color(135, 206, 235), color(30, 40, 60), t);
        background(bgCol);

        push();
        translate(midX, midY);
        let scaleVal = map(t, 0, 1, 0.7, 2.8);
        scale(scaleVal);

        // Window Frame
        stroke(245, 240, 230);
        strokeWeight(12);
        fill(200, 235, 255, 140);
        rect(-180, -220, 360, 440, 12);

        // Panes divider
        stroke(240, 235, 220);
        strokeWeight(8);
        line(0, -220, 0, 220);
        line(-180, 0, 180, 0);

        // Billowing lace curtain
        noStroke();
        fill(255, 255, 255, 180);
        for (let side = -1; side <= 1; side += 2) {
            beginShape();
            vertex(side * 180, -220);
            for (let y = -220; y <= 220; y += 30) {
                let wave = sin(frameCounter * 0.1 + y * 0.05) * 25 * side;
                vertex(side * (120 + wave), y);
            }
            vertex(side * 180, 220);
            endShape(CLOSE);
        }

        // Sunbeam shafts
        fill(255, 245, 180, 50);
        quad(-100, -220, 100, -220, 300, 220, -300, 220);
        pop();

    } else if (type === 'DRAIN') {
        // Whirling drainage vortex
        background(15, 25, 25);
        push();
        translate(midX, midY);

        // Spiraling vortex rings
        noFill();
        for (let r = 350; r > 20; r -= 25) {
            let rot = t * 15 + r * 0.05;
            stroke(40 + r * 0.2, 130 + r * 0.3, 140 + r * 0.2, 190);
            strokeWeight(8 + sin(r + frameCounter * 0.1) * 3);
            ellipse(0, 0, r + sin(rot) * 20, (r + cos(rot) * 20) * 0.6);
        }

        // Swirling drain hole in center
        fill(5, 8, 10);
        noStroke();
        ellipse(0, 0, 80, 50);

        // Soap suds bubbles
        fill(220, 255, 240, 180);
        for (let i = 0; i < 12; i++) {
            let angle = t * 8 + i * (TWO_PI / 12);
            let rad = map(t, 0, 1, 300, 40) * (0.8 + sin(i) * 0.2);
            ellipse(cos(angle) * rad, sin(angle) * rad * 0.6, 12, 12);
        }
        pop();

    } else if (type === 'MANHOLE') {
        // Looking up from sewer into daylight
        background(20, 20, 25);
        push();
        translate(midX, midY);

        // Opening manhole circle expanding
        let manholeRadius = map(t, 0, 1, 50, 420);
        
        // Sunlight burst
        fill(255, 250, 210);
        ellipse(0, 0, manholeRadius * 2);

        // Sunburst rays
        stroke(255, 240, 170, 120);
        strokeWeight(6);
        for (let a = 0; a < TWO_PI; a += PI / 8) {
            line(0, 0, cos(a + t * 2) * (manholeRadius + 120), sin(a + t * 2) * (manholeRadius + 120));
        }

        // Iron rim of manhole
        noFill();
        stroke(70, 70, 80);
        strokeWeight(24);
        ellipse(0, 0, manholeRadius * 2);

        // Cast iron ladder rungs
        stroke(110, 105, 95);
        strokeWeight(12);
        for (let ry = -180; ry < 220; ry += 70) {
            line(-80, ry, 80, ry);
        }
        pop();

    } else if (type === 'ATTIC_HATCH') {
        // Creaky ceiling hatch opening into dusty beams
        background(35, 28, 22);
        push();
        translate(midX, midY);

        // Angled timber rafters
        stroke(90, 65, 45);
        strokeWeight(18);
        line(-width/2, -150, width/2, -150);
        line(-width/2, 180, width/2, 180);
        line(-180, -200, -180, 200);
        line(180, -200, 180, 200);

        // Trapdoor opening
        let doorAngle = map(t, 0, 1, 0, PI / 2.5);
        fill(140, 100, 65);
        noStroke();
        rect(-140, -140, 280, 280);

        // Golden light shafts cutting through
        fill(255, 220, 120, 70);
        quad(-60, -140, 60, -140, 200, 300, -200, 300);

        // Dangling pull string swinging
        stroke(220, 210, 180);
        strokeWeight(3);
        let sway = sin(frameCounter * 0.15) * 35;
        line(0, -140, sway, 80);
        fill(200, 160, 90);
        noStroke();
        ellipse(sway, 85, 16, 24);
        pop();

    } else if (type === 'STAIRS') {
        // Wooden staircase rushing down
        background(45, 30, 20);
        push();
        translate(midX, midY);

        let stepOffset = (t * 400) % 80;
        stroke(30, 18, 10);
        strokeWeight(4);

        for (let i = -5; i < 8; i++) {
            let sy = i * 65 + stepOffset - 50;
            // Tread
            fill(180, 120, 70);
            quad(-width/2, sy, width/2, sy - 80, width/2, sy - 50, -width/2, sy + 30);
            // Riser
            fill(120, 75, 40);
            quad(-width/2, sy + 30, width/2, sy - 50, width/2, sy - 20, -width/2, sy + 60);
        }

        // Polished banister railing
        stroke(210, 160, 90);
        strokeWeight(16);
        line(-width/2, -180 + stepOffset, width/2, height/2 + stepOffset);
        pop();

    } else if (type === 'VENT') {
        // Galvanized HVAC duct rushing air
        background(70, 75, 85);
        push();
        translate(midX, midY);

        // Tunnel perspective
        noFill();
        for (let s = 100; s < 700; s += 80) {
            let sz = (s + t * 160) % 700;
            stroke(140, 150, 165, map(sz, 100, 700, 255, 30));
            strokeWeight(10);
            rect(-sz/2, -sz/3, sz, sz * 0.66, 8);
        }

        // Louver blades
        stroke(180, 190, 205);
        strokeWeight(6);
        for (let ly = -120; ly <= 120; ly += 40) {
            line(-250, ly, 250, ly);
        }
        pop();

    } else {
        // Classic Door Opening
        background(25, 20, 30);
        push();
        translate(midX, midY);

        // Door Frame
        stroke(160, 130, 95);
        strokeWeight(16);
        fill(255, 245, 210, map(t, 0, 1, 40, 255)); // Light flooding in
        rect(-140, -220, 280, 440);

        // Door panel swinging open
        let openAmount = map(t, 0, 1, 0, 1);
        let doorW = 280 * (1 - openAmount * 0.85);
        fill(110, 70, 40);
        stroke(70, 45, 25);
        strokeWeight(6);
        rect(-140, -220, doorW, 440);

        // Brass doorknob
        fill(240, 200, 80);
        noStroke();
        ellipse(-140 + doorW - 25, 20, 22, 22);
        pop();
    }

    // Swirl atmospheric particles
    for (let p of activeTransition.swirlParticles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        push();
        translate(p.x, p.y);
        rotate(p.rot);
        fill(p.color);
        noStroke();
        ellipse(0, 0, p.size, p.size * 0.6);
        pop();
    }

    // Animated Fly flying through the transition!
    push();
    let flyScreenX = lerp(width * 0.2, width * 0.8, t);
    let flyScreenY = height / 2 + sin(t * TWO_PI * 2) * 45;
    let flyScale = sin(t * PI) * 0.8 + 1.0;

    translate(flyScreenX, flyScreenY);
    scale(flyScale);
    drawFlySilhouette();
    pop();
}

function drawFlySilhouette() {
    push();
    noStroke();
    let sz = 24;
    // Body
    fill(0);
    ellipse(0, 0, sz, sz * 0.8);
    // Eyes
    fill(255, 0, 0);
    ellipse(-sz * 0.2, -sz * 0.2, sz * 0.3);
    ellipse(sz * 0.2, -sz * 0.2, sz * 0.3);
    // Wings
    fill(200, 200, 255, 180);
    ellipse(-sz * 0.6, 0, sz, sz * 0.5);
    ellipse(sz * 0.6, 0, sz, sz * 0.5);

    // Speed lines
    stroke(255, 255, 255, 140);
    strokeWeight(2);
    line(-25, -6, -45, -6);
    line(-20, 6, -50, 6);
    pop();
}

function drawTransitionText(t) {
    push();
    textAlign(CENTER, CENTER);

    // Entrance and exit fade envelope
    let textAlpha = sin(t * PI) * 255;
    
    // Top banner badge: Action Title
    fill(0, 0, 0, textAlpha * 0.7);
    noStroke();
    rect(width/2 - 260, height * 0.22 - 25, 520, 50, 8);
    stroke(255, 215, 0, textAlpha * 0.8);
    strokeWeight(1.5);
    noFill();
    rect(width/2 - 260, height * 0.22 - 25, 520, 50, 8);

    noStroke();
    fill(255, 220, 80, textAlpha);
    textSize(22);
    textStyle(BOLD);
    text(activeTransition.title, width / 2, height * 0.22);

    // Center Big Location Route
    fill(255, 255, 255, textAlpha);
    textSize(34);
    textStyle(BOLD);
    text(\`\${activeTransition.fromName}  ➔  \${activeTransition.toName}\`, width / 2, height * 0.72);

    // Narrative flavor text
    fill(230, 240, 255, textAlpha * 0.9);
    textSize(16);
    textStyle(NORMAL);
    text(activeTransition.narrative, width / 2, height * 0.78);

    // Skip cue at bottom
    fill(180, 190, 210, textAlpha * 0.6);
    textSize(12);
    text("[ CLICK or SPACE to skip ]", width / 2, height - 25);
    pop();
}

function triggerArrivalBanner(level) {
    arrivalBanner = {
        level,
        alpha: 255,
        timer: 150 // Display for 2.5 seconds
    };
}

function drawArrivalBanner() {
    if (arrivalBanner.timer <= 0) return;
    arrivalBanner.timer--;

    let fadeAlpha = min(255, arrivalBanner.timer * 3);
    const locInfo = LOCATION_TAGLINES[arrivalBanner.level] || { name: "Mystery Zone", tag: "Beware of dangers!" };

    push();
    textAlign(CENTER, TOP);
    let boxW = 540;
    let boxH = 58;
    let boxX = width / 2 - boxW / 2;
    let boxY = 65;

    // Elegant card background
    fill(15, 20, 28, fadeAlpha * 0.85);
    stroke(255, 215, 0, fadeAlpha * 0.7);
    strokeWeight(1.5);
    rect(boxX, boxY, boxW, boxH, 8);

    // Location Name
    noStroke();
    fill(255, 255, 255, fadeAlpha);
    textSize(20);
    textStyle(BOLD);
    text(locInfo.name.toUpperCase(), width / 2, boxY + 8);

    // Subtitle tagline
    fill(200, 220, 245, fadeAlpha * 0.9);
    textSize(13);
    textStyle(NORMAL);
    text(locInfo.tag, width / 2, boxY + 34);
    pop();
}
`,bt=`
// ----- PLAYER CLASS: THE FLY -----
class Fly {
    constructor() {
        this.x = 160;
        this.y = height / 2;
        this.size = 18;
        this.speed = settings.flySpeed;
        this.energy = 100;
        this.vy = 0;
        this.vx = 0;
        this.invincibleTime = 0;
        this.pitch = 0; // Flight tilt angle
        this.squash = 1;
        this.stretch = 1;
        this.wingSpeed = 0.5;
    }

    get isInvincible() { return this.invincibleTime > 0; }

    update() {
        this.y += this.vy;
        this.x += this.vx;

        // Pitch smoothly tilts with vertical velocity
        this.pitch = lerp(this.pitch, this.vy * 0.08, 0.2);

        // Recover squash and stretch
        this.squash = lerp(this.squash, 1, 0.15);
        this.stretch = lerp(this.stretch, 1, 0.15);

        // Screen bounds
        this.x = constrain(this.x, this.size, width - this.size);
        this.y = constrain(this.y, this.size, height - this.size);

        if (this.isInvincible) {
            this.invincibleTime--;
        }

        // Dampen horizontal velocity
        this.vx *= 0.85;
    }

    applyGravity() {
        this.vy += settings.gravity;
        this.vy = constrain(this.vy, -11, 7);
    }

    move(dx, dy) {
        this.vx += dx * this.speed * 0.4;
        this.vx = constrain(this.vx, -this.speed, this.speed);

        if (dy < 0) {
            this.vy += dy * 0.75; // Flap upwards
            this.stretch = 1.15;
            this.squash = 0.85;
        } else if (dy > 0) {
            this.vy += dy * 0.4;
        }
    }

    moveTo(targetX, targetY) {
        let dx = targetX - this.x;
        let dy = targetY - this.y;
        let d = dist(this.x, this.y, targetX, targetY);

        if (d > 4) {
            let moveSpeed = min(this.speed * 1.5, d * 0.16);
            let angle = atan2(dy, dx);
            this.vx = cos(angle) * moveSpeed;
            this.vy = sin(angle) * moveSpeed;

            this.pitch = lerp(this.pitch, sin(angle) * 0.35, 0.25);
            if (dy < -2) {
                this.stretch = 1.1;
                this.squash = 0.9;
            }
        } else {
            this.vx *= 0.4;
            this.vy *= 0.4;
        }
    }

    poop() {
        poops.push(new Poop(this.x - 10, this.y + 6));
        this.squash = 1.25;
        this.stretch = 0.75;

        // Little recoil push & puff
        this.vy -= 0.6;
        for (let i = 0; i < 4; i++) {
            particles.push(new StinkParticle(this.x - 12 + random(-3, 3), this.y + 10 + random(-2, 2)));
        }
    }

    eat(amount, foodName = "Food") {
        this.energy = min(100, this.energy + amount);
        this.squash = 0.8;
        this.stretch = 1.2;

        // Spawn heart / sparkle particles
        for (let i = 0; i < 8; i++) {
            particles.push(new SparkleParticle(this.x, this.y, '#4ade80'));
        }
        scorePopups.push(new ScorePopup(this.x, this.y - 20, \`+\${amount} \${foodName}\`, '#22c55e'));
    }

    takeDamage(amount) {
        this.energy -= amount;
        this.invincibleTime = 65; // ~1 sec invulnerability
        this.squash = 1.3;
        this.stretch = 0.7;

        // Damage particles
        for (let i = 0; i < 10; i++) {
            particles.push(new SparkleParticle(this.x, this.y, '#ef4444'));
        }

        scorePopups.push(new ScorePopup(this.x, this.y - 20, \`-\${amount} HP\`, '#ef4444'));

        if (amount >= 999 || this.energy <= 0) {
            gameOver();
        }
    }

    collides(other) {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const otherX = other.x - screenX;
        const otherY = other.y;
        return dist(this.x, this.y, otherX, otherY) < (this.size / 2 + other.size / 2);
    }

    handleBarrierCollision(barrier) {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const flyLeft = this.x - this.size / 2;
        const flyRight = this.x + this.size / 2;
        const flyTop = this.y - this.size / 2;
        const flyBottom = this.y + this.size / 2;

        let objLeft = barrier.x - (levelConfigs[currentLevel].isScrolling ? screenX : 0);
        let objTop = barrier.y - barrier.h;
        let objRight = objLeft + barrier.w;
        let objBottom = objTop + barrier.h;

        if (flyRight > objLeft && flyLeft < objRight && flyBottom > objTop && flyTop < objBottom) {
            const overlapX1 = flyRight - objLeft;
            const overlapX2 = objRight - flyLeft;
            const overlapY1 = flyBottom - objTop;
            const overlapY2 = objBottom - flyTop;

            const minOverlapX = min(overlapX1, overlapX2);
            const minOverlapY = min(overlapY1, overlapY2);

            if (minOverlapX < minOverlapY) {
                if (overlapX1 < overlapX2) {
                    this.x = objLeft - this.size / 2;
                    this.vx = -1;
                } else {
                    this.x = objRight + this.size / 2;
                    this.vx = 1;
                }
            } else {
                if (overlapY1 < overlapY2) {
                    this.y = objTop - this.size / 2;
                    this.vy = 0;
                } else {
                    this.y = objBottom + this.size / 2;
                    this.vy = 1;
                }
            }
        }
    }

    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.pitch);

        if (this.isInvincible && frameCounter % 10 < 5) {
            // Blink when invincible
        } else {
            noStroke();
            // Body
            fill(0);
            ellipse(0, 0, this.size, this.size * 0.8);
            // Eyes
            fill(255, 0, 0);
            ellipse(-this.size * 0.2, -this.size * 0.2, this.size * 0.3);
            ellipse(this.size * 0.2, -this.size * 0.2, this.size * 0.3);
            // Wings
            fill(200, 200, 255, 150);
            ellipse(-this.size * 0.6, 0, this.size, this.size * 0.5);
            ellipse(this.size * 0.6, 0, this.size, this.size * 0.5);
        }
        pop();
    }
}

// ----- POOP PROJECTILE CLASS -----
class Poop {
    constructor(x, y) {
        this.x = x + (levelConfigs[currentLevel].isScrolling ? scrollX : 0);
        this.y = y;
        this.size = 14;
        this.vy = 2.2;
        this.vx = -0.5;
        this.rotation = random(-0.2, 0.2);
    }

    update() {
        this.vy += settings.gravity * 2.2;
        this.y += this.vy;
        this.x += this.vx;

        // Occasional stink fume
        if (frameCounter % 6 === 0) {
            particles.push(new StinkParticle(this.x - (levelConfigs[currentLevel].isScrolling ? scrollX : 0), this.y));
        }
    }

    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);
        rotate(this.rotation);

        // 3D Soft-serve swirl poop shape
        noStroke();

        // Base drop shadow
        fill(45, 25, 10, 120);
        ellipse(0, 6, 14, 5);

        // Bottom swirl tier
        fill(105, 55, 22);
        ellipse(0, 3, 14, 8);

        // Middle swirl tier
        fill(125, 68, 28);
        ellipse(0, -1, 10, 6);

        // Top swirl tip
        fill(145, 80, 35);
        triangle(-4, -2, 4, -2, 1, -7);

        // Gloss highlight
        fill(200, 140, 90, 180);
        ellipse(-2, 0, 3, 2);

        pop();
    }

    isOnScreen() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        return this.y < height + 50 && this.x - screenX > -60 && this.x - screenX < width + 60;
    }

    collides(other) {
        return dist(this.x, this.y, other.x, other.y) < (this.size / 2 + other.size / 2);
    }
}

// ----- PARTICLES & SCORE POPUPS -----
class StinkParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-0.5, 0.5);
        this.vy = random(-1.2, -0.4);
        this.size = random(4, 9);
        this.alpha = 180;
    }
    update() {
        this.x += this.vx + sin(frameCounter * 0.1) * 0.4;
        this.y += this.vy;
        this.alpha -= 4;
        this.size += 0.1;
    }
    draw() {
        noStroke();
        fill(130, 185, 60, this.alpha);
        ellipse(this.x, this.y, this.size, this.size * 0.8);
    }
    isDead() { return this.alpha <= 0; }
}

class SparkleParticle {
    constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.vx = random(-2.5, 2.5);
        this.vy = random(-2.5, 2.5);
        this.size = random(3, 7);
        this.col = col;
        this.alpha = 255;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05;
        this.alpha -= 7;
    }
    draw() {
        noStroke();
        fill(this.col);
        ellipse(this.x, this.y, this.size);
    }
    isDead() { return this.alpha <= 0; }
}

class SplatParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-3, 3);
        this.vy = random(-3.5, 1);
        this.size = random(5, 12);
        this.alpha = 240;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15;
        this.alpha -= 6;
    }
    draw() {
        noStroke();
        fill(115, 60, 25, this.alpha);
        ellipse(this.x, this.y, this.size);
    }
    isDead() { return this.alpha <= 0; }
}

class ScorePopup {
    constructor(x, y, text, col = '#ffffff') {
        this.x = x;
        this.y = y;
        this.text = text;
        this.col = col;
        this.vy = -1.2;
        this.alpha = 255;
    }
    update() {
        this.y += this.vy;
        this.alpha -= 4.5;
    }
    draw() {
        push();
        textAlign(CENTER, CENTER);
        textSize(15);
        textStyle(BOLD);
        // Text shadow
        fill(0, 0, 0, this.alpha);
        text(this.text, this.x + 1, this.y + 1);
        // Main text
        fill(this.col);
        text(this.text, this.x, this.y);
        pop();
    }
    isDead() { return this.alpha <= 0; }
}
`,St=`
// ----- TERRAIN SURFACE HELPER -----
function getGroundSurface(worldX, defaultGroundY) {
    let surface = defaultGroundY;
    if (typeof levelObjects !== 'undefined') {
        for (let obj of levelObjects) {
            let left = obj.x - 15;
            let right = obj.x + obj.w + 15;
            if (worldX >= left && worldX <= right) {
                let topY = obj.y - obj.h;
                // If the top of this barrier is elevated above floor and within bounds
                if (topY < surface && topY > 80) {
                    surface = topY;
                }
            }
        }
    }
    return surface;
}

// ----- ENEMY PROJECTILES -----
class SonicBark {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.size = 26;
        this.damage = 18;
        let angle = atan2(targetY - y, targetX - x);
        this.vx = cos(angle) * 5.2;
        this.vy = sin(angle) * 5.2;
        this.life = 70;
        this.initialLife = 70;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += 0.5;
        this.life--;
    }

    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;
        let alpha = map(this.life, 0, this.initialLife, 0, 220);

        push();
        translate(drawX, this.y);
        noFill();
        stroke(250, 204, 21, alpha);
        strokeWeight(3.5);
        arc(0, 0, this.size, this.size * 0.7, -PI * 0.6, PI * 0.6);

        stroke(255, 255, 255, alpha * 0.9);
        strokeWeight(1.8);
        arc(0, 0, this.size * 0.65, this.size * 0.45, -PI * 0.6, PI * 0.6);

        noStroke();
        fill(250, 204, 21, alpha);
        textSize(10);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text("BARK!", 0, -this.size * 0.5);
        pop();
    }

    getScreenX() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        return this.x - screenX;
    }

    isOnScreen() {
        let sx = this.getScreenX();
        return sx > -60 && sx < width + 60 && this.y > -50 && this.y < height + 50;
    }

    isDead() { return this.life <= 0; }
}

class PaperBall {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.size = 15;
        this.damage = 18;
        let screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let myScreenX = x - screenX;
        let dx = targetX - myScreenX;
        this.vx = constrain(dx * 0.035, -4.5, 4.5);
        this.vy = -8.2;
        this.rot = random(TWO_PI);
    }

    update() {
        this.vy += 0.24; // Gravity
        this.x += this.vx;
        this.y += this.vy;
        this.rot += 0.18;
    }

    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);
        rotate(this.rot);
        fill(248, 250, 252);
        stroke(148, 163, 184);
        strokeWeight(1.5);
        rect(-6, -6, 12, 12, 3);
        // Paper crumpled fold lines
        stroke(203, 213, 225);
        line(-4, -2, 4, 3);
        line(-2, 4, 3, -4);
        pop();
    }

    getScreenX() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        return this.x - screenX;
    }

    isOnScreen() {
        let sx = this.getScreenX();
        return sx > -60 && sx < width + 60 && this.y < height + 40;
    }

    isDead() { return this.y > height + 20; }
}

// ----- BASE ENEMY CLASS -----
class Enemy {
    constructor(x, y, size, health, damage, points, name) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.size = size;
        this.initialHealth = health;
        this.health = health;
        this.damage = damage;
        this.points = points;
        this.name = name;
        this.isDefeated = false;
        this.hitTimer = 0;
        this.animTimer = random(100);
        this.facing = -1;
        this.onGround = false;
    }

    takeHit() {
        this.health--;
        this.hitTimer = 25; // Splat reaction
        for (let i = 0; i < 8; i++) {
            particles.push(new SplatParticle(this.x - (levelConfigs[currentLevel].isScrolling ? scrollX : 0), this.y));
        }

        if (this.health <= 0) {
            this.isDefeated = true;
            score += this.points;
            scorePopups.push(new ScorePopup(
                this.x - (levelConfigs[currentLevel].isScrolling ? scrollX : 0),
                this.y - this.size / 2 - 15,
                \`+\${this.points} \${this.name} SPLAT!\`,
                '#f59e0b'
            ));
        } else {
            scorePopups.push(new ScorePopup(
                this.x - (levelConfigs[currentLevel].isScrolling ? scrollX : 0),
                this.y - this.size / 2 - 10,
                \`HIT! \${this.health} HP\`,
                '#fbbf24'
            ));
        }
    }

    update(fly) {
        this.animTimer++;
        if (this.hitTimer > 0) this.hitTimer--;

        if (this.isDefeated) {
            this.x -= 8; // Scampers away in panic
        }
    }

    isOnScreen() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        return this.x - screenX > -140 && this.x - screenX < width + 140;
    }

    draw() {
        this.drawEnemy();
    }
}

// ----- 1. RAT ENEMY (ACROBATIC CLIMBER & PREDATOR) -----
class Rat extends Enemy {
    constructor(x, y) {
        super(x, y, 38, 1, 18, 20, "RAT");
        this.pounceCooldown = 60;
        this.isPouncing = false;
        this.crouchTimer = 0;
    }

    update(fly) {
        super.update(fly);
        if (this.isDefeated) return;

        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const flyScreenX = fly.x;
        const myScreenX = this.x - screenX;
        const distToFly = dist(myScreenX, this.y, flyScreenX, fly.y);

        // Dynamic facing towards fly
        if (!this.isPouncing) {
            this.facing = flyScreenX < myScreenX ? -1 : 1;
        }

        // Active Pursuit: sprint towards fly on terrain
        if (!this.isPouncing && this.crouchTimer <= 0) {
            let runSpeed = (distToFly < 420) ? 3.4 : 1.8;
            this.vx = this.facing * runSpeed;
        }

        // Apply horizontal velocity
        this.x += this.vx;

        // Terrain Awareness: detect current floor/obstacle height
        const defaultFloor = height - 50;
        const groundLevel = getGroundSurface(this.x, defaultFloor);

        // Gravity & Ground Collision
        if (this.y < groundLevel - this.size / 2) {
            this.vy += 0.58;
            this.onGround = false;
        } else {
            this.y = groundLevel - this.size / 2;
            this.vy = 0;
            this.onGround = true;
            this.isPouncing = false;
        }
        this.y += this.vy;

        // Obstacle Climbing Leap: if approaching a barrier ahead, jump onto it!
        if (this.onGround && !this.isPouncing) {
            let nextGround = getGroundSurface(this.x + this.facing * 35, defaultFloor);
            if (nextGround < this.y - 15) {
                // Hop up onto the barrier/furniture!
                this.vy = -9.0;
                this.onGround = false;
            }
        }

        // Pounce Attack Cooldown & Trigger
        if (this.pounceCooldown > 0) this.pounceCooldown--;

        // If fly is in attack range (within 280px), actively try to kill the fly with an aimed pounce!
        if (this.onGround && this.pounceCooldown <= 0 && distToFly < 280 && fly.y < this.y + 20) {
            // Crouch anticipation for 8 frames
            this.crouchTimer++;
            this.vx *= 0.2;

            if (this.crouchTimer >= 10) {
                // Launch aimed predatory leap directly at the fly!
                let dy = fly.y - this.y;
                let dx = flyScreenX - myScreenX;
                this.vy = constrain(dy * 0.08 - 9.5, -14, -7.5);
                this.vx = constrain(dx * 0.06, -6, 6);
                this.isPouncing = true;
                this.onGround = false;
                this.crouchTimer = 0;
                this.pounceCooldown = 90; // Attack cooldown
            }
        } else {
            if (this.crouchTimer > 0 && distToFly >= 280) this.crouchTimer = 0;
        }
    }

    drawEnemy() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);
        scale(this.facing, 1);

        let isHit = this.hitTimer > 0;
        let runCycle = sin(this.animTimer * 0.5);

        // Crouch posture
        if (this.crouchTimer > 0) {
            scale(1.2, 0.75);
        } else if (this.isPouncing) {
            scale(1.1, 0.9);
            rotate(this.vy * 0.03 * this.facing);
        }

        // Long flexible pink tail (twitches vigorously when hunting)
        noFill();
        stroke(235, 160, 160);
        strokeWeight(3.5);
        let tailWag = sin(this.animTimer * (this.isPouncing ? 0.8 : 0.4)) * 14;
        bezier(14, 2, 28, 4, 38, -6 + tailWag, 48, -14 + tailWag);

        // Claws & Paws (reaching forward during pounce!)
        stroke(220, 150, 150);
        strokeWeight(3);
        if (this.isPouncing) {
            // Outstretched leaping claws!
            line(8, 2, 18, 12);
            line(-8, 2, -22, -4);
            line(-8, 6, -24, 2);
        } else {
            // Back paw
            line(8, 6, 12 + runCycle * 8, 14);
            // Front paw
            line(-8, 6, -12 - runCycle * 8, 14);
        }

        // Fur Body (layered shading)
        noStroke();
        fill(75, 75, 80);
        ellipse(0, 0, this.size, this.size * 0.65);
        fill(105, 105, 115);
        ellipse(-2, -2, this.size * 0.8, this.size * 0.5);

        // Rat Head & Snout
        fill(85, 85, 95);
        triangle(-8, -8, -8, 8, -25, 2);

        // Bared teeth when pouncing
        if (this.isPouncing || this.crouchTimer > 0) {
            fill(255);
            triangle(-22, 1, -22, 5, -26, 3);
        }

        // Pink rounded ear
        fill(235, 165, 165);
        ellipse(-4, -10, 8, 10);
        stroke(75, 75, 80);
        strokeWeight(1.5);
        ellipse(-4, -10, 8, 10);
        noStroke();

        // Pink nose & whiskers
        fill(240, 130, 140);
        ellipse(-25, 2, 4, 4);

        // Whiskers
        stroke(200, 200, 200, 180);
        strokeWeight(1);
        line(-22, 1, -31, -4);
        line(-22, 3, -31, 8);

        // Eye (Glows crimson when actively hunting!)
        noStroke();
        if (isHit || this.isDefeated) {
            stroke(240, 50, 50);
            strokeWeight(2);
            line(-16, -2, -12, 2);
            line(-12, -2, -16, 2);
        } else if (this.isPouncing || this.crouchTimer > 0) {
            // Glowing predatory red eye
            fill(239, 68, 68);
            ellipse(-14, 0, 5.5, 5.5);
            fill(255, 255, 255);
            ellipse(-15, -1, 2, 2);
        } else {
            fill(15, 15, 20);
            ellipse(-14, 0, 4.5, 4.5);
            fill(255);
            ellipse(-15, -1, 1.5, 1.5);
        }

        // Splat on back
        if (isHit || this.isDefeated) {
            fill(110, 55, 20, 220);
            noStroke();
            ellipse(2, -6, 14, 8);
        }

        pop();
    }
}

// ----- 2. DOG ENEMY (AGGRESSIVE PURSUIT, JUMP BITE & SONIC BARK) -----
class Dog extends Enemy {
    constructor(x, y) {
        super(x, y, 54, 2, 32, 40, "DOG");
        this.lungeCooldown = 70;
        this.isLunging = false;
        this.barkCooldown = 90;
        this.barkTimer = 0;
        this.isBarking = false;
    }

    update(fly) {
        super.update(fly);
        if (this.isDefeated) return;

        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const flyScreenX = fly.x;
        const myScreenX = this.x - screenX;
        const distToFly = dist(myScreenX, this.y, flyScreenX, fly.y);

        // Dynamic facing towards fly
        if (!this.isLunging) {
            this.facing = flyScreenX < myScreenX ? -1 : 1;
        }

        // Cooldowns
        if (this.lungeCooldown > 0) this.lungeCooldown--;
        if (this.barkCooldown > 0) this.barkCooldown--;

        // Terrain Awareness: can step/hop onto beds, obstacles, curbs
        const defaultFloor = height - 50;
        const groundLevel = getGroundSurface(this.x, defaultFloor);

        // Gravity & Ground Physics
        if (this.y < groundLevel - this.size / 2) {
            this.vy += 0.58;
            this.onGround = false;
        } else {
            this.y = groundLevel - this.size / 2;
            this.vy = 0;
            this.onGround = true;
            this.isLunging = false;
        }
        this.y += this.vy;

        // Obstacle Hopping: jumps over or onto barriers in pursuit
        if (this.onGround && !this.isLunging && !this.isBarking) {
            let nextGround = getGroundSurface(this.x + this.facing * 45, defaultFloor);
            if (nextGround < this.y - 15) {
                this.vy = -10.0;
                this.onGround = false;
            }
        }

        // ACTIVE HUNTING AI:
        if (this.isBarking) {
            this.vx *= 0.5;
            this.barkTimer--;
            if (this.barkTimer === 15) {
                // Fire sonic bark projectile towards fly!
                enemyProjectiles.push(new SonicBark(this.x - 25 * this.facing, this.y - 15, flyScreenX, fly.y));
            }
            if (this.barkTimer <= 0) {
                this.isBarking = false;
            }
        } else if (distToFly < 450) {
            // Case A: Fly is elevated high out of leaping reach -> Sonic Bark Attack!
            if (this.onGround && this.barkCooldown <= 0 && fly.y < this.y - 120 && abs(flyScreenX - myScreenX) < 320) {
                this.isBarking = true;
                this.barkTimer = 30;
                this.barkCooldown = 110;
                this.vx = 0;
            }
            // Case B: Fly is within leaping distance -> Running Leaping Jaw Snap!
            else if (this.onGround && this.lungeCooldown <= 0 && distToFly < 260 && fly.y < this.y - 15) {
                let dx = flyScreenX - myScreenX;
                let dy = fly.y - this.y;
                this.vy = constrain(dy * 0.08 - 10.5, -14.5, -9);
                this.vx = constrain(dx * 0.065, -6.5, 6.5);
                this.isLunging = true;
                this.onGround = false;
                this.lungeCooldown = 85;
            }
            // Case C: Aggressive sprint chase
            else if (!this.isLunging) {
                this.vx = this.facing * 4.0;
            }
        } else {
            // Patrol trot
            this.vx = this.facing * 1.5;
        }

        this.x += this.vx;
    }

    drawEnemy() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);
        scale(this.facing, 1);

        let isHit = this.hitTimer > 0;
        let runCycle = sin(this.animTimer * 0.45);

        // Bark pose or leaping pose
        if (this.isBarking) {
            rotate(-0.25 * this.facing); // Head tilted up
        } else if (this.isLunging) {
            rotate(this.vy * 0.02 * this.facing);
        }

        // Wagging Tail
        stroke(140, 85, 35);
        strokeWeight(6);
        let tailSwing = sin(this.animTimer * 0.7) * 16;
        noFill();
        bezier(18, 0, 32, -4, 38, -16 + tailSwing, 46, -14 + tailSwing);

        // 4 Running Legs
        stroke(120, 70, 25);
        strokeWeight(5.5);
        if (this.isLunging) {
            // Outstretched leaping legs
            line(12, 10, 24, 22);
            line(6, 10, 18, 20);
            line(-12, 10, -26, 4);
            line(-18, 10, -28, 10);
        } else {
            line(12, 10, 16 + runCycle * 10, 24);
            line(6, 10, 8 - runCycle * 10, 24);
            line(-12, 10, -8 - runCycle * 10, 24);
            line(-18, 10, -22 + runCycle * 10, 24);
        }

        // Chunky Body
        noStroke();
        fill(175, 110, 45);
        ellipse(0, 4, this.size, this.size * 0.65);

        // Fur coat spot pattern
        fill(135, 80, 30);
        ellipse(6, 0, 16, 12);
        ellipse(-4, 6, 12, 8);

        // Head
        fill(185, 120, 50);
        ellipse(-20, -10, 26, 24);

        // Muzzle / Jowls
        fill(215, 155, 95);
        ellipse(-28, -6, 16, 14);

        // Black Wet Nose
        fill(20, 20, 25);
        ellipse(-34, -8, 6, 5);

        // Floppy Ear
        fill(130, 75, 25);
        let earBounce = sin(this.animTimer * 0.45) * 5;
        ellipse(-14, -14 + earBounce, 12, 18);

        // Red Spiked Collar with Gold Bone Tag
        stroke(220, 38, 38);
        strokeWeight(4);
        line(-16, -2, -10, 4);
        noStroke();
        fill(250, 204, 21);
        ellipse(-12, 6, 6, 6);

        // Mouth & Snapping Jaws
        if (this.isBarking || this.isLunging) {
            // Mouth wide open snapping!
            fill(40, 15, 15);
            arc(-28, -2, 16, 16, 0, PI);
            // Sharp white teeth
            fill(255);
            triangle(-32, -2, -30, -2, -31, 2);
            triangle(-28, -2, -26, -2, -27, 2);
            // Panting tongue
            fill(244, 114, 182);
            ellipse(-26, 3, 9, 8);
        } else {
            fill(40, 20, 20);
            ellipse(-26, -2, 10, 6);
            fill(244, 114, 182);
            ellipse(-26, 2 + sin(this.animTimer * 0.4) * 2, 7, 10);
        }

        // Eye
        if (isHit || this.isDefeated) {
            stroke(220, 38, 38);
            strokeWeight(2);
            line(-24, -14, -18, -10);
            line(-18, -14, -24, -10);
        } else {
            noStroke();
            fill(255);
            ellipse(-22, -13, 7, 7);
            fill(25, 20, 15);
            ellipse(-23, -13, 4, 4);
            fill(255);
            ellipse(-24, -14, 1.5, 1.5);
        }

        // Splat on back
        if (isHit || this.isDefeated) {
            fill(110, 55, 20, 220);
            noStroke();
            ellipse(0, -6, 20, 12);
        }

        pop();
    }
}

// ----- 3. BIRD ENEMY (AERIAL PREDATOR) -----
class Bird extends Enemy {
    constructor(x, y) {
        super(x, y, 42, 2, 30, 45, "BIRD");
        this.angle = random(TWO_PI);
        this.wingFlapPhase = 0;
    }

    update(fly) {
        super.update(fly);
        if (this.isDefeated) return;

        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const myScreenX = this.x - screenX;

        // General leftward patrol drift
        this.x -= 1.6;
        this.angle += 0.05;
        this.y += sin(this.angle) * 1.8;

        // Aggressive dive attack when near fly
        let dx = fly.x - myScreenX;
        let dy = fly.y - this.y;
        let d = dist(fly.x, fly.y, myScreenX, this.y);

        if (d < 300) {
            let targetAngle = atan2(dy, dx);
            this.x += cos(targetAngle) * 3.4;
            this.y += sin(targetAngle) * 3.4;
        }

        this.wingFlapPhase += 0.38;
    }

    drawEnemy() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);

        let bank = sin(this.angle) * 0.25;
        rotate(bank);

        let isHit = this.hitTimer > 0;
        let flap = sin(this.wingFlapPhase) * 18;

        // Tail Feathers
        fill(70, 80, 95);
        noStroke();
        triangle(12, 0, 28, -6, 28, 6);

        // Lower Wing
        fill(85, 95, 115);
        push();
        translate(-2, -flap * 0.5);
        ellipse(-4, -14, 22, 14);
        pop();

        // Streamlined Torso
        fill(100, 115, 135);
        ellipse(0, 0, this.size, this.size * 0.55);

        // Breast plumage highlight
        fill(115, 140, 150);
        ellipse(-6, 2, 18, 12);

        // Head
        fill(90, 105, 125);
        ellipse(-16, -3, 14, 13);

        // Golden sharp beak
        fill(245, 180, 40);
        triangle(-22, -4, -22, -1, -30, -2);

        // Yellow talons tucked up
        stroke(230, 170, 30);
        strokeWeight(2);
        line(2, 6, -2, 11);
        line(6, 6, 4, 11);

        // Top Wing
        fill(120, 135, 160);
        noStroke();
        push();
        translate(-2, flap * 0.6);
        ellipse(-4, 4, 26, 16);
        fill(70, 80, 95);
        rect(-8, 3, 16, 2.5);
        rect(-6, 7, 12, 2.5);
        pop();

        // Eye
        if (isHit || this.isDefeated) {
            stroke(220, 38, 38);
            strokeWeight(2);
            line(-19, -5, -15, -1);
            line(-15, -5, -19, -1);
        } else {
            noStroke();
            fill(245, 160, 30);
            ellipse(-17, -3, 5, 5);
            fill(15);
            ellipse(-17, -3, 2.5, 2.5);
        }

        // Splat on feathers
        if (isHit || this.isDefeated) {
            fill(110, 55, 20, 220);
            ellipse(0, 0, 16, 10);
        }

        pop();
    }
}

// ----- 4. HUMAN ENEMY (ACTIVE PURSUIT, AIMED POWER SWAT & JUMPING SWAT) -----
class Human extends Enemy {
    constructor(x, y) {
        super(x, y, 46, 3, 999, 60, "HUMAN");
        this.swatPhase = 'IDLE'; // IDLE, WINDUP, STRIKE
        this.swatTimer = 0;
        this.armAngle = 0.2;
        this.targetAngle = 0;
        this.isJumping = false;
    }

    update(fly) {
        super.update(fly);
        if (this.isDefeated) return;

        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const flyScreenX = fly.x;
        const myScreenX = this.x - screenX;
        const dx = flyScreenX - myScreenX;
        const distToFly = dist(myScreenX, this.y, flyScreenX, fly.y);

        // Dynamic facing: always turns to face the fly!
        this.facing = dx < 0 ? -1 : 1;

        // Terrain Awareness: floor height
        const defaultFloor = height - 130;
        const groundLevel = getGroundSurface(this.x, defaultFloor);

        // Gravity & Jump Physics
        if (this.y < groundLevel) {
            this.vy += 0.5;
            this.onGround = false;
        } else {
            this.y = groundLevel;
            this.vy = 0;
            this.onGround = true;
            this.isJumping = false;
        }
        this.y += this.vy;

        // Active Footwork: moves forward/backward to position directly under or beside fly!
        if (this.swatPhase === 'IDLE') {
            if (abs(dx) > 110 && abs(dx) < 400) {
                this.x += this.facing * 2.2; // Step toward fly
            } else if (abs(dx) < 60) {
                this.x -= this.facing * 1.5; // Back up slightly for optimal swing!
            }
        }

        // ACTIVE HUNTING: Calculate aimed angle from shoulder to fly
        let shoulderX = myScreenX + (this.facing === -1 ? -14 : 14);
        let shoulderY = this.y - 20;
        this.targetAngle = atan2(fly.y - shoulderY, (flyScreenX - shoulderX) * this.facing);

        // Trigger Swat Attack when fly is within 220px!
        if (this.swatPhase === 'IDLE' && distToFly < 220) {
            this.swatPhase = 'WINDUP';
            this.swatTimer = 18; // Wind up anticipation
        }

        if (this.swatPhase === 'WINDUP') {
            this.swatTimer--;
            // Pull swatter back in anticipation
            this.armAngle = lerp(this.armAngle, -PI * 0.55, 0.25);

            if (this.swatTimer <= 0) {
                this.swatPhase = 'STRIKE';
                this.swatTimer = 16;

                // If fly is high up in the air, execute a JUMPING SWAT!
                if (fly.y < this.y - 60 && this.onGround) {
                    this.vy = -7.8;
                    this.isJumping = true;
                    this.onGround = false;
                }
            }
        } else if (this.swatPhase === 'STRIKE') {
            this.swatTimer--;
            // Violent aimed snap swing directly along the targeted angle!
            this.armAngle = lerp(this.armAngle, this.targetAngle + 0.3, 0.45);

            if (this.swatTimer <= 0) {
                this.swatPhase = 'IDLE';
                this.armAngle = 0.2;
            }
        }
    }

    drawEnemy() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);
        scale(this.facing, 1);

        let isHit = this.hitTimer > 0;
        let walkCycle = sin(this.animTimer * 0.16);

        // Warning Alert Icon when preparing to swat!
        if (this.swatPhase === 'WINDUP') {
            fill(239, 68, 68);
            noStroke();
            ellipse(0, -82, 20, 20);
            fill(255);
            textSize(14);
            textStyle(BOLD);
            textAlign(CENTER, CENTER);
            text("!", 0, -82);
        }

        // Legs with Denim Jeans
        stroke(37, 99, 235);
        strokeWeight(12);
        if (this.isJumping) {
            line(-6, 30, -14, 70);
            line(6, 30, 8, 72);
        } else {
            line(-6, 30, -12 + walkCycle * 14, 85);
            line(6, 30, 12 - walkCycle * 14, 85);
        }

        // Shoes with white rubber soles
        stroke(30, 30, 35);
        strokeWeight(10);
        let footY = this.isJumping ? 70 : 85;
        line(-12 + walkCycle * 14, footY, -20 + walkCycle * 14, footY + 2);
        line(12 - walkCycle * 14, footY, 4 - walkCycle * 14, footY + 2);

        // Torso / Red Shirt
        noStroke();
        fill(220, 38, 38);
        rect(-16, -30, 32, 60, 4);
        fill(40, 30, 20);
        rect(-16, 26, 32, 6);
        fill(250, 204, 21);
        rect(-4, 25, 8, 8);

        // Head & Neck
        fill(245, 195, 160);
        rect(-6, -42, 12, 14);
        ellipse(0, -56, 30, 32);

        // Hair
        fill(60, 40, 25);
        arc(0, -60, 32, 26, PI, TWO_PI, CHORD);

        // Angry Face
        if (isHit || this.isDefeated) {
            stroke(220, 38, 38);
            strokeWeight(2);
            line(-8, -58, -4, -54);
            line(-4, -58, -8, -54);
        } else {
            // Intense angry brows
            stroke(40, 25, 15);
            strokeWeight(2.5);
            line(-10, -61, -3, -57);
            line(3, -57, 10, -61);
            noStroke();
            fill(20);
            ellipse(-6, -55, 3.5, 3.5);
            ellipse(6, -55, 3.5, 3.5);
            // Gritted teeth
            fill(255);
            rect(-6, -48, 12, 4);
        }

        // Swatter Arm Joint (aims directly at targeted flight angle)
        push();
        translate(-14, -20);
        rotate(this.armAngle);

        // Arm
        stroke(245, 195, 160);
        strokeWeight(9);
        line(0, 0, -28, 12);

        // Swatter Wire Handle
        stroke(140, 140, 150);
        strokeWeight(3.5);
        line(-28, 12, -78, 28);

        // Mesh Fly Swatter Head
        push();
        translate(-78, 28);
        rotate(-0.3);

        // Swat whoosh motion trail during strike!
        if (this.swatPhase === 'STRIKE') {
            noStroke();
            fill(239, 68, 68, 80);
            arc(0, 0, 80, 80, -PI * 0.4, PI * 0.4);
        }

        fill(239, 68, 68, 180);
        stroke(185, 28, 28);
        strokeWeight(2.5);
        rect(-18, -18, 36, 36, 4);

        // Mesh grid
        strokeWeight(1);
        line(-18, -6, 18, -6);
        line(-18, 6, 18, 6);
        line(-6, -18, -6, 18);
        line(6, -18, 6, 18);
        pop();

        pop();

        // Splat on shirt
        if (isHit || this.isDefeated) {
            fill(110, 55, 20, 230);
            noStroke();
            ellipse(4, -18, 18, 14);
        }

        pop();
    }
}

// ----- 5. CHILD ENEMY (FRANTIC RUNNER, JUMP SWAT & PAPER BALL THROW) -----
class Child extends Human {
    constructor(x, y) {
        super(x, y);
        this.size = 32;
        this.health = 2;
        this.damage = 45;
        this.points = 45;
        this.name = "KID";
        this.throwCooldown = 90;
        this.throwTimer = 0;
        this.isThrowing = false;
    }

    update(fly) {
        // Base Enemy update (not human update)
        this.animTimer++;
        if (this.hitTimer > 0) this.hitTimer--;
        if (this.isDefeated) {
            this.x -= 9;
            return;
        }

        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const flyScreenX = fly.x;
        const myScreenX = this.x - screenX;
        const dx = flyScreenX - myScreenX;
        const distToFly = dist(myScreenX, this.y, flyScreenX, fly.y);

        this.facing = dx < 0 ? -1 : 1;

        // Terrain Awareness: floor height
        const defaultFloor = height - 85;
        const groundLevel = getGroundSurface(this.x, defaultFloor);

        if (this.y < groundLevel) {
            this.vy += 0.55;
            this.onGround = false;
        } else {
            this.y = groundLevel;
            this.vy = 0;
            this.onGround = true;
            this.isJumping = false;
        }
        this.y += this.vy;

        if (this.throwCooldown > 0) this.throwCooldown--;

        // Throwing Paper Ball Attack if fly is high up and out of reach
        if (this.isThrowing) {
            this.throwTimer--;
            this.vx *= 0.5;
            if (this.throwTimer === 12) {
                // Throw paper ball!
                enemyProjectiles.push(new PaperBall(this.x, this.y - 45, flyScreenX, fly.y));
            }
            if (this.throwTimer <= 0) {
                this.isThrowing = false;
            }
        } else if (distToFly < 420) {
            // Case A: Fly is elevated high -> Throw Paper Ball!
            if (this.onGround && this.throwCooldown <= 0 && fly.y < this.y - 100 && abs(dx) < 280) {
                this.isThrowing = true;
                this.throwTimer = 25;
                this.throwCooldown = 110;
                this.vx = 0;
            }
            // Case B: Close range -> Frantic sprint & jump swat!
            else if (distToFly < 180) {
                this.swatPhase = 'STRIKE';
                this.armAngle = sin(this.animTimer * 0.5) * 1.2;
                if (this.onGround && fly.y < this.y - 30 && random(1) < 0.08) {
                    this.vy = -8.5; // Jump swat!
                    this.isJumping = true;
                    this.onGround = false;
                }
            } else {
                // Fast sprint pursuit
                this.vx = this.facing * 4.2;
                this.armAngle = 0.2;
            }
        } else {
            this.vx = this.facing * 2.2;
        }

        this.x += this.vx;
    }

    drawEnemy() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);
        scale(this.facing, 1);

        let isHit = this.hitTimer > 0;
        let sprintCycle = sin(this.animTimer * 0.35);

        // Throwing text
        if (this.isThrowing) {
            fill(250, 204, 21);
            noStroke();
            textSize(12);
            textStyle(BOLD);
            textAlign(CENTER, CENTER);
            text("TAKE THIS!", 0, -56);
        }

        // Kid Shorts & Striped Legs
        stroke(234, 179, 8);
        strokeWeight(7);
        if (this.isJumping) {
            line(-4, 18, -12, 42);
            line(4, 18, 10, 44);
        } else {
            line(-4, 18, -10 + sprintCycle * 16, 52);
            line(4, 18, 10 - sprintCycle * 16, 52);
        }

        // Denim Shorts
        noStroke();
        fill(30, 64, 175);
        rect(-11, 8, 22, 16, 2);

        // Striped T-Shirt
        fill(14, 165, 233);
        rect(-11, -22, 22, 32, 3);
        fill(255);
        rect(-11, -16, 22, 5);
        rect(-11, -6, 22, 5);

        // Head
        fill(254, 215, 170);
        ellipse(0, -34, 24, 24);

        // Backwards Baseball Cap
        fill(220, 38, 38);
        arc(0, -38, 26, 22, PI, TWO_PI, CHORD);
        fill(185, 28, 28);
        rect(8, -40, 10, 4, 2);

        // Face
        if (isHit || this.isDefeated) {
            stroke(220, 38, 38);
            strokeWeight(2);
            line(-5, -36, -1, -32);
            line(-1, -36, -5, -32);
        } else {
            noStroke();
            fill(25);
            ellipse(-4, -34, 3, 3);
            ellipse(4, -34, 3, 3);
            fill(239, 68, 68);
            arc(0, -28, 8, 6, 0, PI, CHORD);
        }

        // Plastic Neon Swatter Arm
        push();
        translate(-8, -14);
        rotate(this.armAngle);

        stroke(254, 215, 170);
        strokeWeight(6);
        line(0, 0, -20, 8);

        stroke(250, 204, 21);
        strokeWeight(3);
        line(-20, 8, -52, 16);

        push();
        translate(-52, 16);
        fill(163, 230, 53, 190);
        stroke(101, 163, 13);
        strokeWeight(2);
        rect(-12, -12, 24, 24, 3);
        pop();

        pop();

        // Splat mark
        if (isHit || this.isDefeated) {
            fill(110, 55, 20, 230);
            noStroke();
            ellipse(0, -10, 14, 10);
        }

        pop();
    }
}
`,vt=`
// ----- AMBIENT BACKGROUND PARTICLES -----
let ambientParticles = [];

function initAmbientParticles() {
    ambientParticles = [];
    for (let i = 0; i < 18; i++) {
        ambientParticles.push({
            x: random(width),
            y: random(height),
            vx: random(-0.3, 0.3),
            vy: random(-0.25, 0.25),
            size: random(2, 4),
            alpha: random(40, 100),
            phase: random(TWO_PI)
        });
    }
}

// ----- BACKGROUND RENDERING BY LOCATION -----
function drawBackground() {
    const config = levelConfigs[currentLevel];
    if (!config) return;

    if (currentLevel === 1) {
        drawOutdoorsBackground();
    } else if (currentLevel === 2) {
        drawBedroomBackground();
    } else if (currentLevel === 3) {
        drawSewerBackground();
    } else if (currentLevel === 4) {
        drawAtticBackground();
    } else if (currentLevel === 5) {
        drawBathroomBackground();
    } else if (currentLevel === 6) {
        drawHallBackground();
    } else if (currentLevel === 7) {
        drawKitchenBackground();
    }

    // Draw ambient floating particles (pollen, dust, steam)
    drawAmbientParticles();
}

function drawOutdoorsBackground() {
    // Summer Sky Gradient
    let skyTop = color(56, 140, 240);
    let skyMid = color(140, 200, 255);
    let skyBottom = color(225, 240, 255);

    noStroke();
    for (let y = 0; y < height - 60; y += 12) {
        let t = y / (height - 60);
        let col = t < 0.6 ? lerpColor(skyTop, skyMid, t / 0.6) : lerpColor(skyMid, skyBottom, (t - 0.6) / 0.4);
        fill(col);
        rect(0, y, width, 12);
    }

    // Glowing Sun
    push();
    fill(255, 245, 180, 70);
    ellipse(width * 0.82, 100, 140, 140);
    fill(255, 255, 220, 180);
    ellipse(width * 0.82, 100, 80, 80);
    fill(255, 255, 255);
    ellipse(width * 0.82, 100, 50, 50);
    pop();

    // Distant Parallax Hills (0.2x speed)
    fill(130, 185, 140);
    let hillScroll = (scrollX * 0.15) % 800;
    for (let x = -800; x < width + 800; x += 350) {
        ellipse(x - hillScroll, height - 70, 480, 120);
    }

    // Concrete Sidewalk (height - 60 to height - 20)
    fill(195, 198, 204);
    rect(0, height - 60, width, 40);

    // Sidewalk slabs expansion joints
    stroke(150, 155, 160);
    strokeWeight(2);
    let slabOffset = (scrollX) % 180;
    for (let sx = -180; sx < width + 180; sx += 180) {
        line(sx - slabOffset, height - 60, sx - slabOffset, height - 20);
        // Little grass tuft in sidewalk crack
        if (Math.floor((sx + scrollX) / 180) % 2 === 0) {
            stroke(74, 160, 60);
            strokeWeight(1.5);
            line(sx - slabOffset, height - 20, sx - slabOffset - 4, height - 28);
            line(sx - slabOffset, height - 20, sx - slabOffset + 4, height - 27);
        }
    }

    // Concrete Curb drop shadow
    noStroke();
    fill(130, 135, 140);
    rect(0, height - 22, width, 4);

    // Asphalt Road with white/yellow road line markings
    fill(55, 60, 68);
    rect(0, height - 18, width, 18);
    fill(250, 204, 21);
    let dashOffset = (scrollX * 1.0) % 60;
    for (let dx = -60; dx < width + 60; dx += 60) {
        rect(dx - dashOffset, height - 9, 30, 4);
    }
}

function drawBedroomBackground() {
    // Cozy vertical striped wallpaper
    noStroke();
    let stripeW = 28;
    for (let x = 0; x < width; x += stripeW) {
        let isStripe = (Math.floor(x / stripeW) % 2 === 0);
        fill(isStripe ? '#dbeafe' : '#eff6ff');
        rect(x, 0, stripeW, height - 35);
    }

    // Decorative white crown molding
    fill(255);
    rect(0, 0, width, 16);
    fill(225, 230, 240);
    rect(0, 16, width, 5);

    // Plush plush navy carpet floor
    fill(30, 58, 110);
    rect(0, height - 35, width, 35);
    // Baseboard trim
    fill(250, 250, 250);
    rect(0, height - 44, width, 9);
    fill(210, 215, 225);
    rect(0, height - 37, width, 2);

    // Sunbeam streaming from ceiling/window
    fill(255, 245, 180, 25);
    quad(80, 0, 280, 0, 480, height - 35, 20, height - 35);
}

function drawSewerBackground() {
    // Curved subterranean brick tunnel
    background(28, 36, 40);

    // Brick texture pattern
    stroke(20, 24, 28);
    strokeWeight(1.5);
    let brickW = 48;
    let brickH = 22;
    for (let y = 0; y < height - 60; y += brickH) {
        let row = Math.floor(y / brickH);
        let shift = (row % 2 === 0) ? 0 : brickW / 2;
        line(0, y, width, y);
        for (let x = -brickW; x < width + brickW; x += brickW) {
            let bx = x + shift - (scrollX * 0.3 % brickW);
            line(bx, y, bx, y + brickH);
        }
    }

    // Slime and moss stains running down
    noStroke();
    fill(45, 95, 45, 140);
    let slimeScroll = (scrollX * 0.3) % 240;
    for (let sx = -240; sx < width + 240; sx += 180) {
        beginShape();
        vertex(sx - slimeScroll, 0);
        vertex(sx - slimeScroll + 35, 0);
        vertex(sx - slimeScroll + 20, 120 + sin(sx) * 40);
        vertex(sx - slimeScroll + 5, 80 + cos(sx) * 30);
        endShape(CLOSE);
    }

    // Toxic bubbling slime runoff water at the bottom!
    let slimeBaseY = height - 50;
    fill(35, 115, 55);
    rect(0, slimeBaseY, width, 50);

    // Animated sinusoidal sludge wave
    fill(65, 175, 75, 220);
    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width; x += 25) {
        let wave = sin(frameCounter * 0.08 + x * 0.03) * 6;
        vertex(x, slimeBaseY + wave);
    }
    vertex(width, height);
    endShape(CLOSE);

    // Slime foam bubbles popping
    fill(130, 230, 120, 190);
    for (let bx = 30; bx < width; bx += 90) {
        let bubY = slimeBaseY + sin(frameCounter * 0.08 + bx * 0.03) * 6;
        let bubSize = 6 + sin(frameCounter * 0.15 + bx) * 3;
        ellipse(bx, bubY + 3, bubSize, bubSize * 0.7);
    }
}

function drawAtticBackground() {
    // Rustic timber planks
    background(55, 42, 32);

    // Diagonal roof rafter angle
    stroke(40, 30, 22);
    strokeWeight(10);
    line(0, 0, width, height * 0.35);

    // Golden dust shafts of light streaming between roof planks
    noStroke();
    fill(255, 225, 130, 35);
    quad(width * 0.2, 0, width * 0.35, 0, width * 0.55, height - 30, width * 0.15, height - 30);
    quad(width * 0.65, 0, width * 0.75, 0, width * 0.9, height - 30, width * 0.6, height - 30);

    // Rough wooden floorboards with iron nails
    fill(75, 55, 40);
    rect(0, height - 35, width, 35);
    stroke(45, 32, 22);
    strokeWeight(2);
    let plankOffset = (scrollX) % 150;
    for (let px = -150; px < width + 150; px += 150) {
        line(px - plankOffset, height - 35, px - plankOffset, height);
        // Iron nails
        fill(30, 20, 15);
        noStroke();
        ellipse(px - plankOffset + 8, height - 25, 3, 3);
        ellipse(px - plankOffset + 8, height - 12, 3, 3);
    }
}

function drawBathroomBackground() {
    // White porcelain subway tiles
    background(245, 248, 252);

    // Charcoal grout lines
    stroke(215, 225, 235);
    strokeWeight(1.5);
    let tileW = 55;
    let tileH = 25;
    for (let y = 0; y < height - 60; y += tileH) {
        let row = Math.floor(y / tileH);
        let shift = (row % 2 === 0) ? 0 : tileW / 2;
        line(0, y, width, y);
        for (let x = -tileW; x < width + tileW; x += tileW) {
            line(x + shift, y, x + shift, y + tileH);
        }
    }

    // Turquoise glass mosaic accent border
    noStroke();
    fill(45, 175, 195);
    rect(0, height * 0.38, width, 14);
    fill(35, 145, 165);
    for (let x = 0; x < width; x += 14) {
        rect(x, height * 0.38 + 2, 6, 10);
    }

    // Glossy Hexagonal floor tiles
    fill(235, 240, 248);
    rect(0, height - 55, width, 55);
    stroke(205, 215, 225);
    strokeWeight(1);
    for (let x = 0; x < width; x += 30) {
        line(x, height - 55, x + 15, height);
        line(x + 15, height - 55, x, height);
    }
}

function drawHallBackground() {
    // Victorian warm gold/amber patterned damask wallpaper
    background(245, 225, 175);

    // Subtle wallpaper diamond pattern
    noFill();
    stroke(228, 200, 145, 120);
    strokeWeight(1.5);
    let patSize = 40;
    let scrollPat = (scrollX * 0.5) % patSize;
    for (let y = 0; y < height - 120; y += patSize) {
        for (let x = -patSize; x < width + patSize; x += patSize) {
            let cx = x - scrollPat;
            let cy = y;
            quad(cx, cy - patSize / 2, cx + patSize / 2, cy, cx, cy + patSize / 2, cx - patSize / 2, cy);
        }
    }

    // Rich mahogany wainscoting on lower wall
    noStroke();
    fill(95, 45, 22);
    rect(0, height - 120, width, 75);

    // Wainscoting wood panel frames
    stroke(70, 30, 15);
    strokeWeight(2);
    let panelW = 90;
    let panelScroll = (scrollX * 0.5) % panelW;
    for (let px = -panelW; px < width + panelW; px += panelW) {
        rect(px - panelScroll + 10, height - 112, panelW - 20, 60, 3);
    }

    // Dark polished hardwood floor
    noStroke();
    fill(55, 28, 12);
    rect(0, height - 45, width, 45);

    // Red and Gold Persian carpet runner
    fill(165, 30, 35);
    rect(0, height - 38, width, 30);
    // Gold ornamental carpet borders
    fill(245, 200, 70);
    rect(0, height - 38, width, 3);
    rect(0, height - 11, width, 3);
}

function drawKitchenBackground() {
    // Mint / turquoise subway tile backsplash
    background(225, 242, 240);

    // Backsplash tiles
    stroke(190, 220, 218);
    strokeWeight(1.5);
    let tileW = 50;
    let tileH = 24;
    for (let y = 0; y < height - 55; y += tileH) {
        let row = Math.floor(y / tileH);
        let shift = (row % 2 === 0) ? 0 : tileW / 2;
        line(0, y, width, y);
        for (let x = -tileW; x < width + tileW; x += tileW) {
            line(x + shift - (scrollX * 0.4 % tileW), y, x + shift - (scrollX * 0.4 % tileW), y + tileH);
        }
    }

    // Classic black & white diagonal checkered floor
    noStroke();
    let checkSize = 35;
    let floorY = height - 55;
    rect(0, floorY, width, 55);

    for (let y = floorY; y < height; y += checkSize / 2) {
        for (let x = -checkSize; x < width + checkSize; x += checkSize) {
            let row = Math.floor((y - floorY) / (checkSize / 2));
            let col = Math.floor(x / checkSize);
            let isBlack = (row + col) % 2 === 0;
            fill(isBlack ? 35 : 245);
            rect(x - (scrollX % checkSize), y, checkSize, checkSize / 2);
        }
    }
}

function drawAmbientParticles() {
    for (let p of ambientParticles) {
        p.x += p.vx + sin(frameCounter * 0.05 + p.phase) * 0.3;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        noStroke();
        if (currentLevel === 1) {
            // Dandelion fluff / pollen
            fill(255, 255, 255, p.alpha * 0.8);
            ellipse(p.x, p.y, p.size, p.size);
        } else if (currentLevel === 3) {
            // Sewer steam / droplets
            fill(120, 220, 160, p.alpha * 0.6);
            ellipse(p.x, p.y, p.size * 1.5, p.size * 1.5);
        } else if (currentLevel === 4) {
            // Sparkling golden attic dust
            fill(255, 230, 150, p.alpha);
            ellipse(p.x, p.y, p.size * 0.8, p.size * 0.8);
        } else {
            // Indoor dust mote
            fill(255, 255, 255, p.alpha * 0.5);
            ellipse(p.x, p.y, p.size * 0.8, p.size * 0.8);
        }
    }
}

// ----- FOOD CLASS WITH HIGH-RES GRAPHICS -----
class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = random(['apple', 'sandwich', 'burger', 'donut', 'banana']);
        this.bobOffset = random(TWO_PI);

        switch (this.type) {
            case 'apple':
                this.size = 24; this.energyValue = 18; this.displayName = 'Crisp Apple'; break;
            case 'sandwich':
                this.size = 32; this.energyValue = 35; this.displayName = 'Deli Club'; break;
            case 'burger':
                this.size = 36; this.energyValue = 50; this.displayName = 'Juicy Burger'; break;
            case 'donut':
                this.size = 28; this.energyValue = 30; this.displayName = 'Pink Donut'; break;
            case 'banana':
                this.size = 28; this.energyValue = 22; this.displayName = 'Sweet Banana'; break;
        }
    }

    update() {}

    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;
        let hoverY = this.y + sin(frameCounter * 0.1 + this.bobOffset) * 4;

        push();
        translate(drawX, hoverY);

        // Aroma scent trail floating up
        noStroke();
        fill(255, 230, 150, 90 + sin(frameCounter * 0.15) * 40);
        let aromaSway = sin(frameCounter * 0.12 + this.bobOffset) * 6;
        ellipse(aromaSway, -this.size / 2 - 8, 5, 5);
        ellipse(-aromaSway * 0.8, -this.size / 2 - 16, 7, 7);

        // Drop shadow under food
        fill(0, 0, 0, 50);
        ellipse(0, this.size / 2 + 3, this.size * 0.9, 6);

        if (this.type === 'apple') {
            // Shiny Red Apple
            noStroke();
            fill(225, 29, 72); // Deep red
            ellipse(0, 0, 22, 22);
            // Highlight shine
            fill(255, 120, 140, 190);
            ellipse(-4, -5, 8, 8);
            fill(255, 255, 255, 220);
            ellipse(-5, -6, 3, 3);
            // Stem
            stroke(100, 50, 20);
            strokeWeight(2.5);
            line(0, -10, 2, -15);
            // Green leaf
            noStroke();
            fill(34, 197, 94);
            ellipse(5, -14, 7, 4);

        } else if (this.type === 'sandwich') {
            // Layered Club Sandwich
            noStroke();
            // Bread bottom
            fill(217, 170, 115);
            rect(-15, 4, 30, 6, 2);
            // Pink Ham
            fill(244, 114, 182);
            rect(-14, 1, 28, 3);
            // Yellow Cheese point
            fill(250, 204, 21);
            triangle(-10, 1, 6, 1, -2, 7);
            // Curly Lettuce
            fill(34, 197, 94);
            rect(-16, -3, 32, 4, 2);
            // Red Tomato slice
            fill(239, 68, 68);
            rect(-13, -6, 26, 3);
            // Bread top with crust
            fill(235, 190, 130);
            rect(-15, -12, 30, 6, 2);
            // Toothpick with olive
            stroke(200, 160, 100);
            strokeWeight(1.5);
            line(0, -12, 0, -18);
            noStroke();
            fill(101, 163, 13);
            ellipse(0, -18, 5, 5);

        } else if (this.type === 'burger') {
            // Deluxe Cheeseburger
            noStroke();
            // Bottom toasted bun
            fill(215, 155, 95);
            rect(-16, 6, 32, 6, 3);
            // Grilled Patty
            fill(90, 45, 20);
            rect(-17, 1, 34, 5, 2);
            // Dripping Melted Cheddar
            fill(245, 190, 20);
            rect(-16, -1, 32, 3);
            triangle(-10, 2, -4, 2, -7, 6);
            // Lettuce ripple
            fill(34, 197, 94);
            rect(-18, -4, 36, 3, 2);
            // Tomato slice
            fill(220, 38, 38);
            rect(-15, -7, 30, 3);
            // Golden Sesame Seed Brioche Bun
            fill(230, 165, 100);
            arc(0, -7, 34, 20, PI, TWO_PI, CHORD);
            // White sesame seeds
            fill(255, 250, 230);
            ellipse(-8, -12, 2.5, 1.5);
            ellipse(0, -14, 2.5, 1.5);
            ellipse(8, -12, 2.5, 1.5);

        } else if (this.type === 'donut') {
            // Frosted Donut
            noStroke();
            fill(217, 170, 115);
            ellipse(0, 0, 26, 26);
            // Strawberry frosting
            fill(244, 114, 182);
            ellipse(0, 0, 23, 23);
            // Donut center hole
            fill(currentLevel === 3 ? '#1c2428' : currentLevel === 4 ? '#372a20' : '#dbeafe');
            ellipse(0, 0, 8, 8);
            // Colorful sprinkles
            fill(59, 130, 246);
            rect(-6, -6, 4, 1.5);
            fill(250, 204, 21);
            rect(4, -5, 1.5, 4);
            fill(34, 197, 94);
            rect(2, 5, 4, 1.5);

        } else {
            // Sweet Banana
            stroke(245, 200, 30);
            strokeWeight(7);
            noFill();
            arc(0, 0, 22, 22, 0.4, 2.8);
            // Brown tips
            stroke(90, 50, 15);
            strokeWeight(3);
            point(10, 3);
            point(-10, 3);
            noStroke();
        }

        pop();
    }

    isOnScreen() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        return this.x - screenX > -60 && this.x - screenX < width + 60;
    }
}

// ----- HIGH-RES EXIT PORTAL CLASS -----
class Exit {
    constructor(x, y, w, h, toLevel, label) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.size = (w + h) / 2;
        this.toLevel = toLevel;
        this.label = label || '';
        this.pulsePhase = random(TWO_PI);
    }

    update() {}

    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);

        let pulse = sin(frameCounter * 0.1 + this.pulsePhase);
        let glowAlpha = map(pulse, -1, 1, 90, 210);

        // Check exit label to render bespoke thematic visual
        let lbl = this.label.toLowerCase();

        if (lbl.includes('window')) {
            // Detailed Window Frame with Glass
            stroke(245, 245, 250);
            strokeWeight(5);
            fill(210, 235, 255, 160);
            rect(0, 0, this.w, this.h, 4);
            // Window mullions
            stroke(240, 240, 245);
            strokeWeight(2.5);
            line(this.w / 2, 0, this.w / 2, this.h);
            line(0, this.h / 2, this.w, this.h / 2);
            // Open window sash gap
            fill(30, 40, 60, 200);
            noStroke();
            rect(4, this.h / 2, this.w - 8, this.h / 2 - 4);
            // Billowing curtain
            fill(255, 255, 255, 200);
            let wave = sin(frameCounter * 0.15) * 8;
            quad(this.w - 12, 0, this.w, 0, this.w + wave, this.h, this.w - 16 + wave, this.h);

        } else if (lbl.includes('manhole') || lbl.includes('drain')) {
            // Cast Iron Grate / Manhole
            fill(40, 42, 48);
            stroke(85, 90, 100);
            strokeWeight(4);
            rect(0, 0, this.w, this.h, 8);
            // Grate slots
            stroke(15, 18, 22);
            strokeWeight(3);
            for (let gx = 10; gx < this.w; gx += 12) {
                line(gx, 4, gx, this.h - 4);
            }
            // Suction whirlpool vortex particles
            noStroke();
            fill(45, 180, 150, 120);
            ellipse(this.w / 2 + sin(frameCounter * 0.2) * 10, this.h / 2, 16, 8);

        } else if (lbl.includes('attic') || lbl.includes('vent')) {
            // Ceiling Hatch or Louvered HVAC Vent
            fill(50, 40, 32);
            stroke(180, 150, 110);
            strokeWeight(3);
            rect(0, 0, this.w, this.h, 4);
            // Louver slats
            stroke(120, 100, 80);
            strokeWeight(2);
            for (let ly = 6; ly < this.h; ly += 8) {
                line(4, ly, this.w - 4, ly);
            }
            // Dangling pull cord
            stroke(240, 220, 180);
            strokeWeight(2);
            let cordSway = sin(frameCounter * 0.1) * 6;
            line(this.w / 2, this.h, this.w / 2 + cordSway, this.h + 20);
            fill(200, 160, 90);
            noStroke();
            ellipse(this.w / 2 + cordSway, this.h + 22, 6, 8);

        } else if (lbl.includes('door')) {
            // Paneled Wooden Door
            fill(120, 75, 45);
            stroke(75, 45, 25);
            strokeWeight(3);
            rect(0, 0, this.w, this.h, 2);
            // Door panels
            fill(100, 60, 35);
            rect(6, 8, this.w - 12, this.h * 0.4, 2);
            rect(6, this.h * 0.48, this.w - 12, this.h * 0.44, 2);
            // Brass handle
            fill(250, 204, 21);
            noStroke();
            ellipse(this.w - 8, this.h / 2, 7, 7);

        } else if (lbl.includes('stairs')) {
            // Wooden Staircase Steps
            fill(140, 85, 45);
            stroke(85, 50, 25);
            strokeWeight(2);
            rect(0, 0, this.w, this.h);
            for (let sx = 0; sx < this.w; sx += 20) {
                line(sx, 0, sx + 10, this.h);
            }

        } else {
            // General Pipe or Passage
            fill(60, 70, 85);
            stroke(100, 120, 140);
            strokeWeight(3);
            rect(0, 0, this.w, this.h, 6);
        }

        // Glowing Pulsing Beacon Frame & Target Arrow
        stroke(255, 215, 0, glowAlpha);
        strokeWeight(2);
        noFill();
        rect(-2, -2, this.w + 4, this.h + 4, 6);

        // Animated Beacon Label Badge
        const destName = levelConfigs[this.toLevel] ? levelConfigs[this.toLevel].name : 'NEXT';
        fill(15, 23, 42, 220);
        stroke(255, 215, 0, glowAlpha);
        strokeWeight(1);
        rect(this.w / 2 - 50, -22, 100, 18, 4);

        noStroke();
        fill(255, 235, 120, 240);
        textAlign(CENTER, CENTER);
        textSize(10);
        textStyle(BOLD);
        text(\`➔ \${destName.toUpperCase()}\`, this.w / 2, -13);

        pop();
    }
}

// ----- LEVEL-SPECIFIC OBJECT CLASSES -----
class LevelObject {
    constructor(x, y, w, h, color) {
        this.x = x; this.y = y; this.w = w; this.h = h; this.color = color;
    }
    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        fill(this.color);
        rect(this.x - screenX, this.y, this.w, this.h);
    }
}

class BackgroundObject {
    constructor(x, y, w, h, color) {
        this.x = x; this.y = y; this.w = w; this.h = h; this.color = color;
    }
    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - (levelConfigs[currentLevel].isScrolling ? screenX : 0);
        noStroke();
        fill(this.color);
        rect(drawX, this.y, this.w, this.h);
    }
}

// Outdoor House
class House extends BackgroundObject {
    constructor(x, y) {
        const houseHeight = random(280, 420);
        const houseWidth = random(240, 360);
        super(x, y - houseHeight, houseWidth, houseHeight, '#e2e8f0');
        this.roofColor = '#991b1b'; // Red brick shingles
        this.doorColor = '#78350f';
    }
    draw() {
        let screenX = this.x - scrollX;
        // Siding
        fill(this.color);
        rect(screenX, this.y, this.w, this.h);
        stroke(203, 213, 225);
        strokeWeight(1);
        for (let sy = this.y + 20; sy < this.y + this.h; sy += 18) {
            line(screenX, sy, screenX + this.w, sy);
        }
        noStroke();

        // Shingle Roof
        fill(this.roofColor);
        triangle(screenX - 15, this.y, screenX + this.w + 15, this.y, screenX + this.w / 2, this.y - 75);

        // Paneled Door with Brass Knob
        fill(this.doorColor);
        rect(screenX + this.w / 2 - 20, this.y + this.h - 65, 40, 65, 2);
        fill(250, 204, 21);
        ellipse(screenX + this.w / 2 + 12, this.y + this.h - 32, 5, 5);

        // Lighted Windows with Curtains
        fill(254, 240, 138); // Warm indoor light
        rect(screenX + 30, this.y + 50, 50, 55, 3);
        rect(screenX + this.w - 80, this.y + 50, 50, 55, 3);
        // Window frames
        stroke(255);
        strokeWeight(2.5);
        line(screenX + 55, this.y + 50, screenX + 55, this.y + 105);
        line(screenX + 30, this.y + 77, screenX + 80, this.y + 77);
        line(screenX + this.w - 55, this.y + 50, screenX + this.w - 55, this.y + 105);
        line(screenX + this.w - 80, this.y + 77, screenX + this.w - 30, this.y + 77);
        noStroke();
    }
}

// Outdoor Tree
class Tree extends BackgroundObject {
    constructor(x, y) {
        const treeHeight = random(240, 380);
        const trunkWidth = random(24, 42);
        super(x, y - treeHeight, trunkWidth, treeHeight, '#78350f');
        this.foliageW = random(120, 180);
    }
    draw() {
        let screenX = this.x - scrollX;
        // Textured Trunk
        fill(100, 50, 20);
        rect(screenX, this.y + 60, this.w, this.h - 60, 4);

        // Lush Layered Foliage
        noStroke();
        fill(22, 101, 52); // Darker base green
        ellipse(screenX + this.w / 2, this.y + 70, this.foliageW, this.foliageW * 0.9);
        fill(34, 197, 94); // Vibrant mid green
        ellipse(screenX + this.w / 2 - 25, this.y + 50, this.foliageW * 0.85, this.foliageW * 0.8);
        ellipse(screenX + this.w / 2 + 25, this.y + 45, this.foliageW * 0.8, this.foliageW * 0.8);
        fill(74, 222, 128); // Highlight green
        ellipse(screenX + this.w / 2, this.y + 25, this.foliageW * 0.75, this.foliageW * 0.75);
    }
}

// Streetlight
class Streetlight extends BackgroundObject {
    constructor(x, y) {
        super(x, y - 260, 16, 260, '#334155');
    }
    draw() {
        let screenX = this.x - scrollX;
        // Cast iron post
        fill(51, 65, 85);
        rect(screenX, this.y, this.w, this.h, 2);
        // Base
        rect(screenX - 8, this.y + this.h - 15, this.w + 16, 15, 3);
        // Light arm curved
        rect(screenX - 55, this.y, 70, 14, 2);
        // Lantern head
        fill(30, 41, 59);
        rect(screenX - 70, this.y, 24, 32, 3);
        // Warm glow bulb
        fill(254, 240, 138, 220);
        ellipse(screenX - 58, this.y + 36, 18, 18);
        // Ambient glow halo
        noStroke();
        fill(255, 245, 160, 60);
        ellipse(screenX - 58, this.y + 40, 90, 60);
    }
}

// Fire Hydrant
class FireHydrant extends BackgroundObject {
    constructor(x, y) {
        super(x, y - 65, 34, 65, '#ef4444');
    }
    draw() {
        let screenX = this.x - scrollX;
        // Base
        fill(185, 28, 28);
        rect(screenX - 6, this.y + this.h - 12, this.w + 12, 12, 2);
        // Red Barrel
        fill(239, 68, 68);
        rect(screenX, this.y + 12, this.w, this.h - 24, 3);
        // Bonnet top
        fill(220, 38, 38);
        arc(screenX + this.w / 2, this.y + 12, this.w + 6, 22, PI, TWO_PI, CHORD);
        // Pentagonal operating nut
        fill(250, 204, 21);
        rect(screenX + this.w / 2 - 4, this.y - 4, 8, 6, 1);
        // Hose nozzles
        fill(185, 28, 28);
        rect(screenX - 10, this.y + 24, 10, 16, 2);
        rect(screenX + this.w, this.y + 24, 10, 16, 2);
    }
}

// Sewer Drain
class SewerDrain extends BackgroundObject {
    constructor(x, y) {
        super(x, y, 110, 22, '#334155');
    }
    draw() {
        let screenX = this.x - scrollX;
        fill(20, 25, 30);
        rect(screenX, this.y, this.w, this.h, 4);
        stroke(100, 116, 139);
        strokeWeight(3);
        for (let i = 12; i < this.w; i += 12) {
            line(screenX + i, this.y + 2, screenX + i, this.y + this.h - 2);
        }
        noStroke();
    }
}

// Bedroom Bed
class Bed extends LevelObject {
    constructor(x, y) { super(x, y, 260, 130, '#78350f'); }
    draw() {
        let screenX = this.x - scrollX;
        // Headboard & frame
        fill(120, 53, 15);
        rect(screenX, this.y - this.h, 24, this.h, 3); // Tall headboard
        rect(screenX, this.y - 40, this.w, 40, 2); // Frame base
        // Thick mattress
        fill(248, 250, 252);
        rect(screenX + 20, this.y - 85, this.w - 25, 45, 4);
        // Quilted blue duvet blanket
        fill(59, 130, 246);
        rect(screenX + 20, this.y - 88, this.w - 100, 48, 4);
        // Quilt stitches
        stroke(37, 99, 235);
        strokeWeight(1.5);
        line(screenX + 60, this.y - 88, screenX + 60, this.y - 40);
        line(screenX + 110, this.y - 88, screenX + 110, this.y - 40);
        noStroke();
        // Fluffy pillows
        fill(255);
        ellipse(screenX + this.w - 45, this.y - 95, 55, 26);
    }
}

// Bedroom Dresser
class Dresser extends LevelObject {
    constructor(x, y) { super(x, y, 160, 210, '#9a3412'); }
    draw() {
        let screenX = this.x - scrollX;
        fill(154, 52, 18);
        rect(screenX, this.y - this.h, this.w, this.h, 3);
        // Drawers with shadow line and brass handles
        for (let i = 0; i < 4; i++) {
            let dy = this.y - this.h + 15 + i * 48;
            fill(124, 45, 18);
            rect(screenX + 12, dy, this.w - 24, 40, 2);
            // Brass ring pull handles
            fill(250, 204, 21);
            ellipse(screenX + 45, dy + 20, 8, 8);
            ellipse(screenX + this.w - 45, dy + 20, 8, 8);
        }
    }
}

// Bedroom Desk with Gaming PC
class DeskWithPC extends LevelObject {
    constructor(x, y) { super(x, y, 190, 110, '#57534e'); }
    draw() {
        let screenX = this.x - scrollX;
        // Desk Top & Legs
        fill(87, 83, 78);
        rect(screenX, this.y - this.h, this.w, this.h, 3);

        // Curved Ultra-wide Monitor
        fill(15, 23, 42);
        rect(screenX + 30, this.y - this.h - 68, 105, 62, 4);
        // Screen Cyberpunk Glow
        fill(14, 165, 233);
        rect(screenX + 34, this.y - this.h - 64, 97, 54, 2);
        // Matrix / code graph lines
        stroke(255, 255, 255, 180);
        strokeWeight(1.5);
        line(screenX + 40, this.y - this.h - 30, screenX + 70, this.y - this.h - 50);
        line(screenX + 70, this.y - this.h - 50, screenX + 110, this.y - this.h - 35);
        noStroke();

        // RGB PC Gaming Tower
        fill(24, 24, 27);
        rect(screenX + this.w - 45, this.y - this.h, 40, -85, 3);
        // Glowing circular fans
        fill(236, 72, 153);
        ellipse(screenX + this.w - 25, this.y - this.h - 60, 18, 18);
        fill(168, 85, 247);
        ellipse(screenX + this.w - 25, this.y - this.h - 30, 18, 18);
    }
}

// Laundry Hamper
class Hamper extends LevelObject {
    constructor(x, y) { super(x, y, 85, 130, '#d97706'); }
    draw() {
        let screenX = this.x - scrollX;
        fill(217, 119, 6);
        rect(screenX, this.y - this.h, this.w, this.h, 8);
        // Wicker weave pattern
        stroke(180, 83, 9);
        strokeWeight(1.5);
        for (let ly = this.y - this.h + 15; ly < this.y; ly += 14) {
            line(screenX + 4, ly, screenX + this.w - 4, ly);
        }
        noStroke();
        // Clothes spilling out top
        fill(244, 63, 94);
        ellipse(screenX + 25, this.y - this.h - 4, 24, 14);
        fill(59, 130, 246);
        ellipse(screenX + 55, this.y - this.h - 2, 28, 16);
    }
}

// Standing Floor Lamp
class Lamp extends LevelObject {
    constructor(x, y) { super(x, y, 44, 160, '#e2e8f0'); }
    draw() {
        let screenX = this.x - scrollX;
        let lampTopY = this.y - this.h;
        // Brass base
        fill(234, 179, 8);
        ellipse(screenX + this.w / 2, this.y, 40, 12);
        // Pole
        rect(screenX + this.w / 2 - 4, lampTopY + 35, 8, this.h - 35);
        // Pleated Fabric Lampshade
        fill(254, 249, 195);
        quad(screenX + 5, lampTopY + 35, screenX + this.w - 5, lampTopY + 35, screenX + this.w + 8, lampTopY, screenX - 8, lampTopY);
        // Ambient light cone downward
        fill(254, 240, 138, 40);
        noStroke();
        triangle(screenX + this.w / 2, lampTopY + 35, screenX - 60, this.y, screenX + this.w + 60, this.y);
    }
}

// Sewer Pipe
class BackgroundPipe extends BackgroundObject {
    constructor(x) {
        const pipeY = random(80, height - 140);
        const pipeW = random(220, 420);
        const pipeH = random(35, 65);
        super(x, pipeY, pipeW, pipeH, '#475569');
    }
    draw() {
        let screenX = this.x - scrollX;
        // Metallic cast iron pipe
        fill(71, 85, 105);
        rect(screenX, this.y, this.w, this.h, 4);
        // Flanges with bolts
        fill(51, 65, 85);
        rect(screenX, this.y - 4, 12, this.h + 8, 2);
        rect(screenX + this.w - 12, this.y - 4, 12, this.h + 8, 2);
        // Highlight sheen
        fill(148, 163, 184, 120);
        rect(screenX + 12, this.y + 4, this.w - 24, 6);
    }
}

// Attic Box
class AtticBox extends LevelObject {
    constructor(x, y) {
        const size = random(90, 150);
        super(x, y, size, size, '#b45309');
    }
    draw() {
        let screenX = this.x - scrollX;
        fill(180, 83, 9);
        rect(screenX, this.y - this.h, this.w, this.h, 3);
        // Corrugated box tape
        fill(245, 158, 11, 200);
        rect(screenX + this.w / 2 - 12, this.y - this.h, 24, this.h);
        rect(screenX, this.y - this.h / 2 - 12, this.w, 24);
        // "FRAGILE" red stamp
        fill(220, 38, 38, 220);
        rect(screenX + 15, this.y - this.h + 15, 45, 18, 2);
    }
}

// Attic Wooden Beam
class WoodenBeam extends LevelObject {
    constructor(x) {
        super(x, height, 36, height, '#451a03');
    }
    draw() {
        let screenX = this.x - scrollX;
        fill(69, 26, 3);
        rect(screenX, 0, this.w, this.h);
        // Steel bracket plate with bolts
        fill(100, 116, 139);
        rect(screenX - 4, height * 0.45, this.w + 8, 40, 2);
        fill(15, 23, 42);
        ellipse(screenX + 6, height * 0.45 + 10, 5, 5);
        ellipse(screenX + this.w - 6, height * 0.45 + 10, 5, 5);
        ellipse(screenX + 6, height * 0.45 + 30, 5, 5);
        ellipse(screenX + this.w - 6, height * 0.45 + 30, 5, 5);
    }
}

// Attic Cobweb
class Cobweb extends BackgroundObject {
    constructor(x) {
        const size = random(90, 140);
        const y = random([0, height - size]);
        super(x, y, size, size, 'rgba(255, 255, 255, 0.45)');
    }
    draw() {
        let screenX = this.x - scrollX;
        stroke(255, 255, 255, 120);
        strokeWeight(1);
        noFill();
        for (let i = 0; i <= 5; i++) {
            let angle = (PI / 2) / 5 * i;
            line(screenX, this.y, screenX + cos(angle) * this.w, this.y + sin(angle) * this.h);
        }
        for (let r = 0.25; r < 1; r += 0.25) {
            arc(screenX, this.y, this.w * 2 * r, this.h * 2 * r, 0, PI / 2);
        }
        noStroke();
    }
}

// Bathroom Bathtub
class BathTub extends LevelObject {
    constructor(x, y, w, h) { super(x, y, w, h, '#f8fafc'); }
    draw() {
        // Enamel porcelain tub
        fill(248, 250, 252);
        stroke(203, 213, 225);
        strokeWeight(4);
        rect(this.x, this.y, this.w, -this.h, 16);
        // Antique brass claw feet
        noStroke();
        fill(234, 179, 8);
        ellipse(this.x + 35, this.y + 4, 28, 18);
        ellipse(this.x + this.w - 35, this.y + 4, 28, 18);
        // Water ripples
        fill(186, 230, 253, 160);
        ellipse(this.x + this.w / 2, this.y - this.h + 25, this.w - 40, 24);
    }
}

// Bathroom Toilet
class Toilet extends LevelObject {
    constructor(x, y, w, h) { super(x, y, w, h, '#ffffff'); }
    draw() {
        // Bowl base
        fill(255);
        stroke(226, 232, 240);
        strokeWeight(3);
        rect(this.x + 10, this.y - this.h * 0.6, this.w - 20, this.h * 0.6, 6);
        // Tank
        rect(this.x, this.y - this.h, this.w, this.h * 0.44, 4);
        // Chrome flush lever
        fill(148, 163, 184);
        rect(this.x + 8, this.y - this.h + 10, 16, 5, 2);
        noStroke();
    }
}

// Bathroom Sink
class BathroomSink extends LevelObject {
    constructor(x, y, w, h) { super(x, y, w, h, '#f1f5f9'); }
    draw() {
        // Pedestal
        fill(226, 232, 240);
        rect(this.x + this.w / 2 - 18, this.y, 36, -this.h, 4);
        // Basin
        fill(255);
        stroke(203, 213, 225);
        strokeWeight(3);
        rect(this.x, this.y - this.h - 45, this.w, 45, 8);
        noStroke();
        // Gooseneck Chrome Faucet
        stroke(148, 163, 184);
        strokeWeight(5);
        noFill();
        arc(this.x + this.w / 2, this.y - this.h - 45, 30, 35, PI, TWO_PI);
        noStroke();
    }
}

// Bathroom Mirror
class BathroomMirror extends BackgroundObject {
    constructor(x, y, w, h) { super(x, y, w, h, '#38bdf8'); }
    draw() {
        // Ornate gilt frame
        fill(234, 179, 8);
        rect(this.x, this.y, this.w, this.h, 6);
        // Mirror glass
        fill(224, 242, 254);
        rect(this.x + 8, this.y + 8, this.w - 16, this.h - 16, 4);
        // Diagonal glass reflection sheen
        fill(255, 255, 255, 140);
        quad(this.x + 18, this.y + 8, this.x + 40, this.y + 8, this.x + 18, this.y + this.h - 8, this.x - 4, this.y + this.h - 8);
    }
}

// Hall Grandfather Clock
class GrandfatherClock extends LevelObject {
    constructor(x, y) { super(x, y, 85, 310, '#451a03'); }
    draw() {
        let screenX = this.x - scrollX;
        let clockY = this.y - this.h;
        // Wood cabinet
        fill(69, 26, 3);
        rect(screenX, clockY, this.w, this.h, 4);
        // Bonnet top
        fill(120, 53, 15);
        arc(screenX + this.w / 2, clockY, this.w, 35, PI, TWO_PI, CHORD);
        // Clock face
        fill(254, 249, 195);
        stroke(234, 179, 8);
        strokeWeight(3);
        ellipse(screenX + this.w / 2, clockY + 65, 62, 62);
        // Clock hands
        stroke(15, 23, 42);
        strokeWeight(2);
        let handAngle = frameCounter * 0.03;
        line(screenX + this.w / 2, clockY + 65, screenX + this.w / 2 + cos(handAngle) * 22, clockY + 65 + sin(handAngle) * 22);
        line(screenX + this.w / 2, clockY + 65, screenX + this.w / 2, clockY + 50);
        noStroke();
        // Glass pendulum window
        fill(30, 41, 59, 140);
        rect(screenX + 12, clockY + 120, this.w - 24, 120, 3);
        // Swinging Brass Pendulum
        let swing = sin(frameCounter * 0.05) * 20;
        stroke(234, 179, 8);
        strokeWeight(3);
        line(screenX + this.w / 2, clockY + 125, screenX + this.w / 2 + swing, clockY + 215);
        noStroke();
        fill(250, 204, 21);
        ellipse(screenX + this.w / 2 + swing, clockY + 215, 24, 24);
    }
}

// Hall Painting
class Painting extends BackgroundObject {
    constructor(x, y) {
        super(x, y, random(120, 180), random(85, 140), '#78350f');
    }
    draw() {
        let screenX = this.x - scrollX;
        // Heavy gold frame
        fill(234, 179, 8);
        rect(screenX, this.y, this.w, this.h, 4);
        // Canvas landscape
        fill(14, 165, 233);
        rect(screenX + 8, this.y + 8, this.w - 16, this.h - 16);
        // Landscape sunset & mountain
        fill(244, 63, 94);
        ellipse(screenX + this.w / 2, this.y + this.h * 0.55, 30, 30);
        fill(74, 222, 128);
        triangle(screenX + 8, this.y + this.h - 8, screenX + this.w / 2, this.y + this.h * 0.45, screenX + this.w - 8, this.y + this.h - 8);
    }
}

// Kitchen Countertop
class Countertop extends LevelObject {
    constructor(x, y, w) { super(x, y, w, 155, '#f1f5f9'); }
    draw() {
        let screenX = this.x - scrollX;
        // Wooden lower shaker cabinets
        fill(180, 83, 9);
        rect(screenX, this.y - this.h, this.w, this.h, 2);
        // Cabinet doors
        fill(146, 64, 14);
        rect(screenX + 8, this.y - this.h + 28, this.w / 2 - 12, this.h - 36, 2);
        rect(screenX + this.w / 2 + 4, this.y - this.h + 28, this.w / 2 - 12, this.h - 36, 2);
        // Polished Granite counter slab with bevel
        fill(226, 232, 240);
        rect(screenX - 4, this.y - this.h - 18, this.w + 8, 20, 3);
        fill(255);
        rect(screenX - 4, this.y - this.h - 18, this.w + 8, 4, 1);
    }
}

// Kitchen Upper Cabinet
class UpperCabinet extends BackgroundObject {
    constructor(x) {
        super(x, 40, random(160, 280), 105, '#f59e0b');
    }
    draw() {
        let screenX = this.x - scrollX;
        fill(180, 83, 9);
        rect(screenX, this.y, this.w, this.h, 3);
        // Glass cabinet inserts
        fill(219, 234, 254, 180);
        rect(screenX + 10, this.y + 12, this.w / 2 - 15, this.h - 24, 2);
        rect(screenX + this.w / 2 + 5, this.y + 12, this.w / 2 - 15, this.h - 24, 2);
        // Under-cabinet warm task light
        noStroke();
        fill(254, 240, 138, 50);
        triangle(screenX + 15, this.y + this.h, screenX + this.w - 15, this.y + this.h, screenX + this.w / 2, this.y + this.h + 40);
    }
}

// ----- LEVEL CONFIGURATIONS MAP WITH STRUCTURED PACING -----
let levelStepIndices = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

const levelConfigs = {
    1: {
        name: "Outdoors",
        isScrolling: true,
        spawnStep: (worldX) => {
            let step = levelStepIndices[1] % 4;
            levelStepIndices[1]++;
            let groundY = height - 50;

            if (step === 0) {
                // Suburban House
                const house = new House(worldX, groundY);
                backgroundObjects.push(house);
                return house.w + 360; // Clean clearance after house
            } else if (step === 1) {
                // Front Yard with Tree & Fire Hydrant
                backgroundObjects.push(new Tree(worldX, groundY));
                backgroundObjects.push(new FireHydrant(worldX + 180, groundY));
                return 360;
            } else if (step === 2) {
                // Sidewalk with Streetlight
                backgroundObjects.push(new Streetlight(worldX + 40, groundY));
                return 340;
            } else {
                // Street Gutter with Sewer Drain
                backgroundObjects.push(new SewerDrain(worldX + 20, height - 44));
                return 380;
            }
        },
        spawnExit: (worldX) => {
            let toBed = random(1) < 0.55;
            if (toBed) {
                // Open bedroom window on house
                let house = new House(worldX, height - 50);
                backgroundObjects.push(house);
                exits.push(new Exit(house.x + house.w - 85, house.y + 50, 55, 55, 2, "Window"));
            } else {
                // Drain to Sewer
                let drain = new SewerDrain(worldX, height - 44);
                backgroundObjects.push(drain);
                exits.push(new Exit(drain.x, drain.y, drain.w, drain.h, 3, "Sewer Drain"));
            }
        },
        spawnEnemy: (worldX) => {
            const allowed = settings.levels[1].enemies;
            const spawnY = height - 50;
            if (allowed.bird && random(1) < 0.4) {
                enemies.push(new Bird(worldX, random(80, height - 200)));
            } else if (allowed.dog && random(1) < 0.6) {
                enemies.push(new Dog(worldX, spawnY));
            } else if (allowed.rat) {
                enemies.push(new Rat(worldX, spawnY));
            }
        },
        spawnFood: (worldX) => {
            foods.push(new Food(worldX, random(120, height - 160)));
        }
    },
    2: {
        name: "Upstairs Bedroom",
        isScrolling: true,
        spawnStep: (worldX) => {
            let step = levelStepIndices[2] % 5;
            levelStepIndices[2]++;

            if (step === 0) {
                // Dresser with food on top
                const dresser = new Dresser(worldX, height);
                levelObjects.push(dresser);
                foods.push(new Food(dresser.x + dresser.w / 2, dresser.y - dresser.h - 22));
                return dresser.w + 340;
            } else if (step === 1) {
                // Bed
                const bed = new Bed(worldX, height);
                levelObjects.push(bed);
                return bed.w + 350;
            } else if (step === 2) {
                // Desk with PC
                const desk = new DeskWithPC(worldX, height);
                levelObjects.push(desk);
                return desk.w + 340;
            } else if (step === 3) {
                // Hamper & Lamp in corner
                const hamper = new Hamper(worldX, height);
                const lamp = new Lamp(worldX + hamper.w + 40, height);
                levelObjects.push(hamper);
                levelObjects.push(lamp);
                return hamper.w + lamp.w + 360;
            } else {
                // Bedroom Window backdrop
                backgroundObjects.push(new BackgroundObject(worldX, height - 320, 110, 160, '#fef08a'));
                return 320;
            }
        },
        spawnExit: (worldX) => {
            let r = random(1);
            if (r < 0.35) {
                // Ceiling Attic hatch
                exits.push(new Exit(worldX, 0, 130, 45, 4, "Attic"));
            } else if (r < 0.70) {
                // Bedroom Door to Bathroom
                exits.push(new Exit(worldX, height - 200, 70, 160, 5, "Door"));
            } else {
                // Hallway passage
                exits.push(new Exit(worldX, height - 50, 160, 45, 6, "Hall"));
            }
        },
        spawnEnemy: (worldX) => {
            const allowed = settings.levels[2].enemies;
            if (allowed.human && random(1) < 0.45) {
                enemies.push(new Human(worldX, height - 130));
            } else if (allowed.child && random(1) < 0.6) {
                enemies.push(new Child(worldX, height - 85));
            } else if (allowed.rat) {
                enemies.push(new Rat(worldX, height - 35));
            }
        },
        spawnFood: (worldX) => {
            foods.push(new Food(worldX, random(140, height - 150)));
        }
    },
    3: {
        name: "The Sewer",
        isScrolling: true,
        spawnStep: (worldX) => {
            let step = levelStepIndices[3] % 2;
            levelStepIndices[3]++;

            // Generous overhead pipe obstacle that leaves clear space above or below
            let pipeY = step === 0 ? 110 : height - 170;
            levelObjects.push(new LevelObject(worldX, pipeY, 260, 45, '#475569'));
            backgroundObjects.push(new BackgroundPipe(worldX + 80));

            return 440; // 440px between pipes
        },
        spawnExit: (worldX) => {
            // Manhole ladder leading up to Outdoors
            exits.push(new Exit(worldX, 0, 120, 85, 1, "Manhole"));
        },
        spawnEnemy: (worldX) => {
            const allowed = settings.levels[3].enemies;
            if (allowed.dog && random(1) < 0.35) {
                enemies.push(new Dog(worldX, height - 50));
            } else if (allowed.rat) {
                enemies.push(new Rat(worldX, height - 50));
            }
        },
        spawnFood: (worldX) => {
            foods.push(new Food(worldX, random(100, height - 170)));
        }
    },
    4: {
        name: "The Attic",
        isScrolling: true,
        spawnStep: (worldX) => {
            let step = levelStepIndices[4] % 3;
            levelStepIndices[4]++;

            if (step === 0) {
                // Cardboard box stack
                const box = new AtticBox(worldX, height);
                levelObjects.push(box);
                return box.w + 380;
            } else if (step === 1) {
                // Wooden support beam with space to fly around
                const beam = new WoodenBeam(worldX);
                levelObjects.push(beam);
                return beam.w + 400;
            } else {
                // Dusty cobweb in corner
                backgroundObjects.push(new Cobweb(worldX));
                return 360;
            }
        },
        spawnExit: (worldX) => {
            let toOutdoors = random(1) < 0.5;
            if (toOutdoors) {
                exits.push(new Exit(worldX, 0, 130, 45, 1, "Vent"));
            } else {
                exits.push(new Exit(worldX, random(height / 2, height - 90), 45, 90, 7, "Pipe"));
            }
        },
        spawnEnemy: (worldX) => {
            const allowed = settings.levels[4].enemies;
            if (allowed.bird && random(1) < 0.5) {
                enemies.push(new Bird(worldX, random(80, height - 180)));
            } else if (allowed.rat) {
                enemies.push(new Rat(worldX, height - 35));
            }
        },
        spawnFood: (worldX) => {
            foods.push(new Food(worldX, random(100, height - 160)));
        }
    },
    5: {
        name: "The Bathroom",
        isScrolling: false,
        setup: () => {
            const sink = new BathroomSink(110, height - 140, 150, 140);
            levelObjects.push(new BathTub(width - 340, height, 290, 230));
            levelObjects.push(new Toilet(width / 2 - 50, height, 100, 110));
            levelObjects.push(sink);
            backgroundObjects.push(new BathroomMirror(135, 110, 100, 140));

            enemies.push(new Child(width - 160, height - 85));
            // Drain exit down to The Sewer (Level 3)
            exits.push(new Exit(sink.x + 50, sink.y - sink.h - 30, 50, 24, 3, "Drain"));
        }
    },
    6: {
        name: "The Hall",
        isScrolling: true,
        spawnStep: (worldX) => {
            let step = levelStepIndices[6] % 2;
            levelStepIndices[6]++;

            if (step === 0) {
                // Grandfather clock
                const clock = new GrandfatherClock(worldX, height);
                levelObjects.push(clock);
                return clock.w + 420;
            } else {
                // Framed painting on wall
                backgroundObjects.push(new Painting(worldX, 130));
                return 380;
            }
        },
        spawnExit: (worldX) => {
            let r = random(1);
            if (r < 0.4) {
                exits.push(new Exit(worldX, height - 45, 160, 45, 7, "Stairs"));
            } else if (r < 0.7) {
                exits.push(new Exit(worldX, 180, 60, 60, 1, "Window"));
            } else {
                exits.push(new Exit(worldX, 0, 130, 45, 4, "Attic"));
            }
        },
        spawnEnemy: (worldX) => {
            const allowed = settings.levels[6].enemies;
            if (allowed.human && random(1) < 0.4) {
                enemies.push(new Human(worldX, height - 130));
            } else if (allowed.dog && random(1) < 0.6) {
                enemies.push(new Dog(worldX, height - 40));
            } else if (allowed.rat) {
                enemies.push(new Rat(worldX, height - 40));
            }
        },
        spawnFood: (worldX) => {
            foods.push(new Food(worldX, random(120, height - 150)));
        }
    },
    7: {
        name: "The Kitchen",
        isScrolling: true,
        spawnStep: (worldX) => {
            let step = levelStepIndices[7] % 2;
            levelStepIndices[7]++;

            const counterW = 280;
            const counter = new Countertop(worldX, height, counterW);
            levelObjects.push(counter);
            backgroundObjects.push(new UpperCabinet(worldX + 20));

            // Food crumb on counter
            if (step === 0) {
                foods.push(new Food(counter.x + counterW / 2, counter.y - counter.h - 35));
            }
            return counterW + 360;
        },
        spawnExit: (worldX) => {
            let toOutdoors = random(1) < 0.5;
            if (toOutdoors) {
                exits.push(new Exit(worldX, 190, 60, 60, 1, "Window"));
            } else {
                const counter = new Countertop(worldX, height, 280);
                levelObjects.push(counter);
                exits.push(new Exit(counter.x + 115, counter.y - counter.h - 18, 50, 18, 3, "Sink"));
            }
        },
        spawnEnemy: (worldX) => {
            const allowed = settings.levels[7].enemies;
            if (allowed.child && random(1) < 0.4) {
                enemies.push(new Child(worldX, height - 85));
            } else if (allowed.human && random(1) < 0.6) {
                enemies.push(new Human(worldX, height - 130));
            } else if (allowed.dog && random(1) < 0.8) {
                enemies.push(new Dog(worldX, height - 40));
            } else if (allowed.rat) {
                enemies.push(new Rat(worldX, height - 40));
            }
        },
        spawnFood: (worldX) => {
            foods.push(new Food(worldX, random(100, height - 160)));
        }
    }
};
`,kt=`
// ----- MAIN LOOP & COLLISION DISPATCH -----
function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont('sans-serif');
    initAmbientParticles();
    resetGame();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    frameCounter++;

    switch (gameState) {
        case 'MENU':
            drawMenu();
            break;
        case 'SETTINGS':
            drawSettings();
            break;
        case 'PLAYING':
            gameLoop();
            break;
        case 'TRANSITION':
            updateAndDrawTransition();
            break;
        case 'GAME_OVER':
            drawGameOver();
            break;
    }
}

let survivalSeconds = 0;

function resetGame() {
    fly = new Fly();
    score = 0;
    survivalSeconds = 0;
    changeLevel(1, true);
}

function startGame() {
    resetGame();
    gameState = 'PLAYING';
    triggerArrivalBanner(1);
}

function gameOver() {
    gameState = 'GAME_OVER';
}

let layoutState = {
    nextGroundX: 0,
    nextExitX: 0,
    nextEnemyX: 0,
    nextFoodX: 0
};

function resetLayoutState() {
    let startX = width + 100;
    layoutState = {
        nextGroundX: startX,
        nextExitX: startX + 1300,  // First exit milestone after exploring ~1300px
        nextEnemyX: startX + 550,  // First enemy milestone after ~550px
        nextFoodX: startX + 280    // First food milestone after ~280px
    };
    if (typeof levelStepIndices !== 'undefined') {
        levelStepIndices = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    }
}

function changeLevel(level, isFirstLoad = false) {
    currentLevel = level;
    scrollX = 0;
    poops = [];
    enemies = [];
    foods = [];
    levelObjects = [];
    backgroundObjects = [];
    exits = [];
    particles = [];
    scorePopups = [];
    enemyProjectiles = [];
    resetLayoutState();

    if (!isFirstLoad) {
        levelHistory.push(level);
    } else {
        levelHistory = [1];
    }

    const config = levelConfigs[currentLevel];
    if (config && config.setup) {
        config.setup();
    }
}

// ----- CORE GAMEPLAY LOOP -----
function gameLoop() {
    const config = levelConfigs[currentLevel];

    // Scroll game world
    if (config.isScrolling) {
        scrollX += settings.scrollSpeed;
    }

    // Player Input (handles mouse or keyboard)
    handlePlayerInput();

    // Survival Score: +10 score per second survived
    if (frameCounter % 60 === 0) {
        survivalSeconds++;
        score += 10;
        scorePopups.push(new ScorePopup(fly.x, fly.y - 25, "+10 SURVIVAL", "#38bdf8"));
    }

    // Update Game Entities
    fly.update();
    poops.forEach(p => p.update());
    enemies.forEach(e => e.update(fly));
    foods.forEach(f => f.update());
    exits.forEach(ex => ex.update());
    enemyProjectiles.forEach(ep => ep.update());

    // Update Particle System
    particles.forEach(p => p.update());
    particles = particles.filter(p => !p.isDead());

    scorePopups.forEach(sp => sp.update());
    scorePopups = scorePopups.filter(sp => !sp.isDead());

    // Procedural generation with structured spacing
    if (config.isScrolling) {
        generateLevelContent();
    }

    // Collision Detection
    checkCollisions();

    // Cleanup offscreen objects (fixed coordinate checks)
    poops = poops.filter(p => p.isOnScreen());
    enemies = enemies.filter(e => e.isOnScreen());
    foods = foods.filter(f => f.isOnScreen());
    enemyProjectiles = enemyProjectiles.filter(ep => ep.isOnScreen() && !ep.isDead());
    if (config.isScrolling) {
        levelObjects = levelObjects.filter(o => o.x - scrollX + o.w > -100);
        backgroundObjects = backgroundObjects.filter(o => o.x - scrollX + o.w > -150);
        exits = exits.filter(ex => ex.x - scrollX + ex.w > -100);
    }

    // DRAWING PIPELINE
    drawBackground();
    backgroundObjects.forEach(o => o.draw());
    levelObjects.forEach(o => o.draw());
    foods.forEach(f => f.draw());
    exits.forEach(ex => ex.draw());
    enemyProjectiles.forEach(ep => ep.draw());
    enemies.forEach(e => e.draw());
    poops.forEach(p => p.draw());
    fly.draw();

    // Particles & Popups
    particles.forEach(p => p.draw());
    scorePopups.forEach(sp => sp.draw());

    // Arrival Notification Banner
    drawArrivalBanner();

    // HUD / UI
    drawUI();

    // Energy drain: 1% per ~1.5s
    fly.energy -= 0.012;
    if (fly.energy <= 0) {
        gameOver();
    }
}

// ----- STRUCTURED PACING & LAYOUT SYSTEM -----
function generateLevelContent() {
    const config = levelConfigs[currentLevel];
    if (!config || !config.isScrolling) return;

    const worldX = width + scrollX;

    // 1. Orderly Ground Obstacles & Scenery (no overlap, generous clearance!)
    if (config.spawnStep && worldX >= layoutState.nextGroundX) {
        let clearance = config.spawnStep(worldX);
        layoutState.nextGroundX = worldX + (clearance || 380);
    }

    // 2. Exits (At most ONE on screen, spaced 1400-1900px apart!)
    if (config.spawnExit && worldX >= layoutState.nextExitX) {
        if (exits.length === 0) {
            config.spawnExit(worldX);
            layoutState.nextExitX = worldX + random(1400, 1900);
        }
    }

    // 3. Enemies (At most 2 active on screen, spaced 750-1100px apart!)
    let activeEnemies = enemies.filter(e => !e.isDefeated);
    if (config.spawnEnemy && worldX >= layoutState.nextEnemyX) {
        if (activeEnemies.length < 2) {
            config.spawnEnemy(worldX);
            layoutState.nextEnemyX = worldX + random(750, 1100);
        } else {
            layoutState.nextEnemyX = worldX + 300;
        }
    }

    // 4. Food (Paced every 700-950px, guides flight path)
    if (config.spawnFood && worldX >= layoutState.nextFoodX) {
        config.spawnFood(worldX);
        layoutState.nextFoodX = worldX + random(700, 950);
    }
}

// ----- COLLISION DETECTION -----
function checkCollisions() {
    // Fly vs Food
    for (let i = foods.length - 1; i >= 0; i--) {
        if (fly.collides(foods[i])) {
            fly.eat(foods[i].energyValue, foods[i].displayName);
            foods.splice(i, 1);
        }
    }

    // Fly vs Enemies
    for (const enemy of enemies) {
        if (!fly.isInvincible && !enemy.isDefeated && fly.collides(enemy)) {
            fly.takeDamage(enemy.damage);
        }
    }

    // Fly vs Enemy Projectiles (Sonic barks, paper balls)
    for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
        let ep = enemyProjectiles[i];
        if (!fly.isInvincible && dist(fly.x, fly.y, ep.getScreenX(), ep.y) < (fly.size / 2 + ep.size / 2)) {
            fly.takeDamage(ep.damage);
            enemyProjectiles.splice(i, 1);
        }
    }

    // Fly vs Barriers
    for (const obj of levelObjects) {
        fly.handleBarrierCollision(obj);
    }

    // Fly vs Exits (Triggers dynamic narrative transitions!)
    for (const exit of exits) {
        if (fly.collides(exit)) {
            startTransition(exit);
            return;
        }
    }

    // Poop vs Enemies
    for (let i = poops.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (poops[i] && enemies[j] && !enemies[j].isDefeated && poops[i].collides(enemies[j])) {
                enemies[j].takeHit();
                poops.splice(i, 1);
                break;
            }
        }
    }
}

// ----- PLAYER INPUT (MOUSE + KEYBOARD) -----
function handlePlayerInput() {
    if (controlScheme === 'MOUSE') {
        if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
            fly.moveTo(mouseX, mouseY);
        } else {
            fly.applyGravity();
        }
    } else { // 'KEYBOARD'
        let keyMoved = false;
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) { fly.move(0, -1); keyMoved = true; } // Up or W
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { fly.move(0, 1); keyMoved = true; } // Down or S
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { fly.move(-1, 0); keyMoved = true; } // Left or A
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { fly.move(1, 0); keyMoved = true; } // Right or D

        fly.applyGravity();
    }
}

function keyPressed() {
    if (keyCode === 32) { // SPACE
        if (gameState === 'PLAYING') {
            fly.poop();
        } else if (gameState === 'TRANSITION' && activeTransition) {
            // Fast skip transition
            activeTransition.timer = activeTransition.duration - 2;
        }
    }
}

function mousePressed() {
    if (gameState === 'MENU') {
        handleMenuClick();
    } else if (gameState === 'PLAYING') {
        fly.poop();
    } else if (gameState === 'TRANSITION' && activeTransition) {
        activeTransition.timer = activeTransition.duration - 2;
    } else if (gameState === 'SETTINGS') {
        handleSettingsClick();
    } else if (gameState === 'GAME_OVER') {
        handleGameOverClick();
    }
}

// ----- MODERN HUD DRAWING -----
function drawUI() {
    push();

    // 1. Sleek Energy Meter Bar
    let barX = 20;
    let barY = 20;
    let barW = 220;
    let barH = 22;

    // Outer capsule frame
    fill(15, 23, 42, 220);
    stroke(71, 85, 105);
    strokeWeight(1.5);
    rect(barX, barY, barW, barH, 11);

    // Energy fill color with dynamic warning
    let energyPct = constrain(fly.energy / 100, 0, 1);
    let barColor = fly.energy > 50 ? color(34, 197, 94) :
                   fly.energy > 25 ? color(234, 179, 8) :
                   (frameCounter % 16 < 8 ? color(239, 68, 68) : color(185, 28, 28));

    noStroke();
    fill(barColor);
    if (energyPct > 0) {
        rect(barX + 2, barY + 2, (barW - 4) * energyPct, barH - 4, 9);
    }

    // Glass reflection bar
    fill(255, 255, 255, 70);
    rect(barX + 4, barY + 3, (barW - 8) * energyPct, 5, 2);

    // Energy text label
    fill(255);
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text(\`ENERGY: \${Math.ceil(fly.energy)}%\`, barX + 12, barY + barH / 2);

    // 2. Center Location Badge
    let locName = levelConfigs[currentLevel] ? levelConfigs[currentLevel].name : 'ZONE';
    let locW = 200;
    let locX = width / 2 - locW / 2;
    fill(15, 23, 42, 210);
    stroke(100, 116, 139, 150);
    strokeWeight(1);
    rect(locX, barY - 2, locW, 26, 6);

    noStroke();
    fill(250, 204, 21);
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(\`📍 \${locName.toUpperCase()}\`, width / 2, barY + 11);

    // 3. Scoreboard (Top Right) with Survival Timer
    fill(15, 23, 42, 210);
    stroke(100, 116, 139, 150);
    strokeWeight(1);
    rect(width - 230, barY - 2, 210, 26, 6);

    noStroke();
    fill(255);
    textAlign(RIGHT, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(\`SCORE: \${score}   ⏱ \${survivalSeconds}s\`, width - 30, barY + 11);

    // 4. Subtle Controls Hint (Bottom Left)
    fill(255, 255, 255, 140);
    textSize(11);
    textStyle(NORMAL);
    textAlign(LEFT, BOTTOM);
    let hudTip = controlScheme === 'MOUSE'
        ? "CONTROL: [MOUSE] Move cursor to fly  •  Click or Space: Poop (+10 pts/sec)"
        : "CONTROL: [KEYBOARD] WASD / Arrows to fly  •  Spacebar: Poop (+10 pts/sec)";
    text(hudTip, 20, height - 12);

    pop();
}

// ----- MENU SCREEN -----
function drawMenu() {
    drawBackground();

    // Dark glass card
    push();
    let cardW = min(520, width - 40);
    let cardH = 430;
    let cardX = width / 2 - cardW / 2;
    let cardY = height / 2 - cardH / 2;

    fill(15, 23, 42, 240);
    stroke(250, 204, 21, 180);
    strokeWeight(2);
    rect(cardX, cardY, cardW, cardH, 16);

    // Game Title with Shadow
    textAlign(CENTER, TOP);
    textSize(44);
    textStyle(BOLD);
    fill(250, 204, 21);
    text("POOP FLY", width / 2, cardY + 22);

    textSize(13);
    textStyle(NORMAL);
    fill(203, 213, 225);
    text("Survive, eat treats, splat enemies & explore connected rooms!", width / 2, cardY + 74);

    // Animated Fly Icon
    push();
    translate(width / 2, cardY + 112);
    scale(1.3);
    drawMenuFly();
    pop();

    // ----- CONTROLS CHECKBOX PICKER CONTAINER -----
    let ctrlBoxW = cardW - 50;
    let ctrlBoxH = 68;
    let ctrlBoxX = width / 2 - ctrlBoxW / 2;
    let ctrlBoxY = cardY + 144;

    fill(30, 41, 59, 190);
    stroke(71, 85, 105, 160);
    strokeWeight(1);
    rect(ctrlBoxX, ctrlBoxY, ctrlBoxW, ctrlBoxH, 10);

    noStroke();
    fill(203, 213, 225);
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text("CHOOSE CONTROLS (CLICK CHECKBOX TO SELECT):", width / 2, ctrlBoxY + 7);

    // Option 1: Mouse Checkbox
    let optW = (ctrlBoxW - 24) / 2;
    let opt1X = ctrlBoxX + 8;
    let opt1Y = ctrlBoxY + 26;
    let isMouse = (controlScheme === 'MOUSE');
    let isHoverOpt1 = (mouseX >= opt1X && mouseX <= opt1X + optW && mouseY >= opt1Y && mouseY <= opt1Y + 34);

    fill(isMouse ? color(34, 197, 94, 35) : (isHoverOpt1 ? color(51, 65, 85, 190) : color(15, 23, 42, 120)));
    stroke(isMouse ? color(34, 197, 94, 210) : (isHoverOpt1 ? color(148, 163, 184) : color(51, 65, 85, 160)));
    strokeWeight(isMouse ? 1.5 : 1);
    rect(opt1X, opt1Y, optW, 34, 6);

    let cb1X = opt1X + 10;
    let cb1Y = opt1Y + 7;
    let cbSz = 20;
    fill(isMouse ? '#22c55e' : '#0f172a');
    stroke(isMouse ? '#4ade80' : '#64748b');
    strokeWeight(1.5);
    rect(cb1X, cb1Y, cbSz, cbSz, 4);

    if (isMouse) {
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(14);
        textStyle(BOLD);
        text("✓", cb1X + cbSz / 2, cb1Y + cbSz / 2);
    }

    noStroke();
    fill(isMouse ? 255 : (isHoverOpt1 ? 230 : 190));
    textAlign(LEFT, CENTER);
    textSize(13);
    textStyle(isMouse ? BOLD : NORMAL);
    text("Mouse Control", cb1X + cbSz + 8, opt1Y + 17);

    // Option 2: Keyboard Checkbox
    let opt2X = ctrlBoxX + 16 + optW;
    let opt2Y = ctrlBoxY + 26;
    let isKeyboard = (controlScheme === 'KEYBOARD');
    let isHoverOpt2 = (mouseX >= opt2X && mouseX <= opt2X + optW && mouseY >= opt2Y && mouseY <= opt2Y + 34);

    fill(isKeyboard ? color(34, 197, 94, 35) : (isHoverOpt2 ? color(51, 65, 85, 190) : color(15, 23, 42, 120)));
    stroke(isKeyboard ? color(34, 197, 94, 210) : (isHoverOpt2 ? color(148, 163, 184) : color(51, 65, 85, 160)));
    strokeWeight(isKeyboard ? 1.5 : 1);
    rect(opt2X, opt2Y, optW, 34, 6);

    let cb2X = opt2X + 10;
    let cb2Y = opt2Y + 7;
    fill(isKeyboard ? '#22c55e' : '#0f172a');
    stroke(isKeyboard ? '#4ade80' : '#64748b');
    strokeWeight(1.5);
    rect(cb2X, cb2Y, cbSz, cbSz, 4);

    if (isKeyboard) {
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(14);
        textStyle(BOLD);
        text("✓", cb2X + cbSz / 2, cb2Y + cbSz / 2);
    }

    noStroke();
    fill(isKeyboard ? 255 : (isHoverOpt2 ? 230 : 190));
    textAlign(LEFT, CENTER);
    textSize(13);
    textStyle(isKeyboard ? BOLD : NORMAL);
    text("Keyboard (WASD)", cb2X + cbSz + 8, opt2Y + 17);

    // Start Button
    let btnW = 240;
    let btnH = 44;
    let startBtn = { x: width / 2 - btnW / 2, y: cardY + 228, w: btnW, h: btnH };
    let isHoverStart = (mouseX > startBtn.x && mouseX < startBtn.x + startBtn.w && mouseY > startBtn.y && mouseY < startBtn.y + startBtn.h);

    fill(isHoverStart ? '#22c55e' : '#16a34a');
    noStroke();
    rect(startBtn.x, startBtn.y, startBtn.w, startBtn.h, 10);
    fill(255);
    textSize(17);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("START FLYING", width / 2, startBtn.y + btnH / 2);

    // Settings Button
    let settingsBtn = { x: width / 2 - btnW / 2, y: cardY + 284, w: btnW, h: btnH };
    let isHoverSettings = (mouseX > settingsBtn.x && mouseX < settingsBtn.x + settingsBtn.w && mouseY > settingsBtn.y && mouseY < settingsBtn.y + settingsBtn.h);

    fill(isHoverSettings ? '#3b82f6' : '#2563eb');
    rect(settingsBtn.x, settingsBtn.y, settingsBtn.w, settingsBtn.h, 10);
    fill(255);
    text("LEVEL & ENEMY SETTINGS", width / 2, settingsBtn.y + btnH / 2);

    // Controls tip and survival hint
    fill(250, 204, 21);
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    if (controlScheme === 'MOUSE') {
        text("🎮 Move mouse cursor to steer  •  Click or Spacebar to Poop", width / 2, cardY + 344);
    } else {
        text("🎮 WASD or Arrow Keys to steer  •  Spacebar to Poop", width / 2, cardY + 344);
    }

    fill(148, 163, 184);
    textSize(12);
    textStyle(NORMAL);
    text("⏱ Survive for +10 score per second!", width / 2, cardY + 368);

    pop();
}

function handleMenuClick() {
    let cardW = min(520, width - 40);
    let cardH = 430;
    let cardX = width / 2 - cardW / 2;
    let cardY = height / 2 - cardH / 2;

    let ctrlBoxW = cardW - 50;
    let ctrlBoxX = width / 2 - ctrlBoxW / 2;
    let ctrlBoxY = cardY + 144;
    let optW = (ctrlBoxW - 24) / 2;

    let opt1X = ctrlBoxX + 8;
    let opt1Y = ctrlBoxY + 26;
    let opt2X = ctrlBoxX + 16 + optW;
    let opt2Y = ctrlBoxY + 26;

    // Checkbox 1: Mouse Control
    if (mouseX >= opt1X && mouseX <= opt1X + optW && mouseY >= opt1Y && mouseY <= opt1Y + 34) {
        controlScheme = 'MOUSE';
        return;
    }

    // Checkbox 2: Keyboard Control
    if (mouseX >= opt2X && mouseX <= opt2X + optW && mouseY >= opt2Y && mouseY <= opt2Y + 34) {
        controlScheme = 'KEYBOARD';
        return;
    }

    // Start Button
    let btnW = 240;
    let btnH = 44;
    let startBtn = { x: width / 2 - btnW / 2, y: cardY + 228, w: btnW, h: btnH };
    if (mouseX >= startBtn.x && mouseX <= startBtn.x + startBtn.w && mouseY >= startBtn.y && mouseY <= startBtn.y + startBtn.h) {
        startGame();
        return;
    }

    // Settings Button
    let settingsBtn = { x: width / 2 - btnW / 2, y: cardY + 284, w: btnW, h: btnH };
    if (mouseX >= settingsBtn.x && mouseX <= settingsBtn.x + settingsBtn.w && mouseY >= settingsBtn.y && mouseY <= settingsBtn.y + settingsBtn.h) {
        gameState = 'SETTINGS';
        return;
    }
}

function handleGameOverClick() {
    let cardH = 340;
    let cardY = height / 2 - cardH / 2;
    let btnW = 220;
    let btnH = 46;
    let restartBtn = { x: width / 2 - btnW / 2, y: cardY + 195, w: btnW, h: btnH };
    if (mouseX >= restartBtn.x && mouseX <= restartBtn.x + restartBtn.w && mouseY >= restartBtn.y && mouseY <= restartBtn.y + restartBtn.h) {
        startGame();
    }
}

function drawMenuFly() {
    noStroke();
    let sz = 24;
    // Body
    fill(0);
    ellipse(0, 0, sz, sz * 0.8);
    // Eyes
    fill(255, 0, 0);
    ellipse(-sz * 0.2, -sz * 0.2, sz * 0.3);
    ellipse(sz * 0.2, -sz * 0.2, sz * 0.3);
    // Wings
    fill(200, 200, 255, 150);
    ellipse(-sz * 0.6, 0, sz, sz * 0.5);
    ellipse(sz * 0.6, 0, sz, sz * 0.5);
}

// ----- SETTINGS SCREEN -----
function drawSettings() {
    drawBackground();

    push();
    let cardW = min(560, width - 40);
    let cardH = 460;
    let cardX = width / 2 - cardW / 2;
    let cardY = height / 2 - cardH / 2;

    fill(15, 23, 42, 240);
    stroke(59, 130, 246, 180);
    strokeWeight(2);
    rect(cardX, cardY, cardW, cardH, 16);

    // Title
    textAlign(CENTER, TOP);
    textSize(28);
    textStyle(BOLD);
    fill(255);
    text("LOCATION & ENEMY CONFIG", width / 2, cardY + 22);

    // Level selector
    let currentLevelName = levelConfigs[selectedLevelSettings] ? levelConfigs[selectedLevelSettings].name : 'Level';
    fill(250, 204, 21);
    textSize(18);
    text(\`Level \${selectedLevelSettings}: \${currentLevelName}\`, width / 2, cardY + 70);

    // Level arrows < >
    fill(59, 130, 246);
    rect(width / 2 - 180, cardY + 65, 34, 30, 6);
    rect(width / 2 + 146, cardY + 65, 34, 30, 6);
    fill(255);
    textAlign(CENTER, CENTER);
    text("<", width / 2 - 163, cardY + 80);
    text(">", width / 2 + 163, cardY + 80);

    // Toggles list
    const enemyTypes = ['rat', 'dog', 'bird', 'human', 'child'];
    const currentLvlSettings = settings.levels[selectedLevelSettings].enemies;

    let rowY = cardY + 125;
    textAlign(LEFT, CENTER);

    enemyTypes.forEach(type => {
        let isEnabled = currentLvlSettings[type];

        // Checkbox box
        fill(isEnabled ? '#22c55e' : '#ef4444');
        rect(width / 2 - 150, rowY, 26, 26, 5);

        // Check icon or X
        fill(255);
        textAlign(CENTER, CENTER);
        text(isEnabled ? "✓" : "✕", width / 2 - 137, rowY + 13);

        // Enemy Label
        textAlign(LEFT, CENTER);
        fill(241, 245, 249);
        textSize(15);
        textStyle(BOLD);
        text(type.toUpperCase() + (isEnabled ? "  (Active)" : "  (Disabled)"), width / 2 - 105, rowY + 13);

        rowY += 46;
    });

    // Back to Menu button
    let backBtn = { x: width / 2 - 90, y: cardY + cardH - 58, w: 180, h: 40 };
    let isHoverBack = (mouseX > backBtn.x && mouseX < backBtn.x + backBtn.w && mouseY > backBtn.y && mouseY < backBtn.y + backBtn.h);

    fill(isHoverBack ? '#475569' : '#334155');
    noStroke();
    rect(backBtn.x, backBtn.y, backBtn.w, backBtn.h, 8);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(15);
    textStyle(BOLD);
    text("DONE & BACK", width / 2, backBtn.y + 20);

    pop();
}

function handleSettingsClick() {
    let cardH = 460;
    let cardY = height / 2 - cardH / 2;

    // Back button click
    let backBtn = { x: width / 2 - 90, y: cardY + cardH - 58, w: 180, h: 40 };
    if (mouseX > backBtn.x && mouseX < backBtn.x + backBtn.w && mouseY > backBtn.y && mouseY < backBtn.y + backBtn.h) {
        gameState = 'MENU';
        return;
    }

    // Prev / Next Level Selector
    if (mouseY > cardY + 65 && mouseY < cardY + 95) {
        if (mouseX > width / 2 - 180 && mouseX < width / 2 - 146) {
            selectedLevelSettings = max(1, selectedLevelSettings - 1);
        }
        if (mouseX > width / 2 + 146 && mouseX < width / 2 + 180) {
            selectedLevelSettings = min(7, selectedLevelSettings + 1);
        }
    }

    // Enemy Toggles
    const enemyTypes = ['rat', 'dog', 'bird', 'human', 'child'];
    let rowY = cardY + 125;
    enemyTypes.forEach(type => {
        if (mouseX > width / 2 - 150 && mouseX < width / 2 - 100 && mouseY > rowY && mouseY < rowY + 30) {
            settings.levels[selectedLevelSettings].enemies[type] = !settings.levels[selectedLevelSettings].enemies[type];
        }
        rowY += 46;
    });
}

// ----- GAME OVER SCREEN -----
function drawGameOver() {
    // Dim background
    fill(0, 0, 0, 190);
    noStroke();
    rect(0, 0, width, height);

    push();
    let cardW = min(480, width - 40);
    let cardH = 340;
    let cardX = width / 2 - cardW / 2;
    let cardY = height / 2 - cardH / 2;

    fill(15, 23, 42, 240);
    stroke(239, 68, 68, 180);
    strokeWeight(2);
    rect(cardX, cardY, cardW, cardH, 16);

    // Title
    textAlign(CENTER, TOP);
    textSize(38);
    textStyle(BOLD);
    fill(239, 68, 68);
    text("SWATTED!", width / 2, cardY + 30);

    // Stats
    fill(241, 245, 249);
    textSize(24);
    textStyle(BOLD);
    text(\`Final Score: \${score}\`, width / 2, cardY + 95);

    fill(148, 163, 184);
    textSize(14);
    textStyle(NORMAL);
    let roomsVisited = new Set(levelHistory).size;
    text(\`Survived: \${survivalSeconds}s (+\${survivalSeconds * 10} pts)  •  Rooms: \${roomsVisited} of 7\`, width / 2, cardY + 135);

    // Restart Button
    let btnW = 220;
    let btnH = 46;
    let restartBtn = { x: width / 2 - btnW / 2, y: cardY + 195, w: btnW, h: btnH };
    let isHoverRestart = (mouseX > restartBtn.x && mouseX < restartBtn.x + restartBtn.w && mouseY > restartBtn.y && mouseY < restartBtn.y + restartBtn.h);

    fill(isHoverRestart ? '#22c55e' : '#16a34a');
    noStroke();
    rect(restartBtn.x, restartBtn.y, restartBtn.w, restartBtn.h, 10);

    fill(255);
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("FLY AGAIN", width / 2, restartBtn.y + btnH / 2);

    if (mouseIsPressed && isHoverRestart) {
        startGame();
    }

    pop();
}
`;/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */const Se=[wt,xt,bt,St,vt,kt].join(`

`);function Xt(r){r.innerHTML=`
    <div class="site-container">
      <!-- Top Navigation Header -->
      <header class="site-header">
        <div class="header-inner">
          <div class="brand">
            <span class="logo-emoji">🪰</span>
            <div class="brand-text">
              <span class="brand-title">POOP FLY</span>
              <span class="brand-badge">HURKE GAMES ARCADE</span>
            </div>
          </div>
          <nav class="header-nav">
            <a href="#play" class="nav-link">Play</a>
            <a href="#controls" class="nav-link">Controls</a>
            <a href="#locations" class="nav-link">Locations</a>
            <a href="#enemies" class="nav-link">Threats</a>
          </nav>
          <div class="header-actions">
            <button id="header-fullscreen-btn" class="btn-fullscreen-header" title="Enter Fullscreen">
              <span class="fs-icon">⛶</span> Fullscreen
            </button>
          </div>
        </div>
      </header>

      <!-- Main Arcade Content -->
      <main class="main-content">
        <section id="play" class="game-section">
          <div class="section-intro">
            <h1 class="game-heading">Survive. Feast. Splat.</h1>
            <p class="game-subheading">Fly through 7 dangerous rooms, dodge predators, snack on pastries, and drop tactical poop!</p>
          </div>

          <!-- Arcade Cabinet & Viewport -->
          <div id="game-wrapper" class="arcade-cabinet">
            <!-- Top Arcade Bezel -->
            <div class="cabinet-bezel-top">
              <div class="bezel-left">
                <span class="live-dot"></span>
                <span class="bezel-title">POOP FLY • PROCEDURAL SURVIVAL ARCADE</span>
              </div>
              <div class="bezel-actions">
                <button id="restart-btn" class="bezel-btn" title="Reload Game">
                  ⟳ Restart
                </button>
                <button id="fullscreen-btn" class="bezel-btn btn-primary" title="Toggle Fullscreen">
                  <span class="fs-icon">⛶</span> Fullscreen
                </button>
              </div>
            </div>

            <!-- Embedded Game Screen -->
            <div id="game-viewport" class="arcade-screen">
              <!-- Playground element is appended here -->
            </div>

            <!-- Bottom Arcade Bezel -->
            <div class="cabinet-bezel-bottom">
              <div class="bezel-hint">
                <span>💡 <strong>Menu Tip:</strong> Checkbox in start menu toggles between Mouse and Keyboard controls.</span>
              </div>
              <div class="bezel-shortcuts">
                <span>Click <strong>⛶ Fullscreen</strong> for the complete arcade cabinet view (Press <strong>Esc</strong> to exit)</span>
              </div>
            </div>
          </div>

          <!-- Quick Controls Feature Cards -->
          <div id="controls" class="controls-grid">
            <div class="control-card">
              <div class="card-icon">🖱️</div>
              <h3>Mouse Steering</h3>
              <p>Guide the fly seamlessly with your mouse cursor. Click the mouse button or tap <kbd>Space</kbd> to drop tactical poop.</p>
            </div>
            <div class="control-card">
              <div class="card-icon">⌨️</div>
              <h3>Keyboard Pilot</h3>
              <p>Pilot with <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or <kbd>Arrow</kbd> keys. Press <kbd>Space</kbd> to poop. Mouse pointer won't pull you off course!</p>
            </div>
            <div class="control-card">
              <div class="card-icon">⏱️</div>
              <h3>Survival Bonus</h3>
              <p>Earn <strong>+10 score</strong> for every second alive! Replenish stamina by eating snacks and cakes scattered across each room.</p>
            </div>
          </div>
        </section>

        <!-- 7 Connected Locations Section -->
        <section id="locations" class="content-section">
          <h2 class="section-title">Explore 7 Interconnected Locations</h2>
          <p class="section-desc">Fly into glowing exits—windows, pipes, trapdoors, and grates—to transition between distinct narrative rooms:</p>
          <div class="locations-grid">
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">1. Outdoors</span>
                <span class="location-tag">Sunny</span>
              </div>
              <p class="location-desc">Picket fences, flying dandelion seeds, soft grass, and roaming yard hounds.</p>
              <span class="location-exit">➔ Exit via Window or Sewer Drain</span>
            </div>
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">2. Upstairs Bedroom</span>
                <span class="location-tag">Interior</span>
              </div>
              <p class="location-desc">Cozy bedding, dresser snacks, hanging ceiling fans, and an alert human with a rolled newspaper.</p>
              <span class="location-exit">➔ Exit via Ceiling Attic Hatch</span>
            </div>
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">3. The Sewers</span>
                <span class="location-tag">Subterranean</span>
              </div>
              <p class="location-desc">Steam pipes, brick tunnels, dripping green ooze, and jumping sewer rats.</p>
              <span class="location-exit">➔ Exit via Drainage Pipe to Bathroom</span>
            </div>
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">4. Dusty Attic</span>
                <span class="location-tag">Heights</span>
              </div>
              <p class="location-desc">Wooden beams, stacked storage boxes, drifting dust motes, and rooftop ventilation.</p>
              <span class="location-exit">➔ Exit via Rooftop Exhaust Vent</span>
            </div>
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">5. Tile Bathroom</span>
                <span class="location-tag">Enclosed</span>
              </div>
              <p class="location-desc">Porcelain bathtub, medicine mirror, and a hyperactive child wielding a neon swatter!</p>
              <span class="location-exit">➔ Exit via Hallway Doorway</span>
            </div>
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">6. Grand Hall</span>
                <span class="location-tag">Corridor</span>
              </div>
              <p class="location-desc">Ornate grandfather clock, oil portraits, long runner rugs, and roaming guard dogs.</p>
              <span class="location-exit">➔ Exit via Swing Door to Kitchen</span>
            </div>
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">7. Gourmet Kitchen</span>
                <span class="location-tag">Feast Zone</span>
              </div>
              <p class="location-desc">Marble countertops loaded with frosted cakes, fruits, and sizzling stoves.</p>
              <span class="location-exit">➔ Exit via Open Kitchen Window</span>
            </div>
          </div>
        </section>

        <!-- Enemy Field Guide -->
        <section id="enemies" class="content-section">
          <h2 class="section-title">Predator Threat Matrix</h2>
          <p class="section-desc">Each enemy hunts the fly with distinct mobility and attack patterns. Drop defensive poop to disorient them!</p>
          <div class="enemies-grid">
            <div class="enemy-card">
              <div class="enemy-icon">🐀</div>
              <h4 class="enemy-name">Sewer Rat</h4>
              <div class="enemy-threat">Threat: Medium</div>
              <p class="enemy-behavior">High-agility leaper that scrambles across obstacles and launches aimed pounce attacks at the fly.</p>
            </div>
            <div class="enemy-card">
              <div class="enemy-icon">🐕</div>
              <h4 class="enemy-name">Hound Dog</h4>
              <div class="enemy-threat">Threat: High</div>
              <p class="enemy-behavior">Gallops swiftly on the ground, leaps at mid-altitude flies, and unleashes sonic bark shockwaves.</p>
            </div>
            <div class="enemy-card">
              <div class="enemy-icon">🐦</div>
              <h4 class="enemy-name">Urban Pigeon</h4>
              <div class="enemy-threat">Threat: Medium</div>
              <p class="enemy-behavior">Patrols the open airspace outdoors and inside the high attic rafters with swooping divebombs.</p>
            </div>
            <div class="enemy-card">
              <div class="enemy-icon">🧑</div>
              <h4 class="enemy-name">Angry Human</h4>
              <div class="enemy-threat">Threat: Very High</div>
              <p class="enemy-behavior">Tracks the fly, winds up explosive newspaper strikes, and tosses paper balls when you fly out of swat reach.</p>
            </div>
            <div class="enemy-card">
              <div class="enemy-icon">🧒</div>
              <h4 class="enemy-name">Hyper Child</h4>
              <div class="enemy-threat">Threat: Extreme</div>
              <p class="enemy-behavior">Frantic jumping swats with a wide-radius neon swatter. Fast reaction time—keep your distance!</p>
            </div>
          </div>
        </section>
      </main>

      <!-- Website Footer -->
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="footer-logo">POOP FLY</span>
            <span class="footer-copy">© 2026 Hurke Games • Procedural Canvas Game</span>
          </div>
          <div class="footer-links">
            <a href="https://hurke-games.github.io/Poopfly/" target="_blank">hurke-games.github.io/Poopfly</a>
            <button id="footer-fs-btn" class="footer-link-btn">⛶ Play Fullscreen</button>
          </div>
        </div>
      </footer>
    </div>
  `}function ve(){const r=document.querySelector("#root");if(!r)return;Xt(r);const e=document.getElementById("game-viewport");if(!e)return;const t=new se;e.appendChild(t),t.setCode(Se);const s=document.getElementById("game-wrapper"),i=document.getElementById("fullscreen-btn"),n=document.getElementById("header-fullscreen-btn"),l=document.getElementById("footer-fs-btn"),a=document.getElementById("restart-btn");function o(){s&&(!document.fullscreenElement&&!document.webkitFullscreenElement?s.requestFullscreen?s.requestFullscreen():s.webkitRequestFullscreen&&s.webkitRequestFullscreen():document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen&&document.webkitExitFullscreen())}function c(){const g=!!(document.fullscreenElement||document.webkitFullscreenElement);i&&(i.innerHTML=`<span class="fs-icon">${g?"🗗":"⛶"}</span> ${g?"Exit Fullscreen":"Fullscreen"}`),n&&(n.innerHTML=`<span class="fs-icon">${g?"🗗":"⛶"}</span> ${g?"Exit":"Fullscreen"}`),l&&(l.textContent=g?"🗗 Exit Fullscreen":"⛶ Play Fullscreen")}i&&i.addEventListener("click",o),n&&n.addEventListener("click",o),l&&l.addEventListener("click",o),document.addEventListener("fullscreenchange",c),document.addEventListener("webkitfullscreenchange",c),a&&a.addEventListener("click",()=>{t.setCode(Se)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ve):ve();
