import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { DocumentService } from '../../services/document';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [Navbar, CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History implements OnInit {
  documents: any[] = [];
  errorMessage: string = '';

  constructor(
    private documentService: DocumentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  this.documentService.getHistory().subscribe({
    next: (data) => {
      this.documents = data.map((doc: any) => ({
        ...doc,
        createdAt: doc.createAt ? new Date(doc.createAt) : null
      }));
      this.cdr.detectChanges();
    },
    error: () => this.errorMessage = 'Failed to load history'
  });
}

  view(id: number) {
  this.documentService.download(id).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    },
    error: () => this.errorMessage = 'Failed to preview document'
  });
}

download(id: number) {
  this.documentService.download(id).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document-${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: () => this.errorMessage = 'Failed to download document'
  });
}
}