import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-gestion-psicologos',
  templateUrl: './gestion-psicologos.page.html',
  styleUrls: ['./gestion-psicologos.page.css']
})
export class GestionPsicologosPage implements OnInit{
  
  ngOnInit()
  {
    this.loadJsFile();
  }

  public loadJsFile()
  {
    // <script
    //         src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
    //         integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
    //         crossorigin="anonymous"
    //     ></script>

    //     <script
    //         src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
    //         integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
    //         crossorigin="anonymous"
    //     ></script>

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
