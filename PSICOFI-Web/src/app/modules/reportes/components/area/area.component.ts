import { Component } from '@angular/core';
import { ReportesService } from '../../servicios/reportes.service';
import { ChartOptions, ChartData, ChartType, ChartDataset } from 'chart.js';

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

  // Datos para los gráficos
  chartDataPersonasPorCarrera: ChartData<'bar'> = { labels: [], datasets: [] };
  chartDataHorarioAtencion: ChartData<'bar'> = { labels: [], datasets: [] };
  chartDataSemestres: ChartData<'bar'> = { labels: [], datasets: [] };
  chartDataAreaConsulta: ChartData<'bar'> = { labels: [], datasets: [] };
  chartDataMotivoConsulta: ChartData<'bar'> = { labels: [], datasets: [] };

  // Opciones y configuración para los gráficos
  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  };

  public chartLegend = true;
  public chartPlugins: any[] = [];

  public chartTypeBar: ChartType = 'bar';
  public chartTypeLine: ChartType = 'line';
  public chartTypePie: ChartType = 'pie';
  public selectedChartType: ChartType = 'bar'; 

  constructor(private reportesService: ReportesService) {}

  generarReporte() {
    if (this.fechaInicial && this.fechaFinal) {
      this.reportesService.obtenerReporte('area', Number(this.selectedArea))
        .subscribe(data => {
          this.datosReporte = data;
          this.prepareChartData();  
          this.showCharts = true;
        });
    } else {
      alert('Por favor seleccione las fechas correctamente');
    }
  }

  prepareChartData() {
    this.chartDataPersonasPorCarrera = this.convertToChartData(this.datosReporte["Personas por carrera"], 'bar', 'Personas por carrera');
    this.chartDataHorarioAtencion = this.convertToChartData(this.datosReporte["Horario de Atención"], 'bar', 'Horario de Atención');
    this.chartDataSemestres = this.convertToChartData(this.datosReporte["Semestre"], 'bar', 'Semestre');
    this.chartDataAreaConsulta = this.convertToChartData(this.datosReporte["Area de la consulta"], 'bar', 'Area de la consulta');
    this.chartDataMotivoConsulta = this.convertToChartData(this.datosReporte["Motivo de la consulta"], 'bar', 'Motivo de la consulta');
  }

  convertToChartData<T extends ChartType>(data: any, chartType: T, label: string): ChartData<T> {
    const labels: string[] = [];
    const datasets: ChartDataset<T>[] = [];

    if (Array.isArray(data)) {
      labels.push(...data.map(([name]: [string, number]) => name));
      datasets.push({
        data: data.map(([_, value]: [string, number]) => value),
        label: label, // Nombre del dataset
        // backgroundColor: chartType === 'bar' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        // borderColor: chartType === 'bar' ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
        borderWidth: chartType === 'bar' ? 1 : 2
      } as unknown as ChartDataset<T>);
    } else {
      Object.keys(data).forEach(key => {
        labels.push(key);
        datasets.push({
          data: [data[key]],
          label: key,
          backgroundColor: chartType === 'bar' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)',
          borderColor: chartType === 'bar' ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
          borderWidth: chartType === 'bar' ? 1 : 2
        } as unknown as ChartDataset<T>); 
      });
    }

    return { labels, datasets } as ChartData<T>;
  }

  // Cambia el tipo de gráfico
  changeChartType(type: ChartType) {
    this.selectedChartType = type;
    this.prepareChartData();
  }
}
