/* Service intake on static GitHub Pages. This prepares a mailto draft only; no data is stored or posted by this site. */
(()=>{"use strict";
 document.querySelectorAll("[data-service-inquiry]").forEach(form=>{
   form.addEventListener("submit",event=>{
     event.preventDefault();
     if(!form.reportValidity())return;
     const get=n=>String(new FormData(form).get(n)||"").trim();
     const type=form.dataset.service==="seo"?"SEO services":"Custom app development";
     const subject="HDPJoin "+type+" project inquiry";
     const body=["Hello Highest Degree Priorities,","","I'd like to discuss "+type.toLowerCase()+".","","Name: "+get("name"),"Email: "+get("email"),"Approximate budget: "+get("budget"),"Timing: "+get("timing"),"","Project details:",""+get("details"),"","Please contact me to discuss feasibility and next steps."].join("\n");
     const url="mailto:contact@highestdegreepriorities.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
     // Measure the intent event only if the visitor previously allowed analytics.
     // Do not send names, email addresses, budgets or project descriptions to analytics.
     try{
       if(localStorage.getItem("hdpjoin.analytics-consent.v1")==="yes"&&typeof window.gtag==="function"){
         window.gtag("event","hdpjoin_service_inquiry_prepared",{service:form.dataset.service==="seo"?"seo":"app"});
       }
     }catch(_){}
     const status=form.querySelector("[data-inquiry-status]");
     if(status)status.textContent="Your email draft should open now. Please review and send it from your email app. If no mail app opens, use the direct email link on the left.";
     window.location.href=url;
   });
 });
})();