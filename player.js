// Function to use the data from the callback
function __5szm2kaj(data) {

  const htmlTip      = data.data.tiplates.tip;      // HTML tip data
  const htmlHoverTip = data.data.tiplates.hoverTip; // HTML hover tip data
  const steps        = data.data.structure.steps;   // Steps data
  const styles       = data.data.css;               // CSS data
  const stepsMap     = {}                           // Object to save all of the steps with their ID as key

  // Inject the css from the API endpoint to the head of the HTML page
  const css = document.createElement('style');
  css.type = 'text/css';
  css.appendChild(document.createTextNode(styles));
  document.getElementsByTagName("head")[0].appendChild(css);

  // Create the steps map, with step id as key and step itself as value
  steps.forEach((item, i) => {
    stepsMap[item.id] = item;
  });

  // At the beginning display the first tip (default is id = "1")
  changeTip(htmlTip, currentStepId, stepsMap, 0, 0);
}

// Function to add a tip to the web page, using the tip HTML, and according
// to the current step ID selector location.
function changeTip(html, stepId, steps, direction, prevId) {

  let currStepObj = steps[stepId];
  let selector    = currStepObj.action.selector;
  let content     = currStepObj.action.contents['#content'];

  // Add the tip HTML after the selector specified loacation
  $( selector + ':last' ).after(html);
  // Add step content into the contant div
  $( "div[data-iridize-id='content']" ).append( content );
}

// Function to load the data from the API endpoint
function loadData() {

  // Add script tag to the body of the html page for using JQuery
  const jQueryScript = document.createElement("script");
  jQueryScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
  document.body.appendChild(jQueryScript);

  // Add script tag to the body of the html page for calling the callback function
  const jsFileScript = document.createElement("script");
  jsFileScript.src = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867";
  document.body.appendChild(jsFileScript);
}

// Global variable to track the current step we are at
let currentStepId = "1";

loadData();
