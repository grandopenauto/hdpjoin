(()=>{"use strict";const $=id=>document.getElementById(id),fmt=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),pct=n=>(n*100).toLocaleString("en-US",{maximumFractionDigits:1})+"%";
const fields=["orderValue","orderCount","grossMargin","monthlyFixed","marketplacePercent","processorPercent","processorFixed","agentUnit","orchestrationUnit","voiceUnit","smsUnit"];
const switches=["marketplaceEnabled","processorEnabled","agentEnabled","orchestrationEnabled","voiceEnabled","smsEnabled"];
const defaults=Object.fromEntries([...fields,...switches].map(id=>[id,$(id).type==="checkbox"?$(id).checked:$(id).value]));
function read(id){const v=Number($(id).value);return Number.isFinite(v)?Math.max(0,v):0}function active(id){return $(id).checked}
function calc(){
 const price=read("orderValue"),count=Math.max(1,Math.round(read("orderCount"))),margin=Math.min(100,read("grossMargin"))/100,fixed=read("monthlyFixed");
 const entries=[
  {name:"Marketplace",value:active("marketplaceEnabled")?price*Math.min(read("marketplacePercent"),100)/100:0},
  {name:"Payment processing",value:active("processorEnabled")?price*Math.min(read("processorPercent"),100)/100+read("processorFixed"):0},
  {name:"AI model / agent",value:active("agentEnabled")?read("agentUnit"):0},
  {name:"Automation / routing",value:active("orchestrationEnabled")?read("orchestrationUnit"):0},
  {name:"Voice / telephony",value:active("voiceEnabled")?read("voiceUnit"):0},
  {name:"Messages",value:active("smsEnabled")?read("smsUnit"):0},
  {name:"Allocated subscriptions",value:fixed/count}
 ];
 const sum=entries.reduce((a,x)=>a+x.value,0),monthly=sum*count,gross=price*margin*count,remaining=gross-monthly;
 return {price,count,margin,fixed,entries,sum,monthly,gross,remaining,share:price?sum/price:0};
}
function render(){
 for(const id of ["marketplace","processor","agent","orchestration","voice","sms"]){
 const disabled=!active(id+"Enabled"),el=$(id+"Enabled")?.closest(".layer-row");
 if(el){el.setAttribute("aria-disabled",String(disabled));el.querySelectorAll('input[type="number"]').forEach(x=>x.disabled=disabled);}
 }
 const o=calc();
 $("costPerOrder").textContent=fmt.format(o.sum);$("techPercent").textContent=pct(o.share);
 $("totalMonthly").textContent=fmt.format(o.monthly);
 $("remainingMonthly").textContent=fmt.format(o.remaining);
 $("remainingMonthly").classList.toggle("negative",o.remaining<0);
 const max=Math.max(...o.entries.map(x=>x.value),.01);
 $("costBars").replaceChildren(...o.entries.filter(x=>x.value>0).map(e=>{
 const group=document.createElement("div");
 const heading=document.createElement("div");heading.className="calc-bar-label";
 const name=document.createElement("span");name.textContent=e.name;
 const value=document.createElement("span");value.textContent=fmt.format(e.value);
 heading.append(name,value);
 const track=document.createElement("div");track.className="calc-bar-track";
 const fill=document.createElement("div");fill.className="calc-bar-fill";fill.style.width=(e.value/max*100).toFixed(1)+"%";
 track.append(fill);group.append(heading,track);return group;
 }));
 $("formulaExplanation").textContent=fmt.format(o.sum)+" per order × "+o.count.toLocaleString("en-US")+" orders = "+fmt.format(o.monthly)+" monthly modeled technology cost. Estimated gross profit before modeled technology fees: "+fmt.format(o.gross)+".";
 const warn=$("lossWarning");
 warn.hidden=o.remaining>=0&&o.share<=1;
 if(!warn.hidden)warn.textContent=o.remaining<0?"Under these assumptions, modeled technology costs exceed gross profit before these fees. Simplify the stack or reassess pricing and margins.":"Under these assumptions, modeled fees exceed the order price. Review which layers are truly incremental.";
 $("calcNotice").textContent="Updated instantly using your inputs. Calculations stay in this browser.";
}
function summary(){
 const o=calc();
 return ["HDPJoin · Illustrative Agent Stack Cost Scenario","NOT A PROVIDER QUOTE","Order value: "+fmt.format(o.price),"Orders per month: "+o.count,"Gross margin before modeled fees: "+pct(o.margin),"Monthly subscriptions: "+fmt.format(o.fixed),"","Per-order cost by layer:",...o.entries.map(e=>"- "+e.name+": "+fmt.format(e.value)),"","Modeled technology cost per order: "+fmt.format(o.sum),"Technology share of order: "+pct(o.share),"Monthly modeled technology spend: "+fmt.format(o.monthly),"Monthly gross profit remaining after modeled fees: "+fmt.format(o.remaining),"","Excluded: taxes, overhead, returns, acquisition, staff time and unmodeled expenses. Charges may be bundled—avoid double-counting."].join("\n");
}
$("stackForm").addEventListener("input",render);
$("stackForm").addEventListener("change",render);
$("resetCosts").addEventListener("click",()=>{for(const [id,v] of Object.entries(defaults)){if($(id).type==="checkbox")$(id).checked=v;else $(id).value=v;}render();$("calcNotice").textContent="Illustrative example restored.";});
$("copyCosts").addEventListener("click",async()=>{
 try{await navigator.clipboard.writeText(summary());$("calcNotice").textContent="Scenario summary copied. Rates are illustrative, not provider quotes.";}
 catch(err){$("calcNotice").textContent="Clipboard unavailable. Please try again in a secure browser context.";}
});
render();
})();