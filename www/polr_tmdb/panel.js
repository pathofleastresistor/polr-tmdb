var je=Object.defineProperty;var Be=(r,e,t)=>e in r?je(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var ee=(r,e,t)=>(Be(r,typeof e!="symbol"?e+"":e,t),t);var V=globalThis,W=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,te=Symbol(),pe=new WeakMap,D=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(W&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=pe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&pe.set(t,e))}return e}toString(){return this.cssText}},ue=r=>new D(typeof r=="string"?r:r+"",void 0,te),se=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((s,i,a)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[a+1],r[0]);return new D(t,r,te)},_e=(r,e)=>{if(W)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),i=V.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},ie=W?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ue(t)})(r):r;var{is:Ve,defineProperty:We,getOwnPropertyDescriptor:Fe,getOwnPropertyNames:Qe,getOwnPropertySymbols:qe,getPrototypeOf:Ge}=Object,w=globalThis,ge=w.trustedTypes,Ke=ge?ge.emptyScript:"",Ye=w.reactiveElementPolyfillSupport,z=(r,e)=>r,re={toAttribute(r,e){switch(e){case Boolean:r=r?Ke:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},fe=(r,e)=>!Ve(r,e),me={attribute:!0,type:String,converter:re,reflect:!1,useDefault:!1,hasChanged:fe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);var b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=me){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&We(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){let{get:i,set:a}=Fe(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){let d=i?.call(this);a?.call(this,o),this.requestUpdate(e,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??me}static _$Ei(){if(this.hasOwnProperty(z("elementProperties")))return;let e=Ge(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(z("properties"))){let t=this.properties,s=[...Qe(t),...qe(t)];for(let i of s)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)t.unshift(ie(i))}else e!==void 0&&t.push(ie(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _e(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let a=(s.converter?.toAttribute!==void 0?s.converter:re).toAttribute(t,s.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let a=s.getPropertyOptions(i),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:re;this._$Em=i;let d=o.fromAttribute(t,a.type);this[i]=d??this._$Ej?.get(i)??d,this._$Em=null}}requestUpdate(e,t,s,i=!1,a){if(e!==void 0){let o=this.constructor;if(i===!1&&(a=this[e]),s??(s=o.getPropertyOptions(e)),!((s.hasChanged??fe)(a,t)||s.useDefault&&s.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:a},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),a!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,a]of s){let{wrapped:o}=a,d=this[i];o!==!0||this._$AL.has(i)||d===void 0||this.C(i,void 0,a,d)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[z("elementProperties")]=new Map,b[z("finalized")]=new Map,Ye?.({ReactiveElement:b}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push("2.1.2");var N=globalThis,ve=r=>r,F=N.trustedTypes,$e=F?F.createPolicy("lit-html",{createHTML:r=>r}):void 0,ae="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,ne="?"+y,Je=`<${ne}>`,C=document,H=()=>C.createComment(""),I=r=>r===null||typeof r!="object"&&typeof r!="function",le=Array.isArray,Se=r=>le(r)||typeof r?.[Symbol.iterator]=="function",oe=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,be=/-->/g,ye=/>/g,E=RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xe=/'/g,we=/"/g,Ee=/^(?:script|style|textarea|title)$/i,ce=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),c=ce(1),ct=ce(2),dt=ce(3),x=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Ae=new WeakMap,k=C.createTreeWalker(C,129);function ke(r,e){if(!le(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return $e!==void 0?$e.createHTML(e):e}var Ce=(r,e)=>{let t=r.length-1,s=[],i,a=e===2?"<svg>":e===3?"<math>":"",o=O;for(let d=0;d<t;d++){let n=r[d],u,g,l=-1,_=0;for(;_<n.length&&(o.lastIndex=_,g=o.exec(n),g!==null);)_=o.lastIndex,o===O?g[1]==="!--"?o=be:g[1]!==void 0?o=ye:g[2]!==void 0?(Ee.test(g[2])&&(i=RegExp("</"+g[2],"g")),o=E):g[3]!==void 0&&(o=E):o===E?g[0]===">"?(o=i??O,l=-1):g[1]===void 0?l=-2:(l=o.lastIndex-g[2].length,u=g[1],o=g[3]===void 0?E:g[3]==='"'?we:xe):o===we||o===xe?o=E:o===be||o===ye?o=O:(o=E,i=void 0);let p=o===E&&r[d+1].startsWith("/>")?" ":"";a+=o===O?n+Je:l>=0?(s.push(u),n.slice(0,l)+ae+n.slice(l)+y+p):n+y+(l===-2?d:p)}return[ke(r,a+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},L=class r{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let a=0,o=0,d=e.length-1,n=this.parts,[u,g]=Ce(e,t);if(this.el=r.createElement(u,s),k.currentNode=this.el.content,t===2||t===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=k.nextNode())!==null&&n.length<d;){if(i.nodeType===1){if(i.hasAttributes())for(let l of i.getAttributeNames())if(l.endsWith(ae)){let _=g[o++],p=i.getAttribute(l).split(y),f=/([.?@])?(.*)/.exec(_);n.push({type:1,index:a,name:f[2],strings:p,ctor:f[1]==="."?q:f[1]==="?"?G:f[1]==="@"?K:P}),i.removeAttribute(l)}else l.startsWith(y)&&(n.push({type:6,index:a}),i.removeAttribute(l));if(Ee.test(i.tagName)){let l=i.textContent.split(y),_=l.length-1;if(_>0){i.textContent=F?F.emptyScript:"";for(let p=0;p<_;p++)i.append(l[p],H()),k.nextNode(),n.push({type:2,index:++a});i.append(l[_],H())}}}else if(i.nodeType===8)if(i.data===ne)n.push({type:2,index:a});else{let l=-1;for(;(l=i.data.indexOf(y,l+1))!==-1;)n.push({type:7,index:a}),l+=y.length-1}a++}}static createElement(e,t){let s=C.createElement("template");return s.innerHTML=e,s}};function T(r,e,t=r,s){if(e===x)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl,a=I(e)?void 0:e._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=T(r,i._$AS(r,e.values),i,s)),e}var Q=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??C).importNode(t,!0);k.currentNode=i;let a=k.nextNode(),o=0,d=0,n=s[0];for(;n!==void 0;){if(o===n.index){let u;n.type===2?u=new M(a,a.nextSibling,this,e):n.type===1?u=new n.ctor(a,n.name,n.strings,this,e):n.type===6&&(u=new Y(a,this,e)),this._$AV.push(u),n=s[++d]}o!==n?.index&&(a=k.nextNode(),o++)}return k.currentNode=C,i}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},M=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=T(this,e,t),I(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Se(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(C.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=L.createElement(ke(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{let a=new Q(i,this),o=a.u(this.options);a.p(t),this.T(o),this._$AH=a}}_$AC(e){let t=Ae.get(e.strings);return t===void 0&&Ae.set(e.strings,t=new L(e)),t}k(e){le(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,i=0;for(let a of e)i===t.length?t.push(s=new r(this.O(H()),this.O(H()),this,this.options)):s=t[i],s._$AI(a),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=ve(e).nextSibling;ve(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,a){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,t=this,s,i){let a=this.strings,o=!1;if(a===void 0)e=T(this,e,t,0),o=!I(e)||e!==this._$AH&&e!==x,o&&(this._$AH=e);else{let d=e,n,u;for(e=a[0],n=0;n<a.length-1;n++)u=T(this,d[s+n],t,n),u===x&&(u=this._$AH[n]),o||(o=!I(u)||u!==this._$AH[n]),u===h?e=h:e!==h&&(e+=(u??"")+a[n+1]),this._$AH[n]=u}o&&!i&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},q=class extends P{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}},G=class extends P{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}},K=class extends P{constructor(e,t,s,i,a){super(e,t,s,i,a),this.type=5}_$AI(e,t=this){if((e=T(this,e,t,0)??h)===x)return;let s=this._$AH,i=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Y=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){T(this,e)}},Te={M:ae,P:y,A:ne,C:1,L:Ce,R:Q,D:Se,V:T,I:M,H:P,N:G,U:K,B:q,F:Y},Ze=N.litHtmlPolyfillSupport;Ze?.(L,M),(N.litHtmlVersions??(N.litHtmlVersions=[])).push("3.3.2");var Pe=(r,e,t)=>{let s=t?.renderBefore??e,i=s._$litPart$;if(i===void 0){let a=t?.renderBefore??null;s._$litPart$=i=new M(e.insertBefore(H(),a),a,void 0,t??{})}return i._$AI(r),i};var j=globalThis,A=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};A._$litElement$=!0,A.finalized=!0,j.litElementHydrateSupport?.({LitElement:A});var Xe=j.litElementPolyfillSupport;Xe?.({LitElement:A});(j.litElementVersions??(j.litElementVersions=[])).push("4.2.2");var Me={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Re=r=>(...e)=>({_$litDirective$:r,values:e}),J=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var{I:et}=Te,Ue=r=>r;var De=()=>document.createComment(""),R=(r,e,t)=>{let s=r._$AA.parentNode,i=e===void 0?r._$AB:e._$AA;if(t===void 0){let a=s.insertBefore(De(),i),o=s.insertBefore(De(),i);t=new et(a,o,r,r.options)}else{let a=t._$AB.nextSibling,o=t._$AM,d=o!==r;if(d){let n;t._$AQ?.(r),t._$AM=r,t._$AP!==void 0&&(n=r._$AU)!==o._$AU&&t._$AP(n)}if(a!==i||d){let n=t._$AA;for(;n!==a;){let u=Ue(n).nextSibling;Ue(s).insertBefore(n,i),n=u}}}return t},S=(r,e,t=r)=>(r._$AI(e,t),r),tt={},ze=(r,e=tt)=>r._$AH=e,Oe=r=>r._$AH,Z=r=>{r._$AR(),r._$AA.remove()};var Ne=(r,e,t)=>{let s=new Map;for(let i=e;i<=t;i++)s.set(r[i],i);return s},de=Re(class extends J{constructor(r){if(super(r),r.type!==Me.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);let i=[],a=[],o=0;for(let d of r)i[o]=s?s(d,o):o,a[o]=t(d,o),o++;return{values:a,keys:i}}render(r,e,t){return this.dt(r,e,t).values}update(r,[e,t,s]){let i=Oe(r),{values:a,keys:o}=this.dt(e,t,s);if(!Array.isArray(i))return this.ut=o,a;let d=this.ut??(this.ut=[]),n=[],u,g,l=0,_=i.length-1,p=0,f=a.length-1;for(;l<=_&&p<=f;)if(i[l]===null)l++;else if(i[_]===null)_--;else if(d[l]===o[p])n[p]=S(i[l],a[p]),l++,p++;else if(d[_]===o[f])n[f]=S(i[_],a[f]),_--,f--;else if(d[l]===o[f])n[f]=S(i[l],a[f]),R(r,n[f+1],i[l]),l++,f--;else if(d[_]===o[p])n[p]=S(i[_],a[p]),R(r,i[l],i[_]),_--,p++;else if(u===void 0&&(u=Ne(o,p,f),g=Ne(d,l,_)),u.has(d[l]))if(u.has(d[_])){let v=g.get(o[p]),m=v!==void 0?i[v]:null;if(m===null){let $=R(r,i[l]);S($,a[p]),n[p]=$}else n[p]=S(m,a[p]),R(r,i[l],m),i[v]=null;p++}else Z(i[_]),_--;else Z(i[l]),l++;for(;p<=f;){let v=R(r,n[f+1]);S(v,a[p]),n[p++]=v}for(;l<=_;){let v=i[l++];v!==null&&Z(v)}return this.ut=o,ze(r,n),x}});var he={want_to_watch:"Want to Watch",watching:"Watching",watched:"Watched",paused:"Paused"},He={want_to_watch:"var(--secondary-text-color, #6d6d6d)",watching:"#1976d2",watched:"#2e7d32",paused:"#e65100"},Ie={movie:"mdi:movie",tv:"mdi:television"};function Le(r){return r?new Date(r+"T12:00:00").toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):""}var st="https://image.tmdb.org/t/p/w300",it="https://image.tmdb.org";function U(r){return typeof r=="string"&&r.startsWith(it)?r:null}var B=class extends A{constructor(){super(),this._view="list",this._items=[],this._searchQuery="",this._searchType="tv",this._searchResults=[],this._searchDone=!1,this._searching=!1,this._adding=new Set,this._detail=null,this._statusFilter="all",this._unsubEvents=null,this._loaded=!1,this._seasonCache={}}set hass(e){this._hass=e,this._loaded||(this._loaded=!0,this._loadItems(),this._subscribeEvents())}get hass(){return this._hass}disconnectedCallback(){super.disconnectedCallback(),this._unsubEvents&&this._unsubEvents.then(e=>e?.())}async _loadItems(){try{this._items=await this.hass.connection.sendMessagePromise({type:"polr_tmdb/items"})||[]}catch(e){console.error("polr_tmdb/items",e)}}async _subscribeEvents(){this._unsubEvents=this.hass.connection.subscribeEvents(e=>{this._loadItems(),this._detail&&e.data.item?.item_id===this._detail.item_id&&(this._detail=e.data.action==="remove"?null:e.data.item)},"polr_tmdb_updated")}async _doSearch(){if(this._searchQuery.trim()){this._searching=!0,this._searchResults=[];try{this._searchResults=await this.hass.connection.sendMessagePromise({type:"polr_tmdb/search",query:this._searchQuery.trim(),media_type:this._searchType})||[]}catch(e){console.error("search",e)}finally{this._searching=!1,this._searchDone=!0}}}_goToSearch(){this._searchResults=[],this._searchDone=!1,this._searchQuery="",this._view="search"}_goToList(){this._view="list"}async _addItem(e,t){this._adding=new Set([...this._adding,e]);try{await this.hass.connection.sendMessagePromise({type:"polr_tmdb/add",tmdb_id:e,media_type:t,status:"want_to_watch"}),await this._loadItems()}catch(s){console.error("add",s)}finally{let s=new Set(this._adding);s.delete(e),this._adding=s}}async _removeItem(e){confirm("Remove from watchlist?")&&(await this.hass.connection.sendMessagePromise({type:"polr_tmdb/remove",item_id:e}),this._detail=null)}async _updateItem(e,t){let s=Object.fromEntries(Object.entries(t).filter(([,i])=>i!=null));try{await this.hass.connection.sendMessagePromise({type:"polr_tmdb/update",item_id:e,...s})}catch(i){console.error("update",i)}}async _fetchSeasonEpisodes(e,t){let s=`${e}:${t}`;if(!this._seasonCache[s])try{let i=await this.hass.connection.sendMessagePromise({type:"polr_tmdb/season",tmdb_id:e,season_number:t});this._seasonCache[s]=i||[],this.requestUpdate()}catch(i){console.error("season fetch",i)}}_getSeasonEpisodes(e,t){if(!t)return[];let s=`${e}:${t}`;return this._seasonCache[s]?this._seasonCache[s]:(this._fetchSeasonEpisodes(e,t),null)}get _filteredItems(){return this._statusFilter==="all"?this._items:this._items.filter(e=>e.status===this._statusFilter)}_isAdded(e){return this._items.some(t=>t.tmdb_id===e)}render(){return c`
      <div class="panel">
        <div class="header">
          ${this._view==="search"?c`<ha-icon-button class="back-btn" .label=${"Back"} @click=${this._goToList}>
                <ha-icon icon="mdi:arrow-left"></ha-icon>
              </ha-icon-button>`:c`<ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>`}
          <span class="title" style="${this._view==="search"?"":"margin-left:4px"}">
            ${this._view==="search"?"Add Show or Movie":"Shows & Movies"}
          </span>
          ${this._view==="list"?c`<button class="add-fab" @click=${this._goToSearch}>
                <ha-icon icon="mdi:plus"></ha-icon> Add
              </button>`:h}
        </div>

        ${this._view==="list"?this._renderList():this._renderSearch()}
      </div>

      ${this._detail?this._renderDetailDialog():h}
    `}_renderList(){return c`
      <div class="filter-bar">
        ${["all","want_to_watch","watching","watched","paused"].map(e=>c`
          <button
            class="chip ${this._statusFilter===e?"chip-active":""}"
            @click=${()=>this._statusFilter=e}
          >${e==="all"?"All":he[e]}</button>
        `)}
      </div>
      <div class="grid">
        ${this._filteredItems.length===0?c`<div class="empty"><ha-icon icon="mdi:television-off"></ha-icon><p>Nothing here yet.<br>Tap + Add to get started.</p></div>`:de(this._filteredItems,e=>e.item_id,e=>this._renderPoster(e))}
      </div>
    `}_renderPoster(e){return c`
      <button class="poster-card" @click=${()=>this._detail=e}>
        ${U(e.poster_path)?c`<img class="poster-img" src="${U(e.poster_path)}" alt="${e.title}" loading="lazy" />`:c`<div class="poster-placeholder"><ha-icon icon="${Ie[e.media_type]||"mdi:movie"}"></ha-icon></div>`}
        <span class="status-badge" style="background:${He[e.status]}">${he[e.status]}</span>
        ${e.vote_average?c`<span class="rating-badge">★ ${e.vote_average}</span>`:h}
        ${this._hasNewEpisode(e)?c`<span class="new-ep-badge"><ha-icon icon="mdi:new-box"></ha-icon></span>`:h}
        <div class="poster-title">${e.title}</div>
      </button>
    `}_renderSearch(){return c`
      <div class="search-bar">
        <div class="search-type-toggle">
          <button class="type-btn ${this._searchType==="tv"?"type-active":""}" @click=${()=>{this._searchType="tv",this._searchDone=!1,this._searchResults=[]}}>
            <ha-icon icon="mdi:television"></ha-icon> TV
          </button>
          <button class="type-btn ${this._searchType==="movie"?"type-active":""}" @click=${()=>{this._searchType="movie",this._searchDone=!1,this._searchResults=[]}}>
            <ha-icon icon="mdi:movie"></ha-icon> Movie
          </button>
        </div>
        <ha-textfield
          class="search-input"
          placeholder="Search TMDB…"
          .value=${this._searchQuery}
          @input=${e=>{this._searchQuery=e.target.value,this._searchDone=!1}}
          @keydown=${e=>e.key==="Enter"&&this._doSearch()}
        ></ha-textfield>
        ${this._searchQuery?c`
          <ha-icon-button .label=${"Clear"} @click=${()=>{this._searchQuery="",this._searchResults=[],this._searchDone=!1}}>
            <ha-icon icon="mdi:close"></ha-icon>
          </ha-icon-button>
        `:h}
        <ha-icon-button
          .label=${"Search"}
          @click=${this._doSearch}
          ?disabled=${this._searching}
        ><ha-icon icon="${this._searching?"mdi:loading":"mdi:magnify"}"></ha-icon></ha-icon-button>
      </div>

      ${this._searching?c`<div class="loading"><ha-spinner></ha-spinner></div>`:this._searchResults.length>0?c`<div class="grid">${de(this._searchResults,e=>e.id,e=>this._renderSearchResult(e))}</div>`:this._searchDone?c`<div class="empty"><ha-icon icon="mdi:magnify-close"></ha-icon><p>No results for "${this._searchQuery}"</p></div>`:c`<div class="search-hint"><ha-icon icon="mdi:magnify"></ha-icon><p>Search for a TV show or movie to add it to your watchlist.</p></div>`}
    `}_renderSearchResult(e){let t=e.id,s=e.title||e.name||"Unknown",i=(e.release_date||e.first_air_date||"").slice(0,4),a=e.poster_path?`${st}${e.poster_path}`:"",o=this._isAdded(t),d=this._adding.has(t);return c`
      <div class="poster-card search-card">
        ${a?c`<img class="poster-img" src="${a}" alt="${s}" loading="lazy" />`:c`<div class="poster-placeholder"><ha-icon icon="${Ie[this._searchType]}"></ha-icon></div>`}
        ${e.vote_average?c`<span class="rating-badge">★ ${e.vote_average.toFixed(1)}</span>`:h}
        <div class="poster-title">${s}${i?c` <span class="year">${i}</span>`:h}</div>
        <button
          class="add-btn ${o?"add-btn-done":""}"
          ?disabled=${o||d}
          @click=${n=>{n.stopPropagation(),!o&&!d&&this._addItem(t,this._searchType)}}
        >
          <ha-icon icon="${d?"mdi:loading":o?"mdi:check":"mdi:plus"}"></ha-icon>
        </button>
      </div>
    `}_hasNewEpisode(e){if(e.status==="watched")return!1;if(e.has_new_episode)return!0;let t=e.next_episode_to_air;if(!t?.air_date)return!1;let s=new Date,i=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`;if(t.air_date>i)return!1;let a=e.current_season||0,o=e.current_episode||0;return a===0&&o===0?!0:t.season_number>a||t.season_number===a&&t.episode_number>o}_renderProgress(e){let t=e.seasons||0,s=e.current_season||"",i=s?this._getSeasonEpisodes(e.tmdb_id,s):[],a=e.last_episode_to_air,o=e.next_episode_to_air,d=new Date,n=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`,u=i?i.filter(m=>!m.air_date||m.air_date<=n):[],g=o&&o.air_date&&o.air_date<=n,l=e.current_season||0,_=e.current_episode||0,p=o&&(o.season_number>l||o.season_number===l&&o.episode_number>_),f=e.has_new_episode||g&&p,v=e.has_new_episode?a:g&&p?o:null;return c`
      <div class="section-label">Progress ${t?`\xB7 ${t} seasons`:""}</div>

      ${f&&v?c`
        <div class="new-ep-alert">
          <ha-icon icon="mdi:new-box"></ha-icon>
          <div>
            <strong>New episode available</strong>
            <div class="new-ep-detail">S${v.season_number}E${v.episode_number}${v.name?` \xB7 ${v.name}`:""}${v.air_date?` \xB7 aired ${Le(v.air_date)}`:""}</div>
          </div>
        </div>
      `:h}

      ${o&&!g?c`
        <div class="upcoming-ep">
          <ha-icon icon="mdi:calendar-clock"></ha-icon>
          <span>Next: S${o.season_number}E${o.episode_number}${o.name?` \xB7 ${o.name}`:""}${o.air_date?` \xB7 ${Le(o.air_date)}`:""}</span>
        </div>
      `:h}

      <div class="progress-row">
        <label class="select-label">
          <span>Season</span>
          <select class="ep-select" @change=${m=>{let X={current_season:parseInt(m.target.value)||null};e.status==="want_to_watch"&&(X.status="watching"),this._updateItem(e.item_id,X),this._detail={...e,...X,current_episode:null}}}>
            <option value="">—</option>
            ${Array.from({length:t},(m,$)=>$+1).map(m=>c`
              <option value="${m}" ?selected=${s===m}>Season ${m}</option>
            `)}
          </select>
        </label>
        <label class="select-label">
          <span>Episode</span>
          <select class="ep-select" ?disabled=${!s||i===null}
            @change=${m=>{let $=m.target.value?parseInt(m.target.value,10):null;$&&(this._updateItem(e.item_id,{current_episode:$}),this._detail={...e,current_episode:$})}}>
            <option value="">—</option>
            ${i===null?c`<option disabled>Loading…</option>`:u.map(m=>c`
                  <option value="${m.episode_number}" ?selected=${e.current_episode===m.episode_number}>
                    E${m.episode_number}${m.name?` \xB7 ${m.name}`:""}
                  </option>
                `)}
          </select>
        </label>
      </div>

      ${a?c`<div class="ep-latest-hint">Latest aired: S${a.season_number}E${a.episode_number}</div>`:h}
    `}_renderDetailDialog(){let e=this._detail;return c`
      <ha-dialog open @closed=${()=>this._detail=null} .heading=${e.title}>
        <div class="dlg-body">
          ${U(e.backdrop_path)?c`<div class="dlg-backdrop" style="background-image:url('${U(e.backdrop_path)}')"></div>`:h}
          <button class="dlg-delete-btn" title="Remove from watchlist" @click=${()=>this._removeItem(e.item_id)}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
          <div class="dlg-content">
            <div class="dlg-left">
              ${U(e.poster_path)?c`<img class="dlg-poster" src="${U(e.poster_path)}" alt="${e.title}" />`:h}
            </div>
            <div class="dlg-right">
              <div class="dlg-meta">
                ${[e.release_date?.slice(0,4),e.genres?.slice(0,3).join(", "),e.vote_average?`\u2605 ${e.vote_average}`:null,e.networks?.[0]].filter(Boolean).join(" \xB7 ")}
              </div>
              <p class="dlg-overview">${e.overview}</p>

              <div class="section-label">Status</div>
              <div class="chip-row">
                ${["want_to_watch","watching","watched","paused"].map(t=>c`
                  <button class="chip ${e.status===t?"chip-active":""}"
                    style="${e.status===t?`background:${He[t]};color:#fff;border-color:transparent`:""}"
                    @click=${async()=>{await this._updateItem(e.item_id,{status:t}),this._detail={...e,status:t}}}
                  >${he[t]}</button>
                `)}
              </div>

              ${e.media_type==="tv"?this._renderProgress(e):h}

              <div class="section-label">Your Rating</div>
              <div class="stars">
                ${[1,2,3,4,5,6,7,8,9,10].map(t=>c`
                  <button class="star ${(e.rating||0)>=t?"star-on":""}"
                    @click=${async()=>{await this._updateItem(e.item_id,{rating:t}),this._detail={...e,rating:t}}}>★</button>
                `)}
                ${e.rating?c`<span class="rating-val">${e.rating}/10</span>`:h}
              </div>

              <div class="section-label">Notes</div>
              <ha-textfield type="textarea" label="Notes" .value=${e.notes||""}
                @change=${t=>{this._updateItem(e.item_id,{notes:t.target.value}),this._detail={...e,notes:t.target.value}}}
              ></ha-textfield>

              ${e.watch_providers&&Object.keys(e.watch_providers).length>0?c`
                <div class="section-label">Where to Watch</div>
                <div class="providers">
                  ${e.watch_providers.flatrate?.length?c`
                    <div class="provider-row">
                      <span class="provider-type">Stream</span>
                      ${e.watch_providers.flatrate.map(t=>c`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${t.logo_path}" title="${t.provider_name}" alt="${t.provider_name}" />
                      `)}
                    </div>
                  `:h}
                  ${e.watch_providers.rent?.length?c`
                    <div class="provider-row">
                      <span class="provider-type">Rent</span>
                      ${e.watch_providers.rent.map(t=>c`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${t.logo_path}" title="${t.provider_name}" alt="${t.provider_name}" />
                      `)}
                    </div>
                  `:h}
                  ${e.watch_providers.buy?.length?c`
                    <div class="provider-row">
                      <span class="provider-type">Buy</span>
                      ${e.watch_providers.buy.map(t=>c`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${t.logo_path}" title="${t.provider_name}" alt="${t.provider_name}" />
                      `)}
                    </div>
                  `:h}
                </div>
              `:h}

              ${e.trailer_url?c`
                <div class="dlg-footer">
                  <ha-button @click=${()=>window.open(e.trailer_url,"_blank")}>
                    <ha-icon icon="mdi:play" slot="icon"></ha-icon>Trailer
                  </ha-button>
                </div>
              `:h}
            </div>
          </div>
        </div>
        <ha-button slot="primaryAction" dialogAction="close">Close</ha-button>
      </ha-dialog>
    `}};ee(B,"properties",{hass:{type:Object},narrow:{type:Boolean},_view:{state:!0},_items:{state:!0},_searchQuery:{state:!0},_searchType:{state:!0},_searchResults:{state:!0},_searchDone:{state:!0},_searching:{state:!0},_adding:{state:!0},_detail:{state:!0},_statusFilter:{state:!0}}),ee(B,"styles",se`
    :host { display: block; min-height: 100%; background: var(--primary-background-color); color: var(--primary-text-color); }
    .panel { display: flex; flex-direction: column; min-height: 100%; max-width: 100%; }

    /* Header */
    .header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 8px 0 16px; height: 56px;
      background: var(--app-header-background-color, var(--primary-background-color));
      border-bottom: 1px solid var(--divider-color);
      position: sticky; top: 0; z-index: 10;
    }
    .title { font-size: 1.1rem; font-weight: 600; }
    .back-btn { --mdc-icon-button-size: 40px; color: var(--primary-text-color); }
    .add-fab {
      display: flex; align-items: center; gap: 6px;
      padding: 6px 16px; border-radius: 20px;
      background: var(--primary-color); color: #fff; border: none;
      font-size: 0.9rem; font-weight: 500; cursor: pointer;
      --mdc-icon-size: 18px;
    }

    /* Filter chips */
    .filter-bar {
      display: flex; gap: 6px; padding: 12px 16px; overflow-x: auto;
      position: sticky; top: 56px; z-index: 9;
      background: var(--primary-background-color);
    }
    .chip {
      padding: 4px 12px; border-radius: 16px; border: 1px solid var(--divider-color);
      background: none; color: var(--secondary-text-color); cursor: pointer;
      font-size: 0.82rem; white-space: nowrap; transition: all 0.15s;
    }
    .chip:hover { border-color: var(--primary-color); color: var(--primary-color); }
    .chip-active { background: var(--primary-color) !important; border-color: var(--primary-color) !important; color: #fff !important; }
    .chip-row { display: flex; flex-wrap: wrap; gap: 6px; }

    /* Poster grid */
    .grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 8px; padding: 8px; box-sizing: border-box;
      align-content: start; min-width: 0;
    }
    .poster-card {
      position: relative; border-radius: 8px; overflow: hidden; cursor: pointer;
      background: var(--card-background-color); border: none; padding: 0; text-align: left;
      display: flex; flex-direction: column; transition: transform 0.15s, box-shadow 0.15s;
    }
    .poster-card:hover { transform: scale(1.03); box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
    .poster-img { width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block; flex-shrink: 0; }
    .poster-placeholder {
      width: 100%; aspect-ratio: 2/3; display: flex; align-items: center; justify-content: center;
      background: var(--secondary-background-color); flex-shrink: 0;
      --mdc-icon-size: 48px; color: var(--secondary-text-color);
    }
    .status-badge {
      position: absolute; top: 5px; left: 5px;
      padding: 2px 5px; border-radius: 3px; font-size: 0.6rem;
      font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.4px;
    }
    .rating-badge {
      position: absolute; top: 5px; right: 5px;
      background: rgba(0,0,0,0.65); padding: 2px 5px; border-radius: 3px;
      font-size: 0.7rem; color: #ffd600;
    }
    .new-ep-badge {
      position: absolute; top: 24px; right: 5px;
      background: var(--warning-color, #ff9800); border-radius: 4px;
      padding: 1px 4px; color: #fff; --mdc-icon-size: 14px; line-height: 1;
      display: flex; align-items: center;
    }
    .poster-title {
      padding: 5px 7px; font-size: 0.78rem; font-weight: 500;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 0;
    }

    /* Search */
    .search-bar { display: flex; align-items: center; gap: 8px; padding: 12px 16px; flex-shrink: 0; }
    .search-type-toggle { display: flex; border-radius: 8px; overflow: hidden; border: 1px solid var(--divider-color); flex-shrink: 0; }
    .type-btn {
      display: flex; align-items: center; gap: 4px; padding: 0 12px; height: 36px;
      border: none; background: none; color: var(--secondary-text-color); cursor: pointer;
      font-size: 0.82rem; transition: all 0.15s;
    }
    .type-btn ha-icon { --mdc-icon-size: 16px; }
    .type-active { background: var(--primary-color); color: #fff; }
    .search-input { flex: 1; }
    .loading { display: flex; justify-content: center; padding: 40px; }

    /* Search hint / empty */
    .search-hint, .empty {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; padding: 48px 16px; color: var(--secondary-text-color);
      --mdc-icon-size: 48px; text-align: center;
    }
    .search-hint p, .empty p { margin: 12px 0 0; line-height: 1.6; }
    .empty { grid-column: 1/-1; }

    /* Search result add button */
    .search-card { position: relative; }
    .add-btn {
      position: absolute; bottom: 26px; right: 4px;
      width: 32px; height: 32px; border-radius: 50%; border: none;
      background: var(--primary-color); color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.5); --mdc-icon-size: 18px;
      transition: background 0.2s;
    }
    .add-btn:disabled { cursor: default; }
    .add-btn-done { background: var(--success-color, #2e7d32); }
    .year { color: var(--secondary-text-color); font-size: 0.75rem; }

    /* Dialog */
    ha-dialog { --mdc-dialog-min-width: min(680px, 95vw); --mdc-dialog-max-width: 680px; --dialog-content-overflow: visible; }
    .dlg-body { margin: -24px; position: relative; overflow: visible; }
    .dlg-backdrop { width: 100%; height: 180px; background-size: cover; background-position: center top; overflow: visible; }
    .dlg-delete-btn {
      position: absolute; top: 40px; right: 8px;
      background: rgba(180,0,0,0.85); border: none; border-radius: 50%;
      width: 36px; height: 36px; cursor: pointer; color: #fff;
      display: flex; align-items: center; justify-content: center;
      --mdc-icon-size: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.6); z-index: 100;
    }
    .dlg-delete-btn:hover { background: rgba(180,0,0,1); }
    .dlg-content { display: flex; gap: 14px; padding: 16px; }
    .dlg-left { flex-shrink: 0; }
    .dlg-poster { width: 90px; border-radius: 6px; display: block; }
    .dlg-right { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .dlg-right ha-textfield { width: 100%; }
    .dlg-meta { font-size: 0.82rem; color: var(--secondary-text-color); margin-bottom: 8px; }
    .dlg-overview { font-size: 0.84rem; line-height: 1.5; max-height: 80px; overflow-y: auto; margin: 0 0 4px; }
    .providers { display: flex; flex-direction: column; gap: 5px; margin-bottom: 4px; }
    .provider-row { display: flex; align-items: center; gap: 6px; }
    .provider-type { font-size: 0.7rem; color: var(--secondary-text-color); min-width: 38px; text-transform: uppercase; letter-spacing: 0.4px; }
    .provider-logo { width: 32px; height: 32px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
    .dlg-footer { display: flex; gap: 8px; margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--divider-color); align-items: center; }
    .remove-btn { --primary-color: var(--error-color, #c62828); margin-left: auto; }

    .section-label {
      font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;
      color: var(--secondary-text-color); margin: 12px 0 5px;
    }
    .new-ep-alert {
      display: flex; align-items: flex-start; gap: 8px;
      background: color-mix(in srgb, var(--warning-color, #ff9800) 15%, transparent);
      border: 1px solid var(--warning-color, #ff9800);
      border-radius: 8px; padding: 8px 10px; margin-bottom: 8px;
      font-size: 0.82rem; --mdc-icon-size: 20px; color: var(--warning-color, #ff9800);
    }
    .new-ep-alert strong { display: block; color: var(--primary-text-color); }
    .new-ep-detail { color: var(--secondary-text-color); font-size: 0.78rem; margin-top: 2px; }
    .upcoming-ep {
      display: flex; align-items: center; gap: 6px; font-size: 0.78rem;
      color: var(--secondary-text-color); margin-bottom: 8px; --mdc-icon-size: 16px;
    }
    .ep-latest-hint { font-size: 0.75rem; color: var(--secondary-text-color); margin-top: 4px; }
    .progress-row { display: flex; gap: 12px; }
    .select-label { display: flex; flex-direction: column; gap: 3px; flex: 1; }
    .select-label span { font-size: 0.72rem; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px; }
    .ep-select {
      width: 100%; padding: 6px 8px; border-radius: 6px;
      border: 1px solid var(--divider-color); background: var(--card-background-color);
      color: var(--primary-text-color); font-size: 0.84rem; cursor: pointer;
    }
    .ep-select:disabled { opacity: 0.5; cursor: default; }
    .stars { display: flex; align-items: center; gap: 1px; }
    .star { background: none; border: none; font-size: 1.3rem; cursor: pointer; color: var(--disabled-text-color, #555); padding: 0; line-height: 1; }
    .star-on { color: #ffd600; }
    .rating-val { margin-left: 6px; font-size: 0.8rem; color: var(--secondary-text-color); }
  `);customElements.define("polr-tmdb-panel",B);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
