import { Component } from '@angular/core';
import { ReportesService } from '../../servicios/reportes.service';
import { Legend, plugins } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CHART_TYPES = ['bar', 'line', 'pie', 'doughnut'] as const;
type ChartType = typeof CHART_TYPES[number];
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent {
  selectedArea: string = '1';
  fechaInicial: string = '';
  fechaFinal: string = '';
  datosReporte: any;
  showCharts: boolean = false;

  // Datos para las gráficas
  dataPersonasPorCarrera: any[] = [];
  dataHorarioAtencion: any[] = [];
  dataSemestres: any[] = [];
  dataAreaConsulta: any[] = [];
  dataMotivoConsulta: any[] = [];
  colors = {
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)', 
      'rgba(54, 162, 235, 0.5)', 
      'rgba(255, 206, 86, 0.5)', 
      'rgba(75, 192, 192, 0.5)', 
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)', 
      'rgba(199, 199, 199, 0.5)',
      'rgba(83, 102, 255, 0.5)', 
      'rgba(255, 105, 180, 0.5)',
      'rgba(0, 255, 255, 0.5)', 
      'rgba(255, 69, 0, 0.5)',
      'rgba(0, 255, 0, 0.5)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)', 
      'rgba(54, 162, 235, 1)', 
      'rgba(255, 206, 86, 1)', 
      'rgba(75, 192, 192, 1)', 
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)', 
      'rgba(199, 199, 199, 1)',
      'rgba(83, 102, 255, 1)', 
      'rgba(255, 105, 180, 1)',
      'rgba(0, 255, 255, 1)',
      'rgba(255, 69, 0, 1)',
      'rgba(0, 255, 0, 1)', 

    ]
  };

  // Variables para los gráficos
  chartLabelsPersonasPorCarrera: string[] = [];
  chartDataPersonasPorCarrera: any[] = [];

  chartLabelsHorarioAtencion: string[] = [];
  chartDataHorarioAtencion: any[] = [];

  chartLabelsSemestres: string[] = [];
  chartDataSemestres: any[] = [];

  chartLabelsAreaConsulta: string[] = [];
  chartDataAreaConsulta: any[] = [];

  chartLabelsMotivoConsulta: string[] = [];
  chartDataMotivoConsulta: any[] = [];

  // Tipo de gráfico seleccionado por el usuario
  selectedChartType: ChartType = 'bar'; 

  chartData: any[] = [];
  chartLabels: string[] = [];
  chartOptions: any = {};
  chartLegend = true;
  chartPlugins: any[] = [];


  constructor(private reportesService: ReportesService) { }

  generarReporte() {
    if (this.fechaInicial && this.fechaFinal) {
      this.reportesService.obtenerReporte('area', Number(this.selectedArea))
        .subscribe(data => {
          this.datosReporte = data;
          console.log(this.datosReporte);
          this.prepareChartData();
          this.showCharts = true;
        });
    } else {
      alert('Por favor seleccione las fechas correctamente');
    }
  }

  prepareChartData() {
    if (this.datosReporte) {
      this.chartOptions = {
        responsive: true,
      };

      // Datos y configuración para cada gráfico
      this.dataPersonasPorCarrera = this.datosReporte['Personas por carrera'] || [];
      this.dataHorarioAtencion = this.datosReporte['Horario de Atención'] || [];
      this.dataSemestres = this.datosReporte['Semestre'] || [];
      this.dataAreaConsulta = this.datosReporte['Area de la consulta'] || [];
      this.dataMotivoConsulta = this.datosReporte['Motivo de la consulta'] || [];

      // Gráfico de personas atendidas por carrera
      this.chartLabelsPersonasPorCarrera = this.dataPersonasPorCarrera.map(arr => arr[0]);
      this.chartDataPersonasPorCarrera = [{
        data: this.dataPersonasPorCarrera.map(arr => arr[1]),
        label: 'Personas por Carrera',
        backgroundColor: this.colors.backgroundColor,
        borderColor: this.colors.borderColor,
        borderWidth: 1
      }];

      // Gráfico de horario de atención
      this.chartLabelsHorarioAtencion = this.dataHorarioAtencion.map(arr => arr[0]);
      this.chartDataHorarioAtencion = [{
        data: this.dataHorarioAtencion.map(arr => arr[1]),
        label: 'Horario de Atención',
        backgroundColor: this.colors.backgroundColor,
        borderColor: this.colors.borderColor,
        borderWidth: 1
      }];

      // Gráfico de semestres
      this.chartLabelsSemestres = this.dataSemestres.map(arr => arr[0]);
      this.chartDataSemestres = [{
        data: this.dataSemestres.map(arr => arr[1]),
        label: 'Semestre',
        backgroundColor: this.colors.backgroundColor,
        borderColor: this.colors.borderColor,
        borderWidth: 1
      }];

      // Gráfico de área de consulta
      this.chartLabelsAreaConsulta = this.dataAreaConsulta.map(arr => arr[0]);
      this.chartDataAreaConsulta = [{
        data: this.dataAreaConsulta.map(arr => arr[1]),
        label: 'Área de Consulta',
        backgroundColor: this.colors.backgroundColor,
        borderColor: this.colors.borderColor,
        borderWidth: 1
      }];

      // Gráfico de motivo de consulta
      this.chartLabelsMotivoConsulta = this.dataMotivoConsulta.map(arr => arr[0]);
      this.chartDataMotivoConsulta = [{
        data: this.dataMotivoConsulta.map(arr => arr[1]),
        label: 'Motivo de Consulta',
        backgroundColor: this.colors.backgroundColor,
        borderColor: this.colors.borderColor,
        borderWidth: 1
      }];
    }
  }

  downloadChartsAsImage() {
    const chartsContainer = document.querySelector('.chart-container') as HTMLElement; 
    
    if (chartsContainer) {
      html2canvas(chartsContainer, { scale: 2 }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0);
        link.download = 'reporte_graficas.png';
        link.click();
      });
    }
  }
  
  downloadChartsAsPDF() {
    const chartsContainer = document.querySelector('.chart-container') as HTMLElement; 
    
    if (chartsContainer) {
      html2canvas(chartsContainer, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0); 
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('reporte_graficas.pdf');
      });
    }
  }
    
}
