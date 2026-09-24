var Ht=Object.defineProperty;var It=(o,t,e)=>t in o?Ht(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var U=(o,t,e)=>(It(o,typeof t!="symbol"?t+"":t,e),e);var V=globalThis,q=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol(),pt=new WeakMap,M=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==et)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(q&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=pt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&pt.set(e,t))}return t}toString(){return this.cssText}},ht=o=>new M(typeof o=="string"?o:o+"",void 0,et),F=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((s,i,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new M(e,o,et)},ut=(o,t)=>{if(q)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=V.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},st=q?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ht(e)})(o):o;var{is:Lt,defineProperty:jt,getOwnPropertyDescriptor:Bt,getOwnPropertyNames:Wt,getOwnPropertySymbols:Vt,getPrototypeOf:qt}=Object,w=globalThis,gt=w.trustedTypes,Ft=gt?gt.emptyScript:"",Kt=w.reactiveElementPolyfillSupport,O=(o,t)=>o,it={toAttribute(o,t){switch(t){case Boolean:o=o?Ft:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},mt=(o,t)=>!Lt(o,t),_t={attribute:!0,type:String,converter:it,reflect:!1,useDefault:!1,hasChanged:mt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);var $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_t){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&jt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=Bt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let p=i?.call(this);n?.call(this,r),this.requestUpdate(t,p,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_t}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let t=qt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let e=this.properties,s=[...Wt(e),...Vt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(st(i))}else t!==void 0&&e.push(st(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ut(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:it).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:it;this._$Em=i;let p=r.fromAttribute(e,n.type);this[i]=p??this._$Ej?.get(i)??p,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let r=this.constructor;if(i===!1&&(n=this[t]),s??(s=r.getPropertyOptions(t)),!((s.hasChanged??mt)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:r}=n,p=this[i];r!==!0||this._$AL.has(i)||p===void 0||this.C(i,void 0,n,p)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[O("elementProperties")]=new Map,$[O("finalized")]=new Map,Kt?.({ReactiveElement:$}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push("2.1.2");var D=globalThis,ft=o=>o,K=D.trustedTypes,vt=K?K.createPolicy("lit-html",{createHTML:o=>o}):void 0,rt="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,nt="?"+x,Yt=`<${nt}>`,k=document,H=()=>k.createComment(""),I=o=>o===null||typeof o!="object"&&typeof o!="function",at=Array.isArray,At=o=>at(o)||typeof o?.[Symbol.iterator]=="function",ot=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$t=/-->/g,xt=/>/g,S=RegExp(`>|${ot}(?:([^\\s"'>=/]+)(${ot}*=${ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bt=/'/g,yt=/"/g,St=/^(?:script|style|textarea|title)$/i,lt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),l=lt(1),ae=lt(2),le=lt(3),b=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),wt=new WeakMap,E=k.createTreeWalker(k,129);function Et(o,t){if(!at(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return vt!==void 0?vt.createHTML(t):t}var kt=(o,t)=>{let e=o.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",r=R;for(let p=0;p<e;p++){let a=o[p],u,f,d=-1,g=0;for(;g<a.length&&(r.lastIndex=g,f=r.exec(a),f!==null);)g=r.lastIndex,r===R?f[1]==="!--"?r=$t:f[1]!==void 0?r=xt:f[2]!==void 0?(St.test(f[2])&&(i=RegExp("</"+f[2],"g")),r=S):f[3]!==void 0&&(r=S):r===S?f[0]===">"?(r=i??R,d=-1):f[1]===void 0?d=-2:(d=r.lastIndex-f[2].length,u=f[1],r=f[3]===void 0?S:f[3]==='"'?yt:bt):r===yt||r===bt?r=S:r===$t||r===xt?r=R:(r=S,i=void 0);let h=r===S&&o[p+1].startsWith("/>")?" ":"";n+=r===R?a+Yt:d>=0?(s.push(u),a.slice(0,d)+rt+a.slice(d)+x+h):a+x+(d===-2?p:h)}return[Et(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},L=class o{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0,p=t.length-1,a=this.parts,[u,f]=kt(t,e);if(this.el=o.createElement(u,s),E.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=E.nextNode())!==null&&a.length<p;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(rt)){let g=f[r++],h=i.getAttribute(d).split(x),m=/([.?@])?(.*)/.exec(g);a.push({type:1,index:n,name:m[2],strings:h,ctor:m[1]==="."?J:m[1]==="?"?Q:m[1]==="@"?G:T}),i.removeAttribute(d)}else d.startsWith(x)&&(a.push({type:6,index:n}),i.removeAttribute(d));if(St.test(i.tagName)){let d=i.textContent.split(x),g=d.length-1;if(g>0){i.textContent=K?K.emptyScript:"";for(let h=0;h<g;h++)i.append(d[h],H()),E.nextNode(),a.push({type:2,index:++n});i.append(d[g],H())}}}else if(i.nodeType===8)if(i.data===nt)a.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(x,d+1))!==-1;)a.push({type:7,index:n}),d+=x.length-1}n++}}static createElement(t,e){let s=k.createElement("template");return s.innerHTML=t,s}};function C(o,t,e=o,s){if(t===b)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=I(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=C(o,i._$AS(o,t.values),i,s)),t}var Y=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??k).importNode(e,!0);E.currentNode=i;let n=E.nextNode(),r=0,p=0,a=s[0];for(;a!==void 0;){if(r===a.index){let u;a.type===2?u=new z(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new Z(n,this,t)),this._$AV.push(u),a=s[++p]}r!==a?.index&&(n=E.nextNode(),r++)}return E.currentNode=k,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},z=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),I(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):At(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=L.createElement(Et(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new Y(i,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=wt.get(t.strings);return e===void 0&&wt.set(t.strings,e=new L(t)),e}k(t){at(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new o(this.O(H()),this.O(H()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ft(t).nextSibling;ft(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){let n=this.strings,r=!1;if(n===void 0)t=C(this,t,e,0),r=!I(t)||t!==this._$AH&&t!==b,r&&(this._$AH=t);else{let p=t,a,u;for(t=n[0],a=0;a<n.length-1;a++)u=C(this,p[s+a],e,a),u===b&&(u=this._$AH[a]),r||(r=!I(u)||u!==this._$AH[a]),u===c?t=c:t!==c&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}r&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},Q=class extends T{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},G=class extends T{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??c)===b)return;let s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Z=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}},Ct={M:rt,P:x,A:nt,C:1,L:kt,R:Y,D:At,V:C,I:z,H:T,N:Q,U:G,B:J,F:Z},Jt=D.litHtmlPolyfillSupport;Jt?.(L,z),(D.litHtmlVersions??(D.litHtmlVersions=[])).push("3.3.2");var Tt=(o,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new z(t.insertBefore(H(),n),n,void 0,e??{})}return i._$AI(o),i};var j=globalThis,y=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Tt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};y._$litElement$=!0,y.finalized=!0,j.litElementHydrateSupport?.({LitElement:y});var Qt=j.litElementPolyfillSupport;Qt?.({LitElement:y});(j.litElementVersions??(j.litElementVersions=[])).push("4.2.2");var Pt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},zt=o=>(...t)=>({_$litDirective$:o,values:t}),X=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Gt}=Ct,Nt=o=>o;var Ut=()=>document.createComment(""),N=(o,t,e)=>{let s=o._$AA.parentNode,i=t===void 0?o._$AB:t._$AA;if(e===void 0){let n=s.insertBefore(Ut(),i),r=s.insertBefore(Ut(),i);e=new Gt(n,r,o,o.options)}else{let n=e._$AB.nextSibling,r=e._$AM,p=r!==o;if(p){let a;e._$AQ?.(o),e._$AM=o,e._$AP!==void 0&&(a=o._$AU)!==r._$AU&&e._$AP(a)}if(n!==i||p){let a=e._$AA;for(;a!==n;){let u=Nt(a).nextSibling;Nt(s).insertBefore(a,i),a=u}}}return e},A=(o,t,e=o)=>(o._$AI(t,e),o),Zt={},Mt=(o,t=Zt)=>o._$AH=t,Ot=o=>o._$AH,tt=o=>{o._$AR(),o._$AA.remove()};var Rt=(o,t,e)=>{let s=new Map;for(let i=t;i<=e;i++)s.set(o[i],i);return s},dt=zt(class extends X{constructor(o){if(super(o),o.type!==Pt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(o,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let i=[],n=[],r=0;for(let p of o)i[r]=s?s(p,r):r,n[r]=e(p,r),r++;return{values:n,keys:i}}render(o,t,e){return this.dt(o,t,e).values}update(o,[t,e,s]){let i=Ot(o),{values:n,keys:r}=this.dt(t,e,s);if(!Array.isArray(i))return this.ut=r,n;let p=this.ut??(this.ut=[]),a=[],u,f,d=0,g=i.length-1,h=0,m=n.length-1;for(;d<=g&&h<=m;)if(i[d]===null)d++;else if(i[g]===null)g--;else if(p[d]===r[h])a[h]=A(i[d],n[h]),d++,h++;else if(p[g]===r[m])a[m]=A(i[g],n[m]),g--,m--;else if(p[d]===r[m])a[m]=A(i[d],n[m]),N(o,a[m+1],i[d]),d++,m--;else if(p[g]===r[h])a[h]=A(i[g],n[h]),N(o,i[d],i[g]),g--,h++;else if(u===void 0&&(u=Rt(r,h,m),f=Rt(p,d,g)),u.has(p[d]))if(u.has(p[g])){let _=f.get(r[h]),v=_!==void 0?i[_]:null;if(v===null){let P=N(o,i[d]);A(P,n[h]),a[h]=P}else a[h]=A(v,n[h]),N(o,i[d],v),i[_]=null;h++}else tt(i[g]),g--;else tt(i[d]),d++;for(;h<=m;){let _=N(o,a[m+1]);A(_,n[h]),a[h++]=_}for(;d<=g;){let _=i[d++];_!==null&&tt(_)}return this.ut=r,Mt(o,a),b}});function Xt(o){return o?new Date(o+"T12:00:00").toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):""}var te={want_to_watch:"Want to Watch",watching:"Watching",watched:"Watched",paused:"Paused",suggested:"Suggested",dismissed:"Not for us"},ct=["new","soon","upnext","suggested"],ee=["Too stressful","Too slow","Feels dated","Not our genre","Already seen it","Just not interested"],Dt={want_to_watch:"#6d6d6d",watching:"#1976d2",watched:"#2e7d32",paused:"#e65100",suggested:"#7b1fa2",dismissed:"#6d6d6d"},B=class extends y{constructor(){super(),this._items=[],this._section=null,this._detail=null,this._dismissing=null,this._toast=null,this._loaded=!1,this._unsubEvents=null,this._seasonCache={}}static getConfigElement(){return document.createElement("polr-tmdb-card-editor")}static getStubConfig(){return{title:"Watch Tonight"}}setConfig(t){let e=(t.sections||ct).filter(i=>ct.includes(i));if(!e.length)throw new Error("sections must include at least one of: "+ct.join(", "));let s=(t.tvs||[]).map(i=>typeof i=="string"?{entity:i}:i);for(let i of s)if(!i.entity||!i.entity.startsWith("media_player."))throw new Error("Each entry in tvs needs a media_player entity");this._config={title:"Watch Tonight",...t,sections:e,tvs:s},t.default_section&&e.includes(t.default_section)?this._section=t.default_section:e.includes(this._section)||(this._section=e[0])}set hass(t){this._hass=t,this._loaded||(this._loaded=!0,this._loadItems(),this._subscribeEvents())}disconnectedCallback(){super.disconnectedCallback(),this._unsubEvents&&this._unsubEvents.then(t=>t&&t())}async _loadItems(){try{this._items=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/items"})||[]}catch(t){console.error("polr-tmdb-card: load failed",t)}}async _subscribeEvents(){this._unsubEvents=this._hass.connection.subscribeEvents(t=>{this._loadItems(),this._detail&&t.data.item?.item_id===this._detail.item_id&&(this._detail=t.data.action==="remove"?null:t.data.item)},"polr_tmdb_updated")}async _updateItem(t,e){let s=Object.fromEntries(Object.entries(e).filter(([,i])=>i!=null));try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/update",item_id:t,...s})}catch(i){console.error("polr-tmdb-card: update failed",i)}}async _callService(t,e,s){try{await this._hass.callService("polr_tmdb",t,e),s&&this._showToast(s)}catch(i){console.error(`polr-tmdb-card: ${t} failed`,i),this._showToast(i?.message||"Something went wrong")}}_showToast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this._toast=null,3500)}_tvName(t){return t.name||this._hass?.states?.[t.entity]?.attributes?.friendly_name||t.entity}_openOnTv(t,e){this._showToast(`Opening ${t.title} on ${this._tvName(e)}\u2026`),this._callService("open_on_tv",{item_id:t.item_id,entity_id:e.entity})}_addSuggestion(t){this._callService("update_status",{item_id:t.item_id,status:"want_to_watch"},`Added ${t.title} to Up Next`),this._detail?.item_id===t.item_id&&(this._detail={...t,status:"want_to_watch"})}_dismiss(t,e){this._dismissing=null,this._callService("dismiss",{item_id:t.item_id,reason:e||""},`Passed on ${t.title}`),this._detail?.item_id===t.item_id&&(this._detail=null)}async _removeItem(t){if(confirm("Remove from watchlist?"))try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/remove",item_id:t})}catch(e){console.error("polr-tmdb-card: remove failed",e)}}async _fetchSeasonEpisodes(t,e){let s=`${t}:${e}`;if(!this._seasonCache[s])try{let i=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/season",tmdb_id:t,season_number:e});this._seasonCache[s]=i||[],this.requestUpdate()}catch(i){console.error("season fetch",i)}}_getSeasonEpisodes(t,e){if(!e)return[];let s=`${t}:${e}`;return this._seasonCache[s]?this._seasonCache[s]:(this._fetchSeasonEpisodes(t,e),null)}_today(){let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}_hasNewEpisode(t){if(t.status==="watched")return!1;if(t.has_new_episode)return!0;let e=t.next_episode_to_air;if(!e?.air_date||e.air_date>this._today())return!1;let s=t.current_season||0,i=t.current_episode||0;return s===0&&i===0?!0:e.season_number>s||e.season_number===s&&e.episode_number>i}_daysUntil(t){if(!t)return null;let e=new Date(t+"T12:00:00")-new Date;return Math.ceil(e/864e5)}_isComingSoon(t){if(t.media_type!=="tv"||t.status!=="watching"||this._hasNewEpisode(t))return!1;let e=t.next_episode_to_air;if(!e?.air_date)return!1;let s=this._daysUntil(e.air_date);return s!==null&&s>0&&s<=14}get _newItems(){return this._items.filter(t=>["watching","paused"].includes(t.status)&&this._hasNewEpisode(t)).sort((t,e)=>t.title.localeCompare(e.title))}get _soonItems(){return this._items.filter(t=>this._isComingSoon(t)).sort((t,e)=>{let s=t.next_episode_to_air?.air_date||"9999",i=e.next_episode_to_air?.air_date||"9999";return s.localeCompare(i)})}get _upNextItems(){return this._items.filter(t=>t.status==="want_to_watch").sort((t,e)=>t.title.localeCompare(e.title))}get _suggestedItems(){return this._items.filter(t=>t.status==="suggested").sort((t,e)=>(e.suggestion?.suggested_at||"").localeCompare(t.suggestion?.suggested_at||""))}_itemsFor(t){return t==="new"?this._newItems:t==="soon"?this._soonItems:t==="suggested"?this._suggestedItems:this._upNextItems}render(){if(!this._config)return c;let t={new:"New",soon:"Coming Soon",upnext:"Up Next",suggested:"Suggested"},e=this._config.sections.map(i=>({id:i,label:t[i],count:this._itemsFor(i).length})),s=this._itemsFor(this._section);return l`
      <ha-card>
        <div class="card-header">
          <div class="section-pills">
            ${e.length===1?l`<span class="single-title">${this._config.title}</span>`:e.map(({id:i,label:n,count:r})=>l`
              <button
                class="pill ${this._section===i?"pill-active":""} ${r===0?"pill-empty":""}"
                @click=${()=>this._section=i}
              >
                ${n}${r>0?l`<span class="pill-count">${r}</span>`:c}
              </button>
            `)}
          </div>
          <button class="manage-btn" title="Manage watchlist" @click=${this._goToPanel}>
            <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
          </button>
        </div>

        ${s.length===0?this._renderEmpty():this._section==="suggested"?l`<div class="suggestion-list">${dt(s,i=>i.item_id,i=>this._renderSuggestion(i))}</div>`:l`<div class="poster-row">${dt(s,i=>i.item_id,i=>this._renderPoster(i))}</div>`}

        ${this._toast?l`<div class="toast">${this._toast}</div>`:c}
      </ha-card>

      ${this._detail?this._renderDetailDialog():c}
    `}_goToPanel(){history.pushState(null,"","/polr-tmdb"),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0}))}_renderEmpty(){let t={new:{icon:"mdi:check-circle-outline",heading:"All caught up!",sub:"No new episodes to watch right now."},soon:{icon:"mdi:calendar-blank-outline",heading:"Nothing coming soon",sub:"No new episodes airing in the next 2 weeks."},upnext:{icon:"mdi:playlist-play",heading:"Queue is empty",sub:"Add something to your watchlist to get started."},suggested:{icon:"mdi:lightbulb-on-outline",heading:"No suggestions right now",sub:"New ones arrive with the next weekly pass."}},{icon:e,heading:s,sub:i}=t[this._section]||t.upnext;return l`
      <div class="empty-state">
        <ha-icon class="empty-icon" .icon=${e}></ha-icon>
        <div class="empty-heading">${s}</div>
        <div class="empty-sub">${i}</div>
      </div>
    `}_renderPoster(t){let e=t.next_episode_to_air,s=this._isComingSoon(t)&&e?.air_date?this._daysUntil(e.air_date):null;return l`
      <div class="poster" @click=${()=>this._detail=t}>
        ${t.poster_path?l`<img class="poster-img" src="${t.poster_path}" alt="${t.title}" loading="lazy" />`:l`<div class="poster-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}

        ${this._hasNewEpisode(t)?l`<span class="new-badge">NEW</span>`:c}

        ${s!==null?l`
          <span class="soon-badge">${s===1?"Tomorrow":`${s}d`}</span>
        `:c}

        <div class="poster-title">${t.title}</div>
      </div>
    `}_streamingNames(t){return(t.watch_providers?.flatrate||[]).map(e=>e.provider_name)}_renderSuggestion(t){let e=[t.release_date?.slice(0,4),t.media_type==="tv"&&t.seasons?`${t.seasons} season${t.seasons===1?"":"s"}`:null,t.watch_link?.service||this._streamingNames(t)[0]].filter(Boolean).join(" \xB7 ");return l`
      <div class="suggestion">
        <div class="suggestion-poster" @click=${()=>this._detail=t}>
          ${t.poster_path?l`<img src="${t.poster_path}" alt="${t.title}" loading="lazy" />`:l`<div class="poster-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
        </div>
        <div class="suggestion-body">
          <div class="suggestion-title" @click=${()=>this._detail=t}>${t.title}</div>
          <div class="suggestion-meta">${e}</div>
          ${t.suggestion?.reason?l`<div class="suggestion-reason">${t.suggestion.reason}</div>`:c}
          ${this._dismissing===t.item_id?this._renderDismissChooser(t):l`
              <div class="suggestion-actions">
                <button class="action action-primary" @click=${()=>this._addSuggestion(t)}>
                  <ha-icon icon="mdi:playlist-plus"></ha-icon> Add
                </button>
                <button class="action" @click=${()=>this._dismissing=t.item_id}>
                  <ha-icon icon="mdi:thumb-down-outline"></ha-icon> Not for us
                </button>
                ${t.trailer_url?l`
                  <a class="action" href="${t.trailer_url}" target="_blank" rel="noopener">
                    <ha-icon icon="mdi:play-circle-outline"></ha-icon> Trailer
                  </a>`:c}
              </div>
              ${this._renderTvButtons(t)}`}
        </div>
      </div>
    `}_renderTvButtons(t){return!t.watch_link?.url||!this._config.tvs.length?c:l`
      <div class="tv-row">
        <span class="tv-label">Open on</span>
        ${this._config.tvs.map(e=>l`
          <button class="tv-btn" @click=${()=>this._openOnTv(t,e)}>
            <ha-icon icon="mdi:television-play"></ha-icon> ${this._tvName(e)}
          </button>
        `)}
      </div>
    `}_renderDismissChooser(t){return l`
      <div class="dismiss-chooser">
        <div class="dismiss-prompt">What's the reason?</div>
        <div class="dismiss-reasons">
          ${ee.map(e=>l`<button class="reason-chip" @click=${()=>this._dismiss(t,e)}>${e}</button>`)}
        </div>
        <div class="dismiss-custom">
          <input class="dismiss-input" type="text" maxlength="200" placeholder="Or say why…"
            @keydown=${e=>{e.key==="Enter"&&e.target.value.trim()&&this._dismiss(t,e.target.value.trim())}} />
          <button class="action" @click=${()=>this._dismissing=null}>Cancel</button>
        </div>
      </div>
    `}_renderProgress(t){let e=t.seasons||0,s=t.current_season||"",i=s?this._getSeasonEpisodes(t.tmdb_id,s):[],n=t.last_episode_to_air,r=t.next_episode_to_air,p=this._today(),a=i?i.filter(_=>!_.air_date||_.air_date<=p):[],u=r&&r.air_date&&r.air_date<=p,f=t.current_season||0,d=t.current_episode||0,g=r&&(r.season_number>f||r.season_number===f&&r.episode_number>d),h=t.has_new_episode||u&&g,m=t.has_new_episode?n:u&&g?r:null;return l`
      <div class="section-label">Progress ${e?`(${e} seasons)`:""}</div>

      ${h&&m?l`
        <div class="new-ep-alert">
          <strong>New:</strong> S${m.season_number}E${m.episode_number}${m.name?` \xB7 ${m.name}`:""}
        </div>
      `:c}

      ${r&&!u?l`
        <div class="upcoming-ep">Next: S${r.season_number}E${r.episode_number}${r.air_date?` \xB7 ${Xt(r.air_date)}`:""}</div>
      `:c}

      <div class="progress-row">
        <label class="select-label">
          <span>Season</span>
          <select class="ep-select" @change=${_=>{let P={current_season:parseInt(_.target.value)||null};t.status==="want_to_watch"&&(P.status="watching"),this._updateItem(t.item_id,P),this._detail={...t,...P,current_episode:null}}}>
            <option value="">—</option>
            ${Array.from({length:e},(_,v)=>v+1).map(_=>l`
              <option value="${_}" ?selected=${s===_}>Season ${_}</option>
            `)}
          </select>
        </label>
        <label class="select-label">
          <span>Episode</span>
          <select class="ep-select" ?disabled=${!s||i===null}
            @change=${_=>{let v=_.target.value?parseInt(_.target.value,10):null;v&&(this._updateItem(t.item_id,{current_episode:v}),this._detail={...t,current_episode:v})}}>
            <option value="">—</option>
            ${i===null?l`<option disabled>Loading…</option>`:a.map(_=>l`
                  <option value="${_.episode_number}" ?selected=${t.current_episode===_.episode_number}>
                    E${_.episode_number}${_.name?` \xB7 ${_.name}`:""}
                  </option>
                `)}
          </select>
        </label>
      </div>

      ${n?l`<div class="ep-latest-hint">Latest aired: S${n.season_number}E${n.episode_number}</div>`:c}
    `}_renderDetailDialog(){let t=this._detail;return l`
      <div class="dialog-overlay" @click=${e=>e.target===e.currentTarget&&(this._detail=null)}>
        <div class="dialog">
          ${t.backdrop_path?l`<div class="dialog-backdrop" style="background-image:url('${t.backdrop_path}')"></div>`:c}

          <button class="dialog-close" @click=${()=>this._detail=null}>✕</button>
          <button class="dialog-delete" title="Remove from watchlist" @click=${()=>this._removeItem(t.item_id)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>

          <div class="dialog-content">
            <div class="dialog-left">
              ${t.poster_path?l`<img class="dialog-poster" src="${t.poster_path}" alt="${t.title}" />`:c}
            </div>
            <div class="dialog-right">
              <div class="dialog-title">${t.title}</div>
              <div class="dialog-meta">
                ${[t.release_date?.slice(0,4),t.genres?.slice(0,3).join(", "),t.vote_average?`\u2605 ${t.vote_average}`:null,t.networks?.[0]].filter(Boolean).join(" \xB7 ")}
              </div>
              <p class="dialog-overview">${t.overview}</p>

              ${t.status==="suggested"?l`
                <div class="suggestion-box">
                  ${t.suggestion?.reason?l`<div><strong>Why it's here:</strong> ${t.suggestion.reason}</div>`:c}
                  ${this._dismissing===t.item_id?this._renderDismissChooser(t):l`<div class="suggestion-actions">
                        <button class="action action-primary" @click=${()=>this._addSuggestion(t)}>
                          <ha-icon icon="mdi:playlist-plus"></ha-icon> Add to Up Next
                        </button>
                        <button class="action" @click=${()=>this._dismissing=t.item_id}>
                          <ha-icon icon="mdi:thumb-down-outline"></ha-icon> Not for us
                        </button>
                      </div>`}
                </div>
              `:c}

              ${this._renderTvButtons(t)}

              <div class="section-label">Status</div>
              <div class="status-pills">
                ${["want_to_watch","watching","watched","paused"].map(e=>l`
                  <button class="status-pill ${t.status===e?"status-pill-active":""}"
                    style="${t.status===e?`background:${Dt[e]};border-color:${Dt[e]}`:""}"
                    @click=${async()=>{await this._updateItem(t.item_id,{status:e}),this._detail={...t,status:e}}}
                  >${te[e]}</button>
                `)}
              </div>

              ${t.media_type==="tv"?this._renderProgress(t):c}

              <div class="section-label">Your Rating</div>
              <div class="stars">
                ${[1,2,3,4,5,6,7,8,9,10].map(e=>l`
                  <span class="star ${(t.rating||0)>=e?"star-on":""}"
                    @click=${async()=>{await this._updateItem(t.item_id,{rating:e}),this._detail={...t,rating:e}}}>★</span>
                `)}
                ${t.rating?l`<span class="rating-num">${t.rating}/10</span>`:c}
              </div>

              <div class="section-label">Notes</div>
              <textarea class="notes" placeholder="Your notes…" .value=${t.notes||""}
                @change=${e=>{this._updateItem(t.item_id,{notes:e.target.value}),this._detail={...t,notes:e.target.value}}}></textarea>

              ${t.watch_providers&&Object.keys(t.watch_providers).length>0?l`
                <div class="section-label">Where to Watch</div>
                <div class="providers">
                  ${t.watch_providers.flatrate?.length?l`
                    <div class="provider-row">
                      <span class="provider-type">Stream</span>
                      ${t.watch_providers.flatrate.map(e=>l`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:c}
                  ${t.watch_providers.rent?.length?l`
                    <div class="provider-row">
                      <span class="provider-type">Rent</span>
                      ${t.watch_providers.rent.map(e=>l`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:c}
                  ${t.watch_providers.buy?.length?l`
                    <div class="provider-row">
                      <span class="provider-type">Buy</span>
                      ${t.watch_providers.buy.map(e=>l`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:c}
                </div>
              `:c}

              ${t.trailer_url?l`
                <div class="dialog-footer">
                  <a class="trailer-btn" href="${t.trailer_url}" target="_blank" rel="noopener">▶ Trailer</a>
                </div>
              `:c}
            </div>
          </div>
        </div>
      </div>
    `}};U(B,"properties",{_hass:{state:!0},_config:{state:!0},_items:{state:!0},_section:{state:!0},_detail:{state:!0},_dismissing:{state:!0},_toast:{state:!0}}),U(B,"styles",F`
    ha-card { display: flex; flex-direction: column; overflow: hidden; }

    .card-header { padding: 16px 16px 8px; font-size: 1.1rem; font-weight: 600; color: var(--ha-card-header-color, var(--primary-text-color)); }

    /* Section pills */
    .card-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 12px 10px 16px; }
    .section-pills { display: flex; gap: 6px; flex-wrap: wrap; }
    .manage-btn {
      background: none; border: none; cursor: pointer; padding: 4px;
      color: var(--secondary-text-color); border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      --mdc-icon-size: 26px; flex-shrink: 0;
      transition: color 0.15s;
    }
    .manage-btn:hover { color: var(--primary-color); }
    .pill {
      display: flex; align-items: center; gap: 5px;
      padding: 4px 12px; border-radius: 16px;
      border: 1px solid var(--divider-color, #555);
      background: transparent; color: var(--secondary-text-color);
      cursor: pointer; font-size: 0.78rem; white-space: nowrap; transition: all 0.15s;
    }
    .pill-active { background: var(--primary-color); border-color: var(--primary-color); color: #fff; }
    .pill-empty { opacity: 0.45; }
    .pill-count {
      background: rgba(255,255,255,0.25); color: inherit;
      border-radius: 10px; padding: 0 5px; font-size: 0.72rem; font-weight: 700; min-width: 16px; text-align: center;
    }
    .pill-active .pill-count { background: rgba(255,255,255,0.3); }
    .pill:not(.pill-active) .pill-count { background: var(--divider-color); color: var(--primary-text-color); }

    /* Horizontal poster row */
    .poster-row {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 8px; padding: 0 16px 16px;
    }

    .poster {
      position: relative; border-radius: 6px; overflow: hidden;
      cursor: pointer; background: var(--secondary-background-color, #222);
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .poster:hover { transform: scale(1.04); box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
    .poster-img { width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block; }
    .poster-fallback { width: 100%; aspect-ratio: 2/3; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; background: var(--secondary-background-color, #2a2a2a); }
    .poster-title { padding: 5px 6px; font-size: 0.72rem; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--primary-text-color); }

    .new-badge {
      position: absolute; top: 5px; right: 5px;
      background: #ff9800; border-radius: 3px;
      padding: 1px 5px; font-size: 0.58rem; font-weight: 700; color: #fff; letter-spacing: 0.5px;
    }
    .soon-badge {
      position: absolute; top: 5px; right: 5px;
      background: rgba(0,0,0,0.65); border-radius: 3px;
      padding: 1px 5px; font-size: 0.62rem; font-weight: 600; color: #fff;
    }

    .single-title { font-size: 1.05rem; font-weight: 600; }

    /* Suggestions */
    .suggestion-list { display: flex; flex-direction: column; gap: 14px; padding: 4px 16px 16px; }
    .suggestion { display: flex; gap: 12px; align-items: flex-start; }
    .suggestion-poster { flex-shrink: 0; width: 84px; border-radius: 6px; overflow: hidden; cursor: pointer; background: var(--secondary-background-color, #222); }
    .suggestion-poster img { width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block; }
    .suggestion-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
    .suggestion-title { font-weight: 600; font-size: 0.98rem; cursor: pointer; }
    .suggestion-meta { font-size: 0.75rem; color: var(--secondary-text-color); }
    .suggestion-reason { font-size: 0.84rem; line-height: 1.45; color: var(--primary-text-color); }
    .suggestion-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
    .suggestion-box { display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; line-height: 1.45; padding: 8px 10px; border-radius: 8px; margin-bottom: 6px; background: rgba(123,31,162,0.12); border: 1px solid rgba(123,31,162,0.45); }
    .action {
      display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; min-height: 32px; box-sizing: border-box;
      border-radius: 16px; border: 1px solid var(--divider-color, #555); background: transparent;
      color: var(--primary-text-color); cursor: pointer; font-size: 0.78rem; text-decoration: none; --mdc-icon-size: 16px;
    }
    .action-primary { background: var(--primary-color); border-color: var(--primary-color); color: #fff; }
    .tv-row { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 6px; }
    .tv-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--secondary-text-color); }
    .tv-btn {
      display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; min-height: 32px; box-sizing: border-box;
      border-radius: 16px; border: 1px solid var(--primary-color); background: transparent;
      color: var(--primary-color); cursor: pointer; font-size: 0.78rem; --mdc-icon-size: 16px;
    }
    .dismiss-chooser { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
    .dismiss-prompt { font-size: 0.75rem; color: var(--secondary-text-color); }
    .dismiss-reasons { display: flex; flex-wrap: wrap; gap: 6px; }
    .reason-chip { padding: 5px 10px; min-height: 30px; border-radius: 14px; border: 1px solid var(--divider-color, #555); background: transparent; color: var(--primary-text-color); cursor: pointer; font-size: 0.76rem; }
    .dismiss-custom { display: flex; gap: 6px; }
    .dismiss-input { flex: 1; min-width: 0; padding: 6px 8px; border-radius: 6px; border: 1px solid var(--divider-color, #555); background: transparent; color: var(--primary-text-color); font-size: 0.8rem; }
    .toast { margin: 0 16px 12px; padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; background: var(--secondary-background-color, #333); color: var(--primary-text-color); }

    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 32px 16px 40px; gap: 8px; text-align: center;
    }
    .empty-icon { --mdc-icon-size: 48px; color: var(--divider-color); margin-bottom: 4px; }
    .empty-heading { font-size: 1rem; font-weight: 600; color: var(--secondary-text-color); }
    .empty-sub { font-size: 0.82rem; color: var(--disabled-text-color, var(--secondary-text-color)); opacity: 0.7; max-width: 240px; line-height: 1.4; }

    /* Dialog */
    .dialog-overlay { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; padding: 16px; }
    .dialog { background: var(--card-background-color, #1e1e1e); border-radius: 12px; width: 100%; max-width: 640px; max-height: 90vh; overflow-y: auto; position: relative; }
    .dialog-backdrop { width: 100%; height: 180px; background-size: cover; background-position: center top; border-radius: 12px 12px 0 0; }
    .dialog-close { position: sticky; top: 8px; float: right; margin: 8px 8px 0 0; background: rgba(0,0,0,0.6); border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; color: #fff; font-size: 0.9rem; z-index: 1; }
    .dialog-delete { position: sticky; top: 8px; float: right; margin: 8px 8px 0 0; background: rgba(0,0,0,0.6); border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; z-index: 1; opacity: 0.6; display: flex; align-items: center; justify-content: center; --mdc-icon-size: 18px; color: #fff; }
    .dialog-delete:hover { opacity: 1; }
    .dialog-content { display: flex; gap: 14px; padding: 14px; clear: both; }
    .dialog-left { flex-shrink: 0; }
    .dialog-poster { width: 90px; border-radius: 5px; }
    .dialog-right { flex: 1; min-width: 0; }
    .dialog-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 4px; }
    .dialog-meta { font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 6px; }
    .dialog-overview { font-size: 0.82rem; line-height: 1.5; max-height: 80px; overflow-y: auto; margin: 0 0 8px; }
    .section-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--secondary-text-color); margin: 10px 0 5px; }
    .status-pills { display: flex; flex-wrap: wrap; gap: 5px; }
    .status-pill { padding: 3px 10px; border-radius: 14px; border: 1px solid var(--divider-color, #555); background: transparent; color: var(--primary-text-color); cursor: pointer; font-size: 0.75rem; }
    .status-pill-active { color: #fff; }
    .progress-row { display: flex; gap: 12px; flex-wrap: wrap; }
    .select-label { display: flex; flex-direction: column; gap: 3px; flex: 1; font-size: 0.78rem; }
    .select-label span { font-size: 0.7rem; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px; }
    .ep-select { width: 100%; padding: 5px 7px; border-radius: 5px; border: 1px solid var(--divider-color, #555); background: var(--card-background-color, #1e1e1e); color: var(--primary-text-color); font-size: 0.82rem; cursor: pointer; }
    .ep-select:disabled { opacity: 0.5; cursor: default; }
    .new-ep-alert { font-size: 0.78rem; padding: 5px 8px; border-radius: 5px; margin-bottom: 5px; background: rgba(255,152,0,0.15); border: 1px solid #ff9800; color: #ff9800; }
    .new-ep-alert strong { color: var(--primary-text-color); }
    .upcoming-ep { font-size: 0.75rem; color: var(--secondary-text-color); margin-bottom: 5px; }
    .ep-latest-hint { font-size: 0.72rem; color: var(--secondary-text-color); margin-top: 3px; }
    .stars { display: flex; align-items: center; gap: 1px; }
    .star { font-size: 1.3rem; cursor: pointer; color: var(--secondary-text-color, #555); user-select: none; }
    .star-on { color: #ffd600; }
    .rating-num { margin-left: 8px; font-size: 0.8rem; color: var(--secondary-text-color); }
    .notes { width: 100%; box-sizing: border-box; padding: 6px 8px; border-radius: 5px; border: 1px solid var(--divider-color, #555); background: transparent; color: var(--primary-text-color); font-size: 0.82rem; resize: vertical; min-height: 54px; font-family: inherit; }
    .providers { display: flex; flex-direction: column; gap: 5px; margin-bottom: 4px; }
    .provider-row { display: flex; align-items: center; gap: 6px; }
    .provider-type { font-size: 0.7rem; color: var(--secondary-text-color); min-width: 38px; text-transform: uppercase; letter-spacing: 0.4px; }
    .provider-logo { width: 30px; height: 30px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
    .dialog-footer { display: flex; margin-top: 12px; }
    .trailer-btn { padding: 5px 14px; border-radius: 16px; background: #c62828; color: #fff; text-decoration: none; font-size: 0.8rem; }
    @media (max-width: 420px) { .dialog-content { flex-direction: column; } .dialog-poster { width: 70px; } }
  `);var W=class extends y{setConfig(t){this._config=t}_valueChanged(t){let e=t.target.dataset.field,s=t.target.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,[e]:s}}}))}render(){return this._config?l`
      <div class="editor">
        <label>Title
          <input type="text" data-field="title" .value=${this._config.title||""} @change=${this._valueChanged} />
        </label>
      </div>
    `:c}};U(W,"properties",{hass:{type:Object},_config:{state:!0}}),U(W,"styles",F`
    .editor { display: flex; flex-direction: column; gap: 10px; padding: 8px; }
    label { display: flex; flex-direction: column; gap: 4px; font-size: 0.9rem; }
    input { padding: 6px; border-radius: 4px; border: 1px solid var(--divider-color, #ccc); background: transparent; color: inherit; }
  `);customElements.define("polr-tmdb-card",B);customElements.define("polr-tmdb-card-editor",W);window.customCards=window.customCards||[];window.customCards.push({type:"polr-tmdb-card",name:"TMDB Shows & Movies",description:"What to watch tonight, and what to try next.",preview:!1});
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
