let carweekstates = {
    'AK':'alaska',          'AL':'alabama',         'AR':'arkansas',        'AZ':'arizona',         'CA':'california',
    'CO':'colorado',        'CT':'connecticut',     'DE':'delaware',        'FL':'florida',         'GA':'georgia',
    'HI':'hawaii',          'IA':'iowa',            'ID':'idaho',           'IL':'illinois',        'IN':'indiana',
    'KS':'kansas',          'KY':'kentucky',        'LA':'louisiana',       'MA':'massachusetts',   'MD':'maryland',
    'ME':'maine',           'MI':'michigan',        'MN':'minnesota',       'MO':'missouri',        'MS':'mississippi',
    'MT':'montana',         'NC':'northcarolina',   'ND':'northdakota',     'NE':'nebraska',        'NH':'newhampshire',
    'NJ':'newjersey',       'NM':'newmexico',       'NV':'nevada',          'NY':'newyork',         'OH':'ohio',
    'OK':'oklahoma',        'OR':'oregon',          'PA':'pennsylvania',    'RI':'rhodeisland',     'SC':'southcarolina',
    'SD':'southdakota',     'TN':'tennessee',       'TX':'texas',           'UT':'utah',            'VA':'virginia',
    'VT':'vermont',         'WA':'washington',      'WI':'wisconsin',       'WV':'westvirginia',    'WY':'wyoming',
}

google.load('visualization', '1', {'packages': ['geochart']});

document.addEventListener("DOMContentLoaded", function(e) {
  w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if(w > 600) {
    google.setOnLoadCallback(drawVisualization)
  } else {
    drawStateLinkList()
  }
    
  var unscrolltarget = document.getElementById('unscroller')
  if(unscrolltarget != null) {
    unscrolltarget.addEventListener('click', function(e) {
      e.preventDefault();
      scrolltostate();
    })
  }
});
function drawStateLinkList() {
for (let states in carweekstates) {    
  var node = document.createElement("a");
    node.setAttribute('href', 'javascript:scrolltostate("to-' + carweekstates[states] + '")');
    node.text = carweekstates[states];
    document.getElementById("visualization").appendChild(node); 
  };
}

function drawVisualization() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'State');
  data.addColumn('number', 'Index'); 

  var i = 0;
  for (let states in carweekstates) {    
    data.addRows([[{v:"US-" + states,f:"to-" + carweekstates[states]},i++]]);
  };

  var options = {
    legend: 'none',
    displayMode: 'regions',
    resolution: 'provinces',
    region:'US',
    resolution: 'provinces',
    tooltip: {trigger:'none'}  
  };
    
  var data = google.visualization.arrayToDataTable([
          ['Country', 'Popularity'],
          ['NY', 300],
     
        ]);  
    

  var chart = new google.visualization.GeoChart(document.getElementById('visualization')); 

  google.visualization.events.addListener(chart, 'select', function(e) {
    var selection = chart.getSelection();
    if (selection.length == 1) {
      var selectedRow = selection[0].row;
      var selectedRegion = data.getFormattedValue(selection[0].row, 0);
      scrolltostate(selectedRegion)
    }
  });
  chart.draw(data, options);
}

function scrolltostate(e = 'visualization') {
  document.getElementById(e).scrollIntoView(true);  
}