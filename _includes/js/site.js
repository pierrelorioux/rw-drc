
var m;
var mm = com.modestmaps;
var baselayer = 'mapbox.natural-earth-1';
var baselayer2 = 'reliefweb.drc-admin1_9e855d';
var borders = 'reliefweb.un-borders-dark';
var security = 'djohnson.sec-all-jan11-2';
var IDP = 'djohnson.idp-mar-11';
var activeLayer = 'djohnson.idp-mar-11';
var layers = [
        baselayer,
        baselayer2,
        borders,
        activeLayer
    ].join(','); 

 
wax.tilejson('http://api.tiles.mapbox.com/v2/' + layers + '.jsonp', function(tilejson) {
	    m = new mm.Map('map', new wax.mm.connector(tilejson), null, [
	        new mm.MouseHandler(),
	        new mm.TouchHandler()
	        ]
	    );
	    m.setCenterZoom(new mm.Location(-1,24), 6);
	    tilejson.attribution = 'Powered by open source <a href="http://tilemill.com" target="_blank"> TileMill</a> ';
	    wax.mm.legend(m, tilejson).appendTo(m.parent);
	    wax.mm.interaction(m, tilejson);
	    wax.mm.attribution(m, tilejson).appendTo(m.parent);
	    wax.mm.zoomer(m, tilejson).appendTo($('#controls')[0]);
	    wax.mm.bwdetect(m, {
	        auto: true,
	        png: '.png64?'
	    });
	});

function refreshMap(layers) {
    wax.tilejson('http://api.tiles.mapbox.com/v2/' + layers + '.jsonp', function (tilejson) {
        tilejson.minzoom = 2;
        tilejson.maxzoom = 6;
        m.setProvider(new wax.mm.connector(tilejson));
        $('.wax-legends').remove();
        wax.mm.legend(m, tilejson).appendTo(m.parent);
        interaction.remove();
        wax.mm.interaction(m, tilejson);
    });
}

  // Embed Code
    $('a.share').click(function(e){
        e.preventDefault();
        $('#share, #overlay').addClass('active');

        var twitter = 'http://twitter.com/intent/tweet?status=' +
        '1,000 Days Interactive Map ' + encodeURIComponent(window.location);
        var facebook = 'https://www.facebook.com/sharer.php?t=1000%20Days%20Interactive%20Map&u=' +
        encodeURIComponent(window.location);

        document.getElementById('twitter').href = twitter;
        document.getElementById('facebook').href = facebook;

        var center = m.pointLocation(new mm.Point(m.dimensions.x/2,m.dimensions.y/2));
        var embedUrl = 'http://api.tiles.mapbox.com/v2/' + layers + '/mm/zoompan,tooltips,legend,bwdetect.html#' + m.coordinate.zoom +
                        '/' + center.lat + '/' + center.lon;
        $('#embed-code-field textarea').attr('value', '<iframe src="' + embedUrl +
            '" frameborder="0" width="650" height="500"></iframe>');

        $('#embed-code')[0].tabindex = 0;
        $('#embed-code')[0].select();
    });

    // Trigger close buttons with the escape key
    $(document.documentElement).keydown(function (e) {
        if (e.keyCode === 27) { $('a.close').trigger('click'); }
    });

    $('a.close').click(function (e) {
        e.preventDefault();
        $('#share, #overlay').removeClass('active');
    });

// TODO: Change this
$(document).ready(function () {

    // Layer Selection
    $('ul.layers li a').click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass('active')) {
            $('ul.layers li a').removeClass('active');
            $(this).addClass('active');
            var activeLayer = $(this).attr('data-layer');
            layers = [
                baselayer,
                baselayer2,
                activeLayer,
                borders,
               
            ];
            refreshMap(layers);
        }
    });

    // Embed Code
    $('a.share').click(function(e){
        e.preventDefault();
        $('#share, #overlay').addClass('active');

        var twitter = 'http://twitter.com/intent/tweet?status=' +
        '1,000 Days Interactive Map ' + encodeURIComponent(window.location);
        var facebook = 'https://www.facebook.com/sharer.php?t=1000%20Days%20Interactive%20Map&u=' +
        encodeURIComponent(window.location);

        document.getElementById('twitter').href = twitter;
        document.getElementById('facebook').href = facebook;

        var center = m.pointLocation(new mm.Point(m.dimensions.x/2,m.dimensions.y/2));
        var embedUrl = 'http://api.tiles.mapbox.com/v2/' + layers + '/mm/zoompan,tooltips,legend,bwdetect.html#' + m.coordinate.zoom +
                        '/' + center.lat + '/' + center.lon;
        $('#embed-code-field textarea').attr('value', '<iframe src="' + embedUrl +
            '" frameborder="0" width="650" height="500"></iframe>');

        $('#embed-code')[0].tabindex = 0;
        $('#embed-code')[0].select();
    });

    // Trigger close buttons with the escape key
    $(document.documentElement).keydown(function (e) {
        if (e.keyCode === 27) { $('a.close').trigger('click'); }
    });

    $('a.close').click(function (e) {
        e.preventDefault();
        $('#share, #overlay').removeClass('active');
    });
});



/*-----------------
Slider
-----------------*/
$(function () {

  // load sliders
  var famineSlider = new Dragdealer('slider', {
    x: 0,
    animationCallback: function(x, y) {
      if(x <= 0.2) { $('div#slide-bar').html('May 11'); }
      if(x > 0.2 || x >= 0.4) { $('div#slide-bar').html('Jun 11'); }
      if(x > 0.4 || x >= 0.6) { $('div#slide-bar').html('Jul 11'); }
      if(x > 0.6 || x >= 0.8) { $('div#slide-bar').html('Aug 11'); }
      if(x > 0.8) { $('div#slide-bar').html('Sep 11'); }

      if(x <= 0.5) {
        $('div#mFamineProj img').css('opacity', '0');
        $('div#mFaminePrev img').css('opacity', String(-2 * (x - 0.5)));
        $('div#mFamineCur img').css('opacity', '1');
      }
      if(x > 0.5) {
        $('div#mFaminePrev img').css('opacity', '0');
        $('div#mFamineCur img').css('opacity', String(-2 * ((x - 0.5) - 0.5)));
        $('div#mFamineProj img').css('opacity', '1');
      }
    }
  });
  
 /*
  
  // Define default map settings
  var mm = com.modestmaps,
    step = 0,
    mFaminePrev,
    mFamineCur,
    mFamineProj,
    mDrought10,
    mDrought11,
    mConflictbg,
    mConflict,
    mCommit,
    overlays;
*/

  //Build urlBase
  function tj(l) {
    var base = _.map(['a', 'b', 'c', 'd'], function (sub) {
        return 'http://' + sub + '.tiles.mapbox.com/mapbox/v2/' + l + '/';
      }),
    obj = {
      tilejson: 'v2',
      scheme: 'tms',
      base: base,
      tiles:  _.map(base, function (b) {
        return b + '{z}/{x}/{y}.png';
      }),
      grids:  _.map(base, function (b) {
        return b + '{z}/{x}/{y}.grid.json';
      }),
      layer: base[0]+'layer.json',
      minzoom: 4,
      maxzoom: 8,
      legend: ''
    }
    return obj;
  }

 
  function step1() {
    step = 1;
    $('#slider').show()
    $('#drought-slider').hide()

    //reset the slider
    famineSlider.setValue(1);

    // Famine maps 1 of 3

    $('#map')
      .append('<div id="mFamineProj" class="map" style="z-index: 1;"></div>')
      .each(function (){

        var layers = ['mapbox.world-blank-light',
              'usaid-horn.hoa-foodsecurity-oct-dec-nolimited',
              'mapbox.world-borders-dark'].join(','),
            tilejson = tj(layers);

        mFamineProj = new mm.Map('mFamineProj',
          new wax.mm.connector(tilejson),
          null,
          null
        );

        // Define center point
        mFamineProj.setCenterZoom(new mm.Location(5.5, 43), 5);

        //Bandwidth optimization
        wax.mm.bwdetect(mFamineProj, {png: '.png32'});
      });

    // Famine maps 2 of 3
    $('#mapbox')
      .append('<div id="mFamineCur" class="map" style="z-index: 2;"></div>')
      .each(function (){

        var layers = ['mapbox.world-blank-light',
              'usaid-horn.hoa-foodsecurity-sept-nolimited',
              'mapbox.world-borders-dark'].join(','),
            tilejson = tj(layers);

        mFamineCur = new mm.Map('mFamineCur',
          new wax.mm.connector(tilejson),
          null,
          null
        );

        // Define center point
        mFamineCur.setCenterZoom(new mm.Location(5.5, 43), 5);

        //Bandwidth optimization
        wax.mm.bwdetect(mFamineCur, {png: '.png32'});
      });
    
    // Famine maps 3 of 3
    $('div#mapbox')
      .append('<div id="mFaminePrev" class="map" style="z-index: 3;"></div>')
      .each(function (){

        var layers = ['mapbox.world-blank-light',
              'usaid-horn.hoa-foodsecurity-july-nolimit',
              'mapbox.world-borders-dark'].join(','),
            tilejson = tj(layers);
        
        // Set legend    
        tilejson.legend = '<div class="overlay-legend"> <div class="title">Food Security Conditions</div> <div class="title2"><a href="http://www.fews.net/ml/en/info/pages/scale.aspx" target="_blank">(Integrated Food Security Phase Classification Scale)</a></div> <div class="scale">   <ul class="labels">     <li><span style="background:#e9dfba;"></span>None or Minimal</li>     <li><span style="background:#f8d95f;"></span>Stressed</li>     <li><span style="background:#f8945f;"></span>Crisis</li>     <li><span style="background:#f85f5f;"></span>Emergency</li>     <li><span style="background:#a55f5f;"></span>Catastrophe/Famine</li>   </ul> </div> <div class="source1">Source: <a href="http://tiles.mapbox.com/usaid-horn" target="_blank">USAID Open Data</a></div> </div>';

  
        mFaminePrev = new mm.Map('mFaminePrev',
          new wax.mm.connector(tilejson),
          null,
          [
            new mm.MouseHandler(),
            new mm.TouchHandler()
          ]
        );
        // Define center point
        mFaminePrev.setCenterZoom(new mm.Location(5.5, 43), 5);
  
        // Add controls
        wax.mm.zoomer(mFaminePrev, tilejson).appendTo($('div#mapbox')[0]);
        $('div.wax-legend').remove();
        wax.mm.legend(mFaminePrev, tilejson).appendTo($('div#mapbox')[0]);

        //Bandwidth optimization
        wax.mm.bwdetect(mFaminePrev, {png: '.png32'});
  
        // Sync layers
        mFaminePrev.addCallback("drawn", function (m) {
          mFamineProj.setCenterZoom(mFaminePrev.getCenter(), mFaminePrev.getZoom());
          mFamineCur.setCenterZoom(mFaminePrev.getCenter(), mFaminePrev.getZoom());
        });
      
      });
  } // End step1



  // Load first step
  step1();
});
