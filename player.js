function loadData() {
  loadScriptFromUrl("https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js");
  loadScriptFromUrl("https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867");
}

function loadScriptFromUrl(url) {
  var jQueryScript = document.createElement("script");
  jQueryScript.src = url;
  document.body.appendChild(jQueryScript);
}

function cleanBreakLines(str) {
  str = str.replace("\n", "");
  str = str.replace("\t", "");
  str = str.replace("\r", "");
  return str;
}

function injectCss(styles) {
  let css  = document.createElement('style');
  css.type = 'text/css';
  css.appendChild(document.createTextNode(styles));
  document.getElementsByTagName("head")[0].appendChild(css);
}

function clearTips()
{ $( ".sttip" ).remove(); }

function updateStepIds(stepsMap, op, prevStack) {
  if (op == "prev") {
    prevStepId = prevStack.pop();
    if (prevStepId !== undefined) { currentStepId = prevStepId; }
  }
  else if (op == "next") {
    nextStepId = stepsMap[currentStepId].followers[0]['next'];
    if (nextStepId !== "eol0") {
      prevStack.push(currentStepId);
      currentStepId = nextStepId;
    }
  }
}

function addButtonsFunctionality(stepsMap, tipTemplate, prevStack) {
  // Insert to the exit button in the header click fuctionalty
  $( "#viewport" ).on("click", "button[aria-label='Close']", function() { clearTips(); } );
  // Insert to the previous button in the footer click fuctionalty
  $( "#viewport" ).on("click", ".prev-btn", function() {
    clearTips(); // remove the previous tip div
    updateStepIds(stepsMap, "prev", prevStack);
    displayTips(stepsMap, tipTemplate);
  });
  // Insert to the next button in the footer click fuctionalty
  $( "#viewport" ).on("click", ".next-btn", function() {
    clearTips(); // remove the previous tip div
    updateStepIds(stepsMap, "next", prevStack);
    displayTips(stepsMap, tipTemplate);
  });
}

// Function to use the data from the callback
function __5szm2kaj(data) {
  const css   = data.data.css;
  const steps = data.data.structure.steps;

  const tipTemplate = data.data.tiplates.tip;
  const hoverTipTemplate = data.data.tiplates.hoverTip;
  const stepsMap  = {}; // a map between steps ids and steps
  const prevStack = []; // stack for keeping track after previous steps

  // Create the steps map, with step id as key and step itself as value
  steps.forEach((step) => {
    // if not assigned yet, mark first step as the current step ID
    if (!currentStepId) { currentStepId = step.id; }
    stepsMap[step.id] = step;
  });

  injectCss(cleanBreakLines(css));
  addButtonsFunctionality(stepsMap, tipTemplate, prevStack);
  displayTips(stepsMap, tipTemplate);
}

// Function to add a tip to the web page, using the tip HTML, and according
// to the current step ID selector location.
function displayTips(stepsMap, tipTemplate) {
  let tipHtml = tipTemplate;
  let currStep = stepsMap[currentStepId];
  let elem = $(currStep.action.selector);
  addTip(elem, tipHtml);
}

function addTip(element, tipTemplate) {
  tipHtml = '<div class="sttip" style="z-index:1000; position:relative;">' +
  '<div class="tooltip">' +
  '<div class="panel-container">' +
   tipTemplate +
   '</div></div></div>';
  element.after(tipHtml);
}

// NOTE: need to find a solution for global variables
let currentStepId;
let prevStepId;
let nextStepId;

loadData();
