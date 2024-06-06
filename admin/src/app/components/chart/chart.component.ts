import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { TicketserviceService } from '../../service/ticketservice.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',

})
export class ChartComponent implements OnInit{
  onlineticket:number
  offlinticket:number
  constructor(private ticketService: TicketserviceService,private buidr: FormBuilder,
  ){
    this.ticketService.getOfflineTicket().subscribe(
      (response) => {
        // Assuming the API response contains the number of offline tickets in a property called 'offlineTickets'
        this.offlinticket = response;
        this.updatePieChartData();
      },
      (error) => {
        // Handle error if the API request fails
        console.error('Error fetching offline tickets:', error);
      }
    );

    this.ticketService.getOnlineTicket().subscribe(
      (response) => {
        // Assuming the API response contains the number of online tickets in a property called 'onlineTickets'
        this.onlineticket = response;
        this.updatePieChartData();
      },
      (error) => {
        // Handle error if the API request fails
        console.error('Error fetching online tickets:', error);
      }
    )
    this.ticketService.getrevenuebyyeah(2024).subscribe(
      (response) => {
        // Assuming the API response contains the number of online tickets in a property called 'onlineTickets'
        this.lineChart.ref.series[0].setData(response);
      },
      (error) => {
        // Handle error if the API request fails
        console.error('Error fetching online tickets:', error);
      }
    )
  }
  ngOnInit(): void {
    
  }
  lineChart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Thống kê Doanh thu'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12']
    },
    series: [
      {
        name: 'Tổng tiền',
        data: []
      }
    ] as any
  }) ;
  pieChart = new Chart({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Thống kê vé bán'
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Vé',
      data: [
        { name: 'Vé online', y: 0 },
        { name: 'Vé offline', y: 0 }
      ]
    }] as any

  });

  updatePieChartData(): void {
    if (this.onlineticket !== undefined && this.offlinticket !== undefined) {
      const pieChartData = this.pieChart.ref.series[0].data;
      pieChartData[0].update(this.onlineticket);
      pieChartData[1].update(this.offlinticket);
    }
  }
  searchform=this.buidr.group({
    from_date:this.buidr.control(''),
    to_date:this.buidr.control('')
  })  
  searchData(): void {
    const from_date = this.searchform.get('from_date').value.toString();
    const to_date = this.searchform.get('to_date').value.toString();
    console.log(from_date, to_date);
    
    // Gửi yêu cầu lấy dữ liệu từ API
    this.ticketService.getchartbydate(from_date, to_date).subscribe(
      (response) => {
        // Cập nhật biểu đồ với dữ liệu mới
        this.updateChart(response);
      },
      (error) => {
        console.error('Error fetching revenue data:', error);
      }
    );
  }
  // Trong phương thức updateChart():
updateChart(data: any): void {
  // Chuyển đổi dữ liệu từ mảng 2 chiều thành mảng các ngày và mảng các doanh thu tương ứng
  const categories = data.map(item => item[0]); // Mảng các ngày
  const seriesData = data.map(item => item[1]); // Mảng các doanh thu
  
  // Cập nhật dữ liệu cho biểu đồ
  this.lineChart.ref.xAxis[0].setCategories(categories);
  this.lineChart.ref.series[0].setData(seriesData);
}

}
