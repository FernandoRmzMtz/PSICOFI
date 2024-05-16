import { Component } from '@angular/core';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {
  public Editor = DecoupledEditor;
  public config = {
      toolbar: [
          'heading', '|',
          'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'imageUpload', '|',
          'indent', 'outdent', '|',
          'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo', 'fontSize', 'fontColor'
      ],
      language: 'es',
  };
  public onReady( editor: DecoupledEditor ): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }
  
}
