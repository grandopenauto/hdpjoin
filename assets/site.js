/* HDPJoin discovery navigation, consent-aware analytics and editorial interactions. */
(()=>{"use strict";
 const nav=document.getElementById("primaryNav"), menu=document.getElementById("menuToggle");
 menu?.addEventListener("click",()=>{const open=nav?.classList.toggle("open");menu.setAttribute("aria-expanded",String(Boolean(open)));});
 nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu?.setAttribute("aria-expanded","false");}));
 const hero=document.querySelector(".hero");
 if(hero){
   // Load the photographic replacement only after the WebP exists on Pages.
   // A missing asset leaves the original illustrated hero fully functional.
   const desktop=new Image();
   desktop.onload=()=>{
     hero.classList.add("photo-ready");
     if(window.matchMedia("(max-width: 770px)").matches){
       const mobile=new Image();
       mobile.onload=()=>hero.classList.add("photo-mobile");
       mobile.src="/assets/images/manifested-miracles-mobile.webp";
     }
   };
   desktop.src="/assets/images/manifested-miracles-hero.webp";
 }
 const choices={
  start:{title:"Explore an entire business model",detail:"See how business blueprints combine websites, customer acquisition, fulfillment and support. You can customize the package instead of buying every capability at once.",label:"Explore Business OS options",url:"https://www.highestdegreepriorities.com/?utm_source=hdpjoin&utm_medium=referral&utm_campaign=discovery_start#catalog"},
  task:{title:"Start with one useful task",detail:"You may only need one workflow check, website task, lead follow-up improvement or specialist deliverable. Start small and expand only when justified.",label:"Browse individual tasks",url:"https://www.highestdegreepriorities.com/tasks/?utm_source=hdpjoin&utm_medium=referral&utm_campaign=discovery_task"},
  existing:{title:"Improve the business you already operate",detail:"First identify the bottleneck: lead intake, handoffs, sales, information flow or fulfillment. Then choose focused improvements or broader operating infrastructure.",label:"Evaluate your next improvement",url:"/learn/automation-readiness/"},
  learn:{title:"Learn the basics before choosing",detail:"Explore plain-English comparisons that help you decide between a task, software tools and a connected operating system.",label:"Read the practical guides",url:"/learn/"}
 };
 const advisor=document.querySelector("[data-advisor]");
 if(advisor){
  const result=document.getElementById("advisorResult");
  advisor.querySelectorAll("[data-advisor-choice]").forEach(b=>b.addEventListener("click",()=>{
   const key=b.dataset.advisorChoice,item=choices[key];if(!item)return;
   advisor.querySelectorAll("[data-advisor-choice]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));
   const h=document.createElement("h4"),p=document.createElement("p"),a=document.createElement("a");
   h.textContent=item.title;p.textContent=item.detail;a.className="btn btn-dark";a.href=item.url;a.textContent=item.label+" →";a.dataset.track="advisor_"+key;
   result.replaceChildren(h,p,a);result.hidden=false;
   track("discovery_path_selected",{path:key,content_area:contentArea(),entry_source:entrySource});
  }));
 }
 const STORAGE="hdpjoin.analytics-consent.v1";
 function setStored(value){try{localStorage.setItem(STORAGE,value)}catch(_){}}
 function getStored(){try{return localStorage.getItem(STORAGE)}catch(_){return null}}
 let analyticsAllowed=getStored()==="yes";
 function beginAnalytics(){
   if(!analyticsAllowed||window.__hdpjGtagLoaded)return;
   window.__hdpjGtagLoaded=true;window.dataLayer=window.dataLayer||[];
   window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
   window.gtag("js",new Date());window.gtag("config","G-2ZD9GMMZ36",{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});
   const s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id=G-2ZD9GMMZ36";document.head.appendChild(s);
 }
 function track(name,details){if(analyticsAllowed&&typeof window.gtag==="function")window.gtag("event",name,details||{});}
 if(analyticsAllowed)beginAnalytics();
 const banner=document.getElementById("consentBanner");
 if(banner){banner.hidden=getStored()!==null;banner.querySelectorAll("[data-consent]").forEach(b=>b.addEventListener("click",()=>{
    const hadAnalytics=getStored()==="yes";analyticsAllowed=b.dataset.consent==="yes";setStored(analyticsAllowed?"yes":"no");banner.hidden=true;if(analyticsAllowed){beginAnalytics();track("hdpjoin_visit_context",{content_area:contentArea(),entry_source:entrySource});}else if(hadAnalytics)location.reload();
  }));}
 // First-party event taxonomy: keep browser tracking consent-gated and free of personal data.
 const trackedDestinations=["www.highestdegreepriorities.com","highestdegreepriorities.com","saco.highestdegreepriorities.com","enterprisesystemsfactory.com"];
 const allowedEntrySources=new Set(["billboard","qr","linkedin","print","email","social","organic","direct"]);
 const incomingSrc=new URLSearchParams(location.search).get("src");
 const entrySource=allowedEntrySources.has(incomingSrc)?incomingSrc:"unspecified";
 const safeLabel=v=>/^[a-z0-9_]{1,64}$/.test(v||"")?v:"other";
 function contentArea(){
   const path=location.pathname;
   if(path.startsWith("/learn/"))return "learn";
   if(path.startsWith("/updates/"))return "updates";
   if(path.startsWith("/discover/"))return "discover";
   if(path.startsWith("/tools/"))return "tools";
   if(path.startsWith("/videos/"))return "videos";
   return path==="/"?"home":"other";
 }
 if(analyticsAllowed)track("hdpjoin_visit_context",{content_area:contentArea(),entry_source:entrySource});
 document.addEventListener("click",e=>{
   const anchor=e.target.closest("a[href]");
   if(!anchor)return;
   const url=anchor.getAttribute("href")||"";
   const label=safeLabel(anchor.dataset.track);
   if(url.startsWith("mailto:")){
     if(url.includes("HDPJoin%20Updates%20Opt-In%20Request")){
       track("hdpjoin_newsletter_interest",{method:"email_request",content_area:contentArea(),entry_source:entrySource});
     }else track("hdpjoin_contact_interest",{content_area:contentArea(),entry_source:entrySource});
     return;
   }
   if(url.startsWith("#"))return;
   let parsed;
   try{parsed=new URL(url,location.href)}catch(_){return;}
   const target=parsed.hostname.toLowerCase();
   if(trackedDestinations.includes(target)){
     let destination="other";
     if(target==="enterprise"+"systemsfactory.com")destination="esf";
     else if(target.startsWith("saco."))destination="saco";
     else if(parsed.pathname.startsWith("/tasks/")||parsed.pathname.startsWith("/task/"))destination="tasks";
     else if(parsed.pathname.startsWith("/business/")||parsed.hash==="#catalog")destination="business_os";
     else destination="hdp_general";
     track("hdpjoin_handoff",{destination,cta:label,content_area:contentArea(),entry_source:entrySource});
   }else if(parsed.origin===location.origin&&anchor.dataset.track){
     track("hdpjoin_content_click",{cta:label,content_area:contentArea(),entry_source:entrySource});
   }else if(anchor.dataset.track){
     track("hdpjoin_navigation",{destination:label,content_area:contentArea()});
   }
 });

 document.querySelectorAll("[data-analytics-settings]").forEach(b=>b.addEventListener("click",()=>{if(banner)banner.hidden=false;}));
 // Curated video embeds can be enabled only after a verified video ID is added to the markup.
 document.querySelectorAll("[data-youtube-id]").forEach(el=>{
  const id=el.dataset.youtubeId||"";
  if(!/^[a-zA-Z0-9_-]{11}$/.test(id))return;
  const button=el.querySelector("[data-load-video]");
  button?.addEventListener("click",()=>{
   const iframe=document.createElement("iframe");
   iframe.src="https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1";
   iframe.className="responsive-embed";iframe.loading="lazy";iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";iframe.allowFullscreen=true;iframe.title=el.dataset.videoTitle||"HDPJoin video";
   el.replaceChildren(iframe);track("video_play",{video:id});
  });
 });
})();