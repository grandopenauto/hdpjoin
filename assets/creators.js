/* HDPJoin Creator Pilot — consent-gated event names and local-only share-link generator. */
(()=>{"use strict";
const CONSENT="hdpjoin.analytics-consent.v1";
const allowedPaths={calculator:"/tools/agent-stack-cost/",discover:"/discover/",creators:"/creators/"};
const allowedVariants=new Set(["studio","store","general"]);
const params=new URLSearchParams(window.location.search);
const rawVariant=params.get("variant")||"general";
const variant=allowedVariants.has(rawVariant)?rawVariant:"general";
const validCode=s=>/^[a-z0-9][a-z0-9-]{2,23}$/.test(s||"");
const refCode=validCode(params.get("via")||"")?params.get("via"):"";
const interestNames=new Set(["pilot","studio","community","distribution","store","kit"]);
function analyticsOK(){try{return localStorage.getItem(CONSENT)==="yes"&&typeof window.gtag==="function"}catch(e){return false}}
function track(event,detail){if(analyticsOK())window.gtag("event",event,Object.assign({content_area:"creators",campaign_variant:variant},detail||{}))}
document.querySelectorAll("[data-creator-track]").forEach(el=>el.addEventListener("click",()=>{
 const choice=el.getAttribute("data-creator-track");
 if(!interestNames.has(choice))return;
 track("hdpjoin_creator_interest",{creator_interest_type:choice});
}));
const variantMessage=document.querySelector("[data-creator-variant]");
if(variantMessage){
 const copy={studio:"Make the content. Build the audience. Own the next step.",
 store:"From audience to storefront—without rebuilding your workflow.",
 general:"Create more. Connect better. Turn an audience into opportunity."};
 variantMessage.textContent=copy[variant];
}
if(refCode){document.querySelectorAll("[data-creator-code-display]").forEach(el=>el.textContent=refCode);}
const codeField=document.getElementById("creatorCode");
const typeField=document.getElementById("creatorShareDestination");
const output=document.getElementById("creatorShareUrl");
const createBtn=document.getElementById("creatorGenerateLink");
const copyBtn=document.getElementById("creatorCopyLink");
const example=document.getElementById("creatorSuggestedCaption");
const msg=document.getElementById("creatorShareStatus");
function makeLink(){
 if(!codeField||!typeField||!output)return;
 const code=codeField.value.trim().toLowerCase();
 const target=typeField.value;
 if(!validCode(code)||!Object.prototype.hasOwnProperty.call(allowedPaths,target)){
  output.textContent="Enter the creator code issued by HDP (3–24 lowercase letters, numbers or hyphens).";
  output.dataset.url="";if(copyBtn)copyBtn.disabled=true;return;
 }
 const url=new URL(allowedPaths[target],window.location.origin);
 url.searchParams.set("src","creator");
 url.searchParams.set("via",code);
 url.searchParams.set("variant",variant);
 output.textContent=url.href;output.dataset.url=url.href;
 if(copyBtn)copyBtn.disabled=false;
}
createBtn?.addEventListener("click",()=>{makeLink();track("hdpjoin_creator_kit_action",{action_type:"generate_link"})});
copyBtn?.addEventListener("click",()=>{
 const link=output?.dataset.url;
 if(!link)return;
 if(navigator.clipboard?.writeText){
  navigator.clipboard.writeText(link).then(()=>{if(msg)msg.textContent="Link copied."}).catch(()=>{if(msg)msg.textContent="Select and copy the link above."});
 }else if(msg)msg.textContent="Select and copy the link above.";
 track("hdpjoin_creator_kit_action",{action_type:"copy_link"});
});
if(codeField||typeField){codeField?.addEventListener("input",makeLink);typeField?.addEventListener("change",makeLink);makeLink();}
document.querySelectorAll("[data-creator-copy-caption]").forEach(b=>b.addEventListener("click",()=>{
 const text=example?.innerText||"";
 if(!text)return;
 if(navigator.clipboard?.writeText)navigator.clipboard.writeText(text).then(()=>{if(msg)msg.textContent="Draft copied. Please personalize it before publishing."}).catch(()=>{});
 track("hdpjoin_creator_kit_action",{action_type:"copy_caption"});
}));
})();
