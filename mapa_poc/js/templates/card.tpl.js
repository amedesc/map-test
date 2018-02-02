(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['card'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div  id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"card-container \" >\r\n	<div class=\"card\">\r\n		<div class=\"card-content\">\r\n			<div class=\"row\">\r\n				<div class=\"col s3 earthquake-image "
    + alias4(((helper = (helper = helpers.color_earthquake || (depth0 != null ? depth0.color_earthquake : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color_earthquake","hash":{},"data":data}) : helper)))
    + "-icon\">\r\n				</div>\r\n				<div class=\"col s3\">\r\n					<p class=\"magnitude-text\">"
    + alias4(((helper = (helper = helpers.intensity || (depth0 != null ? depth0.intensity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"intensity","hash":{},"data":data}) : helper)))
    + "</p>\r\n					<p class=\"unit-text\">Mw</p>\r\n				</div>\r\n				<div class=\"col s1\">\r\n					<div class=\"left-divider\">\r\n					</div>\r\n				</div>\r\n				<div class=\"col s5\">\r\n					<p class=\"time-text\">Hace "
    + alias4(((helper = (helper = helpers.time_since || (depth0 != null ? depth0.time_since : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time_since","hash":{},"data":data}) : helper)))
    + "</p>\r\n					<p class=\"location-text\">"
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + "</p>\r\n				</div>\r\n			</div>\r\n		</div>\r\n\r\n		<div class=\"card-action\">\r\n			<div class=row>\r\n				<div class=\"col s8\">\r\n					<a href=\"/mapa_promediado/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Mapa Promediado</a>\r\n				</div>\r\n				<div class=\"col s4\">\r\n					<a href=\"/reporte/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Reportar</a>\r\n				</div>\r\n			</div>\r\n\r\n		</div>\r\n\r\n	</div>\r\n</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.earthquakes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();