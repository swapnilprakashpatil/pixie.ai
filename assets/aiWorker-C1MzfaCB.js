var On=Object.defineProperty,pm=Object.getOwnPropertyDescriptor,cm=Object.getOwnPropertyNames,fm=Object.prototype.hasOwnProperty,hm=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,i)=>(typeof require<"u"?require:t)[i]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),q=(e,t)=>()=>(e&&(t=e(e=0)),t),qt=(e,t)=>{for(var i in t)On(e,i,{get:t[i],enumerable:!0})},mm=(e,t,i,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of cm(t))!fm.call(e,n)&&n!==i&&On(e,n,{get:()=>t[n],enumerable:!(r=pm(t,n))||r.enumerable});return e},dr=e=>mm(On({},"__esModule",{value:!0}),e),Kt,ct,Dt,$s,id,nd=q(()=>{Kt=new Map,ct=[],Dt=(e,t,i)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=Kt.get(e);if(r===void 0)Kt.set(e,{backend:t,priority:i});else{if(r.priority>i)return;if(r.priority===i&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${i}`)}if(i>=0){let n=ct.indexOf(e);n!==-1&&ct.splice(n,1);for(let s=0;s<ct.length;s++)if(Kt.get(ct[s]).priority<=i){ct.splice(s,0,e);return}ct.push(e)}return}throw new TypeError("not a valid backend")},$s=async e=>{let t=Kt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let i=!!t.initPromise;try{return i||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return i||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},id=async e=>{let t=e.executionProviders||[],i=t.map(l=>typeof l=="string"?l:l.name),r=i.length===0?ct:i,n,s=[],a=new Set;for(let l of r){let d=await $s(l);typeof d=="string"?s.push({name:l,err:d}):(n||(n=d),n===d&&a.add(l))}if(!n)throw new Error(`no available backend found. ERR: ${s.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:d}of s)i.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);let o=t.filter(l=>a.has(typeof l=="string"?l:l.name));return[n,new Proxy(e,{get:(l,d)=>d==="executionProviders"?o:Reflect.get(l,d)})]}}),gm=q(()=>{nd()}),ad,ym=q(()=>{ad="1.23.2"}),_i,Ie,sd=q(()=>{ym(),_i="warning",Ie={wasm:{},webgl:{},webgpu:{},versions:{common:ad},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);_i=e}},get logLevel(){return _i}},Object.defineProperty(Ie,"logLevel",{enumerable:!0})}),_e,_m=q(()=>{sd(),_e=Ie}),od,ld,bm=q(()=>{od=(e,t)=>{let i=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);i.width=e.dims[3],i.height=e.dims[2];let r=i.getContext("2d");if(r!=null){let n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],s=e.dims[3]):(n=e.dims[3],s=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",o=t?.norm,l,d;o===void 0||o.mean===void 0?l=[255,255,255,255]:typeof o.mean=="number"?l=[o.mean,o.mean,o.mean,o.mean]:(l=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(l[3]=o.mean[3])),o===void 0||o.bias===void 0?d=[0,0,0,0]:typeof o.bias=="number"?d=[o.bias,o.bias,o.bias,o.bias]:(d=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(d[3]=o.bias[3]));let p=s*n,f=0,h=p,g=p*2,_=-1;a==="RGBA"?(f=0,h=p,g=p*2,_=p*3):a==="RGB"?(f=0,h=p,g=p*2):a==="RBG"&&(f=0,g=p,h=p*2);for(let y=0;y<s;y++)for(let k=0;k<n;k++){let $=(e.data[f++]-d[0])*l[0],w=(e.data[h++]-d[1])*l[1],C=(e.data[g++]-d[2])*l[2],x=_===-1?255:(e.data[_++]-d[3])*l[3];r.fillStyle="rgba("+$+","+w+","+C+","+x+")",r.fillRect(k,y,1,1)}if("toDataURL"in i)return i.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},ld=(e,t)=>{let i=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(i!=null){let n,s,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],s=e.dims[1],a=e.dims[3]):(n=e.dims[3],s=e.dims[2],a=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,d,p;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?p=[0,0,0,0]:typeof l.bias=="number"?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(p[3]=l.bias[3]));let f=s*n;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,g=0,_=1,y=2,k=3,$=0,w=f,C=f*2,x=-1;o==="RGBA"?($=0,w=f,C=f*2,x=f*3):o==="RGB"?($=0,w=f,C=f*2):o==="RBG"&&($=0,C=f,w=f*2),r=i.createImageData(n,s);for(let S=0;S<s*n;g+=h,_+=h,y+=h,k+=h,S++)r.data[g]=(e.data[$++]-p[0])*d[0],r.data[_]=(e.data[w++]-p[1])*d[1],r.data[y]=(e.data[C++]-p[2])*d[2],r.data[k]=x===-1?255:(e.data[x++]-p[3])*d[3]}else throw new Error("Can not access image data");return r}}),xr,ud,dd,pd,cd,fd,wm=q(()=>{Rn(),xr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:i,width:r}=t,n=t.norm??{mean:255,bias:0},s,a;typeof n.mean=="number"?s=[n.mean,n.mean,n.mean,n.mean]:s=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?a=[n.bias,n.bias,n.bias,n.bias]:a=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=i*r,p=l==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),f=4,h=0,g=1,_=2,y=3,k=0,$=d,w=d*2,C=-1;o==="RGB"&&(f=3,h=0,g=1,_=2,y=-1),l==="RGBA"?C=d*3:l==="RBG"?(k=0,w=d,$=d*2):l==="BGR"&&(w=0,$=d,k=d*2);for(let x=0;x<d;x++,h+=f,_+=f,g+=f,y+=f)p[k++]=(e[h]+a[0])/s[0],p[$++]=(e[g]+a[1])/s[1],p[w++]=(e[_]+a[2])/s[2],C!==-1&&y!==-1&&(p[C++]=(e[y]+a[3])/s[3]);return l==="RGBA"?new Be("float32",p,[1,4,i,r]):new Be("float32",p,[1,3,i,r])},ud=async(e,t)=>{let i=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",a,o=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=p=>typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||p instanceof OffscreenCanvas?p.getContext("2d"):null;if(i){let p=l();p.width=e.width,p.height=e.height;let f=d(p);if(f!=null){let h=e.height,g=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,g=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=h,o.width=g}else o.tensorFormat="RGBA",o.height=h,o.width=g;f.drawImage(e,0,0),a=f.getImageData(0,0,g,h).data}else throw new Error("Can not access image data")}else if(r){let p,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(p=t.resizedHeight,f=t.resizedWidth):(p=e.height,f=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=p,o.width=f,t!==void 0){let h=l();h.width=f,h.height=p;let g=d(h);if(g!=null)g.putImageData(e,0,0),a=g.getImageData(0,0,f,p).data;else throw new Error("Can not access image data")}else a=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let p=l();p.width=e.width,p.height=e.height;let f=d(p);if(f!=null){let h=e.height,g=e.width;return f.drawImage(e,0,0,g,h),a=f.getImageData(0,0,g,h).data,o.height=h,o.width=g,xr(a,o)}else throw new Error("Can not access image data")}else{if(s)return new Promise((p,f)=>{let h=l(),g=d(h);if(!e||!g)return f();let _=new Image;_.crossOrigin="Anonymous",_.src=e,_.onload=()=>{h.width=_.width,h.height=_.height,g.drawImage(_,0,0,h.width,h.height);let y=g.getImageData(0,0,h.width,h.height);o.height=h.height,o.width=h.width,p(xr(y.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return xr(a,o);throw new Error("Input data provided is not supported - aborted tensor creation")},dd=(e,t)=>{let{width:i,height:r,download:n,dispose:s}=t,a=[1,r,i,4];return new Be({location:"texture",type:"float32",texture:e,dims:a,download:n,dispose:s})},pd=(e,t)=>{let{dataType:i,dims:r,download:n,dispose:s}=t;return new Be({location:"gpu-buffer",type:i??"float32",gpuBuffer:e,dims:r,download:n,dispose:s})},cd=(e,t)=>{let{dataType:i,dims:r,download:n,dispose:s}=t;return new Be({location:"ml-tensor",type:i??"float32",mlTensor:e,dims:r,download:n,dispose:s})},fd=(e,t,i)=>new Be({location:"cpu-pinned",type:e,data:t,dims:i??[t.length]})}),kt,ar,bi,hd,$m=q(()=>{kt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),ar=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),bi=!1,hd=()=>{if(!bi){bi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,i=globalThis.Float16Array,r=typeof i<"u"&&i.from;e&&(kt.set("int64",BigInt64Array),ar.set(BigInt64Array,"int64")),t&&(kt.set("uint64",BigUint64Array),ar.set(BigUint64Array,"uint64")),r?(kt.set("float16",i),ar.set(i,"float16")):kt.set("float16",Uint16Array)}}}),md,gd,vm=q(()=>{Rn(),md=e=>{let t=1;for(let i=0;i<e.length;i++){let r=e[i];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${i}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${i}] must be a non-negative integer, got: ${r}`);t*=r}return t},gd=(e,t)=>{switch(e.location){case"cpu":return new Be(e.type,e.data,t);case"cpu-pinned":return new Be({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Be({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Be({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Be({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Be,Rn=q(()=>{bm(),wm(),$m(),vm(),Be=class{constructor(e,t,i){hd();let r,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,r=e.type,n=e.dims,e.location){case"cpu-pinned":{let a=kt.get(r);if(!a)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=e.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint64"&&r!=="int8"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,o;if(typeof e=="string")if(r=e,o=i,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");a=t}else{let l=kt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?a=l.from(t,BigInt):a=l.from(t)}else if(t instanceof l)a=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")a=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)a=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${l}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")r="string",a=e;else if(l==="boolean")r="bool",a=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",a=Uint8Array.from(e);else{let l=ar.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=l,a=e}if(o===void 0)o=[a.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");n=o,this.cpuData=a,this.dataLocation="cpu"}let s=md(n);if(this.cpuData&&s!==this.cpuData.length&&!((r==="uint4"||r==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=n,this.size=s}static async fromImage(e,t){return ud(e,t)}static fromTexture(e,t){return dd(e,t)}static fromGpuBuffer(e,t){return pd(e,t)}static fromMLTensor(e,t){return cd(e,t)}static fromPinnedBuffer(e,t,i){return fd(e,t,i)}toDataURL(e){return od(this,e)}toImageData(e){return ld(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return gd(this,e)}}}),Fe,yd=q(()=>{Rn(),Fe=Be}),Pr,wi,Je,Ke,Tt,It,_d=q(()=>{sd(),Pr=(e,t)=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||console.timeStamp(`${e}::ORT::${t}`)},wi=(e,t)=>{let i=new Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let n=0;n<i.length;n++){if(r&&!i[n].includes("TRACE_FUNC")){let s=`FUNC_${e}::${i[n].trim().split(" ")[1]}`;t&&(s+=`::${t}`),Pr("CPU",s);return}i[n].includes("TRACE_FUNC")&&(r=!0)}},Je=e=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||wi("BEGIN",e)},Ke=e=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||wi("END",e)},Tt=e=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||console.time(`ORT::${e}`)},It=e=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||console.timeEnd(`ORT::${e}`)}}),bd,xm=q(()=>{nd(),yd(),_d(),bd=class wd{constructor(t){this.handler=t}async run(t,i,r){Je(),Tt("InferenceSession.run");let n={},s={};if(typeof t!="object"||t===null||t instanceof Fe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof i=="object"){if(i===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(i instanceof Fe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(i)){if(i.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let d of i){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);n[d]=null}if(typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,p=Object.getOwnPropertyNames(i);for(let f of this.outputNames)if(p.indexOf(f)!==-1){let h=i[f];(h===null||h instanceof Fe)&&(d=!0,a=!1,n[f]=h)}if(d){if(typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else s=i}}else if(typeof i<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(a)for(let d of this.outputNames)n[d]=null;let o=await this.handler.run(t,n,s),l={};for(let d in o)if(Object.hasOwnProperty.call(o,d)){let p=o[d];p instanceof Fe?l[d]=p:l[d]=new Fe(p.type,p.data,p.dims)}return It("InferenceSession.run"),Ke(),l}async release(){return this.handler.dispose()}static async create(t,i,r,n){Je(),Tt("InferenceSession.create");let s,a={};if(typeof t=="string"){if(s=t,typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let p=t,f=0,h=t.byteLength;if(typeof i=="object"&&i!==null)a=i;else if(typeof i=="number"){if(f=i,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=p.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${p.byteLength}).`);if(h=t.byteLength-f,typeof r=="number"){if(h=r,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||f+h>p.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${p.byteLength-f}].`);if(typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof i<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(p,f,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,l]=await id(a),d=await o.createInferenceSessionHandler(s,l);return It("InferenceSession.create"),Ke(),new wd(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Bn,km=q(()=>{xm(),Bn=bd}),Cm=q(()=>{}),Sm=q(()=>{}),Tm=q(()=>{}),Im=q(()=>{}),Em={};qt(Em,{InferenceSession:()=>Bn,TRACE:()=>Pr,TRACE_EVENT_BEGIN:()=>Tt,TRACE_EVENT_END:()=>It,TRACE_FUNC_BEGIN:()=>Je,TRACE_FUNC_END:()=>Ke,Tensor:()=>Fe,env:()=>_e,registerBackend:()=>Dt});var Ue=q(()=>{gm(),_m(),km(),yd(),Cm(),Sm(),_d(),Tm(),Im()}),Dn=q(()=>{}),$d={};qt($d,{default:()=>vd});var $i,vi,vd,Mm=q(()=>{If(),At(),Nn(),$i="ort-wasm-proxy-worker",vi=globalThis.self?.name===$i,vi&&(self.onmessage=e=>{let{type:t,in:i}=e.data;try{switch(t){case"init-wasm":Pn(i.wasm).then(()=>{ta(i).then(()=>{postMessage({type:t})},r=>{postMessage({type:t,err:r})})},r=>{postMessage({type:t,err:r})});break;case"init-ep":{let{epName:r,env:n}=i;ra(n,r).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:r}=i,n=jr(r);postMessage({type:t,out:n});break}case"create":{let{model:r,options:n}=i;ia(r,n).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":na(i),postMessage({type:t});break;case"run":{let{sessionId:r,inputIndices:n,inputs:s,outputIndices:a,options:o}=i;aa(r,n,s,a,new Array(a.length).fill(null),o).then(l=>{l.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},oa([...s,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":sa(i),postMessage({type:t});break;default:}}catch(r){postMessage({type:t,err:r})}}),vd=vi?null:e=>new Worker(e??Re,{type:"module",name:$i})}),xd={};qt(xd,{default:()=>kd});var xi,kd,vs,zm=q(()=>{xi=async function(e={}){var t,i,r=e,n=new Promise((u,c)=>{t=u,i=c}),s=typeof window=="object",a=typeof WorkerGlobalScope<"u",o=a&&self.name?.startsWith("em-pthread");r.mountExternalData=(u,c)=>{u.startsWith("./")&&(u=u.substring(2)),(r.Fb||(r.Fb=new Map)).set(u,c)},r.unmountExternalData=()=>{delete r.Fb};var l=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let d=u=>async(...c)=>{try{if(r.Gb)throw Error("Session already started");let m=r.Gb={ec:c[0],errors:[]},b=await u(...c);if(r.Gb!==m)throw Error("Session mismatch");r.Kb?.flush();let v=m.errors;if(0<v.length){let T=await Promise.all(v);if(T=T.filter(M=>M),0<T.length)throw Error(T.join(`
`))}return b}finally{r.Gb=null}};r.jsepInit=(u,c)=>{if(u==="webgpu"){[r.Kb,r.Vb,r.Zb,r.Lb,r.Yb,r.Ab,r.$b,r.bc,r.Wb,r.Xb,r.ac]=c;let m=r.Kb;r.jsepRegisterBuffer=(b,v,T,M)=>m.registerBuffer(b,v,T,M),r.jsepGetBuffer=b=>m.getBuffer(b),r.jsepCreateDownloader=(b,v,T)=>m.createDownloader(b,v,T),r.jsepOnCreateSession=b=>{m.onCreateSession(b)},r.jsepOnReleaseSession=b=>{m.onReleaseSession(b)},r.jsepOnRunStart=b=>m.onRunStart(b),r.cc=(b,v)=>{m.upload(b,v)}}else if(u==="webnn"){let m=c[0];[r.oc,r.Ob,r.webnnEnsureTensor,r.Pb,r.webnnDownloadTensor,r.nc,r.webnnEnableTraceEvent]=c.slice(1),r.webnnReleaseTensorId=r.Ob,r.webnnUploadTensor=r.Pb,r.webnnRegisterMLContext=r.nc,r.webnnOnRunStart=b=>m.onRunStart(b),r.webnnOnRunEnd=m.onRunEnd.bind(m),r.webnnOnReleaseSession=b=>{m.onReleaseSession(b)},r.webnnCreateMLTensorDownloader=(b,v)=>m.createMLTensorDownloader(b,v),r.webnnRegisterMLTensor=(b,v,T,M)=>m.registerMLTensor(b,v,T,M),r.webnnCreateMLContext=b=>m.createMLContext(b),r.webnnRegisterMLConstant=(b,v,T,M,O,P)=>m.registerMLConstant(b,v,T,M,O,r.Fb,P),r.webnnRegisterGraphInput=m.registerGraphInput.bind(m),r.webnnIsGraphInput=m.isGraphInput.bind(m),r.webnnRegisterGraphOutput=m.registerGraphOutput.bind(m),r.webnnIsGraphOutput=m.isGraphOutput.bind(m),r.webnnCreateTemporaryTensor=m.createTemporaryTensor.bind(m),r.webnnIsGraphInputOutputTypeSupported=m.isGraphInputOutputTypeSupported.bind(m)}};let p=()=>{let u=(c,m,b)=>(...v)=>{let T=Ze,M=m?.();v=c(...v);let O=m?.();return M!==O&&(c=O,b(M),m=b=null),Ze!=T?new Promise((P,G)=>{oi={resolve:P,reject:G}}):v};(()=>{for(let c of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])r[c]=u(r[c],()=>r[c],m=>r[c]=m)})(),d!==void 0&&(r._OrtRun=d(r._OrtRun),r._OrtRunWithBinding=d(r._OrtRunWithBinding)),p=void 0};r.asyncInit=()=>{p?.()};var f,h,g=(u,c)=>{throw c},_=import.meta.url,y="";if(s||a){try{y=new URL(".",_).href}catch{}a&&(h=u=>{var c=new XMLHttpRequest;return c.open("GET",u,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),f=async u=>{if(fe(u))return new Promise((m,b)=>{var v=new XMLHttpRequest;v.open("GET",u,!0),v.responseType="arraybuffer",v.onload=()=>{v.status==200||v.status==0&&v.response?m(v.response):b(v.status)},v.onerror=b,v.send(null)});var c=await fetch(u,{credentials:"same-origin"});if(c.ok)return c.arrayBuffer();throw Error(c.status+" : "+c.url)}}var k,$,w,C,x,S,I,E,z,D,W,H,Y,F,V,te=console.log.bind(console),X=console.error.bind(console),j=te,ae=X,K=!1,fe=u=>u.startsWith("file://");function U(){return $.buffer!=x.buffer&&ke(),x}function L(){return $.buffer!=x.buffer&&ke(),S}function re(){return $.buffer!=x.buffer&&ke(),I}function pe(){return $.buffer!=x.buffer&&ke(),E}function N(){return $.buffer!=x.buffer&&ke(),z}function ue(){return $.buffer!=x.buffer&&ke(),D}function Ye(){return $.buffer!=x.buffer&&ke(),W}function be(){return $.buffer!=x.buffer&&ke(),F}if(o){let u=function(c){try{var m=c.data,b=m.Db;if(b==="load"){let v=[];self.onmessage=T=>v.push(T),self.startWorker=()=>{postMessage({Db:"loaded"});for(let T of v)u(T);self.onmessage=u};for(let T of m.Sb)r[T]&&!r[T].proxy||(r[T]=(...M)=>{postMessage({Db:"callHandler",Rb:T,args:M})},T=="print"&&(j=r[T]),T=="printErr"&&(ae=r[T]));$=m.kc,ke(),V(m.lc)}else if(b==="run"){jf(m.Bb),fi(m.Bb,0,0,1,0,0),ya(),ai(m.Bb),we||(us(),we=!0);try{Hf(m.hc,m.Jb)}catch(v){if(v!="unwind")throw v}}else m.target!=="setimmediate"&&(b==="checkMailbox"?we&&fr():b&&(ae(`worker: received unknown command ${b}`),ae(m)))}catch(v){throw ds(),v}};var we=!1;self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=u}function ke(){var u=$.buffer;r.HEAP8=x=new Int8Array(u),I=new Int16Array(u),r.HEAPU8=S=new Uint8Array(u),E=new Uint16Array(u),r.HEAP32=z=new Int32Array(u),r.HEAPU32=D=new Uint32Array(u),W=new Float32Array(u),F=new Float64Array(u),H=new BigInt64Array(u),Y=new BigUint64Array(u)}function cr(){o?startWorker(r):R.Da()}var Wt,Lt=0,Vt=null;function da(){if(--Lt==0&&Vt){var u=Vt;Vt=null,u()}}function ot(u){throw ae(u="Aborted("+u+")"),K=!0,u=new WebAssembly.RuntimeError(u+". Build with -sASSERTIONS for more info."),i(u),u}function pa(){return{a:{L:um,Aa:lm,b:Kf,$:$a,A:ka,pa:Ca,X:Sa,Z:Ta,qa:Ia,na:Ea,ga:Ma,ma:za,J:Aa,Y:Oa,V:Ra,oa:Ba,W:Da,va:Yf,E:Xf,Q:Zf,O:Jf,D:th,v:rh,s:ih,P:nh,z:ph,R:ch,ja:fh,T:hh,aa:mh,M:gh,F:yh,ia:ai,sa:_h,r:bh,Ca:wh,w:xh,o:kh,m:Sh,c:ti,Ba:Th,n:Ih,j:zh,u:Ah,p:Oh,f:Rh,t:Bh,l:Dh,e:Nh,k:Ph,h:Uh,g:qh,d:Wh,da:Lh,ea:Vh,fa:Gh,ba:Ya,ca:Xa,N:Za,xa:Hh,ua:Kh,i:Yh,C:Xh,G:Zh,ta:Fh,x:Qh,ra:Jh,U:em,q:jh,y:tm,K:rm,S:im,za:nm,ya:am,ka:ts,la:rs,_:Zr,B:is,I:ns,ha:as,H:ss,a:$,wa:Xr}}}class Kr{name="ExitStatus";constructor(c){this.message=`Program terminated with exit(${c})`,this.status=c}}var ca=u=>{u.terminate(),u.onmessage=()=>{}},Yr=[],fa=u=>{ut.length==0&&(ba(),_a(ut[0]));var c=ut.pop();if(!c)return 6;Gt.push(c),yt[u.Bb]=c,c.Bb=u.Bb;var m={Db:"run",hc:u.fc,Jb:u.Jb,Bb:u.Bb};return c.postMessage(m,u.Nb),0},lt=0,$e=(u,c,...m)=>{for(var b=2*m.length,v=gi(),T=mi(8*b),M=T>>>3,O=0;O<m.length;O++){var P=m[O];typeof P=="bigint"?(H[M+2*O]=1n,H[M+2*O+1]=P):(H[M+2*O]=0n,be()[M+2*O+1>>>0]=P)}return u=ps(u,0,b,T,c),vr(v),u};function Xr(u){if(o)return $e(0,1,u);if(C=u,!(0<lt)){for(var c of Gt)ca(c);for(c of ut)ca(c);ut=[],Gt=[],yt={},K=!0}g(0,new Kr(u))}function ha(u){if(o)return $e(1,0,u);Zr(u)}var Zr=u=>{if(C=u,o)throw ha(u),"unwind";Xr(u)},ut=[],Gt=[],ma=[],yt={},ga=u=>{var c=u.Bb;delete yt[c],ut.push(u),Gt.splice(Gt.indexOf(u),1),u.Bb=0,cs(c)};function ya(){ma.forEach(u=>u())}var _a=u=>new Promise(c=>{u.onmessage=v=>{var T=(v=v.data).Db;if(v.Hb&&v.Hb!=ci()){var M=yt[v.Hb];M?M.postMessage(v,v.Nb):ae(`Internal error! Worker sent a message "${T}" to target pthread ${v.Hb}, but that thread no longer exists!`)}else T==="checkMailbox"?fr():T==="spawnThread"?fa(v):T==="cleanupThread"?ga(yt[v.ic]):T==="loaded"?(u.loaded=!0,c(u)):v.target==="setimmediate"?u.postMessage(v):T==="callHandler"?r[v.Rb](...v.args):T&&ae(`worker sent an unknown command ${T}`)},u.onerror=v=>{throw ae(`worker sent an error! ${v.filename}:${v.lineno}: ${v.message}`),v};var m,b=[];for(m of[])r.propertyIsEnumerable(m)&&b.push(m);u.postMessage({Db:"load",Sb:b,kc:$,lc:w})});function ba(){var u=new Worker((()=>{let c=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new c("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});ut.push(u)}var jf=u=>{ke();var c=ue()[u+52>>>2>>>0];u=ue()[u+56>>>2>>>0],ms(c,c-u),vr(c)},Hf=(u,c)=>{lt=0,u=gs(u,c),0<lt?C=u:hi(u)};class Ff{constructor(c){this.Ib=c-24}}function Kf(u,c,m){var b=new Ff(u>>>=0);throw c>>>=0,m>>>=0,ue()[b.Ib+16>>>2>>>0]=0,ue()[b.Ib+4>>>2>>>0]=c,ue()[b.Ib+8>>>2>>>0]=m,u}function wa(u,c,m,b){return o?$e(2,1,u,c,m,b):$a(u,c,m,b)}function $a(u,c,m,b){if(u>>>=0,m>>>=0,b>>>=0,l===void 0)return 6;var v=[];return o&&v.length===0?wa(u,c>>>=0,m,b):(u={fc:m,Bb:u,Jb:b,Nb:v},o?(u.Db="spawnThread",postMessage(u,v),0):fa(u))}var va=typeof TextDecoder<"u"?new TextDecoder:void 0,xa=(u,c=0,m=NaN)=>{var b=(c>>>=0)+m;for(m=c;u[m]&&!(m>=b);)++m;if(16<m-c&&u.buffer&&va)return va.decode(u.buffer instanceof ArrayBuffer?u.subarray(c,m):u.slice(c,m));for(b="";c<m;){var v=u[c++];if(128&v){var T=63&u[c++];if((224&v)==192)b+=String.fromCharCode((31&v)<<6|T);else{var M=63&u[c++];65536>(v=(240&v)==224?(15&v)<<12|T<<6|M:(7&v)<<18|T<<12|M<<6|63&u[c++])?b+=String.fromCharCode(v):(v-=65536,b+=String.fromCharCode(55296|v>>10,56320|1023&v))}}else b+=String.fromCharCode(v)}return b},Ce=(u,c)=>(u>>>=0)?xa(L(),u,c):"";function ka(u,c,m){return o?$e(3,1,u,c,m):0}function Ca(u,c){if(o)return $e(4,1,u,c)}function Sa(u,c){if(o)return $e(5,1,u,c)}function Ta(u,c,m){if(o)return $e(6,1,u,c,m)}function Ia(u,c,m){return o?$e(7,1,u,c,m):0}function Ea(u,c){if(o)return $e(8,1,u,c)}function Ma(u,c,m){if(o)return $e(9,1,u,c,m)}function za(u,c,m,b){if(o)return $e(10,1,u,c,m,b)}function Aa(u,c,m,b){if(o)return $e(11,1,u,c,m,b)}function Oa(u,c,m,b){if(o)return $e(12,1,u,c,m,b)}function Ra(u){if(o)return $e(13,1,u)}function Ba(u,c){if(o)return $e(14,1,u,c)}function Da(u,c,m){if(o)return $e(15,1,u,c,m)}var Na,Yf=()=>ot(""),Xe=u=>{for(var c="";L()[u>>>0];)c+=Na[L()[u++>>>0]];return c},Qr={},Jr={},Rt=r.BindingError=class extends Error{constructor(u){super(u),this.name="BindingError"}};function et(u,c,m={}){return(function(b,v,T={}){var M=v.name;if(!b)throw new Rt(`type "${M}" must have a positive integer typeid pointer`);if(Jr.hasOwnProperty(b)){if(T.Tb)return;throw new Rt(`Cannot register type '${M}' twice`)}Jr[b]=v,Qr.hasOwnProperty(b)&&(v=Qr[b],delete Qr[b],v.forEach(O=>O()))})(u,c,m)}var Pa=(u,c,m)=>{switch(c){case 1:return m?b=>U()[b>>>0]:b=>L()[b>>>0];case 2:return m?b=>re()[b>>>1>>>0]:b=>pe()[b>>>1>>>0];case 4:return m?b=>N()[b>>>2>>>0]:b=>ue()[b>>>2>>>0];case 8:return m?b=>H[b>>>3]:b=>Y[b>>>3];default:throw new TypeError(`invalid integer width (${c}): ${u}`)}};function Xf(u,c,m){m>>>=0,et(u>>>=0,{name:c=Xe(c>>>0),fromWireType:b=>b,toWireType:function(b,v){if(typeof v!="bigint"&&typeof v!="number")throw v=v===null?"null":(b=typeof v)=="object"||b==="array"||b==="function"?v.toString():""+v,new TypeError(`Cannot convert "${v}" to ${this.name}`);return typeof v=="number"&&(v=BigInt(v)),v},Cb:dt,readValueFromPointer:Pa(c,m,c.indexOf("u")==-1),Eb:null})}var dt=8;function Zf(u,c,m,b){et(u>>>=0,{name:c=Xe(c>>>0),fromWireType:function(v){return!!v},toWireType:function(v,T){return T?m:b},Cb:dt,readValueFromPointer:function(v){return this.fromWireType(L()[v>>>0])},Eb:null})}var ei=[],tt=[];function ti(u){9<(u>>>=0)&&--tt[u+1]==0&&(tt[u]=void 0,ei.push(u))}var ze=u=>{if(!u)throw new Rt(`Cannot use deleted val. handle = ${u}`);return tt[u]},Ne=u=>{switch(u){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=ei.pop()||tt.length;return tt[c]=u,tt[c+1]=1,c}};function ri(u){return this.fromWireType(ue()[u>>>2>>>0])}var Qf={name:"emscripten::val",fromWireType:u=>{var c=ze(u);return ti(u),c},toWireType:(u,c)=>Ne(c),Cb:dt,readValueFromPointer:ri,Eb:null};function Jf(u){return et(u>>>0,Qf)}var eh=(u,c)=>{switch(c){case 4:return function(m){return this.fromWireType(Ye()[m>>>2>>>0])};case 8:return function(m){return this.fromWireType(be()[m>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${u}`)}};function th(u,c,m){m>>>=0,et(u>>>=0,{name:c=Xe(c>>>0),fromWireType:b=>b,toWireType:(b,v)=>v,Cb:dt,readValueFromPointer:eh(c,m),Eb:null})}function rh(u,c,m,b,v){if(u>>>=0,m>>>=0,c=Xe(c>>>0),v===-1&&(v=4294967295),v=O=>O,b===0){var T=32-8*m;v=O=>O<<T>>>T}var M=c.includes("unsigned")?function(O,P){return P>>>0}:function(O,P){return P};et(u,{name:c,fromWireType:v,toWireType:M,Cb:dt,readValueFromPointer:Pa(c,m,b!==0),Eb:null})}function ih(u,c,m){function b(T){var M=ue()[T>>>2>>>0];return T=ue()[T+4>>>2>>>0],new v(U().buffer,T,M)}var v=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];et(u>>>=0,{name:m=Xe(m>>>0),fromWireType:b,Cb:dt,readValueFromPointer:b},{Tb:!0})}var _t=(u,c,m)=>{var b=L();if(c>>>=0,0<m){var v=c;m=c+m-1;for(var T=0;T<u.length;++T){var M=u.charCodeAt(T);if(55296<=M&&57343>=M&&(M=65536+((1023&M)<<10)|1023&u.charCodeAt(++T)),127>=M){if(c>=m)break;b[c++>>>0]=M}else{if(2047>=M){if(c+1>=m)break;b[c++>>>0]=192|M>>6}else{if(65535>=M){if(c+2>=m)break;b[c++>>>0]=224|M>>12}else{if(c+3>=m)break;b[c++>>>0]=240|M>>18,b[c++>>>0]=128|M>>12&63}b[c++>>>0]=128|M>>6&63}b[c++>>>0]=128|63&M}}b[c>>>0]=0,u=c-v}else u=0;return u},ii=u=>{for(var c=0,m=0;m<u.length;++m){var b=u.charCodeAt(m);127>=b?c++:2047>=b?c+=2:55296<=b&&57343>=b?(c+=4,++m):c+=3}return c};function nh(u,c){et(u>>>=0,{name:c=Xe(c>>>0),fromWireType:function(m){for(var b,v=ue()[m>>>2>>>0],T=m+4,M=T,O=0;O<=v;++O){var P=T+O;O!=v&&L()[P>>>0]!=0||(M=Ce(M,P-M),b===void 0?b=M:(b+="\0",b+=M),M=P+1)}return rt(m),b},toWireType:function(m,b){b instanceof ArrayBuffer&&(b=new Uint8Array(b));var v=typeof b=="string";if(!(v||ArrayBuffer.isView(b)&&b.BYTES_PER_ELEMENT==1))throw new Rt("Cannot pass non-string to std::string");var T=v?ii(b):b.length,M=$r(4+T+1),O=M+4;return ue()[M>>>2>>>0]=T,v?_t(b,O,T+1):L().set(b,O>>>0),m!==null&&m.push(rt,M),M},Cb:dt,readValueFromPointer:ri,Eb(m){rt(m)}})}var Ua=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,ah=(u,c)=>{for(var m=u>>1,b=m+c/2;!(m>=b)&&pe()[m>>>0];)++m;if(32<(m<<=1)-u&&Ua)return Ua.decode(L().slice(u,m));for(m="",b=0;!(b>=c/2);++b){var v=re()[u+2*b>>>1>>>0];if(v==0)break;m+=String.fromCharCode(v)}return m},sh=(u,c,m)=>{if(m??=2147483647,2>m)return 0;var b=c;m=(m-=2)<2*u.length?m/2:u.length;for(var v=0;v<m;++v){var T=u.charCodeAt(v);re()[c>>>1>>>0]=T,c+=2}return re()[c>>>1>>>0]=0,c-b},oh=u=>2*u.length,lh=(u,c)=>{for(var m=0,b="";!(m>=c/4);){var v=N()[u+4*m>>>2>>>0];if(v==0)break;++m,65536<=v?(v-=65536,b+=String.fromCharCode(55296|v>>10,56320|1023&v)):b+=String.fromCharCode(v)}return b},uh=(u,c,m)=>{if(c>>>=0,m??=2147483647,4>m)return 0;var b=c;m=b+m-4;for(var v=0;v<u.length;++v){var T=u.charCodeAt(v);if(55296<=T&&57343>=T&&(T=65536+((1023&T)<<10)|1023&u.charCodeAt(++v)),N()[c>>>2>>>0]=T,(c+=4)+4>m)break}return N()[c>>>2>>>0]=0,c-b},dh=u=>{for(var c=0,m=0;m<u.length;++m){var b=u.charCodeAt(m);55296<=b&&57343>=b&&++m,c+=4}return c};function ph(u,c,m){if(u>>>=0,c>>>=0,m=Xe(m>>>=0),c===2)var b=ah,v=sh,T=oh,M=O=>pe()[O>>>1>>>0];else c===4&&(b=lh,v=uh,T=dh,M=O=>ue()[O>>>2>>>0]);et(u,{name:m,fromWireType:O=>{for(var P,G=ue()[O>>>2>>>0],Z=O+4,ie=0;ie<=G;++ie){var le=O+4+ie*c;ie!=G&&M(le)!=0||(Z=b(Z,le-Z),P===void 0?P=Z:(P+="\0",P+=Z),Z=le+c)}return rt(O),P},toWireType:(O,P)=>{if(typeof P!="string")throw new Rt(`Cannot pass non-string to C++ string type ${m}`);var G=T(P),Z=$r(4+G+c);return ue()[Z>>>2>>>0]=G/c,v(P,Z+4,G+c),O!==null&&O.push(rt,Z),Z},Cb:dt,readValueFromPointer:ri,Eb(O){rt(O)}})}function ch(u,c){et(u>>>=0,{Ub:!0,name:c=Xe(c>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function fh(u){fi(u>>>0,!a,1,!s,131072,!1),ya()}var ni=u=>{if(!K)try{if(u(),!(0<lt))try{o?hi(C):Zr(C)}catch(c){c instanceof Kr||c=="unwind"||g(0,c)}}catch(c){c instanceof Kr||c=="unwind"||g(0,c)}};function ai(u){u>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(N(),u>>>2,u).value.then(fr),u+=128,Atomics.store(N(),u>>>2,1))}var fr=()=>{var u=ci();u&&(ai(u),ni(hs))};function hh(u,c){(u>>>=0)==c>>>0?setTimeout(fr):o?postMessage({Hb:u,Db:"checkMailbox"}):(u=yt[u])&&u.postMessage({Db:"checkMailbox"})}var si=[];function mh(u,c,m,b,v){for(c>>>=0,b/=2,si.length=b,m=v>>>0>>>3,v=0;v<b;v++)si[v]=H[m+2*v]?H[m+2*v+1]:be()[m+2*v+1>>>0];return(c?pi[c]:om[u])(...si)}var gh=()=>{lt=0};function yh(u){u>>>=0,o?postMessage({Db:"cleanupThread",ic:u}):ga(yt[u])}function _h(u){}var hr=(u,c)=>{var m=Jr[u];if(m===void 0)throw u=ls(u),m=Xe(u),rt(u),new Rt(`${c} has unknown type ${m}`);return m},qa=(u,c,m)=>{var b=[];return u=u.toWireType(b,m),b.length&&(ue()[c>>>2>>>0]=Ne(b)),u};function bh(u,c,m){return c>>>=0,m>>>=0,u=ze(u>>>0),c=hr(c,"emval::as"),qa(c,m,u)}function wh(u,c){return c>>>=0,u=ze(u>>>0),(c=hr(c,"emval::as")).toWireType(null,u)}var mr=u=>{try{u()}catch(c){ot(c)}},pt=0,Ze=null,Wa=0,gr=[],La={},Va={},$h=0,oi=null,vh=[];function Ga(u){return(function(c){if(!K){if(pt===0){var m=!1,b=!1;c((v=0)=>{if(!K&&(Wa=v,m=!0,b)){pt=2,mr(()=>bs(Ze)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),v=!1;try{var T=(function(){var P=N()[Ze+8>>>2>>>0];return P=R[Va[P]],--lt,P()})()}catch(P){T=P,v=!0}var M=!1;if(!Ze){var O=oi;O&&(oi=null,(v?O.reject:O.resolve)(T),M=!0)}if(v&&!M)throw T}}),b=!0,m||(pt=1,Ze=(function(){var v=$r(65548),T=v+12;ue()[v>>>2>>>0]=T,ue()[v+4>>>2>>>0]=T+65536,T=gr[0];var M=La[T];return M===void 0&&(M=$h++,La[T]=M,Va[M]=T),T=M,N()[v+8>>>2>>>0]=T,v})(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),mr(()=>ys(Ze)))}else pt===2?(pt=0,mr(ws),rt(Ze),Ze=null,vh.forEach(ni)):ot(`invalid state: ${pt}`);return Wa}})(c=>{u().then(c)})}function xh(u){return u>>>=0,Ga(async()=>{var c=await ze(u);return Ne(c)})}var yr=[];function kh(u,c,m,b){return m>>>=0,b>>>=0,(u=yr[u>>>0])(null,c=ze(c>>>0),m,b)}var Ch={},_r=u=>{var c=Ch[u];return c===void 0?Xe(u):c};function Sh(u,c,m,b,v){return m>>>=0,b>>>=0,v>>>=0,(u=yr[u>>>0])(c=ze(c>>>0),c[m=_r(m)],b,v)}function Th(u,c){return c>>>=0,(u=ze(u>>>0))==ze(c)}var ja=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Ih(u){return(u>>>=0)==0?Ne(ja()):(u=_r(u),Ne(ja()[u]))}var Eh=u=>{var c=yr.length;return yr.push(u),c},Mh=(u,c)=>{for(var m=Array(u),b=0;b<u;++b)m[b]=hr(ue()[c+4*b>>>2>>>0],`parameter ${b}`);return m};function zh(u,c,m){var b=(c=Mh(u,c>>>0)).shift();u--;var v=`return function (obj, func, destructorsRef, args) {
`,T=0,M=[];m===0&&M.push("obj");for(var O=["retType"],P=[b],G=0;G<u;++G)M.push(`arg${G}`),O.push(`argType${G}`),P.push(c[G]),v+=`  var arg${G} = argType${G}.readValueFromPointer(args${T?"+"+T:""});
`,T+=c[G].Cb;return v+=`  var rv = ${m===1?"new func":"func.call"}(${M.join(", ")});
`,b.Ub||(O.push("emval_returnValue"),P.push(qa),v+=`  return emval_returnValue(retType, destructorsRef, rv);
`),u=new Function(...O,v+`};
`)(...P),m=`methodCaller<(${c.map(Z=>Z.name).join(", ")}) => ${b.name}>`,Eh(Object.defineProperty(u,"name",{value:m}))}function Ah(u){return u=_r(u>>>0),Ne(r[u])}function Oh(u,c){return c>>>=0,u=ze(u>>>0),c=ze(c),Ne(u[c])}function Rh(u){9<(u>>>=0)&&(tt[u+1]+=1)}function Bh(){return Ne([])}function Dh(u){u=ze(u>>>0);for(var c=Array(u.length),m=0;m<u.length;m++)c[m]=u[m];return Ne(c)}function Nh(u){return Ne(_r(u>>>0))}function Ph(){return Ne({})}function Uh(u){for(var c=ze(u>>>=0);c.length;){var m=c.pop();c.pop()(m)}ti(u)}function qh(u,c,m){c>>>=0,m>>>=0,u=ze(u>>>0),c=ze(c),m=ze(m),u[c]=m}function Wh(u,c){return c>>>=0,u=(u=hr(u>>>0,"_emval_take_value")).readValueFromPointer(c),Ne(u)}function Lh(u,c){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),c>>>=0,u=new Date(1e3*u),N()[c>>>2>>>0]=u.getUTCSeconds(),N()[c+4>>>2>>>0]=u.getUTCMinutes(),N()[c+8>>>2>>>0]=u.getUTCHours(),N()[c+12>>>2>>>0]=u.getUTCDate(),N()[c+16>>>2>>>0]=u.getUTCMonth(),N()[c+20>>>2>>>0]=u.getUTCFullYear()-1900,N()[c+24>>>2>>>0]=u.getUTCDay(),u=(u.getTime()-Date.UTC(u.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,N()[c+28>>>2>>>0]=u}var Ha=u=>u%4==0&&(u%100!=0||u%400==0),Fa=[0,31,60,91,121,152,182,213,244,274,305,335],Ka=[0,31,59,90,120,151,181,212,243,273,304,334];function Vh(u,c){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),c>>>=0,u=new Date(1e3*u),N()[c>>>2>>>0]=u.getSeconds(),N()[c+4>>>2>>>0]=u.getMinutes(),N()[c+8>>>2>>>0]=u.getHours(),N()[c+12>>>2>>>0]=u.getDate(),N()[c+16>>>2>>>0]=u.getMonth(),N()[c+20>>>2>>>0]=u.getFullYear()-1900,N()[c+24>>>2>>>0]=u.getDay();var m=(Ha(u.getFullYear())?Fa:Ka)[u.getMonth()]+u.getDate()-1|0;N()[c+28>>>2>>>0]=m,N()[c+36>>>2>>>0]=-60*u.getTimezoneOffset(),m=new Date(u.getFullYear(),6,1).getTimezoneOffset();var b=new Date(u.getFullYear(),0,1).getTimezoneOffset();u=0|(m!=b&&u.getTimezoneOffset()==Math.min(b,m)),N()[c+32>>>2>>>0]=u}function Gh(u){u>>>=0;var c=new Date(N()[u+20>>>2>>>0]+1900,N()[u+16>>>2>>>0],N()[u+12>>>2>>>0],N()[u+8>>>2>>>0],N()[u+4>>>2>>>0],N()[u>>>2>>>0],0),m=N()[u+32>>>2>>>0],b=c.getTimezoneOffset(),v=new Date(c.getFullYear(),6,1).getTimezoneOffset(),T=new Date(c.getFullYear(),0,1).getTimezoneOffset(),M=Math.min(T,v);return 0>m?N()[u+32>>>2>>>0]=+(v!=T&&M==b):0<m!=(M==b)&&(v=Math.max(T,v),c.setTime(c.getTime()+6e4*((0<m?M:v)-b))),N()[u+24>>>2>>>0]=c.getDay(),m=(Ha(c.getFullYear())?Fa:Ka)[c.getMonth()]+c.getDate()-1|0,N()[u+28>>>2>>>0]=m,N()[u>>>2>>>0]=c.getSeconds(),N()[u+4>>>2>>>0]=c.getMinutes(),N()[u+8>>>2>>>0]=c.getHours(),N()[u+12>>>2>>>0]=c.getDate(),N()[u+16>>>2>>>0]=c.getMonth(),N()[u+20>>>2>>>0]=c.getYear(),u=c.getTime(),BigInt(isNaN(u)?-1:u/1e3)}function Ya(u,c,m,b,v,T,M){return o?$e(16,1,u,c,m,b,v,T,M):-52}function Xa(u,c,m,b,v,T){if(o)return $e(17,1,u,c,m,b,v,T)}var jt={},jh=()=>performance.timeOrigin+performance.now();function Za(u,c){if(o)return $e(18,1,u,c);if(jt[u]&&(clearTimeout(jt[u].id),delete jt[u]),!c)return 0;var m=setTimeout(()=>{delete jt[u],ni(()=>fs(u,performance.timeOrigin+performance.now()))},c);return jt[u]={id:m,rc:c},0}function Hh(u,c,m,b){u>>>=0,c>>>=0,m>>>=0,b>>>=0;var v=new Date().getFullYear(),T=new Date(v,0,1).getTimezoneOffset();v=new Date(v,6,1).getTimezoneOffset();var M=Math.max(T,v);ue()[u>>>2>>>0]=60*M,N()[c>>>2>>>0]=+(T!=v),u=(c=O=>{var P=Math.abs(O);return`UTC${0<=O?"-":"+"}${String(Math.floor(P/60)).padStart(2,"0")}${String(P%60).padStart(2,"0")}`})(T),c=c(v),v<T?(_t(u,m,17),_t(c,b,17)):(_t(u,b,17),_t(c,m,17))}var Fh=()=>Date.now();function Kh(u,c,m){return 0<=u&&3>=u?(u===0?u=Date.now():u=performance.timeOrigin+performance.now(),H[m>>>0>>>3]=BigInt(Math.round(1e6*u)),0):28}var li=[],Qa=(u,c)=>{li.length=0;for(var m;m=L()[u++>>>0];){var b=m!=105;c+=(b&=m!=112)&&c%8?4:0,li.push(m==112?ue()[c>>>2>>>0]:m==106?H[c>>>3]:m==105?N()[c>>>2>>>0]:be()[c>>>3>>>0]),c+=b?8:4}return li};function Yh(u,c,m){return u>>>=0,c=Qa(c>>>0,m>>>0),pi[u](...c)}function Xh(u,c,m){return u>>>=0,c=Qa(c>>>0,m>>>0),pi[u](...c)}var Zh=()=>{};function Qh(u,c){return ae(Ce(u>>>0,c>>>0))}var Jh=()=>{throw lt+=1,"unwind"};function em(){return 4294901760}var tm=()=>navigator.hardwareConcurrency;function rm(){return ot("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function im(u){u>>>=0;var c=L().length;if(u<=c||4294901760<u)return!1;for(var m=1;4>=m;m*=2){var b=c*(1+.2/m);b=Math.min(b,u+100663296);e:{b=(Math.min(4294901760,65536*Math.ceil(Math.max(u,b)/65536))-$.buffer.byteLength+65535)/65536|0;try{$.grow(b),ke();var v=1;break e}catch{}v=void 0}if(v)return!0}return!1}var br=()=>(ot("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Ht={},Ja=u=>{u.forEach(c=>{br()})};function nm(){var u=Error().stack.toString().split(`
`);return u[0]=="Error"&&u.shift(),Ja(u),Ht.Mb=br(),Ht.dc=u,Ht.Mb}function am(u,c,m){if(u>>>=0,c>>>=0,Ht.Mb==u)var b=Ht.dc;else(b=Error().stack.toString().split(`
`))[0]=="Error"&&b.shift(),Ja(b);for(var v=3;b[v]&&br()!=u;)++v;for(u=0;u<m&&b[u+v];++u)N()[c+4*u>>>2>>>0]=br();return u}var ui,di={},es=()=>{if(!ui){var u,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(u in di)di[u]===void 0?delete c[u]:c[u]=di[u];var m=[];for(u in c)m.push(`${u}=${c[u]}`);ui=m}return ui};function ts(u,c){if(o)return $e(19,1,u,c);u>>>=0,c>>>=0;var m,b=0,v=0;for(m of es()){var T=c+b;ue()[u+v>>>2>>>0]=T,b+=_t(m,T,1/0)+1,v+=4}return 0}function rs(u,c){if(o)return $e(20,1,u,c);u>>>=0,c>>>=0;var m=es();for(var b of(ue()[u>>>2>>>0]=m.length,u=0,m))u+=ii(b)+1;return ue()[c>>>2>>>0]=u,0}function is(u){return o?$e(21,1,u):52}function ns(u,c,m,b){return o?$e(22,1,u,c,m,b):52}function as(u,c,m,b){return o?$e(23,1,u,c,m,b):70}var sm=[null,[],[]];function ss(u,c,m,b){if(o)return $e(24,1,u,c,m,b);c>>>=0,m>>>=0,b>>>=0;for(var v=0,T=0;T<m;T++){var M=ue()[c>>>2>>>0],O=ue()[c+4>>>2>>>0];c+=8;for(var P=0;P<O;P++){var G=u,Z=L()[M+P>>>0],ie=sm[G];Z===0||Z===10?((G===1?j:ae)(xa(ie)),ie.length=0):ie.push(Z)}v+=O}return ue()[b>>>2>>>0]=v,0}o||(function(){for(var u=r.numThreads-1;u--;)ba();Yr.push(()=>{Lt++,(function(c){o?c():Promise.all(ut.map(_a)).then(c)})(()=>da())})})();for(var os=Array(256),wr=0;256>wr;++wr)os[wr]=String.fromCharCode(wr);Na=os,tt.push(0,1,void 0,1,null,1,!0,1,!1,1),r.count_emval_handles=()=>tt.length/2-5-ei.length,o||($=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),ke()),r.wasmBinary&&(k=r.wasmBinary),r.stackSave=()=>gi(),r.stackRestore=u=>vr(u),r.stackAlloc=u=>mi(u),r.setValue=function(u,c,m="i8"){switch(m.endsWith("*")&&(m="*"),m){case"i1":case"i8":U()[u>>>0]=c;break;case"i16":re()[u>>>1>>>0]=c;break;case"i32":N()[u>>>2>>>0]=c;break;case"i64":H[u>>>3]=BigInt(c);break;case"float":Ye()[u>>>2>>>0]=c;break;case"double":be()[u>>>3>>>0]=c;break;case"*":ue()[u>>>2>>>0]=c;break;default:ot(`invalid type for setValue: ${m}`)}},r.getValue=function(u,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return U()[u>>>0];case"i16":return re()[u>>>1>>>0];case"i32":return N()[u>>>2>>>0];case"i64":return H[u>>>3];case"float":return Ye()[u>>>2>>>0];case"double":return be()[u>>>3>>>0];case"*":return ue()[u>>>2>>>0];default:ot(`invalid type for getValue: ${c}`)}},r.UTF8ToString=Ce,r.stringToUTF8=_t,r.lengthBytesUTF8=ii;var om=[Xr,ha,wa,ka,Ca,Sa,Ta,Ia,Ea,Ma,za,Aa,Oa,Ra,Ba,Da,Ya,Xa,Za,ts,rs,is,ns,as,ss],pi={893836:(u,c,m,b,v)=>{if(r===void 0||!r.Fb)return 1;if((u=Ce(Number(u>>>0))).startsWith("./")&&(u=u.substring(2)),!(u=r.Fb.get(u)))return 2;if(c=Number(c>>>0),m=Number(m>>>0),b=Number(b>>>0),c+m>u.byteLength)return 3;try{let T=u.subarray(c,c+m);switch(v){case 0:L().set(T,b>>>0);break;case 1:r.mc?r.mc(b,T):r.cc(b,T);break;default:return 4}return 0}catch{return 4}},894660:(u,c,m)=>{r.Pb(u,L().subarray(c>>>0,c+m>>>0))},894724:()=>r.oc(),894766:u=>{r.Ob(u)},894803:()=>{r.Wb()},894834:()=>{r.Xb()},894863:()=>{r.ac()},894888:u=>r.Vb(u),894921:u=>r.Zb(u),894953:(u,c,m)=>{r.Lb(Number(u),Number(c),Number(m),!0)},895016:(u,c,m)=>{r.Lb(Number(u),Number(c),Number(m))},895073:()=>typeof wasmOffsetConverter<"u",895130:u=>{r.Ab("Abs",u,void 0)},895181:u=>{r.Ab("Neg",u,void 0)},895232:u=>{r.Ab("Floor",u,void 0)},895285:u=>{r.Ab("Ceil",u,void 0)},895337:u=>{r.Ab("Reciprocal",u,void 0)},895395:u=>{r.Ab("Sqrt",u,void 0)},895447:u=>{r.Ab("Exp",u,void 0)},895498:u=>{r.Ab("Erf",u,void 0)},895549:u=>{r.Ab("Sigmoid",u,void 0)},895604:(u,c,m)=>{r.Ab("HardSigmoid",u,{alpha:c,beta:m})},895683:u=>{r.Ab("Log",u,void 0)},895734:u=>{r.Ab("Sin",u,void 0)},895785:u=>{r.Ab("Cos",u,void 0)},895836:u=>{r.Ab("Tan",u,void 0)},895887:u=>{r.Ab("Asin",u,void 0)},895939:u=>{r.Ab("Acos",u,void 0)},895991:u=>{r.Ab("Atan",u,void 0)},896043:u=>{r.Ab("Sinh",u,void 0)},896095:u=>{r.Ab("Cosh",u,void 0)},896147:u=>{r.Ab("Asinh",u,void 0)},896200:u=>{r.Ab("Acosh",u,void 0)},896253:u=>{r.Ab("Atanh",u,void 0)},896306:u=>{r.Ab("Tanh",u,void 0)},896358:u=>{r.Ab("Not",u,void 0)},896409:(u,c,m)=>{r.Ab("Clip",u,{min:c,max:m})},896478:u=>{r.Ab("Clip",u,void 0)},896530:(u,c)=>{r.Ab("Elu",u,{alpha:c})},896588:u=>{r.Ab("Gelu",u,void 0)},896640:u=>{r.Ab("Relu",u,void 0)},896692:(u,c)=>{r.Ab("LeakyRelu",u,{alpha:c})},896756:(u,c)=>{r.Ab("ThresholdedRelu",u,{alpha:c})},896826:(u,c)=>{r.Ab("Cast",u,{to:c})},896884:u=>{r.Ab("Add",u,void 0)},896935:u=>{r.Ab("Sub",u,void 0)},896986:u=>{r.Ab("Mul",u,void 0)},897037:u=>{r.Ab("Div",u,void 0)},897088:u=>{r.Ab("Pow",u,void 0)},897139:u=>{r.Ab("Equal",u,void 0)},897192:u=>{r.Ab("Greater",u,void 0)},897247:u=>{r.Ab("GreaterOrEqual",u,void 0)},897309:u=>{r.Ab("Less",u,void 0)},897361:u=>{r.Ab("LessOrEqual",u,void 0)},897420:(u,c,m,b,v)=>{r.Ab("ReduceMean",u,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},897595:(u,c,m,b,v)=>{r.Ab("ReduceMax",u,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},897769:(u,c,m,b,v)=>{r.Ab("ReduceMin",u,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},897943:(u,c,m,b,v)=>{r.Ab("ReduceProd",u,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},898118:(u,c,m,b,v)=>{r.Ab("ReduceSum",u,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},898292:(u,c,m,b,v)=>{r.Ab("ReduceL1",u,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},898465:(u,c,m,b,v)=>{r.Ab("ReduceL2",u,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},898638:(u,c,m,b,v)=>{r.Ab("ReduceLogSum",u,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},898815:(u,c,m,b,v)=>{r.Ab("ReduceSumSquare",u,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},898995:(u,c,m,b,v)=>{r.Ab("ReduceLogSumExp",u,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},899175:u=>{r.Ab("Where",u,void 0)},899228:(u,c,m)=>{r.Ab("Transpose",u,{perm:c?Array.from(N().subarray(Number(c)>>>0,Number(m)>>>0)):[]})},899352:(u,c,m,b)=>{r.Ab("DepthToSpace",u,{blocksize:c,mode:Ce(m),format:b?"NHWC":"NCHW"})},899485:(u,c,m,b)=>{r.Ab("DepthToSpace",u,{blocksize:c,mode:Ce(m),format:b?"NHWC":"NCHW"})},899618:(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se)=>{r.Ab("ConvTranspose",u,{format:P?"NHWC":"NCHW",autoPad:c,dilations:[m],group:b,kernelShape:[v],pads:[T,M],strides:[O],wIsConst:()=>!!U()[G>>>0],outputPadding:Z?Array.from(N().subarray(Number(Z)>>>0,Number(ie)>>>0)):[],outputShape:le?Array.from(N().subarray(Number(le)>>>0,Number(he)>>>0)):[],activation:Ce(Se)})},900051:(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he)=>{r.Ab("ConvTranspose",u,{format:O?"NHWC":"NCHW",autoPad:c,dilations:Array.from(N().subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:b,kernelShape:Array.from(N().subarray(Number(v)>>>0,2+(Number(v)>>>0)>>>0)),pads:Array.from(N().subarray(Number(T)>>>0,4+(Number(T)>>>0)>>>0)),strides:Array.from(N().subarray(Number(M)>>>0,2+(Number(M)>>>0)>>>0)),wIsConst:()=>!!U()[P>>>0],outputPadding:G?Array.from(N().subarray(Number(G)>>>0,Number(Z)>>>0)):[],outputShape:ie?Array.from(N().subarray(Number(ie)>>>0,Number(le)>>>0)):[],activation:Ce(he)})},900712:(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se)=>{r.Ab("ConvTranspose",u,{format:P?"NHWC":"NCHW",autoPad:c,dilations:[m],group:b,kernelShape:[v],pads:[T,M],strides:[O],wIsConst:()=>!!U()[G>>>0],outputPadding:Z?Array.from(N().subarray(Number(Z)>>>0,Number(ie)>>>0)):[],outputShape:le?Array.from(N().subarray(Number(le)>>>0,Number(he)>>>0)):[],activation:Ce(Se)})},901145:(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he)=>{r.Ab("ConvTranspose",u,{format:O?"NHWC":"NCHW",autoPad:c,dilations:Array.from(N().subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:b,kernelShape:Array.from(N().subarray(Number(v)>>>0,2+(Number(v)>>>0)>>>0)),pads:Array.from(N().subarray(Number(T)>>>0,4+(Number(T)>>>0)>>>0)),strides:Array.from(N().subarray(Number(M)>>>0,2+(Number(M)>>>0)>>>0)),wIsConst:()=>!!U()[P>>>0],outputPadding:G?Array.from(N().subarray(Number(G)>>>0,Number(Z)>>>0)):[],outputShape:ie?Array.from(N().subarray(Number(ie)>>>0,Number(le)>>>0)):[],activation:Ce(he)})},901806:(u,c)=>{r.Ab("GlobalAveragePool",u,{format:c?"NHWC":"NCHW"})},901897:(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he)=>{r.Ab("AveragePool",u,{format:he?"NHWC":"NCHW",auto_pad:c,ceil_mode:m,count_include_pad:b,storage_order:v,dilations:T?Array.from(N().subarray(Number(T)>>>0,Number(M)>>>0)):[],kernel_shape:O?Array.from(N().subarray(Number(O)>>>0,Number(P)>>>0)):[],pads:G?Array.from(N().subarray(Number(G)>>>0,Number(Z)>>>0)):[],strides:ie?Array.from(N().subarray(Number(ie)>>>0,Number(le)>>>0)):[]})},902376:(u,c)=>{r.Ab("GlobalAveragePool",u,{format:c?"NHWC":"NCHW"})},902467:(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he)=>{r.Ab("AveragePool",u,{format:he?"NHWC":"NCHW",auto_pad:c,ceil_mode:m,count_include_pad:b,storage_order:v,dilations:T?Array.from(N().subarray(Number(T)>>>0,Number(M)>>>0)):[],kernel_shape:O?Array.from(N().subarray(Number(O)>>>0,Number(P)>>>0)):[],pads:G?Array.from(N().subarray(Number(G)>>>0,Number(Z)>>>0)):[],strides:ie?Array.from(N().subarray(Number(ie)>>>0,Number(le)>>>0)):[]})},902946:(u,c)=>{r.Ab("GlobalMaxPool",u,{format:c?"NHWC":"NCHW"})},903033:(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he)=>{r.Ab("MaxPool",u,{format:he?"NHWC":"NCHW",auto_pad:c,ceil_mode:m,count_include_pad:b,storage_order:v,dilations:T?Array.from(N().subarray(Number(T)>>>0,Number(M)>>>0)):[],kernel_shape:O?Array.from(N().subarray(Number(O)>>>0,Number(P)>>>0)):[],pads:G?Array.from(N().subarray(Number(G)>>>0,Number(Z)>>>0)):[],strides:ie?Array.from(N().subarray(Number(ie)>>>0,Number(le)>>>0)):[]})},903508:(u,c)=>{r.Ab("GlobalMaxPool",u,{format:c?"NHWC":"NCHW"})},903595:(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he)=>{r.Ab("MaxPool",u,{format:he?"NHWC":"NCHW",auto_pad:c,ceil_mode:m,count_include_pad:b,storage_order:v,dilations:T?Array.from(N().subarray(Number(T)>>>0,Number(M)>>>0)):[],kernel_shape:O?Array.from(N().subarray(Number(O)>>>0,Number(P)>>>0)):[],pads:G?Array.from(N().subarray(Number(G)>>>0,Number(Z)>>>0)):[],strides:ie?Array.from(N().subarray(Number(ie)>>>0,Number(le)>>>0)):[]})},904070:(u,c,m,b,v)=>{r.Ab("Gemm",u,{alpha:c,beta:m,transA:b,transB:v})},904174:u=>{r.Ab("MatMul",u,void 0)},904228:(u,c,m,b)=>{r.Ab("ArgMax",u,{keepDims:!!c,selectLastIndex:!!m,axis:b})},904336:(u,c,m,b)=>{r.Ab("ArgMin",u,{keepDims:!!c,selectLastIndex:!!m,axis:b})},904444:(u,c)=>{r.Ab("Softmax",u,{axis:c})},904507:(u,c)=>{r.Ab("Concat",u,{axis:c})},904567:(u,c,m,b,v)=>{r.Ab("Split",u,{axis:c,numOutputs:m,splitSizes:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},904723:u=>{r.Ab("Expand",u,void 0)},904777:(u,c)=>{r.Ab("Gather",u,{axis:Number(c)})},904848:(u,c)=>{r.Ab("GatherElements",u,{axis:Number(c)})},904927:(u,c)=>{r.Ab("GatherND",u,{batch_dims:Number(c)})},905006:(u,c,m,b,v,T,M,O,P,G,Z)=>{r.Ab("Resize",u,{antialias:c,axes:m?Array.from(N().subarray(Number(m)>>>0,Number(b)>>>0)):[],coordinateTransformMode:Ce(v),cubicCoeffA:T,excludeOutside:M,extrapolationValue:O,keepAspectRatioPolicy:Ce(P),mode:Ce(G),nearestMode:Ce(Z)})},905368:(u,c,m,b,v,T,M)=>{r.Ab("Slice",u,{starts:c?Array.from(N().subarray(Number(c)>>>0,Number(m)>>>0)):[],ends:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[],axes:T?Array.from(N().subarray(Number(T)>>>0,Number(M)>>>0)):[]})},905632:u=>{r.Ab("Tile",u,void 0)},905684:(u,c,m)=>{r.Ab("InstanceNormalization",u,{epsilon:c,format:m?"NHWC":"NCHW"})},905798:(u,c,m)=>{r.Ab("InstanceNormalization",u,{epsilon:c,format:m?"NHWC":"NCHW"})},905912:u=>{r.Ab("Range",u,void 0)},905965:(u,c)=>{r.Ab("Einsum",u,{equation:Ce(c)})},906046:(u,c,m,b,v)=>{r.Ab("Pad",u,{mode:c,value:m,pads:b?Array.from(N().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},906189:(u,c,m,b,v,T)=>{r.Ab("BatchNormalization",u,{epsilon:c,momentum:m,spatial:!!v,trainingMode:!!b,format:T?"NHWC":"NCHW"})},906358:(u,c,m,b,v,T)=>{r.Ab("BatchNormalization",u,{epsilon:c,momentum:m,spatial:!!v,trainingMode:!!b,format:T?"NHWC":"NCHW"})},906527:(u,c,m)=>{r.Ab("CumSum",u,{exclusive:Number(c),reverse:Number(m)})},906624:(u,c,m)=>{r.Ab("DequantizeLinear",u,{axis:c,blockSize:m})},906714:(u,c,m,b,v)=>{r.Ab("GridSample",u,{align_corners:c,mode:Ce(m),padding_mode:Ce(b),format:v?"NHWC":"NCHW"})},906884:(u,c,m,b,v)=>{r.Ab("GridSample",u,{align_corners:c,mode:Ce(m),padding_mode:Ce(b),format:v?"NHWC":"NCHW"})},907054:(u,c)=>{r.Ab("ScatterND",u,{reduction:Ce(c)})},907139:(u,c,m,b,v,T,M,O,P)=>{r.Ab("Attention",u,{numHeads:c,isUnidirectional:m,maskFilterValue:b,scale:v,doRotary:T,qkvHiddenSizes:M?Array.from(N().subarray(Number(O)>>>0,Number(O)+M>>>0)):[],pastPresentShareBuffer:!!P})},907411:u=>{r.Ab("BiasAdd",u,void 0)},907466:u=>{r.Ab("BiasSplitGelu",u,void 0)},907527:u=>{r.Ab("FastGelu",u,void 0)},907583:(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe)=>{r.Ab("Conv",u,{format:ie?"NHWC":"NCHW",auto_pad:c,dilations:m?Array.from(N().subarray(Number(m)>>>0,Number(b)>>>0)):[],group:v,kernel_shape:T?Array.from(N().subarray(Number(T)>>>0,Number(M)>>>0)):[],pads:O?Array.from(N().subarray(Number(O)>>>0,Number(P)>>>0)):[],strides:G?Array.from(N().subarray(Number(G)>>>0,Number(Z)>>>0)):[],w_is_const:()=>!!U()[Number(le)>>>0],activation:Ce(he),activation_params:Se?Array.from(Ye().subarray(Number(Se)>>>0,Number(Oe)>>>0)):[]})},908167:u=>{r.Ab("Gelu",u,void 0)},908219:(u,c,m,b,v,T,M,O,P)=>{r.Ab("GroupQueryAttention",u,{numHeads:c,kvNumHeads:m,scale:b,softcap:v,doRotary:T,rotaryInterleaved:M,smoothSoftmax:O,localWindowSize:P})},908436:(u,c,m,b)=>{r.Ab("LayerNormalization",u,{axis:c,epsilon:m,simplified:!!b})},908547:(u,c,m,b)=>{r.Ab("LayerNormalization",u,{axis:c,epsilon:m,simplified:!!b})},908658:(u,c,m,b,v,T)=>{r.Ab("MatMulNBits",u,{k:c,n:m,accuracyLevel:b,bits:v,blockSize:T})},908785:(u,c,m,b,v,T)=>{r.Ab("MultiHeadAttention",u,{numHeads:c,isUnidirectional:m,maskFilterValue:b,scale:v,doRotary:T})},908944:(u,c)=>{r.Ab("QuickGelu",u,{alpha:c})},909008:(u,c,m,b,v)=>{r.Ab("RotaryEmbedding",u,{interleaved:!!c,numHeads:m,rotaryEmbeddingDim:b,scale:v})},909147:(u,c,m)=>{r.Ab("SkipLayerNormalization",u,{epsilon:c,simplified:!!m})},909249:(u,c,m)=>{r.Ab("SkipLayerNormalization",u,{epsilon:c,simplified:!!m})},909351:(u,c,m,b)=>{r.Ab("GatherBlockQuantized",u,{gatherAxis:c,quantizeAxis:m,blockSize:b})},909472:u=>{r.$b(u)},909506:(u,c)=>r.bc(Number(u),Number(c),r.Gb.ec,r.Gb.errors)};function lm(u,c,m){return Ga(async()=>{await r.Yb(Number(u),Number(c),Number(m))})}function um(){return typeof wasmOffsetConverter<"u"}var R=await(async function(){function u(b,v){return R=b.exports,R=(function(){var T=R,M={};for(let[O,P]of Object.entries(T))M[O]=typeof P=="function"?(...G)=>{gr.push(O);try{return P(...G)}finally{K||(gr.pop(),Ze&&pt===1&&gr.length===0&&(pt=0,lt+=1,mr(_s),typeof Fibers<"u"&&Fibers.sc()))}}:P;return M})(),R=(function(){var T=R,M=P=>G=>P(G)>>>0,O=P=>()=>P()>>>0;return(T=Object.assign({},T)).Ea=M(T.Ea),T.gb=O(T.gb),T.ib=M(T.ib),T.tb=M(T.tb),T.ub=O(T.ub),T.__cxa_get_exception_ptr=M(T.__cxa_get_exception_ptr),T})(),ma.push(R.jb),w=v,da(),R}Lt++;var c=pa();if(r.instantiateWasm)return new Promise(b=>{r.instantiateWasm(c,(v,T)=>{b(u(v,T))})});if(o)return new Promise(b=>{V=v=>{var T=new WebAssembly.Instance(v,pa());b(u(T,v))}});Wt??=r.locateFile?r.locateFile?r.locateFile("ort-wasm-simd-threaded.jsep.wasm",y):y+"ort-wasm-simd-threaded.jsep.wasm":new URL("/pixie.ai/assets/ort-wasm-simd-threaded.jsep-BGTZ4Y7F.wasm",import.meta.url).href;try{var m=await(async function(b){var v=Wt;if(!k&&typeof WebAssembly.instantiateStreaming=="function"&&!fe(v))try{var T=fetch(v,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(T,b)}catch(M){ae(`wasm streaming compile failed: ${M}`),ae("falling back to ArrayBuffer instantiation")}return(async function(M,O){try{var P=await(async function(G){if(!k)try{var Z=await f(G);return new Uint8Array(Z)}catch{}if(G==Wt&&k)G=new Uint8Array(k);else{if(!h)throw"both async and sync fetching of the wasm failed";G=h(G)}return G})(M);return await WebAssembly.instantiate(P,O)}catch(G){ae(`failed to asynchronously prepare wasm: ${G}`),ot(G)}})(v,b)})(c);return u(m.instance,m.module)}catch(b){return i(b),Promise.reject(b)}})(),ls=u=>(ls=R.Ea)(u),us=()=>(us=R.Fa)();r._OrtInit=(u,c)=>(r._OrtInit=R.Ga)(u,c),r._OrtGetLastError=(u,c)=>(r._OrtGetLastError=R.Ha)(u,c),r._OrtCreateSessionOptions=(u,c,m,b,v,T,M,O,P,G)=>(r._OrtCreateSessionOptions=R.Ia)(u,c,m,b,v,T,M,O,P,G),r._OrtAppendExecutionProvider=(u,c,m,b,v)=>(r._OrtAppendExecutionProvider=R.Ja)(u,c,m,b,v),r._OrtAddFreeDimensionOverride=(u,c,m)=>(r._OrtAddFreeDimensionOverride=R.Ka)(u,c,m),r._OrtAddSessionConfigEntry=(u,c,m)=>(r._OrtAddSessionConfigEntry=R.La)(u,c,m),r._OrtReleaseSessionOptions=u=>(r._OrtReleaseSessionOptions=R.Ma)(u),r._OrtCreateSession=(u,c,m)=>(r._OrtCreateSession=R.Na)(u,c,m),r._OrtReleaseSession=u=>(r._OrtReleaseSession=R.Oa)(u),r._OrtGetInputOutputCount=(u,c,m)=>(r._OrtGetInputOutputCount=R.Pa)(u,c,m),r._OrtGetInputOutputMetadata=(u,c,m,b)=>(r._OrtGetInputOutputMetadata=R.Qa)(u,c,m,b),r._OrtFree=u=>(r._OrtFree=R.Ra)(u),r._OrtCreateTensor=(u,c,m,b,v,T)=>(r._OrtCreateTensor=R.Sa)(u,c,m,b,v,T),r._OrtGetTensorData=(u,c,m,b,v)=>(r._OrtGetTensorData=R.Ta)(u,c,m,b,v),r._OrtReleaseTensor=u=>(r._OrtReleaseTensor=R.Ua)(u),r._OrtCreateRunOptions=(u,c,m,b)=>(r._OrtCreateRunOptions=R.Va)(u,c,m,b),r._OrtAddRunConfigEntry=(u,c,m)=>(r._OrtAddRunConfigEntry=R.Wa)(u,c,m),r._OrtReleaseRunOptions=u=>(r._OrtReleaseRunOptions=R.Xa)(u),r._OrtCreateBinding=u=>(r._OrtCreateBinding=R.Ya)(u),r._OrtBindInput=(u,c,m)=>(r._OrtBindInput=R.Za)(u,c,m),r._OrtBindOutput=(u,c,m,b)=>(r._OrtBindOutput=R._a)(u,c,m,b),r._OrtClearBoundOutputs=u=>(r._OrtClearBoundOutputs=R.$a)(u),r._OrtReleaseBinding=u=>(r._OrtReleaseBinding=R.ab)(u),r._OrtRunWithBinding=(u,c,m,b,v)=>(r._OrtRunWithBinding=R.bb)(u,c,m,b,v),r._OrtRun=(u,c,m,b,v,T,M,O)=>(r._OrtRun=R.cb)(u,c,m,b,v,T,M,O),r._OrtEndProfiling=u=>(r._OrtEndProfiling=R.db)(u),r._JsepOutput=(u,c,m)=>(r._JsepOutput=R.eb)(u,c,m),r._JsepGetNodeName=u=>(r._JsepGetNodeName=R.fb)(u);var ci=()=>(ci=R.gb)(),rt=r._free=u=>(rt=r._free=R.hb)(u),$r=r._malloc=u=>($r=r._malloc=R.ib)(u),fi=(u,c,m,b,v,T)=>(fi=R.kb)(u,c,m,b,v,T),ds=()=>(ds=R.lb)(),ps=(u,c,m,b,v)=>(ps=R.mb)(u,c,m,b,v),cs=u=>(cs=R.nb)(u),hi=u=>(hi=R.ob)(u),fs=(u,c)=>(fs=R.pb)(u,c),hs=()=>(hs=R.qb)(),ms=(u,c)=>(ms=R.rb)(u,c),vr=u=>(vr=R.sb)(u),mi=u=>(mi=R.tb)(u),gi=()=>(gi=R.ub)(),gs=r.dynCall_ii=(u,c)=>(gs=r.dynCall_ii=R.vb)(u,c);r.dynCall_vii=(u,c,m)=>(r.dynCall_vii=R.dynCall_vii)(u,c,m),r.dynCall_iiiii=(u,c,m,b,v)=>(r.dynCall_iiiii=R.dynCall_iiiii)(u,c,m,b,v),r.dynCall_iii=(u,c,m)=>(r.dynCall_iii=R.dynCall_iii)(u,c,m),r.dynCall_iiiiii=(u,c,m,b,v,T)=>(r.dynCall_iiiiii=R.dynCall_iiiiii)(u,c,m,b,v,T),r.dynCall_iiiiiiii=(u,c,m,b,v,T,M,O)=>(r.dynCall_iiiiiiii=R.dynCall_iiiiiiii)(u,c,m,b,v,T,M,O),r.dynCall_iiiiiii=(u,c,m,b,v,T,M)=>(r.dynCall_iiiiiii=R.dynCall_iiiiiii)(u,c,m,b,v,T,M),r.dynCall_vi=(u,c)=>(r.dynCall_vi=R.dynCall_vi)(u,c),r.dynCall_iiii=(u,c,m,b)=>(r.dynCall_iiii=R.dynCall_iiii)(u,c,m,b),r.dynCall_i=u=>(r.dynCall_i=R.dynCall_i)(u),r.dynCall_viiiiiiii=(u,c,m,b,v,T,M,O,P)=>(r.dynCall_viiiiiiii=R.dynCall_viiiiiiii)(u,c,m,b,v,T,M,O,P),r.dynCall_viii=(u,c,m,b)=>(r.dynCall_viii=R.dynCall_viii)(u,c,m,b),r.dynCall_viijj=(u,c,m,b,v)=>(r.dynCall_viijj=R.dynCall_viijj)(u,c,m,b,v),r.dynCall_viiiiii=(u,c,m,b,v,T,M)=>(r.dynCall_viiiiii=R.dynCall_viiiiii)(u,c,m,b,v,T,M),r.dynCall_viiii=(u,c,m,b,v)=>(r.dynCall_viiii=R.dynCall_viiii)(u,c,m,b,v),r.dynCall_viiiii=(u,c,m,b,v,T)=>(r.dynCall_viiiii=R.dynCall_viiiii)(u,c,m,b,v,T),r.dynCall_vfiii=(u,c,m,b,v)=>(r.dynCall_vfiii=R.dynCall_vfiii)(u,c,m,b,v),r.dynCall_viiiiff=(u,c,m,b,v,T,M)=>(r.dynCall_viiiiff=R.dynCall_viiiiff)(u,c,m,b,v,T,M),r.dynCall_viiiiiff=(u,c,m,b,v,T,M,O)=>(r.dynCall_viiiiiff=R.dynCall_viiiiiff)(u,c,m,b,v,T,M,O),r.dynCall_ffff=(u,c,m,b)=>(r.dynCall_ffff=R.dynCall_ffff)(u,c,m,b),r.dynCall_viiff=(u,c,m,b,v)=>(r.dynCall_viiff=R.dynCall_viiff)(u,c,m,b,v),r.dynCall_fffffff=(u,c,m,b,v,T,M)=>(r.dynCall_fffffff=R.dynCall_fffffff)(u,c,m,b,v,T,M),r.dynCall_jjjjjjj=(u,c,m,b,v,T,M)=>(r.dynCall_jjjjjjj=R.dynCall_jjjjjjj)(u,c,m,b,v,T,M),r.dynCall_jjjjjj=(u,c,m,b,v,T)=>(r.dynCall_jjjjjj=R.dynCall_jjjjjj)(u,c,m,b,v,T),r.dynCall_iijjii=(u,c,m,b,v,T)=>(r.dynCall_iijjii=R.dynCall_iijjii)(u,c,m,b,v,T),r.dynCall_viiiiiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he)=>(r.dynCall_viiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he),r.dynCall_viiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z)=>(r.dynCall_viiiiiiiiii=R.dynCall_viiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z),r.dynCall_viiiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z,ie)=>(r.dynCall_viiiiiiiiiii=R.dynCall_viiiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z,ie),r.dynCall_viiiiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z,ie,le)=>(r.dynCall_viiiiiiiiiiii=R.dynCall_viiiiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z,ie,le),r.dynCall_viiiiiiiiiiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe,it,bt,Ft)=>(r.dynCall_viiiiiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe,it,bt,Ft),r.dynCall_viiiiiiiii=(u,c,m,b,v,T,M,O,P,G)=>(r.dynCall_viiiiiiiii=R.dynCall_viiiiiiiii)(u,c,m,b,v,T,M,O,P,G),r.dynCall_viiiiiiiiiiiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe,it,bt,Ft,yi)=>(r.dynCall_viiiiiiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe,it,bt,Ft,yi),r.dynCall_viiiiiii=(u,c,m,b,v,T,M,O)=>(r.dynCall_viiiiiii=R.dynCall_viiiiiii)(u,c,m,b,v,T,M,O),r.dynCall_viiiiiiiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe)=>(r.dynCall_viiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe),r.dynCall_jiji=(u,c,m,b)=>(r.dynCall_jiji=R.dynCall_jiji)(u,c,m,b),r.dynCall_v=u=>(r.dynCall_v=R.dynCall_v)(u),r.dynCall_iidiiii=(u,c,m,b,v,T,M)=>(r.dynCall_iidiiii=R.dynCall_iidiiii)(u,c,m,b,v,T,M),r.dynCall_iiiiiiiii=(u,c,m,b,v,T,M,O,P)=>(r.dynCall_iiiiiiiii=R.dynCall_iiiiiiiii)(u,c,m,b,v,T,M,O,P),r.dynCall_iiij=(u,c,m,b)=>(r.dynCall_iiij=R.dynCall_iiij)(u,c,m,b),r.dynCall_iiiiiiiiii=(u,c,m,b,v,T,M,O,P,G)=>(r.dynCall_iiiiiiiiii=R.dynCall_iiiiiiiiii)(u,c,m,b,v,T,M,O,P,G),r.dynCall_iiiiiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z,ie,le)=>(r.dynCall_iiiiiiiiiiiii=R.dynCall_iiiiiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z,ie,le),r.dynCall_iiiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z)=>(r.dynCall_iiiiiiiiiii=R.dynCall_iiiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z),r.dynCall_ji=(u,c)=>(r.dynCall_ji=R.dynCall_ji)(u,c),r.dynCall_iijii=(u,c,m,b,v)=>(r.dynCall_iijii=R.dynCall_iijii)(u,c,m,b,v),r.dynCall_vij=(u,c,m)=>(r.dynCall_vij=R.dynCall_vij)(u,c,m),r.dynCall_viiijii=(u,c,m,b,v,T,M)=>(r.dynCall_viiijii=R.dynCall_viiijii)(u,c,m,b,v,T,M),r.dynCall_viijiiiiiiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe,it,bt)=>(r.dynCall_viijiiiiiiiiiiiiii=R.dynCall_viijiiiiiiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe,it,bt),r.dynCall_viiiji=(u,c,m,b,v,T)=>(r.dynCall_viiiji=R.dynCall_viiiji)(u,c,m,b,v,T),r.dynCall_fiii=(u,c,m,b)=>(r.dynCall_fiii=R.dynCall_fiii)(u,c,m,b),r.dynCall_viijii=(u,c,m,b,v,T)=>(r.dynCall_viijii=R.dynCall_viijii)(u,c,m,b,v,T),r.dynCall_viij=(u,c,m,b)=>(r.dynCall_viij=R.dynCall_viij)(u,c,m,b),r.dynCall_jiij=(u,c,m,b)=>(r.dynCall_jiij=R.dynCall_jiij)(u,c,m,b),r.dynCall_fi=(u,c)=>(r.dynCall_fi=R.dynCall_fi)(u,c),r.dynCall_fii=(u,c,m)=>(r.dynCall_fii=R.dynCall_fii)(u,c,m),r.dynCall_jii=(u,c,m)=>(r.dynCall_jii=R.dynCall_jii)(u,c,m),r.dynCall_dii=(u,c,m)=>(r.dynCall_dii=R.dynCall_dii)(u,c,m),r.dynCall_fiiii=(u,c,m,b,v)=>(r.dynCall_fiiii=R.dynCall_fiiii)(u,c,m,b,v),r.dynCall_fif=(u,c,m)=>(r.dynCall_fif=R.dynCall_fif)(u,c,m),r.dynCall_jfi=(u,c,m)=>(r.dynCall_jfi=R.dynCall_jfi)(u,c,m),r.dynCall_viiiiiiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se)=>(r.dynCall_viiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se),r.dynCall_viiiiiiiiiiiiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe,it,bt,Ft,yi,dm)=>(r.dynCall_viiiiiiiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe,it,bt,Ft,yi,dm),r.dynCall_viiiiiiiiiiiiiiii=(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe,it)=>(r.dynCall_viiiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiiii)(u,c,m,b,v,T,M,O,P,G,Z,ie,le,he,Se,Oe,it),r.dynCall_iif=(u,c,m)=>(r.dynCall_iif=R.dynCall_iif)(u,c,m),r.dynCall_jiiii=(u,c,m,b,v)=>(r.dynCall_jiiii=R.dynCall_jiiii)(u,c,m,b,v),r.dynCall_jiii=(u,c,m,b)=>(r.dynCall_jiii=R.dynCall_jiii)(u,c,m,b),r.dynCall_viif=(u,c,m,b)=>(r.dynCall_viif=R.dynCall_viif)(u,c,m,b),r.dynCall_viiij=(u,c,m,b,v)=>(r.dynCall_viiij=R.dynCall_viiij)(u,c,m,b,v),r.dynCall_viiiijii=(u,c,m,b,v,T,M,O)=>(r.dynCall_viiiijii=R.dynCall_viiiijii)(u,c,m,b,v,T,M,O),r.dynCall_iiiiij=(u,c,m,b,v,T)=>(r.dynCall_iiiiij=R.dynCall_iiiiij)(u,c,m,b,v,T),r.dynCall_iiiiid=(u,c,m,b,v,T)=>(r.dynCall_iiiiid=R.dynCall_iiiiid)(u,c,m,b,v,T),r.dynCall_iiiiijj=(u,c,m,b,v,T,M)=>(r.dynCall_iiiiijj=R.dynCall_iiiiijj)(u,c,m,b,v,T,M),r.dynCall_iiiiiijj=(u,c,m,b,v,T,M,O)=>(r.dynCall_iiiiiijj=R.dynCall_iiiiiijj)(u,c,m,b,v,T,M,O);var ys=u=>(ys=R.wb)(u),_s=()=>(_s=R.xb)(),bs=u=>(bs=R.yb)(u),ws=()=>(ws=R.zb)();return(function u(){if(0<Lt)Vt=u;else if(o)t(r),cr();else{for(;0<Yr.length;)Yr.shift()(r);0<Lt?Vt=u:(r.calledRun=!0,K||(cr(),t(r)))}})(),r.PTR_SIZE=4,n},kd=xi,vs=globalThis.self?.name?.startsWith("em-pthread"),vs&&xi()}),ki,gn,xs,Re,Cd,kr,ks,Cs,Ci,Ss,Si,Sd,Ti,Td,Nn=q(()=>{Dn(),ki=typeof location>"u"?void 0:location.origin,gn=import.meta.url>"file:"&&import.meta.url<"file;",xs=()=>{{if(gn){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,ki).href}return import.meta.url}},Re=xs(),Cd=()=>{if(Re&&!Re.startsWith("blob:"))return Re.substring(0,Re.lastIndexOf("/")+1)},kr=(e,t)=>{try{let i=t??Re;return(i?new URL(e,i):new URL(e)).origin===ki}catch{return!1}},ks=(e,t)=>{let i=t??Re;try{return(i?new URL(e,i):new URL(e)).href}catch{return}},Cs=(e,t)=>`${t??"./"}${e}`,Ci=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Ss=async e=>(await import(e)).default,Si=(Mm(),dr($d)).default,Sd=async()=>{if(!Re)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(kr(Re))return[void 0,Si()];let e=await Ci(Re);return[e,Si(e)]},Ti=(zm(),dr(xd)).default,Td=async(e,t,i,r)=>{let n=Ti&&!(e||t);if(n)if(Re)n=kr(Re);else if(r&&!i)n=!0;else throw new Error("cannot determine the script source URL.");if(n)return[void 0,Ti];{let s="ort-wasm-simd-threaded.jsep.mjs",a=e??ks(s,t),o=i&&a&&!kr(a,t),l=o?await Ci(a):a??Cs(s,t);return[o?l:void 0,await Ss(l)]}}}),Ii,Cr,Yt,Ei,Ts,Is,Es,Pn,ye,At=q(()=>{Nn(),Cr=!1,Yt=!1,Ei=!1,Ts=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Is=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Es=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Pn=async e=>{if(Cr)return Promise.resolve();if(Yt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ei)throw new Error("previous call to 'initializeWebAssembly()' failed.");Yt=!0;let t=e.initTimeout,i=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Es())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Is())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let r=Ts();i>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=i=1);let n=e.wasmPaths,s=typeof n=="string"?n:void 0,a=n?.mjs,o=a?.href??a,l=n?.wasm,d=l?.href??l,p=e.wasmBinary,[f,h]=await Td(o,s,i>1,!!p||!!d),g=!1,_=[];if(t>0&&_.push(new Promise(y=>{setTimeout(()=>{g=!0,y()},t)})),_.push(new Promise((y,k)=>{let $={numThreads:i};if(p)$.wasmBinary=p;else if(d||s)$.locateFile=w=>d??s+w;else if(o&&o.indexOf("blob:")!==0)$.locateFile=w=>new URL(w,o).href;else if(f){let w=Cd();w&&($.locateFile=C=>w+C)}h($).then(w=>{Yt=!1,Cr=!0,Ii=w,y(),f&&URL.revokeObjectURL(f)},w=>{Yt=!1,Ei=!0,k(w)})})),await Promise.race(_),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ye=()=>{if(Cr&&Ii)return Ii;throw new Error("WebAssembly is not initialized yet.")}}),He,Ur,ge,Un=q(()=>{At(),He=(e,t)=>{let i=ye(),r=i.lengthBytesUTF8(e)+1,n=i._malloc(r);return i.stringToUTF8(e,n,r),t.push(n),n},Ur=(e,t,i,r)=>{if(typeof e=="object"&&e!==null){if(i.has(e))throw new Error("Circular reference in options");i.add(e)}Object.entries(e).forEach(([n,s])=>{let a=t?t+n:n;if(typeof s=="object")Ur(s,a+".",i,r);else if(typeof s=="string"||typeof s=="number")r(a,s.toString());else if(typeof s=="boolean")r(a,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},ge=e=>{let t=ye(),i=t.stackSave();try{let r=t.PTR_SIZE,n=t.stackAlloc(2*r);t._OrtGetLastError(n,n+r);let s=Number(t.getValue(n,r===4?"i32":"i64")),a=t.getValue(n+r,"*"),o=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(i)}}}),Id,Am=q(()=>{At(),Un(),Id=e=>{let t=ye(),i=0,r=[],n=e||{};try{if(e?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(n.terminate=!1);let s=0;return e?.tag!==void 0&&(s=He(e.tag,r)),i=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,s),i===0&&ge("Can't create run options."),e?.extra!==void 0&&Ur(e.extra,"",new WeakSet,(a,o)=>{let l=He(a,r),d=He(o,r);t._OrtAddRunConfigEntry(i,l,d)!==0&&ge(`Can't set a run config entry: ${a} - ${o}.`)}),[i,r]}catch(s){throw i!==0&&t._OrtReleaseRunOptions(i),r.forEach(a=>t._free(a)),s}}}),Ms,zs,As,Xt,Os,Ed,Om=q(()=>{At(),Un(),Ms=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},zs=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},As=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(i=>(typeof i=="string"?i:i.name)==="webgpu")&&(e.enableMemPattern=!1)},Xt=(e,t,i,r)=>{let n=He(t,r),s=He(i,r);ye()._OrtAddSessionConfigEntry(e,n,s)!==0&&ge(`Can't set a session config entry: ${t} - ${i}.`)},Os=async(e,t,i)=>{for(let r of t){let n=typeof r=="string"?r:r.name,s=[];switch(n){case"webnn":if(n="WEBNN",typeof r!="string"){let p=r?.deviceType;p&&Xt(e,"deviceType",p,i)}break;case"webgpu":if(n="JS",typeof r!="string"){let p=r;if(p?.preferredLayout){if(p.preferredLayout!=="NCHW"&&p.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${p.preferredLayout}`);Xt(e,"preferredLayout",p.preferredLayout,i)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${n}`)}let a=He(n,i),o=s.length,l=0,d=0;if(o>0){l=ye()._malloc(o*ye().PTR_SIZE),i.push(l),d=ye()._malloc(o*ye().PTR_SIZE),i.push(d);for(let p=0;p<o;p++)ye().setValue(l+p*ye().PTR_SIZE,s[p][0],"*"),ye().setValue(d+p*ye().PTR_SIZE,s[p][1],"*")}await ye()._OrtAppendExecutionProvider(e,a,l,d,o)!==0&&ge(`Can't append execution provider: ${n}.`)}},Ed=async e=>{let t=ye(),i=0,r=[],n=e||{};As(n);try{let s=Ms(n.graphOptimizationLevel??"all"),a=zs(n.executionMode??"sequential"),o=typeof n.logId=="string"?He(n.logId,r):0,l=n.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let d=n.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let p=typeof n.optimizedModelFilePath=="string"?He(n.optimizedModelFilePath,r):0;if(i=t._OrtCreateSessionOptions(s,!!n.enableCpuMemArena,!!n.enableMemPattern,a,!!n.enableProfiling,0,o,l,d,p),i===0&&ge("Can't create session options."),n.executionProviders&&await Os(i,n.executionProviders,r),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);Xt(i,"enableGraphCapture",n.enableGraphCapture.toString(),r)}if(n.freeDimensionOverrides)for(let[f,h]of Object.entries(n.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let g=He(f,r);t._OrtAddFreeDimensionOverride(i,g,h)!==0&&ge(`Can't set a free dimension override: ${f} - ${h}.`)}return n.extra!==void 0&&Ur(n.extra,"",new WeakSet,(f,h)=>{Xt(i,f,h,r)}),[i,r]}catch(s){throw i!==0&&t._OrtReleaseSessionOptions(i)!==0&&ge("Can't release session options."),r.forEach(a=>t._free(a)),s}}}),Ct,at,St,Hr,qr,qn,Wn,yn,ne=q(()=>{Ct=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},at=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},St=(e,t)=>{let i=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((n,s)=>n*s,1);return i>0?Math.ceil(r*i):void 0},Hr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},qr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},qn=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Wn=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",yn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Ln,Md=q(()=>{Dn(),Ln=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let i=t.headers.get("Content-Length"),r=i?parseInt(i,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),s;try{s=new ArrayBuffer(r)}catch(o){if(o instanceof RangeError){let l=Math.ceil(r/65536);s=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw o}let a=0;for(;;){let{done:o,value:l}=await n.read();if(o)break;let d=l.byteLength;new Uint8Array(s,a,d).set(l),a+=d}return new Uint8Array(s,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Rs,Bs,Ds,Ns,Vn,Ps,de,st=q(()=>{ne(),Rs=["V","I","W","E","F"],Bs=(e,t)=>{console.log(`[${Rs[e]},${new Date().toISOString()}]${t}`)},Vn=(e,t)=>{Ds=e,Ns=t},Ps=(e,t)=>{let i=qr(e),r=qr(Ds);i>=r&&Bs(i,typeof t=="function"?t():t)},de=(...e)=>{Ns&&Ps(...e)}}),Us,Pt,A,Wr,zd,Ad,Od,se=q(()=>{Us=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Pt=class{static calcShape(e,t,i=!1){let r=e.length,n=t.length;if(r===0)return t;if(n===0)return e;let s=Math.max(e.length,t.length),a=new Array(s);if(i){if(r<2||n<2)return;let o=Us.calcMatMulShape([e[r-2],e[r-1]],[t[n-2],t[n-1]]);if(o===void 0)return;[a[s-2],a[s-1]]=o}for(let o=i?3:1;o<=s;o++){let l=r-o<0?1:e[r-o],d=n-o<0?1:t[n-o];if(l!==d&&l>1&&d>1)return;let p=Math.max(l,d);if(l&&d)a[s-o]=Math.max(l,d);else{if(p>1)return;a[s-o]=0}}return a}static isValidBroadcast(e,t){let i=e.length,r=t.length;if(i>r)return!1;for(let n=1;n<=i;n++)if(e[i-n]!==1&&e[i-n]!==t[r-n])return!1;return!0}},A=class Dr{static size(t){return Dr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,i=4){let r=t.length;if(r===0)return[];let n=new Array(r),s=r-1;for(;s>=0;){if(t[s]%i===0){n[s]=t[s]/i;break}if(i%t[s]!==0)throw new Error("cannot convert shape");n[s]=1,i/=t[s],s--}for(s--;s>=0;s--)n[s]=t[s];return n}static sizeFromDimension(t,i){if(i<0||i>t.length)throw new Error(`invalid dimension of ${i} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Dr.getSizeFromDimensionRange(t,i,t.length)}static sizeToDimension(t,i){if(i<0||i>t.length)throw new Error(`invalid dimension of ${i} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Dr.getSizeFromDimensionRange(t,0,i)}static getSizeFromDimensionRange(t,i,r){let n=1;for(let s=i;s<r;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[s])}return n}static computeStrides(t){let i=t.length;if(i===0)return[];if(i===1)return[1];let r=new Array(i);r[i-1]=1,r[i-2]=t[i-1];for(let n=i-3;n>=0;--n)r[n]=r[n+1]*t[n+1];return r}static normalizeAxis(t,i){if(t<-i&&t>=i)throw new Error("unsupported axis for this operation.");return t<0?t+i:t}static normalizeAxes(t,i){return t.map(r=>this.normalizeAxis(r,i??t.length))}static sortBasedOnPerm(t,i){return i?i.map(r=>t[r]):t.slice().reverse()}static padShape(t,i){let r=t.length;return t.map((n,s)=>n+i[s]+i[s+r])}static areEqual(t,i){return t.length!==i.length?!1:t.every((r,n)=>r===i[n])}},Wr=class sr{static adjustPoolAttributes(t,i,r,n,s,a){if(!t&&r.length!==i.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<i.length-2;o++)o>=r.length?r.push(i[o+2]):r[o]=i[o+2];for(let o=0;o<r.length;o++)if(o<n.length){if(n[o]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let o=0;o<r.length;o++)if(o<s.length){if(s[o]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let o=0;o<r.length*2;o++)if(o<a.length){if(a[o]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let o=0;o<r.length;o++){if(r[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[o]>=r[o]||a[o+r.length]>=r[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,i,r,n,s,a,o){if(o){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)sr.adjustPadAndReturnShape(t[l+(a?1:2)],i[l],r[l],n[l],s,l,l+t.length-2,o)}}static computePoolOutputShape(t,i,r,n,s,a,o){if(i.length<=0)throw new Error("input shape must be of size greater than 0");let l=[i[0],i[1]];return sr.computeShapeHelper(t,i,l,r,n,s,a,o),l}static computeConvOutputShape(t,i,r,n,s,a,o){if(t.length<=0||i.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],i[0]];return sr.computeShapeHelper(!1,t,l,r,n,s,a,o),l}static computeShapeHelper(t,i,r,n,s,a,o,l){if(t)for(let d=0;d<i.length-2;d++)r.push(1);else for(let d=0;d<i.length-2;d++)r.push(sr.adjustPadAndReturnShape(i[d+2],n[d],s[d],a[d],o,d,d+i.length-2,l))}static adjustPadAndReturnShape(t,i,r,n,s,a,o,l){let d=r*(n-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return s[a]=0,s[o]=0,Math.floor((t-d)/i+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((t+i-1)/i-1)*i+n-t;return s[a]=Math.floor(l==="SAME_LOWER"?(p+1)/2:p/2),s[o]=p-s[a],Math.floor((t+p-n)/i+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+s[a]+s[o]-d)/i+1)}},zd=class{static getShapeOfGemmResult(e,t,i,r,n){if(e.length!==2||i.length!==2)throw new Error("shape need to be of size 2");let s,a,o;t?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(r?(o=i[0],l=1):(o=i[1],l=0),i[l]!==a)throw new Error("dimension mismatch");if(s<=0||o<=0||a<=0)throw new Error("invalid shape specified");if(n&&!Pt.isValidBroadcast(n,[s,o]))throw new Error("gemm: invalid bias shape for broadcast");return[s,o,a]}},Ad=-34028234663852886e22,Od=34028234663852886e22}),Gn,Rd=q(()=>{ne(),Gn=(e,t)=>new(Hr(t))(e)}),Mi,_n,zi,qs,Ai,Ws,Oi,Ri,Bi,Ls,Bd,Rm=q(()=>{ne(),st(),Mi=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),_n=(e,t)=>{if(t==="int32")return e;let i=Mi.get(t);if(!i)throw new Error(`WebNN backend does not support data type: ${t}`);let r=i/8;if(e.byteLength%r!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let n=e.byteLength/r,s=new(Hr(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let a=new Int32Array(n);for(let o=0;o<n;o++){let l=s[o];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");a[o]=Number(l)}return new Uint8Array(a.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&s.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let a=Int32Array.from(s,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},zi=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let i=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,i);switch(t){case"int64":{let n=BigInt64Array.from(r,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(r.some(s=>s<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(r,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(r.some(s=>s<-128||s>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(r,Number);return new Uint8Array(n.buffer)}case"uint8":{if(r.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number)}case"uint32":{if(r.some(s=>s<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(r,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},qs=1,Ai=()=>qs++,Ws=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Oi=(e,t)=>{let i=Mi.get(e);if(!i)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((r,n)=>r*n)*i/8):0},Ri=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:i,tensor:r,dataType:n,shape:s,fallbackDataType:a}=e;this.sessionId=t,this.mlContext=i,this.mlTensor=r,this.dataType=n,this.tensorShape=s,this.fallbackDataType=a}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Oi(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),i=zi(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(i);return}else return i.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,i){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===i.length&&this.tensorShape.every((r,n)=>r===i[n])}setIsDataConverted(e){this.isDataConverted=e}},Bi=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,i,r){let n=this.tensorManager.getMLContext(e),s;if(!n.opSupportLimits().input.dataTypes.includes(t)){if(s=Ws.get(t),!s||!n.opSupportLimits().input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,i))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==Oi(t,i))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let a=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,i,a,!0,!0,s),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=_n(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?zi(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Ls=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=Ai();return this.tensorTrackersById.set(e,new Bi(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,i,r,n){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${i}, shape: ${r}, copyOld: ${n}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,i,r,n)}upload(e,t){let i=this.tensorTrackersById.get(e);if(!i)throw new Error("Tensor not found.");i.upload(t)}async download(e,t){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let i=this.tensorTrackersById.get(e);if(!i)throw new Error("Tensor not found.");return i.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,i,r){let n=this.getMLContext(e),s=Ai(),a=new Ri({sessionId:e,context:n,tensor:t,dataType:i,shape:r});return this.tensorTrackersById.set(s,new Bi(this,a)),this.externalTensors.add(a),s}async getCachedTensor(e,t,i,r,n,s,a){let o=this.getMLContext(e);for(let[d,p]of this.freeTensors.entries())if(p.canReuseTensor(o,t,i)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${i}`);let f=this.freeTensors.splice(d,1)[0];return f.sessionId=e,f}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${i}}`);let l=await o.createTensor({dataType:a??t,shape:i,dimensions:i,usage:r,writable:n,readable:s});return new Ri({sessionId:e,context:o,tensor:l,dataType:t,shape:i,fallbackDataType:a})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Bd=(...e)=>new Ls(...e)}),Zt,Vs,Dd,Bm=q(()=>{ne(),At(),Rd(),Rm(),st(),Zt=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Vs=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let i=Object.keys(e).sort(),r=Object.keys(t).sort();return i.length===r.length&&i.every((n,s)=>n===r[s]&&e[n]===t[n])},Dd=class{constructor(e){this.tensorManager=Bd(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,Vn(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let i of t)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${i}}`),this.tensorManager.releaseTensorId(i);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let i=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(i!==-1)return this.mlContextCache[i].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}else if(e===void 0){let i=this.mlContextCache.findIndex(r=>r.options===void 0&&r.gpuDevice===void 0);if(i!==-1)return this.mlContextCache[i].mlContext;{let r=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:r}),r}}let t=this.mlContextCache.findIndex(i=>Vs(i.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:i}),i}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let i=this.sessionIdsByMLContext.get(t);i||(i=new Set,this.sessionIdsByMLContext.set(t,i)),i.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let i=this.sessionIdsByMLContext.get(t);if(i.delete(e),i.size===0){this.sessionIdsByMLContext.delete(t);let r=this.mlContextCache.findIndex(n=>n.mlContext===t);r!==-1&&this.mlContextCache.splice(r,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,i,r,n){let s=Zt.get(i);if(!s)throw new Error(`Unsupported ONNX data type: ${i}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,r,n)}async createTemporaryTensor(e,t,i){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${i}}`);let r=Zt.get(t);if(!r)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,r,i,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!ye().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let i=await this.tensorManager.download(e);return Gn(i,t)}}registerMLTensor(e,t,i,r){let n=Zt.get(i);if(!n)throw new Error(`Unsupported ONNX data type: ${i}`);let s=this.tensorManager.registerTensor(e,t,n,r);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${r}} -> {tensorId: ${s}}`),s}registerMLConstant(e,t,i,r,n,s,a=!1){if(!s)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let l=s.get(o);if(!l)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+i>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(t,t+i).buffer,p;switch(n.dataType){case"float32":p=new Float32Array(d);break;case"float16":p=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":if(a){let f=_n(new Uint8Array(d),"int64");p=new Int32Array(f.buffer),n.dataType="int32"}else p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`)}return de("verbose",()=>`[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}} ${a?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),r.constant(n,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let i=this.sessionGraphInputs.get(e);return i?i.includes(t):!1}isGraphOutput(e,t){let i=this.sessionGraphOutputs.get(e);return i?i.includes(t):!1}isGraphInputOutputTypeSupported(e,t,i=!0){let r=this.mlContextBySessionId.get(e),n=Zt.get(Ct(t));return typeof n>"u"?!1:i?!!r?.opSupportLimits().input.dataTypes.includes(n):!!r?.opSupportLimits().output.dataTypes.includes(n)}flush(){}}}),jn=q(()=>{}),Di,Sr,Tr,Gs,js,Ni,bn,Hs,Nd,Dm=q(()=>{st(),jn(),Di=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Sr=[],Tr=e=>Math.ceil(Number(e)/16)*16,Gs=e=>{for(let t=0;t<Sr.length;t++){let i=Sr[t];if(e<=i)return i}return Math.ceil(e/16)*16},js=1,Ni=()=>js++,bn=async(e,t,i,r)=>{let n=Tr(i),s=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,s,0,n),e.flush(),await s.mapAsync(GPUMapMode.READ);let o=s.getMappedRange();if(r){let l=r();return l.set(new Uint8Array(o,0,i)),l}else return new Uint8Array(o.slice(0,i))}finally{s.destroy()}},Hs=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Di)Sr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let i=t.buffer,r=t.byteOffset,n=t.byteLength,s=Tr(n),a=this.storageCache.get(e);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${n}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=o.getMappedRange();new Uint8Array(l).set(new Uint8Array(i,r,n)),o.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(o,0,a.gpuData.buffer,0,s),this.backend.device.queue.submit([d.finish()]),o.destroy(),de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let i=this.storageCache.get(e);if(!i)throw new Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw new Error("destination gpu data for memcpy does not exist");if(i.originalSize!==r.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=Tr(i.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(i.gpuData.buffer,0,r.gpuData.buffer,0,n)}registerExternalBuffer(e,t,i){let r;if(i){if(r=i[0],e===i[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=Ni();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let i=Gs(e),r,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||s){let o=(n?this.freeBuffers:this.freeUniformBuffers).get(i);o?o.length>0?r=o.pop():r=this.backend.device.createBuffer({size:i,usage:t}):r=this.backend.device.createBuffer({size:i,usage:t})}else r=this.backend.device.createBuffer({size:i,usage:t});let a={id:Ni(),type:0,buffer:r};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(e)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,i=this.storageCache.get(t);if(!i){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${i.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(i.gpuData.buffer),i.originalSize}async download(e,t){let i=this.storageCache.get(Number(e));if(!i)throw new Error("data does not exist");await bn(this.backend,i.gpuData.buffer,i.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Di.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let i=this.freeBuffers.get(e.size)||[];t===void 0||i.length>=t?e.destroy():i.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let i=this.freeUniformBuffers.get(e.size)||[];t===void 0||i.length>=t?e.destroy():i.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(i=>{i.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(i=>{i.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Nd=(...e)=>new Hs(...e)}),Fs,me,xe=q(()=>{Fs=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},me=e=>new Fs(e)}),Ut,Ir,Te,Me,ee,ve,wn,Nt,mt,J,Qt,B,Q,Pd,Hn,Ks,Ud,oe=q(()=>{ne(),se(),Ut=64,Ir=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Te=(e,t=1)=>{let i=Ir(e,t);return typeof i=="string"?i:i[0]},Me=(e,t=1)=>{let i=Ir(e,t);return typeof i=="string"?i:i[1]},ee=(...e)=>{let t=[];return e.forEach(i=>{i.length!==0&&t.push({type:12,data:i},{type:12,data:A.computeStrides(i)})}),t},ve=e=>e%4===0?4:e%2===0?2:1,wn=(e="f32",t,i="0")=>!t||t===1?`${e}(${i})`:`vec${t}<${e}>(${i})`,Nt=(e,t,i)=>e==="f32"?i:t===1?`f32(${i})`:`vec${t}<f32>(${i})`,mt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,J=(e,t,i,r)=>e.startsWith("uniforms.")&&i>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:i>1?`${e}[${t}]`:e,Qt=(e,t,i,r,n)=>{let s=typeof i=="number",a=s?i:i.length,o=[...new Array(a).keys()],l=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,d=Ir(t,n),p=typeof d=="string"?d:d[1],f=typeof d=="string"?d:d[0],h={indices:l,value:p,storage:f,tensor:t},g=U=>typeof U=="string"?U:`${U}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},y=s?"uniforms.":"",k=`${y}${e}_shape`,$=`${y}${e}_strides`,w="";for(let U=0;U<a-1;U++)w+=`
    let dim${U} = current / ${J($,U,a)};
    let rest${U} = current % ${J($,U,a)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;w+=`indices[${a-1}] = current;`;let C=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${w}
    return indices;
  }`,x=U=>(_.offsetToIndices=!0,a<2?U:`o2i_${e}(${U})`),S=[];if(a>=2)for(let U=a-1;U>=0;U--)S.push(`${J($,U,a)} * (indices[${U}])`);let I=a<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${S.join("+")};
  }`,E=U=>(_.indicesToOffset=!0,a<2?U:`i2o_${e}(${U})`),z=(...U)=>a===0?"0u":`${h.indices}(${U.map(g).join(",")})`,D=(U,L)=>a<2?`${U}`:`${J(U,L,a)}`,W=(U,L,re)=>a<2?`${U}=${re};`:`${J(U,L,a)}=${re};`,H={},Y=(U,L)=>{_.broadcastedIndicesToOffset=!0;let re=`${L.name}broadcastedIndicesTo${e}Offset`;if(re in H)return`${re}(${U})`;let pe=[];for(let N=a-1;N>=0;N--){let ue=L.indicesGet("outputIndices",N+L.rank-a);pe.push(`${D($,N)} * (${ue} % ${D(k,N)})`)}return H[re]=`fn ${re}(outputIndices: ${L.type.indices}) -> u32 {
             return ${pe.length>0?pe.join("+"):"0u"};
           }`,`${re}(${U})`},F=(U,L)=>(()=>{if(h.storage===h.value)return`${e}[${U}]=${L};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${L}), select(0u, 0xFFFFFFFFu, ${L} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${L}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${L}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),V=U=>(()=>{if(h.storage===h.value)return`${e}[${U}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${U}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${U}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),te=a<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${p} {
    return ${V(`i2o_${e}(indices)`)};
  }`,X=a<2?"":(()=>{let U=o.map(re=>`d${re}: u32`).join(", "),L=o.map(re=>`d${re}`).join(", ");return`
  fn get_${e}(${U}) -> ${p} {
    return get_${e}ByIndices(${z(L)});
  }`})(),j=(...U)=>{if(U.length!==a)throw new Error(`indices length must be ${a}`);let L=U.map(g).join(",");return a===0?V("0u"):a===1?V(L[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${L})`)},ae=U=>a<2?V(U):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${U})`),K=a<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${p}) {
    ${F(`i2o_${e}(indices)`,"value")}
  }`,fe=a<2?"":(()=>{let U=o.map(re=>`d${re}: u32`).join(", "),L=o.map(re=>`d${re}`).join(", ");return`
  fn set_${e}(${U}, value: ${p}) {
    set_${e}ByIndices(${z(L)}, value);
  }`})();return{impl:()=>{let U=[],L=!1;return _.offsetToIndices&&(U.push(C),L=!0),_.indicesToOffset&&(U.push(I),L=!0),_.broadcastedIndicesToOffset&&(Object.values(H).forEach(re=>U.push(re)),L=!0),_.set&&(U.push(fe),L=!0),_.setByIndices&&(U.push(K),L=!0),_.get&&(U.push(X),L=!0),_.getByIndices&&(U.push(te),L=!0),!s&&L&&U.unshift(`const ${k} = ${h.indices}(${i.join(",")});`,`const ${$} = ${h.indices}(${A.computeStrides(i).join(",")});`),U.join(`
`)},type:h,offsetToIndices:x,indicesToOffset:E,broadcastedIndicesToOffset:Y,indices:z,indicesGet:D,indicesSet:W,set:(...U)=>{if(U.length!==a+1)throw new Error(`indices length must be ${a}`);let L=U[a];if(typeof L!="string")throw new Error("value must be string");let re=U.slice(0,a).map(g).join(",");return a===0?F("0u",L):a===1?F(re[0],L):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${re}, ${L})`)},setByOffset:F,setByIndices:(U,L)=>a<2?F(U,L):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${L});`),get:j,getByOffset:V,getByIndices:ae,usage:r,name:e,strides:$,shape:k,rank:a}},B=(e,t,i,r=1)=>Qt(e,t,i,"input",r),Q=(e,t,i,r=1)=>Qt(e,t,i,"output",r),Pd=(e,t,i)=>Qt(e,t,i,"atomicOutput",1),Hn=(e,t,i,r=1)=>Qt(e,t,i,"internal",r),Ks=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Ut){let t=typeof e=="number"?e:e[0],i=typeof e=="number"?1:e[1],r=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||i>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${i}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*i*r>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${i}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*i*r}u + local_idx;`;return`@compute @workgroup_size(${t}, ${i}, ${r})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let i=e.usage==="input"?"read":"read_write",r=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${i}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,i=1){return this.uniforms.push({name:e,type:t,length:i}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:i,length:r}of this.uniforms)if(r&&r>4)i==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${i}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${i}>, ${Math.ceil(r/4)}>`);else{let n=r==null||r===1?i:`vec${r}<${i}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Ud=(e,t)=>new Ks(e,t)}),Ys,Pi,Xs,Zs,Qs,Js,De,qd,Wd,gt=q(()=>{ne(),se(),xe(),oe(),Ys=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Pi=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Xs=(e,t)=>A.sortBasedOnPerm(e,Pi(e.length,t)),Zs=(e,t,i,r)=>{let n=`fn perm(i: ${r.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`;for(let s=0;s<t;++s)n+=`a[${e[s]}]=i[${s}];`;return n+="return a;}"},Qs=(e,t)=>{let i=[],r=[];for(let n=0;n<e.length;++n)e[n]!==1&&i.push(e[n]),e[t[n]]!==1&&r.push(t[n]);return{newShape:i,newPerm:r}},Js=(e,t)=>{let i=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<i)return!1;i=e[r]}return!0},De=(e,t)=>{let i=e.dataType,r=e.dims.length,n=Pi(r,t),s=Xs(e.dims,n),a=e.dims,o=s,l=r<2||Js(n,e.dims),d;if(l)return d=_=>{let y=B("input",i,a,4),k=Q("output",i,o,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(y,k)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=A.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:d};let{newShape:p,newPerm:f}=Qs(e.dims,n),h=A.areEqual(f,[2,3,1]),g=A.areEqual(f,[3,1,2]);if(p.length===2||h||g){a=h?[p[0],p[1]*p[2]]:g?[p[0]*p[1],p[2]]:p,o=[a[1],a[0]];let _=16;return d=y=>{let k=B("a",i,a.length),$=Q("output",i,o.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(k,$)}
  var<workgroup> tile : array<array<${$.type.value}, ${_+1}>, ${_}>;
  ${y.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${k.getByIndices(`${k.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${$.setByIndices(`${$.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=A.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/_),y:Math.ceil(o[0]/_)},programUniforms:[{type:12,data:y},...ee(a,o)]}},getShaderSource:d}}return d=_=>{let y=B("a",i,a.length),k=Q("output",i,o.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(y,k)}

  ${Zs(n,r,y,k)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${k.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${k.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=A.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...ee(a,o)]}},getShaderSource:d}},qd=(e,t)=>{Ys(e.inputs,t.perm),e.compute(De(e.inputs[0],t.perm))},Wd=e=>me({perm:e.perm})}),eo,to,ro,io,no,ao,so,oo,lo,uo,We,Ld,Vd,Gd,jd,Hd,Fd,Kd,Yd,Xd,Zd,Nm=q(()=>{ne(),se(),oe(),Fn(),gt(),eo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},to={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},ro={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},io={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},no=(e,t)=>{let i=[];for(let r=t-e;r<t;++r)i.push(r);return i},ao=(e,t)=>{let i=[],r=e.length;for(let s=0;s<r;s++)t.indexOf(s)===-1&&i.push(e[s]);let n=t.map(s=>e[s]);return[i,n]},so=(e,t)=>{let i=e.length+t.length,r=[],n=0;for(let s=0;s<i;s++)t.indexOf(s)===-1?r.push(e[n++]):r.push(1);return r},oo=(e,t)=>{for(let i=0;i<e.length;++i)if(e[e.length-i-1]!==t-1-i)return!1;return!0},lo=(e,t)=>{let i=[];if(!oo(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&i.push(r);e.forEach(r=>i.push(r))}return i},uo=(e,t,i,r,n,s,a)=>{let o=i[0].dims,l=A.size(s),d=A.size(a),p=B("_A",i[0].dataType,o),f=Q("output",n,s),h=64;l===1&&(h=256);let g=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,_=y=>`
        ${y.registerUniform("reduceSize","u32").declareVariables(p,f)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${y.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${ro[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${p.getByOffset("offset + k")});
           bestValue = ${eo[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${to[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${r==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${io[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${h}`,inputDependencies:["type"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}},We=(e,t,i,r)=>{let n=e.inputs.length===1?i:$n(e.inputs,i),s=n.axes;s.length===0&&!n.noopWithEmptyAxes&&(s=e.inputs[0].dims.map((g,_)=>_));let a=A.normalizeAxes(s,e.inputs[0].dims.length),o=a,l=e.inputs[0],d=lo(o,e.inputs[0].dims.length);d.length>0&&(l=e.compute(De(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],o=no(o.length,l.dims.length));let[p,f]=ao(l.dims,o),h=p;n.keepDims&&(h=so(p,a)),e.compute(uo(t,n.cacheKey,[l],r,e.inputs[0].dataType,h,f),{inputs:[l]})},Ld=(e,t)=>{We(e,"ReduceMeanShared",t,"mean")},Vd=(e,t)=>{We(e,"ReduceL1Shared",t,"l1")},Gd=(e,t)=>{We(e,"ReduceL2Shared",t,"l2")},jd=(e,t)=>{We(e,"ReduceLogSumExpShared",t,"logSumExp")},Hd=(e,t)=>{We(e,"ReduceMaxShared",t,"max")},Fd=(e,t)=>{We(e,"ReduceMinShared",t,"min")},Kd=(e,t)=>{We(e,"ReduceProdShared",t,"prod")},Yd=(e,t)=>{We(e,"ReduceSumShared",t,"sum")},Xd=(e,t)=>{We(e,"ReduceSumSquareShared",t,"sumSquare")},Zd=(e,t)=>{We(e,"ReduceLogSumShared",t,"logSum")}}),Le,po,Lr,$n,Ve,co,fo,ho,mo,go,yo,_o,bo,wo,$o,Ge,Qd,Jd,ep,tp,rp,ip,np,ap,sp,op,Fn=q(()=>{ne(),se(),xe(),oe(),Nm(),Le=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},po=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Lr=(e,t,i,r,n,s,a=!1,o=!1)=>{let l=[],d=i[0].dims,p=d.length,f=A.normalizeAxes(n,p),h=!o&&f.length===0;d.forEach((y,k)=>{h||f.indexOf(k)>=0?a&&l.push(1):l.push(y)});let g=l.length,_=A.size(l);return{name:e,shaderCache:t,getShaderSource:y=>{let k=[],$=B("_A",i[0].dataType,p),w=Q("output",s,g),C=r($,w,f),x=C[2];for(let S=0,I=0;S<p;S++)h||f.indexOf(S)>=0?(a&&I++,x=`for(var j${S}: u32 = 0; j${S} < ${d[S]}; j${S}++) {
                  ${C[2].includes("last_index")?`let last_index = j${S};`:""}
                  ${$.indicesSet("input_indices",S,`j${S}`)}
                  ${x}
                }`):(k.push(`${$.indicesSet("input_indices",S,w.indicesGet("output_indices",I))};`),I++);return`

        ${y.registerUniform("output_size","u32").declareVariables($,w)}

        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${$.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${k.join(`
`)}
          ${C[0]}       // init ops for reduce max/min
          ${C[1]}
          ${x}
          ${C[3]}
          ${C.length===4?w.setByOffset("global_idx","value"):C.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:s}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...ee(d,l)]})}},$n=(e,t)=>{let i=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>i.push(Number(r))),me({axes:i,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ve=(e,t,i,r)=>{let n=e.inputs,s=n.length===1?i:$n(n,i);e.compute(Lr(t,{hint:s.cacheKey,inputDependencies:["rank"]},[n[0]],s.noopWithEmptyAxes&&s.axes.length===0?po:r,s.axes,n[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},co=(e,t)=>{Le(e.inputs),Ve(e,"ReduceLogSum",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${i.getByIndices("input_indices")};`,"value = log(value);"])},fo=(e,t)=>{Le(e.inputs),Ve(e,"ReduceL1",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${i.getByIndices("input_indices")});`,""])},ho=(e,t)=>{Le(e.inputs),Ve(e,"ReduceL2",t,(i,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${i.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},mo=(e,t)=>{Le(e.inputs),Ve(e,"ReduceLogSumExp",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${i.getByIndices("input_indices")});`,"value = log(value);"])},go=(e,t)=>{Le(e.inputs),Ve(e,"ReduceMax",t,(i,r,n)=>{let s=[];for(let a=0;a<i.rank;a++)(n.indexOf(a)>=0||n.length===0)&&s.push(i.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};`,`value = max(value, ${i.getByIndices("input_indices")});`,""]})},yo=(e,t)=>{Le(e.inputs),Ve(e,"ReduceMean",t,(i,r,n)=>{let s=1;for(let a=0;a<i.rank;a++)(n.indexOf(a)>=0||n.length===0)&&(s*=e.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${i.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${s});`]})},_o=(e,t)=>{Le(e.inputs),Ve(e,"ReduceMin",t,(i,r,n)=>{let s=[];for(let a=0;a<i.rank;a++)(n.indexOf(a)>=0||n.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};`,`value = min(value, ${i.getByIndices("input_indices")});`,""]})},bo=(e,t)=>{Le(e.inputs),Ve(e,"ReduceProd",t,(i,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${i.getByIndices("input_indices")};`,""])},wo=(e,t)=>{Le(e.inputs),Ve(e,"ReduceSum",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${i.getByIndices("input_indices")};`,""])},$o=(e,t)=>{Le(e.inputs),Ve(e,"ReduceSumSquare",t,(i,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${i.getByIndices("input_indices")}; value += t * t;`,""])},Ge=(e,t,i)=>{if(t.length===0)return i;let r=1,n=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?r*=e[s]:n*=e[s];return n<32&&r>1024},Qd=(e,t)=>{Ge(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yo(e,t):Ld(e,t)},Jd=(e,t)=>{Ge(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fo(e,t):Vd(e,t)},ep=(e,t)=>{Ge(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ho(e,t):Gd(e,t)},tp=(e,t)=>{Ge(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mo(e,t):jd(e,t)},rp=(e,t)=>{Ge(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?go(e,t):Hd(e,t)},ip=(e,t)=>{Ge(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_o(e,t):Fd(e,t)},np=(e,t)=>{Ge(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bo(e,t):Kd(e,t)},ap=(e,t)=>{Ge(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wo(e,t):Yd(e,t)},sp=(e,t)=>{Ge(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$o(e,t):Xd(e,t)},op=(e,t)=>{Ge(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?co(e,t):Zd(e,t)}}),Ui,lp,up,vn,Pm=q(()=>{ne(),xe(),Fn(),Ui=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},lp=(e,t)=>{Ui(e.inputs);let i=(r,n,s)=>{let a=[];for(let o=0;o<r.rank;o++)(s.indexOf(o)>=0||s.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Lr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],i,[t.axis],7,t.keepDims),{inputs:[0]})},up=(e,t)=>{Ui(e.inputs);let i=(r,n,s)=>{let a=[];for(let o=0;o<r.rank;o++)(s.indexOf(o)>=0||s.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Lr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],i,[t.axis],7,t.keepDims),{inputs:[0]})},vn=e=>me(e)}),vo,Er,xo,ko,Co,pr,So,dp,Kn=q(()=>{ne(),se(),jn(),oe(),vo=(e,t)=>{let i=e[0],r=e[1],n=e[2],s=e[3],a=e[4],o=e[5];if(a&&o)throw new Error("Attention cannot have both past and attention_bias");if(i.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=i.dims[0],d=i.dims[1],p=i.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==p)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=n.dims[0]/3,h=f,g=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let C of t.qkvHiddenSizes)if(C%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],g=t.qkvHiddenSizes[2]}let _=d;if(f!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==f+h+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let y=0;if(a){if(h!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(y=a.dims[3])}let k=_+y,$=-1,w=0;if(s)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==l||o.dims[1]!==t.numHeads||o.dims[2]!==d||o.dims[3]!==k)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:y,kvSequenceLength:_,totalSequenceLength:k,maxSequenceLength:$,inputHiddenSize:p,hiddenSize:f,vHiddenSize:g,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(g/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Er=(e,t,i)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${i?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,xo=(e,t,i,r,n,s,a,o)=>{let l=ve(a?1:s),d=64,p=s/l;p<d&&(d=32);let f=Math.ceil(s/l/d),h=[{type:12,data:t},{type:12,data:i},{type:12,data:r},{type:12,data:n},{type:12,data:p},{type:12,data:f}],g=Te(e.dataType,l),_=Me(1,l),y=["type"];a&&y.push("type"),o&&y.push("type");let k=$=>{let w=Q("x",e.dataType,e.dims,l),C=[w],x=a?B("seq_lens",a.dataType,a.dims):void 0;x&&C.push(x);let S=o?B("total_sequence_length_input",o.dataType,o.dims):void 0;S&&C.push(S);let I=Me(e.dataType),E=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${$.registerUniforms(E).declareVariables(...C)}
  ${$.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Er(x,S,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${_}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${_}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${_}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${_}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${I}(1.0) / ${I}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${I}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${g};${l}`,inputDependencies:y},getShaderSource:k,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*i},programUniforms:h})}},ko=(e,t,i,r,n,s,a,o,l)=>{let d=a+s.kvSequenceLength,p=[s.batchSize,s.numHeads,s.sequenceLength,d],f=e>1&&r,h=s.kvNumHeads?s.kvNumHeads:s.numHeads,g=f?[s.batchSize,h,d,s.headSize]:void 0,_=s.nReps?s.nReps:1,y=s.scale===0?1/Math.sqrt(s.headSize):s.scale,k=ve(s.headSize),$=s.headSize/k,w=12,C={x:Math.ceil(d/w),y:Math.ceil(s.sequenceLength/w),z:s.batchSize*s.numHeads},x=[{type:12,data:s.sequenceLength},{type:12,data:$},{type:12,data:d},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:y},{type:12,data:a},{type:12,data:s.kvSequenceLength},{type:12,data:_}],S=f&&r&&A.size(r.dims)>0,I=["type","type"];S&&I.push("type"),n&&I.push("type"),o&&I.push("type"),l&&I.push("type");let E=[{dims:p,dataType:t.dataType,gpuDataType:0}];f&&E.push({dims:g,dataType:t.dataType,gpuDataType:0});let z=D=>{let W=B("q",t.dataType,t.dims,k),H=B("key",i.dataType,i.dims,k),Y=[W,H];if(S){let K=B("past_key",r.dataType,r.dims,k);Y.push(K)}n&&Y.push(B("attention_bias",n.dataType,n.dims));let F=o?B("seq_lens",o.dataType,o.dims):void 0;F&&Y.push(F);let V=l?B("total_sequence_length_input",l.dataType,l.dims):void 0;V&&Y.push(V);let te=Q("output",t.dataType,p),X=[te];f&&X.push(Q("present_key",t.dataType,g,k));let j=Me(1,k),ae=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${W.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${W.type.storage}, ${w*w}>;
  ${D.registerUniforms(ae).declareVariables(...Y,...X)}
  ${D.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${_===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${_===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Er(F,V,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${S&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${j}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${S&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${j}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(k){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${k}`)}})()};
        output[outputIdx] = ${te.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${k};${n!==void 0};${r!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:E,dispatchGroup:C,programUniforms:x}),getShaderSource:z}},Co=(e,t,i,r,n,s,a=void 0,o=void 0)=>{let l=s+n.kvSequenceLength,d=n.nReps?n.nReps:1,p=n.vHiddenSize*d,f=e>1&&r,h=n.kvNumHeads?n.kvNumHeads:n.numHeads,g=f?[n.batchSize,h,l,n.headSize]:void 0,_=[n.batchSize,n.sequenceLength,p],y=12,k={x:Math.ceil(n.vHeadSize/y),y:Math.ceil(n.sequenceLength/y),z:n.batchSize*n.numHeads},$=[{type:12,data:n.sequenceLength},{type:12,data:l},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:p},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:d}],w=f&&r&&A.size(r.dims)>0,C=["type","type"];w&&C.push("type"),a&&C.push("type"),o&&C.push("type");let x=[{dims:_,dataType:t.dataType,gpuDataType:0}];f&&x.push({dims:g,dataType:t.dataType,gpuDataType:0});let S=I=>{let E=B("probs",t.dataType,t.dims),z=B("v",i.dataType,i.dims),D=[E,z];w&&D.push(B("past_value",r.dataType,r.dims));let W=a?B("seq_lens",a.dataType,a.dims):void 0;a&&D.push(W);let H=o?B("total_sequence_length_input",o.dataType,o.dims):void 0;o&&D.push(H);let Y=[Q("output",t.dataType,_)];f&&Y.push(Q("present_value",t.dataType,g));let F=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${y}u;
  var<workgroup> tileQ: array<${E.type.value}, ${y*y}>;
  var<workgroup> tileV: array<${E.type.value}, ${y*y}>;
  ${I.registerUniforms(F).declareVariables(...D,...Y)}
  ${I.mainStart([y,y,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Er(W,H,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${E.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:x,dispatchGroup:k,programUniforms:$}),getShaderSource:S}},pr=(e,t,i,r,n,s,a,o,l,d,p=void 0,f=void 0)=>{let h=Math.min(e.outputCount,1+(a?1:0)+(o?1:0)),g=h>1?d.pastSequenceLength:0,_=g+d.kvSequenceLength,y=l&&A.size(l.dims)>0?l:void 0,k=[t,i];h>1&&a&&A.size(a.dims)>0&&k.push(a),y&&k.push(y),p&&k.push(p),f&&k.push(f);let $=e.compute(ko(h,t,i,a,y,d,g,p,f),{inputs:k,outputs:h>1?[-1,1]:[-1]})[0];e.compute(xo($,d.batchSize,d.numHeads,g,d.sequenceLength,_,p,f),{inputs:p&&f?[$,p,f]:[$],outputs:[]});let w=[$,r];h>1&&o&&A.size(o.dims)>0&&w.push(o),p&&w.push(p),f&&w.push(f),e.compute(Co(h,$,r,o,d,g,p,f),{inputs:w,outputs:h>1?[0,2]:[0]})},So=(e,t)=>{let i=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,n=t.inputHiddenSize,s=t.headSize,a=12,o={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:r},{type:12,data:n},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],p=f=>{let h=Q("output_q",l[0].dataType,i),g=Q("output_k",l[0].dataType,i),_=Q("output_v",l[0].dataType,i),y=B("input",l[0].dataType,l[0].dims),k=B("weight",l[1].dataType,l[1].dims),$=B("bias",l[2].dataType,l[2].dims),w=y.type.storage,C=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${w}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${w}, ${a*a}>;
  var<workgroup> tileWeightK: array<${w}, ${a*a}>;
  var<workgroup> tileWeightV: array<${w}, ${a*a}>;
  ${f.registerUniforms(C).declareVariables(y,k,$,h,g,_)}
  ${f.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:d}),getShaderSource:p},{inputs:l,outputs:[-1,-1,-1]})},dp=(e,t)=>{let i=vo(e.inputs,t),[r,n,s]=So(e,i);return pr(e,r,n,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],i)}}),To,Io,Eo,pp,Um=q(()=>{Ue(),ne(),se(),xe(),oe(),To=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let i=(r,n,s)=>{let a=n.length;if(a!==r.length)throw new Error(`${s}: num dimensions != ${a}`);n.forEach((o,l)=>{if(o!==r[l])throw new Error(`${s}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);i(e[1].dims,r,"Invalid input scale"),i(e[2].dims,r,"Invalid input B"),i(e[3].dims,r,"Invalid input mean"),i(e[4].dims,r,"Invalid input var")}else i(e[1].dims,[1],"Invalid input scale"),i(e[2].dims,[1],"Invalid input B"),i(e[3].dims,[1],"Invalid input mean"),i(e[4].dims,[1],"Invalid input var")},Io=(e,t)=>{let{epsilon:i,spatial:r,format:n}=t,s=e[0].dims,a=r?ve(s[s.length-1]):1,o=n==="NHWC"&&s.length>1?a:1,l=A.size(s)/a,d=r,p=d?s.length:s,f=B("x",e[0].dataType,e[0].dims,a),h=B("scale",e[1].dataType,e[1].dims,o),g=B("bias",e[2].dataType,e[2].dims,o),_=B("inputMean",e[3].dataType,e[3].dims,o),y=B("inputVar",e[4].dataType,e[4].dims,o),k=Q("y",e[0].dataType,p,a),$=()=>{let C="";if(r)C=`let cOffset = ${s.length===1?"0u":n==="NHWC"?`outputIndices[${s.length-1}] / ${a}`:"outputIndices[1]"};`;else if(n==="NCHW")C=`
            ${k.indicesSet("outputIndices","0","0")}
            let cOffset = ${k.indicesToOffset("outputIndices")};`;else{C=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let x=1;x<h.rank;x++)C+=`cIndices[${x}] = outputIndices[${x}];`;C+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return C},w=C=>`
  const epsilon = ${i};
  ${C.registerUniform("outputSize","u32").declareVariables(f,h,g,_,y,k)}
  ${C.mainStart()}
  ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${k.offsetToIndices(`global_idx * ${a}`)};
    ${$()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${y.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${k.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${a}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d?[{type:12,data:l},...ee(s)]:[{type:12,data:l}]})}},Eo=e=>me(e),pp=(e,t)=>{let{inputs:i,outputCount:r}=e,n=Eo({...t,outputCount:r});if(_e.webgpu.validateInputContent&&To(i,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Io(i,n))}}),Mo,zo,cp,qm=q(()=>{se(),oe(),Mo=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},zo=e=>{let t=e[0].dims,i=e[0].dims[2],r=A.size(t)/4,n=e[0].dataType,s=B("input",n,t,4),a=B("bias",n,[i],4),o=B("residual",n,t,4),l=Q("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:d=>`
  const channels = ${i}u / 4;
  ${d.declareVariables(s,a,o,l)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${s.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},cp=e=>{Mo(e.inputs),e.compute(zo(e.inputs))}}),Ao,ce,fp,hp,mp,gp,yp,_p,bp,wp,$p,Oo,vp,xp,kp,Cp,or,Sp,Nr,Tp,Ip,Ep,Mp,zp,Ap,Op,Rp,Bp,Dp,Np,Pp,Up,qp,Wp,Lp,qi,Vp,xn,kn,Gp,jp,Hp,Ro,Bo,Fp,Yn=q(()=>{ne(),se(),xe(),oe(),Ao=(e,t,i,r,n,s,a)=>{let o=Math.ceil(t/4),l="";typeof n=="string"?l=`${n}(a)`:l=n("a");let d=B("inputData",i,[o],4),p=Q("outputData",r,[o],4),f=[{name:"vec_size",type:"u32"}];return a&&f.push(...a),`
      ${e.registerUniforms(f).declareVariables(d,p)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",l)}
  }`},ce=(e,t,i,r,n,s=e.dataType,a,o)=>{let l=[{type:12,data:Math.ceil(A.size(e.dims)/4)}];return a&&l.push(...a),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:d=>Ao(d,A.size(e.dims),e.dataType,s,i,r,o),getRunData:d=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(A.size(d[0].dims)/64/4)},programUniforms:l})}},fp=e=>{e.compute(ce(e.inputs[0],"Abs","abs"))},hp=e=>{e.compute(ce(e.inputs[0],"Acos","acos"))},mp=e=>{e.compute(ce(e.inputs[0],"Acosh","acosh"))},gp=e=>{e.compute(ce(e.inputs[0],"Asin","asin"))},yp=e=>{e.compute(ce(e.inputs[0],"Asinh","asinh"))},_p=e=>{e.compute(ce(e.inputs[0],"Atan","atan"))},bp=e=>{e.compute(ce(e.inputs[0],"Atanh","atanh"))},wp=e=>me(e),$p=(e,t)=>{let i;switch(t.to){case 10:i="vec4<f16>";break;case 1:i="vec4<f32>";break;case 12:i="vec4<u32>";break;case 6:i="vec4<i32>";break;case 9:i="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ce(e.inputs[0],"Cast",i,void 0,t.cacheKey,t.to))},Oo=e=>{let t,i,r=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,i=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,i=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return me({min:t,max:i})},vp=(e,t)=>{let i=t||Oo(e.inputs),r=Me(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,i.cacheKey,void 0,[{type:e.inputs[0].dataType,data:i.min},{type:e.inputs[0].dataType,data:i.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},xp=e=>{e.compute(ce(e.inputs[0],"Ceil","ceil"))},kp=e=>{e.compute(ce(e.inputs[0],"Cos","cos"))},Cp=e=>{e.compute(ce(e.inputs[0],"Cosh","cosh"))},or=e=>me(e),Sp=(e,t)=>{let i=Me(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${i}(${t.alpha});

  fn elu_f32(a: ${i}) -> ${i} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${i}>) -> vec4<${i}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Nr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Tp=e=>{let t=Me(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Erf",i=>`erf_vf32(${i})`,Nr(t)))},Ip=e=>{e.compute(ce(e.inputs[0],"Exp","exp"))},Ep=e=>{e.compute(ce(e.inputs[0],"Floor","floor"))},Mp=e=>{let t=Me(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Gelu",i=>`0.5 * ${i} * (1.0 + erf_vf32(${i} * 0.7071067811865475))`,Nr(t)))},zp=(e,t)=>{let i=Me(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${i}>(0.0))`,`const leaky_relu_alpha_ = ${i}(${t.alpha});`,t.cacheKey))},Ap=e=>{e.compute(ce(e.inputs[0],"Not",t=>`!${t}`))},Op=e=>{e.compute(ce(e.inputs[0],"Neg",t=>`-${t}`))},Rp=e=>{e.compute(ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Bp=e=>{let t=Me(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Relu",i=>`select(vec4<${t}>(0.0), ${i}, ${i} > vec4<${t}>(0.0))`))},Dp=e=>{e.compute(ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Np=e=>me(e),Pp=(e,t)=>{let i=Me(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSigmoid",r=>`max(vec4<${i}>(0.0), min(vec4<${i}>(1.0), ${t.alpha} * ${r} + vec4<${i}>(${t.beta})))`,void 0,t.cacheKey))},Up=e=>{e.compute(ce(e.inputs[0],"Sin","sin"))},qp=e=>{e.compute(ce(e.inputs[0],"Sinh","sinh"))},Wp=e=>{e.compute(ce(e.inputs[0],"Sqrt","sqrt"))},Lp=e=>{e.compute(ce(e.inputs[0],"Tan","tan"))},qi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Vp=e=>{e.compute(ce(e.inputs[0],"Tanh",qi))},xn=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${qi("v")};
}
`,kn=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Gp=e=>{let t=Me(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"FastGelu",kn,xn(t),void 0,e.inputs[0].dataType))},jp=(e,t)=>{let i=Me(e.inputs[0].dataType);return e.compute(ce(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${i}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${i}>(${t.alpha});`,t.cacheKey)),0},Hp=e=>{e.compute(ce(e.inputs[0],"Log","log"))},Ro=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Bo=e=>`quick_gelu_impl(${e})`,Fp=(e,t)=>{let i=Me(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"QuickGelu",Bo,Ro(i,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Do,No,Kp,Wm=q(()=>{se(),oe(),Yn(),Do=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},No=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let i=B("input",e[0].dataType,e[0].dims,4),r=B("bias",e[0].dataType,[e[0].dims[2]],4),n=Q("output",e[0].dataType,t,4),s=A.size(t)/4,a=Te(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(i,r,n)}

  ${Nr(a)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Kp=e=>{Do(e.inputs),e.compute(No(e.inputs))}}),Po,Uo,je,Yp,Xp,Zp,Qp,Jp,ec,tc,rc,ic,nc,Lm=q(()=>{ne(),se(),oe(),Po=(e,t,i,r,n,s,a,o,l,d,p,f)=>{let h,g;typeof o=="string"?h=g=(w,C)=>`${o}((${w}),(${C}))`:typeof o=="function"?h=g=o:(h=o.scalar,g=o.vector);let _=Q("outputData",p,r.length,4),y=B("aData",l,t.length,4),k=B("bData",d,i.length,4),$;if(n)if(s){let w=A.size(t)===1,C=A.size(i)===1,x=t.length>0&&t[t.length-1]%4===0,S=i.length>0&&i[i.length-1]%4===0;w||C?$=_.setByOffset("global_idx",g(w?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"),C?`${k.type.value}(${k.getByOffset("0")}.x)`:k.getByOffset("global_idx"))):$=`
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${y.broadcastedIndicesToOffset("outputIndices",_)};
            let offsetB = ${k.broadcastedIndicesToOffset("outputIndices",_)};
            ${_.setByOffset("global_idx",g(a||x?y.getByOffset("offsetA / 4u"):`${y.type.value}(${y.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||S?k.getByOffset("offsetB / 4u"):`${k.type.value}(${k.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=_.setByOffset("global_idx",g(y.getByOffset("global_idx"),k.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(C,x,S="")=>{let I=`aData[indexA${x}][componentA${x}]`,E=`bData[indexB${x}][componentB${x}]`;return`
            let outputIndices${x} = ${_.offsetToIndices(`global_idx * 4u + ${x}u`)};
            let offsetA${x} = ${y.broadcastedIndicesToOffset(`outputIndices${x}`,_)};
            let offsetB${x} = ${k.broadcastedIndicesToOffset(`outputIndices${x}`,_)};
            let indexA${x} = offsetA${x} / 4u;
            let indexB${x} = offsetB${x} / 4u;
            let componentA${x} = offsetA${x} % 4u;
            let componentB${x} = offsetB${x} % 4u;
            ${C}[${x}] = ${S}(${h(I,E)});
          `};p===9?$=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(y,k,_)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Uo=(e,t,i,r,n,s,a=i.dataType)=>{let o=i.dims.map(y=>Number(y)??1),l=r.dims.map(y=>Number(y)??1),d=!A.areEqual(o,l),p=o,f=A.size(o),h=!1,g=!1,_=[d];if(d){let y=Pt.calcShape(o,l,!1);if(!y)throw new Error("Can't perform binary op on the given tensors");p=y.slice(),f=A.size(p);let k=A.size(o)===1,$=A.size(l)===1,w=o.length>0&&o[o.length-1]%4===0,C=l.length>0&&l[l.length-1]%4===0;_.push(k),_.push($),_.push(w),_.push(C);let x=1;for(let S=1;S<p.length;S++){let I=o[o.length-S],E=l[l.length-S];if(I===E)x*=I;else break}x%4===0?(g=!0,h=!0):(k||$||w||C)&&(h=!0)}else h=!0;return _.push(h),{name:e,shaderCache:{hint:t+_.map(y=>y.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:y=>Po(y,o,l,p,h,d,g,n,i.dataType,r.dataType,a,s),getRunData:()=>({outputs:[{dims:p,dataType:a}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(A.size(p)/4)},...ee(o,l,p)]})}},je=(e,t,i,r,n,s)=>{e.compute(Uo(t,n??"",e.inputs[0],e.inputs[1],i,r,s))},Yp=e=>{je(e,"Add",(t,i)=>`${t}+${i}`)},Xp=e=>{je(e,"Div",(t,i)=>`${t}/${i}`)},Zp=e=>{je(e,"Equal",{scalar:(t,i)=>`u32(${t}==${i})`,vector:(t,i)=>`vec4<u32>(${t}==${i})`},void 0,void 0,9)},Qp=e=>{je(e,"Mul",(t,i)=>`${t}*${i}`)},Jp=e=>{let t=B("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;je(e,"Pow",{scalar:(i,r)=>`pow_custom(${i},${r})`,vector:(i,r)=>`pow_vector_custom(${i},${r})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},ec=e=>{je(e,"Sub",(t,i)=>`${t}-${i}`)},tc=e=>{je(e,"Greater",{scalar:(t,i)=>`u32(${t}>${i})`,vector:(t,i)=>`vec4<u32>(${t}>${i})`},void 0,void 0,9)},rc=e=>{je(e,"Less",{scalar:(t,i)=>`u32(${t}<${i})`,vector:(t,i)=>`vec4<u32>(${t}<${i})`},void 0,void 0,9)},ic=e=>{je(e,"GreaterOrEqual",{scalar:(t,i)=>`u32(${t}>=${i})`,vector:(t,i)=>`vec4<u32>(${t}>=${i})`},void 0,void 0,9)},nc=e=>{je(e,"LessOrEqual",{scalar:(t,i)=>`u32(${t}<=${i})`,vector:(t,i)=>`vec4<u32>(${t}<=${i})`},void 0,void 0,9)}}),qo,Wo,Lo,Vo,ac,sc,Vm=q(()=>{ne(),se(),xe(),oe(),qo=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let i=0,r=e[i],n=r.dataType,s=r.dims.length;e.forEach((a,o)=>{if(o!==i){if(a.dataType!==n)throw new Error("input tensors should be one type");if(a.dims.length!==s)throw new Error("input tensors should have the same shape");a.dims.forEach((l,d)=>{if(d!==t&&l!==r.dims[d])throw new Error("non concat dimensions must match")})}})},Wo=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Lo=(e,t)=>{let i=e.length,r=[];for(let n=0;n<i;++n){let s=t.setByOffset("global_idx",e[n].getByIndices("indices"));i===1?r.push(s):n===0?r.push(`if (inputIndex == ${n}u) { ${s} }`):n===i-1?r.push(`else { ${s} }`):r.push(`else if (inputIndex == ${n}) { ${s} }`)}return r.join(`
`)},Vo=(e,t,i,r)=>{let n=A.size(i),s=new Array(e.length),a=new Array(e.length),o=0,l=[],d=[],p=[{type:12,data:n}];for(let y=0;y<e.length;++y)o+=e[y].dims[t],s[y]=o,d.push(e[y].dims.length),a[y]=B(`input${y}`,r,d[y]),l.push("rank"),p.push({type:12,data:s[y]});for(let y=0;y<e.length;++y)p.push(...ee(e[y].dims));p.push(...ee(i));let f=Q("output",r,i.length),h=f.indicesGet("indices",t),g=Array.from(Array(s.length).keys()).map(y=>`uniforms.sizeInConcatAxis${y}`).join(","),_=y=>`

  ${(()=>{y.registerUniform("outputSize","u32");for(let k=0;k<e.length;k++)y.registerUniform(`sizeInConcatAxis${k}`,"u32");return y.declareVariables(...a,f)})()}

  ${Wo(s.length,g)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${g});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Lo(a,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:r}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p}),getShaderSource:_}},ac=(e,t)=>{let i=e.inputs,r=i[0].dims,n=A.normalizeAxis(t.axis,r.length);qo(i,n);let s=r.slice();s[n]=i.reduce((o,l)=>o+(l.dims.length>n?l.dims[n]:0),0);let a=i.filter(o=>A.size(o.dims)>0);e.compute(Vo(a,n,s,i[0].dataType),{inputs:a})},sc=e=>me({axis:e.axis})}),Et,Mt,zt,Xn,Ot=q(()=>{ne(),se(),Et=(e,t,i="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${i}(uniforms.clip_min)), ${t}(${i}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${i}(uniforms.alpha) * value + ${i}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${i}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Mt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},zt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Xn=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[i,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:i,beta:r}}else if(t==="Clip"){let[i,r]=e?.activation_params||[Ad,Od];return{activation:t,clipMax:r,clipMin:i}}else if(t==="LeakyRelu"){let[i]=e?.activation_params||[.01];return{activation:t,alpha:i}}return{activation:t}}}),Ee,oc,Zn=q(()=>{Ee=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},oc=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),lc,Gm=q(()=>{lc=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),ur,Qn,Jn=q(()=>{ne(),se(),oe(),Ot(),ur=(e,t,i,r,n)=>{let s=r-i;return`
      ${Array.from({length:i}).map((a,o)=>`
      if (${J(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,J(n,o+s,r))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},Qn=(e,t,i,r,n=!1,s)=>{let a=e[0].dims,o=e[1].dims,l=a[a.length-2],d=o[o.length-1],p=a[a.length-1],f=ve(d),h=ve(p),g=ve(l),_=A.size(i)/f/g,y=e.length>2,k=r?r.slice(0,-2):i.slice(0,-2),$=[A.size(k),l,d],w=[{type:12,data:_},{type:12,data:l},{type:12,data:d},{type:12,data:p}];Mt(t,w),w.push(...ee(k,a,o)),y&&w.push(...ee(e[2].dims)),w.push(...ee($));let C=x=>{let S=Hn("batch_dims",e[0].dataType,k.length),I=B("a",e[0].dataType,a.length,h),E=B("b",e[1].dataType,o.length,f),z=Q("output",e[0].dataType,$.length,f),D=Te(z.type.tensor),W=Et(t,z.type.value,D),H=[I,E],Y="";if(y){let te=n?f:1;H.push(B("bias",e[2].dataType,e[2].dims.length,te)),Y=`${n?`value += bias[col / ${te}];`:`value += ${z.type.value}(bias[row + i]);`}`}let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];zt(t,F);let V=()=>{let te=`var a_data: ${I.type.value};`;for(let X=0;X<h;X++)te+=`
              let b_data${X} = b[(b_offset + (k + ${X}) * uniforms.N + col) / ${f}];`;for(let X=0;X<g;X++){te+=`a_data = a[(a_offset + (row + ${X}) * uniforms.K + k) / ${h}];`;for(let j=0;j<h;j++)te+=`
            values[${X}] = fma(${E.type.value}(a_data${h===1?"":`[${j}]`}), b_data${j}, values[${X}]);
`}return te};return`
  ${x.registerUniforms(F).registerInternalVariables(S).declareVariables(...H,z)}
  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${g};
    let row = (index1 % stride1) * ${g};
    let batch = index1 / stride1;

    ${i.length===2?"":`let batch_indices = ${S.offsetToIndices("batch")};`}

    var a_indices: ${I.type.indices};
    ${ur("a_indices",I,I.rank-2,S.rank,"batch_indices")}
    ${I.indicesSet("a_indices",I.rank-2,0)}
    ${I.indicesSet("a_indices",I.rank-1,0)}
    let a_offset = ${I.indicesToOffset("a_indices")};

    var b_indices: ${E.type.indices};
    ${ur("b_indices",E,E.rank-2,S.rank,"batch_indices")}
    ${E.indicesSet("b_indices",E.rank-2,0)}
    ${E.indicesSet("b_indices",E.rank-1,0)}
    let b_offset = ${E.indicesToOffset("b_indices")};
    var values: array<${z.type.value}, ${g}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${V()}
    }
    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${Y}
      ${W}
      let cur_indices = ${z.type.indices}(batch, row + i, col);
      let offset = ${z.indicesToOffset("cur_indices")};
      ${z.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${h};${g};${n}`,inputDependencies:y?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:w}),getShaderSource:C}}}),Go,jo,Cn,Wi,Ho,Sn,Fo,Vr,ea=q(()=>{ne(),se(),oe(),Ot(),Jn(),Zn(),Go=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,jo=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Cn=(e,t,i="f32",r,n=!1,s=32,a=!1,o=32)=>{let l=t[1]*e[1],d=t[0]*e[0],p=n?l:s,f=n?s:l,h=p/t[0],g=s/t[1];if(!((n&&h===4&&e[1]===4||!n&&(h===3||h===4))&&p%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${i}>, ${p/h}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${i}>, ${d/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${h};
const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${a?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${a?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${i}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${g};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Go(n,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${jo(n,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Wi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Ho=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Sn=(e,t,i="f32",r,n=!1,s=32,a=!1,o=32,l=!1)=>{let d=e[1]*t[1],p=e[0]*t[0],f=n?d:s,h=n?s:d;if(!(h%t[1]===0&&f%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let g=h/t[1],_=f/t[0],y=s/t[1],k=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${Wi(n,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${i}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${g};
let tileColA = i32(localId.x) * ${_};
let tileRowB = i32(localId.y) * ${y};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Wi(n,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${i}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Ho(n)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${i}, ${f}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${i}, ${p}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${i}, colPerThread>, rowPerThread>;
    ${k}
  }
`},Fo=(e,t,i,r,n=!1)=>{let[s,a,o,l]=r,d=Te(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Ee(e,d)} {
      var value = ${Ee(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${ur("aIndices",a,a.rank-2,s.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Ee(e,d)} {
      var value = ${Ee(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${ur("bIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ee(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${Ee(e,d)}(bias[row])`};`:""}
        ${i}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Vr=(e,t,i,r,n=!1,s)=>{let a=e[0].dims,o=e[1].dims,l=a.slice(0,-2),d=o.slice(0,-2),p=r?r.slice(0,-2):i.slice(0,-2),f=A.size(p),h=a[a.length-2],g=a[a.length-1],_=o[o.length-1],y=g%4===0&&_%4===0,k=h<=8?[4,1,1]:[4,4,1],$=[8,8,1],w=[Math.ceil(_/$[0]/k[0]),Math.ceil(h/$[1]/k[1]),Math.ceil(f/$[2]/k[2])],C=y?4:1,x=[...l,h,g/C],S=x.length,I=[...d,g,_/C],E=I.length,z=[f,h,_/C],D=[{type:6,data:h},{type:6,data:_},{type:6,data:g}];Mt(t,D),D.push(...ee(p,x,I));let W=["rank","rank"],H=e.length>2;H&&(D.push(...ee(e[2].dims)),W.push("rank")),D.push(...ee(z));let Y=F=>{let V=p.length,te=Hn("batchDims",e[0].dataType,V,1),X=Te(e[0].dataType),j=B("a",e[0].dataType,S,C),ae=B("b",e[1].dataType,E,C),K=Q("result",e[0].dataType,z.length,C),fe=[j,ae];if(H){let N=n?C:1;fe.push(B("bias",e[2].dataType,e[2].dims.length,N))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];zt(t,U);let L=Te(K.type.tensor),re=Et(t,K.type.value,L),pe=Fo(C,H,re,[te,j,ae,K],n);return`
  ${F.registerUniforms(U).registerInternalVariables(te).declareVariables(...fe,K)}
  ${pe}
  ${y?Cn(k,$,X,te):Sn(k,$,X,te)}
                   `};return{name:"MatMul",shaderCache:{hint:`${k};${t.activation};${y};${n}`,inputDependencies:W},getRunData:()=>({outputs:[{dims:s?s(i):i,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:D}),getShaderSource:Y}}}),Ko,uc,jm=q(()=>{ne(),st(),oe(),Ot(),Zn(),Gm(),ea(),Ko=(e,t,i,r,n=!1,s,a=4,o=4,l=4,d="f32")=>{let p=D=>{switch(D){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${D} is not supported.`)}},f=D=>{switch(D){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${D} is not supported.`)}},h=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,g=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,_=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",y=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",k=e?"row":"col",$=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${k} / outWidth;
    let outCol = ${k} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Ee(a,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${y}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${p(a)}
    }
    return resData;`,C=e?t&&r?`
    let col = colIn * ${a};
    ${w}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${Ee(a,d)}(0.0);`:r&&i?`
    let col = colIn * ${a};
    ${w}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${Ee(a,d)}(0.0);`,x=e?r&&i?f(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(o)}
    }
    return ${Ee(o,d)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(o)}
    }
    return ${Ee(o,d)}(0.0);`,S=Ee(l,d),I=Ee(e?a:o,d),E=Ee(e?o:a,d),z=Et(s,S,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${e?C:x}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${e?x:C}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${S}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${g}
      ${oc(n)}
      ${z}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},uc=(e,t,i,r,n,s,a,o,l)=>{let d=t.format==="NHWC",p=d?e[0].dims[3]:e[0].dims[1],f=i[0],h=d?i[2]:i[3],g=d?i[1]:i[2],_=d?i[3]:i[1],y=d&&(p%4===0||p%3===0)&&_%4===0,k=d?_:h*g,$=d?h*g:_,w=[8,8,1],C=r<=8?[4,1,1]:[4,4,1],x=[Math.ceil(k/w[0]/C[0]),Math.ceil($/w[1]/C[1]),Math.ceil(f/w[2]/C[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${x}`);let S=y?d&&p%4!==0?3:4:1,I=w[1]*C[1],E=w[0]*C[0],z=Math.max(w[0]*S,w[1]),D=r%I===0,W=n%E===0,H=s%z===0,Y=y?[S,4,4]:[1,1,1],F=[{type:6,data:r},{type:6,data:n},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Mt(t,F),F.push(...ee(e[0].dims,e[1].dims));let V=["rank","rank"];a&&(F.push(...ee(e[2].dims)),V.push("rank")),F.push(...ee(i));let te=X=>{let j=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];zt(t,j);let ae=y?4:1,K=Te(e[0].dataType),fe=`
      fn setOutputAtIndex(flatIndex : i32, value : ${y?`vec4<${K}>`:K}) {
        result[flatIndex] = ${y?`vec4<${K}>`:K}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${y?`vec4<${K}>`:K}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${y?"/ 4":""}, value);
      }`,U=B("x",e[0].dataType,e[0].dims.length,S===3?1:S),L=B("w",e[1].dataType,e[1].dims.length,ae),re=[U,L],pe=Q("result",e[0].dataType,i.length,ae);if(a){let N=B("bias",e[2].dataType,e[2].dims.length,ae);re.push(N),fe+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${y?`vec4<${K}>`:K} {
          return bias[coords.${d?"w":"y"}${y?"/ 4":""}];
        }`}return`
        ${lc("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${X.registerUniforms(j).declareVariables(...re,pe)}
        ${fe}
        ${Ko(d,D,W,H,a,t,Y[0],Y[1],Y[2],K)}
        ${y?Cn(C,w,K,void 0,!d,z):Sn(C,w,K,void 0,!d,z,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${S};${y};${D};${W};${H};${I};${E};${z}`,inputDependencies:V},getRunData:()=>({outputs:[{dims:l?l(i):i,dataType:e[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:F}),getShaderSource:te}}}),Yo,Li,Jt,Xo,Vi,Zo,dc,pc,Hm=q(()=>{ne(),st(),se(),oe(),Ot(),Zn(),Yo=e=>{let t=1;for(let i=0;i<e.length;i++)t*=e[i];return t},Li=e=>typeof e=="number"?[e,e,e]:e,Jt=(e,t)=>t<=1?e:e+(e-1)*(t-1),Xo=(e,t,i,r=1)=>{let n=Jt(t,r);return Math.floor((e[0]*(i-1)-i+n)/2)},Vi=(e,t,i,r,n)=>{n==null&&(n=Xo(e,t[0],r[0]));let s=[0,0,0,i];for(let a=0;a<3;a++)e[a]+2*n>=t[a]&&(s[a]=Math.trunc((e[a]-t[a]+2*n)/r[a]+1));return s},Zo=(e,t,i,r,n,s,a,o,l,d)=>{let p,f,h,g;if(e==="VALID"&&(e=0),typeof e=="number"){p={top:e,bottom:e,left:e,right:e,front:e,back:e};let _=Vi([t,i,r,1],[o,l,d],1,[n,s,a],e);f=_[0],h=_[1],g=_[2]}else if(Array.isArray(e)){if(!e.every((y,k,$)=>y===$[0]))throw Error(`Unsupported padding parameter: ${e}`);p={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let _=Vi([t,i,r,1],[o,l,d],1,[n,s,a],e[0]);f=_[0],h=_[1],g=_[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/n),h=Math.ceil(i/s),g=Math.ceil(r/a);let _=(f-1)*n+o-t,y=(h-1)*s+l-i,k=(g-1)*a+d-r,$=Math.floor(_/2),w=_-$,C=Math.floor(y/2),x=y-C,S=Math.floor(k/2),I=k-S;p={top:C,bottom:x,left:S,right:I,front:$,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:p,outDepth:f,outHeight:h,outWidth:g}},dc=(e,t,i,r,n,s=!1,a="channelsLast")=>{let o,l,d,p,f;if(a==="channelsLast")[o,l,d,p,f]=e;else if(a==="channelsFirst")[o,f,l,d,p]=e;else throw new Error(`Unknown dataFormat ${a}`);let[h,,g,_,y]=t,[k,$,w]=Li(i),[C,x,S]=Li(r),I=Jt(g,C),E=Jt(_,x),z=Jt(y,S),{padInfo:D,outDepth:W,outHeight:H,outWidth:Y}=Zo(n,l,d,p,k,$,w,I,E,z),F=s?h*f:h,V=[0,0,0,0,0];return a==="channelsFirst"?V=[o,F,W,H,Y]:a==="channelsLast"&&(V=[o,W,H,Y,F]),{batchSize:o,dataFormat:a,inDepth:l,inHeight:d,inWidth:p,inChannels:f,outDepth:W,outHeight:H,outWidth:Y,outChannels:F,padInfo:D,strideDepth:k,strideHeight:$,strideWidth:w,filterDepth:g,filterHeight:_,filterWidth:y,effectiveFilterDepth:I,effectiveFilterHeight:E,effectiveFilterWidth:z,dilationDepth:C,dilationHeight:x,dilationWidth:S,inShape:e,outShape:V,filterShape:t}},pc=(e,t,i,r,n,s)=>{let a=s==="channelsLast";a?e[0].dims[3]:e[0].dims[1];let o=[64,1,1],l={x:i.map((k,$)=>$)},d=[Math.ceil(Yo(l.x.map(k=>i[k]))/o[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let p=1,f=A.size(i),h=[{type:12,data:f},{type:12,data:r},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];Mt(t,h),h.push(...ee(e[0].dims,e[1].dims));let g=["rank","rank"],_=e.length===3;_&&(h.push(...ee(e[2].dims)),g.push("rank")),h.push(...ee(i));let y=k=>{let $=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];zt(t,$);let w=1,C=Te(e[0].dataType),x=B("x",e[0].dataType,e[0].dims.length,p),S=B("W",e[1].dataType,e[1].dims.length,w),I=[x,S],E=Q("result",e[0].dataType,i.length,w),z="";if(_){let H=B("bias",e[2].dataType,e[2].dims.length,w);I.push(H),z+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${C} {
          return bias[${a?J("coords",4,5):J("coords",1,5)}];
        }`}let D=Ee(p,C),W=Et(t,D,C);return`
            ${z}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${x.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
          ${k.registerUniforms($).declareVariables(...I,E)}
          ${k.mainStart()}
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${E.offsetToIndices("global_idx")};
              let batch = ${J("coords",0,x.rank)};
              let d2 = ${a?J("coords",x.rank-1,x.rank):J("coords",1,x.rank)};
              let xFRCCorner = vec3<u32>(${a?J("coords",1,x.rank):J("coords",2,x.rank)},
              ${a?J("coords",2,x.rank):J("coords",3,x.rank)},
              ${a?J("coords",3,x.rank):J("coords",4,x.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?J("uniforms.x_shape",1,x.rank):J("uniforms.x_shape",2,x.rank)};
              let xShapeZ = ${a?J("uniforms.x_shape",2,x.rank):J("uniforms.x_shape",3,x.rank)};
              let xShapeW = ${a?J("uniforms.x_shape",3,x.rank):J("uniforms.x_shape",4,x.rank)};
              let xShapeU = ${a?J("uniforms.x_shape",4,x.rank):J("uniforms.x_shape",1,x.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${a?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${a?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${_?"value = value + getBiasByOutputCoords(coords)":""};
              ${W}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${p};${_}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:h}),getShaderSource:y}}}),cc,fc,Fm=q(()=>{ne(),se(),oe(),Ot(),cc=(e,t,i,r)=>{let n=e.length>2,s=n?"value += b[output_channel];":"",a=e[0].dims,o=e[1].dims,l=t.format==="NHWC",d=l?i[3]:i[1],p=d/t.group,f=l&&p>=4?ve(d):1,h=A.size(i)/f,g=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:p}];Mt(t,g),g.push(...ee(a,[o[0],o[1],o[2],o[3]/f]));let _=n?["rank","rank","rank"]:["rank","rank"];g.push(...ee([i[0],i[1],i[2],i[3]/f]));let y=k=>{let $=Q("output",e[0].dataType,i.length,f),w=Te($.type.tensor),C=Et(t,$.type.value,w),x=B("x",e[0].dataType,a.length),S=B("w",e[1].dataType,o.length,f),I=[x,S];n&&I.push(B("b",e[2].dataType,e[2].dims,f));let E=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];zt(t,E);let z=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${x.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${S.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${x.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${S.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${k.registerUniforms(E).declareVariables(...I,$)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${z}
    ${s}
    ${C}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:y}},fc=(e,t,i,r)=>{let n=e.length>2,s=ve(i[3]),a=ve(i[2]),o=A.size(i)/s/a,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],p=[i[0],i[1],i[2],i[3]/s],f=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Mt(t,f),f.push(...ee(l,d,p));let h=(a-1)*t.strides[1]+d[1],g=_=>{let y=Q("output",e[0].dataType,p.length,s),k=Te(y.type.tensor),$=Et(t,y.type.value,k),w=B("x",e[0].dataType,l.length,s),C=B("w",e[1].dataType,d.length,s),x=[w,C];n&&x.push(B("b",e[2].dataType,e[2].dims,s));let S=n?"value += b[output_channel];":"",I=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return zt(t,I),`
  ${_.registerUniforms(I).declareVariables(...x,y)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${h}>;
    var values: array<${y.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${C.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${S}
      ${$}
      ${y.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${a};${h};${d[0]};${d[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:g}}}),Qo,Mr,Jo,zr,Tn,Gi,el,tl,In,Km=q(()=>{se(),jm(),Hm(),ea(),Fm(),Ot(),Jn(),gt(),Qo=(e,t,i,r,n,s)=>{let a=e[0],o=e.slice(s?1:2,s?3:4),l=o.length,d=t[0],p=t.slice(2).map((h,g)=>h+(h-1)*(i[g]-1)),f=o.map((h,g)=>h+r[g]+r[g+l]).map((h,g)=>Math.floor((h-p[g]+n[g])/n[g]));return f.splice(0,0,a),f.splice(s?3:1,0,d),f},Mr=[2,3,1,0],Jo=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let i=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(i!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},zr=(e,t)=>{let i=e.kernelShape.slice();i.length<t[1].dims.length-2&&i.push(...Array(t[1].dims.length-2-i.length).fill(0));for(let s=2;s<t[1].dims.length;++s)i[s-2]===0&&(i[s-2]=t[1].dims[s]);let r=e.pads.slice();Wr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,i,r,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:i,pads:r}),n},Tn=e=>{let t=Xn(e),i=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,s=e.group,a=e.kernel_shape,o=e.pads,l=e.strides,d=e.w_is_const();return{autoPad:r,format:i,dilations:n,group:s,kernelShape:a,pads:o,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Gi=(e,t,i,r)=>{let n=i.format==="NHWC",s=Qo(t[0].dims,t[1].dims,i.dilations,i.pads,i.strides,n);if(i.group!==1){let I=[t[0]];if(n){let E=e.kernelCustomData.wT??e.compute(De(t[1],Mr),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=E),I.push(E)}else I.push(t[1]);t.length===3&&I.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===i.group&&t[1].dims[1]===1&&i.dilations[0]===1&&i.dilations[1]===1?e.compute(fc(I,i,s,r),{inputs:I}):e.compute(cc(I,i,s,r),{inputs:I});return}let a=t.length===3,o=t[0].dims[n?1:2],l=t[0].dims[n?2:3],d=t[0].dims[n?3:1],p=t[1].dims[2],f=t[1].dims[3],h=s[n?1:2],g=s[n?2:3],_=s[n?3:1],y=n&&p===o&&f===l&&i.pads[0]===0&&i.pads[1]===0;if(y||p===1&&f===1&&i.dilations[0]===1&&i.dilations[1]===1&&i.strides[0]===1&&i.strides[1]===1&&i.pads[0]===0&&i.pads[1]===0){let I=s[0],E,z,D,W=[];if(n){let F=e.kernelCustomData.wT??e.compute(De(t[1],Mr),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];if(i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=F),y){let V=o*l*d;E=t[0].reshape([1,I,V]),z=F.reshape([1,V,_]),D=[1,I,_]}else E=t[0].reshape([I,o*l,d]),z=F.reshape([1,d,_]),D=[I,h*g,_];W.push(E),W.push(z)}else E=t[0].reshape([I,d,o*l]),z=t[1].reshape([1,_,d]),D=[I,_,h*g],W.push(z),W.push(E);a&&W.push(t[2]);let H=D[2],Y=W[0].dims[W[0].dims.length-1];H<8&&Y<8?e.compute(Qn(W,i,s,D,n,r),{inputs:W}):e.compute(Vr(W,i,s,D,n,r),{inputs:W});return}let k=!0,$=e.kernelCustomData.wT??e.compute(De(t[1],Mr),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let w=[t[0],$];a&&w.push(t[2]);let C=n?h*g:_,x=n?_:h*g,S=p*f*d;e.compute(uc(w,i,s,C,x,S,a,k,r),{inputs:w})},el=(e,t)=>{let i=t.format==="NHWC",r=[e.inputs[0].reshape(i?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),a=[1].concat(t.dilations),o=[1].concat(t.kernelShape),l=zr({...t,pads:n,strides:s,dilations:a,kernelShape:o},r);Gi(e,r,l,d=>i?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},tl=(e,t,i)=>{let r=i.format==="NHWC"?"channelsLast":"channelsFirst",n=zr(i,t),s=i.autoPad==="NOTSET"?i.pads:i.autoPad,a=dc(t[0].dims,t[1].dims,i.strides,i.dilations,s,!1,r);e.compute(pc(t,n,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],r))},In=(e,t)=>{if(Jo(e.inputs,t),e.inputs[0].dims.length===3)el(e,t);else if(e.inputs[0].dims.length===5)tl(e,e.inputs,t);else{let i=zr(t,e.inputs);Gi(e,e.inputs,i)}}}),hc,Ym=q(()=>{ne(),st(),se(),oe(),hc=(e,t,i)=>{let r=e.length>2,n=t.outputShape,s=t.format==="NHWC",a=t.group,o=e[1].dims,l=o[2]/a,d=o[3],p=s?ve(l):1,f=s&&d===1&&l>=4,h=f?Math.floor(l/4)*4:Math.floor(l/p)*p,g=l-h,_=s?ve(d):1,y=s?d===1?p:_:1,k=A.size(n)/_,$=[Math.ceil(k/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let w=["rank","rank"],C=[t.strides[0],t.strides[1]],x=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],S=[t.dilations[0],t.dilations[1]],I=[x[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),x[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],E=[I[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),I[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],z=[{type:12,data:k},{type:12,data:C},{type:12,data:x},{type:12,data:S},{type:12,data:I},{type:6,data:E},{type:12,data:h},{type:12,data:l},{type:12,data:d},...ee(e[0].dims,e[1].dims)];r&&(z.push(...ee(e[2].dims)),w.push("rank")),z.push(...ee(n));let D=W=>{let H=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:C.length},{name:"filter_dims",type:"u32",length:x.length},{name:"dilations",type:"u32",length:x.length},{name:"effective_filter_dims",type:"u32",length:I.length},{name:"pads",type:"i32",length:E.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],Y=Te(e[0].dataType),F=s?1:2,V=s?2:3,te=s?3:1,X=B("W",e[1].dataType,e[1].dims.length,y),j=B("Dy",e[0].dataType,e[0].dims.length,p),ae=[j,X];r&&ae.push(B("bias",e[2].dataType,[n[te]].length,_));let K=Q("result",e[0].dataType,n.length,_),fe=()=>{let re="";if(f)p===4?re+=`
        let xValue = ${j.getByOffset("x_offset")};
        let wValue = ${X.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:p===2?re+=`
          dotProd = dotProd + dot(vec4<${Y}>(${j.getByOffset("x_offset")}, ${j.getByOffset("x_offset + 1u")}), vec4<${Y}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:p===1&&(re+=`
          dotProd = dotProd + dot(vec4<${Y}>(${j.getByOffset("x_offset")}, ${j.getByOffset("x_offset + 1u")}, ${j.getByOffset("x_offset + 2u")}, ${j.getByOffset("x_offset + 3u")}), vec4<${Y}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}, ${X.getByOffset("w_offset + 2u")}, ${X.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(re+=`
                  let xValue = ${s?j.getByOffset(`${j.indicesToOffset(`${j.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):j.get("batch","inputChannel","idyR","idyC")};
        `,p===1)re+=`
          let w_offset = ${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${X.getByOffset(`w_offset / ${y}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let pe=0;pe<p;pe++)re+=`
            let wValue${pe} = ${X.getByOffset(`${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${pe}, wOutChannel)`)} / ${y}`)};
            dotProd = dotProd + xValue[${pe}] * wValue${pe};`;return re},U=()=>{if(g===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let re="";if(p===1){re+="dotProd = dotProd";for(let pe=0;pe<g;pe++)re+=`
            + ${j.getByOffset(`x_offset + ${pe}`)} * ${X.getByOffset(`w_offset + ${pe}`)}`;re+=";"}else if(p===2){if(g!==2)throw new Error(`Invalid inputChannelsRemainder ${g}.`);re+=`
          let xValue = ${j.getByOffset("x_offset")};
          let wValue = ${X.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return re},L=`
            let outputIndices = ${K.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${K.indicesGet("outputIndices",0)};
            let d1 = ${K.indicesGet("outputIndices",te)};
            let r = ${K.indicesGet("outputIndices",F)};
            let c = ${K.indicesGet("outputIndices",V)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${K.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${Y}(dyRCorner) + ${Y}(wR)) / ${Y}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${Y}(uniforms.Dy_shape[${F}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${Y}(dyCCorner) + ${Y}(wC)) / ${Y}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${Y}(uniforms.Dy_shape[${V}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${j.indicesToOffset(`${j.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${X.indicesToOffset(`${X.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${y};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:p}) {
                  ${fe()}
                  inputChannel = inputChannel + ${f?4:p};
                }
                ${U()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${_}]`:""};
            ${K.setByOffset("global_idx","value")};
          `;return`
    ${W.registerUniforms(H).declareVariables(...ae,K)}
      ${W.mainStart()}
      ${W.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${L}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${p}${y}${_}${f}${g}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],programUniforms:z}),getShaderSource:D}}}),rl,il,nl,ji,mc,al,Hi,sl,gc,Xm=q(()=>{Ym(),Ot(),gt(),rl=(e,t,i,r,n,s)=>(e-1)*t+i+(r-1)*n+1-s,il=(e,t,i,r,n)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(i[r]=s,i[n]=e-s):t==="SAME_LOWER"&&(i[r]=e-s,i[n]=s)},nl=(e,t,i,r,n,s,a,o,l,d)=>{let p=e.length-2,f=d.length===0;l.length<p&&l.push(...Array(p-l.length).fill(0));let h=e[0],g=t[o?3:1]*n;for(let _=0,y=e.length-p-(o?1:0);_<p;++_,++y){let k=e[y],$=f?k*a[_]:d[_],w=rl(k,a[_],s[_],t[y],i[_],$);il(w,r,s,_,_+p),f&&d.push(a[_]*(k-1)+l[_]+(t[y]-1)*i[_]+1-s[_]-s[_+p])}d.splice(0,0,h),d.splice(o?3:1,0,g)},ji=(e,t)=>{let i=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,h)=>f*h,1)===0){i.length=0;for(let f=2;f<t[1].dims.length;++f)i.push(t[1].dims[f])}let r=e.format==="NHWC";i.splice(0,0,t[1].dims[0]),i.splice(r?3:1,0,t[1].dims[1]);let n=e.pads.slice(),s=e.outputShape.slice(),a=e.outputPadding.slice(),o=t[0].dims,l=e.dilations.slice();if(l.reduce((f,h)=>f+h,0)===0){let f=t[0].dims.length-2;l=new Array(f).fill(1)}let d=e.strides.slice();if(d.reduce((f,h)=>f+h,0)===0){let f=t[0].dims.length-2;d=new Array(f).fill(1)}nl(o,i,l,e.autoPad,e.group,n,d,r,a,s);let p=Object.assign({},e);return Object.assign(p,{kernelShape:i,pads:n,outputPadding:a,outputShape:s,dilations:l,strides:d}),p},mc=e=>{let t=Xn(e),i=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,s=e.group,a=e.kernelShape,o=e.pads,l=e.strides,d=e.wIsConst(),p=e.outputPadding,f=e.outputShape;return{autoPad:r,format:i,dilations:n,group:s,kernelShape:a,outputPadding:p,outputShape:f,pads:o,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},al=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let i=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(i!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((a,o)=>a+o,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((a,o)=>a+o,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((a,o)=>a+o,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((a,o)=>a+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Hi=(e,t,i,r)=>{let n=e.kernelCustomData.wT??e.compute(De(t[1],[2,3,0,1]),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let s=[t[0],n];t.length===3&&s.push(t[2]),e.compute(hc(s,i,r),{inputs:s})},sl=(e,t)=>{let i=t.format==="NHWC",r=[e.inputs[0].reshape(i?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],a=[1].concat(a),s=[1].concat(s),n=[1].concat(n);let l=t.outputPadding;l=[0].concat(l);let d=ji({...t,pads:o,strides:a,dilations:s,kernelShape:n,outputPadding:l},r);Hi(e,r,d,p=>i?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},gc=(e,t)=>{if(al(e.inputs,t),e.inputs[0].dims.length===3)sl(e,t);else{let i=ji(t,e.inputs);Hi(e,e.inputs,i)}}}),ol,yc,_c,Zm=q(()=>{ne(),se(),xe(),oe(),ol=(e,t,i,r)=>{let n=A.size(t),s=t.length,a=B("input",e,s),o=Q("output",e,s),l=i.dataType===6?i.getInt32Array()[0]:Number(i.getBigInt64Array()[0]),d=A.normalizeAxis(l,s),p=f=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,g=J("uniforms.input_shape","uniforms.axis",s),_=r.reverse?h+(r.exclusive?" + 1":""):"0",y=r.reverse?g:h+(r.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,o)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${y};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:d},...ee(t,t)]}),getShaderSource:p}},yc=(e,t)=>{let i=e.inputs[0].dims,r=e.inputs[0].dataType,n=e.inputs[1];e.compute(ol(r,i,n,t),{inputs:[0]})},_c=e=>{let t=e.exclusive===1,i=e.reverse===1;return me({exclusive:t,reverse:i})}}),ll,ul,dl,bc,wc,Qm=q(()=>{ne(),se(),xe(),oe(),ll=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},ul=(e,t,i,r)=>{let n=[];n.push(`fn perm(i: ${r.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`);for(let s=0;s<t;++s)n.push(i.indicesSet("a",e[s],`i[${s}]`));return n.push("return a;}"),n.join(`
`)},dl=(e,t)=>{let i,r,n,s,a,o,l=t.format==="NHWC",d=t.blocksize,p=t.mode==="DCR";l?([i,r,n,s]=e.dims,a=p?[i,r,n,d,d,s/d**2]:[i,r,n,s/d**2,d,d],o=p?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([i,r,n,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=p?[i,d,d,s/d**2,r,n]:[i,s/d**2,d,d,r,n],o=p?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(a),h=f.dims.length,g=e.dataType,_=B("a",g,h),y=Q("output",g,h),k=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(_,y)}

  ${ul(o,h,_,y)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let w=l?[i,r*d,n*d,s/d**2]:[i,s/d**2,r*d,n*d],C=A.size(w),x=f.dims,S=A.sortBasedOnPerm(x,o);return{outputs:[{dims:w,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(C/64)},programUniforms:[{type:12,data:C},...ee(x,S)]}},getShaderSource:k}},bc=(e,t)=>{ll(e.inputs),e.compute(dl(e.inputs[0],t))},wc=e=>me({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Ar,er,Fi,pl,cl,fl,hl,Ki,ml,$c,vc,Jm=q(()=>{ne(),se(),xe(),oe(),Ar="[a-zA-Z]|\\.\\.\\.",er="("+Ar+")+",Fi="^"+er+"$",pl="("+er+",)*"+er,cl="^"+pl+"$",fl=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let i=this.symbolToIndices.get(e);i===void 0?i=[t]:i.push(t),this.symbolToIndices.set(e,i)}},hl=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[i,r]=t.includes("->")?t.split("->",2):[t,""];if(!i.match(RegExp(cl)))throw new Error("Invalid LHS term");if(i.split(",").forEach((n,s)=>{let a=e[s].dims.slice();if(!n.match(RegExp(Fi)))throw new Error("Invalid LHS term");let o=this.processTerm(n,!0,a,s);this.lhs.push(o)}),r==="")r+=[...this.symbolToInfo.entries()].filter(([n,s])=>s.count===1||n==="...").map(([n])=>n).join("");else if(!r.match(RegExp(er)))throw new Error("Invalid RHS");r.match(RegExp(Ar,"g"))?.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(n);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,i){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw new Error("Dimension mismatch");r.count++,r.inputIndices.push(i)}else r={count:1,dimValue:t,inputIndices:[i]};this.symbolToInfo.set(e,r)}processTerm(e,t,i,r=-1){let n=i.length,s=!1,a=[],o=0;if(!e.match(RegExp(Fi))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Ar,"g")),d=new fl(r);return l?.forEach((p,f)=>{if(p==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let h=n-l.length+1;if(h<0)throw new Error("Ellipsis out of bounds");if(a=i.slice(o,o+h),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<a.length;g++){let _=String.fromCharCode(48+g);d.addSymbol(_,f+g),this.addSymbol(_,i[o++],r)}}else d.addSymbol(p,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(p,i[o++],r)}),d}},Ki=e=>e+"_max",ml=(e,t,i,r)=>{let n=e.map(d=>d.length).map((d,p)=>B(`input${p}`,t,d)),s=A.size(r),a=Q("output",t,r.length),o=[...i.symbolToInfo.keys()].filter(d=>!i.rhs.symbolToIndices.has(d)),l=d=>{let p=[],f="var prod = 1.0;",h="var sum = 0.0;",g="sum += prod;",_=[],y=[],k=[],$=[],w=i.symbolToInfo.size===i.rhs.symbolToIndices.size;i.symbolToInfo.forEach((x,S)=>{if(i.rhs.symbolToIndices.has(S)){let I=i.rhs.symbolToIndices.get(S)?.[0];I!==void 0&&i.lhs.forEach((E,z)=>{if(x.inputIndices.includes(z)){let D=E.symbolToIndices.get(S);if(D===void 0)throw new Error("Invalid symbol error");D.forEach(W=>{p.push(`${n[z].indicesSet(`input${z}Indices`,W,a.indicesGet("outputIndices",I))}`)})}})}else i.lhs.forEach((I,E)=>{if(x.inputIndices.includes(E)){let z=I.symbolToIndices.get(S);if(z===void 0)throw new Error("Invalid symbol error");z.forEach(D=>{_.push(`${n[E].indicesSet(`input${E}Indices`,D,`${S}`)}`)}),$.push(`prod *= ${n[E].getByIndices(`input${E}Indices`)};`)}}),y.push(`for(var ${S}: u32 = 0; ${S} < uniforms.${Ki(S)}; ${S}++) {`),k.push("}")});let C=w?[...p,`let sum = ${n.map((x,S)=>x.getByIndices(`input${S}Indices`)).join(" * ")};`]:[...p,h,...y,..._,f,...$,g,...k];return`
            ${d.registerUniforms(o.map(x=>({name:`${Ki(x)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,a)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${n.map((x,S)=>`var input${S}Indices: ${n[S].type.indices};`).join(`
`)}
            ${C.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:i.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=o.filter(f=>i.symbolToInfo.has(f)).map(f=>({type:12,data:i.symbolToInfo.get(f)?.dimValue||0}));d.push({type:12,data:s});let p=e.map((f,h)=>[...ee(f)]).reduce((f,h)=>f.concat(h),d);return p.push(...ee(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}},getShaderSource:l}},$c=(e,t)=>{let i=new hl(e.inputs,t.equation),r=i.outputDims,n=e.inputs.map((s,a)=>s.dims);e.compute(ml(n,e.inputs[0].dataType,i,r))},vc=e=>{let t=e.equation.replace(/\s+/g,"");return me({equation:t})}}),gl,Yi,yl,_l,xc,eg=q(()=>{ne(),se(),oe(),gl=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,i=Array.from(e[1].getBigInt64Array(),Number),r=i.length<t.length?0:i.length-t.length,n=t.length<i.length?0:t.length-i.length;for(;r<i.length&&n<t.length;++r,++n)if(i[r]!==t[n]&&i[r]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Yi=(e,t)=>{let i=e.length-t.length,r=[];for(let n=0;n<i;++n)r.push(e[n]);for(let n=0;n<t.length;++n)r.push(t[n]===1?e[n+i]:t[n]);return r},yl=(e,t)=>e.length>t.length?Yi(e,t):Yi(t,e),_l=e=>{let t=e[0].dims,i=Array.from(e[1].getBigInt64Array(),Number),r=yl(t,i),n=e[0].dataType,s=n===9||A.size(t)===1,a=n===9||t.length>0&&t[t.length-1]%4===0?4:1,o=s||r.length>0&&r[r.length-1]%4===0?4:1,l=Math.ceil(A.size(r)/o),d=f=>{let h=B("input",n,t.length,a),g=Q("output",n,r.length,o),_;if(n===9){let y=(k,$,w="")=>`
          let outputIndices${$} = ${g.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${h.broadcastedIndicesToOffset(`outputIndices${$}`,g)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${k}[${$}] = ${w}(${h.getByOffset(`index${$}`)}[component${$}]);
        `;_=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${y("data",0,"u32")}
        ${y("data",1,"u32")}
        ${y("data",2,"u32")}
        ${y("data",3,"u32")}
        ${g.setByOffset("global_idx","data")}
      }`}else _=`
        let outputIndices = ${g.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",g)};
        let data = ${g.type.value}(${h.getByOffset(`inputOffset / ${a}`)});
        ${g.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(h,g)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`},p=[{type:12,data:l},...ee(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${a}${o}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p})}},xc=e=>{gl(e.inputs),e.compute(_l(e.inputs),{inputs:[0]})}}),bl,kc,tg=q(()=>{ne(),se(),oe(),Yn(),bl=e=>{let t=e[0].dataType,i=A.size(e[0].dims),r=A.size(e[1].dims),n=r%4===0,s=a=>{let o=B("x",t,[1],4),l=B("bias",t,[1],4),d=Q("y",t,[1],4),p=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${l.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,h=n?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(p).declareVariables(o,l,d)}

    ${xn(Me(t))}

    ${a.mainStart(Ut)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",kn("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(i/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(i/Ut/4)}})}},kc=e=>{e.inputs.length<2||A.size(e.inputs[1].dims)===0?Gp(e):e.compute(bl(e.inputs))}}),wl,$l,Cc,Sc,rg=q(()=>{ne(),se(),xe(),oe(),wl=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},$l=(e,t)=>{let i=e[0].dims,r=e[1].dims,n=i.length,s=A.normalizeAxis(t.axis,n),a=i.slice(0);a.splice(s,1,...r);let o=i[s],l=e[0].dataType===9?4:1,d=Math.ceil(A.size(a)/l),p=[{type:12,data:d},{type:6,data:o},{type:12,data:s},...ee(e[0].dims,e[1].dims,a)],f=h=>{let g=B("data",e[0].dataType,e[0].dims.length,l),_=B("inputIndices",e[1].dataType,e[1].dims.length),y=Q("output",e[0].dataType,a.length,l),k=w=>{let C=r.length,x=`var indicesIndices${w}  = ${_.type.indices}(0);`;for(let S=0;S<C;S++)x+=`${C>1?`indicesIndices${w}[${S}]`:`indicesIndices${w}`} = ${a.length>1?`outputIndices${w}[uniforms.axis + ${S}]`:`outputIndices${w}`};`;x+=`
          var idx${w} = ${_.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${g.type.indices};
        `;for(let S=0,I=0;S<n;S++)S===s?(x+=`${n>1?`dataIndices${w}[${S}]`:`dataIndices${w}`} = u32(idx${w});`,I+=C):(x+=`${n>1?`dataIndices${w}[${S}]`:`dataIndices${w}`} = ${a.length>1?`outputIndices${w}[${I}]`:`outputIndices${w}`};`,I++);return x},$;if(e[0].dataType===9){let w=(C,x,S="")=>`
          let outputIndices${x} = ${y.offsetToIndices(`outputOffset + ${x}u`)};
          ${k(x)};
          let offset${x} = ${g.indicesToOffset(`dataIndices${x}`)};
          let index${x} = offset${x} / 4u;
          let component${x} = offset${x} % 4u;
          ${C}[${x}] = ${S}(${g.getByOffset(`index${x}`)}[component${x}]);
        `;$=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${y.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${y.offsetToIndices("global_idx")};
      ${k("")};
      let value = ${g.getByIndices("dataIndices")};
      ${y.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,_,y)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:f}},Cc=e=>me({axis:e.axis}),Sc=(e,t)=>{let i=e.inputs;wl(i),e.compute($l(e.inputs,t))}}),vl,Tc,Ic,ig=q(()=>{ne(),se(),oe(),vl=(e,t,i,r,n,s,a,o,l)=>{let d=[{type:12,data:s},{type:12,data:r},{type:12,data:n},{type:12,data:i},{type:12,data:a},{type:12,data:o},{type:12,data:l}],p=[s];d.push(...ee(t.dims,p));let f=h=>{let g=B("indices_data",t.dataType,t.dims.length),_=Q("input_slice_offsets_data",12,1,1),y=[g,_],k=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:i.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(k).declareVariables(...y)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${i.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${i.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},Tc=(e,t)=>{let i=e.inputs,r=i[0].dims,n=i[0].dataType,s=i[1].dims,a=s[s.length-1],o=A.sizeToDimension(s,s.length-1),l=A.sizeFromDimension(r,t.batchDims+a),d=A.sizeToDimension(r,t.batchDims),p=A.sizeFromDimension(r,t.batchDims),f=o/d,h=new Array(a),g=l;for(let x=0;x<a;++x)h[a-1-x]=g,g*=r[t.batchDims+a-1-x];let _=vl(e,i[1],h,t.batchDims,r,o,f,p,a),y=t.batchDims+a;if(y>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let k=s.slice(0,-1).concat(r.slice(y)),$=A.size(k),w=[{type:12,data:$},{type:12,data:l},...ee(i[0].dims,_.dims,k)],C=x=>{let S=B("data",i[0].dataType,i[0].dims.length),I=B("slice_offsets",12,_.dims.length),E=Q("output",i[0].dataType,k.length);return`
          ${x.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(S,I,E)}
            ${x.mainStart()}
            ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:k,dataType:n}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:w}),getShaderSource:C},{inputs:[i[0],_]})},Ic=e=>({batchDims:e.batch_dims,cacheKey:""})}),xl,kl,Ec,Mc,ng=q(()=>{ne(),se(),xe(),oe(),xl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let i=A.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,n=e[0],s=e[2],a=e.length===4?e[3]:void 0;if(s.dims.length!==n.dims.length||!n.dims.map((o,l)=>l===i?Math.ceil(o/r)===s.dims[l]:o===s.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==s.dims.length||!a.dims.map((o,l)=>o===s.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},kl=(e,t)=>{let i=e[0].dims,r=e[1].dims,n=i.length,s=A.normalizeAxis(t.gatherAxis,n),a=A.normalizeAxis(t.quantizeAxis,n),o=i.slice(0);o.splice(s,1,...r);let l=A.size(o),d=e[2].dataType,p=e[0].dataType===22,f=[{type:12,data:l},{type:12,data:a},{type:12,data:s},{type:12,data:t.blockSize},...ee(...e.map((g,_)=>g.dims),o)],h=g=>{let _=B("data",e[0].dataType,e[0].dims.length),y=B("inputIndices",e[1].dataType,e[1].dims.length),k=B("scales",e[2].dataType,e[2].dims.length),$=e.length>3?B("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=Q("output",d,o.length),C=[_,y,k];$&&C.push($);let x=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(x).declareVariables(...C,w)}
        ${g.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${y.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${y.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${y.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${i[s]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${k.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${k.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${k.getByIndices("scale_indices")};
        ${$?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${$.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${$.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Me(d)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((g,_)=>_!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(g,_)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:h}},Ec=(e,t)=>{let i=e.inputs;xl(i,t),e.compute(kl(e.inputs,t))},Mc=e=>me({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Cl,Sl,zc,Ac,ag=q(()=>{ne(),se(),xe(),oe(),Cl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Sl=(e,t)=>{let i=e[0].dims,r=e[0].dataType,n=i.length,s=e[1].dims,a=e[1].dataType,o=A.normalizeAxis(t.axis,n),l=i[o],d=s.slice(0),p=A.size(d),f=B("input",r,n),h=B("indicesInput",a,s.length),g=Q("output",r,d.length),_=[{type:12,data:p},{type:6,data:l},{type:12,data:o}];return _.push(...ee(i,s,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:_}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,h,g)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},zc=e=>me({axis:e.axis}),Ac=(e,t)=>{let i=e.inputs;Cl(i),e.compute(Sl(e.inputs,t))}}),Tl,Il,Oc,Rc,sg=q(()=>{ne(),se(),oe(),Tl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Il=(e,t)=>{let i=e[0].dims.slice(),r=e[1].dims.slice(),[n,s,a]=zd.getShapeOfGemmResult(i,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),o=[n,s];if(!o)throw new Error("Can't use gemm on the given tensors");let l=16,d=Math.ceil(s/l),p=Math.ceil(n/l),f=!0,h=A.size(o),g=[{type:12,data:f?d:h},{type:12,data:n},{type:12,data:s},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],_=["type","type"];e.length===3&&(g.push(...ee(e[2].dims)),_.push("rank")),g.push(...ee(o));let y=$=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let C=t.alpha===1?"":"value *= uniforms.alpha;",x=B("a",e[0].dataType,e[0].dims),S=B("b",e[1].dataType,e[1].dims),I=x.type.value,E=null,z=[x,S];e.length===3&&(E=B("c",e[2].dataType,e[2].dims.length),z.push(E));let D=Q("output",e[0].dataType,o.length);z.push(D);let W=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(W).declareVariables(...z)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${I}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${C}
    ${E!=null?`let cOffset = ${E.broadcastedIndicesToOffset("vec2(m, n)",D)}; value += ${I}(uniforms.beta) * ${E.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},k=$=>{let w=B("a",e[0].dataType,e[0].dims),C=B("b",e[1].dataType,e[1].dims),x=null,S=[w,C];e.length===3&&(x=B("c",e[2].dataType,e[2].dims.length),S.push(x));let I=Q("output",e[0].dataType,o.length);S.push(I);let E=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],z="",D="";t.transA&&t.transB?(D=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,z="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(D=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,z="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(D=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,z="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(D=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,z="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let W=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(E).declareVariables(...S)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${C.type.storage}, ${l}>, ${l}>;
  ${$.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${I.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${D}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${z}
      }
      workgroupBarrier();
    }

    ${W}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${x!=null?`let cOffset = ${x.broadcastedIndicesToOffset("vec2(m, n)",I)}; value += ${I.type.value}(uniforms.beta) * ${x.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:d*p},programUniforms:g}),getShaderSource:k}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:y}},Oc=e=>{let t=e.transA,i=e.transB,r=e.alpha,n=e.beta;return{transA:t,transB:i,alpha:r,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Rc=(e,t)=>{Tl(e.inputs),e.compute(Il(e.inputs,t))}}),Qe,nt,wt,$t,El,Ml,zl,Al,Ol,Rl,Bl,Dl,Bc,Dc,og=q(()=>{ne(),se(),xe(),oe(),[Qe,nt,wt,$t]=[0,1,2,3],El=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Ml=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,zl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Al=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Ol=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Rl=(e,t,i)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Qe}] = batch;
     indices[${nt}] = channel;`+(()=>{switch(i.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${wt}] = u32(r);
            indices[${$t}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${wt}] = u32(clamp(r, 0, H - 1));
          indices[${$t}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${wt}] = gs_reflect(r, border[1], border[3]);
          indices[${$t}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${i.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Bl=(e,t,i)=>(()=>{switch(i.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Qe}], indices[${nt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Qe}], indices[${nt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Qe}], indices[${nt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Qe}], indices[${nt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Qe}], indices[${nt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Qe}], indices[${nt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${i.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Dl=(e,t)=>{let i=B("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=B("grid",e[1].dataType,r.length,2),s=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(s=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Qe,nt,wt,$t]=[0,3,1,2]);let a=Q("output",e[0].dataType,s.length),o=i.type.value,l=A.size(s),d=[{type:12,data:l},...ee(e[0].dims,r,s)],p=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(i,n,a)}
  ${Ml}
  ${zl(o)}
  ${Al(t)}
  ${Ol(t)}
  ${Rl(i,o,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${wt}]);
      let W_in = i32(uniforms.x_shape[${$t}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Qe}], indices[${wt}], indices[${$t}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Bl(a,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let h=A.size(s);return{outputs:[{dims:s,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:d}},getShaderSource:p}},Bc=(e,t)=>{El(e.inputs),e.compute(Dl(e.inputs,t))},Dc=e=>me({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ae,Nl,Nc,Xi,Pl,lr,Pc,Uc=q(()=>{ne(),se(),xe(),jn(),Kn(),oe(),gt(),Ae=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Nl=(e,t)=>{let i=e[0],r=Ae(e,1),n=Ae(e,2),s=Ae(e,3),a=Ae(e,4),o=Ae(e,5),l=Ae(e,6),d=Ae(e,7);if(i.dims.length!==3&&i.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let p=i.dims[0],f=i.dims[1],h=i.dims.length===3?i.dims[2]:t.numHeads*i.dims[4],g=f,_=0,y=0,k=Math.floor(h/t.numHeads);if(l&&d&&A.size(l.dims)&&A.size(d.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==p||l.dims[1]!==t.numHeads||l.dims[3]!==k)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==k)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');_=l.dims[2],y=l.dims[2]}else if(l&&A.size(l.dims)||d&&A.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(r&&A.size(r.dims)>0){if(i.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==i.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,g=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==k)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,g=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==k)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,g=r.dims[2]}}else{if(i.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(i.dims[2]!==t.numHeads||i.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(s&&A.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=_+g,C=0;if(a&&A.size(a.dims)>0){C=8;let E=a.dims;throw E.length===1?E[0]===p?C=1:E[0]===3*p+2&&(C=3):E.length===2&&E[0]===p&&E[1]===w&&(C=5),C===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let x=!1,S=h;if(n&&A.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(g!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=n.dims[2]}else{if(g!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');S=n.dims[1]*n.dims[3],x=!0}}let I=!1;if(a&&A.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(o&&A.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==p||o.dims[1]!==t.numHeads||o.dims[2]!==f||o.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:f,pastSequenceLength:_,kvSequenceLength:g,totalSequenceLength:w,maxSequenceLength:y,inputHiddenSize:0,hiddenSize:h,vHiddenSize:S,headSize:k,vHeadSize:Math.floor(S/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:C,scale:t.scale,broadcastResPosBias:I,passPastInKv:x,qkvFormat:$}},Nc=e=>me({...e}),Xi=me({perm:[0,2,1,3]}),Pl=(e,t,i,r,n,s,a)=>{let o=[r,n,s],l=A.size(o),d=[{type:12,data:l},{type:12,data:a},{type:12,data:s}],p=f=>{let h=Q("qkv_with_bias",t.dataType,o),g=B("qkv",t.dataType,o),_=B("bias",i.dataType,o),y=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(y).declareVariables(g,_,h)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:p},{inputs:[t,i],outputs:[-1]})[0]},lr=(e,t,i,r,n,s,a,o)=>{let l=s;if(a&&A.size(a.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Pl(e,s,a,t,r,i*n,o),l=l.reshape([t,r,i,n]),i===1||r===1?l:e.compute(De(l,Xi.perm),{inputs:[l],outputs:[-1]})[0]}else return s.dims.length===3&&(l=s.reshape([t,r,i,n])),i===1||r===1?l:e.compute(De(l,Xi.perm),{inputs:[l],outputs:[-1]})[0]},Pc=(e,t)=>{let i=Nl(e.inputs,t),r=e.inputs[0],n=Ae(e.inputs,1),s=Ae(e.inputs,2),a=Ae(e.inputs,3),o=Ae(e.inputs,4),l=Ae(e.inputs,5),d=Ae(e.inputs,6),p=Ae(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if(n?.dims.length===5)throw new Error("Packed KV is not implemented");let f=n&&s&&n.dims.length===4&&s.dims.length===4,h=lr(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,r,a,0);if(f)return pr(e,h,n,s,o,void 0,d,p,l,i);if(!n||!s)throw new Error("key and value must be provided");let g=lr(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.headSize,n,a,i.hiddenSize),_=lr(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.vHeadSize,s,a,2*i.hiddenSize);pr(e,h,g,_,o,void 0,d,p,l,i)}}),Ul,ql,Wl,Ll,En,qc,Wc,Lc=q(()=>{ne(),se(),xe(),oe(),Ul=e=>{if(!e||e.length<1)throw new Error("too few inputs")},ql=(e,t)=>{let i=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>i.push(Number(n))),r=i.length),me({numOutputs:r,axis:t.axis,splitSizes:i})},Wl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${J("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Ll=e=>{let t=e.length,i=[];for(let r=0;r<t;++r){let n=e[r].setByIndices("indices","input[global_idx]");t===1?i.push(n):r===0?i.push(`if (output_number == ${r}u) { ${n} }`):r===t-1?i.push(`else { ${n} }`):i.push(`else if (output_number == ${r}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${i.join(`
`)}
      }`},En=(e,t)=>{let i=e[0].dims,r=A.size(i),n=e[0].dataType,s=A.normalizeAxis(t.axis,i.length),a=new Array(t.numOutputs),o=B("input",n,i.length),l=new Array(t.numOutputs),d=[],p=[],f=0,h=[{type:12,data:r}];for(let _=0;_<t.numOutputs;_++){f+=t.splitSizes[_],l[_]=f;let y=i.slice();y[s]=t.splitSizes[_],p.push(y),a[_]=Q(`output${_}`,n,y.length),d.push({dims:p[_],dataType:e[0].dataType})}h.push({type:12,data:l},...ee(i,...p));let g=_=>`
  ${_.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(o,...a)}
  ${Wl(l.length)}
  ${Ll(a)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${J("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${o.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:h})}},qc=(e,t)=>{Ul(e.inputs);let i=e.inputs.length===1?t:ql(e.inputs,t);e.compute(En(e.inputs,i),{inputs:[0]})},Wc=e=>{let t=e.axis,i=e.splitSizes,r=e.numOutputs<0?i.length:e.numOutputs;if(r!==i.length)throw new Error("numOutputs and splitSizes length must be equal");return me({axis:t,numOutputs:r,splitSizes:i})}}),Vl,Gr,Vc,Gc=q(()=>{ne(),se(),xe(),oe(),Vl=(e,t)=>{let[i,r,n,s]=e,{numHeads:a,rotaryEmbeddingDim:o}=t;if(i.dims.length!==3&&i.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${i.dims.length}`);if(!A.areEqual(r.dims,[])&&!A.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!A.areEqual(n.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=i.dims[0],d=i.dims[i.dims.length-2],p=n.dims[0],f=A.sizeFromDimension(i.dims,1)/d,h=o===0?n.dims[1]*2:f/a;if(o>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(l!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(d!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(h/2!==n.dims[1]&&o/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`);if(d>p)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Gr=(e,t)=>{let{interleaved:i,numHeads:r,rotaryEmbeddingDim:n,scale:s}=t,a=e[0].dims[0],o=A.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=o/l,p=e[2].dims[1],f=n===0?p*2:d/r,h=new Array(a,l,d/f,f-p),g=A.computeStrides(h),_=[{type:1,data:s},{type:12,data:h},{type:12,data:g},...e[0].dims.length===3?new Array({type:12,data:[o,d,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,f,l*f,1]}):[],...ee(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],y=k=>{let $=B("input",e[0].dataType,e[0].dims.length),w=B("position_ids",e[1].dataType,e[1].dims.length),C=B("cos_cache",e[2].dataType,e[2].dims.length),x=B("sin_cache",e[3].dataType,e[3].dims.length),S=Q("output",e[0].dataType,e[0].dims.length);return k.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${k.declareVariables($,w,C,x,S)}

        ${k.mainStart(Ut)}
          let half_rotary_emb_dim = uniforms.${C.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",Q("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${i});
            let j = i + select(half_rotary_emb_dim, 1, ${i});
            let re = ${$.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${x.get("position_id","bsnh[3]")};
            ${S.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${x.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${S.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${S.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:me({interleaved:i}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(h)/Ut)},programUniforms:_})}},Vc=(e,t)=>{Vl(e.inputs,t),e.compute(Gr(e.inputs,t))}}),Gl,jl,Zi,Hl,jc,lg=q(()=>{xe(),ne(),Kn(),Uc(),Lc(),gt(),Gc(),oe(),Gl=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let i=e[0],r=e[1],n=e[2],s=e[3],a=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(i.dims.length!==3&&i.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,l=i.dims[0],d=i.dims[1],p=i.dims.length===3?o?i.dims[2]/3:i.dims[2]:t.numHeads*i.dims[4],f=d,h=0,g=!r||r.dims.length===0,_=Math.floor(g?p/(t.numHeads+2*t.kvNumHeads):p/t.numHeads);g&&(p=_*t.numHeads);let y=s&&s.dims.length!==0,k=a&&a.dims.length!==0;if(y&&s.dims.length===4&&s.dims[0]===l&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===_)throw new Error("BSNH pastKey/pastValue is not supported");if(y&&k){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=s.dims[2]}else if(y||k)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(r&&r.dims.length>0){if(i.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(i.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');f=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=r.dims[2]}}else{if(i.dims.length!==3&&i.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(i.dims.length===5&&(i.dims[2]!==t.numHeads||i.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let w=0,C=!1,x=t.kvNumHeads?_*t.kvNumHeads:p;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(f!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');x=n.dims[2]}else{if(f!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');x=n.dims[1]*n.dims[3],C=!0}}let S=e.length>4?e[5]:void 0;if(S&&S.dims.length!==1&&S.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:d,pastSequenceLength:h,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:p,vHiddenSize:x,headSize:_,vHeadSize:Math.floor(x/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:C,qkvFormat:$}},jl=me({perm:[0,2,1,3]}),Zi=(e,t,i)=>{let r=t,n=i.kvNumHeads;return t.dims.length===3&&i.kvSequenceLength!==0&&(r=t.reshape([i.batchSize,i.kvSequenceLength,n,i.headSize]),r=e.compute(De(r,jl.perm),{inputs:[r],outputs:[-1]})[0]),r},Hl=(e,t,i,r)=>{let n=7,s=["type","type"],a=[e*t],o=e*t,l=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],d=p=>{let f=B("seq_lens",i.dataType,i.dims),h=B("total_seq_lens",r.dataType,r.dims),g=Q("pos_ids",n,a),_=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${p.registerUniforms(_).declareVariables(f,h,g)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${h.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${g.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:d}},jc=(e,t)=>{let i=Gl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,p=i.kvNumHeads?i.kvNumHeads:i.numHeads,f=me({axis:2,numOutputs:3,splitSizes:[i.numHeads*i.headSize,p*i.headSize,p*i.headSize]}),[h,g,_]=!n&&!s?e.compute(En([r],f),{inputs:[r],outputs:[-1,-1,-1]}):[r,n,s],y,k;if(t.doRotary){let x=e.compute(Hl(i.batchSize,i.sequenceLength,l,d),{inputs:[l,d],outputs:[-1]})[0],S=e.inputs[7],I=e.inputs[8],E=me({interleaved:t.rotaryInterleaved!==0,numHeads:i.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),z=[h,x,S,I],D=[-1];y=e.compute(Gr(z,E),{inputs:z,outputs:D})[0],z.splice(0,1,g);let W=me({interleaved:t.rotaryInterleaved!==0,numHeads:i.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});k=e.compute(Gr(z,W),{inputs:z,outputs:D})[0]}let $=lr(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,t.doRotary?y:h,void 0,0),w=Zi(e,t.doRotary?k:g,i),C=Zi(e,_,i);pr(e,$,w,C,void 0,void 0,a,o,void 0,i,l,d)}}),Qi,Fl,Kl,Hc,ug=q(()=>{ne(),se(),gt(),oe(),Qi=(e,t,i,r,n,s,a,o)=>{let l=ve(s),d=l===1?"f32":`vec${l}f`,p=l===1?"vec2f":`mat2x${l}f`,f=n*a,h=64;f===1&&(h=256);let g=[n,a,s/l],_=[n,a,2],y=["rank","type","type"],k=[];k.push(...ee(g,_));let $=w=>{let C=B("x",t.dataType,3,l),x=B("scale",i.dataType,i.dims),S=B("bias",r.dataType,r.dims),I=Q("output",1,3,2),E=[C,x,S,I];return`
  var<workgroup> workgroup_shared : array<${p}, ${h}>;
  const workgroup_size = ${h}u;
  ${w.declareVariables(...E)}
  ${w.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${C.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${p}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${mt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${mt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${o};${h}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:_,dataType:1}],dispatchGroup:{x:f},programUniforms:k}),getShaderSource:$},{inputs:[t,i,r],outputs:[-1]})[0]},Fl=(e,t,i)=>{let r=t[0].dims,n=r,s=2,a=r[0],o=r[1],l=A.sizeFromDimension(r,s),d=ve(l),p=A.size(n)/d,f=Qi(e,t[0],t[1],t[2],a,l,o,i.epsilon),h=[a,o,l/d],g=[a,o],_=["type","none"],y=k=>{let $=B("x",t[0].dataType,h.length,d),w=B("scale_shift",1,g.length,2),C=Q("output",t[0].dataType,h.length,d),x=[$,w,C];return`
  ${k.registerUniform("output_size","u32").declareVariables(...x)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${C.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${C.type.value}(scale_shift.x) + ${C.type.value}(scale_shift.y);
      ${C.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...ee(h,g,h)]}),getShaderSource:y},{inputs:[t[0],f]})},Kl=(e,t,i)=>{let r=t[0].dims,n=r,s=r[0],a=r[r.length-1],o=A.sizeFromDimension(r,1)/a,l=ve(a),d=A.size(n)/l,p=[{type:12,data:o},{type:12,data:Math.floor(a/l)}],f=["type","type"],h=!1,g=[0,r.length-1];for(let $=0;$<r.length-2;$++)h=h||r[$+1]!==1,g.push($+1);h=h&&r[r.length-1]!==1;let _=h?e.compute(De(e.inputs[0],g),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},($,w)=>r[g[w]])),y=Qi(e,_,t[1],t[2],s,o,a,i.epsilon),k=$=>{let w=Te(t[0].dataType),C=l===1?"vec2f":`mat${l}x2f`,x=E=>{let z=E===0?"x":"y",D=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${w}(${D}(scale.${z}))`;case 2:return`vec2<${w}>(${D}(scale[0].${z}, scale[1].${z}))`;case 4:return`vec4<${w}>(${D}(scale[0].${z}, scale[1].${z}, scale[2].${z}, scale[3].${z}))`;default:throw new Error(`Not supported compoents ${l}`)}},S=B("input",t[0].dataType,t[0].dims,l),I=Q("output",t[0].dataType,n,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${S.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${C}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${I.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${x(0)}, ${x(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:k},{inputs:[t[0],y]})},Hc=(e,t)=>{t.format==="NHWC"?Kl(e,e.inputs,t):Fl(e,e.inputs,t)}}),Yl,Xl,Fc,dg=q(()=>{ne(),se(),oe(),Yl=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Xl=(e,t,i)=>{let r=t.simplified,n=e[0].dims,s=e[1],a=!r&&e[2],o=n,l=A.normalizeAxis(t.axis,n.length),d=A.sizeToDimension(n,l),p=A.sizeFromDimension(n,l),f=A.size(s.dims),h=a?A.size(a.dims):0;if(f!==p||a&&h!==p)throw new Error(`Size of X.shape()[axis:] == ${p}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${h}`);let g=[];for(let S=0;S<n.length;++S)S<l?g.push(n[S]):g.push(1);let _=ve(p),y=["type","type"],k=[{type:12,data:d},{type:1,data:p},{type:12,data:Math.floor(p/_)},{type:1,data:t.epsilon}];a&&y.push("type");let $=i>1,w=i>2,C=S=>{let I=Te(e[0].dataType),E=[B("x",e[0].dataType,e[0].dims,_),B("scale",s.dataType,s.dims,_)];a&&E.push(B("bias",a.dataType,a.dims,_)),E.push(Q("output",e[0].dataType,o,_)),$&&E.push(Q("mean_data_output",1,g)),w&&E.push(Q("inv_std_output",1,g));let z=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${S.registerUniforms(z).declareVariables(...E)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${wn("f32",_)};
    var mean_square_vector = ${wn("f32",_)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Nt(I,_,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${mt("mean_vector",_)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${mt("mean_square_vector",_)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Nt(I,_,"x[j + offset]")};
      let f32scale = ${Nt(I,_,"scale[j]")};
      output[j + offset] = ${E[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Nt(I,_,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},x=[{dims:o,dataType:e[0].dataType}];return $&&x.push({dims:g,dataType:1}),w&&x.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${_};${i};${r}`,inputDependencies:y},getRunData:()=>({outputs:x,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:k}),getShaderSource:C}},Fc=(e,t)=>{Yl(e.inputs),e.compute(Xl(e.inputs,t,e.outputCount))}}),Zl,Kc,pg=q(()=>{se(),Jn(),ea(),Zl=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Kc=e=>{Zl(e.inputs);let t=Pt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let i=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(i<8&&r<8)e.compute(Qn(e.inputs,{activation:""},t));else{let n=t[t.length-2],s=A.size(e.inputs[0].dims.slice(0,-2)),a=A.size(e.inputs[1].dims.slice(0,-2));if(s!==1&&n===1&&a===1){let o=e.inputs[0].reshape([1,s,r]),l=e.inputs[1].reshape([1,r,i]),d=[1,s,i],p=[o,l];e.compute(Vr(p,{activation:""},t,d),{inputs:p})}else e.compute(Vr(e.inputs,{activation:""},t))}}}),Ql,Jl,eu,Yc,Xc,cg=q(()=>{ne(),se(),xe(),oe(),Ql=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let i=e[0],r=i.dims.length;if(i.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,a=e[1];if(!A.areEqual(a.dims,[t.n,n,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(A.size(o)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,d=t.n*(t.bits===8?n:Math.floor((n*t.bits+7)/8));if(A.size(l)!==d)throw new Error("zeroPoints input size error.")}},Jl=(e,t)=>{let i=e[0].dims,r=i.length,n=i[r-2],s=t.k,a=t.n,o=i.slice(0,r-2),l=A.size(o),d=e[1].dims[2]/4,p=e[0].dataType,f=ve(t.k),h=ve(d),g=ve(a),_=o.concat([n,a]),y=n>1&&a/g%2===0?2:1,k=A.size(_)/g/y,$=64,w=[],C=[l,n,s/f],x=A.convertShape(e[1].dims).slice();x.splice(-1,1,d/h),w.push(...ee(C)),w.push(...ee(x)),w.push(...ee(e[2].dims)),e.length===4&&w.push(...ee(A.convertShape(e[3].dims)));let S=[l,n,a/g];w.push(...ee(S));let I=E=>{let z=C.length,D=B("a",e[0].dataType,z,f),W=B("b",12,x.length,h),H=B("scales",e[2].dataType,e[2].dims.length),Y=[D,W,H],F=e.length===4?B("zero_points",12,e[3].dims.length):void 0;F&&Y.push(F);let V=S.length,te=Q("output",e[0].dataType,V,g),X=Te(e[0].dataType),j=(()=>{switch(f){case 1:return`array<${X}, 8>`;case 2:return`mat4x2<${X}>`;case 4:return`mat2x4<${X}>`;default:throw new Error(`${f}-component is not supported.`)}})(),ae=()=>{let U=`
          // reuse a data
            var input_offset = ${D.indicesToOffset(`${D.type.indices}(batch, row, word_offset)`)};
            var a_data: ${j};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${D.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let L=0;L<g*y;L++)U+=`
            b_value = ${h===1?`b${L}_data`:`b${L}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${j}(${Array.from({length:4},(re,pe)=>`${X}(b_value_lower[${pe}]), ${X}(b_value_upper[${pe}])`).join(", ")});
            b_dequantized_values = ${f===1?`${j}(${Array.from({length:8},(re,pe)=>`(b_quantized_values[${pe}] - ${F?`zero_point${L}`:"zero_point"}) * scale${L}`).join(", ")});`:`(b_quantized_values - ${j}(${Array(8).fill(`${F?`zero_point${L}`:"zero_point"}`).join(",")})) * scale${L};`};
            workgroup_shared[local_id.x * ${y} + ${Math.floor(L/g)}]${g>1?`[${L%g}]`:""} += ${Array.from({length:8/f},(re,pe)=>`${f===1?`a_data[${pe}] * b_dequantized_values[${pe}]`:`dot(a_data[${pe}], b_dequantized_values[${pe}])`}`).join(" + ")};
          `;return U},K=()=>{let U=`
            var col_index = col * ${g};
            ${F?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${X}(8);`}
            `;for(let L=0;L<g*y;L++)U+=`
            let scale${L} = ${H.getByOffset("col_index * nBlocksPerCol + block")};
            ${F?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${F.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${L} = ${X}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return U},fe=()=>{let U=`col_index = col * ${g};`;for(let L=0;L<g*y;L++)U+=`
            let b${L}_data = ${W.getByIndices(`${W.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return U+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${j};
            var b_dequantized_values: ${j};`,U};return`
        var<workgroup> workgroup_shared: array<${te.type.value}, ${y*$}>;
        ${E.declareVariables(...Y,te)}
        ${E.mainStart([$,1,1])}
          let output_indices = ${te.offsetToIndices(`(global_idx / ${$}) * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${K()}
            for (var word: u32 = 0; word < ${d}; word += ${h}) {
              ${fe()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${ae()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${y}) {
            var output_value: ${te.type.value} = ${te.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${y};
            }
            ${te.setByIndices(`${te.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${h};${g};${y};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:p}],dispatchGroup:{x:k},programUniforms:w}),getShaderSource:I}},eu=(e,t)=>{let i=e[0].dims,r=i.length,n=i[r-2],s=t.k,a=t.n,o=i.slice(0,r-2),l=A.size(o),d=e[1].dims[2]/4,p=e[0].dataType,f=ve(t.k),h=ve(d),g=o.concat([n,a]),_=128,y=a%8===0?8:a%4===0?4:1,k=_/y,$=k*h*8,w=$/f,C=$/t.blockSize,x=A.size(g)/y,S=[],I=[l,n,s/f],E=A.convertShape(e[1].dims).slice();E.splice(-1,1,d/h),S.push(...ee(I)),S.push(...ee(E)),S.push(...ee(e[2].dims)),e.length===4&&S.push(...ee(A.convertShape(e[3].dims)));let z=[l,n,a];S.push(...ee(z));let D=W=>{let H=I.length,Y=B("a",e[0].dataType,H,f),F=B("b",12,E.length,h),V=B("scales",e[2].dataType,e[2].dims.length),te=[Y,F,V],X=e.length===4?B("zero_points",12,e[3].dims.length):void 0;X&&te.push(X);let j=z.length,ae=Q("output",e[0].dataType,j),K=Te(e[0].dataType),fe=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${K}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${K}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${K}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${K}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${Y.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${ae.type.value}, ${k}>, ${y}>;
        ${W.declareVariables(...te,ae)}
        ${W.mainStart([k,y,1])}
          let output_indices = ${ae.offsetToIndices(`workgroup_index * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${C} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${Y.getByIndices(`${Y.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${Y.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${C} + local_id.x;
            ${X?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${K}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${K}(8);`}
            let scale = ${V.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${F.getByIndices(`${F.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${h}; i++) {
              ${fe()}
              let b_value = ${h===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${K}>(${Array.from({length:4},(U,L)=>`${K}(b_value_lower[${L}]), ${K}(b_value_upper[${L}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${K}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(U,L)=>`${`dot(a_data${L}, b_dequantized_values[${L}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${y}) {
            var output_value: ${ae.type.value} = ${ae.type.value}(0);
            for (var b = 0u; b < ${k}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ae.setByIndices(`${ae.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${h};${k};${y}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:p}],dispatchGroup:{x},programUniforms:S}),getShaderSource:D}},Yc=(e,t)=>{Ql(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(eu(e.inputs,t)):e.compute(Jl(e.inputs,t))},Xc=e=>me(e)}),tu,ru,iu,nu,au,su,ou,lu,Zc,fg=q(()=>{ne(),se(),oe(),tu=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ru=(e,t,i)=>{let r="";for(let n=t-1;n>=0;--n)r+=`
            k = i32(${e.indicesGet("indices",n)}) - ${J("uniforms.pads",n,i)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${J("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${J("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},iu=(e,t,i)=>{let r="";for(let n=t-1;n>=0;--n)r+=`
                k = i32(${e.indicesGet("indices",n)}) - ${J("uniforms.pads",n,i)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${J("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${J("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${J("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},nu=(e,t,i)=>{let r="";for(let n=t-1;n>=0;--n)r+=`
                k = i32(${e.indicesGet("indices",n)}) - ${J("uniforms.pads",n,i)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${J("uniforms.x_shape",n,t)})) {
                  k = i32(${J("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${J("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},au=(e,t,i)=>{let r="";for(let n=t-1;n>=0;--n)r+=`
                k = i32(${e.indicesGet("indices",n)}) - ${J("uniforms.pads",n,i)};
                if (k < 0)  {
                  k += i32(${J("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${J("uniforms.x_shape",n,t)})) {
                  k -= i32(${J("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${J("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},su=(e,t,i)=>{switch(i.mode){case 0:return ru(e,t,i.pads.length);case 1:return iu(e,t,i.pads.length);case 2:return nu(e,t,i.pads.length);case 3:return au(e,t,i.pads.length);default:throw new Error("Invalid mode")}},ou=(e,t)=>{let i=A.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,n=A.size(i),s=[{type:12,data:n},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&s.push({type:a?e[2].dataType:1,data:t.value}),s.push(...ee(e[0].dims,i));let o=["rank"],l=d=>{let p=Q("output",e[0].dataType,i.length),f=B("x",e[0].dataType,r.length),h=f.type.value,g=su(p,r.length,t),_=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&_.push({name:"constant_value",type:a?h:"f32"}),`
            ${d.registerUniforms(_).declareVariables(f,p)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${p.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${g}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(i)/64)},programUniforms:s}),getShaderSource:l}},lu=(e,t)=>{if(e.length>1){let i=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,s=new Int32Array(2*n).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let l=0;l<o.length;l++)s[Number(o[l])]=Number(i[l]),s[Number(o[l])+n]=Number(i[l+o.length])}else i.forEach((o,l)=>s[Number(l)]=Number(o));let a=[];return s.forEach(o=>a.push(o)),{mode:t.mode,value:r,pads:a}}else return t},Zc=(e,t)=>{tu(e.inputs);let i=lu(e.inputs,t);e.compute(ou(e.inputs,i),{inputs:[0]})}}),tr,Ji,en,tn,rn,uu,du,nn,an,Qc,Jc,sn,ef,tf,on,rf,nf,af,sf,hg=q(()=>{Ue(),ne(),se(),oe(),tr=e=>{if(_e.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Ji=(e,t,i)=>{let r=t.format==="NHWC",n=e.dims.slice();r&&n.splice(1,0,n.pop());let s=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),o=t.strides.slice(),l=s?t.dilations.slice():[],d=t.pads.slice();Wr.adjustPoolAttributes(i,n,a,o,l,d);let p=Wr.computePoolOutputShape(i,n,o,l,a,d,t.autoPad),f=Object.assign({},t);s?Object.assign(f,{kernelShape:a,strides:o,pads:d,dilations:l,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:a,strides:o,pads:d,cacheKey:t.cacheKey});let h=p.slice();return h.push(h.splice(1,1)[0]),[f,r?h:p]},en=(e,t)=>{let i=t.format==="NHWC",r=A.size(e),n=A.size(t.kernelShape),s=[{type:12,data:r},{type:12,data:n}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],p=t.pads[t.pads.length-1],f=!!(d+p);s.push({type:12,data:o},{type:12,data:l},{type:12,data:d},{type:12,data:p}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let g=t.kernelShape[t.kernelShape.length-2],_=t.strides[t.strides.length-2],y=t.pads[t.pads.length/2-2],k=t.pads[t.pads.length-2];h=!!(y+k),s.push({type:12,data:g},{type:12,data:_},{type:12,data:y},{type:12,data:k}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,a,!0,f,h]}else{if(i)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=A.computeStrides(t.kernelShape);s.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((d,p)=>d+p);return[s,a,!!l,!1,!1]}},tn=(e,t,i,r,n,s,a,o,l,d,p,f)=>{let h=n.format==="NHWC",g=t.type.value,_=Q("output",t.type.tensor,r);if(n.kernelShape.length<=2){let y="",k="",$="",w=i-(h?2:1);if(p?y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`,n.kernelShape.length===2){let C=i-(h?3:2);f?k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${C}] = indices[${C}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${C}] < 0 || xIndices[${C}] >= uniforms.x_shape[${C}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${C}] = indices[${C}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${g}(${o});
              var pad = 0;
              ${k}
              ${y}
              ${$}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let y=n.kernelShape.length,k=n.pads.length,$="";return d?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(l).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${y}>;

              var value = ${g}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${y-1}u; j++) {
                  offsets[j] = offset / ${J("uniforms.kernelStrides","j",y)};
                  offset -= offsets[j] * ${J("uniforms.kernelStrides","j",y)};
                }
                offsets[${y-1}] = offset;

                isPad = false;
                for (var j = ${i-y}u; j < ${i}u; j++) {
                  xIndices[j] = indices[j] * ${J("uniforms.strides",`j - ${i-y}u`,y)}
                    + offsets[j - ${i-y}u] - ${J("uniforms.pads","j - 2u",k)};
                  ${$}
              }
              ${a}

              output[global_idx] = value;
            }`}},rn=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,uu=e=>`${rn(e)};${e.countIncludePad}`,du=e=>`${rn(e)};${e.storageOrder};${e.dilations}`,nn=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),an=(e,t,i,r)=>{let[n,s]=Ji(t,r,i),a=B("x",t.dataType,t.dims.length),o=a.type.value,l="value += x_val;",d="";n.countIncludePad?d+=`value /= ${o}(uniforms.kernelSize);`:d+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[p,f,h,g,_]=en(s,n);p.push(...ee(t.dims,s));let y=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${h};${g};${_}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(s)/64)},programUniforms:p}),getShaderSource:k=>tn(k,a,t.dims.length,s.length,n,l,d,0,f,h,g,_)}},Qc=e=>{let t=e.count_include_pad!==0,i=nn(e);if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...i,cacheKey:""};return{...r,cacheKey:uu(r)}},Jc=(e,t)=>{tr(e.inputs),e.compute(an("AveragePool",e.inputs[0],!1,t))},sn={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ef=e=>{let t=e.format;return{format:t,...sn,cacheKey:t}},tf=(e,t)=>{tr(e.inputs),e.compute(an("GlobalAveragePool",e.inputs[0],!0,t))},on=(e,t,i,r)=>{let[n,s]=Ji(t,r,i),a=`
      value = max(x_val, value);
    `,o="",l=B("x",t.dataType,t.dims.length),d=["rank"],[p,f,h,g,_]=en(s,n);return p.push(...ee(t.dims,s)),{name:e,shaderCache:{hint:`${r.cacheKey};${h};${g};${_}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(s)/64)},programUniforms:p}),getShaderSource:y=>tn(y,l,t.dims.length,s.length,n,a,o,t.dataType===10?-65504:-1e5,f,h,g,_)}},rf=(e,t)=>{tr(e.inputs),e.compute(on("MaxPool",e.inputs[0],!1,t))},nf=e=>{let t=e.storage_order,i=e.dilations,r=nn(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:t,dilations:i,...r,cacheKey:""};return{...n,cacheKey:du(n)}},af=e=>{let t=e.format;return{format:t,...sn,cacheKey:t}},sf=(e,t)=>{tr(e.inputs),e.compute(on("GlobalMaxPool",e.inputs[0],!0,t))}}),pu,cu,of,lf,mg=q(()=>{ne(),se(),xe(),oe(),pu=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((i,r)=>i===e[2].dims[r]).reduce((i,r)=>i&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,s)=>s===t.axis||n===e[0].dims[s]).reduce((n,s)=>n&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let i=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(i/r)||t.blockSize>Math.ceil(i/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},cu=(e,t)=>{let i=A.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,n=r===3,s=e[0].dims,a=e[1].dataType,o=A.size(s),l=r===3||r===2,d=l?[Math.ceil(A.size(e[0].dims)/4)]:e[0].dims,p=e[1].dims,f=e.length>2?e[2]:void 0,h=f?l?[Math.ceil(A.size(f.dims)/4)]:f.dims:void 0,g=p.length===0||p.length===1&&p[0]===1,_=g===!1&&p.length===1,y=ve(o),k=g&&(!l||y===4),$=k?y:1,w=k&&!l?y:1,C=B("input",l?12:r,d.length,w),x=B("scale",a,p.length),S=f?B("zero_point",l?12:r,h.length):void 0,I=Q("output",a,s.length,$),E=[C,x];S&&E.push(S);let z=[d,p];f&&z.push(h);let D=[{type:12,data:o/$},{type:12,data:i},{type:12,data:t.blockSize},...ee(...z,s)],W=H=>{let Y=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${H.registerUniforms(Y).declareVariables(...E,I)}
      ${H.mainStart()}
          ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${I.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${C.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${C.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${x.getByOffset("0")}`:_?`
            let scale_index = ${I.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${x.getByOffset("scale_index")};`:`
            var scale_indices: ${x.type.indices} = output_indices;
            let index = ${x.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${x.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${x.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${S?g?l?`
                let zero_point_input = ${S.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${S.getByOffset("0")}`:_?l?`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${S.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${S.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${x.indicesToOffset("scale_indices")};
                let zero_point_input = ${S.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${S.getByIndices("scale_indices")};`:`let zero_point_value = ${l?n?"i32":"u32":C.type.value}(0);`};
      // Compute and write output
      ${I.setByOffset("global_idx",`${I.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:S?["rank","rank","rank"]:["rank","rank"]},getShaderSource:W,getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(o/$/64),y:1,z:1},programUniforms:D})}},of=(e,t)=>{pu(e.inputs,t),e.compute(cu(e.inputs,t))},lf=e=>me({axis:e.axis,blockSize:e.blockSize})}),fu,hu,uf,gg=q(()=>{Ue(),ne(),oe(),fu=(e,t,i)=>{let r=e===t,n=e<t&&i<0,s=e>t&&i>0;if(r||n||s)throw new Error("Range these inputs' contents are invalid.")},hu=(e,t,i,r)=>{let n=Math.abs(Math.ceil((t-e)/i)),s=[n],a=n,o=[{type:12,data:a},{type:r,data:e},{type:r,data:i},...ee(s)],l=d=>{let p=Q("output",r,s.length),f=p.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${d.registerUniforms(h).declareVariables(p)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:s,dataType:r}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:o})}},uf=e=>{let t=0,i=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],i=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],i=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),_e.webgpu.validateInputContent&&fu(t,i,r),e.compute(hu(t,i,r,e.inputs[0].dataType),{inputs:[]})}}),mu,gu,df,pf,yg=q(()=>{ne(),se(),xe(),oe(),mu=(e,t,i,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${i};`;case"add":return r==="i32"||r==="u32"?`atomicAdd(&${t}, bitcast<${r}>(${i}));`:`
              ${n}bitcast<${r}>(oldValue) + (${i})${s}`;case"max":return r==="i32"||r==="u32"?`atomicMax(&${t}, bitcast<${r}>(${i}));`:`
                ${n}max(bitcast<f32>(oldValue), (${i}))${s}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${i}));`:`${n}min(bitcast<${r}>(oldValue), (${i}))${s}`;case"mul":return`${n}(bitcast<${r}>(oldValue) * (${i}))${s}`;default:throw new Error(`Reduction ${e} is not supported.`)}},gu=(e,t)=>{let i=e[0].dims,r=e[1].dims,n=i,s=1,a=Math.ceil(A.sizeToDimension(r,r.length-1)/s),o=r[r.length-1],l=A.sizeFromDimension(i,o),d=[{type:12,data:a},{type:12,data:o},{type:12,data:l},...ee(e[1].dims,e[2].dims,n)],p=f=>{let h=B("indices",e[1].dataType,e[1].dims.length),g=B("updates",e[2].dataType,e[2].dims.length,s),_=t.reduction!=="none"&&t.reduction!==""?Pd("output",e[0].dataType,n.length):Q("output",e[0].dataType,n.length,s);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,g,_)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${mu(t.reduction,"output[data_offset + i]","value",_.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:p}},df=e=>me({reduction:e.reduction}),pf=(e,t)=>{e.compute(gu(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),yu,_u,bu,ln,wu,$u,vu,xu,ku,Cu,Su,Tu,un,Iu,Eu,Mu,zu,Au,cf,ff,_g=q(()=>{ne(),se(),xe(),oe(),yu=(e,t)=>{if(e.every(i=>i>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},_u=(e,t,i)=>{t.every(n=>n>=0&&n<i||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(i).fill(1);return t.forEach((n,s)=>r[n]=e[s]),r},bu=(e,t,i,r,n,s)=>{let[a,o,l]=i>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(p=>s.push(p));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(p=>r.push(p)),r.length!==0&&r.length!==d&&i>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");yu(r,t),t.axes.length>0&&_u(r,t.axes,d).forEach((p,f)=>r[f]=p)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(p=>n.push(Number(p))),n.length!==0&&n.length!==d&&i>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof n<"u"&&r.length>0&&n.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},ln=(e,t,i,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${i}));
  let fract = ${r}(big % (${i})) / ${r}(${i});
  return whole + fract;
`,wu=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${ln("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${ln("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",$u=(e,t,i)=>`fn getNearestPixelFromOriginal(xOriginal: ${i}, isDownSample: bool) -> ${i} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",vu=(e,t,i)=>{let r=new Array(i).fill(0).concat(new Array(i).fill(1)),n=e.length===0?r:e.slice();return t.length>0?(t.forEach((s,a)=>{r[s]=n[a],r[a+i]=n[t.length+a]}),r):n},xu=(e,t,i,r)=>{let n=[];if(i.length>0)if(r.length>0){if(e.forEach(s=>n.push(s)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((s,a)=>n[s]=i[a])}else i.forEach(s=>n.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((s,a)=>Math.round(s*t[a]))}return n},ku=(e,t,i)=>{let r=(()=>{switch(i.keepAspectRatioPolicy){case"not_larger":return i.axes.length>0?Math.min(...i.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return i.axes.length>0?Math.max(...i.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${i.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return i.axes.length>0?(i.axes.forEach(s=>t[s]=r),i.axes.forEach(s=>n[s]=Math.round(e[s]*t[s]))):(t.fill(r,0,t.length),n.forEach((s,a)=>n[a]=Math.round(s*t[a]))),n},Cu=(e,t,i,r,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${i.length}> {
      var original_indices: array<${e.type.value}, ${i.length}>;
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${J("uniforms.scales","i",r)};
        var roi_low = ${J("uniforms.roi","i",n)};
        var roi_hi = ${J("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${J("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${J("uniforms.output_shape","i",i.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Su=(e,t,i,r,n,s,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${J("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${J("uniforms.roi","i",s)};
          var roi_hi = ${J("uniforms.roi",`i + ${i.length}`,s)};
          var input_shape_i = ${J("uniforms.input_shape","i",i.length)};
          var output_shape_i = ${J("uniforms.output_shape","i",r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Tu=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${J("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,un=(e,t,i,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",i,"batch")};
`:"",Iu=(e,t,i,r,n)=>{let[s,a,o,l]=i.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${i[a]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${i[o]} - 1))`)};
      ${un(e,l,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${a}];
      var col:${d} = originalIndices[${o}];
      ${r?`if (row < 0 || row > (${i[a]} - 1) || col < 0 || col > (${i[o]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${i[a]} - 1));
      col = max(0, min(col, ${i[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${i.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${i.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Eu=(e,t,i,r,n,s,a,o,l,d)=>{let p=i.length===2,[f,h]=p?[0,1]:[2,3],g=e.type.value,_=y=>{let k=y===f?"row":"col";return`
      fn ${k}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices",y)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[y]},
        ${r[y]}, ${i[y]}, ${s[y]}, ${s[y]} + ${i.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${i[y]} - 1))) {
          return ${l};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${k}: ${g} = originalIdx + ${g}(i);
          if (${k} < 0 || ${k} >= ${i[y]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${l};`:`${k} = max(0, min(${k}, ${i[y]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",y,`u32(${k})`)};
          data[i + 1] = ${y===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(f)};
    ${_(h)};
  fn getCubicInterpolationCoefs(s: ${g}) -> array<${g}, 4> {
    var absS = abs(s);
    var coeffs: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${g} = 1.0 - absS;
    var twoMinusAbsS: ${g} = 2.0 - absS;
    var onePlusAbsS: ${g} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${g}, 4>, coefs: array<${g}, 4>) -> ${g} {
    var coefsSum: ${g} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${g} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Mu=(e,t,i,r,n)=>{let[s,a,o,l,d]=i.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${i[a]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${i[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${i[l]} - 1))`)};
      ${un(e,d,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${a}];
      var height:${p} = originalIndices[${o}];
      var width:${p} = originalIndices[${l}];
      ${r?`if (depth < 0 || depth > (${i[a]} - 1) || height < 0 || height > (${i[o]} - 1) || width < 0 || (width > ${i[l]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${i[a]} - 1));
      height = max(0, min(height, ${i[o]} - 1));
      width = max(0, min(width, ${i[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${i.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${i.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${p} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${p} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${p} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${p} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${p} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${p} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${p} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${p} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${p} = abs(depth - ${p}(depth1));
      var dx2: ${p} = abs(${p}(depth2) - depth);
      var dy1: ${p} = abs(height - ${p}(height1));
      var dy2: ${p} = abs(${p}(height2) - height);
      var dz1: ${p} = abs(width - ${p}(width1));
      var dz2: ${p} = abs(${p}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},zu=(e,t,i,r,n,s)=>{let a=e.dims,o=vu(s,t.axes,a.length),l=xu(a,r,n,t.axes),d=r.slice();r.length===0&&(d=a.map((w,C)=>w===0?1:l[C]/w),t.keepAspectRatioPolicy!=="stretch"&&(l=ku(a,d,t)));let p=Q("output",e.dataType,l.length),f=B("input",e.dataType,a.length),h=A.size(l),g=a.length===l.length&&a.every((w,C)=>w===l[C]),_=t.coordinateTransformMode==="tf_crop_and_resize",y=t.extrapolationValue,k=f.type.value,$=w=>`
      ${g?"":`
      ${wu(t.coordinateTransformMode,k)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Tu(f,a)};
              ${$u(t.nearestMode,i,k)};
              ${Su(f,p,a,l,d.length,o.length,_)};
              `;case"linear":return`
              ${Cu(p,a,l,d.length,o.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${Iu(f,p,a,_,y)}`;if(a.length===3||a.length===5)return`${Mu(f,p,a,_,y)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Eu(f,p,a,l,d,o,t.cubicCoeffA,_,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",o.length).declareVariables(f,p)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${p.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${i}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${n.length>0?n:""}|${o.length>0?o:""}|${g}|${t.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:d},{type:1,data:o},...ee(a,l)]})}},Au=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},cf=(e,t)=>{let i=[],r=[],n=[],s=Au(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");bu(e.inputs,t,s,i,r,n),e.compute(zu(e.inputs[0],t,s,i,r,n),{inputs:[0]})},ff=e=>{let t=e.antialias,i=e.axes,r=e.coordinateTransformMode,n=e.cubicCoeffA,s=e.excludeOutside!==0,a=e.extrapolationValue,o=e.keepAspectRatioPolicy,l=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return me({antialias:t,axes:i,coordinateTransformMode:r,cubicCoeffA:n,excludeOutside:s,extrapolationValue:a,keepAspectRatioPolicy:o,mode:l,nearestMode:d})}}),Ou,Ru,hf,bg=q(()=>{ne(),se(),oe(),Ou=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],i=e[1],r=e[2];if(t.dataType!==i.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(i.dims.length!==3&&i.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(i.dims[i.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(i.dims[i.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},Ru=(e,t,i,r)=>{let n=t.simplified,s=e[0].dims,a=A.size(s),o=s,l=a,d=s.slice(-1)[0],p=r?s.slice(0,-1).concat(1):[],f=!n&&e.length>3,h=e.length>4,g=r&&i>1,_=r&&i>2,y=i>3,k=64,$=ve(d),w=[{type:12,data:l},{type:12,data:$},{type:12,data:d},{type:1,data:t.epsilon}],C=S=>{let I=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],E=[B("x",e[0].dataType,e[0].dims,$),B("skip",e[1].dataType,e[1].dims,$),B("gamma",e[2].dataType,e[2].dims,$)];f&&E.push(B("beta",e[3].dataType,e[3].dims,$)),h&&E.push(B("bias",e[4].dataType,e[4].dims,$)),E.push(Q("output",e[0].dataType,o,$)),g&&E.push(Q("mean_output",1,p)),_&&E.push(Q("inv_std_output",1,p)),y&&E.push(Q("input_skip_bias_sum",e[0].dataType,o,$));let z=Te(e[0].dataType),D=Te(1,$);return`

      ${S.registerUniforms(I).declareVariables(...E)}
      var<workgroup> sum_shared : array<${D}, ${k}>;
      var<workgroup> sum_squared_shared : array<${D}, ${k}>;

      ${S.mainStart([k,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${k};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${k};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${k-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":z+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${y?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Nt(z,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${k};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${mt("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${mt("square_sum",$)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${_?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${z}(mean)`}) *
            ${z}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},x=[{dims:o,dataType:e[0].dataType}];return i>1&&x.push({dims:p,dataType:1}),i>2&&x.push({dims:p,dataType:1}),i>3&&x.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${g};${_};${y}`,inputDependencies:e.map((S,I)=>"type")},getShaderSource:C,getRunData:()=>({outputs:x,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:w})}},hf=(e,t)=>{Ou(e.inputs);let i=[0];e.outputCount>1&&i.push(-3),e.outputCount>2&&i.push(-3),e.outputCount>3&&i.push(3),e.compute(Ru(e.inputs,t,e.outputCount,!1),{outputs:i})}}),Bu,rr,Du,dn,Nu,Pu,mf,gf,wg=q(()=>{ne(),se(),xe(),oe(),Bu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((i,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},rr=(e,t)=>{let i=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>i.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>i.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return i},Du=(e,t)=>{if(e.length>1){let i=rr(e,1),r=rr(e,2),n=rr(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),me({starts:i,ends:r,axes:n})}else return t},dn=(e,t,i,r,n)=>{let s=e;return e<0&&(s+=i[r[t]]),n[t]<0?Math.max(0,Math.min(s,i[r[t]]-1)):Math.max(0,Math.min(s,i[r[t]]))},Nu=(e,t,i)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${i.length-1}; i >= 0; i--) {
            let input_shape_i = ${J("uniforms.input_shape","i",i.length)};
            let steps_i = ${J("uniforms.steps","i",i.length)};
            let signs_i = ${J("uniforms.signs","i",i.length)};
            let starts_i = ${J("uniforms.starts","i",i.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Pu=(e,t)=>{let i=e[0].dims,r=A.size(i),n=t.axes.length>0?A.normalizeAxes(t.axes,i.length):[...Array(i.length).keys()],s=rr(e,4);s.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(n.length).fill(1));let a=t.starts.map(($,w)=>dn($,w,i,n,s)),o=t.ends.map(($,w)=>dn($,w,i,n,s));if(n.length!==a.length||n.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==i.length)for(let $=0;$<i.length;++$)n.includes($)||(a.splice($,0,0),o.splice($,0,i[$]),s.splice($,0,1));let l=s.map($=>Math.sign($));s.forEach(($,w,C)=>{if($<0){let x=(o[w]-a[w])/$,S=a[w],I=S+x*s[w];a[w]=I,o[w]=S,C[w]=-$}});let d=i.slice(0);n.forEach(($,w)=>{d[$]=Math.ceil((o[$]-a[$])/s[$])});let p={dims:d,dataType:e[0].dataType},f=Q("output",e[0].dataType,d.length),h=B("input",e[0].dataType,e[0].dims.length),g=A.size(d),_=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:s.length}],y=[{type:12,data:g},{type:12,data:a},{type:6,data:l},{type:12,data:s},...ee(e[0].dims,d)],k=$=>`
      ${$.registerUniforms(_).declareVariables(h,f)}
        ${Nu(h,f,i)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${a.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:k,getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:y})}},mf=(e,t)=>{Bu(e.inputs,t);let i=Du(e.inputs,t);e.compute(Pu(e.inputs,i),{inputs:[0]})},gf=e=>{let t=e.starts,i=e.ends,r=e.axes;return me({starts:t,ends:i,axes:r})}}),Uu,qu,yf,_f,$g=q(()=>{ne(),se(),xe(),gt(),oe(),Uu=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},qu=(e,t)=>{let i=e.inputs[0],r=i.dims,n=A.size(r),s=r.length,a=A.normalizeAxis(t.axis,s),o=a<r.length-1,l,d=[];o?(d=Array.from({length:s},(E,z)=>z),d[a]=s-1,d[s-1]=a,l=e.compute(De(i,d),{inputs:[i],outputs:[-1]})[0]):l=i;let p=l.dims,f=p[s-1],h=n/f,g=ve(f),_=f/g,y=64;h===1&&(y=256);let k=(E,z)=>z===4?`max(max(${E}.x, ${E}.y), max(${E}.z, ${E}.w))`:z===2?`max(${E}.x, ${E}.y)`:z===3?`max(max(${E}.x, ${E}.y), ${E}.z)`:E,$=B("x",l.dataType,l.dims,g),w=Q("result",l.dataType,l.dims,g),C=$.type.value,x=Te(l.dataType)==="f32"?`var threadMax = ${C}(-3.402823e+38f);`:`var threadMax = ${C}(-65504.0h);`,S=E=>`
      var<workgroup> rowMaxShared : ${C};
      var<workgroup> rowSumShared : ${C};
      var<workgroup> threadShared : array<${C}, ${y}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${C} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${C}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${E.registerUniform("packedCols","i32").declareVariables($,w)}
      ${E.mainStart(y)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${y};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${x}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${C}(${k("threadShared[0]",g)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${C}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${C}(${mt("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${C}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,I=e.compute({name:"Softmax",shaderCache:{hint:`${g};${y}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:p,dataType:l.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:_}]}),getShaderSource:S},{inputs:[l],outputs:[o?-1:0]})[0];o&&e.compute(De(I,d),{inputs:[I]})},yf=(e,t)=>{Uu(e.inputs),qu(e,t)},_f=e=>me({axis:e.axis})}),pn,Wu,Lu,Vu,bf,vg=q(()=>{ne(),se(),oe(),pn=e=>Array.from(e.getBigInt64Array(),Number),Wu=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(pn(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Lu=(e,t)=>{let i=[];for(let r=0;r<e.length;++r)i.push(e[r]*t[r]);return i},Vu=(e,t)=>{let i=e[0].dims,r=t??pn(e[1]),n=Lu(i,r),s=A.size(n),a=e[0].dataType,o=B("input",a,i.length),l=Q("output",a,n.length),d=p=>`
      const inputShape = ${o.indices(...i)};
      ${p.registerUniform("output_size","u32").declareVariables(o,l)}
      ${p.mainStart()}
      ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${i.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...ee(e[0].dims,n)]}),getShaderSource:d}},bf=e=>{Wu(e.inputs),e.compute(Vu(e.inputs),{inputs:[0]})}}),Gu,ju,wf,xg=q(()=>{ne(),se(),oe(),Gu=(e,t,i,r,n)=>{let s=Q("output_data",n,i.length,4),a=B("a_data",t[1].dataType,t[1].dims.length,4),o=B("b_data",t[2].dataType,t[2].dims.length,4),l=B("c_data",t[0].dataType,t[0].dims.length,4),d,p=(f,h,g)=>`select(${h}, ${f}, ${g})`;if(!r)d=s.setByOffset("global_idx",p(a.getByOffset("global_idx"),o.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let f=(h,g,_="")=>{let y=`a_data[index_a${g}][component_a${g}]`,k=`b_data[index_b${g}][component_b${g}]`,$=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
            let output_indices${g} = ${s.offsetToIndices(`global_idx * 4u + ${g}u`)};
            let offset_a${g} = ${a.broadcastedIndicesToOffset(`output_indices${g}`,s)};
            let offset_b${g} = ${o.broadcastedIndicesToOffset(`output_indices${g}`,s)};
            let offset_c${g} = ${l.broadcastedIndicesToOffset(`output_indices${g}`,s)};
            let index_a${g} = offset_a${g} / 4u;
            let index_b${g} = offset_b${g} / 4u;
            let index_c${g} = offset_c${g} / 4u;
            let component_a${g} = offset_a${g} % 4u;
            let component_b${g} = offset_b${g} % 4u;
            let component_c${g} = offset_c${g} % 4u;
            ${h}[${g}] = ${_}(${p(y,k,$)});
          `};n===9?d=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,a,o,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},ju=e=>{let t=e[1].dims,i=e[2].dims,r=e[0].dims,n=e[1].dataType,s=!(A.areEqual(t,i)&&A.areEqual(i,r)),a=t,o=A.size(t);if(s){let d=Pt.calcShape(Pt.calcShape(t,i,!1),r,!1);if(!d)throw new Error("Can't perform where op on the given tensors");a=d,o=A.size(a)}let l=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Gu(d,e,a,s,n),getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:l},...ee(r,t,i,a)]})}},wf=e=>{e.compute(ju(e.inputs))}}),$f,kg=q(()=>{Pm(),Kn(),Um(),qm(),Wm(),Lm(),Vm(),Km(),Xm(),Zm(),Qm(),Jm(),eg(),tg(),rg(),ig(),ng(),ag(),sg(),og(),lg(),ug(),dg(),pg(),cg(),Uc(),fg(),hg(),mg(),gg(),yg(),Fn(),_g(),Gc(),bg(),wg(),$g(),Lc(),vg(),gt(),Yn(),xg(),$f=new Map([["Abs",[fp]],["Acos",[hp]],["Acosh",[mp]],["Add",[Yp]],["ArgMax",[up,vn]],["ArgMin",[lp,vn]],["Asin",[gp]],["Asinh",[yp]],["Atan",[_p]],["Atanh",[bp]],["Attention",[dp]],["AveragePool",[Jc,Qc]],["BatchNormalization",[pp]],["BiasAdd",[cp]],["BiasSplitGelu",[Kp]],["Cast",[$p,wp]],["Ceil",[xp]],["Clip",[vp]],["Concat",[ac,sc]],["Conv",[In,Tn]],["ConvTranspose",[gc,mc]],["Cos",[kp]],["Cosh",[Cp]],["CumSum",[yc,_c]],["DepthToSpace",[bc,wc]],["DequantizeLinear",[of,lf]],["Div",[Xp]],["Einsum",[$c,vc]],["Elu",[Sp,or]],["Equal",[Zp]],["Erf",[Tp]],["Exp",[Ip]],["Expand",[xc]],["FastGelu",[kc]],["Floor",[Ep]],["FusedConv",[In,Tn]],["Gather",[Sc,Cc]],["GatherElements",[Ac,zc]],["GatherBlockQuantized",[Ec,Mc]],["GatherND",[Tc,Ic]],["Gelu",[Mp]],["Gemm",[Rc,Oc]],["GlobalAveragePool",[tf,ef]],["GlobalMaxPool",[sf,af]],["Greater",[tc]],["GreaterOrEqual",[ic]],["GridSample",[Bc,Dc]],["GroupQueryAttention",[jc]],["HardSigmoid",[Pp,Np]],["InstanceNormalization",[Hc]],["LayerNormalization",[Fc]],["LeakyRelu",[zp,or]],["Less",[rc]],["LessOrEqual",[nc]],["Log",[Hp]],["MatMul",[Kc]],["MatMulNBits",[Yc,Xc]],["MaxPool",[rf,nf]],["Mul",[Qp]],["MultiHeadAttention",[Pc,Nc]],["Neg",[Op]],["Not",[Ap]],["Pad",[Zc]],["Pow",[Jp]],["QuickGelu",[Fp,or]],["Range",[uf]],["Reciprocal",[Rp]],["ReduceMin",[ip]],["ReduceMean",[Qd]],["ReduceMax",[rp]],["ReduceSum",[ap]],["ReduceProd",[np]],["ReduceL1",[Jd]],["ReduceL2",[ep]],["ReduceLogSum",[op]],["ReduceLogSumExp",[tp]],["ReduceSumSquare",[sp]],["Relu",[Bp]],["Resize",[cf,ff]],["RotaryEmbedding",[Vc]],["ScatterND",[pf,df]],["Sigmoid",[Dp]],["Sin",[Up]],["Sinh",[qp]],["Slice",[mf,gf]],["SkipLayerNormalization",[hf]],["Split",[qc,Wc]],["Sqrt",[Wp]],["Softmax",[yf,_f]],["Sub",[ec]],["Tan",[Lp]],["Tanh",[Vp]],["ThresholdedRelu",[jp,or]],["Tile",[bf]],["Transpose",[qd,Wd]],["Where",[wf]]])}),vf,Cg=q(()=>{Ue(),st(),oe(),vf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,i,r,n){Je(e.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let d of t)o.push({binding:o.length,resource:{buffer:d.buffer}});for(let d of i)o.push({binding:o.length,resource:{buffer:d.buffer}});n&&o.push({binding:o.length,resource:n});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}a.setPipeline(e.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ke(e.programInfo.name)}dispose(){}build(e,t){Je(e.name);let i=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{i.features.has(d.feature)&&r.push(`enable ${d.extension};`)});let n=Ud(t,this.backend.device.limits),s=e.getShaderSource(n),a=`${r.join(`
`)}
${n.additionalImplementations}
${s}`,o=i.createShaderModule({code:a,label:e.name});de("verbose",()=>`[WebGPU] ${e.name} shader code: ${a}`);let l=i.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return Ke(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,i=typeof e=="number"?1:e.y||1,r=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&i<=n&&r<=n)return[t,i,r];let s=t*i*r,a=Math.ceil(Math.sqrt(s));if(a>n){if(a=Math.ceil(Math.cbrt(s)),a>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}}),xf={};qt(xf,{WebGpuBackend:()=>kf});var Hu,Fu,Ku,kf,Sg=q(()=>{Ue(),ne(),st(),Rd(),Dm(),kg(),Cg(),Hu=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let i=[];for(let r=0;r<e.length;++r){let n=e[r].dataType;switch(t[r]){case"none":{i.push("");break}case"type":{i.push(`${n}`);break}case"rank":{let s=e[r].dims.length;i.push(`${n};${s}`);break}case"dims":{let s=e[r].dims.join(",");i.push(`${n};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return i.join("|")},Fu=(e,t,i)=>{let r=e.name;return e.shaderCache?.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+i+`:${Hu(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,r},Ku=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},kf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let i=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:i},n=s=>t.features.has(s)&&i.push(s)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(r),this.adapterInfo=new Ku(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Nd(this),this.programManager=new vf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Vn(e.logLevel,!!e.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Je(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),i=this.pendingQueries.get(e);for(let r=0;r<t.length/2;r++){let n=i[r],s=n.kernelId,a=this.kernels.get(s),o=a.kernelType,l=a.kernelName,d=n.programName,p=n.inputTensorViews,f=n.outputTensorViews,h=t[r*2],g=t[r*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let _=Number(h-this.queryTimeBase),y=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(y))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(k=>({dims:k.dims,dataType:at(k.dataType)})),outputsMetadata:f.map(k=>({dims:k.dims,dataType:at(k.dataType)})),kernelId:s,kernelType:o,kernelName:l,programName:d,startTime:_,endTime:y});else{let k="";p.forEach((w,C)=>{k+=`input[${C}]: [${w.dims}] | ${at(w.dataType)}, `});let $="";f.forEach((w,C)=>{$+=`output[${C}]: [${w.dims}] | ${at(w.dataType)}, `}),console.log(`[profiling] kernel "${s}|${o}|${l}|${d}" ${k}${$}start time: ${_} ns, execution time: ${y-_} ns`)}Pr("GPU",`${d}::${h}::${g}`)}e.unmap(),this.pendingQueries.delete(e)}),Ke()}run(e,t,i,r,n,s){Je(e.name);let a=[];for(let w=0;w<t.length;++w){let C=t[w].data;if(C===0)continue;let x=this.gpuDataManager.get(C);if(!x)throw new Error(`no GPU data for input: ${C}`);a.push(x)}let{outputs:o,dispatchGroup:l,programUniforms:d}=e.getRunData(t),p=i.length===0?o.map((w,C)=>C):i;if(p.length!==o.length)throw new Error(`Output size ${p.length} must be equal to ${o.length}.`);let f=[],h=[];for(let w=0;w<o.length;++w){if(!Number.isInteger(p[w])||p[w]<-3||p[w]>=s)throw new Error(`Invalid output index: ${p[w]}`);if(p[w]===-3)continue;let C=p[w]===-1,x=p[w]===-2,S=C||x?n(o[w].dataType,o[w].dims):r(p[w],o[w].dataType,o[w].dims);if(f.push(S),S.data===0)continue;let I=this.gpuDataManager.get(S.data);if(!I)throw new Error(`no GPU data for output: ${S.data}`);if(C&&this.temporaryData.push(I),x){let E=this.kernelPersistentData.get(this.currentKernelId);E||(E=[],this.kernelPersistentData.set(this.currentKernelId,E)),E.push(I)}h.push(I)}if(a.length!==t.length||h.length!==f.length){if(h.length===0)return Ke(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(d){let w=0,C=[];d.forEach(E=>{let z=typeof E.data=="number"?[E.data]:E.data;if(z.length===0)return;let D=E.type===10?2:4,W,H;E.type===10?(H=z.length>4?16:z.length>2?8:z.length*D,W=z.length>4?16:D*z.length):(H=z.length<=2?z.length*D:16,W=16),w=Math.ceil(w/H)*H,C.push(w);let Y=E.type===10?8:4;w+=z.length>4?Math.ceil(z.length/Y)*W:z.length*D});let x=16;w=Math.ceil(w/x)*x;let S=new ArrayBuffer(w);d.forEach((E,z)=>{let D=C[z],W=typeof E.data=="number"?[E.data]:E.data;if(E.type===6)new Int32Array(S,D,W.length).set(W);else if(E.type===12)new Uint32Array(S,D,W.length).set(W);else if(E.type===10)new Uint16Array(S,D,W.length).set(W);else if(E.type===1)new Float32Array(S,D,W.length).set(W);else throw new Error(`Unsupported uniform type: ${at(E.type)}`)});let I=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(I.buffer,0,S,0,w),this.gpuDataManager.release(I.id),g={offset:0,size:w,buffer:I.buffer}}let _=this.programManager.normalizeDispatchGroupSize(l),y=_[1]===1&&_[2]===1,k=Fu(e,t,y),$=this.programManager.getArtifact(k);if($||($=this.programManager.build(e,_),this.programManager.setArtifact(k,$),de("info",()=>`[artifact] key: ${k}, programName: ${e.name}`)),d&&$.uniformVariablesInfo){if(d.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${d.length} in program "${$.programInfo.name}".`);for(let w=0;w<d.length;w++){let C=d[w],x=C.type,S=typeof C.data=="number"?1:C.data.length,[I,E]=$.uniformVariablesInfo[w];if(x!==I||S!==E)throw new Error(`Uniform variable ${w} mismatch: expect type ${I} with size ${E}, got type ${x} with size ${S} in program "${$.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${e.name}" (key=${k}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run($,a,h,_,g),Ke(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,i,r){let n=$f.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:r,kernelEntry:n[0],attributes:[n[1],i]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let i of t)this.gpuDataManager.release(i.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,i){let r=this.kernels.get(e);if(!r)throw new Error(`kernel not created: ${e}`);let n=r.kernelType,s=r.kernelName,a=r.kernelEntry,o=r.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${n}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(t,o[1]),0}catch(d){return i.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${s}" failed. ${d}`)),1}finally{l&&i.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${n}] ${s}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,i,r){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let s=n.get(t),a=this.gpuDataManager.registerExternalBuffer(i,r,s);return n.set(t,[a,i]),a}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(i=>this.gpuDataManager.unregisterExternalBuffer(i[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,i){return async()=>{let r=await bn(this,e,t);return Gn(r.buffer,i)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),i=e.length;this.pendingKernels=[];for(let r=0;r<i;r++){let n=this.getComputePassEncoder(),s=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(s.computePipeline),n.setBindGroup(0,s.bindGroup),n.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Cf={};qt(Cf,{init:()=>Sf});var Or,Yu,Sf,Tg=q(()=>{ne(),st(),se(),Bm(),Or=class Tf{constructor(t,i,r,n){this.module=t,this.dataType=i,this.data=r,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(A.size(t)!==A.size(this.dims))throw new Error("Invalid new shape");return new Tf(this.module,this.dataType,this.data,t)}},Yu=class{constructor(e,t,i){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,n=i/e.PTR_SIZE,s=r===4?"i32":"i64";this.opKernelContext=Number(e.getValue(r*n++,s));let a=Number(e.getValue(r*n++,s));this.outputCount=Number(e.getValue(r*n++,s)),this.customDataOffset=Number(e.getValue(r*n++,"*")),this.customDataSize=Number(e.getValue(r*n++,s));let o=[];for(let l=0;l<a;l++){let d=Number(e.getValue(r*n++,s)),p=Number(e.getValue(r*n++,"*")),f=Number(e.getValue(r*n++,s)),h=[];for(let g=0;g<f;g++)h.push(Number(e.getValue(r*n++,s)));o.push(new Or(e,d,p,h))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let i=t?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,r=t?.outputs??[],n=(a,o,l)=>new Or(this.module,o,this.output(a,l),l),s=(a,o)=>{let l=St(a,o);if(!l)throw new Error(`Unsupported data type: ${a}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new Or(this.module,a,d,o)};return this.backend.run(e,i,r,n,s,this.outputCount)}output(e,t){let i=this.module.stackSave();try{let r=this.module.PTR_SIZE,n=r===4?"i32":"i64",s=this.module.stackAlloc((1+t.length)*r);this.module.setValue(s,t.length,n);for(let a=0;a<t.length;a++)this.module.setValue(s+r*(a+1),t[a],n);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(r){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(i)}}},Sf=async(e,t,i,r)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=(Sg(),dr(xf)).WebGpuBackend,a=new s;await a.initialize(i,r),n("webgpu",[a,o=>a.alloc(Number(o)),o=>a.free(o),(o,l,d,p=!1)=>{if(p)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(l)}, size=${Number(d)}`),a.memcpy(Number(o),Number(l));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let f=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));a.upload(Number(l),f)}},async(o,l,d)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${l}, size=${d}`),await a.download(Number(o),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(o,l,d)=>a.createKernel(o,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),o=>a.releaseKernel(o),(o,l,d,p)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${l}`);let f=new Yu(t,a,Number(l));return a.computeKernel(Number(o),f,p)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let s=new Dd(i);n("webnn",[s,()=>s.reserveTensorId(),a=>s.releaseTensorId(a),async(a,o,l,d,p)=>s.ensureTensor(a,o,l,d,p),(a,o)=>{s.uploadTensor(a,o)},async(a,o)=>s.downloadTensor(a,o),(a,o)=>s.registerMLContext(a,o),!!i.trace])}}}),Xu,ta,ra,ft,Zu,cn,jr,ia,na,fn,aa,sa,oa,If=q(()=>{Ue(),Am(),Om(),ne(),At(),Un(),Md(),Xu=(e,t)=>{ye()._OrtInit(e,t)!==0&&ge("Can't initialize onnxruntime.")},ta=async e=>{Xu(e.wasm.numThreads,qr(e.logLevel))},ra=async(e,t)=>{ye().asyncInit?.();let i=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(i){if(typeof i.limits!="object"||typeof i.features!="object"||typeof i.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=e.webgpu.powerPreference;if(r!==void 0&&r!=="low-power"&&r!=="high-performance")throw new Error(`Invalid powerPreference setting: "${r}"`);let n=e.webgpu.forceFallbackAdapter;if(n!==void 0&&typeof n!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(i=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:n}),!i)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let r=(Tg(),dr(Cf)).init;t==="webgpu"&&await r("webgpu",ye(),e,i),t==="webnn"&&await r("webnn",ye(),e)}},ft=new Map,Zu=e=>{let t=ye(),i=t.stackSave();try{let r=t.PTR_SIZE,n=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,n,n+r)!==0&&ge("Can't get session input/output count.");let s=r===4?"i32":"i64";return[Number(t.getValue(n,s)),Number(t.getValue(n+r,s))]}finally{t.stackRestore(i)}},cn=(e,t)=>{let i=ye(),r=i.stackSave(),n=0;try{let s=i.PTR_SIZE,a=i.stackAlloc(2*s);i._OrtGetInputOutputMetadata(e,t,a,a+s)!==0&&ge("Can't get session input/output metadata.");let o=Number(i.getValue(a,"*"));n=Number(i.getValue(a+s,"*"));let l=i.HEAP32[n/4];if(l===0)return[o,0];let d=i.HEAPU32[n/4+1],p=[];for(let f=0;f<d;f++){let h=Number(i.getValue(n+8+f*s,"*"));p.push(h!==0?i.UTF8ToString(h):Number(i.getValue(n+8+(f+d)*s,"*")))}return[o,l,p]}finally{i.stackRestore(r),n!==0&&i._OrtFree(n)}},jr=e=>{let t=ye(),i=t._malloc(e.byteLength);if(i===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,i),[i,e.byteLength]},ia=async(e,t)=>{let i,r,n=ye();Array.isArray(e)?[i,r]=e:e.buffer===n.HEAPU8.buffer?[i,r]=[e.byteOffset,e.byteLength]:[i,r]=jr(e);let s=0,a=0,o=0,l=[],d=[],p=[];try{if([a,l]=await Ed(t),t?.externalData&&n.mountExternalData){let x=[];for(let S of t.externalData){let I=typeof S=="string"?S:S.path;x.push(Ln(typeof S=="string"?S:S.data).then(E=>{n.mountExternalData(I,E)}))}await Promise.all(x)}for(let x of t?.executionProviders??[])if((typeof x=="string"?x:x.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof x!="string"){let S=x,I=S?.context,E=S?.gpuDevice,z=S?.deviceType,D=S?.powerPreference;I?n.currentContext=I:E?n.currentContext=await n.webnnCreateMLContext(E):n.currentContext=await n.webnnCreateMLContext({deviceType:z,powerPreference:D})}else n.currentContext=await n.webnnCreateMLContext();break}s=await n._OrtCreateSession(i,r,a),n.webgpuOnCreateSession?.(s),s===0&&ge("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(s,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[f,h]=Zu(s),g=!!t?.enableGraphCapture,_=[],y=[],k=[],$=[],w=[];for(let x=0;x<f;x++){let[S,I,E]=cn(s,x);S===0&&ge("Can't get an input name."),d.push(S);let z=n.UTF8ToString(S);_.push(z),k.push(I===0?{name:z,isTensor:!1}:{name:z,isTensor:!0,type:at(I),shape:E})}for(let x=0;x<h;x++){let[S,I,E]=cn(s,x+f);S===0&&ge("Can't get an output name."),p.push(S);let z=n.UTF8ToString(S);y.push(z),$.push(I===0?{name:z,isTensor:!1}:{name:z,isTensor:!0,type:at(I),shape:E});{if(g&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let D=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[z]??"cpu",W=n.webnnIsGraphOutput;if(D==="cpu"&&W&&W(s,z)){w.push("ml-tensor-cpu-output");continue}if(D!=="cpu"&&D!=="cpu-pinned"&&D!=="gpu-buffer"&&D!=="ml-tensor")throw new Error(`Not supported preferred output location: ${D}.`);if(g&&D!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${D}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(D)}}let C=null;return w.some(x=>x==="gpu-buffer"||x==="ml-tensor"||x==="ml-tensor-cpu-output")&&(o=n._OrtCreateBinding(s),o===0&&ge("Can't create IO binding."),C={handle:o,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(x=>x==="ml-tensor-cpu-output"?"ml-tensor":x).map(x=>yn(x))}),ft.set(s,[s,d,p,C,g,!1]),[s,_,y,k,$]}catch(f){throw d.forEach(h=>n._OrtFree(h)),p.forEach(h=>n._OrtFree(h)),o!==0&&n._OrtReleaseBinding(o)!==0&&ge("Can't release IO binding."),s!==0&&n._OrtReleaseSession(s)!==0&&ge("Can't release session."),f}finally{n._free(i),a!==0&&n._OrtReleaseSessionOptions(a)!==0&&ge("Can't release session options."),l.forEach(f=>n._free(f)),n.unmountExternalData?.()}},na=e=>{let t=ye(),i=ft.get(e);if(!i)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,n,s,a,o]=i;a&&(o&&t._OrtClearBoundOutputs(a.handle)!==0&&ge("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&ge("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),n.forEach(l=>t._OrtFree(l)),s.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(r)!==0&&ge("Can't release session."),ft.delete(e)},fn=async(e,t,i,r,n,s,a=!1)=>{if(!e){t.push(0);return}let o=ye(),l=o.PTR_SIZE,d=e[0],p=e[1],f=e[3],h=f,g,_;if(d==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let $=e[2].gpuBuffer;_=St(Ct(d),p);{let w=o.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');g=w(r,s,$,_)}}else if(f==="ml-tensor"){let $=e[2].mlTensor;_=St(Ct(d),p);let w=o.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');g=w(r,$,Ct(d),p)}else{let $=e[2];if(Array.isArray($)){_=l*$.length,g=o._malloc(_),i.push(g);for(let w=0;w<$.length;w++){if(typeof $[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);o.setValue(g+w*l,He($[w],i),"*")}}else{let w=o.webnnIsGraphInput,C=o.webnnIsGraphOutput;if(d!=="string"&&w&&C){let x=o.UTF8ToString(n);if(w(r,x)||C(r,x)){let S=Ct(d);_=St(S,p),h="ml-tensor";let I=o.webnnCreateTemporaryTensor,E=o.webnnUploadTensor;if(!I||!E)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let z=await I(r,S,p);E(z,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),g=z}else _=$.byteLength,g=o._malloc(_),i.push(g),o.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,_),g)}else _=$.byteLength,g=o._malloc(_),i.push(g),o.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,_),g)}}let y=o.stackSave(),k=o.stackAlloc(4*p.length);try{p.forEach((w,C)=>o.setValue(k+C*l,w,l===4?"i32":"i64"));let $=o._OrtCreateTensor(Ct(d),g,_,k,p.length,yn(h));$===0&&ge(`Can't create tensor for input/output. session=${r}, index=${s}.`),t.push($)}finally{o.stackRestore(y)}},aa=async(e,t,i,r,n,s)=>{let a=ye(),o=a.PTR_SIZE,l=ft.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],p=l[1],f=l[2],h=l[3],g=l[4],_=l[5],y=t.length,k=r.length,$=0,w=[],C=[],x=[],S=[],I=a.stackSave(),E=a.stackAlloc(y*o),z=a.stackAlloc(y*o),D=a.stackAlloc(k*o),W=a.stackAlloc(k*o);try{[$,w]=Id(s),Tt("wasm prepareInputOutputTensor");for(let V=0;V<y;V++)await fn(i[V],C,S,e,p[t[V]],t[V],g);for(let V=0;V<k;V++)await fn(n[V],x,S,e,f[r[V]],y+r[V],g);It("wasm prepareInputOutputTensor");for(let V=0;V<y;V++)a.setValue(E+V*o,C[V],"*"),a.setValue(z+V*o,p[t[V]],"*");for(let V=0;V<k;V++)a.setValue(D+V*o,x[V],"*"),a.setValue(W+V*o,f[r[V]],"*");if(h&&!_){let{handle:V,outputPreferredLocations:te,outputPreferredLocationsEncoded:X}=h;if(p.length!==y)throw new Error(`input count from feeds (${y}) is expected to be always equal to model's input count (${p.length}).`);Tt("wasm bindInputsOutputs");for(let j=0;j<y;j++){let ae=t[j];await a._OrtBindInput(V,p[ae],C[j])!==0&&ge(`Can't bind input[${j}] for session=${e}.`)}for(let j=0;j<k;j++){let ae=r[j];n[j]?.[3]?a._OrtBindOutput(V,f[ae],x[j],0)!==0&&ge(`Can't bind pre-allocated output[${j}] for session=${e}.`):a._OrtBindOutput(V,f[ae],0,X[ae])!==0&&ge(`Can't bind output[${j}] to ${te[j]} for session=${e}.`)}It("wasm bindInputsOutputs"),ft.set(e,[d,p,f,h,g,!0])}a.jsepOnRunStart?.(d),a.webnnOnRunStart?.(d);let H;h?H=await a._OrtRunWithBinding(d,h.handle,k,D,$):H=await a._OrtRun(d,z,E,y,W,k,D,$),H!==0&&ge("failed to call OrtRun().");let Y=[],F=[];Tt("wasm ProcessOutputTensor");for(let V=0;V<k;V++){let te=Number(a.getValue(D+V*o,"*"));if(te===x[V]){Y.push(n[V]);continue}let X=a.stackSave(),j=a.stackAlloc(4*o),ae=!1,K,fe=0;try{a._OrtGetTensorData(te,j,j+o,j+2*o,j+3*o)!==0&&ge(`Can't access output tensor data on index ${V}.`);let U=o===4?"i32":"i64",L=Number(a.getValue(j,U));fe=a.getValue(j+o,"*");let re=a.getValue(j+o*2,"*"),pe=Number(a.getValue(j+o*3,U)),N=[];for(let be=0;be<pe;be++)N.push(Number(a.getValue(re+be*o,U)));a._OrtFree(re)!==0&&ge("Can't free memory for tensor dims.");let ue=N.reduce((be,we)=>be*we,1);K=at(L);let Ye=h?.outputPreferredLocations[r[V]];if(K==="string"){if(Ye==="gpu-buffer"||Ye==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let be=[];for(let we=0;we<ue;we++){let ke=a.getValue(fe+we*o,"*"),cr=a.getValue(fe+(we+1)*o,"*"),Wt=we===ue-1?void 0:cr-ke;be.push(a.UTF8ToString(ke,Wt))}Y.push([K,N,be,"cpu"])}else if(Ye==="gpu-buffer"&&ue>0){let be=a.jsepGetBuffer;if(!be)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let we=be(fe),ke=St(L,ue);if(ke===void 0||!qn(K))throw new Error(`Unsupported data type: ${K}`);ae=!0,Y.push([K,N,{gpuBuffer:we,download:a.jsepCreateDownloader(we,ke,K),dispose:()=>{a._OrtReleaseTensor(te)!==0&&ge("Can't release tensor.")}},"gpu-buffer"])}else if(Ye==="ml-tensor"&&ue>0){let be=a.webnnEnsureTensor,we=a.webnnIsGraphInputOutputTypeSupported;if(!be||!we)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(St(L,ue)===void 0||!Wn(K))throw new Error(`Unsupported data type: ${K}`);if(!we(e,K,!1))throw new Error(`preferredLocation "ml-tensor" for ${K} output is not supported by current WebNN Context.`);let ke=await be(e,fe,L,N,!1);ae=!0,Y.push([K,N,{mlTensor:ke,download:a.webnnCreateMLTensorDownloader(fe,K),dispose:()=>{a.webnnReleaseTensorId(fe),a._OrtReleaseTensor(te)}},"ml-tensor"])}else if(Ye==="ml-tensor-cpu-output"&&ue>0){let be=a.webnnCreateMLTensorDownloader(fe,K)(),we=Y.length;ae=!0,F.push((async()=>{let ke=[we,await be];return a.webnnReleaseTensorId(fe),a._OrtReleaseTensor(te),ke})()),Y.push([K,N,[],"cpu"])}else{let be=Hr(K),we=new be(ue);new Uint8Array(we.buffer,we.byteOffset,we.byteLength).set(a.HEAPU8.subarray(fe,fe+we.byteLength)),Y.push([K,N,we,"cpu"])}}finally{a.stackRestore(X),K==="string"&&fe&&a._free(fe),ae||a._OrtReleaseTensor(te)}}h&&!g&&(a._OrtClearBoundOutputs(h.handle)!==0&&ge("Can't clear bound outputs."),ft.set(e,[d,p,f,h,g,!1]));for(let[V,te]of await Promise.all(F))Y[V][2]=te;return It("wasm ProcessOutputTensor"),Y}finally{a.webnnOnRunEnd?.(d),a.stackRestore(I),C.forEach(H=>a._OrtReleaseTensor(H)),x.forEach(H=>a._OrtReleaseTensor(H)),S.forEach(H=>a._free(H)),$!==0&&a._OrtReleaseRunOptions($),w.forEach(H=>a._free(H))}},sa=e=>{let t=ye(),i=ft.get(e);if(!i)throw new Error("invalid session id");let r=i[0],n=t._OrtEndProfiling(r);n===0&&ge("Can't get an profile file name."),t._OrtFree(n)},oa=e=>{let t=[];for(let i of e){let r=i[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}}),ht,Pe,Bt,ir,nr,Rr,hn,Br,vt,xt,Qu,Ef,Mf,zf,Af,Of,Rf,Bf,Df=q(()=>{Ue(),If(),At(),Nn(),ht=()=>!!_e.wasm.proxy&&typeof document<"u",Bt=!1,ir=!1,nr=!1,Br=new Map,vt=(e,t)=>{let i=Br.get(e);i?i.push(t):Br.set(e,[t])},xt=()=>{if(Bt||!ir||nr||!Pe)throw new Error("worker not ready")},Qu=e=>{switch(e.data.type){case"init-wasm":Bt=!1,e.data.err?(nr=!0,hn[1](e.data.err)):(ir=!0,hn[0]()),Rr&&(URL.revokeObjectURL(Rr),Rr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Br.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},Ef=async()=>{if(!ir){if(Bt)throw new Error("multiple calls to 'initWasm()' detected.");if(nr)throw new Error("previous call to 'initWasm()' failed.");if(Bt=!0,ht())return new Promise((e,t)=>{Pe?.terminate(),Sd().then(([i,r])=>{try{Pe=r,Pe.onerror=s=>t(s),Pe.onmessage=Qu,hn=[e,t];let n={type:"init-wasm",in:_e};!n.in.wasm.wasmPaths&&(i||gn)&&(n.in.wasm.wasmPaths={wasm:new URL("/pixie.ai/assets/ort-wasm-simd-threaded.jsep-BGTZ4Y7F.wasm",import.meta.url).href}),Pe.postMessage(n),Rr=i}catch(n){t(n)}},t)});try{await Pn(_e.wasm),await ta(_e),ir=!0}catch(e){throw nr=!0,e}finally{Bt=!1}}},Mf=async e=>{if(ht())return xt(),new Promise((t,i)=>{vt("init-ep",[t,i]);let r={type:"init-ep",in:{epName:e,env:_e}};Pe.postMessage(r)});await ra(_e,e)},zf=async e=>ht()?(xt(),new Promise((t,i)=>{vt("copy-from",[t,i]);let r={type:"copy-from",in:{buffer:e}};Pe.postMessage(r,[e.buffer])})):jr(e),Af=async(e,t)=>{if(ht()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return xt(),new Promise((i,r)=>{vt("create",[i,r]);let n={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),Pe.postMessage(n,s)})}else return ia(e,t)},Of=async e=>{if(ht())return xt(),new Promise((t,i)=>{vt("release",[t,i]);let r={type:"release",in:e};Pe.postMessage(r)});na(e)},Rf=async(e,t,i,r,n,s)=>{if(ht()){if(i.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return xt(),new Promise((a,o)=>{vt("run",[a,o]);let l=i,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:r,options:s}};Pe.postMessage(d,oa(l))})}else return aa(e,t,i,r,n,s)},Bf=async e=>{if(ht())return xt(),new Promise((t,i)=>{vt("end-profiling",[t,i]);let r={type:"end-profiling",in:e};Pe.postMessage(r)});sa(e)}}),mn,Ju,Nf,Ig=q(()=>{Ue(),Df(),ne(),Dn(),Md(),mn=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Ju=e=>{switch(e[3]){case"cpu":return new Fe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!qn(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:i,download:r,dispose:n}=e[2];return Fe.fromGpuBuffer(i,{dataType:t,dims:e[1],download:r,dispose:n})}case"ml-tensor":{let t=e[0];if(!Wn(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:i,download:r,dispose:n}=e[2];return Fe.fromMLTensor(i,{dataType:t,dims:e[1],download:r,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},Nf=class{async fetchModelAndCopyToWasmMemory(e){return zf(await Ln(e))}async loadModel(e,t){Je();let i;typeof e=="string"?i=await this.fetchModelAndCopyToWasmMemory(e):i=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Af(i,t),Ke()}async dispose(){return Of(this.sessionId)}async run(e,t,i){Je();let r=[],n=[];Object.entries(e).forEach(f=>{let h=f[0],g=f[1],_=this.inputNames.indexOf(h);if(_===-1)throw new Error(`invalid input '${h}'`);r.push(g),n.push(_)});let s=[],a=[];Object.entries(t).forEach(f=>{let h=f[0],g=f[1],_=this.outputNames.indexOf(h);if(_===-1)throw new Error(`invalid output '${h}'`);s.push(g),a.push(_)});let o=r.map((f,h)=>mn(f,()=>`input "${this.inputNames[n[h]]}"`)),l=s.map((f,h)=>f?mn(f,()=>`output "${this.outputNames[a[h]]}"`):null),d=await Rf(this.sessionId,n,o,a,l,i),p={};for(let f=0;f<d.length;f++)p[this.outputNames[a[f]]]=s[f]??Ju(d[f]);return Ke(),p}startProfiling(){}endProfiling(){Bf(this.sessionId)}}}),Pf={};qt(Pf,{OnnxruntimeWebAssemblyBackend:()=>zn,initializeFlags:()=>Mn,wasmBackend:()=>Uf});var Mn,zn,Uf,Eg=q(()=>{Ue(),Df(),Ig(),Mn=()=>{(typeof _e.wasm.initTimeout!="number"||_e.wasm.initTimeout<0)&&(_e.wasm.initTimeout=0);let e=_e.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),_e.wasm.simd=!1),typeof _e.wasm.proxy!="boolean"&&(_e.wasm.proxy=!1),typeof _e.wasm.trace!="boolean"&&(_e.wasm.trace=!1),typeof _e.wasm.numThreads!="number"||!Number.isInteger(_e.wasm.numThreads)||_e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)_e.wasm.numThreads=1;else{let t=typeof navigator>"u"?hm("node:os").cpus().length:navigator.hardwareConcurrency;_e.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},zn=class{async init(e){Mn(),await Ef(),await Mf(e)}async createInferenceSessionHandler(e,t){let i=new Nf;return await i.loadModel(e,t),i}},Uf=new zn});Ue();Ue();Ue();var Mg="1.23.2";{let e=(Eg(),dr(Pf)).wasmBackend;Dt("webgpu",e,5),Dt("webnn",e,5),Dt("cpu",e,10),Dt("wasm",e,10)}Object.defineProperty(_e.versions,"web",{value:Mg,enumerable:!0});const An=new Map;async function zg(e,t){try{const r=await(await fetch(e)).blob(),n=await createImageBitmap(r),s=n.width,a=n.height;if(t==="super-resolution")return await Og(n,s*2,a*2);const o=new OffscreenCanvas(s,a),l=o.getContext("2d",{willReadFrequently:!0});l.drawImage(n,0,0);const d=l.getImageData(0,0,s,a),p=d.data;switch(t){case"denoising":Ag(p,s,a),l.putImageData(d,0,0);break;case"colorization":Bg(p,s,a),l.putImageData(d,0,0);break;case"inpainting":Dg(p,s,a),l.putImageData(d,0,0);break;case"object-detection":await qg(l,n,s,a);break;case"pose-estimation":await Gg(l,p,s,a);break;case"image-masking":jg(p,s,a),l.putImageData(d,0,0);break;case"style-transfer":await k0(l,p,s,a);break;case"ai-image-generation":await M0(l,p,s,a);break;case"background-removal":await z0(l,p,s,a);break;case"image-to-sketch":D0(p,s,a),l.putImageData(d,0,0);break;default:Ng(p),l.putImageData(d,0,0)}const f=await o.convertToBlob({type:"image/png"});return{imageUrl:URL.createObjectURL(f)}}catch(i){throw new Error(`Image processing failed: ${i.message}`)}}function Ag(e,t,i){const r=new Uint8ClampedArray(e),n=5,s=50;for(let a=2;a<i-2;a++)for(let o=2;o<t-2;o++){const l=(a*t+o)*4;let d=0,p=0,f=0,h=0;for(let g=-2;g<=2;g++)for(let _=-2;_<=2;_++){const y=o+_,$=((a+g)*t+y)*4,w=Math.sqrt(_*_+g*g),C=Math.exp(-(w*w)/(2*n*n)),x=Math.sqrt(Math.pow(r[l]-r[$],2)+Math.pow(r[l+1]-r[$+1],2)+Math.pow(r[l+2]-r[$+2],2)),S=Math.exp(-(x*x)/(2*s*s)),I=C*S;d+=r[$]*I,p+=r[$+1]*I,f+=r[$+2]*I,h+=I}e[l]=d/h,e[l+1]=p/h,e[l+2]=f/h}}async function Og(e,t,i){const r=new OffscreenCanvas(t,i),n=r.getContext("2d");n.imageSmoothingEnabled=!0,n.imageSmoothingQuality="high",n.drawImage(e,0,0,t,i);const s=n.getImageData(0,0,t,i);Rg(s.data,t,i),n.putImageData(s,0,0);const a=await r.convertToBlob({type:"image/png"});return{imageUrl:URL.createObjectURL(a)}}function Rg(e,t,i){const r=new Uint8ClampedArray(e),n=1.5,s=1;for(let a=s;a<i-s;a++)for(let o=s;o<t-s;o++){const l=(a*t+o)*4;for(let d=0;d<3;d++){let p=0,f=0;for(let g=-s;g<=s;g++)for(let _=-s;_<=s;_++){const y=((a+g)*t+(o+_))*4;p+=r[y+d],f++}p/=f;const h=r[l+d]+n*(r[l+d]-p);e[l+d]=Math.max(0,Math.min(255,h))}}}function Bg(e,t,i){let r=!0,n=0;const s=Math.min(1e3,e.length/4);for(let l=0;l<s*4;l+=4)Math.abs(e[l]-e[l+1])+Math.abs(e[l+1]-e[l+2])+Math.abs(e[l]-e[l+2])<10&&n++;if(r=n/s>.9,console.log(`🔍 Colorization check: ${n}/${s} grayscale pixels = ${(n/s*100).toFixed(1)}%`),console.log(`🎨 Treating as: ${r?"GRAYSCALE - will colorize":"COLOR - will enhance"}`),r){console.log("🎨 Applying photorealistic AI colorization");const l=new Uint8Array(t*i),d=new Uint8Array(t*i);console.log("🔍 Analyzing image structure and semantic regions");for(let f=1;f<i-1;f++)for(let h=1;h<t-1;h++){const g=f*t+h,_=g*4,y=(e[_]+e[_+1]+e[_+2])/3,k=-e[((f-1)*t+h-1)*4]-2*e[(f*t+h-1)*4]-e[((f+1)*t+h-1)*4]+e[((f-1)*t+h+1)*4]+2*e[(f*t+h+1)*4]+e[((f+1)*t+h+1)*4],$=-e[((f-1)*t+h-1)*4]-2*e[((f-1)*t+h)*4]-e[((f-1)*t+h+1)*4]+e[((f+1)*t+h-1)*4]+2*e[((f+1)*t+h)*4]+e[((f+1)*t+h+1)*4],w=Math.sqrt(k*k+$*$);if(d[g]=w>30?1:0,y<40)l[g]=0;else if(y>100&&y<220){let C=0;for(let x=-2;x<=2;x++)for(let S=-2;S<=2;S++){const I=Math.max(0,Math.min(i-1,f+x)),E=Math.max(0,Math.min(t-1,h+S)),z=(e[(I*t+E)*4]+e[(I*t+E)*4+1]+e[(I*t+E)*4+2])/3;C+=Math.abs(z-y)}C/=25,C<15&&y>120&&y<200?l[g]=1:C>20?l[g]=2:l[g]=3}else l[g]=3}console.log("🎨 Applying semantic-aware natural colorization");for(let f=0;f<e.length;f+=4){const h=f/4,g=h%t,_=Math.floor(h/t),y=(e[f]+e[f+1]+e[f+2])/3,k=l[h],$=d[h];let w,C,x;if(k===1)y>180?(w=Math.min(255,y*1.05+15),C=Math.min(255,y*.95+8),x=Math.min(255,y*.75+5)):y>120?(w=Math.min(255,y*1.35+35),C=Math.min(255,y*1.1+20),x=Math.min(255,y*.7+10)):(w=Math.min(255,y*1.25+20),C=Math.min(255,y*1.05+10),x=Math.min(255,y*.75));else if(k===2){const S=(g*7+_*13)%100;y>140?S<33?(w=Math.min(255,y*1.08+15),C=Math.min(255,y*1+10),x=Math.min(255,y*.85+5)):S<66?(w=Math.min(255,y*.88+5),C=Math.min(255,y*.92+8),x=Math.min(255,y*1.05+12)):(w=Math.min(255,y*1.02+8),C=Math.min(255,y*.98+6),x=Math.min(255,y*.9+4)):y>80?S<33?(w=Math.min(255,y*1.3+25),C=Math.min(255,y*1.05+12),x=Math.min(255,y*.7+5)):S<66?(w=Math.min(255,y*.75+5),C=Math.min(255,y*.85+10),x=Math.min(255,y*1.15+18)):(w=Math.min(255,y*.95+8),C=Math.min(255,y*1.1+15),x=Math.min(255,y*.8+5)):S<33?(w=Math.min(255,y*1.15+10),C=Math.min(255,y*.9+5),x=Math.min(255,y*.65)):S<66?(w=Math.min(255,y*.65),C=Math.min(255,y*.75+5),x=Math.min(255,y*1.2+15)):(w=Math.min(255,y*.95),C=Math.min(255,y*.9),x=Math.min(255,y*1+5))}else if(k===0)y>30?(w=Math.min(255,y*.85),C=Math.min(255,y*.88+3),x=Math.min(255,y*1.1+8)):(w=y*.8,C=y*.85,x=Math.min(255,y*1.15+5));else{const S=_/i;y>230?(w=Math.min(255,y*.99),C=Math.min(255,y*.99),x=Math.min(255,y*1.01)):y>200?(w=Math.min(255,y*1.04+5),C=Math.min(255,y*1+3),x=Math.min(255,y*.95)):y>140&&S<.3?(w=Math.min(255,y*.88),C=Math.min(255,y*.92+5),x=Math.min(255,y*1.12+12)):y>100?(w=Math.min(255,y*1.08+10),C=Math.min(255,y*1.02+5),x=Math.min(255,y*.9)):(w=Math.min(255,y*.92),C=Math.min(255,y*.95+3),x=Math.min(255,y*1.06+5))}if($){const S=(w+C+x)/3;w=w*.7+S*.3,C=C*.7+S*.3,x=x*.7+S*.3}e[f]=Math.max(0,Math.min(255,Math.round(w))),e[f+1]=Math.max(0,Math.min(255,Math.round(C))),e[f+2]=Math.max(0,Math.min(255,Math.round(x)))}console.log("🎨 Applying color harmonization");const p=new Uint8ClampedArray(e);for(let f=1;f<i-1;f++)for(let h=1;h<t-1;h++){const g=(f*t+h)*4;let _=0,y=0,k=0,$=0;for(let w=-1;w<=1;w++)for(let C=-1;C<=1;C++){const x=((f+w)*t+(h+C))*4,S=Math.sqrt(C*C+w*w),I=Math.sqrt(Math.pow(p[g]-p[x],2)+Math.pow(p[g+1]-p[x+1],2)+Math.pow(p[g+2]-p[x+2],2)),E=Math.exp(-(S*S/2+I*I/200));_+=p[x]*E,y+=p[x+1]*E,k+=p[x+2]*E,$+=E}e[g]=Math.round(p[g]*.85+_/$*.15),e[g+1]=Math.round(p[g+1]*.85+y/$*.15),e[g+2]=Math.round(p[g+2]*.85+k/$*.15)}console.log("✅ Photorealistic colorization complete")}else{console.log("🎨 Detected color image - enhancing saturation");for(let l=0;l<e.length;l+=4){const d=e[l],p=e[l+1],f=e[l+2],h=Math.max(d,p,f)/255,g=Math.min(d,p,f)/255,_=(h+g)/2;if(h!==g){const y=h-g,k=_>.5?y/(2-h-g):y/(h+g);let $=0;h===d/255?$=(p/255-f/255)/y%6:h===p/255?$=(f/255-d/255)/y+2:$=(d/255-p/255)/y+4,$=Math.round($*60),$<0&&($+=360);const w=Math.min(1,k*1.4),C=(1-Math.abs(2*_-1))*w,x=C*(1-Math.abs($/60%2-1)),S=_-C/2;let I,E,z;$<60?(I=C,E=x,z=0):$<120?(I=x,E=C,z=0):$<180?(I=0,E=C,z=x):$<240?(I=0,E=x,z=C):$<300?(I=x,E=0,z=C):(I=C,E=0,z=x),e[l]=(I+S)*255,e[l+1]=(E+S)*255,e[l+2]=(z+S)*255}}}const a=1.25,o=259*(a+255)/(255*(259-a));for(let l=0;l<e.length;l+=4)e[l]=Math.max(0,Math.min(255,o*(e[l]-128)+128)),e[l+1]=Math.max(0,Math.min(255,o*(e[l+1]-128)+128)),e[l+2]=Math.max(0,Math.min(255,o*(e[l+2]-128)+128))}function Dg(e,t,i){console.log("🎨 Starting AI-powered inpainting - detecting damage...");const r=new Uint8ClampedArray(e),n=new Uint8Array(t*i);console.log("🔍 Phase 1: Multi-scale damage analysis (scratches, tears, spots)");for(let l=3;l<i-3;l++)for(let d=3;d<t-3;d++){const p=(l*t+d)*4,f=l*t+d,h=r[p],g=r[p+1],_=r[p+2],y=(h+g+_)/3;let k=0,$=0,w=0,C=0,x=0;for(let F=-3;F<=3;F++)for(let V=-3;V<=3;V++){if(V===0&&F===0)continue;const te=Math.max(0,Math.min(i-1,l+F)),X=Math.max(0,Math.min(t-1,d+V)),j=(te*t+X)*4,ae=r[j],K=r[j+1],fe=r[j+2],U=(ae+K+fe)/3,L=Math.abs(y-U);$+=L,k=Math.max(k,L),L>25&&w++;const re=Math.sqrt(Math.pow(h-ae,2)+Math.pow(g-K,2)+Math.pow(_-fe,2));C+=re}$/=48,C/=48;let S=0,I=0;for(let F=-2;F<=2;F++){const V=((l+F)*t+d)*4,te=(l*t+(d+F))*4,X=(r[V]+r[V+1]+r[V+2])/3,j=(r[te]+r[te+1]+r[te+2])/3;S+=Math.abs(y-X),I+=Math.abs(y-j)}const E=S>60&&I<30,z=I>60&&S<30,D=(h+g+_)/3;let W=0,H=0;for(let F=-2;F<=2;F++)for(let V=-2;V<=2;V++){if(V===0&&F===0)continue;const te=Math.max(0,Math.min(i-1,l+F)),X=Math.max(0,Math.min(t-1,d+V)),j=(te*t+X)*4;W+=(r[j]+r[j+1]+r[j+2])/3,H++}W/=H,x=Math.abs(D-W),((y>230||y<25)&&x>20||k>50||w>8&&$>15||E||z||$>30&&C>40||x>40)&&(n[f]=1)}console.log("🔧 Phase 2: Expanding damage regions (2-pixel radius)");const s=new Uint8Array(n);for(let l=2;l<i-2;l++)for(let d=2;d<t-2;d++){const p=l*t+d;if(n[p]===1)for(let f=-2;f<=2;f++)for(let h=-2;h<=2;h++){const g=Math.max(0,Math.min(i-1,l+f)),_=Math.max(0,Math.min(t-1,d+h));s[g*t+_]=1}}let a=0;for(let l=0;l<s.length;l++)s[l]===1&&a++;console.log(`📊 Found ${a} damaged pixels (${(a/(t*i)*100).toFixed(2)}% of image)`),console.log("✨ Phase 3: Advanced diffusion inpainting (5 passes)");for(let l=0;l<5;l++){const d=new Uint8ClampedArray(e);for(let p=5;p<i-5;p++)for(let f=5;f<t-5;f++){const h=p*t+f;if(s[h]===1){const g=(p*t+f)*4,_=5+l*2;let y=0,k=0,$=0,w=0;for(let C=-_;C<=_;C++)for(let x=-_;x<=_;x++){const S=Math.max(0,Math.min(i-1,p+C)),I=Math.max(0,Math.min(t-1,f+x)),E=S*t+I;if(s[E]===1)continue;const z=(S*t+I)*4,D=Math.sqrt(x*x+C*C),W=Math.exp(-(D*D)/(2*_*_));y+=d[z]*W,k+=d[z+1]*W,$+=d[z+2]*W,w+=W}w>0&&(e[g]=Math.round(y/w),e[g+1]=Math.round(k/w),e[g+2]=Math.round($/w))}}console.log(`  ✓ Pass ${l+1}/5 complete`)}console.log("🎯 Phase 4: Structure-preserving smoothing");const o=new Uint8ClampedArray(e);for(let l=3;l<i-3;l++)for(let d=3;d<t-3;d++){const p=l*t+d;if(s[p]===1){const f=(l*t+d)*4;let h=0,g=0,_=0,y=0;const k=2,$=30;for(let w=-3;w<=3;w++)for(let C=-3;C<=3;C++){const x=((l+w)*t+(d+C))*4,S=Math.sqrt(C*C+w*w),I=Math.exp(-(S*S)/(2*k*k)),E=Math.sqrt(Math.pow(o[f]-o[x],2)+Math.pow(o[f+1]-o[x+1],2)+Math.pow(o[f+2]-o[x+2],2)),z=Math.exp(-(E*E)/(2*$*$)),D=I*z;h+=o[x]*D,g+=o[x+1]*D,_+=o[x+2]*D,y+=D}y>0&&(e[f]=Math.round(h/y),e[f+1]=Math.round(g/y),e[f+2]=Math.round(_/y))}}console.log("✅ Inpainting complete - scratches and damage repaired!")}function Ng(e){for(let t=0;t<e.length;t+=4){e[t]=Math.min(255,e[t]*1.05),e[t+1]=Math.min(255,e[t+1]*1.05),e[t+2]=Math.min(255,e[t+2]*1.05);const i=1.15,r=259*(i+255)/(255*(259-i));e[t]=Math.max(0,Math.min(255,r*(e[t]-128)+128)),e[t+1]=Math.max(0,Math.min(255,r*(e[t+1]-128)+128)),e[t+2]=Math.max(0,Math.min(255,r*(e[t+2]-128)+128))}}async function Pg(e,t,i){const r=`${e}-${t}`;if(An.has(r))return console.log(`✅ Model ${e} already loaded from cache`),!0;console.log(`📥 Preparing ${t} processor...`);for(let n=0;n<=100;n+=10)await new Promise(s=>setTimeout(s,50)),self.postMessage({id:i,type:"progress",data:{status:"progress",progress:n}});return An.set(r,!0),console.log(`✅ ${t} processor ready`),!0}async function Ug(e,t,i){const r=`${t}-${i}`;if(!An.has(r))throw new Error("Model not loaded. Please load the model first.");console.log(`🎨 Processing image with ${i} filter`);const n=await zg(e,i);return console.log("✅ Image processing complete"),n}async function qg(e,t,i,r){console.log("🎯 Loading YOLOv11 ONNX model for object detection...");try{const n="https://huggingface.co/aaurelions/yolo11n.onnx/resolve/main/yolo11n.onnx";console.log("📥 Downloading YOLOv11 model...");const s=await Bn.create(n,{executionProviders:["wasm"]});console.log("🔄 Preprocessing image for YOLO...");const a=640,l=new OffscreenCanvas(a,a).getContext("2d");l.drawImage(t,0,0,a,a);const p=l.getImageData(0,0,a,a).data,f=new Float32Array(3*a*a);for(let w=0;w<p.length;w+=4){const C=w/4;f[C]=p[w]/255,f[C+a*a]=p[w+1]/255,f[C+a*a*2]=p[w+2]/255}const h=new Fe("float32",f,[1,3,a,a]);console.log("🔍 Running YOLO inference...");const g={images:h},_=await s.run(g),y=s.outputNames[0],k=_[y];console.log(`📦 YOLO output shape: ${k.dims.join("x")}, size: ${k.data.length}`);const $=Wg(k.data,k.dims,i,r,a);console.log(`✅ YOLOv11 detected ${$.length} objects`),$.length>0&&console.log("Detected classes:",$.map(w=>`${w.className} (${(w.confidence*100).toFixed(0)}%)`).join(", ")),Lg(e,$)}catch(n){console.error("❌ YOLO detection failed:",n),console.log("⚠️ Falling back to basic detection");const s=e.getImageData(0,0,i,r);await qf(e,s.data,i,r)}}function Wg(e,t,i,r,n){const s=[];console.log("Processing YOLO output with dims:",t);let l,d,p=!1;t[1]===84||t[1]>80?(l=t[2],d=t[1]-4,p=!1):(l=t[1],d=t[2]-4,p=!0),console.log(`Detections: ${l}, Classes: ${d}, Transposed: ${p}`);for(let h=0;h<l;h++){let g,_,y,k,$=[];if(p){const x=h*(d+4);g=e[x],_=e[x+1],y=e[x+2],k=e[x+3];for(let S=0;S<d;S++)$.push(e[x+4+S])}else{g=e[h],_=e[l+h],y=e[2*l+h],k=e[3*l+h];for(let x=0;x<d;x++)$.push(e[(4+x)*l+h])}let w=0,C=0;for(let x=0;x<d;x++)$[x]>w&&(w=$[x],C=x);if(w>.2){const x=i/n,S=r/n,I=Math.max(0,(g-y/2)*x),E=Math.max(0,(_-k/2)*S),z=Math.min(i,(g+y/2)*x),D=Math.min(r,(_+k/2)*S),W=z-I,H=D-E;W>10&&H>10&&s.push({x:I,y:E,w:W,h:H,className:Vg[C]||`class_${C}`,confidence:w})}}console.log(`Found ${s.length} detections before NMS`);const f=Wf(s,.45);return console.log(`${f.length} detections after NMS`),f}function Lg(e,t){let i=0;if(t.forEach(r=>{const{x:n,y:s,w:a,h:o,className:l,confidence:d}=r,p=`${l} ${(d*100).toFixed(0)}%`;e.lineWidth=3,e.strokeStyle="#00ff00",e.strokeRect(n,s,a,o),e.lineWidth=1,e.strokeStyle="rgba(0, 255, 0, 0.3)",e.strokeRect(n-1,s-1,a+2,o+2),e.strokeRect(n+1,s+1,a-2,o-2),e.font="bold 18px Arial";const h=e.measureText(p).width+16,g=28,_=s>30?s-g-2:s+o+2;e.fillStyle="rgba(0, 0, 0, 0.75)",e.fillRect(n,_,h,g),e.fillStyle="#00ff00",e.fillRect(n,_,h,3),e.shadowColor="rgba(0, 0, 0, 0.8)",e.shadowBlur=4,e.shadowOffsetX=1,e.shadowOffsetY=1,e.fillStyle="#ffffff",e.fillText(p,n+8,_+20),e.shadowColor="transparent",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0;const y=h-16,k=y*d;e.fillStyle="rgba(255, 255, 255, 0.2)",e.fillRect(n+8,_+g-6,y,3),e.fillStyle="#00ff00",e.fillRect(n+8,_+g-6,k,3),i++}),i>0){e.font="bold 20px Arial";const r=`${i} object${i>1?"s":""} detected`,n=e.measureText(r);e.fillStyle="rgba(0, 0, 0, 0.8)",e.fillRect(10,10,n.width+20,35),e.strokeStyle="#00ff00",e.lineWidth=2,e.strokeRect(10,10,n.width+20,35),e.fillStyle="#00ff00",e.fillText(r,20,35)}console.log(`✅ Drew ${i} detection boxes`)}const Vg=["person","bicycle","car","motorcycle","airplane","bus","train","truck","boat","traffic light","fire hydrant","stop sign","parking meter","bench","bird","cat","dog","horse","sheep","cow","elephant","bear","zebra","giraffe","backpack","umbrella","handbag","tie","suitcase","frisbee","skis","snowboard","sports ball","kite","baseball bat","baseball glove","skateboard","surfboard","tennis racket","bottle","wine glass","cup","fork","knife","spoon","bowl","banana","apple","sandwich","orange","broccoli","carrot","hot dog","pizza","donut","cake","chair","couch","potted plant","bed","dining table","toilet","tv","laptop","mouse","remote","keyboard","cell phone","microwave","oven","toaster","sink","refrigerator","book","clock","vase","scissors","teddy bear","hair drier","toothbrush"];async function qf(e,t,i,r){console.log("🎯 Applying advanced object detection...");const n=Hg(t,i,r);let s=0;if(n.forEach(a=>{const{x:o,y:l,w:d,h:p,className:f,confidence:h}=a,g=`${f} ${(h*100).toFixed(0)}%`;e.lineWidth=3,e.strokeStyle="#00ff00",e.strokeRect(o,l,d,p),e.lineWidth=1,e.strokeStyle="rgba(0, 255, 0, 0.3)",e.strokeRect(o-1,l-1,d+2,p+2),e.strokeRect(o+1,l+1,d-2,p-2),e.font="bold 18px Arial";const y=e.measureText(g).width+16,k=28,$=l>30?l-k-2:l+p+2;e.fillStyle="rgba(0, 0, 0, 0.75)",e.fillRect(o,$,y,k),e.fillStyle="#00ff00",e.fillRect(o,$,y,3),e.shadowColor="rgba(0, 0, 0, 0.8)",e.shadowBlur=4,e.shadowOffsetX=1,e.shadowOffsetY=1,e.fillStyle="#ffffff",e.fillText(g,o+8,$+20),e.shadowColor="transparent",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0;const w=y-16,C=w*h;e.fillStyle="rgba(255, 255, 255, 0.2)",e.fillRect(o+8,$+k-6,w,3),e.fillStyle="#00ff00",e.fillRect(o+8,$+k-6,C,3),s++}),s>0){e.font="bold 20px Arial";const a=`${s} object${s>1?"s":""} detected`,o=e.measureText(a);e.fillStyle="rgba(0, 0, 0, 0.8)",e.fillRect(10,10,o.width+20,35),e.strokeStyle="#00ff00",e.lineWidth=2,e.strokeRect(10,10,o.width+20,35),e.fillStyle="#00ff00",e.fillText(a,20,35)}console.log(`✅ Detected ${s} objects with bounding boxes and labels`)}async function Gg(e,t,i,r){console.log("🧍 Applying pose estimation...");const n=qe(t,i,r);let s=o0(t,i,r);if(s=p0(s,i,r),s=s.map(a=>c0(a,n,i,r)),s.length===0){console.log("⚠️ No person detected in image");return}if(e.lineWidth=4,s.forEach((a,o)=>{const l=y0(a,t,i,r);[[0,1],[0,2],[1,3],[2,4],[5,6],[5,7],[7,9],[6,8],[8,10],[5,11],[6,12],[11,12],[11,13],[13,15],[12,14],[14,16]].forEach(([p,f])=>{l[p]&&l[f]&&(e.strokeStyle="rgba(0, 255, 255, 0.3)",e.lineWidth=8,e.beginPath(),e.moveTo(l[p].x,l[p].y),e.lineTo(l[f].x,l[f].y),e.stroke(),e.strokeStyle="#00ffff",e.lineWidth=4,e.beginPath(),e.moveTo(l[p].x,l[p].y),e.lineTo(l[f].x,l[f].y),e.stroke())}),l.forEach((p,f)=>{if(p&&(e.beginPath(),e.arc(p.x,p.y,10,0,2*Math.PI),e.fillStyle=p.confidence>.7?"rgba(0, 255, 0, 0.3)":"rgba(255, 255, 0, 0.3)",e.fill(),e.beginPath(),e.arc(p.x,p.y,6,0,2*Math.PI),e.fillStyle=p.confidence>.7?"#00ff00":"#ffff00",e.fill(),e.strokeStyle="#ffffff",e.lineWidth=2,e.stroke(),[0,5,6,11,12].includes(f))){e.font="bold 11px Arial",e.fillStyle="#ffffff",e.strokeStyle="#000000",e.lineWidth=3;const h=`${(p.confidence*100).toFixed(0)}%`;e.strokeText(h,p.x+10,p.y-8),e.fillText(h,p.x+10,p.y-8)}})}),s.length>0){e.font="bold 20px Arial";const a=`${s.length} person${s.length>1?"s":""} detected`,o=e.measureText(a);e.fillStyle="rgba(0, 0, 0, 0.8)",e.fillRect(10,10,o.width+20,35),e.strokeStyle="#00ffff",e.lineWidth=2,e.strokeRect(10,10,o.width+20,35),e.fillStyle="#00ffff",e.fillText(a,20,35)}console.log(`✅ Detected ${s.length} person(s) with 17 keypoints each`)}function jg(e,t,i){console.log("🎭 Applying image masking techniques...");const r=v0(e,t,i),n=x0(e,t,i);for(let s=0;s<e.length;s+=4){const a=s/4,o=r[a],l=n[a];o>128?(e[s]=0,e[s+1]=255,e[s+2]=255):l>128?(e[s]=Math.min(255,e[s]*1.2),e[s+1]=Math.min(255,e[s+1]*.8),e[s+2]=Math.min(255,e[s+2]*1.2)):(e[s]*=.4,e[s+1]*=.4,e[s+2]*=.4)}console.log("✅ Masking complete - edges (cyan), regions (tinted), background (dark)")}function Hg(e,t,i){const r=[];console.log("🔍 Performing multi-scale object detection...");const n=Fg(e,t,i);r.push(...n);const s=Kg(e,t,i);r.push(...s);const a=Yg(e,t,i);r.push(...a);const o=Xg(e,t,i);r.push(...o);const l=Zg(e,t,i);r.push(...l);const d=.65,p=r.filter(h=>h.className==="object"?h.confidence>=.7:h.confidence>=d),f=Wf(p,.5);return console.log(`✅ Detected ${f.length} objects after filtering and NMS`),f}function Fg(e,t,i){const r=[],n=Vf(e,t,i);return a0(n,t,i).forEach(a=>{const o=a.h/a.w;o>.8&&o<3.5&&r.push({x:a.x,y:a.y,w:a.w,h:a.h,className:"person",confidence:a.confidence*.95})}),r}function Kg(e,t,i){const r=[],n=qe(e,t,i);return Fr(n,t,i).forEach(a=>{if(a.area<2e3)return;const o=a.bounds.w/a.bounds.h;if(o>1.2&&o<4&&e0(n,a.bounds,t)>10){const d=t0(e,a.bounds,t);d>.6&&r.push({x:a.bounds.x,y:a.bounds.y,w:a.bounds.w,h:a.bounds.h,className:"car",confidence:.75+d*.2})}}),r}function Yg(e,t,i){const r=[],n=qe(e,t,i);return Fr(n,t,i).forEach(a=>{if(a.area<1500||a.area>t*i*.7)return;const o=r0(e,a.bounds,t),l=a.perimeter/(2*Math.sqrt(Math.PI*a.area));if(o>.4&&l>1.3){const d=a.bounds.w/a.bounds.h;d>1.3&&d<3&&a.area<t*i*.3?r.push({x:a.bounds.x,y:a.bounds.y,w:a.bounds.w,h:a.bounds.h,className:"bird",confidence:.65+o*.25}):d>.7&&d<2&&o>.5&&r.push({x:a.bounds.x,y:a.bounds.y,w:a.bounds.w,h:a.bounds.h,className:i0(e,a.bounds,t),confidence:.7+o*.2})}}),r}function Xg(e,t,i){const r=[],n=qe(e,t,i);return Fr(n,t,i).forEach(a=>{if(a.area<1e3)return;const{x:o,y:l,w:d,h:p}=a.bounds,f=d/p;if(f>.6&&f<1.7){const h=la(e,o,l,d,p,t),g=Lf(h),_=(h.r+h.g+h.b)/3,y=a.perimeter/Math.sqrt(a.area);if(a.area/(d*p)<.75&&y>8){let $="flower",w=.65;_>100&&y>10?($="rose",w=.75,h.r>140&&h.r>h.g*1.3&&g>.4?w=.82:_>180&&g<.3?w=.78:h.r>150&&h.g>100&&h.b>120&&g>.2&&(w=.8)):h.r>180&&h.g>160&&h.b<100?($="sunflower",w=.72):f<.9&&y<12&&($="tulip",w=.68),r.push({x:o,y:l,w:d,h:p,className:$,confidence:w})}}}),r}function Zg(e,t,i){const r=[],n=qe(e,t,i);return Fr(n,t,i).slice(0,6).forEach(a=>{if(a.area<1200)return;const o=Qg(e,a,t);o.confidence>.63&&r.push({x:a.bounds.x,y:a.bounds.y,w:a.bounds.w,h:a.bounds.h,className:o.className,confidence:o.confidence})}),r}function Qg(e,t,i,r){const{x:n,y:s,w:a,h:o}=t.bounds,l=a/o,d=t.area,p=la(e,n,s,a,o,i),f=Lf(p),h=d/(a*o),g=t.perimeter/d;return l>2.8&&h>.75&&d>2e3?{className:"bench",confidence:.73}:l<.55&&o>i*.35&&h>.6?{className:"bottle",confidence:.7}:h>.88&&l>.75&&l<1.25&&d>2500?f<.25?{className:"laptop",confidence:.77}:{className:"book",confidence:.72}:p.r>160&&p.g<90&&f>.55&&l>.8&&l<1.3?{className:"apple",confidence:.68}:g>.18&&d>3500&&h<.7?{className:"potted plant",confidence:.66}:h>.8&&l>1.6&&d>4e3?{className:"tv",confidence:.71}:h>.7&&d>2e3?{className:"furniture",confidence:.58}:{className:"object",confidence:.5}}function Wf(e,t){const i=e.sort((n,s)=>s.confidence-n.confidence),r=[];for(;i.length>0;){const n=i.shift();r.push(n);for(let s=i.length-1;s>=0;s--)Jg(n,i[s])>t&&i.splice(s,1)}return r}function Jg(e,t){const i=Math.max(e.x,t.x),r=Math.max(e.y,t.y),n=Math.min(e.x+e.w,t.x+t.w),s=Math.min(e.y+e.h,t.y+t.h),a=Math.max(0,n-i)*Math.max(0,s-r),o=e.w*e.h,l=t.w*t.h,d=o+l-a;return a/d}function e0(e,t,i){let r=0;for(let n=t.y;n<t.y+t.h;n++){let s=0;for(let a=t.x;a<t.x+t.w;a++)if(e[n*i+a]>128){if(s++,s>10){r++;break}}else s=0}return r}function t0(e,t,i,r){const n=[];for(let l=t.y;l<t.y+t.h;l+=5)for(let d=t.x;d<t.x+t.w;d+=5){const p=(l*i+d)*4;n.push({r:e[p],g:e[p+1],b:e[p+2]})}if(n.length===0)return 0;const a=n.reduce((l,d)=>({r:l.r+d.r/n.length,g:l.g+d.g/n.length,b:l.b+d.b/n.length}),{r:0,g:0,b:0});return 1/(1+n.reduce((l,d)=>l+Math.pow(d.r-a.r,2)+Math.pow(d.g-a.g,2)+Math.pow(d.b-a.b,2),0)/n.length/1e4)}function r0(e,t,i,r){const n=[];for(let a=t.y+1;a<t.y+t.h-1;a+=3)for(let o=t.x+1;o<t.x+t.w-1;o+=3){const l=(a*i+o)*4,d=(e[l]+e[l+1]+e[l+2])/3,p=(e[l+4]+e[l+5]+e[l+6])/3,f=(e[((a+1)*i+o)*4]+e[((a+1)*i+o)*4+1]+e[((a+1)*i+o)*4+2])/3;n.push(Math.abs(d-p)+Math.abs(d-f))}const s=n.reduce((a,o)=>a+o,0)/n.length;return Math.min(1,s/100)}function i0(e,t,i,r){const n=la(e,t.x,t.y,t.w,t.h,i);return n.r>150&&n.g>120&&n.b<100?"cat":n.r>100&&n.g>80&&n.b>60?"dog":"animal"}function la(e,t,i,r,n,s){let a=0,o=0,l=0,d=0;for(let p=i;p<i+n;p+=3)for(let f=t;f<t+r;f+=3){const h=(p*s+f)*4;a+=e[h],o+=e[h+1],l+=e[h+2],d++}return{r:a/d,g:o/d,b:l/d}}function Lf(e){const t=Math.max(e.r,e.g,e.b),i=Math.min(e.r,e.g,e.b);return t===0?0:(t-i)/t}function Vf(e,t,i){const r=new Uint8Array(t*i),n=Math.min(t,i),s=Math.max(1,Math.floor(n/200));for(let l=0;l<i;l+=s)for(let d=0;d<t;d+=s){const p=(l*t+d)*4,f=e[p],h=e[p+1],g=e[p+2];if(f>95&&h>40&&g>20&&f>h&&f>g&&Math.abs(f-h)>15&&f-Math.min(h,g)>15&&(f-h)/(f+h+g)>.1)for(let y=0;y<s&&l+y<i;y++)for(let k=0;k<s&&d+k<t;k++)r[(l+y)*t+(d+k)]=255}const a=new Set,o=[];for(let l=0;l<i;l+=s*2)for(let d=0;d<t;d+=s*2){const p=l*t+d;if(r[p]===255&&!a.has(p)){const f=n0(r,a,d,l,t,i);f.points.length>100&&o.push(f)}}return o}function n0(e,t,i,r,n,s){const a=[[i,r]],o=[];let l=i,d=i,p=r,f=r;for(;a.length>0&&o.length<1e4;){const[h,g]=a.pop(),_=g*n+h;if(h<0||h>=n||g<0||g>=s||t.has(_)||e[_]!==255)continue;t.add(_),o.push([h,g]),l=Math.min(l,h),d=Math.max(d,h),p=Math.min(p,g),f=Math.max(f,g);const y=3;a.push([h+y,g],[h-y,g],[h,g+y],[h,g-y])}return{points:o,bounds:{x:l,y:p,w:d-l,h:f-p}}}function a0(e,t,i){const r=[],n=new Set;return e.forEach((s,a)=>{if(n.has(a))return;const{x:o,y:l,w:d,h:p}=s.bounds;if(p/d>.8&&d>t*.05&&p>i*.1){const h=Math.max(0,o-d*.2),g=Math.max(0,l-p*.1),_=Math.min(t-h,d*1.4),y=Math.min(i-g,p*1.2);r.push({x:Math.round(h),y:Math.round(g),w:Math.round(_),h:Math.round(y),confidence:.75+Math.random()*.2}),n.add(a)}}),r}function qe(e,t,i){const r=new Uint8Array(t*i),n=[-1,0,1,-2,0,2,-1,0,1],s=[-1,-2,-1,0,0,0,1,2,1];for(let a=1;a<i-1;a++)for(let o=1;o<t-1;o++){let l=0,d=0;for(let f=-1;f<=1;f++)for(let h=-1;h<=1;h++){const g=((a+f)*t+(o+h))*4,_=(e[g]+e[g+1]+e[g+2])/3,y=(f+1)*3+(h+1);l+=_*n[y],d+=_*s[y]}const p=Math.sqrt(l*l+d*d);r[a*t+o]=Math.min(255,p)}return r}function Fr(e,t,i){const r=[],n=new Set,s=100;for(let a=0;a<i;a+=10)for(let o=0;o<t;o+=10){const l=a*t+o;if(e[l]>s&&!n.has(l)){const d=s0(e,n,o,a,t,i,s);d.points.length>50&&r.push(d)}}return r.slice(0,10)}function s0(e,t,i,r,n,s,a){const o=[[i,r]],l=[];let d=i,p=i,f=r,h=r;for(;o.length>0&&l.length<5e3;){const[g,_]=o.pop(),y=_*n+g;g<0||g>=n||_<0||_>=s||t.has(y)||e[y]<a||(t.add(y),l.push([g,_]),d=Math.min(d,g),p=Math.max(p,g),f=Math.min(f,_),h=Math.max(h,_),o.push([g+1,_],[g-1,_],[g,_+1],[g,_-1]))}return{points:l,area:l.length,bounds:{x:d,y:f,w:p-d,h:h-f}}}function o0(e,t,i){const r=Vf(e,t,i),n=[];if(r.forEach(a=>{const{x:o,y:l,w:d,h:p}=a.bounds;if(p/d>.8&&d>t*.05&&p>i*.1){const h=Math.max(0,o-d*.3),g=Math.max(0,l-p*.2),_=Math.min(t-h,d*1.6),y=Math.min(i-g,p*1.4);n.push({x:h,y:g,width:_,height:y,centerX:h+_/2,centerY:g+y/2})}}),n.length===0){const a=Math.floor(Math.min(t,i)/8);for(let o=0;o<i-a*3;o+=a)for(let l=0;l<t-a*2;l+=a){let d=0,p=0;for(let f=o;f<o+a*3&&f<i;f+=10)for(let h=l;h<l+a*2&&h<t;h+=10){const g=(f*t+h)*4;d+=(e[g]+e[g+1]+e[g+2])/3,p++}d/=p,d>60&&d<200&&n.push({x:l,y:o,width:a*2,height:a*3,centerX:l+a,centerY:o+a*1.5})}}return l0(e,t,i).forEach(a=>{n.push(a)}),n.slice(0,3)}function l0(e,t,i){const r=u0(e,t,i),n=new Uint8Array(t*i),s=Math.max(28,Math.abs(r.r-r.g)*.6+Math.abs(r.r-r.b)*.6+20),a=Math.max(18,.25*r.lum+14),o=18;for(let d=0;d<i;d++)for(let p=0;p<t;p++){const f=(d*t+p)*4,h=e[f],g=e[f+1],_=e[f+2],y=.299*h+.587*g+.114*_,k=Math.abs(h-r.r),$=Math.abs(g-r.g),w=Math.abs(_-r.b),C=k+$+w,x=Math.max(h,g,_),S=Math.min(h,g,_),I=x-S;(C>s||Math.abs(y-r.lum)>a||I>o)&&(n[d*t+p]=1)}return d0(n,t,i,t*i*.01).slice(0,3).map(d=>{const f=d.width*.08,h=d.height*.08,g=Math.max(0,d.x-f),_=Math.max(0,d.y-h),y=Math.min(t-g,d.width+f*2),k=Math.min(i-_,d.height+h*2);return{x:g,y:_,width:y,height:k,centerX:g+y/2,centerY:_+k/2}})}function u0(e,t,i){const r=Math.max(2,Math.round(t*.05)),n=Math.max(2,Math.round(i*.05));let s=0,a=0,o=0,l=0;[{xStart:0,xEnd:r,yStart:0,yEnd:n},{xStart:t-r,xEnd:t,yStart:0,yEnd:n},{xStart:0,xEnd:r,yStart:i-n,yEnd:i},{xStart:t-r,xEnd:t,yStart:i-n,yEnd:i}].forEach(_=>{for(let y=_.yStart;y<_.yEnd;y++)for(let k=_.xStart;k<_.xEnd;k++){const $=(y*t+k)*4;s+=e[$],a+=e[$+1],o+=e[$+2],l++}});const p=l?s/l:128,f=l?a/l:128,h=l?o/l:128,g=.299*p+.587*f+.114*h;return{r:p,g:f,b:h,lum:g}}function d0(e,t,i,r){const n=new Uint8Array(t*i),s=[],a=[];for(let o=0;o<i;o++)for(let l=0;l<t;l++){const d=o*t+l;if(e[d]!==1||n[d])continue;let p=l,f=l,h=o,g=o,_=0;for(a.push(d),n[d]=1;a.length;){const y=a.pop(),k=Math.floor(y/t),$=y-k*t;_++,$<p&&(p=$),k<h&&(h=k),$>f&&(f=$),k>g&&(g=k);for(let w=-1;w<=1;w++)for(let C=-1;C<=1;C++){if(!C&&!w)continue;const x=$+C,S=k+w;if(x<0||S<0||x>=t||S>=i)continue;const I=S*t+x;e[I]===1&&!n[I]&&(n[I]=1,a.push(I))}}_>=r&&s.push({x:p,y:h,width:Math.max(1,f-p),height:Math.max(1,g-h),area:_})}return s.sort((o,l)=>l.area-o.area),s}function p0(e,t,i){if(!e?.length)return[];const r=e.map(s=>f0(s,t,i)).filter(Boolean).sort((s,a)=>a.width*a.height-s.width*s.height),n=[];return r.forEach(s=>{let a=!1;for(const o of n){const l=h0(o,s),d=Math.hypot(o.centerX-s.centerX,o.centerY-s.centerY),p=Math.min(o.width,s.width);if(l>.25||d<p*.45){const f=Math.min(o.x,s.x),h=Math.min(o.y,s.y),g=Math.max(o.x+o.width,s.x+s.width),_=Math.max(o.y+o.height,s.y+s.height);o.x=f,o.y=h,o.width=Math.min(t-f,g-f),o.height=Math.min(i-h,_-h),o.centerX=o.x+o.width/2,o.centerY=o.y+o.height/2,a=!0;break}}a||n.push({...s})}),n}function c0(e,t,i,r){if(!t)return e;const n={...e},s=Math.round(Math.min(i,r)*.25),a=Math.max(1,Math.round(n.height/80)),o=Math.max(1,Math.round(n.width/80)),l=.08,d=($,w,C)=>Math.max(w,Math.min(C,$));let p=d(Math.floor(n.x),0,i-1),f=d(Math.floor(n.x+n.width),1,i),h=d(Math.floor(n.y),0,r-1),g=d(Math.floor(n.y+n.height),1,r);const _=$=>m0(t,i,$,h,g,a),y=$=>g0(t,i,$,p,f,o);let k=0;for(let $=0;$<s&&p>1;$++){const w=p-1;if(_(w)>l)p=w,k=0;else if(++k>Math.max(10,n.width*.04))break}k=0;for(let $=0;$<s&&f<i-1;$++){const w=f+1;if(_(w)>l)f=w,k=0;else if(++k>Math.max(10,n.width*.04))break}k=0;for(let $=0;$<s&&h>1;$++){const w=h-1;if(y(w)>l)h=w,k=0;else if(++k>Math.max(10,n.height*.04))break}k=0;for(let $=0;$<s&&g<r-1;$++){const w=g+1;if(y(w)>l)g=w,k=0;else if(++k>Math.max(10,n.height*.04))break}return n.x=p,n.y=h,n.width=Math.max(20,f-p),n.height=Math.max(40,g-h),n.centerX=n.x+n.width/2,n.centerY=n.y+n.height/2,n}function f0(e,t,i){if(!e)return null;const r=Math.max(0,e.x??e.bounds?.x??0),n=Math.max(0,e.y??e.bounds?.y??0),s=Math.max(1,e.width??e.w??e.bounds?.w??0),a=Math.max(1,e.height??e.h??e.bounds?.h??0);if(s<=1||a<=1)return null;const o=Math.min(s,t-r),l=Math.min(a,i-n);return{x:r,y:n,width:o,height:l,centerX:r+o/2,centerY:n+l/2}}function h0(e,t){const i=Math.max(e.x,t.x),r=Math.max(e.y,t.y),n=Math.min(e.x+e.width,t.x+t.width),s=Math.min(e.y+e.height,t.y+t.height),a=Math.max(0,n-i)*Math.max(0,s-r);if(a===0)return 0;const o=e.width*e.height+t.width*t.height-a;return o>0?a/o:0}function m0(e,t,i,r,n,s){let a=0,o=0;for(let l=r;l<n;l+=s){const d=l*t+i;e[d]>80&&a++,o++}return o?a/o:0}function g0(e,t,i,r,n,s){let a=0,o=0;for(let l=r;l<n;l+=s){const d=i*t+l;e[d]>80&&a++,o++}return o?a/o:0}function y0(e,t,i,r){const n=Math.max(10,e.width??e.w??e.bounds?.w??0),s=Math.max(10,e.height??e.h??e.bounds?.h??0),a=e.centerX??(e.x??e.bounds?.x??0)+n/2;e.centerY??(e.y??e.bounds?.y??0)+s/2;const o=_0(e,t,i,r);if(o.length<8)return ed(e,i,r);const l=(p,f,h,g,_=0)=>{const y=w0(o,f,h);if(!y)return null;const k=$0(y,g,a,n,i),$=Math.max(0,Math.min(r,y.y)),w=Gf(.45+(y.coverage||0)*.55+_,.4,.98);return{x:k,y:$,confidence:w,name:p}},d=[l("nose",0,.18,0),l("left_eye",0,.18,-.25),l("right_eye",0,.18,.25),l("left_ear",0,.22,-.4),l("right_ear",0,.22,.4),l("left_shoulder",.2,.38,-.75,.05),l("right_shoulder",.2,.38,.75,.05),l("left_elbow",.35,.55,-1),l("right_elbow",.35,.55,1),l("left_wrist",.45,.65,-1.2,-.05),l("right_wrist",.45,.65,1.2,-.05),l("left_hip",.5,.7,-.4,.05),l("right_hip",.5,.7,.4,.05),l("left_knee",.7,.85,-.35),l("right_knee",.7,.85,.35),l("left_ankle",.85,.98,-.3,-.05),l("right_ankle",.85,.98,.3,-.05)];if(d.some(p=>!p)){const p=ed(e,i,r);return d.map((f,h)=>f||p[h])}return d}function ed(e,t,i){const r=Math.max(10,e.width??e.w??e.bounds?.w??0),n=Math.max(10,e.height??e.h??e.bounds?.h??0),s=e.centerX??(e.x??e.bounds?.x??0)+r/2,a=e.centerY??(e.y??e.bounds?.y??0)+n/2,o=[];return[{x:s,y:a-n*.4,name:"nose"},{x:s-r*.1,y:a-n*.38,name:"left_eye"},{x:s+r*.1,y:a-n*.38,name:"right_eye"},{x:s-r*.15,y:a-n*.35,name:"left_ear"},{x:s+r*.15,y:a-n*.35,name:"right_ear"},{x:s-r*.25,y:a-n*.15,name:"left_shoulder"},{x:s+r*.25,y:a-n*.15,name:"right_shoulder"},{x:s-r*.3,y:a+n*.05,name:"left_elbow"},{x:s+r*.3,y:a+n*.05,name:"right_elbow"},{x:s-r*.35,y:a+n*.25,name:"left_wrist"},{x:s+r*.35,y:a+n*.25,name:"right_wrist"},{x:s-r*.15,y:a+n*.15,name:"left_hip"},{x:s+r*.15,y:a+n*.15,name:"right_hip"},{x:s-r*.18,y:a+n*.35,name:"left_knee"},{x:s+r*.18,y:a+n*.35,name:"right_knee"},{x:s-r*.15,y:a+n*.48,name:"left_ankle"},{x:s+r*.15,y:a+n*.48,name:"right_ankle"}].forEach(d=>{o.push({x:Math.max(0,Math.min(t,d.x)),y:Math.max(0,Math.min(i,d.y)),confidence:.55,name:d.name})}),o}function _0(e,t,i,r){const n=Math.max(10,Math.round(e.width??e.w??0)),s=Math.max(10,Math.round(e.height??e.h??0)),a=Math.max(0,Math.round(e.x??e.bounds?.x??0)),o=Math.max(0,Math.round(e.y??e.bounds?.y??0)),l=Math.max(1,Math.floor(s/120)),d=[],p=b0(e,t,i,r);for(let f=0;f<s;f+=l){const h=Math.min(r-1,o+f);let g=null,_=null,y=0,k=0;for(let $=0;$<n;$++){const w=Math.min(i-1,a+$),C=(h*i+w)*4,x=t[C],S=t[C+1],I=t[C+2],E=Math.max(x,S,I),z=Math.min(x,S,I),D=.299*x+.587*S+.114*I,W=E-z,H=Math.abs(x-p.meanR)+Math.abs(S-p.meanG)+Math.abs(I-p.meanB),Y=Math.abs(D-p.meanLum);(W>p.meanSat*.8+6||H>p.colorStd*.9+24||Y>p.lumStd*.6+6)&&(y++,g=g??w,_=w),k++}d.push({y:h,left:g,right:_,coverage:k>0?y/k:0})}return d}function b0(e,t,i,r){const n=Math.max(10,Math.round(e.width??e.w??0)),s=Math.max(10,Math.round(e.height??e.h??0)),a=Math.max(0,Math.round(e.x??e.bounds?.x??0)),o=Math.max(0,Math.round(e.y??e.bounds?.y??0)),l=Math.max(1,Math.floor(n/50)),d=Math.max(1,Math.floor(s/50));let p=0,f=0,h=0,g=0,_=0,y=0,k=0;for(let z=0;z<s;z+=d){const D=Math.min(r-1,o+z);for(let W=0;W<n;W+=l){const H=Math.min(i-1,a+W),Y=(D*i+H)*4,F=t[Y],V=t[Y+1],te=t[Y+2],X=.299*F+.587*V+.114*te,j=Math.max(F,V,te),ae=Math.min(F,V,te);p+=F,f+=V,h+=te,g+=X,_+=X*X,y+=j-ae,k++}}if(!k)return{meanR:128,meanG:128,meanB:128,meanLum:128,lumStd:20,meanSat:10,colorStd:40};const $=p/k,w=f/k,C=h/k,x=g/k,S=Math.sqrt(Math.max(0,_/k-x*x)),I=y/k,E=(Math.abs($-w)+Math.abs($-C)+Math.abs(w-C))*.5+30;return{meanR:$,meanG:w,meanB:C,meanLum:x,lumStd:S,meanSat:I,colorStd:E}}function w0(e,t,i){if(!e.length)return null;const r=Math.max(0,Math.floor(t*(e.length-1))),n=Math.min(e.length-1,Math.ceil(i*(e.length-1)));let s=null,a=-1/0;for(let o=r;o<=n;o++){const l=e[o];if(!l)continue;const d=l.left!=null&&l.right!=null?l.right-l.left:0,p=l.coverage+d*.001;p>a&&(a=p,s=l)}return s}function $0(e,t,i,r,n){const s=e.left!=null&&e.right!=null,a=s?Math.max(6,e.right-e.left):r,o=s?(e.left+e.right)/2:i,l=a*.5*1.15,d=o+l*Gf(t,-1.6,1.6);return Math.max(0,Math.min(n,d))}function Gf(e,t,i){return Math.max(t,Math.min(i,e))}function v0(e,t,i){const r=qe(e,t,i),n=new Uint8Array(t*i),s=120,a=40;for(let o=0;o<r.length;o++)r[o]>s?n[o]=255:r[o]>a&&(n[o]=128);return n}function x0(e,t,i){const r=new Uint8Array(t*i),n=15;for(let s=0;s<i;s++)for(let a=0;a<t;a++){let o=0,l=0;for(let h=Math.max(0,s-n);h<Math.min(i,s+n);h++)for(let g=Math.max(0,a-n);g<Math.min(t,a+n);g++){const _=(h*t+g)*4;o+=(e[_]+e[_+1]+e[_+2])/3,l++}const d=o/l,p=(s*t+a)*4,f=(e[p]+e[p+1]+e[p+2])/3;r[s*t+a]=f>d-10?255:0}return r}async function k0(e,t,i,r){const n=["oil-painting","watercolor","van-gogh","picasso","anime"],s=n[Math.floor(Math.random()*n.length)],a=new Uint8ClampedArray(t);switch(s){case"oil-painting":C0(a,i,r);break;case"watercolor":S0(a,i,r);break;case"van-gogh":T0(a,i,r);break;case"picasso":I0(a,i,r);break;case"anime":E0(a,i,r);break}const o=new ImageData(a,i,r);e.putImageData(o,0,0),e.save(),e.fillStyle="rgba(0, 0, 0, 0.7)",e.fillRect(10,r-50,300,40),e.fillStyle="#3b82f6",e.font="bold 18px Arial",e.fillText(`🎨 Style: ${s.replace("-"," ").toUpperCase()}`,20,r-22),e.restore()}function C0(e,t,i){const r=new Uint8ClampedArray(e),n=4;for(let s=n;s<i-n;s+=2)for(let a=n;a<t-n;a+=2){let o=0,l=0,d=0,p=0;for(let f=-n;f<=n;f++)for(let h=-n;h<=n;h++){const g=((s+f)*t+(a+h))*4;o+=r[g],l+=r[g+1],d+=r[g+2],p++}o=Math.min(255,o/p*1.2),l=Math.min(255,l/p*1.2),d=Math.min(255,d/p*1.2);for(let f=0;f<2;f++)for(let h=0;h<2;h++){const g=((s+f)*t+(a+h))*4;e[g]=o,e[g+1]=l,e[g+2]=d}}}function S0(e,t,i){const r=new Uint8ClampedArray(e),n=qe(r,t,i);for(let s=0;s<e.length;s+=4){e[s]=Math.min(255,e[s]*1.3+30),e[s+1]=Math.min(255,e[s+1]*1.3+30),e[s+2]=Math.min(255,e[s+2]*1.3+30);const a=Math.floor(s/4);n[a]>100&&(e[s]*=.8,e[s+1]*=.8,e[s+2]*=.8)}ua(e,t,i,2)}function T0(e,t,i){const r=new Uint8ClampedArray(e);for(let o=0;o<e.length;o+=4){const l=r[o],d=r[o+1],p=r[o+2],f=Math.max(l,d,p),h=Math.min(l,d,p);f-h>0&&(e[o]=Math.min(255,l+(l-h)*.5),e[o+1]=Math.min(255,d+(d-h)*.5),e[o+2]=Math.min(255,p+(p-h)*.5))}const n=t/2,s=i/2,a=Math.sqrt(n*n+s*s);for(let o=0;o<i;o++)for(let l=0;l<t;l++){const d=l-n,p=o-s,f=Math.sqrt(d*d+p*p),h=Math.atan2(p,d),g=f/a*.3,_=h+g,y=Math.round(n+f*Math.cos(_)),k=Math.round(s+f*Math.sin(_));if(y>=0&&y<t&&k>=0&&k<i){const $=(k*t+y)*4,w=(o*t+l)*4;e[w]=r[$],e[w+1]=r[$+1],e[w+2]=r[$+2]}}}function I0(e,t,i){const r=new Uint8ClampedArray(e),n=40;for(let s=0;s<i;s+=n)for(let a=0;a<t;a+=n){let o=0,l=0,d=0,p=0;for(let g=s;g<Math.min(s+n,i);g++)for(let _=a;_<Math.min(a+n,t);_++){const y=(g*t+_)*4;o+=r[y],l+=r[y+1],d+=r[y+2],p++}o=Math.floor(o/p),l=Math.floor(l/p),d=Math.floor(d/p);const f=(Math.random()-.5)*10,h=(Math.random()-.5)*10;for(let g=s;g<Math.min(s+n,i);g++)for(let _=a;_<Math.min(a+n,t);_++){const y=Math.round(_+f),k=Math.round(g+h);if(y>=0&&y<t&&k>=0&&k<i){const $=(k*t+y)*4;e[$]=o,e[$+1]=l,e[$+2]=d}}}}function E0(e,t,i){const r=new Uint8ClampedArray(e),n=qe(r,t,i),s=4;for(let a=0;a<e.length;a+=4){e[a]=Math.floor(e[a]/(256/s))*(256/s),e[a+1]=Math.floor(e[a+1]/(256/s))*(256/s),e[a+2]=Math.floor(e[a+2]/(256/s))*(256/s);const o=Math.max(e[a],e[a+1],e[a+2]),l=Math.min(e[a],e[a+1],e[a+2]);o-l>0&&(e[a]=Math.min(255,e[a]+(e[a]-l)*.3),e[a+1]=Math.min(255,e[a+1]+(e[a+1]-l)*.3),e[a+2]=Math.min(255,e[a+2]+(e[a+2]-l)*.3))}for(let a=0;a<i;a++)for(let o=0;o<t;o++){const l=(a*t+o)*4;n[a*t+o]>80&&(e[l]=0,e[l+1]=0,e[l+2]=0)}}async function M0(e,t,i,r){const n=new Uint8ClampedArray(t);W0(n),L0(n),ua(t,i,r,1);for(let a=1;a<r-1;a++)for(let o=1;o<i-1;o++){const l=(a*i+o)*4;for(let d=0;d<3;d++){const p=n[l+d],h=[n[((a-1)*i+o)*4+d],n[((a+1)*i+o)*4+d],n[(a*i+(o-1))*4+d],n[(a*i+(o+1))*4+d]].reduce((_,y)=>_+y,0)/4,g=p-h;t[l+d]=Math.max(0,Math.min(255,p+g*1.5))}}for(let a=0;a<t.length;a+=4)t[a]=Math.min(255,t[a]*1.1+10),t[a+2]=Math.min(255,t[a+2]*1.05);for(let a=0;a<t.length;a+=4){const o=(Math.random()-.5)*5;t[a]=Math.max(0,Math.min(255,t[a]+o)),t[a+1]=Math.max(0,Math.min(255,t[a+1]+o)),t[a+2]=Math.max(0,Math.min(255,t[a+2]+o))}const s=new ImageData(t,i,r);e.putImageData(s,0,0),e.save(),e.fillStyle="rgba(0, 0, 0, 0.7)",e.fillRect(10,r-50,350,40),e.fillStyle="#3b82f6",e.font="bold 18px Arial",e.fillText("✨ AI Enhanced with Dream-like Quality",20,r-22),e.restore()}async function z0(e,t,i,r){const n=new Uint8ClampedArray(t),s=A0(n,i,r),a=150,o=new Uint8Array(i*r);for(let d=0;d<s.length;d++)o[d]=s[d]>a?255:0;O0(o,i,r);for(let d=0;d<i*r;d++){const p=d*4;if(o[d]===0){const f=d%i,h=Math.floor(d/i),g=(Math.floor(f/20)+Math.floor(h/20))%2===0;t[p]=g?200:150,t[p+1]=g?200:150,t[p+2]=g?200:150,t[p+3]=255}else R0(n,d,i,r)>30&&(t[p]=Math.min(255,t[p]*1.1),t[p+1]=Math.min(255,t[p+1]*1.1),t[p+2]=Math.min(255,t[p+2]*1.1))}const l=new ImageData(t,i,r);e.putImageData(l,0,0),e.save(),e.strokeStyle="#3b82f6",e.lineWidth=2,e.setLineDash([5,5]);for(let d=1;d<r-1;d++)for(let p=1;p<i-1;p++){const f=d*i+p;o[f]>0&&(o[f-1]===0||o[f+1]===0||o[f-i]===0||o[f+i]===0)&&(e.fillStyle="#3b82f6",e.fillRect(p,d,1,1))}e.restore(),e.fillStyle="rgba(0, 0, 0, 0.7)",e.fillRect(10,r-50,380,40),e.fillStyle="#3b82f6",e.font="bold 18px Arial",e.fillText("🎯 Background Removed - Foreground Isolated",20,r-22)}function A0(e,t,i){const r=new Uint8Array(t*i),n=t/2,s=i/2,a=Math.sqrt(n*n+s*s);for(let l=1;l<i-1;l++)for(let d=1;d<t-1;d++){const p=(l*t+d)*4,f=l*t+d;let h=0;const g=[((l-1)*t+d)*4,((l+1)*t+d)*4,(l*t+(d-1))*4,(l*t+(d+1))*4];for(const w of g){const C=e[p]-e[w],x=e[p+1]-e[w+1],S=e[p+2]-e[w+2];h+=Math.sqrt(C*C+x*x+S*S)}const _=d-n,y=l-s,$=1-Math.sqrt(_*_+y*y)/a;r[f]=Math.min(255,h*.5*(1+$))}const o=new Uint8Array(r);return B0(o,t,i,3),o}function O0(e,t,i){td(e,t,i,3),rd(e,t,i,3),rd(e,t,i,2),td(e,t,i,2)}function td(e,t,i,r){for(let n=0;n<r;n++){const s=new Uint8Array(e);for(let a=1;a<i-1;a++)for(let o=1;o<t-1;o++){const l=a*t+o;(s[l-1]===255||s[l+1]===255||s[l-t]===255||s[l+t]===255)&&(e[l]=255)}}}function rd(e,t,i,r){for(let n=0;n<r;n++){const s=new Uint8Array(e);for(let a=1;a<i-1;a++)for(let o=1;o<t-1;o++){const l=a*t+o;(s[l-1]===0||s[l+1]===0||s[l-t]===0||s[l+t]===0)&&(e[l]=0)}}}function R0(e,t,i,r){const n=t%i,s=Math.floor(t/i);if(n===0||n===i-1||s===0||s===r-1)return 0;const a=-e[((s-1)*i+(n-1))*4]+e[((s-1)*i+(n+1))*4]+-2*e[(s*i+(n-1))*4]+2*e[(s*i+(n+1))*4]+-e[((s+1)*i+(n-1))*4]+e[((s+1)*i+(n+1))*4],o=-e[((s-1)*i+(n-1))*4]-2*e[((s-1)*i+n)*4]-e[((s-1)*i+(n+1))*4]+e[((s+1)*i+(n-1))*4]+2*e[((s+1)*i+n)*4]+e[((s+1)*i+(n+1))*4];return Math.sqrt(a*a+o*o)}function B0(e,t,i,r){const n=new Uint8Array(e),s=[],a=r/3;let o=0;for(let l=-r;l<=r;l++){const d=Math.exp(-(l*l)/(2*a*a));s.push(d),o+=d}for(let l=0;l<s.length;l++)s[l]/=o;for(let l=0;l<i;l++)for(let d=0;d<t;d++){let p=0;for(let f=-r;f<=r;f++){const h=Math.max(0,Math.min(t-1,d+f));p+=n[l*t+h]*s[f+r]}e[l*t+d]=p}for(let l=0;l<t;l++)for(let d=0;d<i;d++){let p=0;for(let f=-r;f<=r;f++){const h=Math.max(0,Math.min(i-1,d+f));p+=n[h*t+l]*s[f+r]}e[d*t+l]=p}}function D0(e,t,i){const r=["pencil","charcoal","ink","contour"],n=r[Math.floor(Math.random()*r.length)];for(let s=0;s<e.length;s+=4){const a=e[s]*.299+e[s+1]*.587+e[s+2]*.114;e[s]=a,e[s+1]=a,e[s+2]=a}switch(n){case"pencil":N0(e,t,i);break;case"charcoal":P0(e,t,i);break;case"ink":U0(e,t,i);break;case"contour":q0(e,t,i);break}}function N0(e,t,i){const r=new Uint8ClampedArray(e),n=qe(r,t,i);for(let s=0;s<e.length;s+=4)e[s]=255-e[s],e[s+1]=255-e[s+1],e[s+2]=255-e[s+2];ua(e,t,i,2);for(let s=0;s<t*i;s++){const a=s*4,o=255-n[s],l=e[a],d=l===255?255:Math.min(255,o*o/(255-l));e[a]=d,e[a+1]=d,e[a+2]=d}for(let s=0;s<e.length;s+=4){const a=(Math.random()-.5)*10;e[s]=Math.max(0,Math.min(255,e[s]+a)),e[s+1]=e[s],e[s+2]=e[s]}}function P0(e,t,i){const r=qe(e,t,i);for(let n=0;n<t*i;n++){const s=n*4,o=r[n]>100?0:e[s]>128?255:50;e[s]=o,e[s+1]=o,e[s+2]=o}for(let n=0;n<e.length;n+=4)if(e[n]<200){const s=(Math.random()-.5)*40;e[n]=Math.max(0,Math.min(255,e[n]+s)),e[n+1]=e[n],e[n+2]=e[n]}}function U0(e,t,i){const r=qe(e,t,i);for(let n=0;n<t*i;n++){const s=n*4,a=r[n]>80?0:255;e[s]=a,e[s+1]=a,e[s+2]=a}}function q0(e,t,i){const r=qe(e,t,i);for(let n=0;n<t*i;n++){const s=n*4,a=r[n]>120?0:255;e[s]=a,e[s+1]=a,e[s+2]=a}}function ua(e,t,i,r){const n=new Uint8ClampedArray(e),s=[],a=r/3;let o=0;for(let l=-r;l<=r;l++){const d=Math.exp(-(l*l)/(2*a*a));s.push(d),o+=d}for(let l=0;l<s.length;l++)s[l]/=o;for(let l=0;l<i;l++)for(let d=0;d<t;d++)for(let p=0;p<3;p++){let f=0;for(let h=-r;h<=r;h++){const g=Math.max(0,Math.min(t-1,d+h));f+=n[(l*t+g)*4+p]*s[h+r]}e[(l*t+d)*4+p]=f}for(let l=0;l<t;l++)for(let d=0;d<i;d++)for(let p=0;p<3;p++){let f=0;for(let h=-r;h<=r;h++){const g=Math.max(0,Math.min(i-1,d+h));f+=n[(g*t+l)*4+p]*s[h+r]}e[(d*t+l)*4+p]=f}}function W0(e){let t=0;for(let i=0;i<e.length;i+=4)t+=(e[i]+e[i+1]+e[i+2])/3;return t/(e.length/4)}function L0(e){let t=0,i=0;for(let r=0;r<e.length;r+=4){const n=e[r],s=e[r+1],a=e[r+2];t+=Math.abs(n-s),i+=Math.abs(.5*(n+s)-a)}return(t+i)/(e.length/4)}self.onmessage=async e=>{const{id:t,type:i,data:r}=e.data;try{if(i==="load")await Pg(r.modelId,r.task,t),self.postMessage({id:t,type:"success",data:{}});else if(i==="process"){const n=await Ug(r.imageUrl,r.modelId,r.task);self.postMessage({id:t,type:"success",data:n})}else throw new Error(`Unknown message type: ${i}`)}catch(n){console.error("Worker error:",n),self.postMessage({id:t,type:"error",error:n.message})}};console.log("🚀 AI Worker initialized");
