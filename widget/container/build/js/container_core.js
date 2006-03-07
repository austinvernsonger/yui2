
YAHOO.util.Config=function(owner){if(owner){this.init(owner);}}
YAHOO.util.Config.prototype.init=function(owner){this.owner=owner;this.configChangedEvent=new YAHOO.util.CustomEvent("configChanged");var config={};var deferredEvents={};var initialConfig={};var fireEvent=function(key,property,value){if(property.dependentElement&&!YAHOO.util.Dom._elementInDom(property.dependentElement)){deferredEvents[key]={args:value};return true;}else{if(property.mustChange){if(property.defaultValue!=property.value){property.event.fire(value);}}else{property.event.fire(value);}
return false;}}
this.addProperty=function(key,val,hdl,vfn,el,mc){config[key]={event:new YAHOO.util.CustomEvent(key),handler:hdl,dependentElement:el,defaultValue:val,value:null,validator:vfn,mustChange:mc};if(config[key].handler){config[key].event.subscribe(config[key].handler,this.owner,true);}
this.setProperty(key,val,true);}
this.getConfig=function(){var cfg={};for(var prop in config)
{cfg[prop]=config[prop].value;}
return cfg;}
this.getProperty=function(key){var property=config[key];if(property!=undefined)
{return property.value;}else{return undefined;}}
this.getDefault=function(key){var property=config[key];if(property!=undefined)
{return property.defaultValue;}else{return undefined;}}
this.resetProperty=function(key){var property=config[key];if(property!=undefined){this.setProperty(key,initialConfig[key].value);}else{return undefined;}}
this.setProperty=function(key,value,silent){var property=config[key];if(property!=undefined)
{if(property.validator&&!property.validator(value)){return false;}else{property.value=value;if(!silent){var deferred=fireEvent(key,property,value);this.configChangedEvent.fire([key,value,deferred]);}
return true;}}else{return false;}}
this.refireEvent=function(key){var property=config[key];if(property!=undefined){fireEvent(key,property,property.value);}}
this.applyConfig=function(userConfig,init){if(init){initialConfig=userConfig;}
for(var prop in userConfig){this.setProperty(prop,userConfig[prop],true);}
for(var prop in userConfig){var property=config[prop];if(property!=undefined){fireEvent(prop,property,userConfig[prop]);}}}
this.refresh=function(){for(var prop in config){this.refireEvent(prop);}}
this.reset=function(){this.applyConfig(initialConfig);}
this.subscribeToConfigEvent=function(key,handler,obj,override){var property=config[key];if(property!=undefined){property.event.subscribe(handler,obj,override);return true;}else{return false;}}
this.fireDeferredEvents=function(){for(var prop in deferredEvents){var property=config[prop];if(property!=undefined){fireEvent(prop,property,deferredEvents[prop].args);}}}
this.checkBoolean=function(val){if(typeof val=='boolean')
{return true;}else{return false;}}
this.checkNumber=function(val){if(isNaN(val))
{return false;}else{return true;}}}
YAHOO.util.Dom._elementInDom=function(element){var parentNode=element.parentNode;if(!parentNode){return false;}else{if(parentNode.tagName=="HTML"){return true;}else{return YAHOO.util.Dom._elementInDom(parentNode);}}}
YAHOO.widget.Module=function(el,userConfig){if(el){this.init(el,userConfig);}}
YAHOO.widget.Module.CSS_HEADER="hd";YAHOO.widget.Module.CSS_BODY="bd";YAHOO.widget.Module.CSS_FOOTER="ft";YAHOO.widget.Module.prototype={constructor:YAHOO.widget.Module,element:null,header:null,body:null,footer:null,childNodesInDOM:null,initEvents:function(){this.appendEvent=new YAHOO.util.CustomEvent("append");this.beforeRenderEvent=new YAHOO.util.CustomEvent("beforeRender");this.renderEvent=new YAHOO.util.CustomEvent("render");this.changeHeaderEvent=new YAHOO.util.CustomEvent("changeHeader");this.changeBodyEvent=new YAHOO.util.CustomEvent("changeBody");this.changeFooterEvent=new YAHOO.util.CustomEvent("changeFooter");this.changeContentEvent=new YAHOO.util.CustomEvent("changeContent");this.destroyEvent=new YAHOO.util.CustomEvent("destroy");this.beforeShowEvent=new YAHOO.util.CustomEvent("beforeShow",this);this.showEvent=new YAHOO.util.CustomEvent("show",this);this.beforeHideEvent=new YAHOO.util.CustomEvent("beforeHide",this);this.hideEvent=new YAHOO.util.CustomEvent("hide",this);},initDefaultConfig:function(){this.cfg=new YAHOO.util.Config(this);this.cfg.addProperty("visible",null,this.configVisible,this.cfg.checkBoolean,this.element,true);},init:function(el,userConfig){if(typeof el=="string")
{var elId=el;el=document.getElementById(el);if(!el)
{el=document.createElement("DIV");el.id=elId;}}
this.element=el;this.id=el.id;this.childNodesInDOM=[null,null,null];var childNodes=this.element.childNodes;if(childNodes)
{for(var i=0;i<childNodes.length;i++)
{var child=childNodes[i];switch(child.className)
{case YAHOO.widget.Module.CSS_HEADER:this.header=child;this.childNodesInDOM[0]=child;break;case YAHOO.widget.Module.CSS_BODY:this.body=child;this.childNodesInDOM[1]=child;break;case YAHOO.widget.Module.CSS_FOOTER:this.footer=child;this.childNodesInDOM[2]=child;break;}}}
this.initEvents();this.initDefaultConfig();if(userConfig){this.cfg.applyConfig(userConfig);}},setHeader:function(headerContent){if(!this.header){this.header=document.createElement("DIV");this.header.className=YAHOO.widget.Module.CSS_HEADER;}
if(typeof headerContent=="string"){this.header.innerHTML=headerContent;}else{this.header.innerHTML="";this.header.appendChild(headerContent);}
this.changeHeaderEvent.fire(headerContent);this.changeContentEvent.fire();},appendToHeader:function(element){if(!this.header){this.header=document.createElement("DIV");this.header.className=YAHOO.widget.Module.CSS_HEADER;}
this.header.appendChild(element);this.changeHeaderEvent.fire(element);this.changeContentEvent.fire();},setBody:function(bodyContent){if(!this.body){this.body=document.createElement("DIV");this.body.className=YAHOO.widget.Module.CSS_BODY;}
if(typeof bodyContent=="string")
{this.body.innerHTML=bodyContent;}else{this.body.innerHTML="";this.body.appendChild(bodyContent);}
this.changeBodyEvent.fire(bodyContent);this.changeContentEvent.fire();},appendToBody:function(element){if(!this.body){this.body=document.createElement("DIV");this.body.className=YAHOO.widget.Module.CSS_BODY;}
this.body.appendChild(element);this.changeBodyEvent.fire(element);this.changeContentEvent.fire();},setFooter:function(footerContent){if(!this.footer){this.footer=document.createElement("DIV");this.footer.className=YAHOO.widget.Module.CSS_FOOTER;}
if(typeof footerContent=="string")
{this.footer.innerHTML=footerContent;}else{this.footer.innerHTML="";this.footer.appendChild(footerContent);}
this.changeFooterEvent.fire(footerContent);this.changeContentEvent.fire();},appendToFooter:function(element){if(!this.footer){this.footer=document.createElement("DIV");this.footer.className=YAHOO.widget.Module.CSS_FOOTER;}
this.footer.appendChild(element);this.changeFooterEvent.fire(element);this.changeContentEvent.fire();},render:function(appendToNode){this.beforeRenderEvent.fire();var me=this;var appendTo=function(element){if(typeof element=="string"){element=document.getElementById(element);}
if(element){element.appendChild(me.element);me.appendEvent.fire();}}
if(appendToNode){if(typeof appendToNode=="string"){el=document.getElementById(el);if(!el){el=document.createElement("DIV");el.id=elId;}}
appendTo(appendToNode);}else{if(!YAHOO.util.Dom._elementInDom(this.element)){return false;}}
if((!this.childNodesInDOM[0])&&this.header){var firstChild=this.element.firstChild;if(firstChild){this.element.insertBefore(this.header,firstChild);}else{this.element.appendChild(this.header);}}
if((!this.childNodesInDOM[1])&&this.body){if(this.childNodesInDOM[2]){this.element.insertBefore(this.body,this.childNodesInDOM[2]);}else{this.element.appendChild(this.body);}}
if((!this.childNodesInDOM[2])&&this.footer){this.element.appendChild(this.footer);}
this.cfg.fireDeferredEvents();this.renderEvent.fire();return true;},destroy:function(){if(this.element){var parent=this.element.parentNode;}
if(parent){parent.removeChild(this.element);}
this.element=null;this.header=null;this.body=null;this.footer=null;this.destroyEvent.fire();},show:function(){this.beforeShowEvent.fire();this.cfg.setProperty("visible",true);this.showEvent.fire();},hide:function(){this.beforeHideEvent.fire();this.cfg.setProperty("visible",false);this.hideEvent.fire();},configVisible:function(type,args,obj){var visible=args[0];if(visible){YAHOO.util.Dom.setStyle(this.element,"display","block");}else{YAHOO.util.Dom.setStyle(this.element,"display","none");}}}
YAHOO.widget.Overlay=function(el,userConfig){if(arguments.length>0){YAHOO.widget.Overlay.superclass.constructor.call(this,el,userConfig);}}
YAHOO.widget.Overlay.prototype=new YAHOO.widget.Module();YAHOO.widget.Overlay.prototype.constructor=YAHOO.widget.Overlay;YAHOO.widget.Overlay.superclass=YAHOO.widget.Module.prototype;YAHOO.widget.Overlay.prototype.init=function(el,userConfig){YAHOO.widget.Overlay.superclass.init.call(this,el);this.renderEvent.subscribe(this.cfg.refresh,this.cfg,true);if(userConfig){this.cfg.applyConfig(userConfig,true);}}
YAHOO.widget.Overlay.prototype.initEvents=function(){YAHOO.widget.Overlay.superclass.initEvents.call(this);this.beforeMoveEvent=new YAHOO.util.CustomEvent("beforeMove",this);this.moveEvent=new YAHOO.util.CustomEvent("move",this);}
YAHOO.widget.Overlay.prototype.initDefaultConfig=function(){YAHOO.widget.Overlay.superclass.initDefaultConfig.call(this);this.browser=function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf('opera')!=-1)
return'opera';else if(ua.indexOf('msie')!=-1)
return'ie';else if(ua.indexOf('safari')!=-1)
return'safari';else if(ua.indexOf('gecko')!=-1)
return'gecko';else
return false;}();this.cfg.addProperty("x",null,this.configX,this.cfg.checkNumber,this.container||this.element,true);this.cfg.addProperty("y",null,this.configY,this.cfg.checkNumber,this.container||this.element,true);this.cfg.addProperty("xy",null,this.configXY,null,this.container||this.element,true);this.cfg.addProperty("width","auto",this.configWidth,null,this.container||this.element);this.cfg.addProperty("height","auto",this.configHeight,null,this.container||this.element);this.cfg.addProperty("zIndex",null,this.configzIndex,this.cfg.checkNumber,this.container||this.element,true);this.cfg.addProperty("constraintoviewport",false,this.configConstrainToViewport,this.cfg.checkBoolean);this.cfg.addProperty("iframe",(this.browser=="ie"?true:false),this.configIframe,this.cfg.checkBoolean,this.container||this.element);}
YAHOO.widget.Overlay.prototype.moveTo=function(x,y){this.cfg.setProperty("xy",[x,y]);}
YAHOO.widget.Overlay.prototype.configVisible=function(type,args,obj){var val=args[0];if(!val){YAHOO.util.Dom.setStyle(this.container||this.element,"visibility","hidden");if(this.iframe){YAHOO.util.Dom.setStyle(this.iframe,"visibility","hidden");}}else{YAHOO.util.Dom.setStyle(this.container||this.element,"visibility","visible");if(this.iframe){YAHOO.util.Dom.setStyle(this.iframe,"visibility","visible");}}}
YAHOO.widget.Overlay.prototype.configHeight=function(type,args,obj){var height=args[0];var el=this.element;YAHOO.util.Dom.setStyle(el,"height",height);this.cfg.refireEvent("iframe");}
YAHOO.widget.Overlay.prototype.configWidth=function(type,args,obj){var width=args[0];var el=this.element;YAHOO.util.Dom.setStyle(el,"width",width);this.cfg.refireEvent("iframe");}
YAHOO.widget.Overlay.prototype.configzIndex=function(type,args,obj){var zIndex=args[0];var el=this.container||this.element;if(this.iframe){if(zIndex<=0){zIndex=1;}
YAHOO.util.Dom.setStyle(this.iframe,"zIndex",(zIndex-1));}
YAHOO.util.Dom.setStyle(el,"zIndex",zIndex);this.cfg.setProperty("zIndex",zIndex,true);}
YAHOO.widget.Overlay.prototype.configXY=function(type,args,obj){var pos=args[0];var x=pos[0];var y=pos[1];this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");YAHOO.util.Dom.setXY(this.container||this.element,[x,y]);if(this.cfg.getProperty("iframe")){this.cfg.refireEvent("iframe");}
this.moveEvent.fire([x,y]);}
YAHOO.widget.Overlay.prototype.configX=function(type,args,obj){var x=args[0];var y=this.cfg.getProperty("y");this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");YAHOO.util.Dom.setX(this.container||this.element,x);this.cfg.setProperty("xy",[x,y],true);this.moveEvent.fire([x,y]);}
YAHOO.widget.Overlay.prototype.configY=function(type,args,obj){var x=this.cfg.getProperty("x");var y=args[0];this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");YAHOO.util.Dom.setY(this.container||this.element,y);this.cfg.setProperty("xy",[x,y],true);this.moveEvent.fire([x,y]);}
YAHOO.widget.Overlay.prototype.configIframe=function(type,args,obj){var val=args[0];var el=this.container||this.element;if(val){if(!this.iframe){this.iframe=document.createElement("iframe");document.body.appendChild(this.iframe);YAHOO.util.Dom.setStyle(this.iframe,"position","absolute");YAHOO.util.Dom.setStyle(this.iframe,"zIndex","0");YAHOO.util.Dom.setStyle(this.iframe,"opacity","0");}else{this.iframe.style.display="block";}
if(YAHOO.util.Dom.getStyle(el,"zIndex")<=0){YAHOO.util.Dom.setStyle(el,"zIndex",1);}
YAHOO.util.Dom.setStyle(this.iframe,"top",YAHOO.util.Dom.getXY(el)[1]-2+"px");YAHOO.util.Dom.setStyle(this.iframe,"left",YAHOO.util.Dom.getXY(el)[0]-2+"px");var width=el.offsetWidth;var height=el.offsetHeight;YAHOO.util.Dom.setStyle(this.iframe,"width",width+"px");YAHOO.util.Dom.setStyle(this.iframe,"height",height+"px");}else{if(this.iframe){this.iframe.style.display="none";}}}
YAHOO.widget.Overlay.prototype.configConstrainToViewport=function(type,args,obj){var val=args[0];if(val){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}else{this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}}
YAHOO.widget.Overlay.prototype.enforceConstraints=function(type,args,obj){var pos=args[0];var bod=document.getElementsByTagName('body')[0];var htm=document.getElementsByTagName('html')[0];var bodyOverflow=YAHOO.util.Dom.getStyle(bod,"overflow");var htmOverflow=YAHOO.util.Dom.getStyle(htm,"overflow");var x=pos[0];var y=pos[1];var offsetHeight=this.element.offsetHeight;var offsetWidth=this.element.offsetWidth;var viewPortWidth=YAHOO.util.Dom.getClientWidth();var viewPortHeight=YAHOO.util.Dom.getClientHeight();var scrollX=window.scrollX||document.body.scrollLeft;var scrollY=window.scrollY||document.body.scrollTop;var topConstraint=scrollY+10;var leftConstraint=scrollX+10;var bottomConstraint=scrollY+viewPortHeight-offsetHeight-10;var rightConstraint=scrollX+viewPortWidth-offsetWidth-10;if(x<leftConstraint){x=leftConstraint;}else if(x>rightConstraint){x=rightConstraint;}
if(y<topConstraint){y=topConstraint;}else if(y>bottomConstraint){y=bottomConstraint;}
this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);}