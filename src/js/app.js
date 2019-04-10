import L from 'leaflet/dist/leaflet-src'
import './components/L.UTFGrid.js'
import './components/L.UTFGridCanvas.js'

var map = new L.Map('map', { 
	      renderer: L.canvas(),
	      center: [-27,134.427656], 
	      zoom: 4,
	      scrollWheelZoom: false,
	      dragging: true,
	      zoomControl: true,
	      doubleClickZoom: false,
	      zoomAnimation: true,
	      maxZoom: 9
	    })

L.tileLayer('https://interactive.guim.co.uk/gis/ihad-test/{z}/{x}/{y}.png', {
            maxZoom: 9,
}).addTo(map);



var InfoBox = L.Control.extend({
            options: {
               position: 'topleft',
               label: ''
            },
            onAdd: function(map) {
                this._container = L.DomUtil.create('div', 'info');
                L.DomUtil.create('h3', '', this._container).innerHTML = this.options.label;
                this._div = L.DomUtil.create('div', '', this._container);
                this.update();
                return this._container;
            },
            update: function(text) {
                if (text == null){
                    text = '<h4>Hover over or <br/> click on a state</h4>';
                }
                this._div.innerHTML = '<h4>' + text + '</h4>';
            }
        });


var info = new InfoBox({label: 'Standard UTF8 Grid'}).addTo(map);

var utfgrid = L.utfGrid('https://interactive.guim.co.uk/gis/ihad-test/{z}/{x}/{y}.grid.json');
utfgrid.addTo(map);

utfgrid.on('click', function(e){
    if (!e.data) return;
    info.update('CLICK: ' + e.data.SA2_NAME16);
});

utfgrid.on('mouseover', function(e){
    info.update('HOVER: ' + e.data.SA2_NAME16);
});

utfgrid.on('mouseout', function(e){
    info.update();
});