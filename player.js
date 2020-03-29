// Function to use the data from the callback
function __5szm2kaj(data) {

  const htmlTip = data.data.tiplates.tip;           // HTML tip data
  const htmlHoverTip = data.data.tiplates.hoverTip; // HTML hover tip data
  const steps = data.data.structure.steps;          // Steps data
  const styles = data.data.css;                     // CSS data

  // Inject the css from the API endpoint to the head of the HTML page
  const css = document.createElement('style');
  css.type = 'text/css';
  css.appendChild(document.createTextNode(styles));
  document.getElementsByTagName("head")[0].appendChild(css);
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
