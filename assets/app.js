/* Mania v3 engine · "La Hora Dorada". Reads window.SITE, window.MENU, window.I18N, window.IMAGES. No dependencies. */
(function () {
  "use strict";
  var S = window.SITE, M = window.MENU, I = window.I18N, IMG = window.IMAGES || {};
  var doc = document, html = doc.documentElement;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  var tableMode = html.classList.contains("table");
  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem("mania:" + k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem("mania:" + k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- language ---------- */
  var LANGS = M.languages;
  var lang = (function () {
    var q = (location.search.match(/[?&]lang=([a-z]{2})/) || [])[1]; if (q && LANGS.indexOf(q) > -1) return q;
    var s = store.get("lang"); if (s && LANGS.indexOf(s) > -1) return s;
    var nav = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < nav.length; i++) { var c = String(nav[i]).slice(0, 2).toLowerCase(); if (c === "nb" || c === "nn") c = "no"; if (LANGS.indexOf(c) > -1) return c; }
    return S.defaultLang || "en";
  })();
  function L(o) { if (o == null) return ""; if (typeof o === "string") return o; return o[lang] != null ? o[lang] : (o.en != null ? o.en : o[Object.keys(o)[0]]); }
  function t(k) { return L(I.ui[k]) || k; }
  function loc() { return I.locale[lang] || lang; }
  var money; function setMoney() { money = new Intl.NumberFormat(loc(), { style: "currency", currency: "EUR", minimumFractionDigits: 2 }); }
  function price(v) { return money.format(v); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fold(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[“”"'’]/g, "").toLowerCase(); }
  function flag(c) { return '<svg class="flag" viewBox="0 0 30 20" aria-hidden="true">' + (I.flags[c] || "") + "</svg>"; }

  /* ---------- media helpers ---------- */
  function src(name, w) { var m = IMG[name]; if (!m) return ""; var b = m.widths.filter(function (x) { return x >= (w || 960); })[0] || m.widths[m.widths.length - 1]; return "images/" + name + "-" + b + ".webp"; }
  function srcset(name) { var m = IMG[name]; return m ? m.widths.map(function (w) { return "images/" + name + "-" + w + ".webp " + w + "w"; }).join(", ") : ""; }
  function vid(name, cls) { // muted looping video with poster; played only while visible
    return '<video class="' + (cls || "") + '" muted playsinline loop preload="none" poster="video/' + name + '.jpg" data-src="video/' + name + '.mp4" aria-hidden="true"></video>';
  }
  var canVideo = !reduced && !saveData;
  var vObs = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting && canVideo) { if (!v.src && v.dataset.src) v.src = v.dataset.src; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else if (!v.paused) v.pause();
    });
  }, { rootMargin: "120px 0px" });
  function watchVideos(root) { $$("video[data-src]", root).forEach(function (v) { vObs.observe(v); }); }

  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="h-fill" d="M12 20s-7.5-4.6-9-9.4C2 7.3 4.2 4.5 7.4 4.5c2 0 3.6 1.2 4.6 2.8 1-1.6 2.6-2.8 4.6-2.8 3.2 0 5.4 2.8 4.4 6.1-1.5 4.8-9 9.4-9 9.4z"/><path class="h-line" d="M12 20s-7.5-4.6-9-9.4C2 7.3 4.2 4.5 7.4 4.5c2 0 3.6 1.2 4.6 2.8 1-1.6 2.6-2.8 4.6-2.8 3.2 0 5.4 2.8 4.4 6.1-1.5 4.8-9 9.4-9 9.4z"/></svg>';
  var IC = {
    phone: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    nav: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 18-8-8 18-2-8z"/></svg>',
    heart: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-9-9.4C2 7.3 4.2 4.5 7.4 4.5c2 0 3.6 1.2 4.6 2.8 1-1.6 2.6-2.8 4.6-2.8 3.2 0 5.4 2.8 4.4 6.1-1.5 4.8-9 9.4-9 9.4z"/></svg>',
    arrow: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* ---------- data ---------- */
  var byN = {}, catOf = {};
  M.categories.forEach(function (c) { c.items.forEach(function (it) { byN[it.n] = it; catOf[it.n] = c; }); });
  var picks = store.get("picks") || {}; Object.keys(picks).forEach(function (n) { if (!byN[n]) delete picks[n]; });
  function pickCount() { return Object.keys(picks).reduce(function (a, n) { return a + picks[n]; }, 0); }
  var telHref = S.phoneDial ? "tel:" + S.phoneDial : null;
  var mapsHref = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(S.coords.lat + "," + S.coords.lng);
  function catMedia(c) { var v = S.videos.categories[c.id]; return { video: v, photo: IMG["cat-" + c.id] ? "cat-" + c.id : null }; }

  /* ---------- "golden hour": page colours follow the scroll (noon -> sunset -> night) ---------- */
  var STOPS = [ // [position, bg, accent]
    [0.00, [244, 238, 227], [30, 159, 174]],
    [0.30, [242, 231, 214], [30, 159, 174]],
    [0.55, [246, 210, 182], [214, 84, 44]],
    [0.72, [214, 124, 92], [255, 214, 140]],
    [0.86, [26, 40, 66], [244, 184, 96]],
    [1.00, [10, 27, 44], [244, 184, 96]]
  ];
  function mix(a, b, k) { return a.map(function (v, i) { return Math.round(v + (b[i] - v) * k); }); }
  var lastNight = null, meta = $('meta[name="theme-color"]');
  function paint() {
    var max = doc.documentElement.scrollHeight - innerHeight, p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    var i = 0; while (i < STOPS.length - 2 && p > STOPS[i + 1][0]) i++;
    var A = STOPS[i], B = STOPS[i + 1], k = (p - A[0]) / (B[0] - A[0]); k = k * k * (3 - 2 * k);
    var bg = mix(A[1], B[1], k), ac = mix(A[2], B[2], k);
    var lum = (0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2]) / 255, night = lum < 0.5;
    html.style.setProperty("--bg", "rgb(" + bg + ")");
    html.style.setProperty("--accent", "rgb(" + ac + ")");
    if (night !== lastNight) { lastNight = night; html.classList.toggle("night", night); html.style.setProperty("--ink", night ? "#F4EEE3" : "#0E2A3D"); }
    meta.content = "rgb(" + bg + ")";
  }

  /* ---------- hero: the logo is a window that opens onto the video ---------- */
  var hero = $("#hero"), heroStage = $(".hero__stage"), heroVideo = $("#heroVideo");
  var portrait = matchMedia("(max-aspect-ratio: 1/1)").matches;
  var heroName = portrait ? S.videos.heroPortrait : S.videos.heroLandscape;
  $("#heroPoster").src = "video/" + heroName + ".jpg";
  if (canVideo) { heroVideo.src = "video/" + heroName + ".mp4"; heroVideo.poster = "video/" + heroName + ".jpg"; heroVideo.play().catch(function () {}); }
  else heroVideo.remove();
  function heroScroll() {
    if (reduced) { heroStage.style.setProperty("--copy", 1); return; }
    var r = hero.getBoundingClientRect(), range = hero.offsetHeight - innerHeight, p = Math.min(1, Math.max(0, -r.top / range));
    var z = Math.pow(p / 0.62, 2.4); z = 1 + Math.min(z, 1) * 38;          // logo grows from 1x to ~39x
    heroStage.style.setProperty("--zoom", z.toFixed(3));
    heroStage.style.setProperty("--mask", Math.max(0, 1 - Math.max(0, p - 0.42) / 0.2).toFixed(3));
    heroStage.style.setProperty("--hint", Math.max(0, 1 - p * 6).toFixed(3));
    heroStage.style.setProperty("--copy", Math.min(1, Math.max(0, (p - 0.58) / 0.22)).toFixed(3));
    html.classList.toggle("past-hero", r.bottom < 80);
    html.classList.toggle("at-top", p < 0.55);
  }

  /* ---------- story: lines light up one by one ---------- */
  var story = $("#story");
  function storyScroll() {
    var r = story.getBoundingClientRect(), range = story.offsetHeight - innerHeight, p = Math.min(1, Math.max(0, -r.top / range));
    story.style.setProperty("--sp", p.toFixed(3));
    var lines = $$(".story__line", story), n = lines.length;
    lines.forEach(function (l, i) { l.classList.toggle("on", reduced || p >= i / n * 0.9); });
  }

  var ticking = false;
  function onScroll() { if (ticking) return; ticking = true; requestAnimationFrame(function () { ticking = false; paint(); heroScroll(); storyScroll(); }); }
  addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll);

  // headings: words slide up when they arrive
  var inObs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); inObs.unobserve(e.target); } }); }, { rootMargin: "0px 0px -15% 0px" });
  $$(".sec__head").forEach(function (h) { inObs.observe(h); });

  /* ---------- render ---------- */
  function dishHTML(it, i, withCat) {
    var on = !!picks[it.n], name = L(it.name);
    var p = it.price != null ? price(it.price) : (it.prices || []).map(function (x) { return price(x.value) + " " + L(x.label); }).join(" · ");
    return '<li class="dish" data-n="' + it.n + '" style="--i:' + (i || 0) + '"><div>' + (withCat ? '<span class="dish__cat">' + esc(L(catOf[it.n].title)) + "</span>" : "") +
      '<h3 class="dish__name"><span class="dish__n">' + it.n + "</span>" + esc(name) + "</h3>" +
      (it.desc ? '<p class="dish__desc">' + esc(L(it.desc)) + "</p>" : "") + (it.detail ? '<span class="dish__detail">' + esc(L(it.detail)) + "</span>" : "") +
      '</div><span class="dish__price">' + p + '</span><button class="heart" aria-pressed="' + on + '" aria-label="' + esc((on ? t("removePick") : t("addPick")) + ": " + name) + '">' + HEART + "</button></li>";
  }
  function renderReel() {
    $("#reel").innerHTML = S.signature.map(function (s) {
      var it = byN[s.n]; if (!it) return ""; var on = !!picks[it.n];
      return '<article class="sig" data-n="' + it.n + '">' + vid(s.video) +
        '<button class="heart" aria-pressed="' + on + '" aria-label="' + esc(t("addPick") + ": " + L(it.name)) + '">' + HEART + "</button>" +
        '<div class="sig__body"><span class="sig__n">Nº ' + it.n + " · " + esc(L(catOf[it.n].title)) + '</span><h3 class="sig__name">' + esc(L(it.name)) + '</h3><span class="sig__price">' + price(it.price) + "</span></div></article>";
    }).join("");
    $("#reelBar").innerHTML = S.signature.map(function (_, i) { return "<i" + (i ? "" : ' class="on"') + "></i>"; }).join("");
    watchVideos($("#reel"));
  }
  $("#reel").addEventListener("scroll", function () {
    var r = this, i = Math.round(r.scrollLeft / (r.firstElementChild.offsetWidth + 12));
    $$("#reelBar i").forEach(function (b, k) { b.classList.toggle("on", k === i); });
  }, { passive: true });

  function renderIndex() {
    $("#index").innerHTML = M.categories.map(function (c, i) {
      var m = catMedia(c), thumb = m.video ? "video/" + m.video + ".jpg" : (m.photo ? src(m.photo, 480) : "");
      var meta = c.items.length ? c.items.length + " " + esc(t("dishes")) : price(c.optionPrice || 0);
      return '<li class="row"><button data-cat="' + c.id + '"><span class="row__n">' + String(i + 1).padStart(2, "0") + '</span><span class="row__name">' + esc(L(c.title)) +
        '</span><span class="row__meta"><span class="lbl">' + meta + "</span>" + (thumb ? '<span class="row__thumb"><img src="' + thumb + '" alt="" loading="lazy" width="54" height="54"></span>' : "") + "</span></button></li>";
    }).join("");
  }

  function renderText() {
    html.lang = lang; setMoney();
    $$("[data-t]").forEach(function (el) { el.textContent = t(el.dataset.t); });
    $$("[data-t-ph]").forEach(function (el) { el.placeholder = t(el.dataset.tPh); });
    $$("[data-c]").forEach(function (el) { el.textContent = L(S.copy[el.dataset.c]); });
    $("#langFlag").innerHTML = I.flags[lang] || ""; $("#langCode").textContent = lang.toUpperCase();
    var r = S.rating, cnt = r.count.toLocaleString(loc()), v = r.value.toLocaleString(loc(), { minimumFractionDigits: 1 });
    var hr = $("#heroRating"); hr.href = S.googleUrl; hr.querySelector(".stars").style.setProperty("--v", r.value); hr.lastElementChild.textContent = v + " · " + cnt + " " + t("reviews");
    $("#ratingNum").textContent = v; $("#ratingStars").style.setProperty("--v", r.value); $("#ratingCount").textContent = cnt + " " + t("reviews");
    $("#tax").textContent = L(M.footnote); $("#mapLabel").textContent = t("openMaps").replace("Google ", "");
    $("#storyLines").innerHTML =
      '<p class="story__line">' + esc(t("since")) + " 1996</p>" +
      '<p class="story__line">' + esc(S.addressShort) + "</p>" +
      '<p class="story__line">' + esc(L(S.copy.heroLine)) + "<small>" + esc(L(S.copy.story)) + "</small></p>";
    if (S.quote) { var qb = $("#quote"); qb.hidden = false; qb.querySelector("p").textContent = "“" + S.quote.text + "”"; qb.querySelector("p").lang = S.quote.lang; qb.querySelector("cite").textContent = S.quote.source + " · " + (I.names[S.quote.lang] || ""); }
    renderHours(); renderFooter(); renderDock(); renderReel(); renderIndex();
    if ($("#q").value) applySearch();
    if (openCat) fillCat(openCat);
    storyScroll();
  }

  function renderFooter() {
    var so = S.socials || {}, links = ['<a href="' + S.googleUrl + '" target="_blank" rel="noopener">Google</a>'];
    if (so.tripadvisor) links.push('<a href="' + so.tripadvisor + '" target="_blank" rel="noopener">Tripadvisor</a>');
    if (so.facebook) links.push('<a href="' + so.facebook + '" target="_blank" rel="noopener">Facebook</a>');
    if (so.instagram) links.push('<a href="' + so.instagram + '" target="_blank" rel="noopener">Instagram</a>');
    $("#socials").innerHTML = links.join("");
    $("#footAddr").textContent = S.address; $("#addr").textContent = S.address; $("#footPhone").textContent = S.phoneDisplay || "";
    var notes = {
      photos: { en: "Food photos and videos are illustrative.", es: "Las fotos y vídeos de los platos son orientativos.", de: "Speisefotos und -videos sind Beispielbilder.", fr: "Photos et vidéos des plats non contractuelles.", it: "Foto e video dei piatti sono indicativi.", nl: "Foto’s en video’s van gerechten ter illustratie.", da: "Billeder og videoer af retterne er vejledende.", sv: "Bilder och videor på rätterna är illustrationer.", no: "Bilder og videoer av rettene er illustrasjoner.", fi: "Ruokien kuvat ja videot ovat suuntaa antavia." },
      allergens: { en: "Allergies? Please ask our staff before ordering.", es: "¿Alergias? Consulta a nuestro personal antes de pedir.", de: "Allergien? Bitte fragen Sie vor der Bestellung unser Personal.", fr: "Allergies ? Demandez à notre équipe avant de commander.", it: "Allergie? Chiedi al nostro staff prima di ordinare.", nl: "Allergieën? Vraag het ons personeel vóór het bestellen.", da: "Allergier? Spørg venligst personalet, før du bestiller.", sv: "Allergier? Fråga vår personal innan du beställer.", no: "Allergier? Spør personalet før du bestiller.", fi: "Allergioita? Kysy henkilökunnaltamme ennen tilaamista." }
    };
    $("#footNotes").innerHTML = "<span>" + esc(L(notes.allergens)) + "</span><span>" + esc(L(notes.photos)) + "</span><span>© " + new Date().getFullYear() + " " + esc(S.name) + "</span>";
    $$(".js-call").forEach(function (a) { if (telHref) a.href = telHref; else a.hidden = true; });
    $("#directions").href = mapsHref; $("#readReviews").href = S.googleUrl; $("#leaveReview").href = S.googleReviewUrl || S.googleUrl;
  }

  function renderDock() {
    var n = pickCount(), out = [];
    if (telHref && !tableMode) out.push('<a href="' + telHref + '"' + (n ? "" : ' class="is-main"') + ">" + IC.phone + '<span class="lbl">' + esc(t("call")) + "</span></a>");
    if (!tableMode) out.push('<a href="' + mapsHref + '" target="_blank" rel="noopener">' + IC.nav + '<span class="lbl">' + esc(t("directions")) + "</span></a>");
    if (n || tableMode) out.push('<button id="dockPicks" class="is-main">' + IC.heart + '<span class="lbl">' + esc(t("picks")) + '</span><span class="dock__count">' + n + "</span></button>");
    $("#dock").innerHTML = out.join("");
    var dp = $("#dockPicks"); if (dp) dp.onclick = openPicks;
  }

  /* ---------- hours ---------- */
  function nowThere() {
    var o = {}; new Intl.DateTimeFormat("en-GB", { timeZone: S.timezone, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
    return { day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday), min: (+o.hour % 24) * 60 + (+o.minute) };
  }
  function toMin(s) { var p = s.split(":"); return +p[0] * 60 + +p[1]; }
  function renderHours() {
    var st = $("#heroStatus"), box = $("#hours"); if (!S.hours) return;
    var n = nowThere(), today = S.hours[n.day] || [], open = null, next = null;
    today.forEach(function (r) { var a = toMin(r[0]), b = toMin(r[1]); if (n.min >= a && n.min < b) open = r; else if (n.min < a && !next) next = r; });
    st.hidden = false; st.className = "status " + (open ? "is-open" : "is-closed");
    st.textContent = open ? t("openNow") + " · " + t("until") + " " + open[1] : t("closedNow") + (next ? " · " + t("opensAt") + " " + next[0] : "");
    var same = [1, 2, 3, 4, 5, 6].every(function (d) { return JSON.stringify(S.hours[d]) === JSON.stringify(S.hours[0]); });
    box.hidden = false;
    box.innerHTML = same ? "<span>" + esc(t("everyDay")) + "</span><span>" + S.hours[0].map(function (x) { return x[0] + "–" + x[1]; }).join(", ") + "</span>" : "<span>" + esc(t("hours")) + "</span><span>" + esc(st.textContent) + "</span>";
  }

  /* ---------- category view ---------- */
  var openCat = null, cv = $("#cv");
  function fillCat(id) {
    var c = M.categories.filter(function (x) { return x.id === id; })[0], i = M.categories.indexOf(c), next = M.categories[i + 1] || M.categories[0], m = catMedia(c);
    var media = $("#cvMedia");
    $$("video, img.cvimg", media).forEach(function (e) { e.remove(); });
    media.insertAdjacentHTML("afterbegin", m.video ? vid(m.video) : (m.photo ? '<img class="cvimg" src="' + src(m.photo, 960) + '" srcset="' + srcset(m.photo) + '" sizes="100vw" alt="">' : ""));
    watchVideos(media);
    $("#cvTitle").textContent = L(c.title);
    $("#cvMeta").textContent = String(i + 1).padStart(2, "0") + " / " + M.categories.length + (c.items.length ? " · " + c.items.length + " " + t("dishes") : "");
    var body = "";
    if (c.note) body += '<p class="cv__note">' + esc(L(c.note)) + "</p>";
    if (c.options) body += '<p class="cv__note"><strong>' + esc(t("choose")) + " · " + price(c.optionPrice) + " " + esc(t("each")) + '</strong></p><ul class="options">' + L(c.options).map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("") + "</ul>";
    else if (c.groups) body += c.groups.map(function (g) { return '<h3 class="group__title">' + esc(L(g.title)) + '</h3><ul class="hits">' + c.items.filter(function (it) { return +it.n >= +g.from && +it.n <= +g.to; }).map(function (it, k) { return dishHTML(it, k); }).join("") + "</ul>"; }).join("");
    else body += '<ul class="hits">' + c.items.map(function (it, k) { return dishHTML(it, k); }).join("") + "</ul>";
    body += '<button class="cv__next" data-cat="' + next.id + '"><span>' + esc(t("next")) + "</span><strong>" + esc(L(next.title)) + "</strong>" + IC.arrow + "</button>";
    $("#cvBody").innerHTML = body;
  }
  function openCategory(id, fromRow) {
    var wasOpen = !!openCat; openCat = id; fillCat(id); $("#cvScroll").scrollTop = 0;
    if (!wasOpen) { cv.classList.add("is-open"); doc.body.style.overflow = "hidden"; try { history.pushState({ cv: id }, "", "#" + id); } catch (e) {} setTimeout(function () { $("#cvClose").focus({ preventScroll: true }); }, 80); }
    else try { history.replaceState({ cv: id }, "", "#" + id); } catch (e) {}
  }
  function closeCategory(fromPop) {
    if (!openCat) return; openCat = null; cv.classList.remove("is-open"); cv.style.removeProperty("--drag"); doc.body.style.overflow = "";
    $$("#cvMedia video").forEach(function (v) { v.pause(); });
    if (!fromPop) try { history.back(); } catch (e) {}
  }
  addEventListener("popstate", function () { if (openCat) closeCategory(true); });
  $("#index").addEventListener("click", function (e) { var b = e.target.closest("button[data-cat]"); if (b) openCategory(b.dataset.cat); });
  $("#cvClose").addEventListener("click", function () { closeCategory(); });
  $("#cvBody").addEventListener("click", function (e) { var b = e.target.closest(".cv__next"); if (b) openCategory(b.dataset.cat); });
  // drag the category view down to close (from the photo header)
  (function () {
    var y0 = 0, dy = 0, t0 = 0, on = false, media = $("#cvMedia");
    media.addEventListener("pointerdown", function (e) { if (e.target.closest("button") || $("#cvScroll").scrollTop > 0) return; on = true; y0 = e.clientY; t0 = e.timeStamp; dy = 0; cv.classList.add("is-dragging"); media.setPointerCapture(e.pointerId); });
    media.addEventListener("pointermove", function (e) { if (!on) return; dy = Math.max(0, e.clientY - y0); cv.style.setProperty("--drag", dy + "px"); });
    media.addEventListener("pointerup", function (e) { if (!on) return; on = false; cv.classList.remove("is-dragging"); if (dy > 140 || dy / Math.max(1, e.timeStamp - t0) > .5) closeCategory(); else cv.style.removeProperty("--drag"); });
  })();

  /* ---------- hearts / picks ---------- */
  doc.addEventListener("click", function (e) {
    var b = e.target.closest(".heart"); if (!b) return;
    var holder = b.closest("[data-n]"), n = holder.dataset.n, on = !picks[n];
    if (on) picks[n] = 1; else delete picks[n]; store.set("picks", picks);
    $$('[data-n="' + n + '"] .heart').forEach(function (h) { h.setAttribute("aria-pressed", on); });
    if (on && navigator.vibrate) try { navigator.vibrate(8); } catch (x) {}
    renderDock();
  });
  function renderPicks() {
    var ns = Object.keys(picks).sort(function (a, b) { return a - b; }), body = $("#picksBody");
    if (!ns.length) { body.innerHTML = '<p class="picks__empty">' + esc(t("picksEmpty")) + "</p>"; return; }
    var total = 0;
    body.innerHTML = '<p class="picks__hint">' + esc(t("picksHint")) + "</p>" + ns.map(function (n) {
      var it = byN[n], q = picks[n], p = it.price != null ? it.price : it.prices[0].value; total += p * q;
      return '<div class="pick" data-n="' + n + '"><div><div class="pick__name"><span class="pick__n">' + n + "</span>" + esc(L(it.name)) + "</div>" + (lang !== "es" ? '<div class="pick__alt">' + esc(it.name.es) + "</div>" : "") + "</div>" +
        '<span class="pick__price">' + price(p * q) + '</span><div class="stepper"><button data-d="-1" aria-label="−">−</button><output>' + q + '</output><button data-d="1" aria-label="+">+</button></div></div>';
    }).join("") + '<div class="picks__total"><span>' + esc(t("total")) + "</span><span>" + price(total) + "</span></div>";
  }
  $("#picksBody").addEventListener("click", function (e) {
    var b = e.target.closest(".stepper button"); if (!b) return; var n = b.closest(".pick").dataset.n;
    picks[n] = (picks[n] || 0) + +b.dataset.d; if (picks[n] <= 0) delete picks[n]; store.set("picks", picks);
    $$('[data-n="' + n + '"] .heart').forEach(function (h) { h.setAttribute("aria-pressed", !!picks[n]); });
    renderPicks(); renderDock();
  });
  var wake = null;
  function openPicks() { renderPicks(); openSheet("sheetPicks"); if ("wakeLock" in navigator) navigator.wakeLock.request("screen").then(function (w) { wake = w; }).catch(function () {}); }

  /* ---------- sheets ---------- */
  var openId = null;
  function openSheet(id) { var s = doc.getElementById(id); openId = id; s.classList.add("is-open"); doc.body.style.overflow = "hidden"; setTimeout(function () { var f = s.querySelector('[aria-current="true"]') || s.querySelector(".sheet__x"); f && f.focus({ preventScroll: true }); }, 60); }
  function closeSheet() { if (!openId) return; var s = doc.getElementById(openId); s.classList.remove("is-open"); s.style.removeProperty("--drag"); if (openId === "sheetPicks" && wake) { wake.release().catch(function () {}); wake = null; } openId = null; if (!openCat) doc.body.style.overflow = ""; }
  $$(".sheet").forEach(function (s) {
    s.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closeSheet(); });
    var g = s.querySelector(".sheet__grab"), y0 = 0, dy = 0, on = false;
    g.addEventListener("pointerdown", function (e) { on = true; y0 = e.clientY; dy = 0; s.classList.add("is-dragging"); g.setPointerCapture(e.pointerId); });
    g.addEventListener("pointermove", function (e) { if (on) { dy = Math.max(0, e.clientY - y0); s.style.setProperty("--drag", dy + "px"); } });
    g.addEventListener("pointerup", function () { on = false; s.classList.remove("is-dragging"); if (dy > 110) closeSheet(); else s.style.removeProperty("--drag"); });
  });
  doc.addEventListener("keydown", function (e) { if (e.key !== "Escape") return; if ($("#lb").classList.contains("is-open")) closeLb(); else if (openId) closeSheet(); else if (openCat) closeCategory(); });

  /* ---------- language ---------- */
  function renderLangs() { $("#langs").innerHTML = LANGS.map(function (l) { return '<li><button data-lang="' + l + '" lang="' + l + '" aria-current="' + (l === lang) + '">' + flag(l) + "<span>" + esc(M.languageNames[l] || I.names[l]) + "</span></button></li>"; }).join(""); }
  $("#openLang").addEventListener("click", function () { renderLangs(); openSheet("sheetLang"); });
  $("#langs").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; closeSheet(); if (b.dataset.lang !== lang) { lang = b.dataset.lang; store.set("lang", lang); renderText(); } });

  /* ---------- search (flat results across the whole menu) ---------- */
  var q = $("#q");
  function hl(text, term) { if (!term) return esc(text); var i = fold(text).indexOf(term); return i < 0 ? esc(text) : esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + term.length)) + "</mark>" + esc(text.slice(i + term.length)); }
  function applySearch() {
    var term = fold(q.value.trim()), box = $("#hitsBox");
    $("#index").hidden = !!term; box.hidden = !term; if (!term) return;
    var hits = Object.keys(byN).map(function (n) { return byN[n]; }).filter(function (it) {
      return fold([it.n, L(it.name), L(it.desc), it.name.es, it.name.en, L(catOf[it.n].title)].join(" ")).indexOf(term) > -1 || it.n === term.padStart(it.n.length, "0");
    });
    $("#hits").innerHTML = hits.map(function (it, i) { return dishHTML(it, i, true); }).join("");
    $$("#hits .dish").forEach(function (li) { var it = byN[li.dataset.n]; li.querySelector(".dish__name").innerHTML = '<span class="dish__n">' + it.n + "</span>" + hl(L(it.name), term); var d = li.querySelector(".dish__desc"); if (d) d.innerHTML = hl(L(it.desc), term); });
    $("#hitsNote").textContent = hits.length ? hits.length + " " + t("dishes") : "";
    var em = $("#empty"); em.hidden = !!hits.length; em.textContent = t("noResults") + " “" + q.value.trim() + "”";
  }
  q.addEventListener("input", applySearch);
  q.addEventListener("keydown", function (e) { if (e.key === "Enter") q.blur(); });

  /* ---------- static sections ---------- */
  var storyName = S.videos.story;
  $("#storyPoster").src = "video/" + storyName + ".jpg";
  var sv = $("#storyVideo"); if (canVideo) { sv.dataset.src = "video/" + storyName + ".mp4"; vObs.observe(sv); } else sv.remove();
  var g = S.images.guests || [];
  $("#strip").innerHTML = g.map(function (n, i) { return '<button data-i="' + i + '" aria-label="' + (i + 1) + "/" + g.length + '"><img src="' + src(n, 480) + '" srcset="' + srcset(n) + '" sizes="(min-width:900px) 300px, 64vw" alt="" loading="lazy"></button>'; }).join("");
  $("#strip").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) openLb(g.map(function (n) { return src(n, 1600); }), +b.dataset.i); });
  $("#mapImg").src = src(S.images.findUs, 960);
  $("#loadMap").addEventListener("click", function () { var f = doc.createElement("iframe"); f.loading = "lazy"; f.title = t("findUs"); f.src = "https://maps.google.com/maps?q=" + S.coords.lat + "," + S.coords.lng + "&z=17&output=embed&hl=" + lang; $("#map").appendChild(f); this.remove(); });
  $("#openPages").addEventListener("click", function () { var l = []; for (var i = 1; i <= S.menuPages; i++) l.push("menu-pages/" + lang + "-" + i + ".webp"); openLb(l, 0, true); });

  /* ---------- lightbox ---------- */
  function openLb(list, start, pages) {
    var lb = $("#lb"), tr = $("#lbTrack"); lb.classList.toggle("lb--pages", !!pages);
    tr.innerHTML = list.map(function (s) { return '<div class="lb__slide"><img src="' + s + '" alt="" decoding="async"></div>'; }).join("");
    lb.classList.add("is-open"); doc.body.style.overflow = "hidden"; requestAnimationFrame(function () { if (!pages) tr.scrollLeft = tr.clientWidth * (start || 0); });
  }
  function closeLb() { $("#lb").classList.remove("is-open"); if (!openCat && !openId) doc.body.style.overflow = ""; }
  $("#lbClose").addEventListener("click", closeLb);

  /* ---------- "See the menu": the menu grows out of the tapped button (from v2) ---------- */
  function toMenu(instant) { var y = $("#menu").getBoundingClientRect().top + scrollY - 40; scrollTo({ top: y, behavior: instant || reduced ? "auto" : "smooth" }); }
  var busy = false;
  $("#ctaMenu").addEventListener("click", function (e) {
    e.preventDefault(); var rv = $("#reveal");
    if (reduced || !rv.animate || busy) return toMenu();
    busy = true; var r = this.getBoundingClientRect(), x = e.clientX || r.left + r.width / 2, y = e.clientY || r.top + r.height / 2;
    var R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 2; rv.classList.add("is-on");
    var grow = rv.animate([{ clipPath: "circle(0px at " + x + "px " + y + "px)" }, { clipPath: "circle(" + R + "px at " + x + "px " + y + "px)" }], { duration: 520, easing: "cubic-bezier(.77,0,.175,1)", fill: "both" });
    grow.onfinish = function () {
      toMenu(true); paint();
      var rows = $$("#menu .sec__title, #menu .tools, #index .row").slice(0, 8);
      rows.forEach(function (el, i) { el.animate([{ transform: "translateY(26px)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 420, delay: 60 + i * 45, easing: "cubic-bezier(.23,1,.32,1)", fill: "backwards" }); });
      var fade = rv.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: "cubic-bezier(.23,1,.32,1)" });
      fade.onfinish = function () { grow.cancel(); rv.classList.remove("is-on"); busy = false; };
    };
  });

  /* ---------- intro (kept from v2) ---------- */
  function runIntro() {
    var intro = $(".intro"); if (!html.classList.contains("intro-on") || !intro.animate) { html.classList.remove("intro-on"); return; }
    var logo = $(".intro .logo"), path = $(".intro__line path"), len = path.getTotalLength();
    path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
    logo.animate([{ transform: "translateY(14px)", opacity: 0, clipPath: "inset(0 0 100% 0)" }, { transform: "none", opacity: 1, clipPath: "inset(0 0 0% 0)" }], { duration: 500, easing: "cubic-bezier(.23,1,.32,1)", fill: "both" });
    path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 520, delay: 100, easing: "cubic-bezier(.77,0,.175,1)", fill: "both" });
    var out = intro.animate([{ transform: "none" }, { transform: "translateY(-112%)" }], { duration: 650, delay: 720, easing: "cubic-bezier(.87,0,.13,1)", fill: "both" });
    out.onfinish = function () { html.classList.remove("intro-on"); };
    intro.addEventListener("click", function () { out.finish(); }, { once: true });
  }

  /* ---------- boot ---------- */
  renderText(); onScroll(); runIntro();
  if (tableMode) setTimeout(function () { toMenu(true); }, 0);
  var h = location.hash.slice(1); if (h && M.categories.some(function (c) { return c.id === h; })) setTimeout(function () { toMenu(true); openCategory(h); }, 50);
  if ("serviceWorker" in navigator && location.protocol === "https:") addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
})();
