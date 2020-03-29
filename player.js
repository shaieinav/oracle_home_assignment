// Use the data from the callback
function __5szm2kaj(data) {

  let html = data.data.tiplates.tip;
  let styles = data.data.css;
  let steps = data.data.structure.steps;
}

// Loading the data and adding it using a script tag to the body of the html page
function loadData() {

  let jsFileScript = document.createElement("script");
  jsFileScript.src = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867";
  document.body.appendChild(jsFileScript);
}

loadData();
