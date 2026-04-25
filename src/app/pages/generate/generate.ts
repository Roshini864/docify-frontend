import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { TemplateService } from '../../services/template';
import { DocumentService } from '../../services/document';

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [Navbar, CommonModule, FormsModule],
  templateUrl: './generate.html',
  styleUrl: './generate.css'
})
export class Generate implements OnInit {
  template: any = null;
  placeholders: string[] = [];
  values: any = {};
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private templateService: TemplateService,
    private documentService: DocumentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.templateService.getById(id).subscribe({
      next: (data) => {
        this.template = data;
        this.extractPlaceholders(data.content);
        this.cdr.detectChanges();
      }
    });
  }

  extractPlaceholders(content: string) {
    const regex = /{{(.*?)}}/g;
    const matches = new Set<string>();
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.add(match[1].trim());
    }
    this.placeholders = Array.from(matches);
    this.placeholders.forEach(p => this.values[p] = '');
  }

  generate() {
    for (const p of this.placeholders) {
      if (!this.values[p]?.trim()) {
        this.errorMessage = `Please fill in: ${p}`;
        return;
      }
    }
    this.loading = true;
    this.errorMessage = '';
    this.documentService.generate(this.template.id, this.values).subscribe({
      next: (data) => {
        this.loading = false;
        this.successMessage = 'Document generated!';
        this.cdr.detectChanges();
        setTimeout(() => this.router.navigate(['/history']), 1000);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Failed to generate document';
      }
    });
  }
}