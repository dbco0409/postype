document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById('chart');
	const ctx = canvas.getContext('2d');
	const dpi = window.devicePixelRatio || 1;
	canvas.width = canvas.clientWidth * dpi;
	canvas.height = canvas.clientHeight * dpi;
	ctx.scale(dpi, dpi);

	const days = ['일', '월', '화', '수', '목', '금', '오늘'];

	const myChart = new Chart(ctx, {
		type: 'line',  // 라인 차트를 사용
		data: {
			labels: days,  // x축 라벨
			datasets: [{
				label: '구독자 수',
				data: [0,10,20,20,30,40,40],  // y축 데이터
				fill: false,
				borderColor: 'blue',
				tension: 0.4,
				pointBackgroundColor: 'white',  // 포인트의 배경색
				pointBorderColor: 'blue',       // 포인트의 테두리 색상
				pointRadius: 5                 // 포인트의 크기
			}]
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					display: false  // 범례를 숨깁니다
				}
			},
			scales: {
				x: {
					title: {
						display: false
					}
				},
				y: {
					title: {
						display: false
					},
					beginAtZero: true,
					ticks: {
						display: false 
					},
					grid: {
						display: false
					}
				}
			}
		}
	});
});

$(document).ready(function() {
	$("#m_menu .btn-menu").click(function(){
		if(!$("#st-menu").hasClass("show")){
			$("#st-menu").addClass("show");
		}else{
			$("#st-menu").removeClass("show");
		}
	});
	$("#st-menu .fixedbg").click(function(){
		$("#st-menu").removeClass("show")
	});
});