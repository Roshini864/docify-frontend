import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { TemplateService } from '../../services/template';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [Navbar, CommonModule],
  templateUrl: './templates.html',
  styleUrl: './templates.css'
})
export class Templates implements OnInit {
  templates: any[] = [];

  constructor(private templateService: TemplateService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTemplates();
  }

  loadTemplates() {
    this.templateService.getAll().subscribe({
      next: (data) => {
        this.templates = data;
        this.cdr.detectChanges(); // ← force Angular to update the view
      },
      error: (err) => console.error('Failed to load templates', err)
    });
  }

  createNew() { this.router.navigate(['/templates/new']); }
  edit(id: number) { this.router.navigate(['/templates/edit', id]); }
  generate(id: number) { this.router.navigate(['/generate', id]); }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this template?')) {
      this.templateService.delete(id).subscribe({
        next: () => this.templates = this.templates.filter(t => t.id !== id),
        error: (err) => console.error('Failed to delete', err)
      });
    }
  }
}