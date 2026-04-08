var Ht=Object.defineProperty;var It=(r,t,e)=>t in r?Ht(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var N=(r,t,e)=>(It(r,typeof t!="symbol"?t+"":t,e),e);var V=globalThis,q=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol(),ct=new WeakMap,z=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==et)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(q&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ct.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ct.set(e,t))}return t}toString(){return this.cssText}},dt=r=>new z(typeof r=="string"?r:r+"",void 0,et),K=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new z(e,r,et)},pt=(r,t)=>{if(q)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=V.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},st=q?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return dt(e)})(r):r;var{is:Dt,defineProperty:Lt,getOwnPropertyDescriptor:jt,getOwnPropertyNames:Bt,getOwnPropertySymbols:Wt,getPrototypeOf:Vt}=Object,w=globalThis,ht=w.trustedTypes,qt=ht?ht.emptyScript:"",Kt=w.reactiveElementPolyfillSupport,R=(r,t)=>r,it={toAttribute(r,t){switch(t){case Boolean:r=r?qt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},_t=(r,t)=>!Dt(r,t),ut={attribute:!0,type:String,converter:it,reflect:!1,useDefault:!1,hasChanged:_t};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);var v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ut){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Lt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=jt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let c=i?.call(this);n?.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ut}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let t=Vt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let e=this.properties,s=[...Bt(e),...Wt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(st(i))}else t!==void 0&&e.push(st(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return pt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:it).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:it;this._$Em=i;let c=o.fromAttribute(e,n.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let o=this.constructor;if(i===!1&&(n=this[t]),s??(s=o.getPropertyOptions(t)),!((s.hasChanged??_t)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,c=this[i];o!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[R("elementProperties")]=new Map,v[R("finalized")]=new Map,Kt?.({ReactiveElement:v}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push("2.1.2");var H=globalThis,gt=r=>r,Y=H.trustedTypes,mt=Y?Y.createPolicy("lit-html",{createHTML:r=>r}):void 0,ot="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,nt="?"+x,Yt=`<${nt}>`,C=document,I=()=>C.createComment(""),D=r=>r===null||typeof r!="object"&&typeof r!="function",at=Array.isArray,yt=r=>at(r)||typeof r?.[Symbol.iterator]=="function",rt=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ft=/-->/g,$t=/>/g,E=RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vt=/'/g,xt=/"/g,wt=/^(?:script|style|textarea|title)$/i,lt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),p=lt(1),oe=lt(2),ne=lt(3),b=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),bt=new WeakMap,S=C.createTreeWalker(C,129);function At(r,t){if(!at(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return mt!==void 0?mt.createHTML(t):t}var Et=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=O;for(let c=0;c<e;c++){let a=r[c],u,f,l=-1,_=0;for(;_<a.length&&(o.lastIndex=_,f=o.exec(a),f!==null);)_=o.lastIndex,o===O?f[1]==="!--"?o=ft:f[1]!==void 0?o=$t:f[2]!==void 0?(wt.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=E):f[3]!==void 0&&(o=E):o===E?f[0]===">"?(o=i??O,l=-1):f[1]===void 0?l=-2:(l=o.lastIndex-f[2].length,u=f[1],o=f[3]===void 0?E:f[3]==='"'?xt:vt):o===xt||o===vt?o=E:o===ft||o===$t?o=O:(o=E,i=void 0);let h=o===E&&r[c+1].startsWith("/>")?" ":"";n+=o===O?a+Yt:l>=0?(s.push(u),a.slice(0,l)+ot+a.slice(l)+x+h):a+x+(l===-2?c:h)}return[At(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},L=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,c=t.length-1,a=this.parts,[u,f]=Et(t,e);if(this.el=r.createElement(u,s),S.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=S.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let l of i.getAttributeNames())if(l.endsWith(ot)){let _=f[o++],h=i.getAttribute(l).split(x),m=/([.?@])?(.*)/.exec(_);a.push({type:1,index:n,name:m[2],strings:h,ctor:m[1]==="."?J:m[1]==="?"?Q:m[1]==="@"?G:P}),i.removeAttribute(l)}else l.startsWith(x)&&(a.push({type:6,index:n}),i.removeAttribute(l));if(wt.test(i.tagName)){let l=i.textContent.split(x),_=l.length-1;if(_>0){i.textContent=Y?Y.emptyScript:"";for(let h=0;h<_;h++)i.append(l[h],I()),S.nextNode(),a.push({type:2,index:++n});i.append(l[_],I())}}}else if(i.nodeType===8)if(i.data===nt)a.push({type:2,index:n});else{let l=-1;for(;(l=i.data.indexOf(x,l+1))!==-1;)a.push({type:7,index:n}),l+=x.length-1}n++}}static createElement(t,e){let s=C.createElement("template");return s.innerHTML=t,s}};function k(r,t,e=r,s){if(t===b)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=D(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=k(r,i._$AS(r,t.values),i,s)),t}var F=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??C).importNode(e,!0);S.currentNode=i;let n=S.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new U(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new Z(n,this,t)),this._$AV.push(u),a=s[++c]}o!==a?.index&&(n=S.nextNode(),o++)}return S.currentNode=C,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},U=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=k(this,t,e),D(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):yt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=L.createElement(At(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new F(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=bt.get(t.strings);return e===void 0&&bt.set(t.strings,e=new L(t)),e}k(t){at(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(I()),this.O(I()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=gt(t).nextSibling;gt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=k(this,t,e,0),o=!D(t)||t!==this._$AH&&t!==b,o&&(this._$AH=t);else{let c=t,a,u;for(t=n[0],a=0;a<n.length-1;a++)u=k(this,c[s+a],e,a),u===b&&(u=this._$AH[a]),o||(o=!D(u)||u!==this._$AH[a]),u===d?t=d:t!==d&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}o&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends P{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},Q=class extends P{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},G=class extends P{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=k(this,t,e,0)??d)===b)return;let s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Z=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){k(this,t)}},St={M:ot,P:x,A:nt,C:1,L:Et,R:F,D:yt,V:k,I:U,H:P,N:Q,U:G,B:J,F:Z},Ft=H.litHtmlPolyfillSupport;Ft?.(L,U),(H.litHtmlVersions??(H.litHtmlVersions=[])).push("3.3.2");var Ct=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new U(t.insertBefore(I(),n),n,void 0,e??{})}return i._$AI(r),i};var j=globalThis,y=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ct(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};y._$litElement$=!0,y.finalized=!0,j.litElementHydrateSupport?.({LitElement:y});var Jt=j.litElementPolyfillSupport;Jt?.({LitElement:y});(j.litElementVersions??(j.litElementVersions=[])).push("4.2.2");var kt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Pt=r=>(...t)=>({_$litDirective$:r,values:t}),X=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Qt}=St,Tt=r=>r;var Ut=()=>document.createComment(""),M=(r,t,e)=>{let s=r._$AA.parentNode,i=t===void 0?r._$AB:t._$AA;if(e===void 0){let n=s.insertBefore(Ut(),i),o=s.insertBefore(Ut(),i);e=new Qt(n,o,r,r.options)}else{let n=e._$AB.nextSibling,o=e._$AM,c=o!==r;if(c){let a;e._$AQ?.(r),e._$AM=r,e._$AP!==void 0&&(a=r._$AU)!==o._$AU&&e._$AP(a)}if(n!==i||c){let a=e._$AA;for(;a!==n;){let u=Tt(a).nextSibling;Tt(s).insertBefore(a,i),a=u}}}return e},A=(r,t,e=r)=>(r._$AI(t,e),r),Gt={},Mt=(r,t=Gt)=>r._$AH=t,Nt=r=>r._$AH,tt=r=>{r._$AR(),r._$AA.remove()};var zt=(r,t,e)=>{let s=new Map;for(let i=t;i<=e;i++)s.set(r[i],i);return s},Rt=Pt(class extends X{constructor(r){if(super(r),r.type!==kt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let i=[],n=[],o=0;for(let c of r)i[o]=s?s(c,o):o,n[o]=e(c,o),o++;return{values:n,keys:i}}render(r,t,e){return this.dt(r,t,e).values}update(r,[t,e,s]){let i=Nt(r),{values:n,keys:o}=this.dt(t,e,s);if(!Array.isArray(i))return this.ut=o,n;let c=this.ut??(this.ut=[]),a=[],u,f,l=0,_=i.length-1,h=0,m=n.length-1;for(;l<=_&&h<=m;)if(i[l]===null)l++;else if(i[_]===null)_--;else if(c[l]===o[h])a[h]=A(i[l],n[h]),l++,h++;else if(c[_]===o[m])a[m]=A(i[_],n[m]),_--,m--;else if(c[l]===o[m])a[m]=A(i[l],n[m]),M(r,a[m+1],i[l]),l++,m--;else if(c[_]===o[h])a[h]=A(i[_],n[h]),M(r,i[l],i[_]),_--,h++;else if(u===void 0&&(u=zt(o,h,m),f=zt(c,l,_)),u.has(c[l]))if(u.has(c[_])){let g=f.get(o[h]),$=g!==void 0?i[g]:null;if($===null){let T=M(r,i[l]);A(T,n[h]),a[h]=T}else a[h]=A($,n[h]),M(r,i[l],$),i[g]=null;h++}else tt(i[_]),_--;else tt(i[l]),l++;for(;h<=m;){let g=M(r,a[m+1]);A(g,n[h]),a[h++]=g}for(;l<=_;){let g=i[l++];g!==null&&tt(g)}return this.ut=o,Mt(r,a),b}});function Zt(r){return r?new Date(r+"T12:00:00").toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):""}var Xt={want_to_watch:"Want to Watch",watching:"Watching",watched:"Watched",paused:"Paused"},Ot={want_to_watch:"#6d6d6d",watching:"#1976d2",watched:"#2e7d32",paused:"#e65100"},B=class extends y{constructor(){super(),this._items=[],this._section="new",this._detail=null,this._loaded=!1,this._unsubEvents=null,this._seasonCache={}}static getConfigElement(){return document.createElement("polr-tmdb-card-editor")}static getStubConfig(){return{title:"Watch Tonight"}}setConfig(t){this._config={title:"Watch Tonight",...t}}set hass(t){this._hass=t,this._loaded||(this._loaded=!0,this._loadItems(),this._subscribeEvents())}disconnectedCallback(){super.disconnectedCallback(),this._unsubEvents&&this._unsubEvents.then(t=>t&&t())}async _loadItems(){try{this._items=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/items"})||[]}catch(t){console.error("polr-tmdb-card: load failed",t)}}async _subscribeEvents(){this._unsubEvents=this._hass.connection.subscribeEvents(t=>{this._loadItems(),this._detail&&t.data.item?.item_id===this._detail.item_id&&(this._detail=t.data.action==="remove"?null:t.data.item)},"polr_tmdb_updated")}async _updateItem(t,e){let s=Object.fromEntries(Object.entries(e).filter(([,i])=>i!=null));try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/update",item_id:t,...s})}catch(i){console.error("polr-tmdb-card: update failed",i)}}async _removeItem(t){if(confirm("Remove from watchlist?"))try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/remove",item_id:t})}catch(e){console.error("polr-tmdb-card: remove failed",e)}}async _fetchSeasonEpisodes(t,e){let s=`${t}:${e}`;if(!this._seasonCache[s])try{let i=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/season",tmdb_id:t,season_number:e});this._seasonCache[s]=i||[],this.requestUpdate()}catch(i){console.error("season fetch",i)}}_getSeasonEpisodes(t,e){if(!e)return[];let s=`${t}:${e}`;return this._seasonCache[s]?this._seasonCache[s]:(this._fetchSeasonEpisodes(t,e),null)}_today(){let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}_hasNewEpisode(t){if(t.status==="watched")return!1;if(t.has_new_episode)return!0;let e=t.next_episode_to_air;if(!e?.air_date||e.air_date>this._today())return!1;let s=t.current_season||0,i=t.current_episode||0;return s===0&&i===0?!0:e.season_number>s||e.season_number===s&&e.episode_number>i}_daysUntil(t){if(!t)return null;let e=new Date(t+"T12:00:00")-new Date;return Math.ceil(e/864e5)}_isComingSoon(t){if(t.media_type!=="tv"||t.status!=="watching"||this._hasNewEpisode(t))return!1;let e=t.next_episode_to_air;if(!e?.air_date)return!1;let s=this._daysUntil(e.air_date);return s!==null&&s>0&&s<=14}get _newItems(){return this._items.filter(t=>t.status!=="watched"&&this._hasNewEpisode(t)).sort((t,e)=>t.title.localeCompare(e.title))}get _soonItems(){return this._items.filter(t=>this._isComingSoon(t)).sort((t,e)=>{let s=t.next_episode_to_air?.air_date||"9999",i=e.next_episode_to_air?.air_date||"9999";return s.localeCompare(i)})}get _upNextItems(){return this._items.filter(t=>t.status==="want_to_watch").sort((t,e)=>t.title.localeCompare(e.title))}get _activeItems(){return this._section==="new"?this._newItems:this._section==="soon"?this._soonItems:this._upNextItems}render(){if(!this._config)return d;let t=this._newItems,e=this._soonItems,s=this._upNextItems,i=this._activeItems,n=[{id:"new",label:"New",count:t.length},{id:"soon",label:"Coming Soon",count:e.length},{id:"upnext",label:"Up Next",count:s.length}];return p`
      <ha-card>
        <div class="card-header">
          <div class="section-pills">
            ${n.map(({id:o,label:c,count:a})=>p`
              <button
                class="pill ${this._section===o?"pill-active":""} ${a===0?"pill-empty":""}"
                @click=${()=>this._section=o}
              >
                ${c}${a>0?p`<span class="pill-count">${a}</span>`:d}
              </button>
            `)}
          </div>
          <button class="manage-btn" title="Manage watchlist" @click=${this._goToPanel}>
            <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
          </button>
        </div>

        ${i.length===0?this._renderEmpty():p`<div class="poster-row">${Rt(i,o=>o.item_id,o=>this._renderPoster(o))}</div>`}
      </ha-card>

      ${this._detail?this._renderDetailDialog():d}
    `}_goToPanel(){history.pushState(null,"","/polr-tmdb"),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0}))}_renderEmpty(){let t={new:{icon:"mdi:check-circle-outline",heading:"All caught up!",sub:"No new episodes to watch right now."},soon:{icon:"mdi:calendar-blank-outline",heading:"Nothing coming soon",sub:"No new episodes airing in the next 2 weeks."},upnext:{icon:"mdi:playlist-play",heading:"Queue is empty",sub:"Add something to your watchlist to get started."}},{icon:e,heading:s,sub:i}=t[this._section]||t.upnext;return p`
      <div class="empty-state">
        <ha-icon class="empty-icon" .icon=${e}></ha-icon>
        <div class="empty-heading">${s}</div>
        <div class="empty-sub">${i}</div>
      </div>
    `}_renderPoster(t){let e=t.next_episode_to_air,s=this._isComingSoon(t)&&e?.air_date?this._daysUntil(e.air_date):null;return p`
      <div class="poster" @click=${()=>this._detail=t}>
        ${t.poster_path?p`<img class="poster-img" src="${t.poster_path}" alt="${t.title}" loading="lazy" />`:p`<div class="poster-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}

        ${this._hasNewEpisode(t)?p`<span class="new-badge">NEW</span>`:d}

        ${s!==null?p`
          <span class="soon-badge">${s===1?"Tomorrow":`${s}d`}</span>
        `:d}

        <div class="poster-title">${t.title}</div>
      </div>
    `}_renderProgress(t){let e=t.seasons||0,s=t.current_season||"",i=s?this._getSeasonEpisodes(t.tmdb_id,s):[],n=t.last_episode_to_air,o=t.next_episode_to_air,c=this._today(),a=i?i.filter(g=>!g.air_date||g.air_date<=c):[],u=o&&o.air_date&&o.air_date<=c,f=t.current_season||0,l=t.current_episode||0,_=o&&(o.season_number>f||o.season_number===f&&o.episode_number>l),h=t.has_new_episode||u&&_,m=t.has_new_episode?n:u&&_?o:null;return p`
      <div class="section-label">Progress ${e?`(${e} seasons)`:""}</div>

      ${h&&m?p`
        <div class="new-ep-alert">
          <strong>New:</strong> S${m.season_number}E${m.episode_number}${m.name?` \xB7 ${m.name}`:""}
        </div>
      `:d}

      ${o&&!u?p`
        <div class="upcoming-ep">Next: S${o.season_number}E${o.episode_number}${o.air_date?` \xB7 ${Zt(o.air_date)}`:""}</div>
      `:d}

      <div class="progress-row">
        <label class="select-label">
          <span>Season</span>
          <select class="ep-select" @change=${g=>{let T={current_season:parseInt(g.target.value)||null};t.status==="want_to_watch"&&(T.status="watching"),this._updateItem(t.item_id,T),this._detail={...t,...T,current_episode:null}}}>
            <option value="">—</option>
            ${Array.from({length:e},(g,$)=>$+1).map(g=>p`
              <option value="${g}" ?selected=${s===g}>Season ${g}</option>
            `)}
          </select>
        </label>
        <label class="select-label">
          <span>Episode</span>
          <select class="ep-select" ?disabled=${!s||i===null}
            @change=${g=>{let $=g.target.value?parseInt(g.target.value,10):null;$&&(this._updateItem(t.item_id,{current_episode:$}),this._detail={...t,current_episode:$})}}>
            <option value="">—</option>
            ${i===null?p`<option disabled>Loading…</option>`:a.map(g=>p`
                  <option value="${g.episode_number}" ?selected=${t.current_episode===g.episode_number}>
                    E${g.episode_number}${g.name?` \xB7 ${g.name}`:""}
                  </option>
                `)}
          </select>
        </label>
      </div>

      ${n?p`<div class="ep-latest-hint">Latest aired: S${n.season_number}E${n.episode_number}</div>`:d}
    `}_renderDetailDialog(){let t=this._detail;return p`
      <div class="dialog-overlay" @click=${e=>e.target===e.currentTarget&&(this._detail=null)}>
        <div class="dialog">
          ${t.backdrop_path?p`<div class="dialog-backdrop" style="background-image:url('${t.backdrop_path}')"></div>`:d}

          <button class="dialog-close" @click=${()=>this._detail=null}>✕</button>
          <button class="dialog-delete" title="Remove from watchlist" @click=${()=>this._removeItem(t.item_id)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>

          <div class="dialog-content">
            <div class="dialog-left">
              ${t.poster_path?p`<img class="dialog-poster" src="${t.poster_path}" alt="${t.title}" />`:d}
            </div>
            <div class="dialog-right">
              <div class="dialog-title">${t.title}</div>
              <div class="dialog-meta">
                ${[t.release_date?.slice(0,4),t.genres?.slice(0,3).join(", "),t.vote_average?`\u2605 ${t.vote_average}`:null,t.networks?.[0]].filter(Boolean).join(" \xB7 ")}
              </div>
              <p class="dialog-overview">${t.overview}</p>

              <div class="section-label">Status</div>
              <div class="status-pills">
                ${["want_to_watch","watching","watched","paused"].map(e=>p`
                  <button class="status-pill ${t.status===e?"status-pill-active":""}"
                    style="${t.status===e?`background:${Ot[e]};border-color:${Ot[e]}`:""}"
                    @click=${async()=>{await this._updateItem(t.item_id,{status:e}),this._detail={...t,status:e}}}
                  >${Xt[e]}</button>
                `)}
              </div>

              ${t.media_type==="tv"?this._renderProgress(t):d}

              <div class="section-label">Your Rating</div>
              <div class="stars">
                ${[1,2,3,4,5,6,7,8,9,10].map(e=>p`
                  <span class="star ${(t.rating||0)>=e?"star-on":""}"
                    @click=${async()=>{await this._updateItem(t.item_id,{rating:e}),this._detail={...t,rating:e}}}>★</span>
                `)}
                ${t.rating?p`<span class="rating-num">${t.rating}/10</span>`:d}
              </div>

              <div class="section-label">Notes</div>
              <textarea class="notes" placeholder="Your notes…" .value=${t.notes||""}
                @change=${e=>{this._updateItem(t.item_id,{notes:e.target.value}),this._detail={...t,notes:e.target.value}}}></textarea>

              ${t.watch_providers&&Object.keys(t.watch_providers).length>0?p`
                <div class="section-label">Where to Watch</div>
                <div class="providers">
                  ${t.watch_providers.flatrate?.length?p`
                    <div class="provider-row">
                      <span class="provider-type">Stream</span>
                      ${t.watch_providers.flatrate.map(e=>p`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:d}
                  ${t.watch_providers.rent?.length?p`
                    <div class="provider-row">
                      <span class="provider-type">Rent</span>
                      ${t.watch_providers.rent.map(e=>p`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:d}
                  ${t.watch_providers.buy?.length?p`
                    <div class="provider-row">
                      <span class="provider-type">Buy</span>
                      ${t.watch_providers.buy.map(e=>p`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:d}
                </div>
              `:d}

              ${t.trailer_url?p`
                <div class="dialog-footer">
                  <a class="trailer-btn" href="${t.trailer_url}" target="_blank" rel="noopener">▶ Trailer</a>
                </div>
              `:d}
            </div>
          </div>
        </div>
      </div>
    `}};N(B,"properties",{_hass:{state:!0},_config:{state:!0},_items:{state:!0},_section:{state:!0},_detail:{state:!0}}),N(B,"styles",K`
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
  `);var W=class extends y{setConfig(t){this._config=t}_valueChanged(t){let e=t.target.dataset.field,s=t.target.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,[e]:s}}}))}render(){return this._config?p`
      <div class="editor">
        <label>Title
          <input type="text" data-field="title" .value=${this._config.title||""} @change=${this._valueChanged} />
        </label>
      </div>
    `:d}};N(W,"properties",{hass:{type:Object},_config:{state:!0}}),N(W,"styles",K`
    .editor { display: flex; flex-direction: column; gap: 10px; padding: 8px; }
    label { display: flex; flex-direction: column; gap: 4px; font-size: 0.9rem; }
    input { padding: 6px; border-radius: 4px; border: 1px solid var(--divider-color, #ccc); background: transparent; color: inherit; }
  `);customElements.define("polr-tmdb-card",B);customElements.define("polr-tmdb-card-editor",W);window.customCards=window.customCards||[];window.customCards.push({type:"polr-tmdb-card",name:"TMDB Shows & Movies",description:"What to watch tonight.",preview:!1});
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
