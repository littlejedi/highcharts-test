<!-- http://jsfiddle.net/gh/get/jquery/1.7.2/highslide-software/highcharts.com/tree/master/samples/highcharts/members/series-select/ -->

$(function () {
    var pointsSelected = [];
	
	$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function (data) {

        $('#container').highcharts({
            chart: {
                zoomType: 'x',
				events: {
					selection: function(event) {
						console.log(event);
					}
				}
            },
            title: {
                text: '传感器数据'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: '数值'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: '数值',
                data: data,
				allowPointSelect: true,
				marker: {
					enabled: true,
					states: {
						select: {
							fillColor: 'red',
							lineWidth: 0,
							radius: 5
						}
					}
				},
				point: {
					events: {
						click: function() {
							var pt = this;
							var str = '';
							//alert('X: ' + a.x + ' , Y: ' + a.y);
							if (pointsSelected.length == 0) {
								pointsSelected.push(pt);
							    for (i = 0; i < pointsSelected.length; i++) {
								    str = str + '点 : ' + i + ' , X = ' + pointsSelected[i].x + ', Y = ' + pointsSelected[i].y;
							    }
							    $('#points').text(str);
							} else if (pointsSelected.length == 1) {
								pointsSelected.push(pt);
							    for (i = 0; i < pointsSelected.length; i++) {
								    str = str + '点 : ' + i + ' , X = ' + pointsSelected[i].x + ', Y = ' + pointsSelected[i].y;
							    }
								var r = confirm('您选择了 ' + str + '，确认这个分段吗？');
                                if (r == true) {
									
								} else {
									for (i = 0; i < pointsSelected.length; i++) {
								        pointsSelected[i].select(false);
							        }
									pointsSelected = [];
									$('#points').text('');	
									return false;
								}					    
							}
					    }
					}
				},
            }]
        });
    });
});