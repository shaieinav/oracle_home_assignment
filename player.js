// Function to use the data from the callback
function __5szm2kaj(data) {

  const htmlTip      = data.data.tiplates.tip;      // HTML tip data
  const htmlHoverTip = data.data.tiplates.hoverTip; // HTML hover tip data
  const steps        = data.data.structure.steps;   // Steps data
  const styles       = data.data.css;               // CSS data
  const stepsMap     = {}                           // Object to save all of the steps with their ID as key
  const prevStack    = [];                          // Array to be used as a stack to keep track for previous step ID
  const lastStep     = 'eol0';                      // ID of last step

  let currentStepId;
  let prevStepId;
  let nextStepId;

  // Inject the css from the API endpoint to the head of the HTML page
  const css = document.createElement('style');
  css.type = 'text/css';
  css.appendChild(document.createTextNode(styles));
  document.getElementsByTagName("head")[0].appendChild(css);

  // Create the steps map, with step id as key and step itself as value
  steps.forEach((step) => {
    // if not assigned yet, mark first step as the current step ID
    if (!currentStepId) { currentStepId = step.id; }
    stepsMap[step.id] = step;
  });

  // Insert to the exit button in the header click fuctionalty
  $( "#viewport" ).on("click", "button[data-iridize-role='closeBt']", function() {
    // remove the tip div from the page
    $( "div[role='region']" ).remove();
  });

  // Insert to the previous button in the footer click fuctionalty
  $( "#viewport" ).on("click", ".prev-btn", function() {

    prevStepId = prevStack.pop();

    if (prevStepId !== undefined) {
      currentStepId = prevStepId;
      displayTip(htmlTip, prevStepId, stepsMap, lastStep);
    }
  });

  // Insert to the next button in the footer click fuctionalty
  $( "#viewport" ).on("click", ".next-btn", function() {

    nextStepId = stepsMap[currentStepId].followers[0]['next'];

    if (nextStepId !== lastStep) {
      prevStack.push(currentStepId);
      currentStepId = nextStepId;
      displayTip(htmlTip, nextStepId, stepsMap, lastStep);
    }
  });

  // At the beginning display the first tip (default is the first id found by stepsMap)
  displayTip(htmlTip, currentStepId, stepsMap, lastStep);
}

// Function to add a tip to the web page, using the tip HTML, and according
// to the current step ID selector location.
function displayTip(htmlTip, currentStepId, stepsMap, lastStep) {

  // remove the previous tip div from the page
  $( "div[role='region']" ).remove();

  // Find the current step selector and content
  let currStepObj = stepsMap[currentStepId];
  let selector    = currStepObj.action.selector;
  let content     = currStepObj.action.contents['#content'];

  // Add the tip HTML after the selector specified loacation
  $( selector + ':last' ).after(htmlTip);
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

loadData();
