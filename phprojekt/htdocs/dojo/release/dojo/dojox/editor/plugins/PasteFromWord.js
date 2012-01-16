/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.editor.plugins.PasteFromWord"]||(dojo._hasResource["dojox.editor.plugins.PasteFromWord"]=!0,dojo.provide("dojox.editor.plugins.PasteFromWord"),dojo.require("dojo.string"),dojo.require("dijit._editor._Plugin"),dojo.require("dijit.form.Button"),dojo.require("dijit.Dialog"),dojo.require("dojo.i18n"),dojo.require("dojox.html.format"),dojo.requireLocalization("dojox.editor.plugins","PasteFromWord",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"),
dojo.declare("dojox.editor.plugins.PasteFromWord",dijit._editor._Plugin,{iconClassPrefix:"dijitAdditionalEditorIcon",width:"400px",height:"300px",_template:"<div class='dijitPasteFromWordEmbeddedRTE'><div style='width: ${width}; padding-top: 5px; padding-bottom: 5px;'>${instructions}</div><div id='${uId}_rte' style='width: ${width}; height: ${height}'></div><table style='width: ${width}' tabindex='-1'><tbody><tr><td align='center'><button type='button' dojoType='dijit.form.Button' id='${uId}_paste'>${paste}</button>&nbsp;<button type='button' dojoType='dijit.form.Button' id='${uId}_cancel'>${cancel}</button></td></tr></tbody></table></div>",
_filters:[{regexp:/(<meta\s*[^>]*\s*>)|(<\s*link\s* href="file:[^>]*\s*>)|(<\/?\s*\w+:[^>]*\s*>)/gi,handler:""},{regexp:/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,handler:""},{regexp:/(class="Mso[^"]*")|(<\!--(.|\s){1,}?--\>)/gi,handler:""},{regexp:/(<p[^>]*>\s*(\&nbsp;|\u00A0)*\s*<\/p[^>]*>)|(<p[^>]*>\s*<font[^>]*>\s*(\&nbsp;|\u00A0)*\s*<\/\s*font\s*>\s<\/p[^>]*>)/ig,handler:""},{regexp:/(style="[^"]*mso-[^;][^"]*")|(style="margin:\s*[^;"]*;")/gi,
handler:""},{regexp:/(<\s*script[^>]*>((.|\s)*?)<\\?\/\s*script\s*>)|(<\s*script\b([^<>]|\s)*>?)|(<[^>]*=(\s|)*[("|')]javascript:[^$1][(\s|.)]*[$1][^>]*>)/ig,handler:""}],_initButton:function(){var a=dojo.i18n.getLocalization("dojox.editor.plugins","PasteFromWord");this.button=new dijit.form.Button({label:a.pasteFromWord,showLabel:!1,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"PasteFromWord",tabIndex:"-1",onClick:dojo.hitch(this,"_openDialog")});this._uId=dijit.getUniqueId(this.editor.id);
a.uId=this._uId;a.width=this.width||"400px";a.height=this.height||"300px";this._dialog=(new dijit.Dialog({title:a.pasteFromWord})).placeAt(dojo.body());this._dialog.set("content",dojo.string.substitute(this._template,a));dojo.style(dojo.byId(this._uId+"_rte"),"opacity",0.0010);this.connect(dijit.byId(this._uId+"_paste"),"onClick","_paste");this.connect(dijit.byId(this._uId+"_cancel"),"onClick","_cancel");this.connect(this._dialog,"onHide","_clearDialog")},updateState:function(){this.button.set("disabled",
this.get("disabled"))},setEditor:function(a){this.editor=a;this._initButton()},_openDialog:function(){this._dialog.show();this._rte||setTimeout(dojo.hitch(this,function(){this._rte=new dijit._editor.RichText({height:this.height||"300px"},this._uId+"_rte");this._rte.onLoadDeferred.addCallback(dojo.hitch(this,function(){dojo.animateProperty({node:this._rte.domNode,properties:{opacity:{start:0.0010,end:1}}}).play()}))}),100)},_paste:function(){var a=dojox.html.format.prettyPrint(this._rte.get("value"));
this._dialog.hide();var b;for(b=0;b<this._filters.length;b++)var c=this._filters[b],a=a.replace(c.regexp,c.handler);a=dojox.html.format.prettyPrint(a);this.editor.execCommand("inserthtml",a)},_cancel:function(){this._dialog.hide()},_clearDialog:function(){this._rte.set("value","")},destroy:function(){this._rte&&this._rte.destroy();this._dialog&&this._dialog.destroyRecursive();delete this._dialog;delete this._rte;this.inherited(arguments)}}),dojo.subscribe(dijit._scopeName+".Editor.getPlugin",null,
function(a){if(!a.plugin&&a.args.name.toLowerCase()==="pastefromword")a.plugin=new dojox.editor.plugins.PasteFromWord({width:"width"in a.args?a.args.width:"400px",height:"height"in a.args?a.args.width:"300px"})}));