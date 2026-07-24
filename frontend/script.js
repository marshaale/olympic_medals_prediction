(() => {
  "use strict";

  /* -----------------------------------------------------------
     FLAP TITLE — cycles random letters before settling, staggered
  ----------------------------------------------------------- */
  function buildFlapTitle(el) {
    const text = el.textContent.trim();
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    el.textContent = "";
    const spans = [];

    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "flap-char" + (ch === " " ? " space" : "");
      span.textContent = ch === " " ? "\u00A0" : ch;
      el.appendChild(span);
      spans.push({ span, target: ch });
    });

    spans.forEach(({ span, target }, i) => {
      if (target === " ") return;
      let ticks = 0;
      const maxTicks = 6 + Math.floor(Math.random() * 6);
      const delay = i * 45;
      setTimeout(() => {
        const interval = setInterval(() => {
          ticks++;
          if (ticks >= maxTicks) {
            span.textContent = target;
            clearInterval(interval);
          } else {
            span.textContent = chars[Math.floor(Math.random() * chars.length)];
          }
        }, 40);
      }, delay);
    });
  }

  /* -----------------------------------------------------------
     FLAP DIGITS — renders a number as flip-card digits
  ----------------------------------------------------------- */
  function renderFlapDigits(container, digitCount) {
    container.innerHTML = "";
    for (let i = 0; i < digitCount; i++) {
      const digit = document.createElement("div");
      digit.className = "flap-digit";
      const face = document.createElement("div");
      face.className = "digit-face";
      face.textContent = "0";
      digit.appendChild(face);
      container.appendChild(digit);
    }
  }

  function animateFlapDigitsTo(container, value) {
    const str = String(Math.max(0, Math.round(value)));
    const padded = str.padStart(Math.max(2, str.length), "0");
    renderFlapDigits(container, padded.length);
    const cells = [...container.children];

    cells.forEach((cell, i) => {
      const face = cell.querySelector(".digit-face");
      cell.classList.add("flipping");
      let ticks = 0;
      const maxTicks = 10 + i * 3;
      const interval = setInterval(() => {
        ticks++;
        face.textContent = Math.floor(Math.random() * 10);
        if (ticks >= maxTicks) {
          clearInterval(interval);
          face.textContent = padded[i];
          cell.classList.remove("flipping");
        }
      }, 45);
    });
  }

  function runLoadingFlaps(container) {
    renderFlapDigits(container, 3);
    [...container.children].forEach((cell, i) => {
      cell.classList.add("flipping");
      const face = cell.querySelector(".digit-face");
      const spin = setInterval(
        () => {
          face.textContent = Math.floor(Math.random() * 10);
        },
        70 + i * 15,
      );
      cell._spin = spin;
    });
    return container;
  }

  function stopLoadingFlaps(container) {
    [...container.children].forEach((cell) => {
      if (cell._spin) clearInterval(cell._spin);
    });
  }

  /* -----------------------------------------------------------
     STATE SWITCHING
  ----------------------------------------------------------- */
  const states = {
    idle: document.getElementById("stateIdle"),
    loading: document.getElementById("stateLoading"),
    success: document.getElementById("stateSuccess"),
    validation: document.getElementById("stateValidation"),
    fault: document.getElementById("stateFault"),
  };

  function showState(name) {
    Object.entries(states).forEach(([key, el]) => {
      el.classList.toggle("is-hidden", key !== name);
    });
  }

  /* -----------------------------------------------------------
     SEASON TOGGLE
  ----------------------------------------------------------- */
  let currentSeason = "summer";
  document.querySelectorAll(".seg-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".seg-btn").forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-checked", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-checked", "true");
      currentSeason = btn.dataset.season;
    });
  });

  /* -----------------------------------------------------------
     FIELD ERROR HELPERS
  ----------------------------------------------------------- */
  const numericFields = [
    "year",
    "athletes",
    "avg_age",
    "avg_height",
    "avg_weight",
    "prev_medals",
    "prev_gold_medals",
    "sports",
    "events",
  ];

  function clearFieldErrors() {
    numericFields.forEach((name) => {
      const wrap = document.querySelector(`.field[data-field="${name}"]`);
      const err = document.getElementById(`err-${name}`);
      if (wrap) wrap.classList.remove("has-error");
      if (err) err.textContent = "";
    });
  }

  function applyFieldError(name, msg) {
    const wrap = document.querySelector(`.field[data-field="${name}"]`);
    const err = document.getElementById(`err-${name}`);
    if (wrap) wrap.classList.add("has-error");
    if (err) err.textContent = msg;
  }

  /* -----------------------------------------------------------
     FORM SUBMIT
  ----------------------------------------------------------- */
  const API_BASE_URL = "https://dsml.sotechho.com";
  const form = document.getElementById("predictForm");
  const runBtn = document.getElementById("runBtn");
  const footerStatus = document.getElementById("footerStatus");
  const loadingFlaps = document.getElementById("loadingFlaps");
  const resultFlaps = document.getElementById("resultFlaps");
  const tierText = document.getElementById("tierText");
  const validationList = document.getElementById("validationList");
  const faultDetail = document.getElementById("faultDetail");

  function fieldLabel(name) {
    const labels = {
      year: "Year",
      athletes: "Athletes sent",
      avg_age: "Avg. age",
      avg_height: "Avg. height",
      avg_weight: "Avg. weight",
      prev_medals: "Previous medals",
      prev_gold_medals: "Previous golds",
      sports: "Sports entered",
      events: "Events entered",
    };
    return labels[name] || name;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearFieldErrors();

    const payload = {
      season: currentSeason,
      year: Number(document.getElementById("year").value),
      athletes: Number(document.getElementById("athletes").value),
      avg_age: Number(document.getElementById("avg_age").value),
      avg_height: Number(document.getElementById("avg_height").value),
      avg_weight: Number(document.getElementById("avg_weight").value),
      prev_medals: Number(document.getElementById("prev_medals").value),
      prev_gold_medals: Number(
        document.getElementById("prev_gold_medals").value,
      ),
      sports: Number(document.getElementById("sports").value),
      events: Number(document.getElementById("events").value),
    };

    runBtn.disabled = true;
    showState("loading");
    runLoadingFlaps(loadingFlaps);
    footerStatus.textContent = "calling model…";

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/predict`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let body = null;
      try {
        body = await res.json();
      } catch (_) {
        body = null;
      }

      stopLoadingFlaps(loadingFlaps);

      if (res.ok && body) {
        showState("success");
        animateFlapDigitsTo(resultFlaps, body.medals ?? 0);
        tierText.textContent = body.country_strength ?? "Unclassified";
        footerStatus.textContent = `200 OK · ${new Date().toLocaleTimeString()}`;
        return;
      }

      if (res.status === 422 && body && Array.isArray(body.detail)) {
        showState("validation");
        validationList.innerHTML = "";
        body.detail.forEach((issue) => {
          const loc = Array.isArray(issue.loc)
            ? issue.loc[issue.loc.length - 1]
            : "field";
          const li = document.createElement("li");
          li.innerHTML = `<b>${fieldLabel(loc)}</b>${issue.msg || "Invalid value"}`;
          validationList.appendChild(li);
          if (numericFields.includes(loc))
            applyFieldError(loc, issue.msg || "Invalid value");
        });
        footerStatus.textContent = `422 · ${body.detail.length} field${body.detail.length === 1 ? "" : "s"} rejected`;
        return;
      }

      // any other non-ok response, including 500 { detail: "..." }
      showState("fault");
      const detail =
        body && typeof body.detail === "string"
          ? body.detail
          : `Request failed with status ${res.status}`;
      faultDetail.textContent = detail;
      footerStatus.textContent = `${res.status} · fault`;
    } catch (err) {
      stopLoadingFlaps(loadingFlaps);
      showState("fault");
      faultDetail.textContent = `Could not reach ${API_BASE_URL}. Check the API is running.`;
      footerStatus.textContent = "network error";
    } finally {
      runBtn.disabled = false;
    }
  });

  /* -----------------------------------------------------------
     INIT
  ----------------------------------------------------------- */
  buildFlapTitle(document.getElementById("flapTitle"));
})();
